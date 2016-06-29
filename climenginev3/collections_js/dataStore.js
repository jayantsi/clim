//================
// GENERIC CONFIG FILE
//================
function addToDict1(OldDict,NewDict){
    for (var key in NewDict) {
        if (NewDict.hasOwnProperty(key)) {
            OldDict[key] = NewDict[key]
        }
    }
}

thisDate = new Date();
thisDate.setDate(thisDate.getDate());
currentYear = thisDate.getFullYear();

//================
// PRODUCT INFO
//================
var source_desc = {};
var valid_date_ranges = {};

//=======================
// VARIABLE SHORT NAME
//=======================
var variableShortName_list = {};
var variableListList ={};
//=======================
//  UNITS
//=======================
var units_metric = {};
var units_english = {};

//=======================
// CLIMO RANGE OF YEARS 
//=======================
var yearRangeClim = {};

//=======================
// DEFAULTS
//=======================
var default_variable = {};
var default_model = {};
var default_timeperiod = {};
var default_yearStartClim = {};
var default_yearRangeClim = {};
var default_yearStartClimFut = {};
var default_yearEndClimFut = {};

//=======================
// SCALE
//=======================
var scale_list = {};
var scaleListList = {};

//=======================
//  THRESHOLD COLORS
//=======================
var threshold_colors = {};

//=======================
//  COLORBAR SCALE: MIN/MAX, MAP,NUMBER
//=======================
var colorbarMinMax_list1 = {};
var colorbarMap_list1 = {};
var colorbarSize_list1 = {};

//=======================
//  PRODUCTS
//=======================
RSProduct = {
    'L_TOA':'Landsat 4/5/7/8 Top Of Atmosphere',
    'L5_TOA':'Landsat 5 Top Of Atmosphere',
    'L7_TOA':'Landsat 7 Top Of Atmosphere',
    'L8_TOA':'Landsat 8 Top Of Atmosphere',
    'L_SR':'Landsat 4/5/7/8 Surface Reflectance',
    'L5_SR':'Landsat 5 Surface Reflectance',
    'L7_SR':'Landsat 7 Surface Reflectance',
    'L8_SR':'Landsat 8 Surface Reflectance',
    'M':'MODIS Terra',
    'PFV52':'AVHRR Pathfinder Sea Surface Temperatures',
};

METProduct = {
    'G':'UI METDATA/gridMET',
    //'CFSV2':'CFS Reanalysis',
    'CHIRPS':'CHIRPS Precipitation',
};

CLIMProduct = {
    'MACA':'UI MACA Future Climate (CMIP5)',
    'NASANEX':'NASA-NEX Future Climate (CMIP5)'
};

//================
// CALCULATIONS
//================
addCalculations = {
    'value':'Values',
    'clim':'Average Conditions',
    'anom':'Difference From Average Conditions'
};

multCalculations = {
    'value':'Values',
    'clim':'Average Conditions',
    'anom':'Difference From Average Conditions',
    'anompercentchange':'Percent Difference From Average Conditions',
    'anompercentof':'Percent Of Average Conditions',
    // have to disable these until we can get them sped up
    //'zscore':'Z-Score',
    //'percentile':'Percentile in Distribution of Past Observations'
};

var CumulativeVariables=["pr","precipitation","pet","wb","Precipitation_rate_surface_6_Hour_Average"];
var ColumnChartTypeVariables=["pr","precipitation","pet","wb","Precipitation_rate_surface_6_Hour_Average"];

variables_multCalc ={ 
	'pet':'',
	'pr':'',
	'wb':'',
	'sph':'',
	'huss':'',
	'erc':'',
	'precipitation':'',
	'Precipitation_rate_surface_6_Hour_Average':'',
	'Potential_Evaporation_Rate_surface_6_Hour_Average':'',
	'NDVI':'',
	'NDSI':'',
	'EVI':'',
	'BAI':''
};

histCalculations = {
    'clim':'Historical Average',
};

futAddCalculations = {
    'value':'Future Average',
    'clim':'Historical Average',
    'anom':'Future Difference from Historical Average'
};

