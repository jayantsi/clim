#===========================================
#    TIME_SERIES METHODS
#===========================================
import datetime as dt
from time import sleep
import numpy as np
import json
import logging
import threading
import urllib2
import loggerFunctions
from operator import itemgetter
import ee
import collectionMethods
import collection_CFSV2
import formatData  #unit conversion, formatting of highcharts data and data window,running mean calc/formatting
#===========================================
#   STATICS
#===========================================
#Running mean colors for each of the seven points
rm_colors =['#FF0000','#FF6633','#FF0066','#FF6699','#FF00CC','#FF66FF','#CC00FF']

#percentiles for intraannual calc
percentiles = [[5, 95],[10,90],[25,75]]

#missing value
missing_value = -9999

#cumulative variables for computing climo
cumulative_variables=['pr','precipitation','pet','wb','gdd','Precipitation_rate_surface_6_Hour_Average']

#full day window for smoothing
smoothing_day_window=10  #maybe want 21-day full window?

#time series choices are broken up into _ yrs in thredding
yearstep_interannual = 10
yearstep_intraannual = 5
yearstep_daily = 5

max_pointsShapes=5

#========================================
#  GET_TIME_SERIES
#===========================================
def get_time_series(template_values, shape_type):
    """
    Time series request for points or fusion tables
    (shape_type p or ft, respectively)
    Args:
        template_values: a dictionary of user and system input
        shape_type: p (points) or ft (fusion tables)
    Returns:
        updated template_values with time series data
    """
    #================================
    logger = loggerFunctions.set_logger('points_debug')
    #Catch threading error with error
    error = None
    #Set the time variables variables (depends on timeSeriesCalc)
    time_vars = set_time_vars_for_processing(template_values,1)
    #Set collection and update template_values
    productTS = template_values['productTS']
    collection = set_collection(
        template_values,productTS, template_values['variableTS'],
        template_values['modelTS'], template_values['scenarioTS'],
        time_vars, 1, logger)
    if productTS =='MACA' or productTS=='NASANEX':
        scenarioTS = template_values['scenarioTS']
        collection = collection.filterMetadata("scenario", "equals",scenarioTS)
    collection2 = None
    if template_values['variable2display'] != 'none':
        time_vars2 = set_time_vars_for_processing(template_values,2)
        product2TS = template_values['product2TS']
        scenario2TS = template_values['scenario2TS']
        collection2 = set_collection(
            template_values, product2TS, template_values['variable2TS'],
            template_values['model2TS'], template_values['scenario2TS'],
            time_vars2, 2, logger)
        if product2TS =='MACA' or product2TS=='NASANEX':
            collection2 = collection2.filterMetadata("scenario", "equals",scenario2TS)
    #================================
    #Run threads and update template variables
    extra_template_values,timeSeriesTextData, timeSeriesGraphData = run_threads(
        collection,template_values, time_vars,1,shape_type,logger)
    extra_template_values['timeSeriesTextData'] = timeSeriesTextData
    extra_template_values['timeSeriesGraphData'] = json.dumps(timeSeriesGraphData)
    template_values.update(extra_template_values)
    if collection2:
        extra_template_values,timeSeriesTextData, timeSeriesGraphData = run_threads(
            collection2,template_values, time_vars2,2,shape_type,logger)
        extra_template_values['timeSeriesTextData2'] = timeSeriesTextData
        extra_template_values['timeSeriesGraphData2'] = json.dumps(timeSeriesGraphData)
        template_values.update(extra_template_values)
    #================================
    return template_values

#===========================================
#  SET COLLECTION
#===========================================
def set_collection(template_values, product, variable, model,scenario,time_vars, varnum,logger):
    '''
    Gets the collection for
    start/end date, product and variable
    Args:
        template_values: a dictionary of user and system input
        variable: climate variable
        time_vars: time variables for daily/interannual or intraannual requests
        logger: pytho logging object
    '''
    #================================
    #frequency ONLY matters for MACA and NASANEX.. not other data products
    frequency='daily'
    if product=='NASANEX':
        frequency='monthly'
    collection, coll_name, coll_desc, var_desc, notes = collectionMethods.get_collection(
        product, variable, model, scenario, frequency, logger=logger)
    #================================
    if(varnum==1):
        source = coll_desc + ' from ' + time_vars['dateStart'] + '-' + time_vars['dateStart'] + ''
        title = var_desc
        extra_template_values = {
            'source_time':source,
            'title_time':title,
            'productLongName_time':coll_desc,
            'variableShortName_time':var_desc,
            'notes_time': notes
        }
    else:
        source = coll_desc + ' from ' + time_vars['dateStart'] + '-' + time_vars['dateStart'] + ''
        title=" "
        extra_template_values = {
            'source2_time':source,
            'title_time':title,   #this should replace single var title
            'product2LongName_time':coll_desc,
            'variable2ShortName_time':var_desc,
            'notes2_time': notes
        }
    #Update template_values
    template_values.update(extra_template_values)
    #================================
    return collection
    #================================

