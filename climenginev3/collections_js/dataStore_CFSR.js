//CFSR Configuration File-Javascript

//==========================
// SOURCE DESCRIPTION
//==========================
var temp = {
        'CFSV2':'CFS 19.2-km reanalysis dataset (NOAA)'
}
addToDict1(source_desc,temp);


//==========================
// VALID_DATE_RANGES
//==========================
var temp = {
    'CFSV2':['1979-01-01','Present'],
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
    'CFSV2':['1979',currentYear]
};
addToDict1(yearRangeClim,temp);

//this is what it gets set to on default
var temp = {
    'CFSV2':['1979',currentYear]
};
addToDict1(default_yearRangeClim,temp);



//==========================
// SCALE
//==========================
var temp = {
    'CFSV2':'19200'
}
addToDict1(scale_list,temp);

var ScalesCFSv2={
      '19200':'19.2km'
}
var temp = {
    'CFSV2':window.ScalesCFSv2
}
addToDict1(scaleListList,temp);



//==========================
// VARIABLESCFSV2
//==========================
var VariablesCFSv2={
    'Maximum_temperature_height_above_ground_6_Hour_Interval':'TMAX (Max Temperature)',
    'Minimum_temperature_height_above_ground_6_Hour_Interval':'TMIN (Min Temperature)',
    'Precipitation_rate_surface_6_Hour_Average':'Precipitation',
    'Specific_humidity_height_above_ground':'SPH (Specific Humidity)',
    'Maximum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':'SPH MAX (Max Spec. Humidity)',
    'Minimum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':'SPH MIN (Min Spec. Humidity)',
    'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm':'Soil Moisture (5 cm below)',
    'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_25_cm':'Soil Moisture (25 cm below)',
    'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_70_cm':'Soil Moisture (70 cm below)',
    'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_150_cm':'Soil Moisture (150 cm below)',
    'Potential_Evaporation_Rate_surface_6_Hour_Average':'PET (Potential Evaporation)',
    'u-component_of_wind_height_above_ground':'Eastward Wind Component',
    'v-component_of_wind_height_above_ground':'Northward Wind Component',
    'vs':'VS (Wind Speed)',
    'netRAD':'netRAD (Net Radiation)',
    'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':'SRAD (Downward Shortwave Radiation',
    'Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':'Upward Shortwave Radiation',
    'Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average':'Downward Longwave Radiation',
    'Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average':'Upward Longwave Radiation',
    'Latent_heat_net_flux_surface_6_Hour_Average':'Latent Heat Flux',
    'Sensible_heat_net_flux_surface_6_Hour_Average':'Sensible Heat Flux',
    'Temperature_height_above_ground':'TMEAN (Mean Temperature)'
}
var temp = {
    'CFSV2':window.VariablesCFSv2
}
addToDict1(variableListList,temp);

