//CFSR Configuration File-Javascript

//==========================
// SOURCE DESCRIPTION
//==========================
var temp = {
        'PFV52':'AVHRR Pathfinder 4-km sea surface dataset (NOAA)'
}
addToDict1(source_desc,temp);


//==========================
// VALID_DATE_RANGES
//==========================
var temp = {
    'PFV52':['1981-08-24','2012-12-31']
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
    'PFV52':['1981','2012']
};
addToDict1(yearRangeClim,temp);

//this is what it gets set to on default
var temp = {
    'PFV52':['1981','2012']
};
addToDict1(default_yearRangeClim,temp);



//==========================
// SCALE
//==========================
var temp = {
    'PFV52':'4000'
}
addToDict1(scale_list,temp);

var ScalesPFV52={
      '4000':'4.0 km'
}
var temp = {
    'PFV52':window.ScalesPFV52
}
addToDict1(scaleListList,temp);

//==========================
// VARIABLESCFSV2
//==========================
var VariablesPFV52={
    'sea_surface_temperature':'SST (Sea Surface Temperature)'
}
var temp = {
    'PFV52':window.VariablesPFV52
}
addToDict1(variableListList,temp);

//=======================
// VARIABLE SHORT NAME
//=======================
var temp={
 	'sea_surface_temperature': 'Sea Surface Temperature'
}
addToDict1(variableShortName_list,temp);
//=======================
//  UNITS
//=======================
var temp ={
        'sea_surface_temperature':'deg C' 
};
addToDict1(units_metric,temp);

var temp={
	'sea_surface_temperature':'deg F'
};
addToDict1(units_english,temp);

var temp = {
    'PFV52':'sea_surface_temperature'
}
addToDict1(default_variable,temp);

//==========================
// THRESHOLD_COLORS
//==========================
var temp = {
    'sea_surface_temperature':['red', 'blue']
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
temp={
        'sea_surface_temperature':
                {'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-5,'max':25},'english':{'min':-10,'max':80}},
                'clim':{'metric':{'min':-5,'max':25},'english':{'min':-10,'max':10}}
		}
}
$.extend(colorbarMinMax_list1,temp);
//==========================
// COLORBAR MAP
//==========================
var temp={
        'sea_surface_temperature':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd'}
}
$.extend(colorbarMap_list1,temp);


//==========================
// COLORBAR SIZE
//==========================
 var temp={
        'sea_surface_temperature':{'anom':8,'value':8,'clim':8}
}
$.extend(colorbarSize_list1,temp);