#===========================================
#  SET TIME VAR
#===========================================
def set_time_vars_for_processing(TV,varnum):
    '''
    Set relevant time variables for processing of daily, inter/intra-annual
    time series
    Args:
        TV: template variables
    Returns:
        python dictionary, keys:
            dateStart, dateEnd -- date strings
            dateStart_int, dateEnd_int - integer times for dateStart/dateEnd
            yearStart, yearEnd
            seasonStart_doy, seasonEnd_doy -- day of year for season start/end
    '''
    #Initialize output dictionary
    processing_time_vars = {
        #for daily/inter/intra
        'dateStart':None,
        'dateEnd':None,
        'dateStart_int':None,
        'dateEnd_int':None,
        #for interannual
        'seasonStart_doy':None,
        'seasonEnd_doy':None,
        #for intraannual
        'yearStart':None,
        'yearEnd':None,
        'doyStart':None,
        'doyEnd':None
    }
    #Set time for the different timeSereiesCalc
    #================================
    if TV['timeSeriesCalc'] == 'days':
        if(varnum==1):
            processing_time_vars['dateStart'] = TV['dateStartTS']
            processing_time_vars['dateEnd'] = TV['dateEndTS']
        else:
            processing_time_vars['dateStart'] = TV['dateStart2TS']
            processing_time_vars['dateEnd'] = TV['dateEnd2TS']
    #================================
    elif TV['timeSeriesCalc'] == 'interannual':
        if(varnum==1):
            processing_time_vars['dateStart'] = TV['yearStart'] + '-01-01'
            processing_time_vars['dateEnd'] = TV['yearEnd'] + '-12-31'
            #Find doy for season start/end
            sS_str = str(TV['yearStart']) + str(TV['monthStart']) + str(TV['dayStart'])
            sE_str = str(TV['yearEnd']) + str(TV['monthEnd']) + str(TV['dayEnd'])
        else:
            processing_time_vars['dateStart'] = TV['yearStart2'] + '-01-01'
            processing_time_vars['dateEnd'] = TV['yearEnd2'] + '-12-31'
            #Find doy for season start/end
            sS_str = str(TV['yearStart2']) + str(TV['monthStart2']) + str(TV['dayStart2'])
            sE_str = str(TV['yearEnd2']) + str(TV['monthEnd2']) + str(TV['dayEnd2'])
        processing_time_vars['seasonStart_doy'] = int(dt.datetime.strptime(sS_str, '%Y%m%d').timetuple().tm_yday)
        processing_time_vars['seasonEnd_doy'] = int(dt.datetime.strptime(sE_str, '%Y%m%d').timetuple().tm_yday)
    #================================
    elif TV['timeSeriesCalc'] =='intraannual':
        if(varnum==1):
            #Get data for all available years
            processing_time_vars['dateStart'] = TV['minDate']
            processing_time_vars['dateEnd'] = TV['maxDate']
            #Find doy for period of interest
            S_str = TV['yearTargetForm'] + '-' + TV['monthStart'] + '-' + TV['dayStart']
            yrT = TV['yearTargetForm']
        else:
            #Get data for all available years
            processing_time_vars['dateStart'] = TV['minDate2']
            processing_time_vars['dateEnd'] = TV['maxDate2']
            #Find doy for period of interest
            S_str = TV['yearTargetForm'] + '-' + TV['monthStart2'] + '-' + TV['dayStart2']
            yrT = TV['yearTargetForm']
        processing_time_vars['yearStart'] = processing_time_vars['dateStart'][0:4]
        processing_time_vars['yearEnd'] = processing_time_vars['dateEnd'][0:4]
        processing_time_vars['doyStart'] = int(dt.datetime.strptime(S_str, '%Y-%m-%d').timetuple().tm_yday)
        if formatData.is_leap_year(yrT):
            yr_len = 366
        else:
            yr_len = 365
        doyE = processing_time_vars['doyStart'] + yr_len
        if doyE > yr_len + 1:
            doyE-= yr_len + 1
        processing_time_vars['doyEnd'] = doyE
    #================================
    #Set integer times on start/end dates
    processing_time_vars['dateStart_int'] = formatData.date_string_to_millis(processing_time_vars['dateStart'])
    processing_time_vars['dateEnd_int'] = formatData.date_string_to_millis(processing_time_vars['dateEnd'])
    #processing_time_vars['dateStart_int'] = ee.Date(processing_time_vars['dateStart'], 'GMT').millis().getInfo()
    #processing_time_vars['dateEnd_int'] = ee.Date(processing_time_vars['dateEnd'], 'GMT').millis().getInfo()

    #================================
    return processing_time_vars

