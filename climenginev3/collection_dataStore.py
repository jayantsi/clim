############################################
##       GET MAX DATE                     ##
############################################
import calendar
import datetime
import threading
import time

import ee

#import logging
#import loggerFunctions

############################################
##       STATICS                          ##
############################################
defaults_yearClim = {
    'CFSV2':    {'yearStartClim':'1979','yearEndClim':'default','yearTarget':'2014'},
    'CHIRPS':   {'yearStartClim':'1981','yearEndClim':'default','yearTarget':'2014'},
    'G':        {'yearStartClim':'1981','yearEndClim':'2010','yearTarget':'2010'},
    'PFV52':    {'yearStartClim':'1981','yearEndClim':'2010','yearTarget':'2010'},
    'L5_SR':    {'yearStartClim':'1984','yearEndClim':'default','yearTarget':'2012'},
    'L5_TOA':   {'yearStartClim':'1984','yearEndClim':'default','yearTarget':'2012'},
    'L7_SR':    {'yearStartClim':'1999','yearEndClim':'default','yearTarget':'2014'},
    'L7_TOA':   {'yearStartClim':'1999','yearEndClim':'default','yearTarget':'2014'},
    'L8_SR':    {'yearStartClim':'2013','yearEndClim':'default','yearTarget':'2014'},
    'L8_TOA':   {'yearStartClim':'2013','yearEndClim':'default','yearTarget':'2014'},
    'L_TOA':    {'yearStartClim':'1982','yearEndClim':'default','yearTarget':'2014'},
    'L_SR':     {'yearStartClim':'1982','yearEndClim':'default','yearTarget':'2014'},
    'M':        {'yearStartClim':'2001','yearEndClim':'default','yearTarget':'2014'},
    'PFV52':    {'yearStartClim':'2012','yearEndClim':'2012','yearTarget':'2005'},
    'MACA':     {'yearStartClim':'1950','yearEndClim':'2005','yearTarget':'2005','yearStartClimFut':'2030','yearEndClimFut':'2059'},
    'NASANEX':  {'yearStartClim':'1950','yearEndClim':'2005','yearTarget':'2005','yearStartClimFut':'2030','yearEndClimFut':'2059'}
}

default_maxDateCalc = [
    #productNameInMemCache, collectionName, sampleVariable, productName
    ['CFSV2', ('NOAA/CFSV2/FOR6H', 'Minimum_temperature_height_above_ground_6_Hour_Interval', 'CFSV2')],
    ['CHIRPS', ('UCSB-CHG/CHIRPS/PENTAD', 'precipitation', 'CHIRPS')],
    ['G', ('IDAHO_EPSCOR/GRIDMET', 'pr', 'G')],
    #['L5_8day', ('LANDSAT/LT5_L1T_8DAY_NBRT', 'NBRT', 'L5_TOA')],
    #['L5_daily', ('LANDSAT/LT5_L1T_TOA', 'B5', 'L5_TOA')],
    ['L7_8day', ('LANDSAT/LE7_L1T_8DAY_NBRT', 'NBRT', 'L7_TOA')],
    ['L7_daily', ('LANDSAT/LE7_L1T_TOA', 'B5', 'L7_TOA')],
    ['L8_8day', ('LANDSAT/LC8_L1T_8DAY_NBRT', 'NBRT', 'L8_TOA')],
    ['L8_SR', ('LANDSAT/LC8_SR', 'B5', 'L8_SR')],
    ['L8_daily', ('LANDSAT/LC8_L1T_TOA', 'B5', 'L8_TOA')],
    ['L_daily', ('LANDSAT/LC8_L1T_TOA', 'B5', 'L_TOA')],
    ['MODIS_16day', ('MODIS/MCD43A4_NDVI', 'NDVI', 'M')],
    ['MODIS_8day', ('MODIS/MOD10A1', 'Fractional_Snow_Cover', 'M')],
    ['MODIS_daily', ('MODIS/MOD11A2', 'LST_Day_1km', 'M')],
    #['PFV52', ('NOAA/AVHRR_Pathfinder_V52_L3', 'sea_surface_temperature', 'PFV52')],
    #['MACA',('','','MACA'),
    #['NASANEX',('','','NASANEX'),
]

