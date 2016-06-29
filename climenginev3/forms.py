#############################################
##       CURRENT FORMS BEING USED IN HTML  ##
#############################################
#we really should have a global variables like these somewhere that is the start date for each of the products... rather
#than hard coding things like this

import datetime

#============================
#    formMask
#============================
formMask=[
    ('none','No Mask: Show All Values'),
    ('above','Show Values Below Max'),
    ('below','Show Values Above Min'),
    ('exterior','Show Exterior Values'),
    ('interior','Show Interior Values'),
]

#============================
#    formProductType
#============================
formProductType=[
    ('RS','Remote Sensing'),
    ('MET','Historical Meteorology'),
    #('CLIMATE','Climate'),
]

#============================
#    formSeasons
#============================
formSeasons=[
    ('wy','Northern Water Year (Oct - Sept)'),
    ('wy-S','Southern Water Year (Apr - Mar)'),
    ('gs','Northern Growing Season (Apr - Oct)'),
    ('gs-S','Southern Growing Season (Nov - Mar)'),
    ('ANN','Standard Year (Jan-Dec)'),
    ('DJF','DJF (Dec-Feb)'),
    ('MAM','MAM (Mar-May)'),
    ('JJA','JJA (Jun-Aug)'),
    ('SON','SON (Sept-Nov)'),
    ('Jan','January'),
    ('Feb','February'),
    ('Mar','March'),
    ('Apr','April'),
    ('May','May'),
    ('Jun','June'),
    ('Jul','July'),
    ('Aug','August'),
    ('Sept','September'),
    ('Oct','October'),
    ('Nov','November'),
    ('Dec','December'),
    ('custom','Custom'),
]

#============================
#    formTimePeriods
#Last 15 days, Last 30 days, Last 60 days,Winter, Spring, Summer, Fall, Custom.
#============================
formTimePeriods=[
    ('all','Entire Period of Record of Dataset'),
    ('custom','Custom'),
    ('last15days','Last 15 Days of Data'),
    ('last30days','Last 30 Days of Data'),
    ('last60days','Last 60 Days of Data'),
    ('last90days','Last 90 Days of Data'),
    ('lastDJF','Last DJF (Dec-Feb)'),
    ('lastMAM','Last MAM (Mar-May)'),
    ('lastJJA','Last JJA (Jun-Aug)'),
    ('lastSON','Last SON (Sept-Nov)'),
    ('lastANN','Last Year'),
    ('lastWY','Last Northern Water Year (Oct - Sept)'),
    ('lastWY-S','Last Southern Water Year (Apr - Mar)'),
    ('lastGS','Last Northern Growing Season (Apr - Oct)'),
    ('lastGS-S','Last Southern Growing Season (Nov - Mar)'),
    ('nwy-todate','Northern Water Year To Date'),
    ('swy-todate','Southern Water Year To Date'),
    ('cy-todate','Calendar Year Year To Date'),
]

#============================
#   formVariable2Display
#===========================
formVariable2Display = [
    ('none','One Variable Analysis'),
    ('two','Two Variable Analysis'),
]
#============================
#   formBoolean
#===========================
formBoolean = [
    ('T','Yes'),
    ('F','No'),
]

#============================
#    formChartType
#============================
formChartType=[
    ('scatter','Scatter Plot'),
    ('line','Line Plot'),
    ('spline','Spline Plot'),
    ('column','Bar Chart'),
    #('areaspline','Transparent Area Plot '), #not transparent for some reason?
    ('area','Stacked Area Plot '),
]

#============================
#    formHighChartLayers
#============================
formHighChartLayers=[
    ('average','Average'),
    #('range','Range: Min to Max'),
    ('runmean','Running Mean'),
]

#============================
#    formHighChartLayersDay
#============================
formHighChartLayersIntraannual=[
    ('climatology','50% Percentile'),
    ('percentile_5','5%-95% Percentile Range'),
    ('percentile_10','10%-90% Percentile Range'),
    ('percentile_25','25%-75% Percentile Range'),
]

#============================
#    formColorbarType
#============================
formColorbarType=[
    ('continuous','Continuous'),
    ('discrete','Discrete')
]

#============================
#    formAnalysisOptions
#============================
#formAnalysisOptions=[
#    ('interannual','Intra-Annual Variability (Within a Single Year)'),
#    ('intraannual','Inter-Annual Variability (Between Years)'),
#]


#============================
#    formLayers
#============================
formLayers=[
    ('custommaplayer','Map Layer'),
    ('states','US States'),
    ('counties','US Counties'),
    #('hucoverlayer','US HUC 8'),  //can't get this in fusion tables because it's too big
    ('divisions','US Climate Div.'),
    ('psas','US PSAs'),
    ('kmloverlayer','URL for .KML/.KMZ'),
    ('kmloverlayer2','URL for .KML/.KMZ'),
    #('combined_nvphreats' 'phreats')
]

