<h3>Select Time of Year:</h3>
<div class="seasonPG">
<input type="radio" id="seasonbrown" name="seasonPG" value="brown">Brown<br>
<input type="radio" id="seasongreen" name="seasonPG" value="peakgreen" checked>Peak Green-ness<br>
<input type="radio" id="seasoncustom" name="seasonPG" value="custom" >Custom Date Range<br>
</div>

<div class="dates" style="display:none">
	 <div class="seasontimeperiod yeartimeperiod" {% if timeSeriesCalc != "days" %}style="display:inline"
		    {% else %}style="display:none"{% endif %}>
		<br>
	    <select id="monthStart" name="monthStart" class="monthStart" size="1">
		{% for x,y in formMonth %}
		    <option value="{{ x }}" {% if x == monthStart  %} selected {% endif %}>{{ y }}</option>
		{% endfor %}
	    </select>
	    <select id="dayStart" name="dayStart" class="dayStart" size="1">
		{% for x,y in formDay %}
		    <option value="{{ x }}" {% if x == dayStart  %} selected {% endif %}>{{ y }}</option>
		{% endfor %}
	    </select>
	  </div>
	 <div class="seasontimeperiod" {% if timeSeriesCalc == "interannual" %}style="display:inline"
		{% else %}style="display:none"{% endif %}>
		to
	     <select id="monthEnd" name="monthEnd" class="monthEnd" size="1" style="width:6">
		{% for x,y in formMonth %}
		<option value="{{ x }}" {% if x == monthEnd  %} selected {% endif %}>{{ y }}</option>
		{% endfor %}
	    </select>
	    <select id="dayEnd" name="dayEnd" class="dayEnd" style="width:5">
		{% for x,y in formDay %}
		<option value="{{ x }}" {% if x == dayEnd  %} selected {% endif %}>{{ y }}</option>
		{% endfor %}
	    </select>
	</div>
</div>
