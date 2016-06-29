//NASA_NEX Configuration File-Javascript

//==========================
// SOURCE DESCRIPTION
//==========================
var temp = {
    'NASANEX':'NASA Earth Exchange(NEX) 25-km downscaled Climate Projections(NEX-DCP30)'
};
addToDict1(source_desc,temp);

//==========================
// VALID_DATE_RANGES
//==========================
var temp = {
    'NASANEX':['1950-01-01','2099-12-31']
};
for (var key in temp) {
  if (temp.hasOwnProperty(key)) {
        valid_date_ranges[key]=new Array();
        valid_date_ranges[key][0]=temp[key][0]
        valid_date_ranges[key][1]=temp[key][1]
  }
}

var valid_date_range_NASANEX = {
    'historical':['1950-01-01','2005-12-31'],
    'rcp26':['2006-01-01','2099-12-31'],
    'rcp45':['2006-01-01','2099-12-31'],
    'rcp60':['2006-01-01','2099-12-31'],
    'rcp85':['2006-01-01','2099-12-31']
};

//==========================
//   YEAR RANGES FOR CLIMATOLOGY CALCS
//==========================
//this is the range for the dropdown
var temp = {
    'NASANEX':['1950','2005']
};
addToDict1(yearRangeClim,temp);

//this is what it gets set to on default
var temp = {
    'NASANEX':['1950','2005']
};
addToDict1(default_yearRangeClim,temp);



//==========================
// SCALE
//==========================
var temp = {
    'NASANEX':'25000'
};
addToDict1(scale_list,temp);

var ScalesNASANEX = {
      '25000':'25km'
};
var temp = {
    'NASANEX':window.ScalesNASANEX
}
addToDict1(scaleListList,temp);


//==========================
// VARIABLESMACA
//==========================
var VariablesNASANEX = {
    'pr':'PR (Precipitation)',
    'tasmax':'TASMIN (Min Temperature)',
    'tasmin':'TASMAX (Max Temperature)'
};
var temp = {
    'NASANEX':window.VariablesNASANEX
}
addToDict1(variableListList,temp);

//=======================
// VARIABLE SHORT NAME
//=======================
var temp = {
        'pr':'Precipitation',
        'tasmax':'Min Temperature',
        'tasmin':'Max Temperature'
};
addToDict1(variableShortName_list,temp);

//=======================
//  UNITS
//=======================
var temp = {
        'pr':'mm',
        'tasmax':'deg C',
        'tasmin':'deg C'
};
addToDict1(units_metric,temp);
var temp = {
        'pr':'in',
        'tasmax':'deg F',
        'tasmin':'deg F'
};
addToDict1(units_english,temp);

//==========================
// DEFAULTS
//==========================
var temp = {
    'NASANEX':'pr'
};
addToDict1(default_variable,temp);
var temp = {
    'NASANEX':'inmcm4'
};
addToDict1(default_model,temp);
var temp = {
    'NASANEX':'custom'
};
addToDict1(default_timeperiod,temp);
var temp = {
    'NASANEX':'2030'
};
addToDict1(default_yearStartClimFut,temp);
var temp = {
    'NASANEX':'2059'
};
addToDict1(default_yearEndClimFut,temp);

//==========================
// THRESHOLD_COLORS
//==========================
var temp = {
    'pr':['blue', 'red'],
    'tasmax':['red', 'blue'],
    'tasmin':['red', 'blue']
};
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
temp = {
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
                'clim':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}}}
};
$.extend(colorbarMinMax_list1,temp);

//==========================
// COLORBAR MAP
//==========================
var temp = {
	 'pr':{'anom':'BrBG','value':'YlGnBu','clim':'YlGnBu','anompercentchange':'BrBG','anompercentof':'BrBG','zscore':'BrBG'},
        'tasmax':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','zscore':'BrBG'},
        'tasmin':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','zscore':'BrBG'}
};
$.extend(colorbarMap_list1,temp);
//==========================
// COLORBAR SIZE
//==========================
var temp = {
	 'pr':{'anom':9,'value':8,'clim':8,'anompercentchange':9,'anompercentof':9,'zscore':8},
        'tasmax':{'anom':8,'value':8,'clim':8,'zscore':8},
        'tasmin':{'anom':8,'value':8,'clim':8,'zscore':8}
};
$.extend(colorbarSize_list1,temp);


//===================================
// EXTRA DICTIONARIES OTHER COLLECTIONS DON'T HAVE
//===================================

var ModelsNASANEX = {
        'MM': 'Multi-Model Mean (33 NASANEX-CMIP5 Models))',
        'ACCESS1-0': 'ACCESS1-0 (?)',
        'bcc-csm1-1': 'bcc-csm1-1 (China)',
        'bcc-csm1-1-m': 'bcc-csm1-1 (China)',
        'BNU-ESM': 'BNU-ESM (China)',
        'CanESM2': 'CanESM2 (Canada)',
        'CCSM4': 'CCSM4 (USA)',
        'CESM1-BGC': 'CESM1-BGC (USA)',
        'CESM1-CAM5': 'CESM1-CAM5 (USA)',
        'CMCC-CM': 'CMCC-CM (USA)',
        'CNRM-CM5': 'CNRM-CM5 (France)',
        'CSIRO-Mk3-6-0': 'CSIRO-Mk3-6-0 (Austrailia)',
        'FGOALS-g2': 'FGOALS-g2 (?)',
        'FIO-ESM': 'FIO-ESM (?)',
        'GFDL-CM3':'GFDL-CM3 (USA)',
        'GFDL-ESM2M':'GFDL-ESM2M (USA)',
        'GFDL-ESM2G':'GFDL-ESM2G (USA)',
        'GISS-E2-H-CC':'GISS-E2-H-CC (USA)',
        'GISS-E2-R':'GISS-E2-R (USA)',
        'GISS-E2-R-CC':'GISS-E2-R-CC (USA)',
        'HadGEM2-AO':'HadGEM2-AO (UK)',
        'HadGEM2-ES':'HadGEM2-ES (UK)',
        'HadGEM2-CC':'HadGEM2-CC (UK)',
        'inmcm4':'inmcm4 (Russia)',
        'IPSL-CM5A-LR':'IPSL-CM5A-LR (France)',
        'IPSL-CM5A-MR':'IPSL-CM5A-MR (France)',
        'IPSL-CM5B-LR':'IPSL-CM5B-LR (France)',
        'MIROC5':'MIROC5 (Japan)',
        'MIROC-ESM':'MIROC-ESM (Japan)',
        'MIROC-ESM-CHEM':'MIROC-ESM-CHEM (Japan)',
        'MPI-ESM-LR':'MPI-ESM-LR (Germany)',
        'MPI-ESM-MR':'MPI-ESM-MR (Germany)',
        'MRI-CGCM3':'MRI-CGCM3 (Japan)',
        'NorESM1-M':'NorESM1-M (Norway)'
};

var ScenariosNASANEX={
        //'historical':'Historical Scenario',
        'rcp26':'RCP2.6 (Incredible Decrease in Emissions Future Scenario)',
        'rcp45':'RCP4.5 (Moderate Decrease in Emissions Future Scenario)',
        'rcp60':'RCP6.0 (Semi-Moderate Decrease in Emissions Future Scenario)',
        'rcp85':'RCP8.5 (Business-As-Usual Emissions Future Scenario)'
};
