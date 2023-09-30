import strawberry


@strawberry.type(
    description="Used to perform healthchecks on the API",
    name="HealthcheckQuery",
)
class HealthcheckQuery:
    @strawberry.field(description="True if the API is active and running")
    def api_active(self) -> bool:
        return True
