#============================
#    formFEWSNETLayers
#============================
formPGLayers=[
    ('custommaplayer','Map Layer'),
    ('zumwalt','Zumwalt Prairie: Nature Conservancy '),
    ('zumwaltforage','Zumwalt Prairie: Landowner Forage Pastures'),
    ('counties','US Counties'),
]

formFusionTableChoicesPG=[
    ('','Choose a region type!'),
    ('zumwalt','Zumwalt Prairie: Nature Conservancy '),
    ('zumwaltforage','Zumwalt Prairie: Landowner Forage Pastures'),
    ('polygon','Custom Polygon'),
    #('custom','Fusion Table')
]
formCHIRPSChoicesFEWSNET=[
    ('CHIRPS-precipitation-Total-value','CHIRPS Precipitation Total'),
    ('CHIRPS-precipitation-Total-anom','CHIRPS Precipitation Anomaly'),
]
formMODISChoicesFEWSNET=[
    ('M-NDVI-Max-value','MODIS NDVI Max'),
    ('M-NDVI-Mean-value','MODIS NDVI Mean'),
    ('M-NDVI-Max-anom','MODIS NDVI Max,Anomaly'),
    ('M-NDVI-Mean-anom','MODIS NDVI Mean,Anomaly'),
    ('M-NDVI-Mean-anompercentof','MODIS NDVI Mean,Percent of Average')
]

formLandsatChoicesFEWSNET=[
    ('L_TOA-NDVI-Max-value','Landsat 4/5/7/8 Top of Atmosphere NDVI Max'),
    ('L_TOA-NDVI-Mean-value','Landsat 4/5/7/8 Top of Atmosphere NDVI Mean'),
    ('L_TOA-NDVI-Mean-anom','Landsat 4/5/7/8 Top of Atmosphere NDVI Mean,Anomaly'),
    ('L_TOA-NDVI-Mean-anompercentof','Landsat 4/5/7/8 Top of Atmosphere NDVI Mean,Percent of Average')
]

'''
formLandsatChoicesFEWSNET=[
    ('L_SR-NDVI-Max-value','Landsat 4/5/7/8 Surface Reflectance NDVI Max'),
    ('L_SR-NDVI-Mean-value','Landsat 4/5/7/8 Surface Reflectance NDVI Mean'),
    #('L_SR-NDVI-Max-anom','Landsat 4/5/7/8 Surface Reflectance NDVI Max,Anomaly'),
    ('L_SR-NDVI-Mean-anompercentof','Landsat 4/5/7/8 Surface Reflectance NDVI Mean,Percent of Average')
]
'''

#============================
#   formSubDomainTypeTS
#============================
formSubDomainTypeTS=[
    ('points','Point Locations'),
    ('customShapes','Pasture Areas'),
]



