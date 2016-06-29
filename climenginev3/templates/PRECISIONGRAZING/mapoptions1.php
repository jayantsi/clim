<div class="panel panel-default"><div class="panel-body panel-body">
	<div class="row">
		<div class="col-sm-6">
			  <h3>Select Vegetation Metric:</h3>
				<div class="variablePG">
					<input type="radio" id="variablePG" name="variablePG" value="ndvi" checked >Normalized Difference Vegetation Index (NDVI)<br>
					<input type="radio" id="variablePG" name="variablePG" value="cover" >Vegetation Cover
<br>
					<input type="radio" id="variablePG" name="variablePG" value="biomass">Vegetation Biomass<br>
					<input type="radio" id="variablePG" name="variablePG" value="height">Vegetation Height<br>
					<input type="radio" id="variablePG" name="variablePG" value="custom">Custom  Vegetation Metric<br>
					<div class="custommetric" style="display:none">
						<br>
						<h3>Customize Your Vegetation Metric: </h3>
						Enter a Custom Name and Your Desired Coefficients for each Vegetation Index<br>
                                <input id="customName" name="customName" value="MyCustomName" size="15"/> =
                                <input id="coefNDVI" name="coefNDVI" value="1" size="3" />NDVI +
                                <input id="coefSAVI" name="coefSAVI" value="0" size="3"/>SAVI +
                                <input id="coefNDBI" name="coefNDBI" value="0" size="3"/>NDBI

					
					</div>
				</div>
		</div>
		<div class="col-sm-6">
				 {% include 'PRECISIONGRAZING/season.php'%}
		</div>
	</div>
</div></div>