#============================
#    formTimeSeriesCalc
#============================
formTimeSeriesCalc=[
    ('days','Raw Data over Time Period'),
    ('interannual','Yearly Summaries of Values Over a Season'),
    ('intraannual','Raw Values Within a Year Compared to Other Years'),
]

#============================
#    formDownloadMapFormat
#============================
formDownloadMapFormat=[
    ('tif','GEO TIFF'),
]

#============================
#    formDownloadProjection
#============================
formDownloadProjection=[
    ('EPSG:4326','WGS84 for Google Earth'),
    ('EPSG:3857','Mercator for Google Maps'),
]


#============================
#   formSubDomainTypeTS
#============================
formSubDomainTypeTS=[
    ('points','Points'),
    ('customShapes','Area Averages'),
]

formFusionTableChoices=[
    ('states','States'),
    ('counties','Counties'),
    ('divisions','Climate Divisions'),
    ('psas','Predictive Service Areas (PSAs)'),
    ('polygon','Polygon'),
    ('custom','Fusion Table'),
    #('phreats','combined_nvphreats')
]
#============================
#   formDownloadRegion
#============================
formDownloadRegion=[
    ('noRegion','No Region Selected'),
    ('showRect','Rectangular Region'),
    #('showFusionTable','Custom Region'),  #hasn't been working.. so disabled
]
#============================
#    formMonth
#============================
formMonth=[
    ('1','Jan '),
    ('2','Feb '),
    ('3','Mar '),
    ('4','Apr '),
    ('5','May '),
    ('6','Jun '),
    ('7','Jul '),
    ('8','Aug '),
    ('9','Sept '),
    ('10','Oct '),
    ('11','Nov '),
    ('12','Dec '),
]

#============================
#    formDay   -technically this is a problem.... not all days have 31 days... should restrict with listener on month selected
#============================
formDay=[(str(x),str(x)) for x in range(1,32,1)]

#============================
#    formLocation
#============================
#formLocation=[
#    ('getMap','Get Map'),
#    ('downloadRectangleSubset','Rectangle Subset'),
#    ('downloadFusionTableSubset','Fusion Table Subset'),
#    ('getTimeSeriesOverDateRange','Points'),
#    ('showSingleValueOnMap','Single Map Point'),
#]

#============================
#    formOpacity
#============================
formOpacity=[(str(x*0.05),str((1.0-x*0.05)*100)+'%') for x in range(20,-1,-1)]

#============================
#    formUnits
#============================
formUnits=[
    ('metric','Metric (ie. C,mm,m/s,W/m2)'),
    ('english','English (ie. F,in,mi/hr)'),
]

#============================
#    formPaletteMap
#============================
formPaletteSeqMap=[
    ('Greens','Greens'),
    ('Blues','Blues'),
    ('invBlues','invBlues'),
    ('Oranges','Oranges'),
    ('Reds','Reds'),
    ('YlGn','Yellow-Green'),
    ('GnBu','Green-Blue'),
    ('BuGn','Blue-Green'),
    ('PuBuGn','Purple-Blue-Green'),
    ('PuBu','Purple-Blue'),
    ('BuPu','Blue-Purple'),
    ('RdPu','Red-Purple'),
    ('PuRd','Purple-Red'),
    ('OrRd','Orange-Red'),
    ('YlOrRd','Yellow-Orange-Red'),
    ('YlOrBr','Yellow-Orange-Brown'),
    ('YlGnBu','Yellow-Green-Blue'),
    ('PuBuGn','Purple-Blue-Green'),
    ('Purples','Purples'),
    ('Greys','Greys'),
    ('invGreys','invGreys'),
]

formPaletteDivMap=[
    ('RdBu','Red-Blue'),
    ('BuRd','Blue-Red'),
    ('RdYlBu','Red-Yellow-Blue'),
    ('BuYlRd','Blue-Yellow-Red'),
    ('RdYlGn','Red-Yellow-Green'),
    ('PuOr','Purple-Orange'),
    ('BrBG','Brown-Blue-Green'),
    ('GBBr','Green-Blue-Brown'),
    ('PRGn','PR-Green'),
    ('PiYG','Pi-YG'),
    ('RdGy','Red-Grey'),
    ('invRdGy','Grey-Red'),
    ('Spectral','Spectral'),
]
formPaletteCustomMap=[
    #('USDM','USDM White-Red'),  #don't have 11 colors for these.. so deleting these off
    #('invUSDM','USDM Red-White'),
    ('USDMwWet','USDM Blue-White-Red'),
    ('invUSDMwWet','USDM Red-White-Blue'),
]

#============================
#    formPaletteSize -only 3 to 11 colors are defined in the palette
#============================
formPaletteSize=[(str(x),str(x)) for x in range(3,12,1)]

#============================
#    formMapZoom
#============================
formMapZoom=[(str(x),str(x)) for x in range(1,20,1)]
