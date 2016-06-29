import logging
import ee
#===========================================
#   MACA
#===========================================
def get_maca_collection(variable, model, scenario, frequency,logger=None):
    """Return the daily image collection for MACA

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
    if frequency=='daily':
         coll_name = 'IDAHO_EPSCOR/MACAv2_METDATA'
         coll_desc = 'UI MACAv2-METDATA 4-km downscaled CMIP5 daily projections dataset (University of Idaho)'
    elif frequency=='monthly':
         coll_name = 'IDAHO_EPSCOR/MACAv2_METDATA_MONTHLY'
         coll_desc = 'UI MACAv2-METDATA 4-km downscaled CMIP5 monthly projections dataset (University of Idaho)'
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
    elif variable == 'rhsmin':
        var_desc = 'Minimum Relative Humidity'
    elif variable == 'rhsmax':
        var_desc = 'Maximum Relative Humidity'
    elif variable == 'rsds':
        var_desc = 'Downwelling Shortwave Radiation'
    elif variable == 'uas':
        var_desc = 'Northward Wind Near Surface'
    elif variable == 'vas':
        var_desc = 'Eastward Wind Near Surface'
    elif variable == 'huss':
        var_desc = 'Specific Humidity'
    if logger:
        ee_call = 'collection.select(' + variable + ')'
        logger.info('EE CALL: ' + ee_call)
    collection = collection.select(variable)\
        .filterMetadata("model", "equals", model)
        #.filterMetadata("scenario", "equals",scenario)
    scale = 4000 #4km resolution
    return collection, coll_name, coll_desc, var_desc, notes

#===========================================
#    MACA CLIMATOLOGY
#===========================================
def get_maca_climatology_collection(variable, logger=None):
    """Return the daily historical mage collection for MACA

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
    coll_name = 'IDAHO_EPSCOR/MACAv2_METDATA'
    collection = ee.ImageCollection(coll_name)
    if variable == 'pr':
        var_desc = 'Precipitation'
    elif variable == 'tasmax':
        var_desc = 'Maximum Temperature'
    elif variable == 'tasmin':
        var_desc = 'Minimum Temperature'
    elif variable == 'rhsmin':
        var_desc = 'Minimum Relative Humidity'
    elif variable == 'rhsmax':
        var_desc = 'Maximum Relative Humidity'
    elif variable == 'rsds':
        var_desc = 'Downwelling Shortwave Radiation'
    elif variable == 'uas':
        var_desc = 'Northward Wind Near Surface'
    elif variable == 'vas':
        var_desc = 'Eastward Wind Near Surface'
    elif variable == 'huss':
        var_desc = 'Specific Humidity'

    scenario='historical'
    collection = collection.select(variable)\
        .filterMetadata("model", "equals", model)\
        .filterMetadata("scenario", "equals", scenario)
    return collection
