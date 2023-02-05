from api.routers.graphql import modeltypes


def get_valid_data(model_data_object, model_class):
    """
    Given a data model, returns a dictionary containing all column values
    """
    data_dict = {}
    for column in model_class.__table__.columns:
        try:
            data_dict[column.name] = getattr(model_data_object, column.name)
        except Exception:
            pass
    return data_dict


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
