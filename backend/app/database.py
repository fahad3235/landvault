"""Database setup. SQLite by default (landvault.db in the backend dir); DATABASE_URL env override for PostgreSQL."""
import os
import time

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_URL = f"sqlite:///{os.path.join(BACKEND_DIR, 'landvault.db')}"
DATABASE_URL = os.environ.get("DATABASE_URL", DEFAULT_URL)

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


def wait_for_db(retries=30, delay=1.0):
    """Block until the database accepts connections (lets docker-compose order itself)."""
    from sqlalchemy import text
    last = None
    for _ in range(retries):
        try:
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            return
        except Exception as exc:  # noqa: BLE001
            last = exc
            time.sleep(delay)
    raise RuntimeError(f"database not reachable after {retries} tries: {last}")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
