import unittest
from httplib2 import Http
from urllib import urlencode
import copy

import main
import templatevariables as tv
import config
################
#STATICS
################
MAP_DEFAULTS = {
    'toolAction':'getMap',
    'productType':'MET',
    'product':'G',
    'variable':'pr',
    'statistic':'Total',
    'calculation':'value',
    'units':'metric',
    'varUnits':'mm',
    'dateStart':'2015-07-24',
    'dateEnd':'2015-09-20',
    'yearStart':'1980',
    'yearEnd':'2010',
    'yearStartClim':'1981',
    'yearEndClim':'2010',
    'opacity':'0.7',
    'mapCenterLongLat':'-112,42',
    'mapzoom':'5',
    'timeperiod':'last60days',
    'minColorbar':'0',
    'maxColorbar':'400',
    'colorbarmap':'GnBu',
    'colorbarsize':'8',
    'colorbarType':'continuous',
    'layer':'none',
    'palette':'f7fcf0,e0f3db,ccebc5,a8ddb5,7bccc4,4eb3d3,2b8cbe,08589e'
}

TS_DEFAULTS = {
    'toolAction':'getTimeSeriesOverDateRange',
    'timeSeriesCalc':'days',
    'subDomainTypeTS':'points',
    'variable2display':'none',
    'p2display':'',
    'productTypeTS':'MET',
    'productTS':'G',
    'variableTS':'pr',
    'statisticTS':'Total',
    'varUnitsTS':'mm',
    'timeperiodTS':'last60days',
    'minYear':'1979',
    'minDate':'1979-01-01',
    'maxYear':'2015',
    'maxDate':'2015-09-20',
    'dateStart':'2015-07-24',
    'dateEnd':'2015-09-20',
    'dateStartTS':'2015-07-24',
    'dateEndTS':'2015-09-20',
    'yearTargetData':'2010',
    'yearTargetForm':'2010',
    'yearTargetFigure':'2010',
    'yearStart':'1981',
    'yearEnd':'2010',
    'monthStart':'1',
    'monthEnd':'2',
    'dayStart':'1',
    'dayEnd':'28',
    'season':'custom',
    'seasonStart':'Jan 2001',
    'seasonEnd':'Feb 2028',
    'mapCenterLongLat':'-112,42',
    'mapzoom':'5',
    'chartType':'column',
    'runningMeanYears':'5',
    'runningMeanDays':'9',
    'yearStartClim':'1981',
    'yearEndClim':'2010',
    'p1':'-112,42',
    'p1check':'checked',
    'p1display':'block',
    'p1altname':'',
    'pointsLongLat':'112,42'
}

class TestURLFunctions(unittest.TestCase):

    def setUp(self):
        # Set domain name
        self.domain_name = "http://clim-engine-development.appspot.com"
        #self.template_variables = main.runTool(main.climateEngine().post(),'climateEngine')
        self.template_variables = {}
        # Set HTTP Method and response and content variables
        self.http_method = "POST"
        self.h = Http()
        self.request, self.content = self.h.request(self.domain_name, self.http_method, urlencode(self.template_variables))
        #set default template variables
        self.template_variables = tv.set_initial_template_values(self,'climateEngine')
        '''
        #NOT WORKING: need a ton of template vars to set shareLink
        self.template_variables_map = MAP_DEFAULTS
        self.template_variables_ts = TS_DEFAULTS
        '''
    def test_default_getMap(self):
        print 'Testing Map request with default values'
        shareLink = tv.set_share_link(self.template_variables).split('?')[1]
        #shareLink = tv.set_share_link(self.template_variables_map).split('?')[1]
        request, content = self.h.request(self.domain_name, self.http_method, shareLink)
        """ Test if HTTP response is returned """
        self.assertTrue(request)
        """ Test if HTTP status code is returned in the response"""
        assert 'status' in request
        """ Test for successful (200) HTTP response"""
        assert request['status'] == "200"

    def test_default_timeSeries(self):
        print 'Testing Time Series request with default values'
        #shareLink = tv.set_share_link(self.template_variables_ts).split('?')[1]
        #FIX ME: set share link using main tools
        shareLink = 'toolAction=getTimeSeriesOverDateRange&timeSeriesCalc=days&subDomainTypeTS=points&variable2display=none&productTypeTS=MET&productTS=G&variableTS=pr&statisticTS=Total&varUnitsTS=mm&timeperiodTS=last60days&minYear=1979&minDate=1979-01-01&maxYear=2015&maxDate=2015-09-20&dateStart=2015-07-24&dateEnd=2015-09-20&dateStartTS=2015-07-24&dateEndTS=2015-09-20&yearTargetData=2010&yearTargetForm=2010&yearTargetFigure=2010&yearStart=1981&yearEnd=2010&monthStart=1&monthEnd=2&dayStart=1&dayEnd=28&season=custom&seasonStart=Jan%2001&seasonEnd=Feb%2028&mapCenterLongLat=-112,42&mapzoom=5&chartType=column&runningMeanYears=5&runningMeanDays=9&yearStartClim=1981&yearEndClim=2010&p1=-112,42&p1check=checked&p1display=block&p1altname=&pointsLongLat=-112,42'
        request, content = self.h.request(self.domain_name, self.http_method, shareLink)
        """ Test if HTTP response is returned """
        self.assertTrue(request)
        """ Test if HTTP status code is returned in the response"""
        assert 'status' in request
        """ Test for successful (200) HTTP response"""
        assert request['status'] == "200"

if __name__ == '__main__':
    unittest.main()
