
//GRIDMET Configuration File-Javascript

//==========================
// SOURCE DESCRIPTION
//==========================
var temp = {
        'G':'METDATA/gridMET 4-km dataset'
}
addToDict1(source_desc,temp);

//==========================
// VALID_DATE_RANGES
//==========================
var temp = {
    'G':['1979-01-01','Present'],
};
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
    'G':['1979',currentYear]
};
addToDict1(yearRangeClim,temp);

//this is what it gets set to on default
var temp = {
    'G':['1981','2010']
};
addToDict1(default_yearRangeClim,temp);

//==========================
// SCALE
//==========================
var temp = {
    'G':'4000'
}
addToDict1(scale_list,temp);

var ScalesGridmet={
      '4000':'4.0km'
}
var temp = {
    'G':window.ScalesGridmet
}
addToDict1(scaleListList,temp);

//==========================
// VARIABLESGRIDMET
//==========================
var VariablesGridmet={
    //'dps':'DPS (Dew Point Temperature)',
    //'bi':'BI (Burning Index)',
    //'erc':'ERC (Energy Release Component)',
    //'fm100':'FM100 (100-HR Dead Fuel Moisture)',
    //'fm1000':'FM1000 (1000-HR Dead Fuel Moisture)',
    'pet':'ETg (Ground water Evapotranspiration)',
    //'pdsi':'PDSI (Palm. Drought Sev. Ind.)',
    'pr':'PPT (Precipitation)',
    //'wb':'PPT-ETo (Potential Water Deficit)',
    //'rmin':'RMIN (Min Rel. Humidity)',
    //'rmax':'RMAX (Max Rel. Humidity)',
    //'sph':'SPH (Specific Humidity)',
    //'srad':'SRAD (Downward Radiation)',
    //'tmean':'TMEAN (Mean Temperature)',
    //'tmmn':'TMIN (Min Temperature)',
    //'tmmx':'TMAX (Max Temperature)',
    'vs':'EVI (Enhanced Vegetation Index)'
}
var temp = {
    'G':window.VariablesGridmet
}
addToDict1(variableListList,temp);

//=======================
// VARIABLE SHORT NAME
//=======================
var temp={
        'pr':'Precipitation',
        'bi':'Burning Index',
        'fm100':'Fuel Moisture (100-hr)',
        'fm1000':'Fuel Moisture (1000-hr)',
        'tmmx':'Max Temperature',
        'tmmn':'Min Temperature',
        'tmean':'Mean Temperature',
        'rmin':'Min Rel. Humidity',
        'rmax':'Max Rel. Humidity',
        'srad':'Downward Shortwave Radiation',
        'vs':'Wind Speed',
        'sph':'Specific Humidity',
        'erc':'Energy Release Component',
        'pet':'Reference Evapotranspiration',
        'pdsi':'PDSI',
        'wb':'Water Balance',
        'dps':'Dew Point Temperature'
}
addToDict1(variableShortName_list,temp);

//=======================
//  UNITS
//=======================
var temp ={
        'pr':'mm',
        'bi':'',
        'fm100':'%',
        'fm1000':'%', 
        'tmmx':'deg C',
        'tmmn':'deg C',
        'tmean':'deg C',
        'rmin':'%',
        'rmax':'%',
        'srad':'W/m2',
        'vs':'m/s',
        'sph':'kg/kg',
        'erc':'',
        'pet':'mm',
        'pdsi':'',
        'wb':'mm',
        'dps':'deg C'
}
addToDict1(units_metric,temp);
 var temp = {
        'pr':'in',
        'bi':'',
        'fm100':'%',
        'fm1000':'%', 
        'tmmx':'deg F',
        'tmmn':'deg F',
        'tmean':'deg F',
        'rmin':'%',
        'rmax':'%',
        'srad':'W/m2',
        'vs':'mi/hr',
        'sph':'kg/kg',
        'erc':'',
        'pet':'in',
        'pdsi':'',
        'wb':'in',
        'dps':'deg F'
}
addToDict1(units_english,temp);

//=======================
// DEFAULTS
//=======================
var temp = {
    'G':'pr'
}
addToDict1(default_variable,temp);