names_memcache = {
    'CFSV2':    {'default':'CFSV2'},
    'CHIRPS':   {'default':'CHIRPS'},
    'G':        {'default':'G'},
    'PFV52':    {'default':'PFV52'},
    'MACA':     {'default':'MACA'},
    'NASANEX':  {'default':'NASANEX'},
    'L5_SR':    {'NBRT':'L5_8day','default':'L5_daily'},
    'L5_TOA':   {'NBRT':'L5_8day','default':'L5_daily'},
    'L7_SR':    {'NBRT':'L7_8day','default':'L7_daily'},
    'L7_TOA':   {'NBRT':'L7_8day','default':'L7_daily'},
    'L8_SR':    {'NBRT':'L8_8day','default':'L8_daily'},
    'L8_TOA':   {'NBRT':'L8_8day','default':'L8_daily'},
    'L8_daily': {'NBRT':'L_8day','default':'L8_SR'},
    'L_TOA':    {'NBRT':'L_8day','default':'L_daily'},
    'L_daily':  {'NBRT':'L_8day','default':'L_daily'},
    'L_SR':     {'NBRT':'L_8day','default':'L8_SR'},
    'M':        {'Fractional_Snow_Cover':'MODIS_16day','LST_Day_1km':'MODIS_8day','default':'MODIS_16day'}
}
#these are the variable names above that do not have the default values
names_notdefault=['Fractional_Snow_Cover','LST_Day_1km','NBRT']

maxDates_lookup={
    'G':'maxDate_G',
    'CHIRPS':'maxDate_CHIRPS',
    'CFSV2':'maxDate_CFSV2',
    'MODIS_daily':'maxDate_MODIS_daily',
    'MODIS_8day':'maxDate_MODIS_8day',
    'MODIS_16day':'maxDate_MODIS_16day',
    'L_daily':'maxDate_LANDSAT_daily',
    'L5_daily':'maxDate_LANDSAT5_daily',
    'L7_daily':'maxDate_LANDSAT7_daily',
    'L8_daily':'maxDate_LANDSAT8_daily',
    'L8_SR':'maxDate_L8_SR',
    'L5_8day':'maxDate_LANDSAT5_8day',
    'L7_8day':'maxDate_LANDSAT7_8day',
    'L8_8day':'maxDate_LANDSAT8_8day',
    'L_8day':'maxDate_LANDSAT8_8day',
    'PFV52':'maxDate_PFV52'
}

defaults_maxDates={
    'CFSV2':       '2016-05-05',
    'CHIRPS':      '2016-03-31',
    'G':           '2016-05-01',
    'L5_8day':     '2011-11-25',
    'L5_daily':    '2011-11-17',
    'L7_8day':     '2016-04-30',
    'L7_daily':    '2016-05-02',
    'L8_8day':     '2016-04-30',
    'L_8day':      '2016-04-30',
    'L8_SR':       '2015-12-31',
    'L8_daily':    '2016-05-02',
    'L_daily':     '2016-05-02',
    'MODIS_16day': '2016-04-14',
    'MODIS_8day':  '2016-05-04',
    'MODIS_daily': '2016-04-22',
    'PFV52':       '2012-12-31',
    'MACA':        '2012-12-31',
    'NASANEX':     '2012-12-31'
}


