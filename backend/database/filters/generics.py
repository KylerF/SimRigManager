from sqlalchemy import Column
from typing import Optional
import strawberry


@strawberry.input(
    description="Filter by number using equality, greater than, or less than",
    name="NumberFilter"
)
class NumberFilter:
    eq: Optional[float] = None
    ne: Optional[float] = None
    gt: Optional[float] = None
    gte: Optional[float] = None
    lt: Optional[float] = None
    lte: Optional[float] = None

    def __init__(
        self,
        eq: Optional[float] = None,
        ne: Optional[float] = None,
        gt: Optional[float] = None,
        gte: Optional[float] = None,
        lt: Optional[float] = None,
        lte: Optional[float] = None,
    ):
        self.eq = eq
        self.ne = ne
        self.gt = gt
        self.gte = gte
        self.lt = lt
        self.lte = lte

    def to_sqlalchemy(self, field: Column):
        if self.eq is not None:
            return field == self.eq
        elif self.ne is not None:
            return field != self.ne
        elif self.gt is not None:
            return field > self.gt
        elif self.gte is not None:
            return field >= self.gte
        elif self.lt is not None:
            return field < self.lt
        elif self.lte is not None:
            return field <= self.lte
        else:
            return None


@strawberry.input(
    description="""
    Filter by date. The date must be in
    ISO 8601 format.
    For example: 2021-01-01T00:00:00.000Z
    """,
    name="DateFilter"
)
class DateFilter:
    eq: Optional[str] = None
    before: Optional[str] = None
    after: Optional[str] = None

    def __init__(
        self,
        eq: Optional[str] = None,
        before: Optional[str] = None,
        after: Optional[str] = None,
    ):
        self.eq = eq
        self.before = before
        self.after = after

    # Methods to convert to SQLAlchemy filters
    def to_sqlalchemy(self, field: Column):
        if self.eq is not None:
            return field == self.eq
        elif self.before is not None:
            return field < self.before
        elif self.after is not None:
            return field > self.after
        else:
            return None


@strawberry.input(
    description="""Filter string using equality, starts with,
    ends with, or contains
    """,
    name="StringFilter"
)
class StringFilter:
    """
    Filtering for strings
    - eq: Equals
    - ne: Not equal
    - ieq: Case insensitive equal
    - ieq: Case insensitive not equal
    - starts_with: Starts with provided string
    - ends_with: Ends with provided string
    - like: Matches provided regular expression
    - contains: Contains provided string
    """
    eq: Optional[str] = None
    ne: Optional[str] = None
    ieq: Optional[str] = None
    ine: Optional[str] = None
    starts_with: Optional[str] = None
    ends_with: Optional[str] = None
    like: Optional[str] = None
    contains: Optional[str] = None

    def __init__(
        self,
        eq: Optional[str] = None,
        ne: Optional[str] = None,
        ieq: Optional[str] = None,
        ine: Optional[str] = None,
        starts_with: Optional[str] = None,
        ends_with: Optional[str] = None,
        like: Optional[str] = None,
        contains: Optional[str] = None,
    ):
        self.eq = eq
        self.ne = ne
        self.ieq = ieq
        self.ine = ine
        self.starts_with = starts_with
        self.ends_with = ends_with
        self.like = like
        self.contains = contains

    def to_sqlalchemy(self, field: Column):
        if self.eq is not None:
            return field == self.eq
        elif self.ne is not None:
            return field != self.ne
        elif self.ieq is not None:
            return field.ilike(self.ieq)
        elif self.ine is not None:
            return field.notilike(self.ine)
        elif self.starts_with is not None:
            return field.startswith(self.starts_with)
        elif self.ends_with is not None:
            return field.endswith(self.ends_with)
        elif self.like is not None:
            return field.like(self.like)
        elif self.contains is not None:
            return field.contains(self.contains)
        else:
            return None
