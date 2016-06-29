############################################
##       MAIN HANDLER FILE FOR VIEWS       ##
#############################################
#
#Before deploying, make sure debug = False
#
#
#############################################
import datetime
import json
import logging
import os

import cgi
import config
import ee
import httplib2
import jinja2
import numpy
import webapp2

import formchecks
import mappingMethods
import timeseriesMethods
import collectionMethods
import application_defaults
import templatevariables

import collection_dataStore
import urllib
from google.appengine.api import users
from google.appengine.api import memcache
from google.appengine.api import urlfetch
urlfetch.set_default_fetch_deadline(180000)
httplib2.Http(timeout=180000)

import time
from time import sleep

#############################################
##       SET DIRECTORY FOR PAGES           ##
#############################################
template_dir = os.path.join(os.path.dirname(__file__), 'templates')
JINJA_ENVIRONMENT = jinja2.Environment(
    autoescape=True,
    loader=jinja2.FileSystemLoader(template_dir),
    extensions=['jinja2.ext.with_'])

#############################################
##       RUN  MAX DATES                    ##
#############################################
class runMaxDates(webapp2.RequestHandler):
    def get(self):
        ee.Initialize(config.EE_CREDENTIALS)
        ee.data.setDeadline(180000)  # 3 minutes

        import loggerFunctions
        logger = loggerFunctions.set_logger('MAX DATES')
        try:
            maxDates = collection_dataStore.get_all_maxDates()
        except:
            time.sleep(30)
            maxDates = collection_dataStore.get_all_maxDates()

        logger.info(maxDates)

        for key, value in maxDates.iteritems():
            #Check that date is of format yyyy-mm-dd
            err = 0
            try:
                dt.datetime.strptime(value, "%Y-%m-%d")
            except:
                err = 1
            if err:
                # 3600s = 1 hr..in seconds (not milliseconds)
                #memcache.add(key=key, value=value, time=3600)
                memcache.add(key=key, value=value, time=0) #no expiration
                #logger.info('added'+key+value)
            #else #wait until next time

        out_str = '<h4>Max Dates</h4>'
        for key, value in sorted(maxDates.iteritems()):
            out_str += '{} = {}'.format(key, value) + '<br><br>'
        self.response.out.write(out_str)

#############################################
##       RUN TOOL                          ##
#############################################
def runTool(self, applicationName):
    ee.Initialize(config.EE_CREDENTIALS)
    ee.data.setDeadline(180000)
    import loggerFunctions
    logger = loggerFunctions.set_logger('TEST')
    # Initialize forms
    template_values = templatevariables.set_initial_template_values(
        self, applicationName)
    '''
    try:
        template_values = templatevariables.set_initial_template_values(
            self, applicationName)
    except:
        template_values = {}
    '''
    # Check user input for errors:
    fieldID, input_err = formchecks.check_user_input(self, template_values)
    if input_err is None:
        if self.request.arguments():
            # Update template values with mapid or time series data
            toolAction = template_values['toolAction']
            if toolAction == 'getTimeSeriesOverDateRange':
                subDomainTypeTS = template_values['subDomainTypeTS']
                if subDomainTypeTS == 'points':
                    shape_type = 'p'
                elif subDomainTypeTS == 'customShapes':
                    shape_type = 'ft'
                template_values = timeseriesMethods.get_time_series(
                    template_values, shape_type)
            elif (toolAction == 'getMap' or
                  toolAction == 'downloadRectangleSubset' or
                  toolAction == 'showSingleValueOnMap' or
                  toolAction == 'downloadFusionTableSubset'):
                template_values = mappingMethods.get_images(template_values)
    else:
        template_values['form_error'] = {fieldID: input_err}
        #template_values['form_error'] = {'fieldID':str(fieldID),'error':str(input_err)}
    return template_values

