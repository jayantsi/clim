<div class="panel panel-default"><div class="panel-body panel-body">
 <div class="row">
    <div class="col-sm-12">
	{% include 'GDDTOOL/pointstable_fewsnet.html'%}
	<div id="cL_yearTarget" class="cl_intraannual">
		<b>GDD Start Date:</b>
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
	<input type="checkbox" id="addforecasts" name="addforecasts" value="checked" class="addforecasts">Add NMME Forecasts

	<button type="button" class="btn btn-large btn-success pull-left" style="width:100%"
		id="form-button-submit-timeseries"
		onclick="timeseriesButton()">
		GET RESULTS</button>
	</div>
</div>
</div>
