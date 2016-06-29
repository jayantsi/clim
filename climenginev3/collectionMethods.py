import collection_CFSV2
import collection_CHIRPS
import collection_GRIDMET
import collection_LANDSAT
import collection_MODIS
import collection_MACA
import collection_NASANEX
import collection_PFV52

#===========================================
#    GET_COLLECTION
#===========================================
def get_collection(product, variable, model, scenario, frequency, logger=None):
    """Return an EarthEngine image collection for given product and variable

    Args:
        product: single character indicating the product
            (i.e. G, M, L_TOA, L_SR, CHIRPS, or CFSR)
        variable: string indicating the variable/band to return
            (i.e. NDVI, EVI, pet, tmmn)
    Returns:
        Output from product collection functions
        Tuple of the following:
            EarthEngine image collection object
            String of the collection name
            String of the collection description
            String of the variable description (may be the input variable)
            String of additional notes about the collection
    """
    if product == 'G':
        return collection_GRIDMET.get_gridmet_collection(variable, logger=logger)
    elif product == 'M':
        return collection_MODIS.get_modis_collection(variable, logger=logger)
    elif product == 'L_TOA':
        return collection_LANDSAT.get_landsat_toa_collection(
            variable, logger=logger)
    elif product == 'L5_TOA':
        return collection_LANDSAT.get_landsat5_toa_collection(
            variable, logger=logger)
    elif product == 'L7_TOA':
        return collection_LANDSAT.get_landsat7_toa_collection(
            variable, logger=logger)
    elif product == 'L8_TOA':
        return collection_LANDSAT.get_landsat8_toa_collection(
            variable, logger=logger)
    elif product == 'L_SR':
        return collection_LANDSAT.get_landsat_sr_collection(
            variable, logger=logger)
    elif product == 'L5_SR':
        return collection_LANDSAT.get_landsat5_sr_collection(
            variable, logger=logger)
    elif product == 'L7_SR':
        return collection_LANDSAT.get_landsat7_sr_collection(
            variable, logger=logger)
    elif product == 'L8_SR':
        return collection_LANDSAT.get_landsat8_sr_collection(
            variable, logger=logger)
    elif product == 'CHIRPS':
        return collection_CHIRPS.get_chirps_collection(variable, logger=logger)
    elif product == 'CFSV2':
        return collection_CFSV2.get_cfsv2_collection(variable, logger=logger)
    elif product == 'PFV52':
        return collection_PFV52.get_pfv52_collection(variable, logger=logger)
    elif product == 'MACA':
        return collection_MACA.get_maca_collection(
            variable, model, scenario, frequency,logger=logger)
    elif product == 'NASANEX':
        return collection_NASANEX.get_nasanex_collection(
            variable, model, scenario, logger=logger)


#===========================================
#    GET_CLIMATOLOGY_COLLECTION
#===========================================
def get_climatology_collection(product, variable, logger=None):
    """Return an EarthEngine image collection for given product and variable

    Args:
        product: single character indicating the product
            (i.e. G, M, L_TOA, L_SR, CHIRPS or CFSR)
        variable: string indicating the variable/band to return
            (i.e. NDVI, EVI, pet, tmmn)
    Returns:
        Output from product collection functions
        Tuple of the following:
            EarthEngine image collection object
    """

    if product == 'G':
        return collection_GRIDMET.get_gridmet_climatology_collection(
            variable, logger=logger)
    else: 
        return 'None'
