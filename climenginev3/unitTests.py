import unittest

import timeseriesMethods as tM
import formatData
import forms
import random


class TestTimeSeriesFunctions(unittest.TestCase):

    def setUp(self):
        #Test point
        self.point1 = '-119.0,39.5'
        self.point2 = '-118.5,39.6'
        self.marker_color = 'red'

    def test_set_template_variables(self):
        pass

    def test_initialize_timeSeriesTextDataDict(self):
        data_dict = formatData.initialize_timeSeriesTextDataDict(self.point1)
        self.assertIsInstance(data_dict,dict)
        self.assertIn('Lon', data_dict)
        self.assertIn('Lat', data_dict)
        self.assertIn('Name', data_dict)
        self.assertIn('AltName', data_dict)
        self.assertNotEqual(data_dict['Lon'],'')
        self.assertNotEqual(data_dict['Lat'],'')
        self.assertEqual(data_dict['Name'],self.point1)
        self.assertEqual(data_dict['Data'],[])

    def test_initialize_timeSeriesGraphDataDict(self):
        data_dict = formatData.initialize_timeSeriesGraphDataDict(self.point1,self.marker_color)
        self.assertIsInstance(data_dict,dict)
        self.assertIn('Lon', data_dict)
        self.assertIn('Lat', data_dict)
        self.assertIn('Name', data_dict)
        self.assertIn('AltName', data_dict)
        self.assertIn('MarkerColor', data_dict)
        self.assertNotEqual(data_dict['Lon'],'')
        self.assertNotEqual(data_dict['Lat'],'')
        self.assertEqual(data_dict['Name'],self.point1)
        self.assertEqual(data_dict['Data'],[])
        self.assertEqual(data_dict['MarkerColor'],self.marker_color)

    '''
    def test_modify_units_in_timeseries(self):
        units = ['english','metric']
        #Set variables
        variables = []
        var_forms = [forms.formVariableGrid,forms.formVariableLandsat,forms.formVariableModis]
        for var_set in var_forms:
            for v in var_set:
                variables.append(v[0][1:])
        #Test unit conversion on all variables
        for unit in units:
            for var in variables:
                rand = random.uniform(0, 300)
                val = formatData.modify_units_in_timeseries(rand,var,unit)
                self.assertIsInstance(val, float)
    '''

if __name__ == '__main__':
    unittest.main()
