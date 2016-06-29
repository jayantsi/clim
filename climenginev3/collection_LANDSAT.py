import logging
import ee


#===========================================
#    LANDSAT 4/5/7/8 Daily
#===========================================
def get_landsat_toa_collection(variable, logger=None):
    """Return the merged Landsat 4, 5, 7, & 8 top-of-atmosphere reflectance image collection

    Args:
        variable: string indicating the variable/band to return
            (NDVI, NDSI, NDWI, EVI, or LST)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the input variable
        String of additional notes about the collection
    """
    # This string could/should be built based on the date range or looking at
    #   or looking atthe images in the collection
    if variable != 'NBRT':
        coll_name = (
            'LANDSAT/LT4_L1T_TOA,LANDSAT/LT5_L1T_TOA,' +
            'LANDSAT/LE7_L1T_TOA,LANDSAT/LC8_L1T_TOA')
        coll_desc = (
            'Landsat 4/5/7/8, top-of-atmopshere reflectance daily {0} ' +
            '(cloud mask applied)').format(variable)
        var_desc = variable

        # Apply the ACCA cloud mask before renaming the bands
        l4_coll = ee.ImageCollection('LANDSAT/LT4_L1T_TOA').map(
            landsat_acca_cloud_mask_func)
        l5_coll = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').map(
            landsat_acca_cloud_mask_func)
        l7_coll = ee.ImageCollection('LANDSAT/LE7_L1T_TOA').map(
            landsat_acca_cloud_mask_func)
        l8_coll = ee.ImageCollection('LANDSAT/LC8_L1T_TOA').map(
            landsat_acca_cloud_mask_func)

        # Rename bands to common band names
        l4_coll = ee.ImageCollection(l4_coll.map(landsat45_toa_band_func))
        l5_coll = ee.ImageCollection(l5_coll.map(landsat45_toa_band_func))
        l7_coll = ee.ImageCollection(l7_coll.map(landsat7_toa_band_func))
        l8_coll = ee.ImageCollection(l8_coll.map(landsat8_toa_band_func))

    elif variable == 'NBRT':
        coll_name = (
            'LANDSAT/LT4_L1T_8DAY_NBRT,LANDSAT/LT5_L1T_8DAY_NBRT,' +
            'LANDSAT/LE7_L1T_8DAY_NBRT,LANDSAT/LC8_L1T_8DAY_NBRT')
        coll_desc = 'Landsat 4/5/7/8, 8-day NBRT Composite'
        var_desc = variable
        l4_coll = ee.ImageCollection('LANDSAT/LT4_L1T_8DAY_NBRT')
        l5_coll = ee.ImageCollection('LANDSAT/LT5_L1T_8DAY_NBRT')
        l7_coll = ee.ImageCollection('LANDSAT/LE7_L1T_8DAY_NBRT')
        l8_coll = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_NBRT')

    # Merge the collections into an empty collection
    collection = ee.ImageCollection([])
    collection = collection.merge(l4_coll)
    collection = collection.merge(l5_coll)
    collection = collection.merge(l7_coll)
    collection = collection.merge(l8_coll)
    collection = ee.ImageCollection(collection)

    if logger:
        ee_call = 'collection.merge()'
        logger.info('EE CALL: ' + ee_call)
        logger.info('Collections merged: ' + coll_name.replace(',', ', '))

    if variable == 'NDVI':
        notes = "NDSI calculated from Norm. Diff. of Near-IR and Red bands"
        collection = collection.map(landsat_ndvi_func)
    elif variable == 'NDSI':
        notes = "NDSI calculated from Norm. Diff. of Green and mid-IR bands"
        collection = collection.map(landsat_ndsi_func)
    elif variable == 'NDWI':
        notes = "NDWI calculated from Norm. Diff. of near-IR and mid-IR bands"
        collection = collection.map(landsat_ndwi_func)
    elif variable == 'EVI':
        notes = "EVI calculated from Near-IR, Red and Blue bands"
        collection = collection.map(landsat_evi_func)
    elif variable == 'NBRT':
        notes = "NBRT calculated from Near-IR, mid-IR and Thermal bands"
        collection = collection.select(variable)
    elif variable == 'LST':
        notes = "LST is currently a 'brightness' temperature and is not adjusted for emissivity"
        collection = collection.map(landsat_lst_func)
    elif variable == 'TrueColor':
        notes = "True Color"
        collection = collection.map(landsat_true_color_func)
    elif variable == 'FalseColor':
        notes = "False Color"
        collection = collection.map(landsat_false_color_func)
    elif variable == 'Blue':
        notes = "Blue band"
        collection = collection.select(['blue'], ['Blue'])
    elif variable == 'Green':
        notes = "Green band"
        collection = collection.select(['green'], ['Green'])
    else:
        notes = ''
    # collection = ee.ImageCollection(collection)
    # scale = 30  # 30m resolution

    return collection, coll_name, coll_desc, var_desc, notes