variables_multStat ={
        'pet':'',
        'pr':'',
        'wb':'',
        'sph':'',
        'huss':'',
        'erc':'',
        'precipitation':'',
        'Precipitation_rate_surface_6_Hour_Average':'',
        'Potential_Evaporation_Rate_surface_6_Hour_Average':''
};



futMultCalculations = {
    'value':'Future Average',
    'clim':'Historical Average',
    'anom':'Future Difference from Historical Average',
    'anompercentchange':'Future Percent Difference From Historical Average',
    'anompercentof':'Future Percent Of Historical Average',
    //'zscore':'Z-Score'
};

addStatistics = {
    'Mean':'Mean',
    'Median':'Median',
    'Max':'Maximum',
    'Min':'Minimum'
};

multStatistics = {
    'Mean':'Mean',
    'Median':'Median',
    'Max':'Maximum',
    'Min':'Minimum',
    'Total':'Total'
};

//================
// LAYER KMLS
//================

var layerKMLs = {
    'stateoverlayer':'http://nimbus.cos.uidaho.edu/DROUGHT/KML/states_outlined.kmz',
    'countyoverlayer':'http://nimbus.cos.uidaho.edu/DROUGHT/KML/counties_outlined.kmz',
    'hucoverlayer':'http://nimbus.cos.uidaho.edu/DROUGHT/KML/hucs_outlined.kmz',
    'climatedivoverlayer':'http://nimbus.cos.uidaho.edu/DROUGHT/KML/divs_outlined.kmz',
    'psaoverlayer':'http://nimbus.cos.uidaho.edu/DROUGHT/KML/psa_outlined.kmz'
};



//================
// FUSION TABLE INFO
//================
var ftDefaults = {  //fid,cid,column,selectid,styleId,templateId//
    '':['','','',''],
    'states':['1MC-LjlHxy04aBcxeSB_aVaDo2DlP_y2MVg3p2sxb','Name','California','col2'],
    'counties':['1YlY5e3oX-xlxkQnNk799TzO1KeyV4ptIJIr4EZ0v','Name','ID - Latah','col2'],
    'divisions':['1uH-LD3Jh6IKMTlQs6fBFP2W-_A3eoYevoUKYPJce','Name','LA - CENTRAL','col2'],
    'psas':['1h3j7BH01bDQCw1YmvyLbLzOQazZR367GpbhTFXu1','Name','Diablo-Santa Cruz Mtns','col2'],
    'polygon':['','',''],
    'custom':['','Name','','col2'],
}
var ftAPIkey = 'AIzaSyBxt1S23U6nn0gDtgTF9OwNmNOhd5TR-sM';

styles_ftOutlines = {
    'states': {
        'styleId': 2,
        'templateId':2
    },
    'counties': {
        'styleId': 2,
        'templateId': 2
    },
    'divisions': {
        'styleId': 2,
        'templateId': 2
    },
    'psas': {
        'styleId': 2,
        'templateId':2
        },
    'custom': {
        'styleId':2 ,
        'templateId':2
    },
};

styles_ftLayers = {
    'states': {
        'strokeColor':'#000000',
        'fillColor': '#000000',
        'fillOpacity': 0.1
    },
    'counties': {
        'strokeColor':'#800080',
        'fillColor': '#800080',
        'fillOpacity': 0.1
    },
    'divisions': {
        'strokeColor':'#0000ff',
        'fillColor': '#0000ff',
        'fillOpacity': 0.1
    },
    'psas': {
        'strokeColor':'#ff0000',
        'fillColor': '#ff0000',
        'fillOpacity': 0.1
    },
    'polygon': {
        'strokeColor':'#008000',
        'fillColor': '#008000',
        'fillOpacity': 0.1
    },
    'custom': {
        'strokeColor':'#008000',
        'fillColor': '#008000',
        'fillOpacity': 0.1
    }
};

