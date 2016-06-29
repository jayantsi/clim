#############################################
##       TEMPLATE VARIABLES                ##
#############################################
import datetime
import json
import logging
import os
import urllib, cgi
import cgi
import config
import ee
import httplib2
import jinja2
import numpy
import webapp2
import threading

import forms,formsFEWSNET,formsPG
import application_defaults
import collection_dataStore
#import loggerFunctions

from google.appengine.api import users
from google.appengine.api import memcache


#############################################
##      STATIC                             ##
#############################################
max_pointsShapes =5

#############################################
##      GET_VARIABLE       ##
#############################################
# This function gets the variable from either the form,query string
# if there is no variable in those, then it is set to the default
def get_variable(self,variableName,variableDefault):
    variableValue=self.request.get(variableName,variableDefault)
    if(type(variableValue) is tuple):
        variableValue = variableValue[0]
    return variableValue

#############################################
##      ADD_TEMPLATEVARIABLE               ##
#############################################
def add_templateVariable(self,defaultKeyValue,template_values):
    for key, value in defaultKeyValue.iteritems():
        template_values.update({key : self.request.get(key,value)})

#############################################
##       SET_INITIAL_TEMPLATE_VALUES       ##
#############################################
def set_initial_template_values(self, applicationName):
    import loggerFunctions
    logger = loggerFunctions.set_logger('templatevariables')

    # Override saved maxDates with memcache values
    maxDates =collection_dataStore.defaults_maxDates
    for key, value in maxDates.iteritems():
        try:
            data = memcache.get(key)
            if data is not None:
                maxDates[key] = data
        except:
            pass

    timeSeriesCalc_default,subDomainTypeTS_default,ftChoice1_default,variable_default,productType_default,product_default,statistic_default,calculation_default,units_default,varUnits_default,colorbar_default,colorbarMin_default,colorbarMax_default,colorbarSize_default,colorbarTicks_default,timeperiod_default,timeperiod_days,scale_default,mapCenterLongLat_default,pointLat_default ,pointLon_default,mapCenterLongLat,mapzoom_default,opacity_default,NELat_default,NELong_default,SWLat_default,SWLong_default,minYear_default,minDate_default,runningMeanYears_default,runningMeanDays_default,basemap_default,CHIRPSvariable_default =application_defaults.get_applicationDefaults(self, applicationName)

    #Set month/day/Start/End defaults according to dateStart/End
    #Set tempend
    variable = get_variable(self, 'variable', variable_default)
    product = get_variable(self, 'product', product_default)
    if variable in collection_dataStore.names_notdefault:
        variablename=variable;
    else:
        variablename='default'
    tempend = maxDates[collection_dataStore.names_memcache[product][variablename]]
    #Set tempstart
    tempstart = (datetime.datetime(int(tempend[0:4]),int(tempend[5:7]),int(tempend[8:10]))-datetime.timedelta(days=timeperiod_days)).strftime('%Y-%m-%d')
    #Set Month/Day defaults
    monthStart_default = tempstart[5:7].lstrip('0')
    dayStart_default = tempstart[8:10].lstrip('0')
    monthEnd_default = tempend[5:7].lstrip('0')
    dayEnd_default = tempend[8:10].lstrip('0')


    toolAction =get_variable(self,'toolAction','getMap')
    if(toolAction=='getTimeSeriesOverDateRange'): #timeseries
        variable =get_variable(self,'variableTS',variable_default)
        variable2display =get_variable(self,'variable2display','none')
        productType =get_variable(self,'productTypeTS',productType_default)
        product =get_variable(self,'productTS',product_default)
        statistic =get_variable(self,'statisticsTS',statistic_default)
        calculation =get_variable(self,'calculation',calculation_default)
        units =get_variable(self,'unitsTS',units_default)
        varUnits =get_variable(self,'varUnitsTS',varUnits_default)
        timeperiod =get_variable(self,'timeperiodTS',timeperiod_default)
        if variable2display!='none': #2 variables
            productType2 =get_variable(self,'productType2TS',productType_default)
            product2 =get_variable(self,'product2TS',product_default)
            variable2 =get_variable(self,'variable2TS',variable_default)
            statistic2 =get_variable(self,'statistic2TS',statistic_default)
            varUnits2 =get_variable(self,'var2UnitsTS',varUnits_default)
            timeperiod2 =get_variable(self,'timeperiod2TS',timeperiod_default)
        else: #1 variable
            productType2=productType
            product2 = product
            variable2=variable
            statistic2=statistic
            varUnits2=varUnits
            timeperiod2=timeperiod
    else: #mapping
        variable =get_variable(self,'variable',variable_default)
        productType =get_variable(self,'productType',productType_default)
        product =get_variable(self,'product',product_default)
        statistic =get_variable(self,'statistic',statistic_default)
        calculation =get_variable(self,'calculation',calculation_default)
        units =get_variable(self,'units',units_default)
        varUnits =get_variable(self,'varUnits',varUnits_default)
        timeperiod =get_variable(self,'timeperiod',timeperiod_default)
        productType2=productType
        product2 = product
        variable2=variable
        statistic2=statistic
        varUnits2=varUnits
        timeperiod2=timeperiod

    template_values={
        'applicationName':applicationName,
        'form_error': {},
         #Sharelink breaks if get_all is used since lists can not be embedded in urls
        'layer': self.request.get_all('layer',[])
    }
    list_baseoptions={
        'mask':                'none',
        'maskMin':             '',
        'maskMax':             '',
        'downloadURL':         '',
        'downloadFilename':    'climateEngine_download',
        'downloadregion':      'noRegion',
        'downloadProjection':   'EPSG:4326',
        'mapid':                '',
        'token':                '',
        'dispEnv':              '',
        #Variable Options
        'toolAction':           'getMap',
        'variable':             variable,
        'variableTS':           variable,
        'variable2TS':          variable2,
        'variable2display':     'none',
        'productType':          productType,
        'productTypeTS':        productType,
        'productType2TS':       productType2,
        'product':              product,
        'productTS':            product,
        'product2TS':           product2,
        'statistic':            statistic,
        'statisticTS':          statistic,
        'statistic2TS':         statistic2,
        'calculation':          calculation,
        'units':                units,
        'unitsTS':              units,
        'varUnits':             varUnits,
        'varUnitsTS':           varUnits,
        'var2UnitsTS':          varUnits2,
        'timeperiod':           timeperiod,
        #Map Options
        'opacity':              opacity_default,
        'mapCenterLongLat':     mapCenterLongLat_default,
        'mapzoom':              mapzoom_default,
        #Get Map Options
        'kmlurl':               '',
        'kmlurl2':              '',
        'kmloption':            '',
        'scale':                scale_default,
        'NELat':                NELat_default,
        'NELong':               NELong_default,
        'SWLat':                SWLat_default,
        'SWLong':               SWLong_default,
        #Colorbar Options
        'palette':              '',
        'minColorbar':         colorbarMin_default,
        'maxColorbar':         colorbarMax_default,
        'colorbarmap':         colorbar_default,
        'colorbarsize':        colorbarSize_default,
        'colorbarLabel':       '',  #technically this is dependent on variable(should ditch)
        'colorbarType':        'continuous',
        'colorbarTicks':       colorbarTicks_default,
        #TimeSeries Options
        'timeSeriesCalc':      timeSeriesCalc_default,
        'chartType':           '',
        'subDomainTypeTS':     subDomainTypeTS_default,
        'basemap':             basemap_default
    }
    add_templateVariable(self,list_baseoptions,template_values)
    #############################################
    ##     FEWSNET OPTIONS                     ##
    #############################################
    if applicationName =='fewsNet' or applicationName=='precisionGrazing' or applicationName=='gddTool':
        template_values['CHIRPSvariable']= CHIRPSvariable_default,
    #############################################
    ##      MACA OPTIONS                     ##
    #############################################
    list_MACA={
        'model':           'inmcm4',
        'scenario':        'historical',
        'modelTS':         'inmcm4',
        'scenarioTS':      'historical',
        'model2TS':        'inmcm4',
        'scenario2TS':     'historical'
    }
    add_templateVariable(self,list_MACA,template_values)

    #############################################
    ##      TEMPLATE TIME OPTIONS              ##
    #############################################
    for p in ['product', 'product2']:
        product = self.request.get(p, product_default)
        yearStartClim= collection_dataStore.defaults_yearClim[product]['yearStartClim']
        yT= collection_dataStore.defaults_yearClim[product]['yearTarget']
        yearEndClim=collection_dataStore.defaults_yearClim[product]['yearEndClim']
        if yearEndClim=='default':
            yearEndClim=tempend[0:4]
        yearStartClimFut = collection_dataStore.defaults_yearClim['MACA']['yearStartClimFut']
        yearEndClimFut = collection_dataStore.defaults_yearClim['MACA']['yearEndClimFut']
        if p == 'product':
            yearTarget = yT
        if p == 'product2':
            yearTarget2 = yT

    mon_names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

    maxYear_default = tempend[0:4]
    maxDate_default = tempend

    list_timeoptions={
        'minYear':          minYear_default,
        'minDate':          minDate_default,
        'maxDate':          maxDate_default,
        'maxYear':          maxYear_default,
        'dateStart':        tempstart,
        'dateEnd':          maxDate_default,
        'dateStartTS':      tempstart,
        'dateEndTS':        maxDate_default,
        'yearTargetData':   yearTarget,
        'yearTargetFigure': yearTarget,
        'yearTargetForm':   yearTarget,
        'yearStart':        yearStartClim,
        'yearEnd':          yearEndClim,
        'monthStart':       monthStart_default,
        'monthEnd':         monthEnd_default,
        'dayStart':         dayStart_default,
        'dayEnd':           dayEnd_default,
        'season':           'custom',
        'monthStartFut':    monthStart_default,
        'monthEndFut':      monthEnd_default,
        'dayStartFut':      dayStart_default,
        'dayEndFut':        dayEnd_default,
        'seasonFut':        'custom',
        'minYear2':         minYear_default,
        'minDate2':         minDate_default,
        'maxDate2':         maxDate_default,
        'maxYear2':         maxYear_default,
        'dateStart2TS':     tempstart,
        'dateEnd2TS':       maxDate_default,
        'yearTarget2Data':  yearTarget2,
        'yearStart2':       yearStartClim,
        'yearEnd2':         yearEndClim,
        'monthStart2':      monthStart_default,
        'monthEnd2':        monthEnd_default,
        'dayStart2':        dayStart_default,
        'dayEnd2':          dayEnd_default,
        'season2':          'custom',
        'runningMeanYears': runningMeanYears_default,
        'runningMeanDays':  runningMeanDays_default,
        'timeperiodTS':     timeperiod,
        'timeperiod2TS':    timeperiod2,
        'yearStartClim':    yearStartClim,
        'yearEndClim':      yearEndClim,
        'yearStartClimFut': yearStartClimFut,
        'yearEndClimFut':   yearEndClimFut
    }
    add_templateVariable(self,list_timeoptions,template_values)

    #add maxValue form elements
    for key, value in collection_dataStore.maxDates_lookup.iteritems():
        add_templateVariable(self,{value:maxDates[key]},template_values)

    d = ' %02d' %int(template_values['dayStart'])
    template_values['seasonStart'] = mon_names[int(template_values['monthStart']) -1] + d
    d = ' %02d' %int(template_values['dayEnd'])
    template_values['seasonEnd'] = mon_names[int(template_values['monthEnd']) -1] + d
    d = ' %02d' %int(template_values['dayStart2'])
    template_values['seasonStart2'] = mon_names[int(template_values['monthStart2']) -1] + d
    d = ' %02d' %int(template_values['dayEnd2'])
    template_values['seasonEnd2'] = mon_names[int(template_values['monthEnd2']) -1] + d

    #if Time Series of Single Year Daily, override start/end dates if needed
    if template_values['timeSeriesCalc'] == 'intraannual':
        s_dt = datetime.datetime.strptime(template_values['dateStart'],'%Y-%m-%d')
        e_dt = datetime.datetime.strptime(template_values['dateEnd'],'%Y-%m-%d')
        if (e_dt - s_dt).days > 366:
            y = template_values['yearTargetData']
            m = template_values['monthStart']
            d = template_values['dayStart']
            template_values['dateStartTS'] = y + '-' + m + '-' + d
            template_values['dateEndTS'] = str(int(y) + 1) + '-' + m + '-' + d
            template_values['dateStart'] = template_values['dateStartTS']
            template_values['dateEnd'] = template_values['dateEndTS']
            s_dt = datetime.datetime.strptime(template_values['dateStart2TS'],'%Y-%m-%d')
            e_dt = datetime.datetime.strptime(template_values['dateEnd2TS'],'%Y-%m-%d')
        if (e_dt - s_dt).days > 366:
            y = template_values['yearTarget2Data']
            m = template_values['monthStart2']
            d = template_values['dayStart2']
            template_values['dateStart2'] = y + '-' + m + '-' + d
            template_values['dateEnd2TS'] = str(int(y) + 1) + '-' + m + '-' + d


    #############################################
    ##      TEMPLATE FUSION TABLE MAP DOWNLOAD       ##
    #############################################
    list_fusiontablemapdownload={
         'fusiontabledownload':      '1fRY18cjsHzDgGiJiS2nnpUU3v9JPDc2HNaR7Xk8',
         'fusiontabledownloadname':   'California',
         'pointLat':                   pointLat_default,
         'pointLong':                  pointLon_default,
         'pointValue':                 '',
         'downloadMapFormat':          'geotiff',
    }
    add_templateVariable(self,list_fusiontablemapdownload,template_values)

    #############################################
    ##      TEMPLATE POINTS       ##
    #############################################
    pointsLongLat_default=mapCenterLongLat
    marker_colors=['blue','green','orange','purple','yellow','pink','red']
    mapCenterLongLat = template_values['mapCenterLongLat']
    template_values['marker_colors']=marker_colors
    add_templateVariable(self,{'pointsLongLat':pointsLongLat_default},template_values)
    for s_idx in range(1,max_pointsShapes+1):
        add_templateVariable(self,{'p'+str(s_idx)+'check':'checked'},template_values)
        add_templateVariable(self,{'p'+str(s_idx)+'altname':''},template_values)
        add_templateVariable(self,{'p'+str(s_idx):mapCenterLongLat},template_values)
        if s_idx==1:
            add_templateVariable(self,{'p'+str(s_idx)+'display':'block'},template_values)
        else:
            add_templateVariable(self,{'p'+str(s_idx)+'display':'none'},template_values)


    #############################################
    ##      TEMPLATE SHAPES-FUSION TABLE FOR TIME SERIES       ##
    #############################################
    template_values['shape_colors']=['#0000FF','#00FF00','#FFA500','#551A8B','#FFFF00','#FF69B4','#FF0000']
    for s_idx in range(1,max_pointsShapes+1):
        add_templateVariable(self,{'ft'+str(s_idx):''},template_values)
        add_templateVariable(self,{'ft'+str(s_idx)+'columnName':''},template_values)
        add_templateVariable(self,{'ft'+str(s_idx)+'altname':''},template_values)
        add_templateVariable(self,{'ftSubChoice'+str(s_idx):''},template_values)
        add_templateVariable(self,{'polygon'+str(s_idx):''},template_values)
        if s_idx==1:
            add_templateVariable(self,{'ft'+str(s_idx)+'display':'block'},template_values)
            add_templateVariable(self,{'ft'+str(s_idx)+'check':'checked'},template_values)
            add_templateVariable(self,{'ftChoice'+str(s_idx):ftChoice1_default},template_values)
        else:
            add_templateVariable(self,{'ft'+str(s_idx)+'display':'none'},template_values)
            add_templateVariable(self,{'ft'+str(s_idx)+'check':''},template_values)
            add_templateVariable(self,{'ftChoice'+str(s_idx):''},template_values)

    #############################################
    ##      TEMPLATE FORMS       ##
    #############################################
    template_forms={
        #Forms
        'formMask':                      forms.formMask,
        'formVariable2Display':          forms.formVariable2Display,
        'formTimePeriods':               forms.formTimePeriods,
        'formHighChartLayers':           forms.formHighChartLayers,
        'formHighChartLayersIntraannual':forms.formHighChartLayersIntraannual,
        'formDownloadMapFormat':         forms.formDownloadMapFormat,
        'formDownloadProjection':        forms.formDownloadProjection,
        'formSeasons':                   forms.formSeasons,
        'formChartType':                 forms.formChartType,
        'formMonth':                     forms.formMonth,
        'formDay':                       forms.formDay,
        'formMapZoom':                   forms.formMapZoom,
        'formPaletteCustomMap':          forms.formPaletteCustomMap,
        'formPaletteDivMap':             forms.formPaletteDivMap,
        'formPaletteSeqMap':             forms.formPaletteSeqMap,
        'formPaletteSize':               forms.formPaletteSize,
        'formColorbarType':              forms.formColorbarType,
        'formOpacity':                   forms.formOpacity,
        'formUnits':                     forms.formUnits,
        'formTimeSeriesCalc':            forms.formTimeSeriesCalc,
        'formSubDomainTypeTS':           forms.formSubDomainTypeTS,
        'formDownloadRegion':            forms.formDownloadRegion,
        'formFusionTableChoices':        forms.formFusionTableChoices,
        'formProductType':               forms.formProductType,
        'formLayers':                    forms.formLayers,
        'formBoolean':                   forms.formBoolean
    }
    template_values.update(template_forms)

    #############################################
    ##      EXTRA FEWS                 ##
    #############################################
    if applicationName=='fewsNet' or applicationName=='nevadaet':
        extra_FEWS ={
            'formLayers':                formsFEWSNET.formFEWSNETLayers,
            'formFusionTableChoices':    formsFEWSNET.formFusionTableChoicesFEWSNET,
            'formCHIRPSChoicesFEWSNET':  formsFEWSNET.formCHIRPSChoicesFEWSNET,
            'formMODISChoicesFEWSNET':   formsFEWSNET.formMODISChoicesFEWSNET,
            'formLandsatChoicesFEWSNET': formsFEWSNET.formLandsatChoicesFEWSNET,
	}
        template_values.update(extra_FEWS)
    elif applicationName=='precisionGrazing' or applicationName=='gddTool':
        extra_FEWS ={
            'formLayers':                formsPG.formPGLayers,
            'formFusionTableChoices':    formsPG.formFusionTableChoicesPG,
            'formCHIRPSChoicesFEWSNET':  formsFEWSNET.formCHIRPSChoicesFEWSNET,
            'formMODISChoicesFEWSNET':   formsFEWSNET.formMODISChoicesFEWSNET,
            'formLandsatChoicesFEWSNET': formsFEWSNET.formLandsatChoicesFEWSNET,
	    'formSubDomainTypeTS'	:formsPG.formSubDomainTypeTS
        }
        template_values.update(extra_FEWS)


    #############################################
    ##      SHARE LINK                         ##
    #############################################
    #Sharelink depends on most template variables
    template_values['logger'] = logger
    template_values['shareLink'] = set_share_link(template_values,applicationName)
    #############################################
    ##      FORMAT TEMPLATE VARIABLES          ##
    #############################################
    #format template values to allow for different date formats etc...
    #See format_ functions in formchecks.py
    formatted_template_values = {}
    for key, val in template_values.iteritems():
        format_function_name = 'format_' + key
        try:
            format_function = getattr(forms,format_function_name)
        except:
            format_function = None

        if format_function:
            formatted_template_values[key] = format_function(val)
        else:
            formatted_template_values[key] = val
    return formatted_template_values


