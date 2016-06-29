#============================
#    formFEWSNETLayers
#============================
formFEWSNETLayers=[
    ('custommaplayer','Map Layer'),
    ('countryoverlayer','Admin 0 (Countries)'),
    ('admin1overlayer','Admin 1'),
    ('admin2overlayer','Admin 2'),
    ('livelihoodoverlayer','Livelihood Zones'),
    ('cropzoneoverlayer','Crop Zones')
]

formFusionTableChoicesFEWSNET=[
    ('','Choose a region type!'),
    ('fewsadmin1overlayer','Administration 1 Zones'),
    ('fewsadmin2overlayer','Administration 2 Zones'),
    ('fewslivelihoodzoneoverlayer','Livelihood Zones'),
    ('fewscropzoneoverlayer','Crop Zones'),
    ('polygon','Custom Polygon'),
    ('custom','Fusion Table')
]
formCHIRPSChoicesFEWSNET=[
    ('CHIRPS-precipitation-Total-value','CHIRPS Precipitation Total'),
    ('CHIRPS-precipitation-Total-anom','CHIRPS Precipitation Anomaly'),
    ('CHIRPS-precipitation-Total-anompercentof','CHIRPS Precipitation % of Average'),
    ('CHIRPS-precipitation-Total-anompercentchange','CHIRPS Precipitation % Difference from Average')
    #('CHIRPS-precipitation-Total-zscore','CHIRPS Precipitation Z-score (SPI)'),
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