def processPointData(template_values, extra_template_values, time_vars, point_info, logger,timeSeriesTextData,timeSeriesGraphData,varnum):
    logger = loggerFunctions.set_logger('info')

    name = point_info['name']
    altname = point_info['altname']
    marker_color = point_info['marker_color']

    #Initialize the data dicts
    data_dict_ts = formatData.initialize_timeSeriesTextDataDict(name, altname=altname)
    data_dict_graph = formatData.initialize_timeSeriesGraphDataDict(name,marker_color,altname=altname)

    #logger.info('**********timeSeriesCalc************'+template_values['timeSeriesCalc'])
    climoData=[]
    percentileData = []
    #process data according to what timeSereisCalc is
    if template_values['timeSeriesCalc'] == 'days':
        data_dict_ts['Data'],data_dict_graph['Data'] = process_daily_threadData(
            point_info['data'],template_values,varnum)
    elif template_values['timeSeriesCalc'] == 'interannual':
        sS_doy = time_vars['seasonStart_doy']
        sE_doy = time_vars['seasonEnd_doy']
        data_dict_ts['Data'],data_dict_graph['Data'] = process_interannual_threadData(
            point_info['data'], template_values, sS_doy, sE_doy, varnum,logger)
    elif template_values['timeSeriesCalc'] == 'intraannual':
        #logger.info('**********inside intrannaul************')
        #get data for all years stored in dict with keys year
        doyS = time_vars['doyStart']
        doyE = time_vars['doyEnd']
        yS = time_vars['yearStart']
        yE = time_vars['yearEnd']
        year_dict_ts,year_dict_graph, climoData, percentileData =process_intraannual_threadData(
            point_info['data'], template_values,doyS, doyE, yS, yE, varnum,logger)
        for year in range(int(yS),int(yE) +1):
            '''
            if year in year_dict_ts.keys() and year_dict_ts[year]:
                data_dict_ts['Data'].append(year_dict_ts[year])
            if year in year_dict_graph.keys() and year_dict_graph[year]:
                data_dict_graph['Data'].append(year_dict_graph[year])
            '''
            data_dict_ts['Data'].append(year_dict_ts[year])
            data_dict_graph['Data'].append(year_dict_graph[year])
    timeSeriesTextData.append(data_dict_ts)
    timeSeriesGraphData.append(data_dict_graph)

    if climoData:
        if varnum == 1:
            extra_template_values['climoData'] = json.dumps(climoData)
        if varnum == 2:
            extra_template_values['climoData2'] = json.dumps(climoData)
    if percentileData:
        if varnum == 1:
            extra_template_values['percentileData'] = json.dumps(percentileData)
        if varnum == 2:
            extra_template_values['percentileData2'] = json.dumps(percentileData)
    return extra_template_values,timeSeriesTextData,timeSeriesGraphData

#===========================================
#    PROCESS THREADDATA FOR DAILY
#===========================================
def process_daily_threadData(data, TV,varnum):
    '''
    Args:
        data: unformatted data returned by ee time series request
        TV: template_variables
    Returns:
        time series data for text display
        time series graph data for plotting with highcharts
    '''
    #================================
    if(varnum==1):
        var = TV['variableTS']
        units = TV['unitsTS']
        product = TV['productTS']
    else:
        var = TV['variable2TS']
        units = TV['unitsTS']
        product = TV['product2TS']
    ts_data = []
    graph_data =[]
    #Shape of dataset and the format of the row data
    #depends on subDomainTypeTS: points, customShapes, hucs, ...
    #We need to initialize data and get the correct row formatter
    #dataset = formatData.set_ts_processing_data(data, TV['subDomainTypeTS'])
    #format_row = getattr(formatData,TV['subDomainTypeTS'] + '_row_formatter')
    dates = []
    for row_data in data:
        #row_data = format_row(d, var)
        ts_row_data = formatData.process_timeSeriesTextData(row_data, var, units, product)
        graph_row_data = formatData.process_timeSeriesGraphData(row_data, var, units,product)
        if graph_row_data:
            #Omit duplicates resulting from landsat scene overlaps
            if ts_row_data[0] not in dates or ts_row_data[0] == '9999-99-99':
                graph_data.append(graph_row_data)
        if ts_row_data[0] not in dates or ts_row_data[0] == '9999-99-99':
            ts_data.append(ts_row_data)
        dates.append(ts_row_data[0])
    #================================
    return sorted(ts_data), sorted(graph_data)