#############################################
##       MAP VARIABLES FOR SHARE LINK              ##
#############################################
map_basic_vars = [
    'toolAction',
    'productType','product', 'variable','statistic', 'calculation', 'units',
    'varUnits',
    'dateStart','dateEnd',
    'yearStart','yearEnd',
    'yearStartClim', 'yearEndClim',
    'opacity', 'mapCenterLongLat','mapzoom','timeperiod',
    'minColorbar', 'maxColorbar', 'colorbarmap','colorbarsize',
    'colorbarType',
    'layer',
    'palette',
    'basemap'
     ]

map_rect_vars = [
    'NELat', 'NELong', 'SWLat', 'SWLong',
    'downloadMapFormat','downloadFilename'
    ]
map_rect_vars=map_basic_vars+map_rect_vars

map_FT_vars = [
    'NELat', 'NELong', 'SWLat', 'SWLong',
    'fusiontabledownload', 'fusiontabledownloadname',
    'downloadMapFormat','downloadFilename'
    ]
map_FT_vars=map_basic_vars+map_FT_vars

mask_vars=[
    'maskMin','maskMax','mask',
    ]

#############################################
##       TS VARIABLES FOR SHARE LINK ##
#############################################
#this we would split into bare necessities for timeSeriesCalc = days, interannual, intraannual