def get_landsat_sr_collection(variable, logger=None):
    """Return the merged Landsat 4, 5, 7, & 8 at-surface reflectance image collection

    Args:
        variable: string indicating the variable/band to return
            (NDVI, NDSI, NDWI or EVI)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the input variable
        String of additional notes about the collection
    """
    # This string could/should be built based on the date range or looking at
    #   or looking atthe images in the collection
    coll_name = 'LANDSAT/LT4_SR,LANDSAT/LT5_SR,LANDSAT/LE7_SR,LANDSAT/LC8_SR'
    coll_desc = ('Landsat 4/5/7/8, at-surface reflectance daily {0} ' +
                 '(Fmask cloud mask applied)'.format(variable))
    var_desc = variable

    # Apply the Fmask cloud mask before renaming the bands
    l4_coll = ee.ImageCollection('LANDSAT/LT4_SR').map(
        landsat_fmask_cloud_mask_func)
    l5_coll = ee.ImageCollection('LANDSAT/LT5_SR').map(
        landsat_fmask_cloud_mask_func)
    l7_coll = ee.ImageCollection('LANDSAT/LE7_SR').map(
        landsat_fmask_cloud_mask_func)
    l8_coll = ee.ImageCollection('LANDSAT/LC8_SR').map(
        landsat_fmask_cloud_mask_func)

    # Rename bands to common band names
    l4_coll = ee.ImageCollection(l4_coll.map(landsat45_sr_band_func))
    l5_coll = ee.ImageCollection(l5_coll.map(landsat45_sr_band_func))
    l7_coll = ee.ImageCollection(l7_coll.map(landsat7_sr_band_func))
    l8_coll = ee.ImageCollection(l8_coll.map(landsat8_sr_band_func))

    # Merge the collections into an empty collection
    collection = ee.ImageCollection([])
    collection = collection.merge(l4_coll)
    collection = collection.merge(l5_coll)
    collection = collection.merge(l7_coll)
    collection = collection.merge(l8_coll)
    collection = ee.ImageCollection(collection)

    if logger:
        ee_call = 'collection.merge()'
        logger.info('EE CALL: ' + ee_call)
        logger.info('Collections merged: ' + coll_name.replace(',', ', '))

    if variable == 'NDVI':
        notes = "NDSI calculated from Norm. Diff. of Near-IR and Red bands"
        collection = collection.map(landsat_ndvi_func)
    elif variable == 'NDSI':
        notes = "NDSI calculated from Norm. Diff. of Green and mid-IR bands"
        collection = collection.map(landsat_ndsi_func)
    elif variable == 'NDWI':
        notes = "NDWI calculated from Norm. Diff. of near-IR and mid-IR bands"
        collection = collection.map(landsat_ndwi_func)
    elif variable == 'EVI':
        notes = "EVI calculated from Near-IR, Red and Blue bands"
        collection = collection.map(landsat_evi_func)
    elif variable == 'TrueColor':
        notes = "True Color"
        collection = collection.map(landsat_true_color_func)
    elif variable == 'FalseColor':
        notes = "False Color"
        collection = collection.map(landsat_false_color_func)
    elif variable == 'Blue':
        notes = "Blue band"
        collection = collection.select(['blue'], ['Blue'])
    elif variable == 'Green':
        notes = "Green band"
        collection = collection.select(['green'], ['Green'])
    else:
        notes = ''
    # collection = ee.ImageCollection(collection)
    # scale = 30 #30m resolution

    return collection, coll_name, coll_desc, var_desc, notes


