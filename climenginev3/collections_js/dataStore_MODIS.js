//MODIS Configuration File-Javascript

//==========================
// SOURCE DESCRIPTION
//==========================
var temp = {
        'M':'MODIS' //16-day, 8-day, daily
}
addToDict1(source_desc,temp);
//==========================
// VALID_DATE_RANGES
//==========================
var temp = {
        'M':['2000-02-24','Present'],
}
for (var key in temp) {
  if (temp.hasOwnProperty(key)) {
        valid_date_ranges[key]=new Array();
        valid_date_ranges[key][0]=temp[key][0]
        valid_date_ranges[key][1]=temp[key][1]
  }
}

//==========================
//   YEAR RANGES FOR CLIMATOLOGY CALCS
//==========================
//this is the range for the dropdown
var temp = {
    'M':['2000',currentYear]
};
addToDict1(yearRangeClim,temp);

//this is what it gets set to on default
var temp = {
    'M':['2000',currentYear]
};
addToDict1(default_yearRangeClim,temp);




//==========================
// SCALE
//==========================
var temp = {
        'M':'500',
        'M_LST_Day_1km':'1000' //special - need to modify /media/myjs/set_scale.js
}
addToDict1(scale_list,temp);
var ScalesModis={
        '500':'0.5 km',
        '1000':'1.0 km'
}
var temp = {
    'M':window.ScalesModis,
};
addToDict1(scaleListList, temp);

//==========================
// VARIABLESMODIS
//==========================
var VariablesModis={
        'BAI':'BAI (Burned Area Index)',
        'EVI':'EVI (Enhanced Vegetation Index)',
        'LST_Day_1km':'LST (Land Surface Temperature in Day)',
        'NDSI':'NDSI (Snow Index)',
        'NDVI':'NDVI (Vegetation Index)',
        'NDWI':'NDWI (Water Index)',
        'Fractional_Snow_Cover':'FSC (Fractional Snow Cover)'
}
var temp = {
    'M':window.VariablesModis
}
addToDict1(variableListList,temp);
//=======================
// VARIABLE SHORT NAME
//=======================
var temp={
        'NDVI':'NDVI',
        'EVI':'EVI',
        'BAI':'BAI',
        'NBRT':'NBRT',
        'NDSI':'NDSI',
        'NDWI':'NDWI',
        'LST_Day_1km':'Land Surface Temperature',
        'Fractional_Snow_Cover':'Fractional Snow Cover',
}
addToDict1(variableShortName_list,temp);

//=======================
//  UNITS
//=======================
var temp ={
        'NDVI':'',
        'EVI':'',
        'BAI':'',
        'NBRT':'',
        'NDSI':'',
        'NDWI':'',
        'LST_Day_1km':'deg C',
        'Fractional_Snow_Cover':'%',
}
addToDict1(units_metric,temp);
var temp={
        'NDVI':'',
        'EVI':'',
        'BAI':'',
        'NBRT':'',
        'NDSI':'',
        'NDWI':'',
        'LST_Day_1km':'deg F',
        'Fractional_Snow_Cover':'%'
}
addToDict1(units_english,temp);
//==========================
// DEFAULTS
//==========================
var temp = {
    'M':'NDVI'
}
addToDict1(default_variable,temp);
//==========================
// THRESHOLD_COLORS
//==========================
var temp= {
        'NDVI':['green', 'orange'],
        'EVI':['green', 'orange'],
        'BAI':['red', 'green'],
        'NDSI':['blue', 'red'],
        'NDWI':['blue', 'red'],
        'LST_Day_1km':['red', 'blue'],
        'Fractional_Snow_Cover':['red', 'blue']
}
for (var key in temp) {
  if (temp.hasOwnProperty(key)) {
        threshold_colors[key]=new Array();
        threshold_colors[key][0]=temp[key][0]
        threshold_colors[key][1]=temp[key][1]
  }
}

