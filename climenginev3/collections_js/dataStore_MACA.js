//MACA Configuration File-Javascript


//==========================
// SOURCE DESCRIPTION
//==========================
var temp = {
        'MACA':'UI MACAv2-METDATA 4-km downscaled CMIP5 daily projections dataset (University of Idaho)'
}
addToDict1(source_desc,temp);

//==========================
// VALID_DATE_RANGES
//==========================
var temp = {
    'MACA':['1950-01-01','2099-12-31']
}
for (var key in temp) {
  if (temp.hasOwnProperty(key)) {
        valid_date_ranges[key]=new Array();
        valid_date_ranges[key][0]=temp[key][0]
        valid_date_ranges[key][1]=temp[key][1]
  }
}

var valid_date_range_MACA = {
    'historical':['1950-01-01','2005-12-31'],
    'rcp45':['2006-01-01','2099-12-31'],
    'rcp85':['2006-01-01','2099-12-31']
}


//==========================
//   YEAR RANGES FOR CLIMATOLOGY CALCS
//==========================
//this is the range for the dropdown
var temp = {
    'MACA':['1950','2005'],
};
addToDict1(yearRangeClim,temp);

//this is what it gets set to on default
var temp = {
    'MACA':['1950','2005'],
};
addToDict1(default_yearRangeClim,temp);



//==========================
// SCALE
//==========================
var temp = {
    'MACA':'4000'
}
addToDict1(scale_list,temp);

var ScalesMACA={
      '4000':'4.0km'
}
var temp = {
    'MACA':window.ScalesMACA
}
addToDict1(scaleListList,temp);


//==========================
// VARIABLESMACA
//==========================
var VariablesMACA={
    'pr':'PR (Precipitation)',
    'rhsmin':'RHSMIN (Min Rel. Humidity)',
    'rhsmax':'RHSMAX (Max Rel. Humidity)',
    'huss':'HUSS(Specific Humidity)',
    'rsds':'RSDS (Downward Radiation)',
    'tasmax':'TASMIN (Min Temperature)',
    'tasmin':'TASMAX (Max Temperature)',
    'uas':'UAS (Northward Wind)',
    'vas':'VAS (Eastward Wind)',
}
var temp = {
    'MACA':window.VariablesMACA
}
addToDict1(variableListList,temp);

//=======================
// VARIABLE SHORT NAME
//=======================
var temp={
        'pr':'Precipitation',
        'rhsmax':'Max Rel. Humidity',
        'rhsmin':'Min Rel. Humidity',
        'tasmax':'Min Temperature',
        'tasmin':'Max Temperature',
        'rsds':'Downward Shortwave Radiation',
        'uas':'Northward Wind',
        'vas':'Eastward Wind',
        'huss':'Specific Humidity',
}
addToDict1(variableShortName_list,temp);