#===========================================
#    PROCESS THREADDATA SEASONAL -INTERANNUAL
#===========================================
def process_interannual_threadData(data,TV,doyS, doyE,varnum,logger):
    '''
    Processes Seasonal data
    Args:
        data: unformatted data returned by ee time series request
        TV: template_variables
        doyS: season start day of year
        doyE: season end day of year
        varnum: 1 or 2 for first/second variable, respectively
        logger: python logging object
    Returns:
        time series data for text display
        time series graph data for plotting with highcharts
    '''
    graph_data = []
    ts_data = []
    if varnum == 1:
        var = TV['variableTS']
        units = TV['varUnitsTS']
        product = TV['productTS']
    if varnum == 2:
        var = TV['variable2TS']
        units = TV['var2UnitsTS']
        product = TV['product2TS']
    for yr_data in data:
        ts_row_data = formatData.process_timeSeriesTextData(yr_data, var, units, product)
        #change date format to year
        try:
            ts_row_data[0] = ts_row_data[0][0:4]
        except:
            pass
        graph_row_data = formatData.process_timeSeriesGraphData(yr_data, var, units,product)
        if graph_row_data:
            graph_data.append(graph_row_data)
        ts_data.append(ts_row_data)
    #================================
    return sorted(ts_data), sorted(graph_data)