//=======================
// VARIABLE SHORT NAME
//=======================
var temp={
 	'Maximum_temperature_height_above_ground_6_Hour_Interval':'Max Temperature',
        'Minimum_temperature_height_above_ground_6_Hour_Interval':'Min Temperature',
        'Latent_heat_net_flux_surface_6_Hour_Average':'Latent Heat Flux',
        'Sensible_heat_net_flux_surface_6_Hour_Average':'Sensible Heat Flux',
        'Precipitation_rate_surface_6_Hour_Average':'Precipitation',
        'u-component_of_wind_height_above_ground':'Eastward Wind',
        'v-component_of_wind_height_above_ground':'Northward Wind',
        'Pressure_surface':'Pressure',
        'Maximum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':'Max Spec. Humidity',
        'Minimum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':'Min Spec. Humidity',
        'Specific_humidity_height_above_ground':'Specific Humidity',
        'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':'Downward Shortwave Radiation',
        'Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':'Upward Shortwave Radiation',
        'Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average':'Downward Longwave Radiation',
        'Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average':'Upward Longwave Radiation',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm':'5cm Soil Moisture',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_25_cm':'25cm Soil Moisture',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_70_cm':'70cm Soil Moisture',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_150_cm':'150cm Soil Moisture',
        'Potential_Evaporation_Rate_surface_6_Hour_Average':'Potential Evaporation',
        'netRAD':'Net Radiation',
        'Temperature_height_above_ground':'Mean Temperature',
        'Geopotential_height_surface':'Geopotential Height'
}
addToDict1(variableShortName_list,temp);
//=======================
//  UNITS
//=======================
var temp ={
        'Maximum_temperature_height_above_ground_6_Hour_Interval':'deg C',
        'Minimum_temperature_height_above_ground_6_Hour_Interval':'deg C',
        'Latent_heat_net_flux_surface_6_Hour_Average':'W/m2',
        'Sensible_heat_net_flux_surface_6_Hour_Average':'W/m2',
        'Precipitation_rate_surface_6_Hour_Average':'mm',
        'u-component_of_wind_height_above_ground':'m/s',
        'v-component_of_wind_height_above_ground':'m/s',
        'Pressure_surface':'Pa',
        'Maximum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':'kg/kg',
        'Minimum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':'kg/kg',
        'Specific_humidity_height_above_ground':'kg kg-1',
        'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':'W/m2',
        'Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':'W/m2',
        'Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average':'W/m2',
        'Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average':'W/m2',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm':'fraction',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_25_cm':'fraction',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_70_cm':'fraction',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_150_cm':'fraction',
        'Potential_Evaporation_Rate_surface_6_Hour_Average':'mm',
        'netRAD':'W/m2',
        'Temperature_height_above_ground':'deg C',
        'Geopotential_height_surface':'gpm'
};
addToDict1(units_metric,temp);
var temp={
	'Maximum_temperature_height_above_ground_6_Hour_Interval':'deg C',
        'Minimum_temperature_height_above_ground_6_Hour_Interval':'deg C',
        'Latent_heat_net_flux_surface_6_Hour_Average':'W/m2',
        'Sensible_heat_net_flux_surface_6_Hour_Average':'W/m2',
        'Precipitation_rate_surface_6_Hour_Average':'in',
        'u-component_of_wind_height_above_ground':'mi/hr',
        'v-component_of_wind_height_above_ground':'mi/hr',
        'Pressure_surface':'Pa',
        'Maximum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':'kg/kg',
        'Minimum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':'kg/kg',
        'Specific_humidity_height_above_ground':'kg/kg',
        'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':'W/m2',
        'Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':'W/m2',
        'Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average':'W/m2',
        'Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average':'W/m2',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm':'fraction',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_25_cm':'fraction',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_70_cm':'fraction',
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_150_cm':'fraction',
        'Potential_Evaporation_Rate_surface_6_Hour_Average':'mm',
        'netRAD':'W/m2',
        'Temperature_height_above_ground':'deg C',
        'Geopotential_height_surface':'gpm'
};
addToDict1(units_english,temp);

var temp = {
    'CFSV2':'Maximum_temperature_height_above_ground_6_Hour_Interval'
}
addToDict1(default_variable,temp);