#===========================================
#    LANDSAT5 Daily
#===========================================
def get_landsat5_toa_collection(variable, logger=None):
    """Return the Landsat 5 top-of-atmosphere reflectance image collection\

    Args:
        variable: string indicating the variable/band to return
            (NDVI, NDSI, NDWI, EVI, or LST)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the input variable
        String of additional notes about the collection
    """
    coll_name = 'LANDSAT/LT5_L1T_TOA'
    coll_desc = ('Landsat 5, top-of-atmopshere reflectance daily {0} ' +
                 '(ACCA cloud mask applied)').format(variable)
    var_desc = variable
    if variable == 'NBRT':
        coll_name = 'LANDSAT/LT5_L1T_8DAY_NBRT'
        coll_desc = 'Landsat 5, 8-day NBRT Composite'
    if logger:
        ee_call = 'collection =  ee.ImageCollection(' + coll_name + ')'
        logger.info('EE CALL: ' + ee_call)

    # Apply the ACCA cloud mask before renaming the bands
    # Rename bands to common band names
    collection = ee.ImageCollection(coll_name)
    if variable != 'NBRT':
        collection = collection.map(landsat_acca_cloud_mask_func)
        collection = collection.map(landsat45_toa_band_func)

    if variable == 'NDVI':
        notes = "NDSI calculated from Norm. Diff. of Near-IR and Red bands"
        collection = collection.map(landsat_ndvi_func)
    elif variable == 'NDSI':
        notes = "NDSI calculated from Norm. Diff. of Green and mid-IR bands"
        collection = collection.map(landsat_ndsi_func)
    elif variable == 'NDWI':
        notes = "NDWI calculated from Norm. Diff. of near-IR and mid-IR bands"
        collection = collection.map(landsat_ndwi_func)
    elif variable == 'EVI':
        notes = "EVI calculated from Near-IR, Red and Blue bands"
        collection = collection.map(landsat_evi_func)
    elif variable == 'NBRT':
        notes = "NBRT calculated from Near-IR, mid-IR and Thermal bands"
        collection = collection.select(variable)
    elif variable == 'LST':
        notes = "LST is currently a 'brightness' temperature and is not adjusted for emissivity"
        collection = collection.map(landsat_lst_func)
    elif variable == 'TrueColor':
        notes = "True Color"
        collection = collection.map(landsat_true_color_func)
    elif variable == 'FalseColor':
        notes = "False Color"
        collection = collection.map(landsat_false_color_func)
    elif variable == 'Blue':
        notes = "Blue band"
        collection = collection.select(['blue'], ['Blue'])
    elif variable == 'Green':
        notes = "Green band"
        collection = collection.select(['green'], ['Green'])
    else:
        notes = ''
        collection = collection.select(variable)

    return collection, coll_name, coll_desc, var_desc, notes

