import logging
import ee
#===========================================
#    GRIDMET
#===========================================
def get_gridmet_collection(variable, logger=None):
    """Return the daily image collection for GRIDMET

    Args:
        variable: string indicating the variable/band to return
            (i.e. pr, tmmx, rmin, vs, pet, etc.)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the variable description
        String of additional notes about the collection
    """
    coll_name = 'IDAHO_EPSCOR/GRIDMET'
    coll_desc = 'METDATA/gridMET 4-km dataset'
    # Don't select variable here since Tmean or WB need to be mapped/calculated first
    collection = ee.ImageCollection(coll_name)
    if logger:
        ee_call = 'ee.ImageCollection(' + coll_name + ')'
    notes = ""
    if variable == 'pr':
        var_desc = 'Precipitation'
    #elif variable == 'bi':
    #    var_desc = 'Burning Index'
    #elif variable == 'fm100':
    #    var_desc = 'Fuel Moisture (100-hr)'
    #elif variable == 'fm1000':
    #    var_desc = 'Fuel Moisture (1000-hr)'
    #elif variable == 'tmmx':
    #    var_desc = 'Maximum Temperature'
    #elif variable == 'tmmn':
    #    var_desc = 'Minimum Temperature'
    #elif variable == 'rmin':
    #    var_desc = 'Minimum Relative Humidity'
    #elif variable == 'rmax':
    #    var_desc = 'Maximum Relative Humidity'
    #elif variable == 'srad':
    #    var_desc = 'Downwelling Shortwave Radiation'
    elif variable == 'vs':
        var_desc = 'Enhanced Vegetation Index'
    #elif variable == 'sph':
    #    var_desc = 'Specific Humidity'
    #elif variable == 'erc':
    #    var_desc = 'Energy Release Component'
    elif variable == 'pet':
        notes = "ASCE Standardized Reference ET, estimated using the Penmann Monteith method. See Equation 1 in http://www.kimberly.uidaho.edu/water/asceewri/ascestzdetmain2005.pdf"
        var_desc = 'ASCE Grass Reference Evapotranspiration'
    #elif variable == 'tmean':
    #    collection = collection.map(gridmet_tmean_func)
    #    notes = "Calculated as Average of Min/Max Daily Temperature"
    #    var_desc = 'Average Temperature'
    elif variable == 'wb':
        collection = collection.map(gridmet_wb_func)
        notes = "Calculated as the difference between precipitation and reference evapotranspiration"
        var_desc = 'PPT-ETg'
        #var_desc = 'PPT-1.15*ETo'
    #elif variable == 'dps':
    #    collection = collection.map(gridmet_dps_func)
    #    notes = "Estimated from surface pressure/elevation and specific humidity"
    #    var_desc = 'Dew Point Temperature'
    #elif variable == 'pdsi':
    #    #coll_name = 'IDAHO_EPSCOR/PDSI_TEST'
    #    coll_name = 'IDAHO_EPSCOR/PDSI'
    #    if logger:
    #        ee_call = 'ee.ImageCollection(' + coll_name +')'
    #        logger.info('EE CALL: ' + ee_call)
    #    collection = ee.ImageCollection(coll_name)
     #   notes = ""
      #  var_desc = 'Palmer Drought Severity Index (PDSI)'
    else:
        var_desc = ""
    if logger:
        ee_call = 'collection.select(' + variable + ')'
        logger.info('EE CALL: ' + ee_call)
    collection = collection.select(variable)
    scale = 4000 #4km resolution
    return collection, coll_name, coll_desc, var_desc, notes

#===========================================
#    GRIDMET FUNCTIONS
#===========================================
property_list = ['system:index','system:time_start', 'system:time_end']
def gridmet_wb_func(img):
    """Calculate water balance from precip and PET for GRIDMET collection"""
    ##return img.expression("b('pr') - b('pet')")\
    ##    .select([0], ['wb']).copyProperties(img, property_list)
    pr_img = img.select('pr')
    #pet_img = img.select('pet').multiply(1.15)  #temporary for wheat
    pet_img = img.select('pet')
    return pr_img.subtract(pet_img).select([0], ['wb'])\
        .copyProperties(img, property_list)

