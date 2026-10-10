"""SQLAlchemy models. Each plot is one row: searchable scalar columns + full JSON payload."""
from sqlalchemy import JSON, Column, Float, Integer, String

from .database import Base


class Plot(Base):
    __tablename__ = "plots"

    id = Column(String(16), primary_key=True)
    seq = Column(Integer, nullable=False, index=True)  # insertion order
    district = Column(String(64), index=True)
    upazila = Column(String(64))
    mouza = Column(String(64))
    dag = Column(String(16))
    khatian = Column(String(32))
    owner = Column(String(128))
    ptype = Column("type", String(32))
    area = Column(Float)
    data = Column(JSON, nullable=False)  # full plot dict (chain, sales, docs, flags, ...)
