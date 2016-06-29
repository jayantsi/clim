jQuery('.addforecasts').on('change', function(){
 	if($('input[id=addforecasts]:checked').val()=="checked"){
			console.log('getting forecasts from NKN');
		
		if(!haveForecasts){
			//ajax call to get them 
			console.log('submitting');
			//NMME forecasts same variable names as gridmet
			variable=$('#variable').val();
			point =$('#p1').val().split(',');
			pointLat = point[1]; //parseFloat()?
			pointLon = point[0];
			freq = 'daily';
			//modelName=$('#models').val();
			modelName="CMC1";
			//var jqxhr = submitAjax(variable,pointLat,pointLon,modelName,freq);
		}else{
			console.log('not submitting');
			//use them and add to the highcharts graph
		};
	};
});

jQuery('.cl_intraannual').on('change', function(){

	var dayStart = $('#dayTargetFigure').val();
	var monthStart = $('#monthTargetFigure').val();

	$('#dayStart').val(dayStart);
	$('#monthStart').val(monthStart);

});

function set_year(){
	var year =$('#year').val();
	  var monthStart =$('#monthStart').val();
	var dayStart =$('#dayStart').val();
	var monthEnd = $('#monthEnd').val();
	var dayEnd =$('#dayEnd').val();
	dateStart = year+"-"+monthStart+"-"+dayStart;
	dateEnd = year+"-"+monthEnd+"-"+dayEnd;
	$('#dateStart').val(dateStart);
        $('#dateEnd').val(dateEnd);
};
  jQuery('.year').on('change', function(){
        set_year();
});

 	  /*--------------------------------------------*/
          /*      TEMPORARILY DISABLED INTRAANNUAL FOR FUSION TABLES  */
          /*--------------------------------------------*/
    jQuery('#subDomainTypeTS').on('change', function(){
	
	    var subDomainTypeTS=jQuery(this).val();
        if(subDomainTypeTS=='customShapes'){
			$("#timeSeriesCalc option[value='intraannual']").attr("disabled","disabled");
			$('#timeSeriesCalc').val('days');
		}
        else if (subDomainTypeTS=='points'){
			$("#timeSeriesCalc option[value='intraannual']").removeAttr('disabled');
		}
        
        if (subDomainTypeTS!='None'){
            //Hide None region error if it's showing
            if ($('#form_error_subDomainTypeTS').length){
                $('#form_error_subDomainTypeTS').css('display','none');
                
            }
        }
        //Show hide appropriate Day fields
        if ($('#timeSeriesCalc').val() == 'days'){
            //Hide intra/inter options
            $('.seasontimeperiod').css('display','none');


        }
        if ($('#timeSeriesCalc').val() == 'intraannual'){
            $('.yeartimeperiod').css('display','block');
        }
        if ($('#timeSeriesCalc').val() == 'interannual'){
            $('.seasontimeperiod').css('display','block');
        }
    });   

 	  /*--------------------------------------------*/
          /*      INITIALIZE YEARS                     */
          /*--------------------------------------------*/
    /*
    function initializeFEWSYears(yearStart,yearEnd){
	//this function did have ability to pass in numvar =1,2
                        var minYear = $('#minDate').val().slice(0,4);
                        var maxYear = $('#maxDate').val().slice(0,4);
                        jQuery('#yearStartFEWS > option').remove();
                        jQuery('#yearEndFEWS > option').remove();
                        for (yrString=minYear; yrString<=maxYear; yrString++) {
                              var myString = '<option value="' + yrString + '">' + yrString + '</option>';
                              jQuery('#yearStartFEWS').append(myString);
                              jQuery('#yearEndFEWS').append(myString);
                                }
                        $('#yearStartFEWS').val(yearStart);
                        $('#yearEndFEWS').val(yearEnd);
            };

    */
	/*--------------------------------------------*/
	/*        RELOAD ALL REGIONS ON MAP  	     */
	/*--------------------------------------------*/
  	jQuery('.showFEWSregions').on('change','input[type=checkbox]', function(){
                if($('input[id=showFEWSregions]:checked').val()=="1"){
                        showFewsCountries();
                }else{
                        removeFewsCountries();
                };
        });



	/*--------------------------------------------*/
	/*        FILTER SUBREGIONS    		      */
	/*--------------------------------------------*/
	 jQuery('.filterRegions').on('change','input[type=checkbox]', function(){
        if($('input[id=filterRegions]:checked').val()=="1"){
			var filter=$('#ftFilter1').val();
			applyFilter(filter);
        }else{
			//$('#ftFilter1').val("")
			applyFilter(filter);
        };
    });

	function applyFilter(filter){
		ft_id = 1;
                table_id = $('#ft'+String(ft_id)).val();
                checked = $('#checkft' + String(ft_id)).is(':checked');
                 if(checked){
			removeFusionTableFromMap(ft_id);
			createAndPutFusionTableOnMap (ft_id,window.map,table_id,filter);
		};
	};

	jQuery('#ftFilter1').on('change paste autocompletefocus', function(){	
		var filter=$('#ftFilter1').val();
                checked = $('#filterRegions').is(':checked');
		if(checked){
			applyFilter(filter);
		};
	});

	/*--------------------------------------------*/
	/*         CHANGE IN INTERANNUAL START DATE   */
	/*--------------------------------------------*/
	jQuery('#monthStartFEWS').on('change',function(){
		var monthStart = $('#monthStartFEWS').val();
		$('#monthStart').val(monthStart);
	});
	jQuery('#dayStartFEWS').on('change',function(){
		var dayStart = $('#dayStartFEWS').val();
		$('#dayStart').val(dayStart);
	});

	jQuery('#monthEndFEWS').on('change',function(){
                var monthEnd = $('#monthEndFEWS').val();
                $('#monthEnd').val(monthEnd);
        });
        jQuery('#dayEndFEWS').on('change',function(){
                var dayEnd = $('#dayEndFEWS').val();
                $('#dayEnd').val(dayEnd);
        });

 	jQuery('#yearStartFEWS').on('change',function(){
                var yearStart = $('#yearStartFEWS').val();
                $('#yearStart').val(yearStart);
        });
        jQuery('#yearEndFEWS').on('change',function(){
                var yearEnd = $('#yearEndFEWS').val();
                $('#yearEnd').val(yearEnd);
        });


	/*--------------------------------------------*/
	/*         CHANGE IN VARIABLE  		      */
	/*--------------------------------------------*/
