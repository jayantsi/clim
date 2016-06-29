import logging
import ee
#===========================================
#   NASA NEX
#===========================================
def get_nasanex_collection(variable, model, scenario, logger=None):
    """Return the daily image collection for  NASA NEX

    Args:
        variable: string indicating the variable/band to return
            (i.e. pr, tasmax,tasmin,rhsmax,rhsmin,rsds,uas,vas,huss, etc.)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the variable description
        String of additional notes about the collection
    """
    coll_name = 'NASA/NEX-DCP30'
    coll_desc = 'NASA Earth Exchange(NEX) 25-km downscaled Climate Projections(NEX-DCP30)'
    collection = ee.ImageCollection(coll_name)
    if logger:
        ee_call = 'ee.ImageCollection(' + coll_name + ')'
    notes = ""
    if variable == 'pr':
        var_desc = 'Precipitation'
    elif variable == 'tasmax':
        var_desc = 'Maximum Temperature'
    elif variable == 'tasmin':
        var_desc = 'Minimum Temperature'
    if logger:
        ee_call = 'collection.select(' + variable + ')'
        logger.info('EE CALL: ' + ee_call)
    collection = collection.select(variable)\
        .filterMetadata("model", "equals", model)
        #.filterMetadata("scenario", "equals", scenario)

    scale = 25000 #25km
    return collection, coll_name, coll_desc, var_desc, notes

