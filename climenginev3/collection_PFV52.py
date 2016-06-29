import ee

#===========================================
#      PFV52
#===========================================
def get_pfv52_collection(variable, logger=None):
    """Return the daily image collection for  PFV52

    Args:
        variable: string indicating the variable/band to return
            (i.e. precipitation)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the variable description
        String of additional notes about the collection
    """
    coll_name = 'NOAA/AVHRR_Pathfinder_V52_L3'
    coll_desc = 'NOAA AVHRR Pathfinder V 5.2 4-km sea surface dataset (NOAA)'
    collection = ee.ImageCollection(coll_name)
    if logger:
        ee_call = 'ee.ImageCollection(' + coll_name + ')'
    notes = ""
    if variable == 'sea_surface_temperature': #K, scale=0.01, offset=273.15
        var_desc = "Skin Temperature of the Ocean "
        collection = collection.map(pfv52_sst_func)
    else:
        var_desc = ""
    if logger:
        ee_call = 'collection.select(' + variable + ')'
        logger.info('EE CALL: ' + ee_call)
    collection = collection.select(variable)
    scale = 4000 #4-km (1/24-deg) resolution
    return collection, coll_name, coll_desc, var_desc, notes

#===========================================
#        PFV52 FUNCTIONS
#===========================================
property_list = ['system:index','system:time_start', 'system:time_end']
def pfv52_sst_func(img):
    sst_img = img.select('sea_surface_temperature')
    newimg = sst_img.multiply(0.01).add(273.15)
    return newimg.select([0],['sea_surface_temperature'])\
        .copyProperties(img, property_list)

#===========================================
#        PFV52 12HRLY to DAILY
#===========================================
def convert_12hrly_to_daily(collection,var,dSUTC,dEUTC, logger):
    #day_ms_list = ee.List.sequence(dSUTC.millis(), dEUTC.advance(1,'day').millis(), 1*24*60*60*1000)
    day_ms_list = ee.List.sequence(dSUTC.millis(), dEUTC.millis(), 1*24*60*60*1000)
    '''
    for time_int in day_ms_list.getInfo():
        date_obj = dt.datetime.utcfromtimestamp(time_int / 1000)
        date_str = date_obj.strftime('%Y-%m-%d')
        logger.info('DATE' + str(date_str))
        #logger.info(ee.Date(time_int).format('yMMDD'))
    '''
    PFV52_max_variables = []
    PFV52_min_variables = []
    PFV52_mean_variables = ['Temperature_height_above_ground']
    PFV52_sum_variables = []

    # def maxdaily_from_12hrly(day_ms):
    #     return ee.Image(collection.filterDate(
    #         ee.Date(day_ms), ee.Date(day_ms).advance(1,'day')).max()).set({
    #             "system:index":ee.Date(day_ms).format('yMMdd'),
    #             "system:time_start":day_ms,
    #             "system:time_end":ee.Date(day_ms).advance(1,'day').millis()})
    # def mindaily_from_12hrly(day_ms):
    #     return ee.Image(collection.filterDate(
    #         ee.Date(day_ms), ee.Date(day_ms).advance(1,'day')).min()).set({
    #             "system:index":ee.Date(day_ms).format('yMMdd'),
    #             "system:time_start":day_ms,
    #             "system:time_end":ee.Date(day_ms).advance(1,'day').millis()})

    def meandaily_from_12hrly(day_ms):
        return ee.Image(collection.filterDate(
            ee.Date(day_ms), ee.Date(day_ms).advance(1,'day')).mean()).set({
                "system:index":ee.Date(day_ms).format('yMMdd'),
                "system:time_start":day_ms,
                "system:time_end":ee.Date(day_ms).advance(1,'day').millis()})

    # def sumdaily_from_12hrly(day_ms):
    #     return ee.Image(collection.filterDate(
    #         ee.Date(day_ms), ee.Date(day_ms).advance(1,'day')).sum()).set({
    #             "system:index":ee.Date(day_ms).format('yMMdd'),
    #             "system:time_start":day_ms,
    #             "system:time_end":ee.Date(day_ms).advance(1,'day').millis()})

    # if var in PFV52_max_variables:
    #     collection = ee.ImageCollection.fromImages(day_ms_list.map(maxdaily_from_6hrly))
    # elif var in PFV52_min_variables:
    #     collection = ee.ImageCollection.fromImages(day_ms_list.map(mindaily_from_6hrly))
    if var in PFV52_mean_variables:
        collection = ee.ImageCollection.fromImages(day_ms_list.map(meandaily_from_12hrly))
    # elif var in PFV52_sum_variables:
    #     collection = ee.ImageCollection.fromImages(day_ms_list.map(sumdaily_from_6hrly))
    return collection
