from api.routers.graphql import modeltypes


def get_iracing_type(frame: dict):
    if not frame:
        return modeltypes.IracingFrameType(**frame)

    frame["WeekendInfo"]["WeekendOptions"] = modeltypes.WeekendOptionsType(
        **frame["WeekendInfo"]["WeekendOptions"]
    )
    frame["WeekendInfo"]["TelemetryOptions"] = modeltypes.TelemetryOptionsType(
        **frame["WeekendInfo"]["TelemetryOptions"]
    )
    frame["WeekendInfo"] = modeltypes.WeekendInfoType(
        **frame["WeekendInfo"]
    )
    frame["DriverInfo"]["Drivers"] = [modeltypes.IracingDriverType(
        **driver
    ) for driver in frame["DriverInfo"]["Drivers"]]
    frame["DriverInfo"] = modeltypes.DriverInfoType(
        **frame["DriverInfo"]
    )

    return modeltypes.IracingFrameType(**frame)
