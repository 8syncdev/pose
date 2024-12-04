from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field
from decimal import Decimal


class Exercises(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    lesson_id: Optional[int] = None
    category_id: Optional[int] = None
    name: str
    level: Optional[str] = None  # Easy, Medium, Hard
    content: Optional[str] = None
    solution: Optional[str] = None
    points: int = 0
    function_name: str = "solve"
    param_style: str = "args"  # args, list
    time_limit: Decimal = Decimal("1.00")  # seconds
    memory_limit: Decimal = Decimal("0.50")  # mb
    test_cases: Optional[str] = None  # JSON array of test cases
    content_visibility: str = "public"  # public, premium, enterprise
    solution_visibility: str = "premium"  # public, premium, enterprise
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
