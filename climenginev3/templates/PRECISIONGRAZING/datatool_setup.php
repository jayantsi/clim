<div class="panel panel-default">
<div class="panel-body panel-heading">
	<div class="row">
		<div class="col-sm-6">
			<div class="row">
				<div class="col-sm-12">
					{% include 'PRECISIONGRAZING/map.html'%}
					{% include 'PRECISIONGRAZING/linknavigation.html'%}
				</div>
			</div>
		</div>
		<div class="col-sm-6">
			<div class="row">
                                <div class="col-sm-12">
               			 	{% include 'PRECISIONGRAZING/timeseries.php'%}
				</div>
			</div>
			  <div class="row">
                                <div class="col-sm-12">
                                        {% include 'PRECISIONGRAZING/tabfigure_ndvi.html'%}
                                </div> 
                       </div>
		</div>
	</div>
</div></div>
