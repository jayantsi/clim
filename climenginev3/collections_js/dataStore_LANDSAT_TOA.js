//LANDSAT5 Configuration File-Javascript

//==========================
// SOURCE DESCRIPTION
//==========================
var temp = {
    'L_TOA':'Landsat 4/5/7/8 Top Of Atmosphere', //(cloud mask applied)
    'L5_TOA':'Landsat 5 Top Of Atmosphere', //(cloud mask applied)
    'L7_TOA':'Landsat 7 Top Of Atmposphere', //(cloud mask applied)
    'L8_TOA':'Landsat 8 Top Of Atmosphere' //(cloud mask applied)
};
addToDict1(source_desc, temp);

//==========================
// VALID_DATE_RANGES
//==========================
var temp = {
    'L_TOA':['1982-01-01','Present'],
    'L5_TOA':['1984-04-13','2011-11-17'],
    'L7_TOA':['1999-05-28','Present'],
    'L8_TOA':['2013-04-07','Present']
};
for (var key in temp) {
    if (temp.hasOwnProperty(key)) {
        valid_date_ranges[key] = new Array();
        valid_date_ranges[key][0] = temp[key][0]
        valid_date_ranges[key][1] = temp[key][1]
    }
}

//==========================
//   YEAR RANGES FOR CLIMATOLOGY CALCS
//==========================
//this is the range for the dropdown
var temp = {
    'L_TOA':['1984',currentYear],
    'L5_TOA':['1984','2011'],
    'L7_TOA':['1999',currentYear],
    'L8_TOA':['2013',currentYear]
};
addToDict1(yearRangeClim, temp);

//this is what it gets set to on default
var temp = {
    'L_TOA':['1984',currentYear],
    'L5_TOA':['1984','2011'],
    'L7_TOA':['1999',currentYear],
    'L8_TOA':['2013',currentYear]
};
addToDict1(default_yearRangeClim, temp);

//==========================
// SCALE
//==========================
var temp = {
    'L_TOA':'30',
    'L5_TOA':'30',
    'L7_TOA':'30',
    'L8_TOA':'30'
};
addToDict1(scale_list, temp);
var ScalesLandsat = {
    '30':'30 m'
};
var temp = {
    'L_TOA':window.ScalesLandsat,
    'L5_TOA':window.ScalesLandsat,
    'L7_TOA':window.ScalesLandsat,
    'L8_TOA':window.ScalesLandsat
};
addToDict1(scaleListList, temp);

//==========================
// VARIABLESLANDSAT
//==========================
var VariablesLandsatTOA = {
    'EVI':'EVI (Enhanced Vegetation Index)',
    'LST':'LST (Land Surface Temeprature)',
    'NBRT':'NBRT (Norm. Burn Ratio Thermal Index',
    'NDSI':'NDSI (Snow Index)',
    'NDVI':'NDVI (Vegetation Index)',
    'NDWI':'NDWI (Water Index)',
    'TrueColor':'True Color (Red/Green/Blue)',
    'FalseColor':'False Color (NIR/Red/Green)',
    'Blue':'Blue band',
    'Green':'Green band'
};
var temp = {
    'L_TOA':window.VariablesLandsatTOA,
    'L5_TOA':window.VariablesLandsatTOA,
    'L7_TOA':window.VariablesLandsatTOA,
    'L8_TOA':window.VariablesLandsatTOA
};
addToDict1(variableListList, temp);

//=======================
// VARIABLE SHORT NAME
//=======================
var temp = {
    'NDVI':'NDVI',
    'EVI':'EVI',
    'NBRT':'NBRT',
    'NDSI':'NDSI',
    'NDWI':'NDWI',
    'LST':'LST',
    'TrueColor':'True Color',
    'FalseColor':'False Color',
    'Blue':'Blue',
    'Green':'Green'
};
addToDict1(variableShortName_list, temp);

//=======================
//  UNITS
//=======================
var temp = {
    'NDVI':'',
    'EVI':'',
    'NBRT':'',
    'NDSI':'',
    'NDWI':'',
    'LST':'deg C',
    'TrueColor':'',
    'FalseColor':'',
    'Blue':'',
    'Green':''
};
addToDict1(units_metric, temp);
var temp = {
    'NDVI':'',
    'EVI':'',
    'NBRT':'',
    'NDSI':'',
    'NDWI':'',
    'LST':'deg F',
    'TrueColor':'',
    'FalseColor':'',
    'Blue':'',
    'Green':''
};
addToDict1(units_english, temp);

//==========================
// DEFAULTS
//==========================
var temp = {
    'L_TOA':'NDVI',
    'L5_TOA':'NDVI',
    'L7_TOA':'NDVI',
    'L8_TOA':'NDVI'
};
addToDict1(default_variable, temp);

//==========================
// THRESHOLD_COLORS
//==========================
var temp = {
    'NDVI':['green', 'orange'],
    'EVI':['green', 'orange'],
    'NDSI':['blue', 'red'],
    'NDWI':['blue', 'red'],
    'LST':['red', 'blue'],
    'TrueColor':['red', 'blue'],
    'FalseColor':['red', 'blue']
};
for (var key in temp) {
    if (temp.hasOwnProperty(key)) {
        threshold_colors[key] = new Array();
        threshold_colors[key][0] = temp[key][0]
        threshold_colors[key][1]= temp[key][1]
    }
}

