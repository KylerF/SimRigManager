from typing import Optional, TypeVar, Generic
import strawberry

T = TypeVar("T")

@strawberry.input
class NumberFilter(Generic[T]):
    eq: Optional[T] = None
    gt: Optional[T] = None
    lt: Optional[T] = None


@strawberry.input
class StringFilter(Generic[T]):
    eq: Optional[T] = None
    contains: Optional[T] = None


@strawberry.input
class LaptimeFilter:
    driver: Optional[StringFilter[str]] = None
    car: Optional[StringFilter[str]] = None
    track: Optional[StringFilter[str]] = None
    config: Optional[StringFilter[str]] = None
    time: Optional[NumberFilter[float]] = None
    date: Optional[NumberFilter[float]] = None
