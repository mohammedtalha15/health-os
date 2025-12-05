from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.models import database as models, schemas

router = APIRouter()


@router.post("/upload", response_model=schemas.Report)
async def upload_report(
    profile_id: int,
    file: UploadFile = File(...),
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Upload a medical report (PDF, JPG, PNG)
    Creates a background job for OCR + parsing + interpretation
    """
    # TODO: Implement S3 upload
    # TODO: Create Celery job for processing
    # TODO: Store report metadata
    
    return {
        "id": 1,
        "profile_id": profile_id,
        "filename": file.filename,
        "s3_path": f"reports/{file.filename}",
        "job_status": "pending",
        "created_at": "2024-01-01T00:00:00"
    }


@router.get("/{report_id}", response_model=schemas.ReportDetail)
async def get_report(
    report_id: int,
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get report details with interpretations"""
    report = db.query(models.Report).filter(models.Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    return report


@router.get("/", response_model=List[schemas.Report])
async def list_reports(
    profile_id: int,
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """List all reports for a profile"""
    reports = db.query(models.Report).filter(
        models.Report.profile_id == profile_id
    ).order_by(models.Report.created_at.desc()).all()
    
    return reports
