#===========================================
#    FORMAT DATA FOR HIGHCHARTS FIGURE AND DATA WINDOW
#===========================================
import datetime as dt
import numpy as np
import json
import logging
import threading
import urllib2
import loggerFunctions
from operator import itemgetter

import ee
import collectionMethods


#===========================================
#    STATIC
#===========================================
products_Landsat =['L_TOA', 'L5_TOA', 'L7_TOA', 'L8_TOA', 'L_SR', 'L5_SR', 'L7_SR', 'L8_SR']

missing_value=-9999

#===========================================


def orient_bbox(polygon_array):
    lons = sorted([polygon_array[0][0],polygon_array[1][0]])
    lats = sorted([polygon_array[0][1],polygon_array[1][1]])
    return [lons[0], lats[0], lons[1], lats[1]]

def orient_poly_ccw(polygon_array):
    sum1 = 0
    sum2 = 0
    for i in range(len(polygon_array[0:len(polygon_array) - 1])):
        sum1+=polygon_array[i][0]*polygon_array[i+1][1]
        sum2+=polygon_array[i+1][0]*polygon_array[i][1]
    sum1+=polygon_array[len(polygon_array) - 1][0]*polygon_array[0][1]
    sum2+=polygon_array[0][0]*polygon_array[len(polygon_array) - 1][1]
    A = sum1 - sum2
    #Already ccw
    if A >0:
        return polygon_array
    #cw, need to reverse the coords
    if A < 0:
        return list(reversed(polygon_array))
    if A == 0:
        return polygon_array

def is_leap_year(year):
    '''
    Check if year is leap year.
    '''
    yr = int(year)
    if yr % 100 != 0 and yr % 4 == 0:
        return True
    elif yr % 100 == 0 and yr % 400 == 0:
        return True
    else:
        return False

def date_string_to_millis(date_string):
    '''
    Converts a date string
    (yyyy-mm-dd,yyyymmdd or yyyy/mm/dd)
    to millis since 1970 epoch
    '''
    date = date_string.replace('-','').replace('/','')
    if len(date) != 8:
        return 0
    date_dt = dt.datetime.strptime(date, '%Y%m%d')
    epoch = dt.datetime.utcfromtimestamp(0)
    return (date_dt - epoch).total_seconds() * 1000.0

#===========================================
#   DYNAMIC SCALE FOR reduceRegion call
#===========================================
def set_reduceRegionScale(shape, shape_type, product):
    #Set the scale for reduceRegion dynamically
    if shape_type == 'p':
        scale = 300
    else:#shape Type is ft (includes polygons)
        scale = 4000 #MACA/Gridmet scale/CFSV2/CHIRPS
        if product == 'M':
            scale = 0.5
        if product in products_Landsat:
            #Set scale to max size in degrees / 120 (per Charles)
            #Get area in meters
            area = 100000000000000
            try:
                #Polygon
                area = abs(shape.area().getInfo())
            except:
                #Fusion Table
                try:
                    area = abs(shape.first().geometry().area().getInfo())
                except:
                    pass
            #Convert area to degrees
            max_dim = np.sqrt(area) / (111.0 * 1000)
            #Multiply max_dim by 120 (per Charles)
            #scale = round(max_dim *120, 2)
            scale = round(max_dim *10*120, 2)
    return scale

#===========================================
#   TIME SERIES PROCESSING DATASETS
#   FOR POINTS, FUSION TABLES AND OTHER SHAPES
#===========================================
def set_ts_processing_data(data, subDomainType):
    '''
    formats ee data for time series processing
    Args:
        data: data object returned by earth engine
        subDomainType: template_value['subDomainTypeTS']
    '''
    dataset = []
    if subDomainType == 'points':
        return data
    elif subDomainType == 'customShapes':
        return data['features']
    return dataset

#===========================================
#   ROW FORMATTERS
#   FOR POINTS, FUSION TABLES AND OTHER SHAPES
#===========================================
def points_row_formatter(row_data, var=None):
    return row_data
