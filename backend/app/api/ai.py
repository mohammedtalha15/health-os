from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.models import database as models, schemas

router = APIRouter()


@router.post("/ask", response_model=schemas.AIResponse)
async def ask_ai(
    query: schemas.AIQuery,
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Ask AI a question about health data
    Returns structured answer with provenance
    """
    # TODO: Implement LLM integration
    # TODO: Fetch relevant context from profile/reports
    # TODO: Generate structured response
    
    return {
        "answer": "This is a placeholder response. LLM integration pending.",
        "source_facts": [],
        "confidence": 0,
        "provenance": []
    }
