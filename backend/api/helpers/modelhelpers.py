def get_valid_data(model_data_object, model_class):
    """
    Given a data model, returns a dictionary containing all column values
    """
    data_dict = {}
    for column in model_class.__table__.columns:
        try:
            data_dict[column.name] = getattr(model_data_object,column.name)
        except:
            pass
    return data_dict
