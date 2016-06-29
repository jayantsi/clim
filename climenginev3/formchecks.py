import datetime as dt
import numpy as np
import forms
import sys


thismodule =  sys.modules[__name__]
#############################################
##       CHECK_USER_INPUT                  ##
#############################################
def check_user_input(self, template_values):
    #Checks for errors in user input
    #See check_ functions in formchecks.py
    #At first error encountered, spits out error message and exits
    err = None
    fieldID = None

    for key, val in template_values.iteritems():
        #do not check form items
        if key[0:4] == 'form':
            continue

        if key[-3:] == '2TS':
            check_function_name = 'check_' + key[0:-3]
        elif key[-2:] == 'TS':
            check_function_name = 'check_' + key[0:-2]
        else:
            check_function_name = 'check_' + key

        try:
            #See if a check function exists in forms.py
            #If so, executed to check for form errors
            check_function = getattr(thismodule,check_function_name)
        except:
            continue

        err = check_function(val)
        if err is not None:
            fieldID = key
            return fieldID,err

    #special check for climatology years for maps
    if template_values['toolAction'] == 'getMap':
        if template_values['calculation']!='value':
            if 'yearStartClim' in template_values.keys() and 'yearEndClim' in template_values.keys():
                err = check_climatologyyears(template_values['yearStartClim'], template_values['yearEndClim'])
                if err is not None:
                    fieldID = 'yearEndClim'
                    return fieldID,err

    #check climo years for time series
    if template_values['toolAction'] == 'getTimeSeriesOverDateRange':
        if template_values['timeSeriesCalc'] == 'interannual':
            err = check_climatologyyears(template_values['yearStart'], template_values['yearEnd'])
            if err is not None:
                fieldID = 'yearEnd'
                return fieldID,err
            if template_values['variable2display'] != 'none':
                err = check_climatologyyears(template_values['yearStart2'], template_values['yearEnd2'])
                if err is not None:
                    fieldID = 'yearEnd2'
                    return fieldID,err
    if 'subDomainTypeTS' in template_values.keys():
        err = check_subDomainTSCalc(
            template_values['toolAction'], template_values['subDomainTypeTS'])
        if err is not None:
            fieldID = 'subDomainTypeTS'
            return fieldID,err

    #special check for date range >365 when climatology is needed
    #(someday when we fix this.. we can delete this)
    if template_values['toolAction'] != 'getTimeSeriesOverDateRange':
        if template_values['toolAction'] != 'points' and template_values['calculation']!='value':
            err = check_date_range(template_values['dateStart'], template_values['dateEnd'],365)
            if err is not None:
                fieldID = 'dateStart'
                return fieldID,err

    #special check for empty polygons/fusion table for time series requests
    if (template_values['toolAction'] == 'getTimeSeriesOverDateRange' and
        template_values['subDomainTypeTS'] !='points'):
        for i in range(5):
            ft_id = i+1
            checkbox = template_values['ft' + str(ft_id) + 'check']
            display = template_values['ft' + str(ft_id) + 'display']
            if checkbox == 'checked' and display != 'none':
                if template_values['ftChoice' + str(ft_id)] == 'polygon':
                    poly_field = template_values['polygon' + str(ft_id)]
                    err = check_polygon(poly_field)
                elif template_values['ftChoice' + str(ft_id)] == 'custom':
                    ft_field = template_values['ft' + str(ft_id)]
                    err = check_for_empty_ft_field(ft_id, ft_field)
                elif template_values['ftChoice' + str(ft_id)] == '':
                    #Special check for fewsNet
                    #Area is set to '' initially
                    err = 'Please choose a region and then a subregion!'
                else:
                    ft_field = template_values['ftSubChoice' + str(ft_id)]
                    err = check_for_empty_subChoice_field(ft_id, ft_field)
                if err is not None:
                    fieldID = 'ftSubChoice' + str(ft_id)
                    break
    return fieldID,err

