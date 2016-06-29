#!/usr/bin/env python
#

import cgi
import datetime
import webapp2

from google.appengine.ext import ndb
from google.appengine.api import users


class MainPage(webapp2.RequestHandler):
  def get(self):
    self.response.out.write('<html><body>')
    self.response.out.write('what is all in here </body> </html>')

app = webapp2.WSGIApplication([
  ('/', MainPage),
], debug=True)