#############################################
##      GET MAX DATE                       ##
#############################################
# This function gets the last date of data from each collection
def maxDateWorker(coll_name, variable, product, t_idx, maxDates):
    '''
    Sets maxDate for collection, var, product
    Saves results in maxDates[product]
    where t_idx is the thread index
    '''
    if product in ['PFV52','MACA','NASANEX']:
        maxDates[default_maxDateCalc[t_idx][0]] = defaults_maxDates[product]
    elif product in ['L5_TOA', 'L5_SR'] and variable=='NBRT':
        maxDates[default_maxDateCalc[t_idx][0]] = defaults_maxDates['L5_8day']
    elif product in ['L5_TOA', 'L5_SR']:
        maxDates[default_maxDateCalc[t_idx][0]] = defaults_maxDates['L5_daily']
    else:
        dateStart = (
            datetime.datetime.today() -
            datetime.timedelta(days=120)).strftime('%Y-%m-%d')
        dateEnd = datetime.datetime.today().strftime('%Y-%m-%d')
        collection = ee.ImageCollection(coll_name) \
            .select(variable)\
            .filterDate(dateStart, dateEnd)
        #get geometry
        if product in ['L_TOA', 'L7_TOA', 'L8_TOA', 'L_SR', 'L7_SR', 'L8_SR']:
            # Separate points wasn't working, but a box does
            # The box could probably be the whole U.S, but this should be
            #   enough to determine Landsat scene availability
            test_points = ee.Geometry.Rectangle(
                [-125, 39, -70, 40], 'EPSG:4326', False)
        else:
            test_points = ee.Geometry.Point(-122.47, 37.77)

        try:
            # Get the system ID of the "last" image in the collection
            coll_info = collection\
                .filterBounds(test_points)\
                .limit(1, 'system:time_start', False)\
                .getInfo()
            image_id = coll_info['features'][0]['properties']['system:index']
        except:
            return False

        # Parse the system IDs to get the max image date
        if product in ['L_TOA', 'L7_TOA', 'L8_TOA', 'L_SR', 'L7_SR', 'L8_SR']:
            if variable == 'NBRT': #8-day composite
                maxDate = datetime.datetime.strptime(image_id[:8], '%Y%m%d')
            else:
                # LC8 / 045 / 034 / 2015 / 247 / LGN / 00, where yr=2015,doy=247
                maxDate = datetime.datetime.strptime(image_id[9:16], '%Y%j')
        elif product == 'M':
            maxDate = datetime.datetime.strptime(image_id[12:22], '%Y_%m_%d')
        elif product == 'CHIRPS':
            # CHIRPS wants end of month reported
            # Use calendar.monthrange to get number of days in month
            # This avoids an error when adding 1 to month 12
            maxDate = datetime.datetime(
                int(image_id[0:4]),
                int(image_id[4:6]),
                calendar.monthrange(int(image_id[0:4]), int(image_id[4:6]))[1])
        else:
            # Assume first 8 characters of ID are YYYYMMDD
            maxDate = datetime.datetime.strptime(image_id[:8], '%Y%m%d')

        # Convert date object to ISO format
        maxDates[default_maxDateCalc[t_idx][0]] = maxDate.strftime("%Y-%m-%d")

#############################################
##       GET_MAXDATES_FOR_ALL_COLLECTIONS  ##
#############################################
def get_all_maxDates():
    import loggerFunctions
    logger_temp = loggerFunctions.set_logger('maxDates')
    threads = [None for p in default_maxDateCalc]
    maxDates = {}
    # Loop over default_maxDateCalc defined in STATIC section
    #   and start a thread for each product
    for t_idx, prod_args in enumerate(default_maxDateCalc):
        logger_temp.info('Running thread: ' + str(t_idx))
        logger_temp.info('Product: ' + prod_args[0])
        # Add thread index and thread data to arguments
        thread_args = prod_args[1] + (t_idx, maxDates)
        t = threading.Thread(target=maxDateWorker, args=thread_args)
        # Keep track of the thread by putting it in a slot in threads
        threads[t_idx] = t
        # Start thread
        t.start()
    # Collect threads
    for t_idx, t in enumerate(threads):
        t.join(10)
    return maxDates