//==========================
// COLORBAR MIN/MAX VALUES
//==========================
temp = {
    'NDVI':{
        'anom':{'metric':{'min':-.4,'max':.4},'english':{'min':-.4,'max':.4}},
        'value':{'metric':{'min':-.1,'max':.9},'english':{'min':-.1,'max':.9}},
        'clim':{'metric':{'min':-.1,'max':.9},'english':{'min':-.1,'max':.9}},
        'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
        'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}},
    'EVI':{
        'anom':{'metric':{'min':-.4,'max':.4},'english':{'min':-.4,'max':.4}},
        'value':{'metric':{'min':-.1,'max':.9},'english':{'min':-.1,'max':.9}},
        'clim':{'metric':{'min':-.1,'max':.9},'english':{'min':-.1,'max':.9}},
        'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
        'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}},
    'NBRT':{
        'anom':{'metric':{'min':-0.01,'max':0.01},'english':{'min':-0.01,'max':0.01}},
        'value':{'metric':{'min':0.92,'max':1},'english':{'min':0.92,'max':1}},
        'clim':{'metric':{'min':0.92,'max':1},'english':{'min':0.92,'max':1}},
        'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
        'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}},
    'NDSI':{
        'anom':{'metric':{'min':-0.5,'max':0.5},'english':{'min':-0.5,'max':0.5}},
        'value':{'metric':{'min':-0.2,'max':.7},'english':{'min':-0.2,'max':0.7}},
        'clim':{'metric':{'min':-0.2,'max':.7},'english':{'min':-0.2,'max':0.7}},
        'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
        'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}},
    'NDWI':{
        'anom':{'metric':{'min':-0.5,'max':0.5},'english':{'min':-0.5,'max':0.5}},
        'value':{'metric':{'min':-0.2,'max':.7},'english':{'min':-0.2,'max':0.7}},
        'clim':{'metric':{'min':-0.2,'max':.7},'english':{'min':-0.2,'max':0.7}},
        'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
        'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}},
    'LST':{
        'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
        'value':{'metric':{'min':0,'max':50},'english':{'min':30,'max':120}},
        'clim':{'metric':{'min':0,'max':50},'english':{'min':30,'max':120}}},
    'TrueColor':{
        'anom':{'metric':{'min':-0.1,'max':0.1},'english':{'min':-0.1,'max':0.1}},
        'value':{'metric':{'min':0,'max':0.3},'english':{'min':0,'max':0.3}},
        'clim':{'metric':{'min':0,'max':0.3},'english':{'min':0,'max':0.3}}},
    'FalseColor':{
        'anom':{'metric':{'min':-0.1,'max':0.1},'english':{'min':-0.1,'max':0.1}},
        'value':{'metric':{'min':0,'max':0.3},'english':{'min':0,'max':0.3}},
        'clim':{'metric':{'min':0,'max':0.3},'english':{'min':0,'max':0.3}}},
    'Blue':{
        'anom':{'metric':{'min':-0.1,'max':0.1},'english':{'min':-0.1,'max':0.1}},
        'value':{'metric':{'min':0.0,'max':0.3},'english':{'min':0.0,'max':0.3}},
        'clim':{'metric':{'min':0.0,'max':0.3},'english':{'min':0.0,'max':0.3}}},
    'Green':{
        'anom':{'metric':{'min':-0.1,'max':0.1},'english':{'min':-0.1,'max':0.1}},
        'value':{'metric':{'min':0,'max':0.3},'english':{'min':0,'max':0.3}},
        'clim':{'metric':{'min':0,'max':0.3},'english':{'min':0,'max':0.3}}}
};
$.extend(colorbarMinMax_list1, temp);

//==========================
// COLORBAR MAP
//==========================
//note that anompercentof defaults are getting overwritten by /collections/set_formDefaults.js
var temp = {
    'NDVI':{
        'anom':'RdYlGn','value':'YlGn','clim':'YlGn',
        'anompercentchange':'RdYlGn','anompercentof':'invUSDMwWet'},
    'EVI':{
        'anom':'RdYlGn','value':'YlGn','clim':'YlGn',
        'anompercentchange':'RdYlGn','anompercentof':'invUSDMwWet'},
    'NDSI':{
        'anom':'RdYlBu','value':'invBlues','clim':'invBlues',
        'anompercentchange':'RdYlBu','anompercentof':'invUSDMwWet'},
    'NDWI':{
        'anom':'RdYlBu','value':'invBlues','clim':'invBlues',
        'anompercentchange':'RdYlBu','anompercentof':'invUSDMwWet'},
    'NBRT':{'anom':'invRdGy','value':'invGreys','clim':'invGreys'},
    'LST': {'anom':'BuYlRd','value':'BuRd','clim':'BuRd'},
    'TrueColor': {'anom':'BuYlRd','value':'BuRd','clim':'BuRd'},
    'FalseColor': {'anom':'BuYlRd','value':'BuRd','clim':'BuRd'},
    'Blue':{'anom':'invRdGy','value':'invGreys','clim':'invGreys'},
    'Green':{'anom':'invRdGy','value':'invGreys','clim':'invGreys'}
};
$.extend(colorbarMap_list1, temp);

//==========================
// COLORBAR SIZE
//==========================
 var temp = {
    'NDVI':{'anom':8,'value':9,'clim':9,'anompercentchange':8,'anompercentof':11},
    'EVI':{'anom':8,'value':9,'clim':9,'anompercentchange':8,'anompercentof':11},
    'NBRT':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':8},
    'NDSI':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':11},
    'NDWI':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':11},
    'LST':{'anom':8,'value':8,'clim':8},
    'TrueColor':{'anom':8,'value':8,'clim':8},
    'FalseColor':{'anom':8,'value':8,'clim':8},
    'Blue':{'anom':8,'value':8,'clim':8},
    'Green':{'anom':8,'value':8,'clim':8}
};
$.extend(colorbarSize_list1, temp);