//==========================
// THRESHOLD_COLORS
//==========================
var temp = {
    'pr':['blue', 'red'],
    'bi': ['red', 'blue'],
    'fm100':['blue', 'red'],
    'fm1000':['blue', 'red'], 
    'wb':['blue', 'red'],
    'pdsi':['blue', 'red'],
    'vs':['blue', 'red'],
    'erc':['red', 'blue'],
    'pet':['red', 'blue'],
    'rmin':['red', 'blue'],
    'rmax':['red', 'blue'],
    'sph':['red', 'blue'],
    'srad':['red', 'blue'],
    'tmean':['red', 'blue'],
    'dps':['red', 'blue'],
    'tmmn':['red', 'blue'],
    'tmmx':['red', 'blue']
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
var numMonths =3;
temp={
 	'tmmx':{'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-5,'max':35},'english':{'min':20,'max':100}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':-5,'max':35},'english':{'min':20,'max':100}}},
        'tmmn':{'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}}},
        'tmean':{'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-10,'max':30},'english':{'min':0,'max':80}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':-10,'max':30},'english':{'min':0,'max':80}}},
        'rmin':{'anom':{'metric':{'min':-15,'max':15},'english':{'min':-15,'max':15}},
                'value':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}}},
        'rmax':{'anom':{'metric':{'min':-15,'max':15},'english':{'min':-15,'max':15}},
                'value':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}}},
        'srad':{'anom':{'metric':{'min':-20,'max':20},'english':{'min':-20,'max':20}},
                'value':{'metric':{'min':50,'max':400},'english':{'min':50,'max':400}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':50,'max':400},'english':{'min':50,'max':400}}},
        'vs':{'anom':{'metric':{'min':-2.5,'max':2.5},'english':{'min':-5,'max':5}},
                'value':{'metric':{'min':0,'max':8},'english':{'min':0,'max':10}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':0,'max':8},'english':{'min':0,'max':10}}},
        'pdsi':{'anom':{'metric':{'min':-6,'max':6},'english':{'min':-6,'max':6}},
                'value':{'metric':{'min':-6,'max':6},'english':{'min':-6,'max':6}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':-6,'max':6},'english':{'min':-6,'max':6}}},
        'sph':{'anom':{'metric':{'min':-.001,'max':0.001},'english':{'min':-0.001,'max':0.001}},
                'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}},
                'value':{'metric':{'min':0,'max':0.02},'english':{'min':0,'max':0.02}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':0,'max':0.02},'english':{'min':0,'max':0.02}}},
        'erc':{'anom':{'metric':{'min':-20,'max':20},'english':{'min':-20,'max':20}},
                'value':{'metric':{'min':10,'max':120},'english':{'min':10,'max':120}},
                'clim':{'metric':{'min':10,'max':120},'english':{'min':10,'max':120}},
                'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'anompercentof':{'metric':{'min':75,'max':120},'english':{'min':75,'max':120}}},
	'bi':{'anom':{'metric':{'min':-20,'max':20},'english':{'min':-20,'max':20}},
                'value':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}},
                'clim':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}},
                'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'anompercentof':{'metric':{'min':75,'max':120},'english':{'min':75,'max':120}}},
  	'fm100':{'anom':{'metric':{'min':-5,'max':5},'english':{'min':-5,'max':5}},
                'value':{'metric':{'min':5,'max':30},'english':{'min':5,'max':30}},
                'clim':{'metric':{'min':5,'max':30},'english':{'min':5,'max':30}},
                'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'anompercentof':{'metric':{'min':75,'max':120},'english':{'min':75,'max':120}}},
 	 'fm1000':{'anom':{'metric':{'min':-5,'max':5},'english':{'min':-5,'max':5}},
                'value':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}},
                'clim':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}},
                'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'anompercentof':{'metric':{'min':75,'max':120},'english':{'min':75,'max':120}}},
        'pr':{'anom':{'metric':{'min':-100*numMonths,'max':100*numMonths},'english':{'min':-4*numMonths,'max':4*numMonths}},
                'value':{'metric':{'min':0,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
                'clim':{'metric':{'min':0,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
                'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'anompercentof':{'metric':{'min':0,'max':800},'english':{'min':0,'max':800}}},
        'pet':{'anom':{'metric':{'min':-25*numMonths,'max':25*numMonths},'english':{'min':-1*numMonths,'max':1*numMonths}},
                'value':{'metric':{'min':0*numMonths,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
                'clim':{'metric':{'min':0*numMonths,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
                'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}},
        'wb':{'anom':{'metric':{'min':-100*numMonths,'max':100*numMonths},'english':{'min':-4*numMonths,'max':4*numMonths}},
                'value':{'metric':{'min':-200,'max':200},'english':{'min':-10,'max':10}},
                'clim':{'metric':{'min':-200,'max':200},'english':{'min':-10,'max':10}},
                'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}},
	'dps':{'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}},
         	'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}}}
}
$.extend(colorbarMinMax_list1,temp);
//==========================
// COLORBAR MAP
//==========================
var temp={
        'tmmx':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','zscore':'BrBG'},
        'tmmn':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','zscore':'BrBG'},
        'tmean':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','zscore':'BrBG'},
        'rmin':{'anom':'BrBG','value':'BrBG','clim':'BrBG','zscore':'BrBG'},
        'rmax':{'anom':'BrBG','value':'BrBG','clim':'BrBG','zscore':'BrBG'},
        'srad':{'anom':'BuYlRd','value':'YlOrRd','clim':'YlOrRd','zscore':'YlOrRd'},
        'vs':{'anom':'BuYlRd','value':'YlGnBu','clim':'YlGnBu','zscore':'YlGnBu'},
        'pdsi':{'anom':'RdYlBu','value':'invUSDMwWet','clim':'invUSDMwWet'},
        'sph':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','anompercentchange':'BuYlRd','anompercentof':'BuYlRd','zscore':'BuYlRd'},
        'erc':{'anom':'BuYlRd','value':'BuYlRd','clim':'BuYlRd','anompercentchange':'BuYlRd','anompercentof':'BuYlRd','zscore':'BuYlRd'},
        'bi':{'anom':'BuYlRd','value':'BuYlRd','clim':'BuYlRd','anompercentchange':'BuYlRd','anompercentof':'BuYlRd','zscore':'BuYlRd'},
        'fm100':{'anom':'RdYlBu','value':'RdYlBu','clim':'RdYlBu','anompercentchange':'RdYlBu','anompercentof':'RdYlBu','zscore':'RdYlBu'},
        'fm1000':{'anom':'RdYlBu','value':'RdYlBu','clim':'RdYlBu','anompercentchange':'RdYlBu','anompercentof':'RdYlBu','zscore':'RdYlBu'},
        'pr':{'anom':'BrBG','value':'YlGnBu','clim':'YlGnBu','anompercentchange':'BrBG','anompercentof':'BrBG','zscore':'BrBG'},
        'pet':{'anom':'GBBr','value':'YlOrRd','clim':'YlOrRd','anompercentchange':'GBBr','anompercentof':'GBBr','zscore':'GBBr'},
        'wb':{'anom':'BrBG','value':'RdBu','clim':'RdBu','anompercentchange':'BrBG','anompercentof':'BrBG','zscore':'BrBG'},
        'dps':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','zscore':'BrBG'}
}
$.extend(colorbarMap_list1,temp);
//==========================
// COLORBAR SIZE
//==========================
 var temp={
        'tmmx':{'anom':8,'value':8,'clim':8,'zscore':8},
        'tmmn':{'anom':8,'value':8,'clim':8,'zscore':8},
        'tmean':{'anom':8,'value':8,'clim':8,'zscore':8},
        'rmin':{'anom':9,'value':8,'clim':8,'zscore':8},
        'rmax':{'anom':9,'value':8,'clim':8,'zscore':8},
        'srad':{'anom':8,'value':7,'clim':7,'zscore':8},  //probably should change these to all be more consistent..
        'vs':{'anom':8,'value':8,'clim':8,'zscore':8},
        'pdsi':{'anom':8,'value':11,'clim':11,'zscore':8},
        'sph':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':8,'zscore':8},
        'erc':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':8,'zscore':8},
        'bi':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':8,'zscore':8},
        'fm100':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':8,'zscore':8},
        'fm1000':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':8,'zscore':8},
        'pr':{'anom':9,'value':8,'clim':8,'anompercentchange':9,'anompercentof':9,'zscore':8},
        'pet':{'anom':9,'value':8,'clim':8,'anompercentchange':9,'anompercentof':9,'zscore':8},
        'wb':{'anom':9,'value':8,'clim':8,'anompercentchange':9,'anompercentof':9,'zscore':8},
        'dps':{'anom':8,'value':8,'clim':8,'zscore':8}
}
$.extend(colorbarSize_list1,temp);

