import strawberry
from strawberry.fastapi import GraphQLRouter

from api.routers.graphql.healthcheck.query import HealthcheckQuery
from api.routers.graphql.drivers.query import DriverQuery
from api.routers.graphql.iracing.query import IracingQuery
from api.routers.graphql.laptimes.query import LaptimeQuery

from api.routers.graphql.drivers.subscription import DriverSubscription
from api.routers.graphql.laptimes.subscription import LaptimeSubscription
from api.routers.graphql.quotes.subscription import QuoteSubscription
from api.routers.graphql.iracing.subscription import IracingSubscription

from api.routers.graphql.drivers.mutation import DriverMutation


@strawberry.type(
    description="Used to query the API",
    name="Query",
)
class Query(
    HealthcheckQuery,
    DriverQuery,
    LaptimeQuery,
    IracingQuery,
):
    """
    Root query type.
    Register all other query types here.
    """
    pass


@strawberry.type(
    description="Subscription to changes in the API",
    name="Subscription",
)
class Subscription(
    DriverSubscription,
    QuoteSubscription,
    IracingSubscription,
    LaptimeSubscription
):
    """
    Root subscription type.
    Register all other subscription types here.
    """
    pass


@strawberry.type(
    description="Mutation to make changes in the API",
    name="Mutation",
)
class Mutation(DriverMutation):
    """
    Root mutation type.
    Register all other mutation types here.
    """
    pass


schema = strawberry.Schema(
    query=Query,
    subscription=Subscription,
    mutation=Mutation
)
graphql_app = GraphQLRouter(schema=schema)