//=======================
//  UNITS
//=======================
var temp ={
        'pr':'mm',
        'tasmax':'deg C',
        'tasmin':'deg C',
        'rhsmax':'%',
        'rhsmin':'%',
        'rsds':'W/m2',
        'uas':'m/s',
        'vas':'m/s',
        'huss':'kg/kg',
}
addToDict1(units_metric,temp);
var temp = {
        'pr':'in',
        'tasmax':'deg F',
        'tasmin':'deg F',
        'rhsmax':'%',
        'rhsmin':'%',
        'rsds':'W/m2',
        'uas':'mi/hr',
        'vas':'mi/hr',
        'huss':'kg/kg',
}
addToDict1(units_english,temp);
//==========================
// DEFAULTS
//==========================
var temp = {
    'MACA':'pr'
}       
addToDict1(default_variable,temp);
var temp = {
    'MACA':'inmcm4'
}       
addToDict1(default_model,temp);
var temp = {
    'MACA':'custom'
}       
addToDict1(default_timeperiod,temp);
var temp = {
    'MACA':'2030'
}       
addToDict1(default_yearStartClimFut,temp);
var temp = {
    'MACA':'2059'
}       
addToDict1(default_yearEndClimFut,temp);
//==========================
// THRESHOLD_COLORS
//==========================
var temp = {
    'pr':['blue', 'red'],
    'tasmax':['red', 'blue'],
    'tasmin':['red', 'blue'],
    'rhsmin':['red', 'blue'],
    'rhsmax':['red', 'blue'],
    'rsds':['red', 'blue'],
    'uas':['blue', 'red'],
    'vas':['blue', 'red'],
    'huss':['red', 'blue'],
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
       'pr':{'anom':{'metric':{'min':-100*numMonths,'max':100*numMonths},'english':{'min':-4*numMonths,'max':4*numMonths}}, 
                'value':{'metric':{'min':0,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
                'clim':{'metric':{'min':0,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
                'anompercentof':{'metric':{'min':0,'max':800},'english':{'min':0,'max':800}}},
 	'tasmax':{'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-5,'max':35},'english':{'min':20,'max':100}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':-5,'max':35},'english':{'min':20,'max':100}}},
        'tasmin':{'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}}},
        'rhsmin':{'anom':{'metric':{'min':-15,'max':15},'english':{'min':-15,'max':15}},
                'value':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}}},
        'rhsmax':{'anom':{'metric':{'min':-15,'max':15},'english':{'min':-15,'max':15}},
                'value':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':0,'max':100},'english':{'min':0,'max':100}}},
        'rsds':{'anom':{'metric':{'min':-20,'max':20},'english':{'min':-20,'max':20}},
                'value':{'metric':{'min':50,'max':400},'english':{'min':50,'max':400}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':50,'max':400},'english':{'min':50,'max':400}}},
        'uas':{'anom':{'metric':{'min':-2.5,'max':2.5},'english':{'min':-5,'max':5}},
                'value':{'metric':{'min':-8,'max':8},'english':{'min':-10,'max':10}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':-8,'max':8},'english':{'min':-10,'max':10}}},
        'vas':{'anom':{'metric':{'min':-2.5,'max':2.5},'english':{'min':-5,'max':5}},
                'value':{'metric':{'min':-8,'max':8},'english':{'min':-10,'max':10}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'clim':{'metric':{'min':-8,'max':8},'english':{'min':-10,'max':10}}},
        'huss':{'anom':{'metric':{'min':-.001,'max':0.001},'english':{'min':-0.001,'max':0.001}},
                'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}}
}
$.extend(colorbarMinMax_list1,temp);

//==========================
// COLORBAR MAP
//==========================
var temp={
	'pr':{'anom':'BrBG','value':'YlGnBu','clim':'YlGnBu','anompercentchange':'BrBG','anompercentof':'BrBG','zscore':'BrBG'},
        'tasmax':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','zscore':'BuYlRd'},
        'tasmin':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','zscore':'BuYlRd'},
        'rhsmin':{'anom':'BrBG','value':'BrBG','clim':'BrBG','zscore':'BrBG'},
        'rhsmax':{'anom':'BrBG','value':'BrBG','clim':'BrBG','zscore':'BrBG'},
        'rsds':{'anom':'BuYlRd','value':'YlOrRd','clim':'YlOrRd','zscore':'BuYlRd'},
        'uas':{'anom':'BuYlRd','value':'YlGnBu','clim':'YlGnBu','zscore':'BuYlRd'},
        'vas':{'anom':'BuYlRd','value':'YlGnBu','clim':'YlGnBu','zscore':'BuYlRd'},
        'huss':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','anompercentchange':'BuYlRd','anompercentof':'BuYlRd','zscore':'BuYlRd'}
}
$.extend(colorbarMap_list1,temp);
//==========================
// COLORBAR SIZE
//==========================
var temp={
	'pr':{'anom':9,'value':8,'clim':8,'anompercentchange':9,'anompercentof':9,'zscore':8},
        'tasmax':{'anom':8,'value':8,'clim':8,'zscore':8},
        'tasmin':{'anom':8,'value':8,'clim':8,'zscore':8},
        'rhsmin':{'anom':9,'value':8,'clim':8,'zscore':8},
        'rhsmax':{'anom':9,'value':8,'clim':8,'zscore':8},
        'rsds':{'anom':8,'value':7,'clim':7,'zscore':8},  //probably should change these to all be more consistent..
        'uas':{'anom':8,'value':8,'clim':8,'zscore':8},
        'vas':{'anom':8,'value':8,'clim':8,'zscore':8},
        'huss':{'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':8,'zscore':8}
}
$.extend(colorbarSize_list1,temp);


//===================================
// EXTRA DICTIONARIES OTHER COLLECTIONS DON'T HAVE
//===================================

var ModelsMACA={
        'MM': 'Multi-Model Mean (20 MACA-CMIP5 Models))',
        'bcc-csm1-1': 'bcc-csm1-1 (China)',
        'bcc-csm1-1-m': 'bcc-csm1-1 (China)',
        'BNU-ESM': 'BNU-ESM (China)',
        'CanESM2': 'CanESM2 (Canada)',
        'CCSM4': 'CCSM4 (USA)',
        'CNRM-CM5': 'CNRM-CM5 (France)',
        'CSIRO-Mk3-6-0': 'CSIRO-Mk3-6-0 (Austrailia)',
        'GFDL-ESM2M':'GFDL-ESM2M (USA)',
        'GFDL-ESM2G':'GFDL-ESM2G (USA)',
        'HadGEM2-ES365':'HadGEM2-ES365 (UK)',
        'HadGEM2-CC365':'HadGEM2-CC365 (UK)',
        'inmcm4':'inmcm4 (Russia)',
        'IPSL-CM5A-LR':'IPSL-CM5A-LR (France)',
        'IPSL-CM5A-MR':'IPSL-CM5A-MR (France)',
        'IPSL-CM5B-LR':'IPSL-CM5B-LR (France)',
        'MIROC5':'MIROC5 (Japan)',
        'MIROC-ESM':'MIROC-ESM (Japan)',
        'MIROC-ESM-CHEM':'MIROC-ESM-CHEM (Japan)',
        'MRI-CGCM3':'MRI-CGCM3 (Japan)',
        'NorESM1-M':'NorESM1-M (Norway)',
}

var ScenariosMACA={
        //'historical':'Historical Scenario',
        'rcp45':'RCP4.5 (Moderate Decrease in Emissions Future Scenario)',
        'rcp85':'RCP8.5 (Business-As-Usual Emissions Future Scenario)',
}