ft1_vars = [
    'ft1', 'ft1check', 'ft1display', 'ft1altname','ftChoice1','ftSubChoice1','ft1columnName']
poly1_vars = ['polygon1']
ft2_vars=[
    'ft2', 'ft2check', 'ft2display', 'ft2altname','ftChoice2','ftSubChoice2','ft2columnName']
poly2_vars = ['polygon2']
ft3_vars=[
    'ft3', 'ft3check', 'ft3display', 'ft3altname','ftChoice3','ftSubChoice3','ft3columnName']
poly3_vars = ['polygon3']
ft4_vars=[
    'ft4', 'ft4check', 'ft4display', 'ft4altname','ftChoice4','ftSubChoice4','ft4columnName']
poly4_vars = ['polygon4']
ft5_vars=[
    'ft5', 'ft5check', 'ft5display', 'ft5altname','ftChoice5','ftSubChoice5','ft5columnName']
poly5_vars = ['polygon5']

pt1_vars =['p1','p1check','p1display','p1altname','pointsLongLat']
pt2_vars =['p2','p2check','p2display','p2altname']
pt3_vars =['p3','p3check','p3display','p3altname']
pt4_vars =['p4','p4check','p4display','p4altname']
pt5_vars =['p5','p5check','p5display','p5altname']