def customShapes_row_formatter(row_data, var):
    return [0,1,2,row_data['properties']['Time'],row_data['properties']['Data'][var]]

#===========================================
#   MODIFY_UNITS
#===========================================
def modify_units_in_timeseries(val, var, product, units):
    """"""
    new_val = val
    if var in ['Precipitation_rate_surface_6_Hour_Average']:
        #new_val= new_val*3600*6    #convert from kg/m2/s/6hr flux to mm/6hr
        new_val= round(new_val*3600*24,4)    #convert from kg/m2/s/24hr flux to mm/24hr
    if var in ['Potential_Evaporation_Rate_surface_6_Hour_Average']:
        #convert from W/m2 =MJ/m2/day - > mm/day with latent heat of vaporization 0.408
        new_val= round(new_val*0.408*0.0036*6,4)
    if var in ['pr'] and product in ['NASANEX']:
        new_val= round(new_val*3600*24*30,4)    #convert from kg/m2/s/month flux to mm/month (assumed 30 day month)
    if var in ['LST_Day_1km']:
        new_val = round(new_val * 0.02,4)  #convert from unsigned 16-bit integer
    if var in ['tmmx', 'tmmn', 'tmean', 'LST_Day_1km', 'LST',
               'Maximum_temperature_height_above_ground_6_Hour_Interval',
               'Minimum_temperature_height_above_ground_6_Hour_Interval',
               'Temperature_height_above_ground', 'dps', 'tasmax', 'tasmin',
               'sea_surface_temperature']:
        new_val = round(new_val - 273.15,4)          #convert K to C
        if units == 'english':
            new_val = round(1.8 * new_val + 32,4)    #convert C to F
    elif var in ['pr', 'pet', 'wb','precipitation', 'Precipitation_rate_surface_6_Hour_Average'] and units == 'english':
        new_val = round(new_val / 25.4,4)            #convert mm to inches
    elif var in ['vs', 'u-component_of_wind_height_above_ground',
                 'v-component_of_wind_height_above_ground']:
        if units == 'english':
            new_val = round(2.23694 * new_val,4)         #convert m/s to mi/h
    return new_val

#===========================================
#   INITIALIZE_TIMESERIESTEXTDATADICT
#===========================================
def initialize_timeSeriesTextDataDict(name, altname=''):
    '''
    Data for each point in time series
    is stored in a separate dictionary
    Args:
        Name: series name
    Returns:
        dictionary with keys: values
            LonLat: Long, Lat string
            Data: empty list
    '''
    lon = ''
    lat = ''
    array = name.split(',')
    if len(array) == 2:
        lat = array[0]
        lon=array[1]

    data_dict = {
        'Name': name,
        'Lat': lat,
        'Lon': lon,
        'AltName':str(altname),
        'Data':[]
    }
    return data_dict

#===========================================
#   INITIALIZE_TIMESERIESGRAPHDATADICT
#===========================================
def initialize_timeSeriesGraphDataDict(name, marker_color, altname=''):
    '''
    Graph data for each point in time series
    is stored in a separate dictionary
    Args:
        name: series name
        marker_color: color of marker and plot
    Returns:
        dictionary with keys: values
            MarkerColor: marker_color
            LonLat: Long, Lat string
            Data: empty list
    '''
    lon = ''
    lat =''
    array = name.split(',')
    if len(array) == 2:
        lat = array[0]
        lon = array[1]

    data_dict_graph = {
        'MarkerColor':marker_color,
        'Name': name,
        'Lat': lat,
        'Lon': lon,
        'AltName':str(altname),
        'Data':[]
    }
    return data_dict_graph


