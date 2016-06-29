#############################################
##       APPLICATION DEFAULTS  		   ##
#############################################
import templatevariables
def get_applicationDefaults(self, applicationName):
    if applicationName=='fewsNet':
       CHIRPSvariable_default  = 'CHIRPS-precipitation-Total'
    elif applicationName=='precisionGrazing':
       CHIRPSvariable_default  = 'L_TOA-NDVI-Max-value'
    elif applicationName=='gddTool':
       CHIRPSvariable_default  = 'G-precipitation-Total'
    else:
       CHIRPSvariable_default   = ''

    if applicationName == 'climateEngineExpert':
        timeSeriesCalc_default  = 'days'
        subDomainTypeTS_default = 'points'
        ftChoice1_default       = 'states'
        variable_default        = 'pr'
        productType_default     = 'MET'
        product_default         = 'G'
        statistic_default       = 'Total'
        calculation_default     = 'value'
        units_default           = 'metric'
        varUnits_default        = 'mm'
        colorbar_default        = 'GnBu'
        colorbarMin_default     = 0
        colorbarMax_default     = 400
        colorbarSize_default    = '8'
        colorbarTicks_default	= '0,5,24,50,70,90,110,130,150,200,400,800'
        timeperiod_default      = 'last60days'
        timeperiod_days         = 60
        scale_default           = '4000'
        mapCenterLongLat_default= '-112,42'
        pointLat_default        = '42'
        pointLon_default        = '-112'
        mapCenterLongLat        = templatevariables.get_variable(
            self, 'mapCenterLongLat', mapCenterLongLat_default)
        mapzoom_default         = '5'
        opacity_default         = str(14*0.05)
        NELat_default           = 45
        NELong_default          = -95
        SWLat_default           = 40
        SWLong_default          = -111
        minYear_default         = '1979'
        minDate_default         = '1979-01-01'
        runningMeanYears_default= '5'
        runningMeanDays_default = '9'
        basemap_default         = 'hybrid'

    if applicationName == 'nevadaet':
        timeSeriesCalc_default  = 'days'
        subDomainTypeTS_default = 'points'
        ftChoice1_default       = 'states'
        variable_default        = 'pr'
        productType_default     = 'MET'
        product_default         = 'G'
        statistic_default       = 'Total'
        calculation_default     = 'value'
        units_default           = 'metric'
        varUnits_default        = 'mm'
        colorbar_default        = 'GnBu'
        colorbarMin_default     = 0
        colorbarMax_default     = 400
        colorbarSize_default    = '8'
        colorbarTicks_default	= '0,5,24,50,70,90,110,130,150,200,400,800'
        timeperiod_default      = 'last60days'
        timeperiod_days         = 60
        scale_default           = '4000'
        mapCenterLongLat_default= '-113,39'
        pointLat_default        = '39'
        pointLon_default        = '-113'
        mapCenterLongLat        = templatevariables.get_variable(
            self, 'mapCenterLongLat', mapCenterLongLat_default)
        mapzoom_default         = '7'
        opacity_default         = str(14*0.05)
        NELat_default           = 45
        NELong_default          = -95
        SWLat_default           = 40
        SWLong_default          = -111
        minYear_default         = '1979'
        minDate_default         = '1979-01-01'
        runningMeanYears_default= '5'
        runningMeanDays_default = '9'
        basemap_default         = 'hybrid'

    elif applicationName == 'fewsNet':
        timeSeriesCalc_default  = 'interannual'
        subDomainTypeTS_default = 'customShapes'
        ftChoice1_default       = 'fewscropzoneoverlayer',
        variable_default        = 'precipitation'
        productType_default     = 'MET'
        product_default         = 'CHIRPS'
        statistic_default       = 'Total'
        calculation_default     = 'value'
        units_default           = 'metric'
        varUnits_default        = 'mm'
        colorbar_default        = 'GnBu'
        colorbarMin_default     = 0
        colorbarMax_default     = 400
        colorbarSize_default    = '8'
        colorbarTicks_default	= '0,10,25,50,75,90,110,125,150,175,200,250'
        timeperiod_default      = 'last90days'  # if modify this, also modify tempstart below
        timeperiod_days         = 90
        scale_default           = '4800'
        mapCenterLongLat_default= '17.5,0.0'  # Africa
        pointLat_default        = '0.0'
        pointLon_default        = '17.5'
        mapCenterLongLat        = templatevariables.get_variable(
            self, 'mapCenterLongLat', mapCenterLongLat_default)
        mapzoom_default         = '4'
        opacity_default         = str(14*0.05)
        NELat_default           =  45
        NELong_default          = -95
        SWLat_default           = 40
        SWLong_default          = -111
        minYear_default         = '1981'
        minDate_default         = '1981-01-01'
        runningMeanYears_default= '5'
        runningMeanDays_default = '9'
        basemap_default         = 'lightPoliticalStyle'
    elif applicationName == 'lakeMead':
        timeSeriesCalc_default  = 'days'
        subDomainTypeTS_default = 'points'
        ftChoice1_default       = 'states'
        variable_default        = 'pr'
        productType_default     = 'MET'
        product_default         = 'G'
        statistic_default       = 'Total'
        calculation_default     = 'value'
        units_default           = 'metric'
        varUnits_default        = 'mm'
        colorbar_default        = 'GnBu'
        colorbarMin_default     = 0
        colorbarMax_default     = 400
        colorbarSize_default    = '8'
        colorbarTicks_default	= '0,5,24,50,70,90,110,130,150,200,400,800'
        timeperiod_default      = 'last60days'
        timeperiod_days         = 60
        scale_default           = '4000'
        mapCenterLongLat_default= '-114.4410,36.3'
        pointLat_default        = '36.3'
        pointLon_default        = '-114.4410'
        mapCenterLongLat        = templatevariables.get_variable(
            self, 'mapCenterLongLat', mapCenterLongLat_default)
        mapzoom_default         = '10'
        opacity_default         = str(14*0.05)
        NELat_default           =  36.5
        NELong_default          = -114
        SWLat_default           = 25.5
        SWLong_default          = -115
        minYear_default         = '1979'
        minDate_default         = '1979-01-01'
        runningMeanYears_default= ' 5'
        runningMeanDays_default =  '9'
        basemap_default         = 'hybrid'
    elif applicationName == 'precisionGrazing':
        timeSeriesCalc_default  = 'interannual'
        subDomainTypeTS_default = 'customShapes'
        ftChoice1_default       = 'fewscropzoneoverlayer',
        variable_default        = 'NDVI'
        productType_default     = 'RS'
        product_default         = 'L_TOA'
        statistic_default       = 'Max'
        calculation_default     = 'value'
        units_default           = 'metric'
        varUnits_default        = ''
        colorbar_default        = 'YlGn'
        colorbarMin_default     = -0.1 
        colorbarMax_default     = .9 
        colorbarSize_default    = '8'
        colorbarTicks_default   = '0,10,25,50,75,90,110,125,150,175,200,250'
        timeperiod_default      = 'last90days'  # if modify this, also modify tempstart below
        timeperiod_days         = 90
        scale_default           = '4800'
        mapCenterLongLat_default= '-116.9436,45.5604'
        pointLat_default        = '45.5604'
        pointLon_default        = '-116.9436'
        mapCenterLongLat        = templatevariables.get_variable(
            self, 'mapCenterLongLat', mapCenterLongLat_default)
        mapzoom_default         = '11'
        opacity_default         = str(14*0.05)
        NELat_default           =  47
        NELong_default          = -115
        SWLat_default           = 44
        SWLong_default          = -117
        minYear_default         = '1981'
        minDate_default         = '1981-01-01'
        runningMeanYears_default= '5'
        runningMeanDays_default = '9'
        basemap_default         = 'hybrid'
    elif applicationName == 'gddTool':
        timeSeriesCalc_default  = 'interannual'
        subDomainTypeTS_default = 'points'
        ftChoice1_default       = '',
        variable_default        = 'pr'
        productType_default     = 'MET'
        product_default         = 'G'
        statistic_default       = 'Total'
        calculation_default     = 'value'
        units_default           = 'metric'
        varUnits_default        = 'mm'
        colorbar_default        = 'GnBu'
        colorbarMin_default     = 0
        colorbarMax_default     = 400
        colorbarSize_default    = '8'
        colorbarTicks_default   = '0,10,25,50,75,90,110,125,150,175,200,250'
        timeperiod_default      = 'last90days'  # if modify this, also modify tempstart below
        timeperiod_days         = 90
        scale_default           = '4000'
        mapCenterLongLat_default= '-112,42' 
        pointLat_default        = '42.0'
        pointLon_default        = '-112'
        mapCenterLongLat        = templatevariables.get_variable(
            self, 'mapCenterLongLat', mapCenterLongLat_default)
        mapzoom_default         = '4'
        opacity_default         = str(14*0.05)
        NELat_default           =  45
        NELong_default          = -95
        SWLat_default           = 40
        SWLong_default          = -111
        minYear_default         = '1981'
        minDate_default         = '1981-01-01'
        runningMeanYears_default= '5'
        runningMeanDays_default = '9'
        basemap_default         = 'hybrid'

    return timeSeriesCalc_default,subDomainTypeTS_default,ftChoice1_default,variable_default,productType_default,product_default,statistic_default,calculation_default,units_default,varUnits_default,colorbar_default,colorbarMin_default,colorbarMax_default,colorbarSize_default,colorbarTicks_default,timeperiod_default,timeperiod_days,scale_default,mapCenterLongLat_default,pointLat_default ,pointLon_default,mapCenterLongLat,mapzoom_default,opacity_default,NELat_default,NELong_default,SWLat_default,SWLong_default,minYear_default,minDate_default,runningMeanYears_default,runningMeanDays_default,basemap_default,CHIRPSvariable_default 
