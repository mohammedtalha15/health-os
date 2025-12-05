from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, JSON, Enum, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum


class PlanType(str, enum.Enum):
    FREE = "free"
    PREMIUM = "premium"
    ENTERPRISE = "enterprise"


class JobStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class Severity(str, enum.Enum):
    GREEN = "green"
    YELLOW = "yellow"
    RED = "red"


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    plan = Column(Enum(PlanType), default=PlanType.FREE)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    profiles = relationship("Profile", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user")


class Profile(Base):
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    date_of_birth = Column(DateTime)
    gender = Column(String(10))
    is_pregnant = Column(Boolean, default=False)
    allergies_json = Column(JSON)
    baseline_units = Column(JSON)  # Preferred units for metrics
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="profiles")
    reports = relationship("Report", back_populates="profile", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="profile")
    trends = relationship("Trend", back_populates="profile")


class Report(Base):
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id"), nullable=False)
    s3_path = Column(String, nullable=False)
    filename = Column(String)
    file_type = Column(String)  # PDF, JPG, PNG
    document_type = Column(String)  # CBC, LFT, Lipid, etc.
    raw_text = Column(Text)
    parsed_json = Column(JSON)
    ocr_confidence = Column(Integer)  # 0-100
    job_status = Column(Enum(JobStatus), default=JobStatus.PENDING)
    sample_date = Column(DateTime)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    processed_at = Column(DateTime(timezone=True))
    
    # Relationships
    profile = relationship("Profile", back_populates="reports")
    interpretations = relationship("Interpretation", back_populates="report", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="report")


class Interpretation(Base):
    __tablename__ = "interpretations"
    
    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("reports.id"), nullable=False)
    style = Column(String)  # basic, normal, doctor
    content = Column(Text, nullable=False)
    llm_version = Column(String)
    rule_version = Column(String)
    confidence = Column(Integer)  # 0-100
    provenance_json = Column(JSON)  # Which rules/facts produced this
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    report = relationship("Report", back_populates="interpretations")


class Trend(Base):
    __tablename__ = "trends"
    
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id"), nullable=False)
    metric_name = Column(String, nullable=False, index=True)
    series_json = Column(JSON)  # Time series data
    prediction_json = Column(JSON)  # 30-day forecast
    last_updated = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    profile = relationship("Profile", back_populates="trends")


class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id"), nullable=False)
    report_id = Column(Integer, ForeignKey("reports.id"))
    severity = Column(Enum(Severity), nullable=False)
    metric_name = Column(String)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    is_dismissed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    profile = relationship("Profile", back_populates="alerts")
    report = relationship("Report", back_populates="alerts")


class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    actor = Column(String, nullable=False)  # user email or system
    action = Column(String, nullable=False)  # upload, view, delete, etc.
    target = Column(String)  # resource type
    target_id = Column(Integer)  # resource id
    payload = Column(JSON)  # additional context
    ip_address = Column(String)
    user_agent = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="audit_logs")