def get_landsat5_sr_collection(variable, logger=None):
    """Return the Landsat 5 at-surface reflectance image collection\

    Args:
        variable: string indicating the variable/band to return
            (NDVI, NDSI, NDWI, or EVI)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the input variable
        String of additional notes about the collection
    """
    coll_name = 'LANDSAT/LT5_SR'
    coll_desc = ('Landsat 5, at-surface reflectance daily {0} ' +
                 '(Fmask cloud mask applied)').format(variable)
    var_desc = variable
    if logger:
        ee_call = 'collection =  ee.ImageCollection(' + coll_name + ')'
        logger.info('EE CALL: ' + ee_call)

    # Apply the Fmask cloud mask before renaming the bands
    # Rename bands to common band names
    collection = ee.ImageCollection(coll_name)
    collection = collection.map(landsat_fmask_cloud_mask_func)
    collection = collection.map(landsat45_sr_band_func)

    if variable == 'NDVI':
        notes = "NDSI calculated from Norm. Diff. of Near-IR and Red bands"
        collection = collection.map(landsat_ndvi_func)
    elif variable == 'NDSI':
        notes = "NDSI calculated from Norm. Diff. of Green and mid-IR bands"
        collection = collection.map(landsat_ndsi_func)
    elif variable == 'NDWI':
        notes = "NDWI calculated from Norm. Diff. of near-IR and mid-IR bands"
        collection = collection.map(landsat_ndwi_func)
    elif variable == 'EVI':
        notes = "EVI calculated from Near-IR, Red and Blue bands"
        collection = collection.map(landsat_evi_func)
    elif variable == 'TrueColor':
        notes = "True Color"
        collection = collection.map(landsat_true_color_func)
    elif variable == 'FalseColor':
        notes = "False Color"
        collection = collection.map(landsat_false_color_func)
    elif variable == 'Blue':
        notes = "Blue band"
        collection = collection.select(['blue'], ['Blue'])
    elif variable == 'Green':
        notes = "Green band"
        collection = collection.select(['green'], ['Green'])
    else:
        notes = ''
        collection = collection.select(variable)

    return collection, coll_name, coll_desc, var_desc, notes


#===========================================
#    LANDSAT7 Daily
#===========================================
def get_landsat7_toa_collection(variable, logger=None):
    """Return the Landsat 7 top-of-atmosphere reflectance image collection

    Args:
        variable: string indicating the variable/band to return
            (NDVI, NDSI, NDWI, EVI, or LST)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the input variable
        String of additional notes about the collection
    """
    coll_name = 'LANDSAT/LE7_L1T_TOA'
    coll_desc = ('Landsat 7, top-of-atmopshere reflectance daily {0} ' +
                 '(ACCA cloud mask applied)').format(variable)
    var_desc = variable
    if variable == 'NBRT':
        coll_name = 'LANDSAT/LE7_L1T_8DAY_NBRT'
        coll_desc = 'Landsat 7, 8-day NBRT Composite'
    if logger:
        ee_call = 'collection = ee.ImageCollection(' + coll_name + ')'
        logger.info('EE CALL: ' + ee_call)

    #  Apply the ACCA cloud mask before renaming the bands
    #  Rename bands to common band names
    collection = ee.ImageCollection(coll_name)
    if variable != 'NBRT':
        collection = collection.map(landsat_acca_cloud_mask_func)
        collection = collection.map(landsat7_toa_band_func)

    if variable == 'NDVI':
        notes = "NDSI calculated from Norm. Diff. of Near-IR and Red bands"
        collection = collection.map(landsat_ndvi_func)
    elif variable == 'NDSI':
        notes = "NDSI calculated from Norm. Diff. of Green and mid-IR bands"
        collection = collection.map(landsat_ndsi_func)
    elif variable == 'NDWI':
        notes = "NDWI calculated from Norm. Diff. of near-IR and mid-IR bands"
        collection = collection.map(landsat_ndwi_func)
    elif variable == 'NBRT':
        notes = "NBRT calculated from near-IR,mid-IR and thermal bands"
        collection = collection.select(variable)
    elif variable == 'EVI':
        notes = "EVI calculated from Near-IR, Red and Blue bands"
        collection = collection.map(landsat_evi_func)
    elif variable == 'LST':
        notes = "LST is currently a 'brightness' temperature and is not adjusted for emissivity"
        collection = collection.map(landsat_lst_func)
    elif variable == 'TrueColor':
        notes = "True Color"
        collection = collection.map(landsat_true_color_func)
    elif variable == 'FalseColor':
        notes = "False Color"
        collection = collection.map(landsat_false_color_func)
    elif variable == 'Blue':
        notes = "Blue band"
        collection = collection.select(['blue'], ['Blue'])
    elif variable == 'Green':
        notes = "Green band"
        collection = collection.select(['green'], ['Green'])
    else:
        notes = ''
        collection = collection.select(variable)

    return collection, coll_name, coll_desc, var_desc, notes