var2_vars=[
    'productType2TS',
    'product2TS',
    'variable2TS',
    'statistic2TS',
    'var2UnitsTS',
    'timeperiod2TS',
    'minYear2','maxYear2','minDate2','maxDate2',
    'dateStart2TS', 'dateEnd2TS',
    'yearTarget2Data',
    'yearStart2','yearEnd2',
    'monthStart2','monthEnd2',
    'dayStart2','dayEnd2',
    'season2',
    'seasonStart2', 'seasonEnd2',
]

maca_var2_vars =[
    'model2TS',
    'scenario2TS',
]

maca_vars = [
    'model','modelTS',
    'scenario','scenarioTS',
    'yearStartClim','yearEndClim','yearStartClimFut','yearEndClimFut',
    'monthStartFut','monthEndFut','dayStartFut','dayEndFut']

ts_vars = [
    'toolAction','timeSeriesCalc',
    'subDomainTypeTS',
    'variable2display',
    'productTypeTS',
    'productTS',
    'variableTS',
    'statisticTS',
    'varUnitsTS',
    'timeperiodTS',
    'minYear', 'minDate','maxYear', 'maxDate',
    'dateStart', 'dateEnd','dateStartTS', 'dateEndTS',
    'yearTargetData',
    'yearTargetForm', 'yearTargetFigure',
    'yearStart','yearEnd',
    'monthStart','monthEnd',
    'dayStart', 'dayEnd',
    'season',
    'seasonStart','seasonEnd',
    'mapCenterLongLat','mapzoom',
    'chartType',
    'runningMeanYears', 'runningMeanDays',
    'yearStartClim','yearEndClim',
    ]