#============================
#   General Utility Functions
#
#===========================
def format_date_string(date,separator):
    '''
    Args:
        date datestring, can be of varying format
        separator
    Returns
        date string where year,month and day are
        separated by separator
    '''
    if str(date).lower() == 'por':
        return str(date)
    d = str(date).replace('-','').replace(':','').replace('/','')
    y = d[0:4]
    m = d[4:6]
    d = d[6:8]
    s = separator
    if separator == 'dash':s = '-'
    if separator == 'colon':s = ':'
    if separator == 'slash':s = '/'
    if separator == '-':s = '-'
    if separator == ':':s = ':'
    if separator == '/':s = '/'
    return y + s + m + s + d

def date_to_eight(date,se=None):
    '''
    Converts dates of form
    yyyy
    yyyy-mm, yyyy:mm, yyyy/mm
    yyyy-mm-dd, yyyy/mm/dd, yyyy:mm:dd
    to yyyymmdd
    se =='start' --> start_date
    se == 'end' --> end_date
    '''
    mon_lens = ['31', '28', '31','30','31','30', '31','31','30','31','30','31']
    d8 = date.replace('-','').replace('/','').replace(':','').replace(' ','')
    if len(d8) == 8:
        return d8
    mmdd = '0101';dd='01'
    if se == 'end':
        mmdd = '1231'
        if len(d8) == 6:
            if d8[4:6] == '02' and is_leap_year(d8[0:4]):
                mon_len = '29'
            else:
                mon_len = mon_lens[int(d8[4:6]) - 1]
            dd = mon_len
    if len(d8) == 4:d8+=mmdd
    if len(d8) == 6:d8+=dd
    return d8

def date_to_datetime(date_str):
    '''
    Function to convert acis date_str of forms
    yyyy-mm-dd
    yyyy/mm/dd
    yyyy:mm:dd
    yyyymmdd
    to datetime. The datetime object is returned
    '''
    eight_date = date_str.replace('-','').replace('/','').replace(':','')
    if len(eight_date) != 8:
        return None
    dtime = dt.datetime(int(eight_date[0:4]),int(eight_date[4:6]), int(eight_date[6:8]))
    return dtime

def datetime_to_date(dtime, seperator):
    '''
    yyyy-mm-dd
    yyyy/mm/dd
    yyyy:mm:dd
    yyyymmdd
    '''
    if type(dtime) != dt.datetime:
        return '0000' + str(seperator) + '00' + str(seperator) + '00'
    try:y = str(dtime.year)
    except:y = '0000'

    try:m =str(dtime.month)
    except:m = '00'
    if len(m) == 1:m = '0' + m

    try:d =str(dtime.day)
    except:d = '00'
    if len(d) == 1:d = '0' + d
    return y + str(seperator) + m + str(seperator) + d
#============================
#   formatting of
#   template variables
#===========================
def format_state(state):
    for st in state_abbreviations:
        if state.upper() == st[0] or state == st[1]:
            return st[1]
    return state

#def format_mapzoom(mapzoom):
#    try:
#        int(mapzoom)
#    except:
#        return mapzoom
#    return int(mapzoom)

def format_dateStart(dateStart):
    #Put date into format yyyy-mm-dd
    dS = dateStart
    try:
        #convert to yyymmdd
        dS = dateStart.replace('/','').replace('-','').replace(':','') #any ther formats we want to support?
        if len(dS) != 8:
            return dS
        dS = dS[0:4] + '-' + dS[4:6] + '-' + dS[6:8]
    except:
        return dS
    return dS

def format_dateEnd(dateEnd):
    #Put date into format yyyy-mm-dd
    dE = dateEnd
    try:
        #convert to yyymmdd
        dE = dateEnd.replace('/','').replace('-','').replace(':','') #any ther formats we want to support?
        if len(dE) != 8:
            return dE
        dE = dE[0:4] + '-' + dE[4:6] + '-' + dE[6:8]
    except:
        return dE
    return dE

def format_point(point):
    p = str(point)
    #Strip white spaces
    p = p.replace(', ', ',')
    #Strip extra comma
    p = p.rstrip(',')
    return p