#===========================================
#    PROCESS THREADDATA INTRAANNUAL
#===========================================
def process_intraannual_threadData(data, TV, doyS, doyE, yS, yE, varnum,logger):
    '''
    Processes data for intraannual time series
    Args:
        data: contains data for all years in period of record for the vraiable
        TV: template_variable dict
        doyS: day of year of target year start (dateStart)
        doyE: day of year of target year end (dateEnd)
        yS: start year of record
        yE: end year of record
        logger: logger for debugging
    Returns:
       time series data for text display
       time series graph data for plotting with highcharts
    '''
    #================================
    #percentiles is static global variable

    ts_data = []
    graph_data = []
    if varnum == 1:
        var = TV['variableTS']
        units = TV['unitsTS']
        product = TV['productTS']
        yearTarget = TV['yearTargetForm']
    if varnum == 2:
        var = TV['variable2TS']
        units = TV['unitsTS']
        product = TV['product2TS']
        yearTarget = TV['yearTarget2Form']
    year_change = False
    if doyS != 1:year_change = True
    #================================
    year_graph_data= {}
    year_txt_data = {}
    #Save doys and data values for non-daily MODIS/LANDSAT data
    year_doy_data = {}
    #Store data for each year separately
    for year in range(int(yS), int(yE) + 1):
        year_graph_data[year] = []
        year_txt_data[year] =[]
        year_doy_data[year] ={}
    #================================
    #For each year, pick the corresponding data
    #And store them in a dict, keys are the years
    #sorted_data = sorted(data, key=itemgetter(3))
    dates = []
    for row_data in sorted(data):
        d = row_data[0]
        lon = row_data[1]
        lat = row_data[2]
        try:time_int = int(row_data[3])
        except:time_int = int(row_data[3][0:-1])
        try:val = float(row_data[4])
        except:val = missing_value
        #Note MODIS/LANDSAT have odd datestrings
        #We use the integer time instead to find the proper date string
        #find year and doy
        date_obj = dt.datetime.utcfromtimestamp(float(time_int) / 1000)
        date_str = date_obj.strftime('%Y-%m-%d')
        data_year = int(date_str[0:4])
        date_dt = dt.datetime.strptime(date_str, '%Y-%m-%d')
        doy = int(date_dt.timetuple().tm_yday)
        #Process data row
        new_row_data = [date_str,lon,lat,time_int,val]
        d_txt = formatData.process_timeSeriesTextData(new_row_data,var, units, product)
        d_g = formatData.process_timeSeriesGraphData(new_row_data, var, units,product)
        #Set year index
        year_idx = None
        if not year_change and 1 <= doy <= 366:
            year_idx = data_year
        elif year_change and doyS <= doy <= 366:
            year_idx = data_year
        elif year_change and 1 <= doy <= doyE and str(data_year) != yS:
            year_idx = data_year - 1
        if not d_txt or year_idx is None:continue
        #Landsat scenes overlap so make sure dates are unique
        #NOTE:for cumulative calculations, only graph values are adjusted
        #text data are listed as values, might want to change that later?
        if date_str not in dates or date_str == '9999-99-99':
            dates.append(date_str)
            year_txt_data[year_idx].append(d_txt)
            if var in cumulative_variables:
                if year_graph_data[year_idx]:
                    #Pick last data value
                    summ = float(year_graph_data[year_idx][-1][1])
                else:
                    #first value for year
                    summ = 0.0
                #Add this value to summ
                if val != missing_value:summ = round(summ + val,4)
                year_graph_data[year_idx].append([time_int,summ])
                year_doy_data[year_idx][doy] = [time_int,summ]
            else:
                #Not cumulative
                if d_g:
                    year_graph_data[year_idx].append(d_g)
                    year_doy_data[year_idx][doy] = d_g

    #================================
    # Sort data, compute climo and percentiles
    #================================
    climoData = []
    percentileData = [[] for p in percentiles]
    for year in range(int(yS), int(yE) + 1):
        year_graph_data[year] = sorted(year_graph_data[year])
        year_txt_data[year] = sorted(year_txt_data[year])
    #================================
    #Climo and percentile computation
    yr = int(TV['yearTargetForm'])
    semiWindowDaysSmoothing = 10
    if not year_change:
        doy_list = range(1,367)
    else:
        doy_list = range(int(doyS), 367) + range(1,int(doyE)+1)
    for doy_idx, doy in enumerate(doy_list):
        #Convert target year and doy to integer time
        if doy < 60:
            if varnum ==1:
                datetime = dt.datetime(yr, int(TV['monthStart']), int(TV['dayStart'])) + dt.timedelta(days=doy_idx)
            else:
                datetime = dt.datetime(yr, int(TV['monthStart2']), int(TV['dayStart2'])) + dt.timedelta(days=doy_idx)
        else:
            if varnum == 1:
                datetime = dt.datetime(yr, int(TV['monthStart']), int(TV['dayStart'])) + dt.timedelta(days=doy_idx - 1)
            else:
                datetime = dt.datetime(yr, int(TV['monthStart2']), int(TV['dayStart2'])) + dt.timedelta(days=doy_idx - 1)
        #epoch = dt.datetime(1970,1,1)
        epoch = dt.datetime.utcfromtimestamp(0)
        int_time = int((datetime - epoch).total_seconds() * 1000)
        doy_vals = []
        d_array = []
        #cumulative values
        '''
        summ = 0
        if var in cumulative_variables:
            for year in range(int(yS), int(yE) + 1):
                if doy in year_doy_data[year].keys():
                    doy_vals.append(summ + year_doy_data[year][doy][1])
                else:
                    doy_vals.append(summ)
        else:
            for year in range(int(yS), int(yE) + 1):
               if doy in year_doy_data[year].keys():
                   doy_vals.append(year_doy_data[year][doy][1])
        '''
        for year in range(int(yS), int(yE) + 1):
            if doy in year_doy_data[year].keys():
                doy_vals.append(year_doy_data[year][doy][1])
        if doy_vals:
            d_array = np.array(doy_vals)
            climoData.append([int_time,np.mean(d_array)])
            for p_idx, p in enumerate(percentiles):
                pl = round(np.percentile(d_array, p[0]),4)
                pu = round(np.percentile(d_array, p[1]),4)
                percentileData[p_idx].append([int_time,pl,pu])

    #================================
    #  SORT DATA
    #================================
    climoData = sorted(climoData)
    for p_idx in range(len(percentileData)):
        percentileData[p_idx] = sorted(percentileData[p_idx])

    #================================
    #  SMOOTHE DATA
    #================================
    #smooth the climoData and the percentileData - wrap around with days of year
    filtersize = smoothing_day_window;
    if climoData:
        if var in cumulative_variables:
            climoData = formatData.compute_running_mean(climoData,filtersize)
        else:
            climoData = formatData.compute_circular_running_mean(climoData,filtersize)
    for p_idx, p in enumerate(percentiles):
        if percentileData[p_idx]:
            if var in cumulative_variables:
                percentileData[p_idx]=formatData.compute_circular_running_mean_bounds(percentileData[p_idx],filtersize)
            else:
                percentileData[p_idx]=formatData.compute_circular_running_mean_bounds(percentileData[p_idx],filtersize)
    #================================
    return year_txt_data, year_graph_data, climoData, percentileData