//==========================
// COLORBAR MIN/MAX VALUES 
//==========================
var temp= {
        'NDVI':{'anom':{'metric':{'min':-.4,'max':.4},'english':{'min':-.4,'max':.4}},
                'value':{'metric':{'min':-.1,'max':.9},'english':{'min':-.1,'max':.9}},
                'clim':{'metric':{'min':-.1,'max':.9},'english':{'min':-.1,'max':.9}},
		'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}
	},
        'EVI':{'anom':{'metric':{'min':-.4,'max':.4},'english':{'min':-.4,'max':.4}},
                'value':{'metric':{'min':-.1,'max':.9},'english':{'min':-.1,'max':.9}},
                'clim':{'metric':{'min':-.1,'max':.9},'english':{'min':-.1,'max':.9}},
		'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}
	},
        'BAI':{'anom':{'metric':{'min':-10,'max':10},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}},
                'clim':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}},
		'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}
	},
        'NBRT':{'anom':{'metric':{'min':-0.01,'max':0.01},'english':{'min':-0.01,'max':0.01}},
                'value':{'metric':{'min':0.92,'max':1},'english':{'min':0.92,'max':1}},
               'clim':{'metric':{'min':0.92,'max':1},'english':{'min':0.92,'max':1}},
		'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}
	},
        'NDSI':{'anom':{'metric':{'min':-0.5,'max':0.5},'english':{'min':-0.5,'max':0.5}},
                'value':{'metric':{'min':-0.2,'max':.7},'english':{'min':-0.2,'max':0.7}},
                'clim':{'metric':{'min':-0.2,'max':.7},'english':{'min':-0.2,'max':0.7}},
		'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}
	},
        'NDWI':{'anom':{'metric':{'min':-0.5,'max':0.5},'english':{'min':-0.5,'max':0.5}},
                'value':{'metric':{'min':-0.2,'max':.7},'english':{'min':-0.2,'max':0.7}},
                'clim':{'metric':{'min':-0.2,'max':.7},'english':{'min':-0.2,'max':0.7}},
		'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}
	},
        'LST_Day_1km':
                {'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-10,'max':45},'english':{'min':15,'max':110}},
                'clim':{'metric':{'min':-10,'max':45},'english':{'min':15,'max':110}}},
        'Fractional_Snow_Cover':
                {'anom':{'metric':{'min':-15,'max':15},'english':{'min':-15,'max':15}},
                'value':{'metric':{'min':0,'max':100},'english':{'min':0,'max':110}},
                'clim':{'metric':{'min':0,'max':100},'english':{'min':0,'max':110}}}
}
$.extend(colorbarMinMax_list1,temp);

//==========================
// COLORBAR MAP
//==========================
//note that anompercentof defaults are getting overwritten by /collections/set_formDefaults.js
var temp={
        'NDVI':{'anom':'RdYlGn','value':'YlGn','clim':'YlGn','anompercentchange':'RdYlGn','anompercentof':'invUSDMwWet'},
        'EVI':{'anom':'RdYlGn','value':'YlGn','clim':'YlGn', 'anompercentchange':'RdYlGn','anompercentof':'invUSDMwWet'},
        'BAI':{'anom':'invRdGy','value':'invGreys','clim':'invGreys','anompercentchange':'invRdGy','anompercentof':'invRdGy'},
        'NBRT':{'anom':'invRdGy','value':'invGreys','clim':'invGreys','anompercentchange':'RdYlGn','anompercentof':'RdYlGn'},
        'NDSI':{'anom':'RdYlBu','value':'invBlues','clim':'invBlues','anompercentchange':'RdYlBu','anompercentof':'invUSDMwWet'},
        'NDWI':{'anom':'RdYlBu','value':'invBlues','clim':'invBlues','anompercentchange':'RdYlBu','anompercentof':'invUSDMwWet'},
        'LST_Day_1km':
                {'anom':'BuYlRd','value':'BuRd','clim':'BuRd'},
        'Fractional_Snow_Cover':{'anom':'RdYlBu','value':'invBlues','clim':'invBlues'}
}
$.extend(colorbarMap_list1,temp);


//==========================
// COLORBAR SIZE 
//==========================
 var temp={
        'NDVI':{'anom':8,'value':9,'clim':9,'anompercentchange':8,'anompercentof':11},
        'EVI':{'anom':8,'value':9,'clim':9,'anompercentchange':8,'anompercentof':11},
        'BAI':{'anom':8,'value':9,'clim':9,'anompercentchange':8,'anompercentof':8},
        'NBRT':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':8},
        'NDSI':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':11},
        'NDWI':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':11},
        'LST_Day_1km':{'anom':8,'value':8,'clim':8},
        'Fractional_Snow_Cover':{'anom':9,'value':8,'clim':8}
}

$.extend(colorbarSize_list1,temp);