def gridmet_tmean_func(img):
    """Calculate Tmean image from Tmin and Tmax for GRIDMET collection"""
    ##return img.expression("0.5 * (b('tmmx') + b('tmmx'))")\
    ##    .select([0],['tmean']).copyProperties(img, property_list)
    tmax_img = img.select('tmmx')
    tmin_img = img.select('tmmn')
    return tmax_img.add(tmin_img).multiply(0.5).select([0],['tmean'])\
        .copyProperties(img, property_list)

def gridmet_dps_func(img):  #img =full collection here
    elev_img = ee.Image("CGIAR/SRTM90_V4")
    sph_img = img.select('sph')
    dps = sph_img.expression(
        "log(b() * 1013.25 / 0.622 / 6.112 * (1 - 0.0065 / 293 * elev) ** 5.26)",
        {'elev': elev_img})
    return dps.expression("273.15 + 243.5 * b() / (17.67 - b())").select([0],['dps'])\
        .copyProperties(img, property_list)


climoproperty_list = ['doy']
def climogridmet_wb_func(img):
    """Calculate water balance from precip and PET for GRIDMET collection"""
    ##return img.expression("b('pr') - b('pet')")\
    ##    .select([0], ['wb']).copyProperties(img, climoproperty_list)
    pr_img = img.select('pr')
    #pet_img = img.select('pet').multiply(1.15)  #temporary for wheat
    pet_img = img.select('pet')
    return pr_img.subtract(pet_img).select([0], ['wb'])\
        .copyProperties(img, climoproperty_list)

def climogridmet_tmean_func(img):
    """Calculate Tmean image from Tmin and Tmax for GRIDMET collection"""
    ##return img.expression("0.5 * (b('tmmx') + b('tmmx'))")\
    ##    .select([0],['tmean']).copyProperties(img, climoproperty_list)
    tmax_img = img.select('tmmx')
    tmin_img = img.select('tmmn')
    return tmax_img.add(tmin_img).multiply(0.5).select([0],['tmean'])\
        .copyProperties(img, climoproperty_list)

def climogridmet_dps_func(img):  #img =full collection here
    elev_img = ee.Image("CGIAR/SRTM90_V4")
    sph_img = img.select('sph')
    dps = sph_img.expression(
        "log(b() * 1013.25 / 0.622 / 6.112 * (1 - 0.0065 / 293 * elev) ** 5.26)",
        {'elev': elev_img})
    return dps.expression("273.15 + 243.5 * b() / (17.67 - b())").select([0],['dps'])\
        .copyProperties(img, climoproperty_list)
#===========================================
#    GRIDMET CLIMATOLOGY
#===========================================
def get_gridmet_climatology_collection(variable, logger=None):
    """Return the daily image collection for GRIDMET

    Args:
        variable: string indicating the variable/band to return
            (i.e. pr, tmmx, rmin, vs, pet, etc.)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the variable description
        String of additional notes about the collection
    """
    # #this is from Tyler's example: https://ee-api.appspot.com/fb76e48b7782e4de5bcae779e0387df3
    #coll_name = 'users/tylere/gridmet_climatology/20150412/GRIDMET_CLIMATOLOGY_1981_TO_2010'
    #collection = ee.ImageCollection(coll_name)
    coll_name = 'users/tylere/gridmet_climatology/20160211/GRIDMET_CLIMATOLOGY_1981_TO_2010'
    collection = ee.ImageCollection(coll_name)

    if variable == 'tmean':
        collection = collection.map(climogridmet_tmean_func)
    elif variable == 'wb':
        collection = collection.map(climogridmet_wb_func)
    elif variable == 'dps':
        collection = collection.map(climogridmet_dps_func)
    elif variable == 'pdsi':
        return 'None'   #doesn't exist in climatology collection
    elif variable == 'bi':
        return 'None'   #doesn't exist in climatology collection
    elif variable == 'fm100':
        return 'None'   #doesn't exist in climatology collection
    elif variable == 'fm1000':
        return 'None'   #doesn't exist in climatology collection

    collection = collection.select(variable)
    return collection