def get_landsat7_sr_collection(variable, logger=None):
    """Return the Landsat 7 at-surface reflectance image collection

    Args:
        variable: string indicating the variable/band to return
            (NDVI, NDSI, NDWI, or EVI)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the input variable
        String of additional notes about the collection
    """
    coll_name = 'LANDSAT/LE7_SR'
    coll_desc = ('Landsat 7, at-surface reflectance daily {0} ' +
                 '(Fmask cloud mask applied)').format(variable)
    var_desc = variable
    if logger:
        ee_call = 'collection = ee.ImageCollection(' + coll_name + ')'
        logger.info('EE CALL: ' + ee_call)

    # Apply the Fmask cloud mask before renaming the bands
    # Rename bands to common band names
    collection = ee.ImageCollection(coll_name)
    collection = collection.map(landsat_fmask_cloud_mask_func)
    collection = collection.map(landsat7_sr_band_func)

    if variable == 'NDVI':
        notes = "NDSI calculated from Norm. Diff. of Near-IR and Red bands"
        collection = collection.map(landsat_ndvi_func)
    elif variable == 'NDSI':
        notes = "NDSI calculated from Norm. Diff. of Green and mid-IR bands"
        collection = collection.map(landsat_ndsi_func)
    elif variable == 'NDWI':
        notes = "NDWI calculated from Norm. Diff. of near-IR and mid-IR bands"
        collection = collection.map(landsat_ndwi_func)
    elif variable == 'EVI':
        notes = "EVI calculated from Near-IR, Red and Blue bands"
        collection = collection.map(landsat_evi_func)
    elif variable == 'TrueColor':
        notes = "True Color"
        collection = collection.map(landsat_true_color_func)
    elif variable == 'FalseColor':
        notes = "False Color"
        collection = collection.map(landsat_false_color_func)
    elif variable == 'Blue':
        notes = "Blue band"
        collection = collection.select(['blue'], ['Blue'])
    elif variable == 'Green':
        notes = "Green band"
        collection = collection.select(['green'], ['Green'])
    else:
        notes = ''
        collection = collection.select(variable)

    return collection, coll_name, coll_desc, var_desc, notes


#===========================================
#    LANDSAT8 Daily
#===========================================
def get_landsat8_toa_collection(variable, logger=None):
    """Return the Landsat 8 top-of-atmosphere reflectance image collection

    Args:
        variable: string indicating the variable/band to return
            (NDVI, NDSI, NDWI, EVI, or LST)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the input variable
        String of additional notes about the collection
    """
    coll_name = 'LANDSAT/LC8_L1T_TOA'
    coll_desc = ('Landsat 8, top-of-atmopshere reflectance daily {0} ' +
                 '(ACCA cloud mask applied)').format(variable)
    var_desc = variable
    if variable == 'NBRT':
        coll_name = 'LANDSAT/LC8_L1T_8DAY_NBRT'
        coll_desc = 'Landsat 8, 8-day NBRT Composite'
    if logger:
        ee_call = 'collection = ee.ImageCollection(' + coll_name + ')'
        logger.info('EE CALL: ' + ee_call)

    #  Apply the ACCA cloud mask before renaming the bands
    #  Rename bands to common band names
    collection = ee.ImageCollection(coll_name)
    if variable != 'NBRT':
        collection = collection.map(landsat_acca_cloud_mask_func)
        collection = collection.map(landsat8_toa_band_func)

    if variable == 'NDVI':
        notes = "NDSI calculated from Norm. Diff. of Near-IR and Red bands"
        collection = collection.map(landsat_ndvi_func)
    elif variable == 'NDSI':
        notes = "NDSI calculated from Norm. Diff. of Green and mid-IR bands"
        collection = collection.map(landsat_ndsi_func)
    elif variable == 'NDWI':
        notes = "NDWI calculated from Norm. Diff. of near-IR and mid-IR bands"
        collection = collection.map(landsat_ndwi_func)
    elif variable == 'NBRT':
        notes = "NBRT calculated from near-IR,mid-IR and thermal bands"
        collection = collection.select(variable)
    elif variable == 'EVI':
        notes = "EVI calculated from Near-IR, Red and Blue bands"
        collection = collection.map(landsat_evi_func)
    elif variable == 'LST':
        notes = "LST is currently a 'brightness' temperature and is not adjusted for emissivity"
        collection = collection.map(landsat_lst_func)
    elif variable == 'TrueColor':
        notes = "True Color"
        collection = collection.map(landsat_true_color_func)
    elif variable == 'FalseColor':
        notes = "False Color"
        collection = collection.map(landsat_false_color_func)
    elif variable == 'Blue':
        notes = "Blue band"
        collection = collection.select(['blue'], ['Blue'])
    elif variable == 'Green':
        notes = "Green band"
        collection = collection.select(['green'], ['Green'])
    else:
        notes = ''
        collection = collection.select(variable)

    return collection, coll_name, coll_desc, var_desc, notes