#############################################
##       SET_SHARE_LINK                ##
#############################################
def set_share_link(initial_template_values,applicationName):

    #baseLink = 'http://clim-engine.appspot.com'
    baseLink = 'http://clim-engine-development.appspot.com'

    if applicationName=='climateEngine':
        shareLink = baseLink+'?'
    elif applicationName=='climateEngineExpert':
        shareLink = baseLink+'/climateEngineExpert?'
    elif applicationName=='fewsNet':
        shareLink = baseLink+'/fewsNet?'

    elif applicationName=='nevadaet':
        shareLink = baseLink+'/nevadaet?'

    elif applicationName=='lakeMead':
        shareLink = baseLink+'/LakeMead?'
    elif applicationName=='precisionGrazing':
        shareLink = baseLink+'/precisionGrazing?'
    elif applicationName=='gddTool':
        shareLink = baseLink+'/gddTool?'

    if initial_template_values['toolAction'] == 'getTimeSeriesOverDateRange':
        if initial_template_values['timeSeriesCalc']=='days':
            tv = ts_vars
        elif initial_template_values['timeSeriesCalc']=='interannual':
            tv = ts_vars
        elif initial_template_values['timeSeriesCalc']=='intraannual':
            tv = ts_vars
        else:
            tv=[]
        if initial_template_values['subDomainTypeTS'] == 'points':
            if initial_template_values['p1display'] =='block':
                tv = tv+pt1_vars
            if initial_template_values['p2display'] =='block':
                tv = tv+pt2_vars
            if initial_template_values['p3display'] =='block':
                tv = tv+pt3_vars
            if initial_template_values['p4display'] =='block':
                tv = tv+pt4_vars
            if initial_template_values['p5display'] =='block':
                tv = tv+pt5_vars
        else:
            if initial_template_values['ft1check'] =='checked':
                tv = tv+ft1_vars
                if initial_template_values['ftChoice1']=='polygon':
                    tv = tv + poly1_vars
            if initial_template_values['ft2check'] =='checked':
                tv = tv+ft2_vars
                if initial_template_values['ftChoice2']=='polygon':
                    tv = tv + poly2_vars
            if initial_template_values['ft3check'] =='checked':
                tv = tv+ft3_vars
                if initial_template_values['ftChoice3']=='polygon':
                    tv = tv + poly3_vars
            if initial_template_values['ft4check'] =='checked':
                tv = tv+ft4_vars
                if initial_template_values['ftChoice4']=='polygon':
                    tv = tv + poly4_vars
            if initial_template_values['ft5check'] =='checked':
                tv = tv+ft5_vars
                if initial_template_values['ftChoice5']=='polygon':
                    tv = tv + poly5_vars
        if initial_template_values['variable2display']!='none':
            tv = tv + var2_vars
        if initial_template_values['product2TS']=='MACA' or initial_template_values['productTS']=='MACA' \
                or initial_template_values['product2TS']=='NASANEX' or initial_template_values['productTS']=='NASANEX':
            tv =tv + maca_vars
            if initial_template_values['variable2display']!='none':
                tv = tv + maca_var2_vars

    elif initial_template_values['toolAction'] == 'getMap':
        tv = map_basic_vars
        if initial_template_values['mask']!='none':
            tv = tv+mask_vars
        if initial_template_values['calculation'] == 'anompercentof':
            tv=tv+['colorbarTicks']
    elif initial_template_values['toolAction'] == 'downloadRectangleSubset':
        tv = map_rect_vars
        if initial_template_values['mask']!='none':
            tv = tv+mask_vars
        if initial_template_values['calculation'] == 'anompercentof':
            tv=tv+['colorbarTicks']
    elif initial_template_values['toolAction'] == 'downloadFusionTableSubset':
        tv = map_FT_vars
        if initial_template_values['mask']!='none':
            tv = tv+mask_vars
        if initial_template_values['calculation'] == 'anompercentof':
            tv=tv+['colorbarTicks']
    elif initial_template_values['toolAction'] == 'showSingleValueOnMap':
        tv = map_basic_vars
        if initial_template_values['mask']!='none':
            tv = tv+mask_vars
        if initial_template_values['calculation'] == 'anompercentof':
            tv=tv+['colorbarTicks']

    if 'kmloverlayer' in initial_template_values['layer']:
        tv=tv+['kmlurl']
    if 'kmloverlayer2' in initial_template_values['layer']:
        tv=tv+['kmlurl2']

    for key in tv:
        if key == 'layer':
            #Layer is passed to url as an array and needs to be added as such to url
            param_str = ''
            if isinstance(initial_template_values['layer'],basestring):
                layer_list = initial_template_values['layer'].replace(', ',',').split(',')
            else:
                layer_list = initial_template_values['layer']
            for l in layer_list:
                param_str=param_str +'layer=' + str(l).replace(" ","%20") + '&'
        else:
            param_str = str(key) + '=' + str(initial_template_values[key]).replace(" ","%20")
            #param_str = str(key) + '=' + cgi.escape(urllib.quote_plus(initial_template_values[key]))

        if shareLink[-1] =='?' or shareLink[-1] == '&':
            shareLink=shareLink+param_str
        else:
            shareLink=shareLink+'&' + param_str

    return shareLink
