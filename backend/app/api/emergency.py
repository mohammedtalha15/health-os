from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
import uuid
import json
from cryptography.fernet import Fernet
from app.core.database import get_db
from app.core.security import get_current_active_user, get_password_hash, verify_password
from app.core.config import settings
from app.models import database as models, schemas

router = APIRouter()

# Generate encryption key (in production, store in environment)
ENCRYPTION_KEY = Fernet.generate_key()
cipher_suite = Fernet(ENCRYPTION_KEY)


@router.post("/generate", response_model=schemas.EmergencyLinkResponse)
async def generate_emergency_link(
    request: schemas.EmergencyLinkCreate,
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Generate an ephemeral emergency snapshot link
    """
    # Verify profile belongs to user
    profile = db.query(models.Profile).filter(
        models.Profile.id == request.profile_id,
        models.Profile.user_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Gather emergency snapshot data
    snapshot_data = {
        "name": profile.name,
        "date_of_birth": profile.date_of_birth.isoformat() if profile.date_of_birth else None,
        "gender": profile.gender,
        "allergies": profile.allergies_json or [],
        "medications": request.medications or [],
        "critical_flags": request.critical_flags or [],
        "last_vitals": request.last_vitals or {},
        "emergency_contacts": request.emergency_contacts or [],
        "blood_type": request.blood_type,
    }
    
    # Encrypt data
    encrypted_data = cipher_suite.encrypt(json.dumps(snapshot_data).encode())
    
    # Generate UUID link
    link_id = str(uuid.uuid4())
    
    # Set expiration (default 24 hours)
    expires_at = datetime.utcnow() + timedelta(hours=request.expires_in_hours or 24)
    
    # Create emergency link
    emergency_link = models.EmergencyLink(
        id=link_id,
        profile_id=profile.id,
        encrypted_data=encrypted_data.decode(),
        password_hash=get_password_hash(request.password) if request.password else None,
        expires_at=expires_at
    )
    
    db.add(emergency_link)
    db.commit()
    
    # Generate share URL
    base_url = settings.ALLOWED_ORIGINS[0] if settings.ALLOWED_ORIGINS else "http://localhost:3000"
    share_link = f"{base_url}/emergency/{link_id}"
    
    return {
        "link_id": link_id,
        "share_link": share_link,
        "expires_at": expires_at,
        "qr_code_data": share_link
    }


@router.get("/{link_id}", response_model=schemas.EmergencySnapshot)
async def get_emergency_snapshot(
    link_id: str,
    password: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Retrieve emergency snapshot (public endpoint)
    """
    emergency_link = db.query(models.EmergencyLink).filter(
        models.EmergencyLink.id == link_id
    ).first()
    
    if not emergency_link:
        raise HTTPException(status_code=404, detail="Emergency link not found")
    
    # Check if revoked
    if emergency_link.is_revoked:
        raise HTTPException(status_code=403, detail="This emergency link has been revoked")
    
    # Check if expired
    if emergency_link.expires_at < datetime.utcnow():
        raise HTTPException(status_code=410, detail="This emergency link has expired")
    
    # Check password if required
    if emergency_link.password_hash:
        if not password or not verify_password(password, emergency_link.password_hash):
            raise HTTPException(status_code=401, detail="Invalid password")
    
    # Decrypt data
    try:
        decrypted_data = cipher_suite.decrypt(emergency_link.encrypted_data.encode())
        snapshot_data = json.loads(decrypted_data.decode())
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to decrypt emergency data")
    
    # Update access count
    emergency_link.access_count += 1
    emergency_link.last_accessed = datetime.utcnow()
    db.commit()
    
    return {
        **snapshot_data,
        "generated_at": emergency_link.created_at,
        "expires_at": emergency_link.expires_at,
        "access_count": emergency_link.access_count
    }


@router.delete("/{link_id}")
async def revoke_emergency_link(
    link_id: str,
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Revoke an emergency link
    """
    emergency_link = db.query(models.EmergencyLink).filter(
        models.EmergencyLink.id == link_id
    ).first()
    
    if not emergency_link:
        raise HTTPException(status_code=404, detail="Emergency link not found")
    
    # Verify ownership
    profile = db.query(models.Profile).filter(
        models.Profile.id == emergency_link.profile_id,
        models.Profile.user_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(status_code=403, detail="Not authorized to revoke this link")
    
    emergency_link.is_revoked = True
    db.commit()
    
    return {"message": "Emergency link revoked successfully"}