def get_landsat8_sr_collection(variable, logger=None):
    """Return the Landsat 8 at-surface reflectance image collection

    Args:
        variable: string indicating the variable/band to return
            (NDVI, NDSI, NDWI, or EVI)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the input variable
        String of additional notes about the collection
    """
    coll_name = 'LANDSAT/LC8_SR'
    coll_desc = ('Landsat 8, at-surface reflectance daily {0} ' +
                 '(Fmask cloud mask applied)').format(variable)
    var_desc = variable
    if logger:
        ee_call = 'collection = ee.ImageCollection(' + coll_name + ')'
        logger.info('EE CALL: ' + ee_call)

    # Apply the Fmask cloud mask before renaming the bands
    # Rename bands to common band names
    collection = ee.ImageCollection(coll_name)
    collection = collection.map(landsat8_sr_band_func)
    collection = collection.map(landsat_fmask_cloud_mask_func)

    if variable == 'NDVI':
        notes = "NDSI calculated from Norm. Diff. of Near-IR and Red bands"
        collection = collection.map(landsat_ndvi_func)
    elif variable == 'NDSI':
        notes = "NDSI calculated from Norm. Diff. of Green and mid-IR bands"
        collection = collection.map(landsat_ndsi_func)
    elif variable == 'NDWI':
        notes = "NDWI calculated from Norm. Diff. of near-IR and mid-IR bands"
        collection = collection.map(landsat_ndwi_func)
    elif variable == 'EVI':
        notes = "EVI calculated from Near-IR, Red and Blue bands"
        collection = collection.map(landsat_evi_func)
    elif variable == 'TrueColor':
        notes = "True Color"
        collection = collection.map(landsat_true_color_func)
    elif variable == 'FalseColor':
        notes = "False Color"
        collection = collection.map(landsat_false_color_func)
    elif variable == 'Blue':
        notes = "Blue band"
        collection = collection.select(['blue'], ['Blue'])
    elif variable == 'Green':
        notes = "Green band"
        collection = collection.select(['green'], ['Green'])
    else:
        notes = ''
        collection = collection.select(variable)

    return collection, coll_name, coll_desc, var_desc, notes

#===========================================
#    LANDSAT FUNCTIONS
#===========================================
property_list = ['system:index', 'system:time_start', 'system:time_end']

def landsat_acca_cloud_mask_func(img):
    """Apply basic ACCA cloud mask to a daily Landsat TOA image

    For Landsat 8 images after Oct 31st, 2015, there is no LST data
        so simpleCloudScore returns a fully masked image
    This makes it appear as if there are no Landsat 8 TOA images/data
    If simpleCloudScore doesn't work, this function should not mask any values
        and instead return all pixels, even cloudy ones
    Use "unmask(0)" to set all masked pixels as cloud free
    This should have no impact on earlier Landsat TOA images and could be
        removed once the LST issue is resolved
    """
    cloud_mask = ee.Algorithms.Landsat.simpleCloudScore(img)\
        .select(['cloud']).unmask(0).lt(50)
    return img.updateMask(cloud_mask)