#===========================================
# THREADING FUNCTIONS
#===========================================
#===========================================
# THREADING workeRS
#===========================================
def interannual_worker(collection,shape,shape_type,dynamic_scale,start,end,sS_doy,sE_doy,product,var,stat,threadData,shape_idx,logger):
    def year_func(yr):
        year = ee.Date.fromYMD(yr,1,1,'GMT')
        if sS_doy > sE_doy:
            s = year.advance(- (366 - int(sS_doy) + 1), 'day')
            e = year.advance(int(sE_doy) -1, 'day')
        else:
            s = year.advance(int(sS_doy) - 1, 'day')
            e = year.advance(int(sE_doy) - 1, 'day')

        #Fusion tables have no method bounds()
        #c = collection.filterDate(s, e).filterBounds(shape.bounds())
        c = collection.filterDate(s, e).filterBounds(shape)

        #Convert subdaily data to daily
        if product == 'CFSV2':
            c = collection_CFSV2.convert_6hrly_to_daily(c,var,s,e,logger)

        if stat == 'Median':
            img = c.median()
        elif stat == 'Mean':
            img = c.mean()
        elif stat == 'Max':
            img = c.max()
        elif stat == 'Min':
            img = c.min()
        elif stat == 'Total':
            img = c.sum()

        try:
            reduced_image_data = img.reduceRegion(
                ee.Reducer.mean(),
                geometry=shape,
                scale=dynamic_scale,
                tileScale=1,
                crs="EPSG:4326",
                crsTransform=None,
                #maxPixels=long(10000000)
                bestEffort=True
            )
            #val = ee.Dictionary(reduced_image_data).get(var)
        except:
            reduced_image_data = ee.Dictionary({var:missing_value})
        return reduced_image_data

    #Set the scale for reduceRegion dynamically
    dynamic_scale = formatData.set_reduceRegionScale(shape, shape_type, product)
    #Make list of years
    s_year = dt.datetime.utcfromtimestamp(float(start) / 1000).strftime('%Y-%m-%d')[0:4]
    e_year = dt.datetime.utcfromtimestamp(float(end) / 1000).strftime('%Y-%m-%d')[0:4]
    data = []

    year_list = [int(year) for year in range(int(s_year), int(e_year))]
    #Convert to ee.List
    year_List = ee.List(year_list)

    #Map over years
    data_List = year_List.map(year_func)


    #Sometimes the getInfo calls fail sporadically
    for i in range(2):
        try:
            data_list = data_List.getInfo()
            break
        except Exception as e:
            data_list = [[{var:[]}] for yr in year_list]
            logger.info('EXCEPTION: ' + str(e))
            if i == 0:
                sleep(3)
                logger.info('RETRYING REQUEST')
            continue

    #Get results for each year
    for yr_idx in range(len(year_list)):
        yr_int = int(ee.Date.fromYMD(year_list[yr_idx],1,1,'GMT').millis().getInfo())
        try:
            data.append([None, None, None, yr_int, data_list[yr_idx][var]])
        except:
            data.append([None, None, None, yr_int, None])
    threadData[shape_idx].append(data)

def daily_worker(collection,shape,shape_type,dynamic_scale,start,end,product,var,threadData,shape_idx,logger):
        '''
        Threading worker for time series for points.
        Applies getInfo call on collection filtered by dates and point
        and stores thread results in appropriate spot in threadData
        Args:
            collection: ee ImageCollection
            point: ee.GeometryPoint/or ee.FeatureCollection (for fusion table)
            start: integer time of start date
            end: integer time of end date
            threadData: list to store thread results
            shape_idx: index to be populated in threadData
            logger: python logging object
        Returns:
        '''
        def average_over_region(img):
            try:
                reduced_image_data = img.reduceRegion(
                    ee.Reducer.mean(),
                    geometry=shape,
                    scale=dynamic_scale,
                    tileScale=1,
                    crs="EPSG:4326",
                    crsTransform=None,
                    #maxPixels=long(10000000)
                    bestEffort=True
                )
                val = reduced_image_data.get(var)
                #val = ee.Dictionary(reduced_image_data).get(var)
            except:
                val = missing_value
            d = [None, None, None,img.get("system:time_start"), val]
            feat = ee.Feature(None, {'Data': d})
            return feat
        #================================
        s = ee.Date(start, 'GMT')
        e = ee.Date(end, 'GMT')

        c = collection.filterDate(s, e).filterBounds(shape)
        #FIX ME: Weirdess in CFSV2 dates
        if product == 'CSFV2':
            e = e.advance(-1,'day')
        feats = ee.FeatureCollection(c.map(average_over_region))
        #Sometimes the getInfo calls fail sporadically
        for i in range(2):
            try:
                f_data = feats.aggregate_array('Data').getInfo()
                break
            except Exception as e:
                logger.info('EXCEPTION: ' + str(e))
                f_data = []
                if i == 0:
                    sleep(3)
                    logger.info('RETRYING REQUETS')
                continue
        threadData[shape_idx].append(f_data)

