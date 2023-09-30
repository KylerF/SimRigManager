"""
Generic filters for SQLAlchemy models. They are used to compose filters for
specific models in the GraphQL API, but can be extended to be used in other
places as well.
"""
from sqlalchemy import Column
from typing import Optional
import strawberry


@strawberry.input(
    description="Filter by number using equality, greater than, or less than",
    name="NumberFilter",
)
class NumberFilter:
    eq: Optional[float] = strawberry.field(description="Equals")
    ne: Optional[float] = strawberry.field(description="Not equal")
    gt: Optional[float] = strawberry.field(description="Greater than")
    gte: Optional[float] = strawberry.field(description="Greater than or equal")
    lt: Optional[float] = strawberry.field(description="Less than")
    lte: Optional[float] = strawberry.field(description="Less than or equal")

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

    def to_sqlalchemy(self, field: Column) -> list:
        filters = []

        if self.eq is not None:
            filters.append(field == self.eq)
        if self.ne is not None:
            filters.append(field != self.ne)
        if self.gt is not None:
            filters.append(field > self.gt)
        if self.gte is not None:
            filters.append(field >= self.gte)
        if self.lt is not None:
            filters.append(field < self.lt)
        if self.lte is not None:
            filters.append(field <= self.lte)

        return filters


@strawberry.input(
    description="Filter by date. The date must be in ISO 8601 format. \
    For example: 2021-01-01T00:00:00.000Z",
    name="DateFilter",
)
class DateFilter:
    eq: Optional[str] = strawberry.field(description="Equals")
    before: Optional[str] = strawberry.field(description="Before")
    after: Optional[str] = strawberry.field(description="After")

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
    def to_sqlalchemy(self, field: Column) -> list:
        filters = []

        if self.eq is not None:
            filters.append(field == self.eq)
        if self.before is not None:
            filters.append(field < self.before)
        if self.after is not None:
            filters.append(field > self.after)

        return filters


@strawberry.input(
    description="Filter string using equality, starts with, ends with, or contains",
    name="StringFilter",
)
class StringFilter:
    """
    Filtering for strings. All fields are optional, and if multiple are
    provided, the result will be filtered by the first field, then the second,
    etc.
    - eq: Equals
    - ne: Not equal
    - ieq: Case insensitive equal
    - ine: Case insensitive not equal
    - starts_with: Starts with provided string
    - ends_with: Ends with provided string
    - like: Matches provided regular expression
    - contains: Contains provided string
    """

    eq: Optional[str] = strawberry.field(description="Equals")
    ne: Optional[str] = strawberry.field(description="Not equal")
    ieq: Optional[str] = strawberry.field(description="Case insensitive equal")
    ine: Optional[str] = strawberry.field(description="Case insensitive not equal")
    starts_with: Optional[str] = strawberry.field(description="Starts with")
    ends_with: Optional[str] = strawberry.field(description="Ends with")
    like: Optional[str] = strawberry.field(
        description='Matches SQL regular expression, e.g. "%foo%"'
    )
    contains: Optional[str] = strawberry.field(description="Contains")

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

    def to_sqlalchemy(self, field: Column) -> list:
        filters = []

        if self.eq is not None:
            filters.append(field == self.eq)
        if self.ne is not None:
            filters.append(field != self.ne)
        if self.ieq is not None:
            filters.append(field.ilike(self.ieq))
        if self.ine is not None:
            filters.append(field.notilike(self.ine))
        if self.starts_with is not None:
            filters.append(field.startswith(self.starts_with))
        if self.ends_with is not None:
            filters.append(field.endswith(self.ends_with))
        if self.like is not None:
            filters.append(field.like(self.like))
        if self.contains is not None:
            filters.append(field.contains(self.contains))

        return filters


@strawberry.input(description="Filter by boolean field", name="BooleanFilter")
class BooleanFilter:
    eq: Optional[bool] = strawberry.field(description="Equals")
    neq: Optional[bool] = strawberry.field(description="Not equal")

    def __init__(self, eq: Optional[bool] = None, neq: Optional[bool] = None):
        self.eq = eq
        self.neq = neq

    def to_sqlalchemy(self, field: Column):
        if self.eq is not None:
            return field == self.eq
        elif self.neq is not None:
            return field != self.neq
        else:
            return None