//================
// TIME
//================
var mon_lens = {
    '1': '31',
    '2':'28',
    '3':'31',
    '4':'30',
    '5':'31',
    '6':'30',
    '7':'31',
    '8':'31',
    '9':'30',
    '10':'31',
    '11':'30',
    '12':'31'
};
//seasons [monthStart, dayStart, monthEnd, dayEnd]]
var seasons = {
    'wy':['10','1','9','30'],
    'wy-S':['4','1','3','31'],
    'gs':['4','1','10','30'],
    'gs-S':['11','1','3','31'],
    'ANN':['1','1','12','31'],
    'DJF':['12','1','2','28'],
    'MAM':['3','1','5','31'],
    'JJA':['6','1','8','31'],
    'SON':['9','1','11','30'],
    'Jan':['1','1','1','31'],
    'Feb':['2','1','2','28'],
    'Mar':['3','1','3','31'],
    'Apr':['4','1','4','30'],
    'May':['5','1','5','31'],
    'Jun':['6','1','6','30'],
    'Jul':['7','1','7','31'],
    'Aug':['8','1','8','31'],
    'Sept':['9','1','9','30'],
    'Oct':['10','1','10','31'],
    'Nov':['11','1','11','30'],
    'Dec':['12','1','12','31']
};

var monNamesShort = {
    '1':'Jan',
    '2':'Feb',
    '3':'Mar',
    '4':'Apr',
    '5':'May',
    '6':'Jun',
    '7':'Jul',
    '8':'Aug',
    '9':'Sep',
    '10':'Oct',
    '11':'Nov',
    '12':'Dec'
}

//================
// INTRAANNUAL FIGURES
//================
var percentile_names = ['5% - 95%', '10% - 90%','25% - 75%'];
var percentile_ids = ['5','10','25']
var percentile_colors = ['#B7E2F0','#8FBAC8','#5D8896'];
//Second variable
var percentile_colors2 = ['#ffe5e5','#ffb2b2','#ff6666'];

//================
// TIME SERIES
//================
var timeSeriesTtileByCalc = {
    'days':'Time Series of Daily Data',
    'interannual':'Time Series of Yearly Values',
    'intraannual':'Time Series of Single Year'
};

var chartLayersAll = ['chartType','runmean','average','threshold','yearTarget','percentiles','range'];
var chartLayersByCalc = {
    'days':['chartType','runmean','average'],
    'interannual':['chartType','runmean','average','threshold'],
    'intraannual':['chartType', 'yearTarget','percentiles']
};

var chartCheckboxIdsByCalc = {
    'days':['average','runmean'],
    'intraannual':['climatology','percentile_5','percentile_10','percentile_25'],
    'interannual':['average','runmean']
};



//================
// MAX DATES  (same info duplicated in python at collection_datastore.py)
//================
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
    'L8_SR':    {'NBRT':'L8_SR','default':'L8_SR'},
    'L8_TOA':   {'NBRT':'L8_8day','default':'L8_daily'},
    'L_TOA':    {'default':'L_daily'},
    'L_SR':     {'default':'L_daily'},
    'M':        {'Fractional_Snow_Cover':'MODIS_16day','LST_Day_1km':'MODIS_8day','default':'MODIS_16day'}
}
//these are the variable names above that do not have the default values
names_notdefault={'Fractional_Snow_Cover':'','LST_Day_1km':'','NBRT':''}

maxDates_lookup={
    'G':             'maxDate_G',
    'CHIRPS':        'maxDate_CHIRPS',
    'CFSV2':         'maxDate_CFSV2',
    'MODIS_daily':   'maxDate_MODIS_daily',
    'MODIS_8day':    'maxDate_MODIS_8day',
    'MODIS_16day':   'maxDate_MODIS_16day',
    'L_daily':       'maxDate_LANDSAT_daily',
    'L5_daily':      'maxDate_LANDSAT5_daily',
    'L7_daily':      'maxDate_LANDSAT7_daily',
    'L8_daily':      'maxDate_LANDSAT8_daily',
    'L8_SR':         'maxDate_L8_SR',
    'L5_8day':       'maxDate_LANDSAT5_8day',
    'L7_8day':       'maxDate_LANDSAT7_8day',
    'L8_8day':       'maxDate_LANDSAT8_8day',
    'PFV52':         'maxDate_PFV52', 
    'MACA':	     'maxDate_MACA',
    'NASANEX':       'maxDate_NASANEX'
}



