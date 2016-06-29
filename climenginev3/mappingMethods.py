#===========================================
#    MAPPING METHODS
#===========================================
import bisect
import datetime as dt
import json
import threading
import urllib2
import ee

import collectionMethods
import collection_CFSV2
import loggerFunctions
import math

#===========================================
#   GET_IMAGES
#===========================================
def get_images(template_values):
    """"""
    #from forms import stateLat, stateLong

    #set up logger
    logger = loggerFunctions.set_logger('get_images_debug')
    TV = {}
    for key, val in template_values.iteritems():
        TV[key] = val
    product = TV['product']
    var = TV['variable']
    model = TV['model']
    scenario = TV['scenario']
    calculation = TV['calculation']
    toolAction = TV['toolAction']
    yearStartClim = TV['yearStartClim']
    yearEndClim = TV['yearEndClim']
    statistic = TV['statistic']
    units = TV['units']
    palette = TV['palette']
    minColorbar = template_values['minColorbar']
    maxColorbar = template_values['maxColorbar']
    colorbarType = template_values['colorbarType']
    colorbarmap = template_values['colorbarmap']
    colorbarTicks = template_values['colorbarTicks']
    scale = TV['scale']
    downloadFilename = TV['downloadFilename']
    mask = TV['mask']
    if mask !='none':
        maskMin = TV['maskMin']
        maskMax = TV['maskMax']

    # Build EarthEngine date objects from date strings and explicitly set GMT
    # Note, by default EarthEngine date objects are already GMT
    if product in ['MACA', 'NASANEX']:
        monthList = [
            '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        yearStartClimFut = TV['yearStartClimFut']
        yearEndClimFut = TV['yearEndClimFut']
        yearStartClim = TV['yearStartClim']
        yearEndClim = TV['yearEndClim']
        #these are for calculating the source title
        if calculation in ['anom', 'anompercentof', 'anompercentchange', 'percentile','value']:
            dS = yearStartClimFut+'-'+TV['monthStartFut']+'-'+TV['dayStartFut']
            dE = yearEndClimFut+'-'+TV['monthEndFut']+'-'+TV['dayEndFut']
        else:
            dS = yearStartClim+'-'+TV['monthStartFut']+'-'+TV['dayStartFut']
            dE = yearEndClim+'-'+TV['monthEndFut']+'-'+TV['dayEndFut']
        #just need to get the doyfilter right with these
        dSFut = yearStartClimFut+'-'+TV['monthStartFut']+'-'+TV['dayStartFut']
        dSHist = yearStartClim+'-'+TV['monthStartFut']+'-'+TV['dayStartFut']
        if int(TV['monthEndFut']) > int(TV['monthStartFut']):
            dEFut = yearStartClimFut+'-'+TV['monthEndFut']+'-'+TV['dayEndFut']
            dEHist = yearStartClim+'-'+TV['monthEndFut']+'-'+TV['dayEndFut']
        else:
            dEFut = str(int(yearStartClimFut)+1)+'-'+TV['monthEndFut']+'-'+TV['dayEndFut']
            dEHist = str(int(yearStartClim)+1)+'-'+TV['monthEndFut']+'-'+TV['dayEndFut']
        dSUTC = ee.Date(dSHist, 'GMT')
        dEUTC = ee.Date(dEHist, 'GMT')

    else:
        dS = TV['dateStart']
        dE = TV['dateEnd']
        dSUTC = ee.Date(dS, 'GMT')
        dEUTC = ee.Date(dE, 'GMT')

    #==============
    #Initial Collection
    #==============
    frequency='daily'
    if product=='MACA' or product=='NASANEX':
        frequency='monthly'
    collection, coll_name, coll_desc, var_desc, notes = collectionMethods.get_collection(
        product, var, model, scenario, frequency,logger=logger)

    #==============
    #Calculation:Values,Climatology,Anomalies
    #==============
    #get_statistic returns ee.ImageCollection
    if calculation in ['value']:
        if product in ['MACA', 'NASANEX']:
            # This is future average
            # FilterDate is exclusive on the high end, include an extra day on dEUTC
            collection = collection.filterMetadata('scenario', 'equals', scenario)
            calc_img,clim_temp,clim_notes_temp,num_days = get_climatology(
                  collection, product, var, dSFut, dEFut, statistic,
                  calculation, yearStartClimFut, yearEndClimFut, logger=logger)
        elif product == 'CFSV2':  #convert 6hrly to daily
            collection = collection_CFSV2.convert_6hrly_to_daily(
                collection, var, dSUTC, dEUTC, logger)
            calc_img = get_statistic(collection, statistic, logger=logger)
        else:
            collection = collection.filterDate(dSUTC, dEUTC.advance(1,'day'))
            calc_img = get_statistic(collection, statistic, logger=logger)
    elif calculation in ['anom', 'anompercentof', 'anompercentchange', 'clim', 'percentile','zscore']:
        if product in ['MACA', 'NASANEX']:   #this is historical average
            hist_coll = collection.filterMetadata('scenario', 'equals', 'historical')
            clim_img, clim_coll, climatologyNotes,num_days = get_climatology(
                hist_coll, product, var, dSHist, dEHist, statistic,
                calculation, yearStartClim, yearEndClim, logger=logger)
        else:
            clim_img, clim_coll, climatologyNotes,num_days = get_climatology(
                collection, product, var, dS, dE, statistic,
                calculation, yearStartClim, yearEndClim, logger=logger)

        if calculation in ['clim']:
            calc_img = clim_img
        else:
            # anomaly = future wrt historical
            if product in ['MACA', 'NASANEX']:
                # This is future average
                future_col = collection.filterMetadata('scenario', 'equals', scenario)
                calc_img, clim_temp, clim_notes_temp,num_day = get_climatology(
                    future_col, product, var, dSFut, dEFut, statistic,
                    calculation, yearStartClimFut, yearEndClimFut, logger=logger)
                calc_img = get_anomaly(calc_img, clim_img, clim_coll, calculation,statistic,num_days)
            else:
                collection = collection.filterDate(dSUTC, dEUTC.advance(1, 'day'))
                calc_img = get_statistic(collection, statistic, logger=logger)
                calc_img = get_anomaly(calc_img, clim_img, clim_coll, calculation,statistic,1)

        TV['climatologyNotes'] = climatologyNotes

    #==============
    #Units
    #==============
    calc_img = modify_units(calc_img, var, product, calculation, units)

    #==============
    #Extra template values
    #==============
    extra_template_values = {
    }

    #==============
    #Apply Mask
    #==============
    if mask != 'none':
        maskMin = float(maskMin)
        maskMax = float(maskMax)
        if mask == 'above':
            calc_img = ee.Image(calc_img).mask(calc_img.lte(maskMax))
        elif mask == 'below':
            calc_img = ee.Image(calc_img).mask(calc_img.gte(maskMin))
        elif mask == 'exterior':
            calc_img = ee.Image(calc_img).mask(calc_img.lte(maskMin).Or(calc_img.gte(maskMax)))
        elif mask == 'interior':
            calc_img = ee.Image(calc_img).mask(calc_img.gte(maskMin).And(calc_img.lte(maskMax)))

    #==============
    #Get mapid
    #==============
    mapid = {'mapid':[], 'token':[]}
    ## Limit the image values to the min and max before visualizing
    ##here calc_img = ee.Image()
    vis_image = calc_img.clamp(float(minColorbar), float(maxColorbar))

    #we could change this to just if var in ['TrueColor', 'FalseColor'] instead of all the products
    if (product in ['L_TOA', 'L5_TOA', 'L7_TOA', 'L8_TOA', 'L_SR', 'L5_SR', 'L7_SR', 'L8_SR'] and
        var in ['TrueColor', 'FalseColor']):
        ## Hard code display of multi-band Landsat images (for now)
        ## Intentionally not using "vis_image" here to avoid clamp (for now)
        mapid = map_image(calc_img, TV['opacity'], None, minColorbar, maxColorbar)
        ## Bands can be set separately by passing a string of comma separate numbers
        ##mapid = map_image(calc_img, TV['opacity'], None, "0, 0, 0", "0.28, 0.28, 0.32")
    #elif ((colorbarmap == 'invUSDM' or colorbarmap == 'USDM') and calculation == 'percentile'):
    #    value_list = [3,6,10,20,30,40]
    #    mapid = map_image(apply_sld_colormap_styling_image(vis_image, palette, colorbarType, value_list))
    #elif ((colorbarmap == 'invUSDMwWet' or colorbarmap == 'USDMwWet') and
    #      calculation == 'percentile'):
    #    value_list = [3,6,10,20,30,70,80,90,94,97,100]
    #    mapid = map_image(apply_sld_colormap_styling_image(vis_image, palette, colorbarType, value_list))
    elif calculation == 'anompercentof':
        value_list = [int(i) for i in colorbarTicks.split(",")][1:]
        #value_list = [5,25,50,70,90,110,130,150,200,400,800]
        mapid = map_image(apply_sld_colormap_styling_image(vis_image, palette, colorbarType,value_list))
    elif colorbarType == 'continuous':
        mapid = map_image(
            vis_image, TV['opacity'], palette, minColorbar, maxColorbar)
    elif colorbarType == 'discrete':
        palette_list = palette.split(',')
        ## Intentionally add 1 to x since value needs to be for the max of the interval
        value_list = [
           float(minColorbar) + float(x + 1) * (float(maxColorbar) - float(minColorbar)) / len(palette_list)
           for x in xrange(len(palette_list))]
        mapid = map_image(apply_sld_colormap_styling_image(vis_image, palette, colorbarType,value_list))

    if mapid and mapid['mapid'] and mapid['token']:
        extra_template_values['mapid'] = mapid['mapid']
        extra_template_values['token'] = mapid['token']
        TV.update(extra_template_values)

    #==============
    #Get point value
    #==============
    if toolAction == 'showSingleValueOnMap':
        point_value = get_point_value(
            calc_img, float(TV['pointLat']), float(TV['pointLong']), var)
        extra_template_values['pointValue'] = '{0:0.4f}'.format(point_value)
        TV.update(extra_template_values)

    #==============
    #Region data extraction
    #==============
    if toolAction == 'downloadRectangleSubset' or toolAction=='downloadFusionTableSubset':
        #the rect coordinates here have been set for either rect or bounding box of fusion table
        NELat = TV['NELat']
        NELong = TV['NELong']
        SWLat = TV['SWLat']
        SWLong = TV['SWLong']
        rectangle = '[[' + SWLong + ',' + NELat + '],' + \
                     '[' + NELong + ',' + NELat + '],' + \
                     '[' + NELong + ',' + SWLat + '],' + \
                     '[' + SWLong + ',' + SWLat + ']]'
        downloadMapFormat =TV['downloadMapFormat']
        projection = TV['downloadProjection']

        if toolAction =='downloadFusionTableSubset':
            fusiontable = TV['fusiontabledownload']
            fusiontablename = TV['fusiontabledownloadname']

            region = ee.FeatureCollection('ft:'+fusiontable)
            if fusiontablename:
                region = region.filter(ee.Filter.eq('Name', fusiontablename))
            calc_img = calc_img.clip(region.geometry())
            rectangle = json.dumps(region.geometry().bounds().getInfo()['coordinates'])

        downloadOptions = {
           'name':downloadFilename,
           'scale':scale,
           'crs':projection,
           'region':rectangle,
           'maxPixels': 1e9,
           #'format':downloadMapFormat
        }

        #this is a way to get .tif to be non-blank
        #if downloadMapFormat=='png' or downloadMapFormat=='jpg' or downloadMapFormat=='tif':
        #    vis_image = calc_img.visualize(
        #        bands=var, min=float(minColorbar), max=float(maxColorbar),
        #        palette=palette.split(',')) #palette must be array of strings, not a string
        #    downloadURL = vis_img.getDownloadUrl(downloadOptions)
        #elif downloadMapFormat=='tif':
        downloadURL = calc_img.getDownloadUrl(downloadOptions)

        # getDownloadURL is the preferred "spelling" for this function
        # Switch at some point when everyone updates their earthengine-api
        #downloadURL = ???Export.Image(,'title',{'region': rectangle})
        extra_template_values['downloadURL'] = downloadURL
        TV.update(extra_template_values)

    #==============
    #Update template values
    #==============
    return TV

#===========================================
#    GET_CLIMATOLOGY
#===========================================
def get_climatology(collection, product, variable, dateStart, dateEnd,
                    statistic, calculation, yearStartClim, yearEndClim,
                    logger=None):
    """Return the climatology image
    Args:
        collection: EarthEngine collection to process (has already selected variable)
        product: string of the product ()
        variable: string of the variable ()
        dateStart: string of the start date isoformat (YYYY-MM-DD)
        dateEnd: string of the end date isoformat (YYYY-MM-DD)
        statistic: string of the statistic (Mean, Median, Total, etc.)
        calculation: string of the calculation type
            (anom, value, anompercentof,anompercentchange,clim)
        yearStartClim: string of the climatology start year
        yearEndClim: string of the climatology end year
        logger:
    Returns:
        EarthEngine image object
        String of additional notes about the collection
    """
    #==============
    logger = loggerFunctions.set_logger('get_images_debug')

    yearStartClim = int(yearStartClim)
    yearEndClim = int(yearEndClim)

    #Build python datetime objects from the date string
    dateStart_dt = dt.datetime.strptime(dateStart, '%Y-%m-%d')
    dateEnd_dt = dt.datetime.strptime(dateEnd, '%Y-%m-%d')

    #==============
    #Check timedelta between start and end is greater than 1 year
    def yearsahead(years, start_date):
        try:
            return start_date.replace(year=start_date.year + years)
        except:   # Must be 2/29!
            assert from_date.month == 2 and from_date.day == 29 # can be removed
            return from_date.replace(month=2, day=28, year=start_date.year+years)
    #Climo products will have less than a year to avg over too
    if dateEnd_dt <= yearsahead(1, dateStart_dt) or product in ['MACA', 'NASANEX']:
        sub_year_flag = False
        doyStart = dateStart_dt.timetuple().tm_yday
        doyEnd = dateEnd_dt.timetuple().tm_yday
        dayStart = dateStart[5:]
        dayEnd = dateEnd[5:]
        if(doyStart<doyEnd):
            num_days = len(range(doyStart,doyEnd))
        else:
            num_days = len(range(doyStart,366))+len(range(1,doyEnd))
    else:
        sub_year_flag = True
        doyStart = 1
        doyEnd = 366
        num_days = 366
    #==============
    if sub_year_flag:
        #List sequence is inclusive (i.e. don't advance yearEnd)
        yearListClim = ee.List.sequence(yearStartClim,yearEndClim) #list inclusive
        num_years =yearEndClim - yearStartClim + 1
    else:
        yearListClim = ee.List.sequence(yearStartClim,yearEndClim-1)#list inclusive
        num_years =yearEndClim -1 - yearStartClim + 1

    #==============Not technically correct.. takes min over a single year.. not min over the time period
    # these are both resulting in 429 errors right now and 500 server errors too
    doy_filter = ee.Filter.calendarRange(doyStart, doyEnd, 'day_of_year')
    if statistic == 'Min':
        def min_climatology_func(year):
            """For each year, return an image of the minimum value over the DOY range"""
            year_filter =ee.Filter.calendarRange(year, year, 'year')
            return ee.Image(collection.filter(year_filter).filter(doy_filter).min())
        climatology_coll = ee.ImageCollection.fromImages(
            yearListClim.map(min_climatology_func))
        climatology_img = get_statistic(climatology_coll, 'Mean', logger=logger)
    #==============Not technically correct.. takes max over a single year.. not max over the time period
    # these are both resulting in 429 errors right now... too many requests. and 500 server errors too
    elif statistic == 'Max':
        def max_climatology_func(year):
            """For each year, return an image of the minimum value over the DOY range"""
            year_filter =ee.Filter.calendarRange(year, year, 'year')
            return ee.Image(collection.filter(year_filter).filter(doy_filter).max())
        climatology_coll = ee.ImageCollection.fromImages(
             yearListClim.map(max_climatology_func))
        climatology_img = get_statistic(climatology_coll, 'Mean', logger=logger)
    #==============
    elif (statistic == 'Mean' or statistic == 'Total' or statistic == 'Median'):
        #FilterDate needs an extra day on the high end,Set yearEnd to Jan 1st of next year
        yearStartClimUTC = dt.datetime(yearStartClim, 1, 1)
        yearEndClimUTC = dt.datetime(yearEndClim+1, 1, 1)
        #===================
        climatology_coll=collectionMethods.get_climatology_collection(product, variable)
        if climatology_coll=='None' or (product=='G' and (yearEndClim!=1981 or yearStartClim!=2010)):  #no pre-calculated climos
            climatology_coll_temp = 'None'
            climatology_coll = collection.filterDate(
               yearStartClimUTC, yearEndClimUTC).filter(doy_filter)
        else: #yes pre-calculated climos
            climatology_coll_temp = 'Some'
            #climatology_coll = climatology_coll.filterMetadata('doy','greater_than',doyStart) \
            #   .filterMetadata('doy','not_greater_than',doyEnd)
            if doyStart <= doyEnd:
                # Date range is in same year
                climatology_coll = climatology_coll.filter(ee.Filter.And(
                    ee.Filter.gte('doy', doyStart),
                    ee.Filter.lte('doy', doyEnd)))
            else:
                # Date range wraps around to next year
                climatology_coll = climatology_coll.filter(ee.Filter.Or(
                    ee.Filter.gte('doy', doyStart),
                    ee.Filter.lte('doy', doyEnd)))
        #===================

        if not sub_year_flag:
            climatology_img = get_statistic(
                climatology_coll, statistic, logger=logger)
            if statistic=='Total' and climatology_coll_temp=='None':
                climatology_img =climatology_img.divide(num_years)
        else:
            climatology_img = get_statistic(
                climatology_coll, statistic, logger=logger)

    climatologyNote = 'Average calculated from {0}-{1}'.format(str(yearStartClim), str(yearEndClim))

    return climatology_img, climatology_coll,climatologyNote,num_days

#===========================================
#    GET_ANOMALY
#===========================================
def get_anomaly(calc_img,clim_img,clim_coll,calculation,statistic,num_days,logger=None):
    """"""
    if calculation == 'clim':
        calc_img = clim_img
    elif calculation == 'anom':
        calc_img = ee.Image(calc_img.subtract(clim_img))
    elif calculation == 'anompercentof':
        calc_img = ee.Image(calc_img.divide(clim_img).multiply(100)) #anomaly
    elif calculation == 'anompercentchange':
        calc_img = ee.Image(
            calc_img.subtract(clim_img).divide(clim_img).multiply(100)) #anomaly
    elif calculation=='zscore':
        std_img = clim_coll.reduce(ee.Reducer.stdDev()).multiply(math.sqrt(num_days))
        calc_img = ee.Image(calc_img.subtract(clim_img).divide(std_img)) #zscore
    elif calculation == 'percentile':
        pct_step = 5
        pct_list = ee.List.sequence(pct_step,100,pct_step)
        sampleImage = ee.Image(calc_img)
        percentileImage = clim_coll.reduce(ee.Reducer.percentile(pct_list))
        calc_img = ee.Image(sampleImage.lte(percentileImage).reduce(ee.Reducer.mean()).multiply(100).subtract(pct_step/2))
    return calc_img

#===========================================
#   GET_STATISTIC
#===========================================
def get_statistic(collection, statistic, logger=None):
    """Reduce an EarthEngine image collection for a given statistic

    Args:
        collection: EarthEngine image collection object
        statistics: string of the statistic to apply
            (Mean, Max, Min, Median, Total)
    Returns:
        EarthEngine image object
    """
    if statistic == 'Mean':
        stat_img = collection.mean()
    elif statistic == 'Max':
        stat_img = collection.max()
    elif statistic == 'Min':
        stat_img = collection.min()
    elif statistic == 'Median':
        stat_img = collection.median()
    elif statistic == 'Total':
        stat_img = collection.sum()
    if logger:
        ee_call = 'collection.' + statistic.lower() + '()'
        if ee_call == 'collect.total()':
            ee_call = 'collection.sum()'
        logger.info('EE CALL: ' + ee_call)
    return stat_img

#===========================================
#   GET_POINT_VALUE
#===========================================
def get_point_value(ee_img, lat, lon, var):
    """Extract a value from an EarthEngine image at a given lat/lon

    Args:
        ee_img: EarthEngine image object
        lat: float of the longitdue
        lon: float of the latitude
        var: string of the variable type
            This is only used if calling reduceRegion, not getRegion
    Returns:
        float
    """
    pointGeom = ee.Geometry.Point(lon, lat)

    ## Get value using getRegion
    ## getRegion on a single point returns a nested list with 5 items
    ##   [time, lon, lat, index, value]
    ## The first line is column/field names
    return float(ee.ImageCollection(ee_img).getRegion(pointGeom,1).getInfo()[1][4])

    ## Get value using reduceRegion
    ##return float(ee_img.reduceRegion(
    ##    ee.Reducer.first(),pointGeom,1).getInfo()[var])

#===========================================
#   MODIFY_UNITS
#===========================================
def modify_units(ee_img, variable, product,calculation, units):
    """Adjust the units of an EarthEngine image object

    Args:
        ee_img: EarthEngine image object
        variable: string of the variable/band
            (LST_Day_1km, tmmx, tmmn, tmean, pr, pet, wb, vs,dps,tasmax,tasmin)
        calculation: string of the calculation type
            (value, anom, clim, )
        units: string of the units type (english or metric)
    Returns:
        EarthEngine image object
    """
    #don't modify if calculation == 'anompercentof' or 'anompercentchange'
    if calculation in ['value', 'clim', 'anom']:
        ## First convert to "standard" units
        if variable in ['Precipitation_rate_surface_6_Hour_Average']:
            # Convert from kg/m2/s/24hr flux to mm/24hr
            ee_img = ee_img.multiply(3600 * 24)
            # Convert from kg/m2/s/6hr flux to mm/6hr
            #ee_img = ee_img.multiply(3600 * 6)
        if variable in ['Potential_Evaporation_Rate_surface_6_Hour_Average']:
            # #convert from W/m2 =MJ/m2/day - > mm/day with latent heat of vaporization 0.408
            ee_img = ee_img.multiply(0.408*0.0036*6)
        if variable in ['pr'] and product in ['NASANEX']:
            # Convert from kg/m2/s flux to mm/month
            # Assume 30 days in each month for now
            ee_img = ee_img.multiply(3600 * 24 * 30)
        if variable in ['LST_Day_1km']:
            ee_img = ee_img.multiply(0.02)  #convert from unsigned 16-bit integer

        ## Convert "standard" units to display friendly units
        if variable in ['tmmx', 'tmmn', 'tmean', 'LST_Day_1km', 'LST',
                        'Maximum_temperature_height_above_ground_6_Hour_Interval',
                        'Minimum_temperature_height_above_ground_6_Hour_Interval',
                        'Temperature_height_above_ground','dps','tasmax','tasmin',
                        'sea_surface_temperature']:
            if calculation == 'anom' and units == 'english':
                ee_img = ee_img.multiply(1.8)    #convert delta K to delta F
            elif calculation == 'value' or calculation == 'clim':
                ee_img = ee_img.subtract(273.15)  #convert K to C
                if units == 'english': #convert C to F
                    ee_img = ee_img.multiply(1.8).add(32)
        elif variable in ['pr', 'pet', 'wb','precipitation',
                          'Precipitation_rate_surface_6_Hour_Average',
                          'Potential_Evaporation_Rate_surface_6_Hour_Average']:
            if units == 'english':
                ee_img = ee_img.divide(25.4) #convert mm to inches
        elif variable in ['vs','u-component_of_wind_height_above_ground',
                          'v-component_of_wind_height_above_ground']:
            if units == 'english':
                ee_img = ee_img.multiply(2.23694) #convert m/s to mi/h
    return ee_img

#===========================================
#  APPLY SLD COLORMAP STYLING
#===========================================
def apply_sld_colormap_styling_image(ee_img, palette,colorbarType,value_list):
    """Apply a specific color ramp to an Earth Engine image

    Args:
        ee_img: EarthEngine image object
        palette: comma delimited string of color palette values
            (CSS-style hexadecimal color strings)
        value_list: specific values to go into the sld styling of colormap
    Returns:
        EarthEngine image object
    """

    palette_list = palette.split(',')

    ## Build and apply SLD RasterSymbolizer to image
    ## Quantity is the max value of the interval
    if colorbarType=='discrete':
        sld = '<RasterSymbolizer><ColorMap  type="intervals" extended="false" >'
    elif colorbarType=='continuous':
        sld = '<RasterSymbolizer><ColorMap extended="false" >'

    for palette, value in zip(palette_list, value_list):
        sld += '<ColorMapEntry color="#{0}" quantity="{1}" label="{1}" />'.format(
            palette, value)
    sld += '</ColorMap></RasterSymbolizer>'
    return ee_img.sldStyle(sld)

#===========================================
#   MAP_IMAGE
#===========================================
def map_image(ee_img, opacity=None, palette=None, minColorbar=None, maxColorbar=None):
    """Display the image on the map

    Args:
        ee_img: EarthEngine image object
        opacity: string/float of the image opacity
        palette: comma delimited string of color palette values
            (CSS-style hexadecimal color strings)
        minColorbar: string/float of the minimum value in continuous color ramp
        maxColorbar: string/float of the maximum value in continuous color ramp
    Returns:
        EarthEngine MapID
    """
    colorbarOptions = {}
    if opacity is not None:
        #set full opacity to 1... will set with slider after layer comes back
        colorbarOptions['opacity'] = '1.0'
    if minColorbar is not None:
        colorbarOptions['min'] = minColorbar
    if maxColorbar is not None:
        colorbarOptions['max'] = maxColorbar
    if palette is not None:
        colorbarOptions['palette'] = palette

    mapid = ee_img.getMapId(colorbarOptions)
    return mapid