def landsat_fmask_cloud_mask_func(img):
    """Apply the Fmask band in the at-surface reflectance collections"""
    fmask = img.select('cfmask')
    # CLouds (4), shadows (2), and snow (3)
    cloud_mask = fmask.eq(2).Or(fmask.eq(3)).Or(fmask.eq(4))
    # cloud_mask = cloud_mask.Or(fmask.eq(1))  # Water
    # cloud_mask = cloud_mask.Or(
    #     fmask.eq(4).multiply(img.select('cfmask_conf').divide(3)))
    img = img.updateMask(cloud_mask.neq(1))
    return img


def landsat45_toa_band_func(img):
    """Rename Landsat 4 and 5 bands to common band names

    Change band order to match Landsat 8
    Set K1 and K2 coefficients used for computing land surface temperature
    """
    return ee.Image(img.select(
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'B6'],
        ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'thermal']))\
        .set({'k1_constant': 607.76, 'k2_constant': 1260.56})\
        .copyProperties(img, property_list)

def landsat7_toa_band_func(img):
    """Rename Landsat 7 bands to common band names

    For now, don't include pan-chromatic or high gain thermal band
    Change band order to match Landsat 8
    Set K1 and K2 coefficients used for computing land surface temperature
    """
    # ['B1', 'B2', 'B3', 'B4', 'B5', 'B6_VCID_1', 'B6_VCID_2', 'B7', 'B8'],
    # ['blue', 'green', 'red', 'nir', 'swir1',
    #  'thermal1', 'thermal2', 'swir2', 'pan'])
    return ee.Image(img.select(
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'B6_VCID_1'],
        ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'thermal']))\
        .set({'k1_constant': 666.09, 'k2_constant': 1282.71})\
        .copyProperties(img, property_list)

def landsat8_toa_band_func(img):
    """Rename Landsat 8 bands to common band names

    For now, don't include coastal, cirrus, pan-chromatic, or 2nd thermal band
    Set K1 and K2 coefficients used for computing land surface temperature
    """
    #    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11'],
    #    ['coastal', 'blue', 'green', 'red', 'nir', 'swir1', 'swir2',
    #     'pan', 'cirrus', 'thermal1', 'thermal2'])
    return ee.Image(img.select(
        ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10'],
        ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'thermal']))\
        .set({'k1_constant': img.get('K1_CONSTANT_BAND_10'),
              'k2_constant': img.get('K2_CONSTANT_BAND_10')})\
        .copyProperties(img, property_list)