def start_threads(thread_vars, time_vars, logger):
    '''
    Starts threads for a point or shape
    Args:
        thread_vars: threading variables
        time_vars: time variables
        logger: python logging object
    '''
    #logger.info('SUBDOMAINTYPE: ' + thread_vars['subDomainTypeTS'])
    start = thread_vars['start']
    year = int(time_vars['dateStart'][0:4])
    num_years_in_step = int(thread_vars['step'] / (365 * 24 * 60 * 60 * 1000))
    t_idx = thread_vars['t_idx']
    threads = thread_vars['threads']
    threadData = thread_vars['threadData']
    geom = thread_vars['geometry']
    geom_type = thread_vars['shape_type']
    prod = thread_vars['product']
    dynamic_scale = formatData.set_reduceRegionScale(geom,geom_type, prod)
    logger.info('SCALE: ' + str(dynamic_scale))
    while start < time_vars['dateEnd_int']:
        t_idx+=1
        step = thread_vars['step']
        if start + step < time_vars['dateEnd_int']:
            end = start + step
        else:
            end = time_vars['dateEnd_int'] + 24 * 60 * 60 * 1000
            #end = time_vars['dateEnd_int']
        sS_doy = time_vars['seasonStart_doy']
        sE_doy = time_vars['seasonEnd_doy']

        #Start threads
        logger.info('STARTING THREAD FOR TIME SLICE %s, SHAPE %s' %(str(t_idx + 1),str(thread_vars['g_idx'] + 1)))
        if thread_vars['timeSeriesCalc'] == 'interannual':
            t_args = (
                thread_vars['collection'], geom,geom_type,dynamic_scale,start,end,
                sS_doy, sE_doy, prod, thread_vars['variable'], thread_vars['statistic'],
                threadData, thread_vars['g_idx'], logger)
            t = threading.Thread(target=interannual_worker, args=t_args)
        else:
            t_args = (
                thread_vars['collection'], geom,geom_type,dynamic_scale,start,end,
                prod,thread_vars['variable'],threadData, thread_vars['g_idx'], logger)
            t = threading.Thread(target=daily_worker, args=t_args)
        threads[thread_vars['g_idx']].append(t)
        t.start()
        #Update step and year
        start+=step
        #year+=1
        year+=num_years_in_step
    return threads, threadData

def collect_threads(thread_vars, shape_info, logger):
    for t_idx in range(len(thread_vars['threads'][thread_vars['g_idx']])):
        '''
        while thread_vars['threads'][thread_vars['g_idx']][t_idx].is_alive():
            thread_vars['threads'][thread_vars['g_idx']][t_idx].join(timeout=0.1)
        '''
        thread_vars['threads'][thread_vars['g_idx']][t_idx].join()
        shape_info['data'] = shape_info['data'] + thread_vars['threadData'][thread_vars['g_idx']][t_idx]
        #shape_info['data']+=thread_vars['threadData'][thread_vars['g_idx']][t_idx]
        logger.info('THREAD %s FINISHED AND DATA APPENDED' %(t_idx +1))

