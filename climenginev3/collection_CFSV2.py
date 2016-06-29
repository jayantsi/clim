import ee
import datetime as dt

#===========================================
#       CFSV2
#===========================================
def get_cfsv2_collection(variable, logger=None):
    """Return the daily image collection for CFSV2

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
    coll_name = 'NOAA/CFSV2/FOR6H'
    coll_desc = 'CFS 19.2-km reanalysis dataset (NOAA)'
    collection = ee.ImageCollection(coll_name)
    if logger:
        ee_call = 'ee.ImageCollection(' + coll_name + ')'
    notes = ""
    if variable == 'Maximum_temperature_height_above_ground_6_Hour_Interval':
        var_desc = "Max Temperature"
    elif variable == 'Minimum_temperature_height_above_ground_6_Hour_Interval':
        var_desc = "Min Temperature"
    elif variable == 'Temperature_height_above_ground':
        var_desc = "Temperature"
    elif variable == 'Latent_heat_net_flux_surface_6_Hour_Average':
        var_desc = "Latent Heat"
    elif variable == 'Sensible_heat_net_flux_surface_6_Hour_Average':
        var_desc = "Sensible Heat"
    elif variable == 'Precipitation_rate_surface_6_Hour_Average':
        var_desc = "Precipitation"
    elif variable == 'u-component_of_wind_height_above_ground':
        var_desc = "Eastward Wind"
    elif variable == 'v-component_of_wind_height_above_ground':
        var_desc = "Northward Wind"
    elif variable == 'Pressure_surface':
        var_desc = "Pressure"
    elif variable == 'Maximum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':
        var_desc = "Max Spec. Humidity"
    elif variable == 'Minimum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':
        var_desc = "Min Spec. Humidity"
    elif variable == 'Specific_humidity_height_above_ground':
        var_desc = "Spec. Humidity"
    elif variable == 'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':
        var_desc = "Downward Shortwave Radiation"
    elif variable == 'Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':
        var_desc = "Upward Shortwave Radiation"
    elif variable == 'Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average':
        var_desc = "Downward Longwave Radiation"
    elif variable == 'Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average':
        var_desc = "Upward Longwave Radiation"
    elif variable == 'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm':
        var_desc = "5cm Soil Moisture"
    elif variable == 'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_25_cm':
        var_desc = "25cm Soil Moisture"
    elif variable == 'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_70_cm':
        var_desc = "70cm Soil Moisture"
    elif variable == 'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_150_cm':
        var_desc = "150cm Soil Moisture"
    elif variable == 'Potential_Evaporation_Rate_surface_6_Hour_Average':
        var_desc = "Potential Evaporation"
    elif variable == 'Geopotential_height_surface':
        var_desc = "Geopotential Height"
    elif variable == 'vs':
        collection = collection.map(cfsv2_vs_func)
        notes = "Calculated from eastward and northward wind components"
        var_desc = 'Wind Speed'
    elif variable == 'netRAD':
        collection = collection.map(cfsv2_netRAD_func)
        notes = "Calculated from eastward and northward wind components"
        var_desc = 'Net Downward Radiation'
    else:
        var_desc = ""
    if logger:
        ee_call = 'collection.select(' + variable + ')'
        logger.info('EE CALL: ' + ee_call)
    collection = collection.select(variable)
    scale = 19200 #.2 deg resolution
    return collection, coll_name, coll_desc, var_desc, notes

#===========================================
#        CFSV2 FUNCTIONS
#===========================================
property_list = ['system:index','system:time_start', 'system:time_end']
def cfsv2_vs_func(img):
    """Calculate Wind Speed image from ua and va from CFSV2 collection"""
    ua_img = img.select('u-component_of_wind_height_above_ground')
    ua2_img = ua_img.multiply(ua_img)
    va_img = img.select('v-component_of_wind_height_above_ground')
    va2_img = va_img.multiply(va_img)
    vs_img = ua2_img.add(va2_img).sqrt()
    return vs_img.select([0],['vs'])\
        .copyProperties(img, property_list)

def cfsv2_netRAD_func(img):
    """Calculate net Radiation image from downward/upward short/long wave radiations from CFSV2 collection"""
    down_long_img = img.select('Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average')
    up_long_img =img.select('Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average')
    down_short_img=img.select('Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average')
    up_short_img=img.select('Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average')
    long_net_img=down_long_img.subtract(up_long_img)
    short_net_img=down_short_img.subtract(up_short_img)
    return long_net_img.add(short_net_img).select([0],['netRAD'])\
        .copyProperties(img, property_list)

#===========================================
#        CFSV2 6HRLY to DAILY
#===========================================
def convert_6hrly_to_daily(collection,var,dSUTC,dEUTC, logger):
    #day_ms_list = ee.List.sequence(dSUTC.millis(), dEUTC.advance(1,'day').millis(), 1*24*60*60*1000)
    day_ms_list = ee.List.sequence(dSUTC.millis(), dEUTC.millis(), 1*24*60*60*1000)
    '''
    for time_int in day_ms_list.getInfo():
        date_obj = dt.datetime.utcfromtimestamp(time_int / 1000)
        date_str = date_obj.strftime('%Y-%m-%d')
        logger.info('DATE' + str(date_str))
        #logger.info(ee.Date(time_int).format('yMMDD'))
    '''
    CFSV2_max_variables = [
        'Maximum_temperature_height_above_ground_6_Hour_Interval',
        'Maximum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval'
    ]
    CFSV2_min_variables = [
        'Minimum_temperature_height_above_ground_6_Hour_Interval',
        'Minimum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval'
    ]
    CFSV2_mean_variables = [
        'Temperature_height_above_ground',
        'Latent_heat_net_flux_surface_6_Hour_Average',
        'Sensible_heat_net_flux_surface_6_Hour_Average',
        'u-component_of_wind_height_above_ground',
        'v-component_of_wind_height_above_ground',
        'Pressure_surface',
        'Specific_humidity_height_above_ground',
        'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average',
        'Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average',
        'Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average',
        'Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_25_cm',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_70_cm',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_150_cm',
        'vs',
        'netRAD',
        'Precipitation_rate_surface_6_Hour_Average',
        'Potential_Evaporation_Rate_surface_6_Hour_Average'
    ]
    CFSV2_sum_variables = []

    def maxdaily_from_6hrly(day_ms):
        return ee.Image(collection.filterDate(
            ee.Date(day_ms), ee.Date(day_ms).advance(1,'day')).max()).set({
                "system:index":ee.Date(day_ms).format('yMMdd'),
                "system:time_start":day_ms,
                "system:time_end":ee.Date(day_ms).advance(1,'day').millis()})
    def mindaily_from_6hrly(day_ms):
        return ee.Image(collection.filterDate(
            ee.Date(day_ms), ee.Date(day_ms).advance(1,'day')).min()).set({
                "system:index":ee.Date(day_ms).format('yMMdd'),
                "system:time_start":day_ms,
                "system:time_end":ee.Date(day_ms).advance(1,'day').millis()})
    def meandaily_from_6hrly(day_ms):
        return ee.Image(collection.filterDate(
            ee.Date(day_ms), ee.Date(day_ms).advance(1,'day')).mean()).set({
                "system:index":ee.Date(day_ms).format('yMMdd'),
                "system:time_start":day_ms,
                "system:time_end":ee.Date(day_ms).advance(1,'day').millis()})
    def sumdaily_from_6hrly(day_ms):
        return ee.Image(collection.filterDate(
            ee.Date(day_ms), ee.Date(day_ms).advance(1,'day')).sum()).set({
                "system:index":ee.Date(day_ms).format('yMMdd'),
                "system:time_start":day_ms,
                "system:time_end":ee.Date(day_ms).advance(1,'day').millis()})

    if var in CFSV2_max_variables:
        collection = ee.ImageCollection.fromImages(day_ms_list.map(maxdaily_from_6hrly))
    elif var in CFSV2_min_variables:
        collection = ee.ImageCollection.fromImages(day_ms_list.map(mindaily_from_6hrly))
    elif var in CFSV2_mean_variables:
        collection = ee.ImageCollection.fromImages(day_ms_list.map(meandaily_from_6hrly))
    elif var in CFSV2_sum_variables:
        collection = ee.ImageCollection.fromImages(day_ms_list.map(sumdaily_from_6hrly))
    return collection
