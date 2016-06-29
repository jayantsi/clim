import logging
#############################################
##     SET_LOGGER                   ##
#############################################
def set_logger(name):
    '''
    Logger for debugging purposes
    Args:
        name: logger name
    Returns:
        python logger object
    '''
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    sh = logging.StreamHandler()
    sh.setLevel(logging.ERROR)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(lineno)d in %(filename)s - %(message)s')
    sh.setFormatter(formatter)
    logger.addHandler(sh)
    return logger
