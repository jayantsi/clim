import logging
import ee
#===========================================
#        CHIRPS
#===========================================
def get_chirps_collection(variable, logger=None):
    """Return the daily image collection for CHIRPS

    Args:
        variable: string indicating the variable/band to return
            (i.e. precipitation)
    Returns:
        EarthEngine image collection object
        String of the collection name
        String of the collection description
        String of the variable description
        String of additional notes about the collection
    """
    coll_name = 'UCSB-CHG/CHIRPS/PENTAD'
    coll_desc = 'CHIRPS 4.8-km (1/20-deg) precipitation dataset (UCSB/CHG)'
    collection = ee.ImageCollection(coll_name)
    if logger:
        ee_call = 'ee.ImageCollection(' + coll_name + ')'
    notes = ""
    if variable == 'precipitation':
        var_desc = 'Precipitation'
    else:
        var_desc = ""
    if logger:
        ee_call = 'collection.select(' + variable + ')'
        logger.info('EE CALL: ' + ee_call)
    collection = collection.select(variable)
    scale = 4800 #4.8km resolution
    return collection, coll_name, coll_desc, var_desc, notes


