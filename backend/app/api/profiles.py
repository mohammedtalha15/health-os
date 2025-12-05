from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.models import database as models, schemas

router = APIRouter()


@router.post("/", response_model=schemas.Profile)
async def create_profile(
    profile_data: schemas.ProfileCreate,
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new profile (family member)"""
    db_profile = models.Profile(
        user_id=current_user.id,
        **profile_data.dict()
    )
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    
    return db_profile


@router.get("/", response_model=List[schemas.Profile])
async def list_profiles(
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """List all profiles for current user"""
    return current_user.profiles


@router.get("/{profile_id}/timeline", response_model=schemas.Timeline)
async def get_timeline(
    profile_id: int,
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get health timeline for a profile"""
    # TODO: Implement timeline aggregation
    return {
        "profile_id": profile_id,
        "entries": [],
        "total_count": 0
    }