def landsat45_sr_band_func(img):
    """Rename Landsat 4 and 5 bands to common band names

    Change band order to match Landsat 8
    Scale values by 10000
    """
    sr_image = img.select(
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B7'],
        ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'])\
        .divide(10000.0)
    return ee.Image(sr_image).addBands(img.select('cfmask'))\
        .copyProperties(img, property_list)

def landsat7_sr_band_func(img):
    """Rename Landsat 7 bands to common band names

    Change band order to match Landsat 8
    For now, don't include pan-chromatic or high gain thermal band
    Scale values by 10000
    """
    # ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'B8'],
    # ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'pan'])
    sr_image = img.select(
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B7'],
        ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'])\
        .divide(10000.0)
    return ee.Image(sr_image).addBands(img.select('cfmask'))\
        .copyProperties(img, property_list)

def landsat8_sr_band_func(img):
    """Rename Landsat 8 bands to common band names

    For now, don't include coastal, cirrus, or pan-chromatic
    Scale values by 10000
    """
    # ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    # ['coastal', 'blue', 'green', 'red', 'nir', 'swir1', 'swir2',
    #  'pan', 'cirrus'])
    sr_image = img.select(
        ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'],
        ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'])\
        .divide(10000.0)
    return ee.Image(sr_image).addBands(img.select('cfmask'))\
        .copyProperties(img, property_list)


def landsat_ndvi_func(img):
    """Calculate NDVI for a daily Landsat 4, 5, 7, or 8 image"""
    # Removed .clamp(-0.1, 1)
    return ee.Image(img)\
        .normalizedDifference(["nir", "red"]).select([0], ['NDVI'])\
        .copyProperties(img, property_list)

def landsat_ndsi_func(img):
    """Calculate NDSI for a daily Landsat 4, 5, 7, or 8 image"""
    # Removed .clamp(-0.1, 1)
    return ee.Image(img)\
        .normalizedDifference(["green", "swir1"]).select([0], ['NDSI'])\
        .copyProperties(img, property_list)

def landsat_ndwi_func(img):
    """Calculate NDWI (Gao 1996) for a daily Landsat 4, 5, 7, or 8 image

    Using Gao formulation to match existing EarthEngine Landsat and
        MODIS NDWI composites

    """
    # Removed .clamp(-0.1, 1)
    return ee.Image(img)\
        .normalizedDifference(["nir", "swir1"]).select([0], ['NDWI'])\
        .copyProperties(img, property_list)

def landsat_evi_func(img):
    """Calculate EVI for a daily Landsat 4, 5, 7, or 8 image"""
    evi = ee.Image(img).expression(
        '(2.5 * (b("nir") - b("red"))) / ' +
        '(b("nir") + 6 * b("red") - 7.5 * b("blue") + 1)')
    return evi.select([0], ['EVI']).copyProperties(img, property_list)

def landsat_lai_func(img):
    """Calculate leaf area index for a daily Landsat 4, 5, or 7 image

    LAI is used to compute emissivity which is used to compute LST
    Old METRIC style using top-of-atmosphere reflectance
    """
    savi = ee.Image(img).expression(
        '(1.+l) * (b("nir") - b("red")) / (l + b("nir") + b("red"))',
        {"l": 0.1})
    lai = savi.pow(3).multiply(11).clamp(0, 6)
    return lai.select([0], ['LAI']).copyProperties(img, property_list)


def landsat_em_nb_func(ndvi, lai):
    """Calculate narrowband emissivity for a daily Landsat 4, 5, 7, or 8 image

    Initial values are for NDVI > 0 and LAI <= 3
    """
    return lai.divide(300).add(0.97).where(
        ndvi.lte(0), 0.99).where(ndvi.gt(0).And(lai.gt(3)), 0.98)


def landsat_lst_func(img):
    """Calculate LST for a daily Landsat 4, 5, 7, or 8 image

    Output units are in Kelvin
    Following Allen et al. 2007 approach
    First back out radiance from brightness temperature
    Then recalculate emissivity corrected Ts
    """
    k1 = ee.Number(img.get('k1_constant'))
    k2 = ee.Number(img.get('k2_constant'))
    thermal_rad_toa = ee.Image(img).expression(
        'k1 / (exp(k2 / ts_brightness) - 1)',
        {"ts_brightness": img.select(['thermal']), "k1": k1, "k2": k2})
    em_nb = landsat_em_nb_func(
        ee.Image(landsat_ndvi_func(img)),
        ee.Image(landsat_lai_func(img)))
    rc = ee.Image(img).expression(
        '((thermal_rad_toa - rp) / tnb) - ((1. - em_nb) * rsky)',
        {"thermal_rad_toa": thermal_rad_toa, "em_nb": em_nb,
         "rp": 0.91, "tnb": 0.866, "rsky": 1.32})
    ts = ee.Image(img).expression(
        'k2 / log(em_nb * k1 / rc + 1)',
        {"em_nb": em_nb, "rc": rc, "k1": k1, "k2": k2})
    return ts.select([0], ['LST']).copyProperties(img, property_list)
    # return img.select(['B10'], ['LST']).copyProperties(img, property_list)


def landsat_true_color_func(img):
    """Calculate true color for a daily Landsat 4, 5, 7, or 8 image"""
    return ee.Image(img.select(['red', 'green', 'blue']))\
        .copyProperties(img, property_list)

def landsat_false_color_func(img):
    """Calculate false color for a daily Landsat 4, 5, 7, or 8 image"""
    return ee.Image(img.select(['nir', 'red', 'green']))\
        .copyProperties(img, property_list)