function set_CHIRPS_variable(){
	var CHIRPSvariable =$('#CHIRPSvariable').val();
	var splitstring = CHIRPSvariable.split('-');
	var product =splitstring[0];
	var variable=splitstring[1];
	var statistic=splitstring[2];
	var calculation=splitstring[3];

	if(product=='M' | product=='L_TOA'||product=='L5_TOA' | product=='L7_TOA'| product=='L8_TOA' || product=='L_SR'||product =='L5_SR'||product=='L7_SR'||product=='L8_SR'){
		productType='RS';
	}else if(product=='CHIRPS' | product=='G'| product=='CFS'){
		productType ='MET';
	}else if(product=='MACA'|product=='NASANEX'){
		productType ='CLIMATE';
	}
	$('#productType').val(productType);
 	 $('#productTypeTS').val(productType);
        changeInProductType(productType,1);
	
	$('#product').val(product);
 	$('#productTS').val(product);
	changeInProduct(product,variable, 1) ;
	$('#variable').val(variable);
	$('#variableTS').val(variable);
	changeInVariable(product,variable);

	$('#statistic').val(statistic);
	$('#statisticTS').val(statistic);
	changeInStatistic(product,variable);

	$('#calculation').val(calculation);
	 changeInCalculation(calculation);
	//var varUnits = $('#varUnits').val();
	//setColorbarLabel(variable,calculation,varUnits);

	// these have to be set again because the listeners are setting statistic = 'median' for MODIS
	$('#statistic').val(statistic);
	$('#statisticTS').val(statistic);

};

jQuery('#CHIRPSvariable').on('change',function(){
	set_CHIRPS_variable();
});


function set_everything(){
	//set_analysis();
	//set_season();
	//set_CHIRPS_variable();
};
