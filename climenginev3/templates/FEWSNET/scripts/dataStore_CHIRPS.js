//CHIRPS Configuration File-Javascript
//this is an overwrite of the regular datastore for CHIRPS


//==========================
// SOURCE DESCRIPTION
//==========================
var temp = {
        'CHIRPS':'CHIRPS 4.8-km (1/20-deg) precipitation dataset (UCSB/CHG)'
}
addToDict1(source_desc,temp);

//==========================
// VALID_DATE_RANGES
//==========================
var temp = {
   'CHIRPS':['1981-01-01','Present'],
}
for (var key in temp) {
  if (temp.hasOwnProperty(key)) {
        valid_date_ranges[key]=new Array();
        valid_date_ranges[key][0]=temp[key][0]
        valid_date_ranges[key][1]=temp[key][1]
  }
}

//==========================
// SCALE
//==========================
var temp = {
    'CHIRPS':'4800'
}
addToDict1(scale_list,temp);

var ScalesChirps={
      '4800':'4.8km'
}

//==========================
// VARIABLESCHIRPS
//==========================
var VariablesChirps={
    'precipitation':'Precipitation'
}

//=======================
// VARIABLE SHORT NAME
//=======================
var temp={
        'precipitation':'Precipitation',
}
addToDict1(variableShortName_list,temp);

//=======================
//  UNITS
//=======================
var temp={
        'precipitation':'mm',
}
addToDict1(units_metric,temp);
var temp={
        'precipitation':'in',
}
addToDict1(units_english,temp);
//==========================
// DEFAULTS
//==========================
var temp = {
    'CHIRPS':'precipitation'
}
addToDict1(default_variable,temp);

//==========================
// THRESHOLD_COLORS
//==========================
var temp = {
    'precipitation':['blue', 'red'], 
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
        'precipitation':{'anom':{'metric':{'min':-100*numMonths,'max':100*numMonths},'english':{'min':-4*numMonths,'max':4*numMonths}},
         'value':{'metric':{'min':0,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
         'clim':{'metric':{'min':0,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
         'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
         'anompercentof':{'metric':{'min':0,'max':800},'english':{'min':0,'max':800}},
         'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}}}
}
$.extend(colorbarMinMax_list1,temp);
//==========================
// COLORBAR MAP
//==========================
var temp={
 //'precipitation':{'anom':'BrBG','value':'YlGnBu','clim':'YlGnBu','anompercentchange':'BrBG','anompercentof':'BrBG','zscore':'BrBG'}
 'precipitation':{'anom':'RdBu','value':'YlGnBu','clim':'YlGnBu','anompercentchange':'BrBG','anompercentof':'BrBG','zscore':'BrBG'}
}
$.extend(colorbarMap_list1,temp);
//==========================
// COLORBAR SIZE
//==========================
var temp={
      'precipitation':{'anom':9,'value':8,'clim':8,'anompercentchange':9,'anompercentof':9,'zscore':9}
}
$.extend(colorbarSize_list1,temp);