def run_threads(collection,template_values, time_vars, varnum,shape_type,logger):
    #Set up new template values
    extra_template_values = {}
    #================================
    #Note: EE has a 2500 img limit per request
    #We need to split up larger data request into smaller chunks
    #and run threads
    #================================
    #Set up threading parameters
    #================================
    #1 year step since 5 year step gives quota exceeded
    start = time_vars['dateStart_int']
    #logger.info('START: ' + time_vars['dateStart'])
    #logger.info('END: ' + time_vars['dateEnd'])
    if template_values['timeSeriesCalc'] == 'interannual':
        step = yearstep_interannual * 365 * 24 * 60 * 60 * 1000 #ms
    elif template_values['timeSeriesCalc'] == 'intraannual':
        step = yearstep_intraannual * 365 * 24 * 60 * 60 * 1000 #ms
    else:
        step = yearstep_daily * 365 * 24 * 60 * 60 * 1000 #ms

    threads = [[] for s in range(max_pointsShapes)]
    threadData = [[] for s in range(max_pointsShapes)]
    #================================
    #Set up threading vars
    t_idx = -1
    threading_vars = {
        'collection':collection,
        'shape_type':shape_type,
        'start':start,
        'step':step,
        't_idx':t_idx,
    }
    #================================
    #Start threading
    for s_idx in range(max_pointsShapes):
        checked = template_values[shape_type+str(s_idx + 1)+'check']
        displayed = template_values[shape_type+str(s_idx + 1)+'display']
        if(checked!='checked' or displayed != 'block'):
            continue
        s = template_values[shape_type+str(s_idx + 1)]
        if shape_type == 'ft':
            choicename = template_values['ftChoice'+str(s_idx + 1)]
            shapename = template_values['ftSubChoice'+str(s_idx + 1)]
            if choicename=='polygon':
                s = template_values['polygon'+str(s_idx + 1)]
                ll = s.replace(' ','').split(',')
                firstpoint = [round(float(ll[0]),4),round(float(ll[1]),4)]
                polygon_array = []
                for i in range(0,len(ll)/2):
                    polygon_array.append([round(float(ll[2*i]),4),round(float(ll[2*i+1]),4)])
                if len(polygon_array) == 2:
                    #BBOX
                    #cl = formatData.orient_bbox(polygon_array)
                    #shape = ee.Geometry.Rectangle(cl[0],cl[1],cl[2],cl[3])
                    shape = ee.Geometry.Rectangle(float(ll[0]),float(ll[1]),float(ll[2]),float(ll[3]))
                else:
                    #Close polygon
                    if str(polygon_array[-1]) != str(firstpoint):
                        polygon_array.append(firstpoint)
                    #Polygon coords need to be ordered CCW
                    polygon_array = formatData.orient_poly_ccw(polygon_array)
                    shape = ee.Geometry.Polygon(polygon_array)
            else:
                shape = ee.FeatureCollection('ft:'+s,'geometry')
                if(shapename!=""):
                    shapecolumnName = template_values['ft'+str(s_idx + 1)+'columnName']
                    shape=shape.filter(ee.Filter.eq(shapecolumnName,shapename))
        if shape_type == 'p':
            ll = s.split(',')
            if len(ll)!=2:
                ll = s.split(', ')
            point = [float(ll[0]), float(ll[1])]
            shape = ee.Geometry.Point(point)
            shapename = 'P' + s

        #Start threads
        thread_vars = {
            'geometry':shape,
            'g_idx':s_idx,
            'threads':threads,
            'threadData':threadData,
            'subDomainTypeTS':template_values['subDomainTypeTS'],
            'timeSeriesCalc':template_values['timeSeriesCalc'],
        }
        if varnum == 1:
            thread_vars['product'] = template_values['productTS']
            thread_vars['variable'] = template_values['variableTS']
            thread_vars['statistic'] = template_values['statisticTS']
        if varnum ==2:
            thread_vars['product'] = template_values['product2TS']
            thread_vars['variable'] = template_values['variable2TS']
            thread_vars['statistic'] = template_values['statistic2TS']
        thread_vars.update(threading_vars)
        #Start the threads and update threads/threadData
        threads, threadData = start_threads(thread_vars, time_vars,logger)
    #================================
    #Collect threading results
    timeSeriesTextData = []
    timeSeriesGraphData = []
    for s_idx in range(max_pointsShapes):
        s = template_values[shape_type+str(s_idx + 1)]
        checked = template_values[shape_type+str(s_idx + 1)+'check']
        displayed =template_values[shape_type+str(s_idx + 1)+'display']
        if(checked!='checked' or displayed != 'block'):
            continue
        if shape_type == 'ft':
            #name = 'FT'+str(s_idx + 1)
            name = ''
        if shape_type == 'p':
            ll = s.split(',')
            if len(ll)!=2:
                ll = s.split(', ')
            point = [float(ll[0]), float(ll[1])]
            name = '{0:0.2f}N,{1:0.2f}E'.format(point[1], point[0])
        shape_info = {
            'name':name,
            'altname':template_values[shape_type + str(s_idx + 1)+'altname'],
            'marker_color':template_values['marker_colors'][s_idx],
            'data':[]
        }
        thread_vars = {
            'g_idx':s_idx,
            'threads':threads,
            'threadData':threadData,
            'subDomainTypeTS':template_values['subDomainTypeTS']
        }
        thread_vars.update(threading_vars)
        collect_threads(thread_vars, shape_info, logger)

        #Get timeSeriessData and timeSeriesGraphData
        #And update template variables
        extra_template_values, timeSeriesTextData, timeSeriesGraphData = processPointData(
            template_values, extra_template_values, time_vars, shape_info,
            logger, timeSeriesTextData, timeSeriesGraphData, varnum)
    return extra_template_values,timeSeriesTextData, timeSeriesGraphData