def format_pointsLongLat(pointsLongLat):
    pLL = pointsLongLat
    #if list, turn into string
    if isinstance(pLL, list):
        pLL = (',').join(pLL)
    #remove any extra spaces
    pLL = pLL.replace(', ', ',')
    #make sure its a comma separated list of Long/Lat coordinates
    pLL_list = pLL.split(',')
    try:
        Lons = np.array([float(pLL_list[i]) for i in range(0,len(pLL_list),2)])
        Lats = np.array([float(pLL_list[i]) for i in range(1,len(pLL_list) - 1,2)])
    except:
        return pLL
    if len(Lats) != len(Lons):
        return pLL
    if len(np.where(Lons >= 0)) == len(Lons) and len(np.where(Lons <= 0)) == len(Lons):
        # Swap Lats/Lons
        Lats, Lons = Lons, Lats
        pLL = ''
        for idx in range(len(Lats)):
            pLL+= Lons[idx] + ',' + Lats[idx]
    return pLL

def format_NELat(NELat):
    nel = NELat
    try:
        float(nel)
    except:
        return nel
    return float(nel)

def format_NELong(NELong):
    nel = NELong
    try:
        float(nel)
    except:
        return nel
    return float(nel)

def format_SWLat(SWLat):
    swl = SWLat
    try:
        float(swl)
    except:
        return swl
    return float(swl)

def format_SWLong(SWLong):
    swl = SWLong
    try:
        float(swl)
    except:
        return swl
    return float(swl)


#============================
#   form field checks
#   mainly for the case that a
#   user entered a url parameter string
#   return err = None if no error encountered
#   else return error message
#===========================
def check_for_empty_polygon_field(ft_id, poly_field):
    err = None
    if poly_field == '':
        err = 'Polygon has no coordinates. '
        err+= ' Click the blue info/upload button above to re-enter the coordinates'
        err+=' or use the map to draw a polyon.'
    return err

def check_for_empty_ft_field(ft_id, ft_field):
    err = None
    if ft_field == '':
        err = 'Please upload fusion table '
        err+='(click blue info button above).'
    return err

def check_for_empty_subChoice_field(ft_id, ft_field):
    err = None
    if ft_field == '':
        err = 'Please choose a subregion!'
    return err

def check_subDomainTSCalc(toolAction,subDomainTypeTS):
    err = None
    if toolAction=='getTimeSeriesOverDateRange' and subDomainTypeTS=='None':
       return 'You must specify a region to view data. Choose either points or area averages.'
    return err

def check_dateMoreThanYear(dateStart,dateEnd,calculation,toolAction):
    err = None
    dS = dt.datetime.strptime(dateStart,'%Y-%m-%d')
    dE = dt.datetime.strptime(dateEnd,'%Y-%m-%d')
    if calculation !='value' and toolAction!='points':
        if (dE-dS).total_seconds()>=365 * 24 * 3600:
            return 'Calculations requiring climatologies over day ranges > 365 days are not currently available.'
    return err

def check_date_range(dateStart, dateEnd, num_days):
    '''
    Checks that dateEnd - dateStart <= num_days
    This chck is for map interface only
    when calculation is not value
    '''
    err = None
    dS = dt.datetime.strptime(dateStart,'%Y-%m-%d')
    dE = dt.datetime.strptime(dateEnd,'%Y-%m-%d')
    if (dE-dS).total_seconds()> int(num_days) * 24 * 3600:
        err = 'Calculations requiring climatologies over day ranges > '
        err+= str(num_days) + ' days are not currently available.'
    return err

def check_climatologyyears(yearStartClim,yearEndClim):
    err = None
    if int(yearStartClim)>int(yearEndClim):
        err = 'Start year needs to be less than End year.'
    return err

def check_mapzoom(mapzoom):
    err = None
    try:
        int(mapzoom)
    except:
        return mapzoom
    return err

def check_dateStart(dateStart):
    #Check that date is of format yyyy-mm-dd
    err = None
    try:
        dt.datetime.strptime(dateStart, "%Y-%m-%d")
    except ValueError:
        return 'Invalid Start Date: %s' % str(dateStart)
    except:
        return 'Wrong date format or invalid Start Date: %s' % str(dateStart)
    today = dt.datetime.now()
    dS_dt = date_to_datetime(dateStart)
    if dS_dt > today:
        return 'Start Date cannot be in the future.'
    return err

