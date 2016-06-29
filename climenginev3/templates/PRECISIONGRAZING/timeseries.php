<div class="panel panel-default"><div class="panel-body panel-body">
	 <div class="row">
                <div class="col-sm-12">
                           <div class="domain" style="display:none">
					<select id="subDomainTypeTS" name="subDomainTypeTS" style="width:50%;display:none">
                                                {% for x,y in formSubDomainTypeTS %}
                                                    <option value="{{ x }}" {% if x==subDomainTypeTS %} selected {% endif %}
                                                        >{{ y }}
                                                        </option>
                                                {% endfor %}
                                        </select>
                                          {% include 'PRECISIONGRAZING/pointstable_fewsnet.html'%}
                                        {% include 'PRECISIONGRAZING/fusiontable_fewsnet.html'%}
                           </div>
                </div>
        </div>
	 <div class="row">
                <div class="col-sm-6">
			<h3>Select Land Owner:</h3>
			<div class="landOwner">
			<select id="landOwner" name="landOwner" style="width:100%">
				<option></option>
			</select>
			</div>
                </div>
                <div class="col-sm-6">
                </div>
        </div>
</div></div>


<ul class="nav nav-tabs navbar-default">
        <li class="active"><a href="#singlelocation" data-toggle="tab">Single Location</a></li>
        <li><a href="#multiplelocation" data-toggle="tab">Multiple Location Comparison</a></li>
</ul>
<div class="tab-content">
        <div class="tab-pane active" id="singlelocation">
	    <div class="panel panel-default"><div class="panel-body panel-heading">
			<br>
			<div class="panel panel-default"><div class="panel-body panel-body">
			<div class="row">
				<div class="col-sm-4">
					<h3>Select Pasture:</h3>
					<select id="pasture" name="pasture" class="pasture" style="width:100%">
						<option>--Select a LandOwner First--</option>
					</select>
				<br><br>
				</div>
				<div class="col-sm-4">
					<h3>Select Analysis:</h3>
					 <div class="action">
					     <input type="radio" id="actionSingleIntra" name="actionSingle" value="intraannual" checked>Look at a Single Year Starting:<br>
					</div>
					<div id="cL_yearTarget" class="cl_intraannual">
                                                <select id="monthTargetFigure" name="monthTargetFigure" monthStart" size="1">
                                                        {% for x,y in formMonth %}
                                                            <option value="{{ x }}" {% if x == monthStart  %} selected {% endif %}>{{ y }}</option>
                                                        {% endfor %}
                                                    </select>
                                                    <select id="dayTargetFigure" name="dayTargetFigure" class="dayStart" size="1">
                                                        {% for x,y in formDay %}
                                                            <option value="{{ x }}" {% if x == dayStart  %} selected {% endif %}>{{ y }}</option>
                                                        {% endfor %}
                                                    </select>
                                                     <select id ="yearTargetFigure" name ="yearTargetFigure" class="yeartimeperiod">
                                                        <option>loading</option>
                                                    </select><br />
                                        </div>


					 <div class="action">
					     <input type="radio" id="actionSingleInter" name="actionSingle" value="interannual">Compare Different Years<br>
					</div>
					     <div class="multipleyear">
								<select id="yearStart" name="yearStart" class="yearStart" size="1">
									<option>loading</option>
								</select>  to
								<select id="yearEnd" name="yearEnd" class="yearEnd" size="1">
									<option>loading</option>
								</select>
                                		</div>
				</div>
				 <div class="col-sm-4">
					<br><br>
                                        <button type="button" class="btn btn-large btn-success pull-left" style="width:100%"
                                                id="form-button-submit-timeseries"
                                                onclick="timeseriesButton()">
                                                GET RESULTS</button>

                                </div>
		       </div>
			</div></div>
		</div></div>
        </div>
        <div class="tab-pane" id="multiplelocation">
		<div class="panel panel-default"><div class="panel-body panel-heading">
		<br>
		<div class="panel panel-default"><div class="panel-body panel-body">
		<div class="row">
			<div class="col-sm-8">
                                        <h3>Select Pasture(s):</h3>
						<select id="pasture1" name="pasture1" class="pasture" style="width:100%">
							<option>--Select a LandOwner First--</option>
						</select>
							<br>
							<select id="pasture2" name="pasture2" class="pasture" style="width:100%">
								<option>--Select a LandOwner First--</option>
							</select>
                                                        <br>
                                                        <select id="pasture3" name="pasture3" class="pasture" style="width:100%">
                                                                <option>--Select a LandOwner First--</option>
                                                        </select>
                                                        <br>
                                                        <select id="pasture4" name="pasture4" class="pasture" style="width:100%">
                                                                <option>--Select a LandOwner First--</option>
                                                        </select>
                                                        <br>
                                                        <select id="pasture5" name="pasture5" class="pasture" style="width:100%">
                                                                <option>--Select a LandOwner First--</option>
                                                        </select>
	
				<div style="display:none">
					<b>Select Data Analysis:</b><br>
                                          <div class="analysis">
                                                <input type="radio" id="analysisndvi" name="analysis" value="ndvisignature" checked>NDVI Seasonal Signature over region<br>
                                                <input type="radio" id="analysisbiomassavg" name="analysis" value="biomassavg">Average biomass over region (lbs/acre)<br>
                                                <input type="radio" id="analysisbiomasstotal" name="analysis" value="biomasstotal">Total biomass over region (lbs)<br>
                                                <input type="radio" id="analysisvegcover" name="analysis" value="cover">Total Vegetation Cover over region (acres)<br>
                                                <input type="radio" id="analysisvegheight" name="analysis" value="height">Average Vegetation Height over region (ft)<br>
                                        </div>
				</div>
			</div>
			<div class="col-sm-4">
				
			</div>
		</div>
		</div></div>
		</div></div>

        </div>
</div>
