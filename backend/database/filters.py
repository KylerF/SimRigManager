from typing import Optional
import strawberry


@strawberry.input
class NumberFilter:
    eq: Optional[float] = None
    gt: Optional[float] = None
    gte: Optional[float] = None
    lt: Optional[float] = None
    lte: Optional[float] = None


@strawberry.input
class StringFilter:
    eq: Optional[str] = None
    ieq: Optional[str] = None
    contains: Optional[str] = None
    icontains: Optional[str] = None


@strawberry.input
class LaptimeFilter:
    driver_name: Optional[StringFilter] = None
    driver_id: Optional[NumberFilter] = None
    car: Optional[StringFilter] = None
    track: Optional[StringFilter] = None
    config: Optional[StringFilter] = None
    time: Optional[NumberFilter] = None
    date: Optional[NumberFilter] = None