def check_dateEnd(dateEnd):
    #Check that date is of format yyyy-mm-dd
    err = None
    try:
        dt.datetime.strptime(dateEnd, "%Y-%m-%d")
    except ValueError:
        return 'Invalid End Date: %s' % str(dateEnd)
    except:
        return 'Wrong date format or invalid End Date: %s' % str(dateEnd)
    today = dt.datetime.now()
    dE_dt = date_to_datetime(dateEnd)
    if dE_dt > today:
        return 'End Date cannot be in the future.'
    return err


def check_point(point):
    err = None
    #Make sure point is lon, lat string
    p = str(point)
    p_list = p.split(',')
    if len(p_list) <= 1:
        return 'Point must be entered as a Long,Lat pair. You entered: %s' %str(point)
    if len(p_list) > 2:
        return 'Please enter a single point as Long,Lat coordinate. You entered: %s' %str(point)
    return err

def check_polygon(poly):
    err = None
    p = str(poly)
    if not p:
        err = 'Polygon has no coordinates. '
        err+= ' Click the blue info/upload button above to re-enter the coordinates'
        err+=' or use the map to draw a polyon.'
        return err
    #make sure its a comma separated list of Long/Lat coordinates
    try:
        p_list = p.replace(', ',',').split(',')
    except:
        err = str(poly) + ' is not a valid entry!'
        err+= ' Click the blue info/upload button to re-enter the coordinates!'
        err+=' or use the map to draw a polyon.'
        return err
    try:
        Lons = np.array([float(p_list[i]) for i in range(0,len(p_list),2)])
        Lats = np.array([float(p_list[i]) for i in range(1,len(p_list),2)])
    except:
        err = str(poly) + ' is not a valid entry!'
        err+= ' Click the blue info/upload button to re-enter the coordinates!'
        err+=' or use the map to draw a polyon.'
        return err
    if len(Lats) != len(Lons):
        return 'Number of Latitudes not equal number of latitudes.'
    return err



def check_pointsLongLat(pointsLongLat):
    err = None
    pLL = pointsLongLat
    if not pLL:
        return err
    #make sure its a comma separated list of Long/Lat coordinates
    try:
        pLL_list = pLL.split(',')
    except:
        return 'Error in point selection. Check for extra commas, etc. Each point should be entered as Long,Lat pair.'
    try:
        Lons = np.array([float(pLL_list[i]) for i in range(0,len(pLL_list),2)])
        Lats = np.array([float(pLL_list[i]) for i in range(1,len(pLL_list),2)])
    except:
        return 'Error in point selection. Check for extra commas, etc. Each point should be entered as Long,Lat pair.'
    if len(Lats) != len(Lons):
        return 'Number of longitudes not equal number of latitudes.'
    return err

def check_NELat(NELat):
    err = None
    try:
        float(NELat)
    except:
        return 'Rectangle coordinates should be floats. You entered: %s' %str(NELat)
    if float(NELat) < 0:
        return 'NE corner latitude must be positive. You entered: %s' %str(NELat)
    return err

def check_NELong(NELong):
    err = None
    try:
        float(NELong)
    except:
        return 'Rectangle coordinates should be floats. You entered: %s' %str(NELong)
    if float(NELong) > 0:
        return 'NE corner longitude must be negative. You entered: %s' %str(NELong)
    return err

def check_SWLat(SWLat):
    err = None
    try:
        float(SWLat)
    except:
        return 'Rectangle coordinates should be floats. You entered: %s' %str(SWLat)
    if float(SWLat) < 0:
        return 'SW corner latitude must be positive. You entered: %s' %str(SWLat)
    return err

def check_SWLong(SWLong):
    err = None
    try:
        float(SWLong)
    except:
        return 'Rectangle coordinates should be floats. You entered: %s' %str(SWLong)
    if float(SWLong) > 0:
        return 'SW corner longitude must be negative. You entered: %s' %str(SWLong)
    return err

def check_opacity(opacity):
    op = forms.formOpacity
    options = []
    for tple in op:
        options.append(str(tple[0]))
    if str(opacity) not in options:
        return 'Opacity should be one of: %s. You entered: %s' %(','.join(options), str(opacity))

#def check_units(units):