#===========================================
#    PROCESS_TIMESERIESTEXTDATA
#===========================================
def process_timeSeriesTextData(row_data, var, units, product):
    '''
    Processes row data returned by ee time series request.
    Args:
        row_data: [(long, lat),date,time,value]
        var: variable short name
        units: english or metric
    Returns:
        formatted data: [date_string, value_string]
    '''
    if row_data is None or not isinstance(row_data, list):
        return ['9999-99-99', missing_value]
    if len(row_data) < 5:
        return ['9999-99-99',missing_value]
    time_int = int(row_data[3])
    date_obj = dt.datetime.utcfromtimestamp(float(time_int) / 1000)
    '''
    if product == 'CFSV2':
        #sub-daily
        date_str = date_obj.strftime('%Y-%m-%d %I %p')
    else:
        date_str = date_obj.strftime('%Y-%m-%d')
    '''
    date_str = date_obj.strftime('%Y-%m-%d')
    try:
        val = float(row_data[4])
        if abs(val -missing_value) < 0.0001:
            return [date_str, missing_value]
    except:
        return [date_str, missing_value]
    try:
        val = modify_units_in_timeseries(float(row_data[4]), var, product, units)
        return [date_str, '{0:0.4f}'.format(val)]
    except:
        return [date_str, missing_value]

#===========================================
#    PROCESS_TIMESERIESGRAPHDATA
#===========================================
def process_timeSeriesGraphData(row_data, var, units, product):
    '''
    Process row data returned by ee time series request.
    Args:
        row_data: [(long, lat),date,time,value]
        var: variable short name
        units: english or metric
    Returns:
        formatted data: [date_integer, value_float]
    '''
    if row_data is None or not isinstance(row_data, list):
        return []
    if len(row_data) < 5:
        return []
    time_int = int(row_data[3])
    try:
        val = float(row_data[4])
        if abs(val -missing_value) < 0.0001:
            return []
    except:
        return []
    try:
        val = modify_units_in_timeseries(float(row_data[4]),var, product, units)
        return [time_int, round(val,4)]
    except:
        return []


#===========================================
#       COMPUTE_RUNNING_MEAN and CIRCULAR_RUNNING_MEAN -someday consolidate these...
#===========================================
def compute_running_mean(data,num):
    '''
    Computes running mean
    Args:
        data: highcarts formatted data: [[int_time1,val], [int_time2, val], ...]
        num: runningMeanDays or runningMeanYears
    Returns: running mean data formatted for highcharts
    '''
    rm_data =[]
    if num is not None:
        if num % 2 == 0:
            num = num /2 -1
        else:
            num = (num - 1) / 2

    for idx,row_data in enumerate(data):
        int_time = row_data[0]
        try:
            val = round(float(row_data[1]),4)
            #deal with None data
            if abs(val -missing_value) < 0.0001:
                val = None
        except:
            val = None
        #Running Mean
        if num is not None:
            skip = False
            if idx > num and idx < len(data) -1 - num:
                ind_range = range(idx-num,idx+num+1)
            elif idx<=num:
                ind_range = range(0,idx+1)
            elif idx>=len(data)-1-num:
                ind_range = range(idx,len(data))
            cnt = 0
            summ = 0
            for i in ind_range:
                try:
                    rm_val = round(float(data[i][1]),4)
                    summ+=rm_val
                    cnt+=1
                except:
                    skip = True
                    break
            if not skip and cnt >0:
                rm_data.append([int_time,round(summ / float(cnt),4)])

    return rm_data


def compute_circular_running_mean(data, num):
    '''
    Computes circular running mean (wraps around in array)
    Args:
        data: highcarts formatted data: [[int_time1,val], [int_time2, val], ...]
        num: runningMeanDays or runningMeanYears
    Returns: running mean data formatted for highcharts
    '''
    rm_data =[]
    if num is not None:
        if num % 2 == 0:
            num = num /2 -1
        else:
            num = (num - 1) / 2

    for idx,row_data in enumerate(data):
        int_time = row_data[0]
        try:
            val = round(float(row_data[1]),4)
            #deal with None data
            if abs(val -missing_value) < 0.0001:
                val = None
        except:
            val = None
        #Running Mean
        if num is not None:
            skip = False
            cnt = 0
            summ = 0
            for i in range(idx - num,idx + num+1):
                try:
                    rm_val = round(float(data[i][1]),4)
                    summ+=rm_val
                    cnt+=1
                except:
                    skip = True
                    break
            if not skip and cnt >0:
                rm_data.append([int_time,round(summ / float(cnt),4)])

    return rm_data