#############################################
##       GENERATE RESPONSE                         ##
#############################################
def generateResponse(self, template_values):

        if template_values['toolAction'] == 'showSingleValueOnMap':
            self.response.out.write(template_values['pointValue'])
        elif (template_values['toolAction'] == 'downloadRectangleSubset' or
              template_values['toolAction'] == 'downloadFusionTableSubset'):
            dataobj = {
                'downloadURL': template_values['downloadURL'],
                'shareLink': template_values['shareLink']
            }
            self.response.out.write(json.dumps(dataobj))
        elif template_values['toolAction'] == 'getTimeSeriesOverDateRange':
            dataobj = {
                    'timeSeriesTextData': [],
                    'timeSeriesGraphData': [],
                    'timeSeriesTextData2': [],
                    'timeSeriesGraphData2': [],
                    'climoData': [],
                    'climoData2': [],
                    'percentileData': [],
                    'percentileData2': [],
                    'shareLink': template_values['shareLink']
            }
            if 'form_error' in template_values.keys() and template_values['form_error']:
                dataobj['form_error'] = template_values['form_error']
                self.response.out.write(json.dumps(dataobj))
            else:
                # Converting to python dictionary
                dataobj['timeSeriesTextData'] = template_values['timeSeriesTextData']
                dataobj['timeSeriesGraphData'] = template_values['timeSeriesGraphData'],
                if 'climoData' in template_values.keys():
                    dataobj['climoData'] = template_values['climoData']
                    dataobj['percentileData'] = template_values['percentileData']
                if 'timeSeriesTextData2' in template_values.keys():
                    dataobj['timeSeriesTextData2'] = template_values['timeSeriesTextData2']
                    dataobj['timeSeriesGraphData2'] = template_values['timeSeriesGraphData2']
                if 'climoData2' in template_values.keys():
                    dataobj['climoData2'] = template_values['climoData2']
                    dataobj['percentileData2'] = template_values['percentileData2']
                # Converting to a javascript object(JSON)
                self.response.out.write(json.dumps(dataobj))
        else:
            dataobj = {}
            if 'form_error' in template_values.keys() and template_values['form_error']:
                dataobj['form_error'] = template_values['form_error']
                self.response.out.write(json.dumps(dataobj))
            else:
                # All mapping toolActions
                dataobj = {
                    "mapid": template_values['mapid'],
                    "token": template_values['token'],
                    'shareLink': template_values['shareLink']
                }
                self.response.out.write(json.dumps(dataobj))

#############################################
##       CLIMATE ENGINE EXPERT PAGE                ##
#############################################
class climateEngineExpert(webapp2.RequestHandler):
    def get(self):
        applicationName = 'climateEngineExpert'
        template_values = runTool(self, applicationName)
        template = JINJA_ENVIRONMENT.get_template('climateEngineExpert.html')
        self.response.out.write(template.render(template_values))
    def post(self):
        applicationName = 'climateEngineExpert'
        template_values = runTool(self, applicationName)
        generateResponse(self, template_values)

#############################################
##       FEWS NET PAGE                     ##
#############################################
class fewsNet(webapp2.RequestHandler):
    def get(self):
        applicationName = 'fewsNet'
        template_values = runTool(self, applicationName)
        template = JINJA_ENVIRONMENT.get_template('fewsNet.html')
        self.response.out.write(template.render(template_values))
    def post(self):
        applicationName = 'fewsNet'
        template_values = runTool(self, applicationName)
        generateResponse(self, template_values)


#############################################
##       NEVADA-ET                     ##
#############################################
class nevadaet(webapp2.RequestHandler):
    def get(self):
        applicationName = 'nevadaet'
        template_values = runTool(self, applicationName)
        template = JINJA_ENVIRONMENT.get_template('nevadaet.html')
        self.response.out.write(template.render(template_values))
    def post(self):
        applicationName = 'nevadaet'
        template_values = runTool(self, applicationName)
        generateResponse(self, template_values)

#############################################
##       NPS LAKE MEAD                     ##
#############################################
class lakeMead(webapp2.RequestHandler):
    def get(self):
        applicationName = 'lakeMead'
        template_values = runTool(self, applicationName)
        template = JINJA_ENVIRONMENT.get_template('lakeMead.html')
        self.response.out.write(template.render(template_values))
    def post(self):
        applicationName = 'lakeMead'
        template_values = runTool(self, applicationName)
        generateResponse(self, template_values)

#############################################
##       PRECISION GRAZING                     ##
#############################################
class precisionGrazing(webapp2.RequestHandler):
    def get(self):
        applicationName = 'precisionGrazing'
        template_values = runTool(self, applicationName)
        template = JINJA_ENVIRONMENT.get_template('precisionGrazing.html')
        self.response.out.write(template.render(template_values))
    def post(self):
        applicationName = 'precisionGrazing'
        template_values = runTool(self, applicationName)
        generateResponse(self, template_values)


#############################################
##      GDD TOOL                           ##
#############################################
class gddTool(webapp2.RequestHandler):
    def get(self):
        applicationName = 'gddTool'
        template_values = runTool(self, applicationName)
        template = JINJA_ENVIRONMENT.get_template('gddTool.html')
        self.response.out.write(template.render(template_values))
    def post(self):
        applicationName = 'gddTool'
        template_values = runTool(self, applicationName)
        generateResponse(self, template_values)
#############################################
##       URL MAPPING                        ##
#############################################
app = webapp2.WSGIApplication(
    [
        ('/', climateEngineExpert),
        ('/climateEngineExpert', climateEngineExpert),
        ('/(?i)fewsNet', fewsNet),
	('/(?i)nevadaet', nevadaet),
        ('/(?i)lakeMead', lakeMead),
        ('/precisionGrazing', precisionGrazing),
        ('/gddTool', gddTool),
        ('/runTool', runTool),
        ('/tasks/maxDate',runMaxDates),
    ],
    #debug=True,
    debug=False,
    #config=config
)