//==========================
// THRESHOLD_COLORS
//==========================
var temp = {
    'Maximum_temperature_height_above_ground_6_Hour_Interval':['red', 'blue'],
    'Minimum_temperature_height_above_ground_6_Hour_Interval':['red', 'blue'],
    'Latent_heat_net_flux_surface_6_Hour_Average':['blue', 'red'],
    'Sensible_heat_net_flux_surface_6_Hour_Average':['blue', 'red'],
    'Precipitation_rate_surface_6_Hour_Average':['blue', 'red'],
    'u-component_of_wind_height_above_ground':['blue', 'red'],
    'v-component_of_wind_height_above_ground':['blue', 'red'],
    'Pressure_surface':['red', 'blue'],
    'Maximum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':['red', 'blue'],
    'Minimum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':['red', 'blue'],
    'Specific_humidity_height_above_ground':['red', 'blue'],
    'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':['red', 'blue'],
    'Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':['red', 'blue'],
    'Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average':['red', 'blue'],
    'Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average':['red', 'blue'],
    'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm':['blue', 'red'],
    'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_25_cm':['blue', 'red'],
    'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_70_cm':['blue', 'red'],
    'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_150_cm':['blue', 'red'],
    'Potential_Evaporation_Rate_surface_6_Hour_Average':['red', 'blue'],
    'Geopotential_height_surface':['red', 'blue'],
    'Temperature_height_above_ground':['blue', 'red'],
    'netRAD':['red', 'blue']
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
        'Maximum_temperature_height_above_ground_6_Hour_Interval':
                {'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-5,'max':35},'english':{'min':20,'max':100}},
                'clim':{'metric':{'min':-5,'max':35},'english':{'min':20,'max':100}}},
        'Minimum_temperature_height_above_ground_6_Hour_Interval':
                {'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}},
                'clim':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}}},
        'Temperature_height_above_ground':
                {'anom':{'metric':{'min':-5,'max':5},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}},
                'clim':{'metric':{'min':-20,'max':25},'english':{'min':0,'max':80}}},
        'Latent_heat_net_flux_surface_6_Hour_Average':
                {'anom':{'metric':{'min':-10,'max':10},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':0,'max':140},'english':{'min':0,'max':140}},
                'clim':{'metric':{'min':0,'max':140},'english':{'min':0,'max':140}}},
        'Sensible_heat_net_flux_surface_6_Hour_Average':
                {'anom':{'metric':{'min':-10,'max':10},'english':{'min':-10,'max':10}},
                'value':{'metric':{'min':-40,'max':120},'english':{'min':-40,'max':120}},
                'clim':{'metric':{'min':-40,'max':120},'english':{'min':40,'max':120}}},
        'Precipitation_rate_surface_6_Hour_Average':
                {'anom':{'metric':{'min':-100*numMonths,'max':100*numMonths},'english':{'min':-4*numMonths,'max':4*numMonths}},
                'value':{'metric':{'min':0,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
                'clim':{'metric':{'min':0,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
                'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
                'anompercentof':{'metric':{'min':0,'max':800},'english':{'min':0,'max':800}}},
	'Potential_Evaporation_Rate_surface_6_Hour_Average':
		{'anom':{'metric':{'min':-25*numMonths,'max':25*numMonths},'english':{'min':-1*numMonths,'max':1*numMonths}},
                'value':{'metric':{'min':0,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
                'clim':{'metric':{'min':0,'max':200*numMonths},'english':{'min':0,'max':8*numMonths}},
                'anompercentchange':{'metric':{'min':-100,'max':100},'english':{'min':-100,'max':100}},
                'zscore':{'metric':{'min':-4,'max':4},'english':{'min':-4,'max':4}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}}},
        'u-component_of_wind_height_above_ground':
                {'anom':{'metric':{'min':-2.5,'max':2.5},'english':{'min':-5,'max':5}},
                'value':{'metric':{'min':-8,'max':8},'english':{'min':-10,'max':10}},
                'clim':{'metric':{'min':-8,'max':8},'english':{'min':-10,'max':10}}},
        'v-component_of_wind_height_above_ground':
                {'anom':{'metric':{'min':-2.5,'max':2.5},'english':{'min':-5,'max':5}},
                'value':{'metric':{'min':-8,'max':8},'english':{'min':-10,'max':10}},
                'clim':{'metric':{'min':-8,'max':8},'english':{'min':-10,'max':10}}},
        'Pressure_surface':{'anom':{'metric':{'min':-2.5,'max':2.5},'english':{'min':-5,'max':5}},
                'value':{'metric':{'min':-8,'max':8},'english':{'min':-10,'max':10}},
                'clim':{'metric':{'min':-8,'max':8},'english':{'min':-10,'max':10}}},
        'Maximum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':
                {'anom':{'metric':{'min':-.001,'max':0.001},'english':{'min':-0.001,'max':0.001}},
                'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}},
                'value':{'metric':{'min':0,'max':0.02},'english':{'min':0,'max':0.02}},
                'clim':{'metric':{'min':0,'max':0.02},'english':{'min':0,'max':0.02}}},
        'Minimum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':
                {'anom':{'metric':{'min':-.001,'max':0.001},'english':{'min':-0.001,'max':0.001}},
                'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}},
                'value':{'metric':{'min':0,'max':0.02},'english':{'min':0,'max':0.02}},
                'clim':{'metric':{'min':0,'max':0.02},'english':{'min':0,'max':0.02}}},
        'Specific_humidity_height_above_ground':
                {'anom':{'metric':{'min':-.001,'max':0.001},'english':{'min':-0.001,'max':0.001}},
                'anompercentchange':{'metric':{'min':-30,'max':30},'english':{'min':-30,'max':30}},
                'anompercentof':{'metric':{'min':75,'max':125},'english':{'min':75,'max':125}},
                'value':{'metric':{'min':0,'max':0.02},'english':{'min':0,'max':0.02}},
                'clim':{'metric':{'min':0,'max':0.02},'english':{'min':0,'max':0.02}}},
        'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':
                {'anom':{'metric':{'min':-20,'max':20},'english':{'min':-20,'max':20}},
                'value':{'metric':{'min':50,'max':400},'english':{'min':50,'max':400}},
                'clim':{'metric':{'min':50,'max':400},'english':{'min':50,'max':400}}},
        'Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':
                {'anom':{'metric':{'min':-20,'max':20},'english':{'min':-20,'max':20}},
                'value':{'metric':{'min':0,'max':200},'english':{'min':0,'max':200}},
                'clim':{'metric':{'min':0,'max':200},'english':{'min':0,'max':200}}},
        'Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average':
                {'anom':{'metric':{'min':-20,'max':20},'english':{'min':-20,'max':20}},
                'value':{'metric':{'min':50,'max':400},'english':{'min':50,'max':400}},
                'clim':{'metric':{'min':50,'max':400},'english':{'min':50,'max':400}}},
        'Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average':
                {'anom':{'metric':{'min':-20,'max':20},'english':{'min':-20,'max':20}},
               'value':{'metric':{'min':0,'max':200},'english':{'min':50,'max':400}},
               'clim':{'metric':{'min':0,'max':200},'english':{'min':50,'max':400}}},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm':
                {'anom':{'metric':{'min':0.05,'max':0.05},'english':{'min':-0.05,'max':0.05}},
                'value':{'metric':{'min':0,'max':.4},'english':{'min':0,'max':.4}},
                'clim':{'metric':{'min':0,'max':.4},'english':{'min':0,'max':.4}}},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_25_cm':
                {'anom':{'metric':{'min':0.05,'max':0.05},'english':{'min':-0.05,'max':0.05}},
                'value':{'metric':{'min':0,'max':.4},'english':{'min':0,'max':.4}},
                'clim':{'metric':{'min':0,'max':.4},'english':{'min':0,'max':.4}}},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_70_cm':
                {'anom':{'metric':{'min':0.05,'max':0.05},'english':{'min':-0.05,'max':0.05}},
                'value':{'metric':{'min':0,'max':.4},'english':{'min':0,'max':.4}},
                'clim':{'metric':{'min':0,'max':.4},'english':{'min':0,'max':.4}}},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_150_cm':
                {'anom':{'metric':{'min':0.05,'max':0.05},'english':{'min':-0.05,'max':0.05}},
                'value':{'metric':{'min':0,'max':.4},'english':{'min':0,'max':.4}},
                'clim':{'metric':{'min':0,'max':.4},'english':{'min':0,'max':.4}}},
        'netRAD':{'anom':{'metric':{'min':-20,'max':20},'english':{'min':-20,'max':20}},
                'value':{'metric':{'min':50,'max':400},'english':{'min':50,'max':400}},
                'clim':{'metric':{'min':50,'max':400},'english':{'min':50,'max':400}}},
        'Geopotential_height_surface':{'anom':{'metric':{'min':-300,'max':300},'english':{'min':-300,'max':300}},
                'value':{'metric':{'min':50,'max':400},'english':{'min':100,'max':3000}},
                'clim':{'metric':{'min':50,'max':400},'english':{'min':100,'max':3000}}}
}
$.extend(colorbarMinMax_list1,temp);
//==========================
// COLORBAR MAP
//==========================
var temp={
        'Maximum_temperature_height_above_ground_6_Hour_Interval':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd'},
        'Minimum_temperature_height_above_ground_6_Hour_Interval':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd'},
        'Temperature_height_above_ground':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd'},
        'Latent_heat_net_flux_surface_6_Hour_Average':{'anom':'RdYlBu','value':'RdYlBu','clim':'RdYlBu'},
        'Sensible_heat_net_flux_surface_6_Hour_Average':{'anom':'BuYlRd','value':'BuYlRd','clim':'BuYlRd'},
        'Precipitation_rate_surface_6_Hour_Average':{'anom':'BrBG','value':'YlGnBu','clim':'YlGnBu','anompercentchange':'BrBG','anompercentof':'BrBG'},
        'u-component_of_wind_height_above_ground':{'anom':'BuYlRd','value':'YlGnBu','clim':'YlGnBu'},
        'v-component_of_wind_height_above_ground':{'anom':'BuYlRd','value':'YlGnBu','clim':'YlGnBu'},
        'Pressure_surface':{'anom':'BuYlRd','value':'YlGnBu','clim':'YlGnBu'},
        'Maximum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','anompercentchange':'BuYlRd','anompercentof':'BuYlRd'},
        'Minimum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','anompercentchange':'BuYlRd','anompercentof':'BuYlRd'},
        'Specific_humidity_height_above_ground':{'anom':'BuYlRd','value':'BuRd','clim':'BuRd','anompercentchange':'BuYlRd','anompercentof':'BuYlRd'},
        'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':{'anom':'BuYlRd','value':'YlOrRd','clim':'YlOrRd'},
        'Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':{'anom':'BuYlRd','value':'YlOrRd','clim':'YlOrRd'},
        'Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average':{'anom':'BuYlRd','value':'YlOrRd','clim':'YlOrRd'},
        'Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average':{'anom':'BuYlRd','value':'YlOrRd','clim':'YlOrRd'},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm':{'anom':'RdBu','value':'RdBu','clim':'RdBu'},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_25_cm':{'anom':'RdBu','value':'RdBu','clim':'RdBu'},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_70_cm':{'anom':'RdBu','value':'RdBu','clim':'RdBu'},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_150_cm':{'anom':'RdBu','value':'RdBu','clim':'RdBu'},
        'Potential_Evaporation_Rate_surface_6_Hour_Average':{'anom':'BuBG','value':'BuRd','clim':'BuRd','anompercentchange':'GBBr','anompercentof':'GBBr'},
        'netRAD':{'anom':'BuYlRd','value':'YlOrRd','clim':'YlOrRd'},
        'Geopotential_height_surface':{'anom':'BuYlRd','value':'YlOrRd','clim':'YlOrRd'}
}
$.extend(colorbarMap_list1,temp);


//==========================
// COLORBAR SIZE
//==========================
 var temp={
        'Maximum_temperature_height_above_ground_6_Hour_Interval':{'anom':8,'value':8,'clim':8},
        'Minimum_temperature_height_above_ground_6_Hour_Interval':{'anom':8,'value':8,'clim':8},
        'Temperature_height_above_ground':{'anom':8,'value':8,'clim':8},
        'Latent_heat_net_flux_surface_6_Hour_Average':{'anom':8,'value':8,'clim':8},
        'Sensible_heat_net_flux_surface_6_Hour_Average':{'anom':8,'value':8,'clim':8},
        'Precipitation_rate_surface_6_Hour_Average':{'anom':9,'value':8,'clim':8,'anompercentchange':9,'anompercentof':9},
        'u-component_of_wind_height_above_ground':{'anom':8,'value':8,'clim':8},
        'v-component_of_wind_height_above_ground':{'anom':8,'value':8,'clim':8},
        'Pressure_surface': {'anom':8,'value':8,'clim':8},
        'Maximum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval': {'anom':9,'value':8,'clim':8},
        'Minimum_specific_humidity_at_2m_height_above_ground_6_Hour_Interval': {'anom':9,'value':8,'clim':8},
        'Specific_humidity_height_above_ground': {'anom':8,'value':8,'clim':8,'anompercentchange':8,'anompercentof':8},
        'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average':{'anom':8,'value':7,'clim':7},
        'Upward_Short-Wave_Radiation_Flux_surface_6_Hour_Average': {'anom':8,'value':7,'clim':7},
        'Downward_Long-Wave_Radp_Flux_surface_6_Hour_Average':{'anom':8,'value':7,'clim':7},
        'Upward_Long-Wave_Radp_Flux_surface_6_Hour_Average':{'anom':8,'value':7,'clim':7},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm':{'anom':8,'value':7,'clim':7},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_25_cm':{'anom':8,'value':7,'clim':7},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_70_cm':{'anom':8,'value':7,'clim':7},
        'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_150_cm':{'anom':8,'value':7,'clim':7},
        'Potential_Evaporation_Rate_surface_6_Hour_Average':{'anom':9,'value':8,'clim':8,'anompercentchange':9,'anompercentof':9},
        'netRAD':{'anom':8,'value':7,'clim':7},
        'Geopotential_height_surface':{'anom':8,'value':7,'clim':7}
}
$.extend(colorbarSize_list1,temp);