# Need to consolidate these into single function later
def compute_circular_running_mean_bounds(data, num):
    '''
    Computes circular running mean (wraps around in array)
    Args:
        data: highcarts formatted data: [[int_time1,val], [int_time2, val], ...]
        num: runningMeanDays or runningMeanYears
    Returns: running mean data formatted for highcharts
    '''
    rm_data =[]
    if num is not None:
        if num % 2 == 0:
            num = num /2 -1
        else:
            num = (num - 1) / 2

    for idx,row_data in enumerate(data):
        int_time = row_data[0]
        try:
            val_lower = round(float(row_data[1]),4)
            #deal with None data
            if abs(val_lower -missing_value) < 0.0001:
                val_lower = None
        except:
            val_lower = None
        try:
            val_upper = round(float(row_data[2]),4)
            #deal with None data
            if abs(val_upper -missing_value) < 0.0001:
                val_upper = None
        except:
            val_upper = None
        #Running Mean
        if num is not None:
            skip = False
            if idx > num and idx < len(data) -1 - num:
                ind_range = range(idx-num,idx+num+1)
            elif idx<=num:
                ind_range = range(0,idx+1)
            elif idx>=len(data)-1-num:
                ind_range = range(idx,len(data))

            cnt_upper = 0
            summ_upper = 0
            cnt_lower = 0
            summ_lower = 0
            #for i in range(idx -  num,idx + num+1):
            for i in ind_range:
                try:
                    rm_val = round(float(data[i][1]),4)
                    summ_lower+=rm_val
                    cnt_lower+=1
                except:
                    skip = True
                    break
                try:
                    rm_val = round(float(data[i][2]),4)
                    summ_upper+=rm_val
                    cnt_upper+=1
                except:
                    skip = True
                    break
            if not skip and cnt_upper >0 and cnt_lower>0:
                rm_data.append([int_time,round(summ_lower / float(cnt_lower),4),round(summ_upper / float(cnt_upper),4)])

    return rm_data

def compute_running_mean_bounds(data, num):
    '''
    Computes circular running mean (wraps around in array)
    Args:
        data: highcarts formatted data: [[int_time1,val], [int_time2, val], ...]
        num: runningMeanDays or runningMeanYears
    Returns: running mean data formatted for highcharts
    '''
    rm_data =[]
    if num is not None:
        if num % 2 == 0:
            num = num /2 -1
        else:
            num = (num - 1) / 2

    for idx,row_data in enumerate(data):
        int_time = row_data[0]
        try:
            val_lower = round(float(row_data[1]),4)
            #deal with None data
            if abs(val_lower -missing_value) < 0.0001:
                val_lower = None
        except:
            val_lower = None
        try:
            val_upper = round(float(row_data[2]),4)
            #deal with None data
            if abs(val_upper -missing_value) < 0.0001:
                val_upper = None
        except:
            val_upper = None
        #Running Mean
        if num is not None:
            skip=False
            if idx > num and idx < len(data) -1 - num:
                ind_range = range(idx-num,idx+num+1)
            elif idx<=num:
                ind_range = range(0,idx+1)
            elif idx>=len(data)-1-num:
                ind_range = range(idx,len(data))
            if idx > num and idx < len(data) -1 - num:
                ind_range = range(idx,len(data))
            cnt_upper = 0
            summ_upper = 0
            cnt_lower = 0
            summ_lower = 0
            for i in ind_range:
                try:
                    rm_val = round(float(data[i][1]),4)
                    summ_lower+=rm_val
                    cnt_lower+=1
                except:
                    skip = True
                    break
                try:
                    rm_val = round(float(data[i][2]),4)
                    summ_upper+=rm_val
                    cnt_upper+=1
                except:
                    skip = True
                    break
            if not skip and cnt_upper >0 and cnt_lower>0:
                rm_data.append([int_time,round(summ_lower / float(cnt_lower),4),round(summ_upper / float(cnt_upper),4)])

    return rm_data
