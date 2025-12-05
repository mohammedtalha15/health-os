from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum


class PlanType(str, Enum):
    FREE = "free"
    PREMIUM = "premium"
    ENTERPRISE = "enterprise"


class JobStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class Severity(str, Enum):
    GREEN = "green"
    YELLOW = "yellow"
    RED = "red"


class ExplanationStyle(str, Enum):
    BASIC = "basic"
    NORMAL = "normal"
    DOCTOR = "doctor"


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(UserBase):
    id: int
    plan: PlanType
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# Profile Schemas
class ProfileBase(BaseModel):
    name: str
    date_of_birth: Optional[datetime] = None
    gender: Optional[str] = None
    is_pregnant: bool = False
    allergies_json: Optional[Dict[str, Any]] = None
    baseline_units: Optional[Dict[str, str]] = None


class ProfileCreate(ProfileBase):
    pass


class Profile(ProfileBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# Report Schemas
class ReportBase(BaseModel):
    filename: Optional[str] = None
    sample_date: Optional[datetime] = None


class ReportUpload(BaseModel):
    profile_id: int


class Report(ReportBase):
    id: int
    profile_id: int
    s3_path: str
    file_type: Optional[str] = None
    document_type: Optional[str] = None
    job_status: JobStatus
    ocr_confidence: Optional[int] = None
    created_at: datetime
    processed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class ReportDetail(Report):
    raw_text: Optional[str] = None
    parsed_json: Optional[Dict[str, Any]] = None
    interpretations: List['Interpretation'] = []
    alerts: List['Alert'] = []


# Interpretation Schemas
class InterpretationBase(BaseModel):
    style: ExplanationStyle
    content: str
    llm_version: Optional[str] = None
    rule_version: Optional[str] = None
    confidence: Optional[int] = None
    provenance_json: Optional[Dict[str, Any]] = None


class Interpretation(InterpretationBase):
    id: int
    report_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# Metric Schemas
class MetricValue(BaseModel):
    metric_name: str
    value: float
    unit: str
    ref_low: Optional[float] = None
    ref_high: Optional[float] = None
    flag: str  # NORMAL, LOW, HIGH, CRITICAL
    severity: Severity


class ParsedReport(BaseModel):
    document_type: str
    sample_date: Optional[datetime] = None
    metrics: List[MetricValue]
    comments: Optional[str] = None


# Trend Schemas
class TrendData(BaseModel):
    metric_name: str
    series: List[Dict[str, Any]]  # [{date, value}, ...]
    prediction: Optional[Dict[str, Any]] = None
    last_updated: datetime


# Alert Schemas
class AlertBase(BaseModel):
    severity: Severity
    metric_name: Optional[str] = None
    message: str


class Alert(AlertBase):
    id: int
    profile_id: int
    report_id: Optional[int] = None
    is_read: bool
    is_dismissed: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# Timeline Schemas
class TimelineEntry(BaseModel):
    id: int
    type: str  # report, alert, prescription, vital
    date: datetime
    title: str
    summary: Optional[str] = None
    severity: Optional[Severity] = None
    data: Optional[Dict[str, Any]] = None


class Timeline(BaseModel):
    profile_id: int
    entries: List[TimelineEntry]
    total_count: int


# AI Query Schemas
class AIQuery(BaseModel):
    profile_id: int
    question: str
    context: Optional[Dict[str, Any]] = None


class AIResponse(BaseModel):
    answer: str
    source_facts: List[Dict[str, Any]]
    confidence: int
    provenance: List[str]


# Emergency Snapshot Schema
class EmergencySnapshot(BaseModel):
    profile_id: int
    name: str
    age: int
    gender: str
    allergies: List[str]
    current_medications: List[str]
    critical_flags: List[Dict[str, Any]]
    last_vitals: Optional[Dict[str, Any]] = None
    emergency_contacts: List[Dict[str, str]]
    generated_at: datetime
    expires_at: datetime
    share_link: Optional[str] = None


# Emergency Snapshot Schema
class EmergencySnapshot(BaseModel):
    profile_id: int
    name: str
    age: int
    gender: str
    blood_type: Optional[str] = None
    allergies: List[Dict[str, Any]]
    medications: List[Dict[str, Any]]
    critical_flags: List[Dict[str, Any]]
    last_vitals: Optional[Dict[str, Any]] = None
    emergency_contacts: List[Dict[str, str]]
    generated_at: datetime
    expires_at: datetime
    access_count: int = 0


class EmergencyLinkCreate(BaseModel):
    profile_id: int
    medications: Optional[List[Dict[str, Any]]] = None
    critical_flags: Optional[List[Dict[str, Any]]] = None
    last_vitals: Optional[Dict[str, Any]] = None
    emergency_contacts: Optional[List[Dict[str, str]]] = None
    blood_type: Optional[str] = None
    password: Optional[str] = None
    expires_in_hours: Optional[int] = 24


class EmergencyLinkResponse(BaseModel):
    link_id: str
    share_link: str
    expires_at: datetime
    qr_code_data: str


# Update forward references
ReportDetail.model_rebuild()
