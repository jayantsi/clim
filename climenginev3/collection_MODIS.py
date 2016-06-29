import ee

#===========================================
#    MODIS
#===========================================
def get_modis_collection(variable, logger=None):
    """Return the 8 or 16 day composite image collection for MODIS

    Args:
        variable: string indicating the variable/band to return
            (LST_Day_1km, NDVI, NDSI, NDWI, or EVI)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the input variable
        String of additional notes about the collection
    """
    coll_name = 'MODIS/MCD43A4_{0}'.format(variable)
    coll_desc = 'MODIS 16-day average {0}'.format(variable)
    #coll_desc = 'MODIS 16-day {0}'.format(variable)
    #coll_name = 'MOD09GA_{0}'.format(variable)
    #coll_desc = 'MODIS Daily {0}'.format(variable)
    var_desc = variable

    scale = 500 #500 m resolution
    if variable == 'NDVI':
        notes = "NDSI calculated from Norm. Diff. of Near-IR and Red bands"
    elif variable == 'NDSI':
        notes = "NDSI calculated from Norm. Diff. of Green and mid-IR bands"
    elif variable == 'NDWI':
        notes = "NDWI calculated from Norm. Diff. of near-IR and mid-IR bands"
    elif variable == 'EVI':
        notes = "EVI calculated from Near-IR,Red and Blue bands"
    elif variable == 'BAI':
        notes = "BAI calculated from Red and Near-IR bands"
    elif variable == 'LST_Day_1km':
        scale = 1000 #1km resolution
        notes = "Level 2 LST projected in a Sinusoidal Grid by mapping to 1-km grid"
        coll_name = 'MODIS/MOD11A2'
        coll_desc = 'MODIS 8-day {0}'.format(variable)
        var_desc = 'Daytime Land Surface Temperature'
    elif variable == 'Fractional_Snow_Cover':
        scale = 500
        notes = "Snow cover data are based on a snow mapping algorithm that employs a Normalized Difference Snow Index (NDSI) and other criteria tests"
        coll_name = 'MODIS/MOD10A1'
        coll_desc = 'MODIS daily {0}'.format(variable)
        var_desc = 'Terra Snow Cover'
    ## How should this function fail gracefully if the inputs are bad?
    ## Should it return an exception?
    else:
        notes = ''
    if logger:
        ee_call = 'ee.ImageCollection(' + coll_name + ').select(' + variable + ')'
        logger.info('EE CALL: ' + ee_call)
    collection = ee.ImageCollection(coll_name).select(variable)
    if variable =='Fractional_Snow_Cover':
        collection=collection.map(modis_snow_mask_func)
    return collection, coll_name, coll_desc, var_desc, notes

#===========================================
#    Collection Functions
#===========================================
property_list = ['system:index','system:time_start', 'system:time_end']

def modis_snow_mask_func(img):
    """Process fraction snow data... values >100 get set to 0"""
    snow_img = img.select('Fractional_Snow_Cover')
    snow_img = snow_img.where(snow_img.gt(100), 0)
    return snow_img.copyProperties(img, property_list)
