        
	/*--------------------------------------------*/
	/*--Initialize Coupled Relationships--*/
	/*--------------------------------------------*/
	function initializeCoupledRelationships(product,variable){
	        $('#productTS').val(product);
	        $('#product').val(product);

	        $('#variableTS').val(variable);
	        $('#variable').val(variable);

	}
	/*--------------------------------------------*/
	/*--Link approprate map and time series variables--*/
	/*--------------------------------------------*/
	jQuery('#productType,#productTypeTS,#productType2TS').on('change', function(){
        var ID = $(this).attr('id');
        var productType = $(this).val();
        var numvar, product, variable;
        if (ID == 'productType'){
		    numvar=1;
		    //Link TS  productType
            $('#productTypeTS').val(productType);
  		    changeInProductType(productType,numvar);
		    product = $('#product').val(); 
		    variable=$('#variable').val();
		    changeInProduct(product,variable, numvar);
	    }
        if (ID == 'productTypeTS'){
		    numvar=1;
            //Link Map product Type
		    $('#productType').val(productType);
  		    changeInProductType(productType,numvar);
		    product = $('#productTS').val(); 
		    variable=$('#variableTS').val();
		    changeInProduct(product,variable, numvar);

	    }
        if (ID == 'productType2TS'){
		    numvar=2;
            changeInProductType(productType,numvar);
		    product = $('#product2TS').val(); 
		    variable=$('#variable2TS').val();
		    changeInProduct(product,variable, numvar);
	   }
	});


	jQuery('#productTS, #product2TS').on('change', function(){
           if ($(this).attr('id') == 'productTS'){
                var product = $('#productTS').val();
                var variable = $('#variableTS').val();
                var timeperiod = $('#timeperiodTS').val();
                //NOTE: changeInTimePeriod is called in changeInProduct    
                //changeInTimePeriod(product,timeperiod, 1);
                changeInProduct(product,variable, 1);
            }
            if ($(this).attr('id') == 'product2TS'){
                var product = $('#product2TS').val();
                var variable = $('#variable2TS').val();
                var timeperiod = $('#timeperiod2TS').val();
                //NOTE: changeInTimePeriod is called in changeInProduct
                //changeInTimePeriod(product,timeperiod,2);
                changeInProduct(product,variable,2);
            } 
            $('#product').val(product);
        });
	
    jQuery('#product').on('change', function(){
	        var product = $('#product').val();
            var variable = $('#variable').val();
            var timeperiod = $('#timeperiod').val();
            //NOTE: changeInTimePeriod is called in changeInProduct
            //changeInTimePeriod(product,timeperiod);
            changeInProduct(product,variable,1);
            changeInProduct(product,variable,2);
	     $('#productTS').val(product);
            $('#product2TS').val(product);
        });

	/*--------------------------------------------*/
	/*--   COUPLE VARIABLETS and VARIABLE  	    --*/
	/*--------------------------------------------*/
	jQuery('#variable2TS').on('change', function(){
	    	var v = $('#variable2TS').val();
	    	var product = $('#product2TS').val();
            changeInVariable2(product,v);
	});
	jQuery('#variableTS').on('change', function(){
	    	var v = $('#variableTS').val();
	    	var product = $('#productTS').val();
	     	$('#variable').val(v);
            changeInVariable(product,v);
	});
	jQuery('#variable').on('change', function(){
	    	 var v = $('#variable').val();
	    	 var product = $('#product').val();
	     	$('#variableTS').val(v);
            changeInVariable(product,v);
            changeInVariable2(product,v);
	});

    	/*--------------------------------------------*/
        /*      TIMEPERIOD LISTENER     */
        /*--------------------------------------------*/
        jQuery('#timeperiod').on('change', function(){
            product=$('#product').val()
            timeperiod=$('#timeperiod').val()
	     	$('#timeperiodTS').val(timeperiod);
            changeInTimePeriod(product,timeperiod, 1);
            //changeInTimePeriod(product,timeperiod, 2);
        });
        jQuery('#timeperiodTS').on('change', function(){
            product=$('#productTS').val()
            timeperiod=$('#timeperiodTS').val()
	     	$('#timeperiod').val(timeperiod);
            changeInTimePeriod(product,timeperiod, 1);
        });
        jQuery('#timeperiod2TS').on('change', function(){
            product=$('#product2TS').val()
            timeperiod=$('#timeperiod2TS').val()
            $('#timeperiod').val(timeperiod);
             changeInTimePeriod(product,timeperiod, 2);
        });
	/*--------------------------------------------*/
	/*--   COUPLE UNITS TS and UNITS 	    --*/
	/*--------------------------------------------*/
	jQuery('#unitsTS').on('change', function(){
	     var units = $(this).val();
	     $('#units').val(units);
	     var variable =$('#variableTS').val();
              changeInUnits(variable); //changes colorbar units
        });
        jQuery('#units').on('change', function(){
	     var units = $(this).val();
	     $('#unitsTS').val(units);
	     var variable =$('#variable').val();
              changeInUnits(variable); //changes colorbar units
        });
    jQuery('#varUnitsTS').on('change', function(){
	     var varUnits = $(this).val();
	     $('#varUnits').val(varUnits);
	     $('.varUnits').html(varUnits);

	     $('.showUnits').html(varUnits);
        });
	jQuery('#varUnits').on('change', function(){
	     var varUnits = $(this).val();
	     $('.varUnits').html(varUnits);
	     $('#varUnitsTS').val(varUnits);
	     $('.showUnits').html(varUnits);
        });

	/*--------------------------------------------*/
        /*--   YEAR TARGET FORM/FIGURE            --*/
        /*--------------------------------------------*/
        jQuery('#yearTargetForm, #yearTargetFigure, #yearTargetData, #yearTarget2Data').on('change', function(){
            var yearTarget = $(this).val();
            $('#yearTargetForm').val(yearTarget);
            $('#yearTargetFigure').val(yearTarget);
            $('#yearTargetData').val(yearTarget);
            $('#yearTarget2Data').val(yearTarget);
        });


     /*--------------------------------------------*/
        /*      CALCULATION LISTENER     */
        /*--------------------------------------------*/
        jQuery('#calculation').on('change', function(){  //changed from .calculation
                  var calculation = jQuery('#calculation').val()
                  changeInCalculation(calculation);
        });

	/*--------------------------------------------*/
	/*--   COUPLE STATISTIC AND STATASTICTC   --*/
	/*--------------------------------------------*/
    jQuery('#statistic').on('change', function(){
        var s = $(this).val();
        $('#statisticTS').val(s);
    });
    
    jQuery('#statisticTS').on('change', function(){
        var s = $(this).val();
        $('#statistic').val(s);
    });
	/*--------------------------------------------*/
        /*       COUPLE TIME VARIABLES      */
	/*--------------------------------------------*/
	jQuery('#dateStart').bind('change paste keyup autocompletefocus', function(){
        	$('#dateStartTS').val($('#dateStart').val());
		$('#timeperiodTS').val('custom');
		$('#timeperiod').val('custom');
		//Set time variables for TimeSeries computation for Fewsnet
		//TS times are linked to map times!
		var date_eight = $(this).val().replace(/-/g,'');
		$('#monthStart').val(String(parseInt(date_eight.slice(4,6))));
		$('#dayStart').val(String(parseInt(date_eight.slice(6,8))));
	});

	jQuery('#dateStartTS').on('change', function(){
		//Update map dates  
		//$('#dateStart').val($('#dateStartTS').val());

		//Set time variables for TimeSeries computation for Fewsnet
		//TS times are linked to map times!
		var date_eight = $(this).val().replace(/-/g,'');
		$('#monthStart').val(String(parseInt(date_eight.slice(4,6))));
		$('#dayStart').val(String(parseInt(date_eight.slice(6,8))));
		if ($('#timeSeriesCalc').val() == 'intraannual'){
	        	//Make sure one year period doesn't exceed today
			if ($(this).val().slice(0,4) == '2015'){
			    $('#dateStartTS').val($('#yearTargetForm').val() + '-01-01');
			}
			//set end data one year from start date
			$('#dateEndTS').val(find_year($('#dateStartTS').val(), 'next'));
			//Update yearTarget for intraannual
			$('#yearTargetData').val($('#dateStartTS').val().slice(0,4));
            		$('#yearTargetForm').val($('#dateStartTS').val().slice(0,4));
            		$('#yearTargetFigure').val($('#dateStartTS').val().slice(0,4));
			$('#dateEnd').val($('#dateEndTS').val());
		} 
	    	$('#timeperiodTS').val('custom');
		$('#timeperiod').val('custom');
	 });  
	 jQuery('#dateStart2TS').bind('change', function(){
                $('#timeperiod2TS').val('custom');
	});
	/*--------------------------------------------*/
        /*       COUPLE TIME VARIABLES      */
	/*--------------------------------------------*/
	jQuery('#dateEnd').on('change', function(){
        $('#dateEndTS').val($('#dateEnd').val());
        //Set time variables for TimeSeries computation for Fewsnet
        //TS times are linked to map times!
        var date_eight = $(this).val().replace(/-/g,'');
        $('#monthEnd').val(String(parseInt(date_eight.slice(4,6))));
        $('#dayEnd').val(String(parseInt(date_eight.slice(6,8))));
	});

    jQuery('#dateEndTS').on('change', function(){
        //Update map dates  
        $('#dateEnd').val($('#dateEndTS').val()); 
        //Set time variables for TimeSeries computation for Fewsnet
        //TS times are linked to map times!
        var date_eight = $(this).val().replace(/-/g,'');
        $('#monthEnd').val(String(parseInt(date_eight.slice(4,6))));
        $('#dayEnd').val(String(parseInt(date_eight.slice(6,8)))); 
		if ($('#timeSeriesCalc').val() == 'intraannual'){
		    //Make sure end data lies in rangefor vraiable
		    if (parseInt($(this).val().slice(0,4)) < parseInt($('#minDate').val().slice(0,4))){
			$('#dateEndTS').val($('#yearTargetForm').val() + '-12-31');
		    }
		    $('#dateStartTS').val(find_year($('#dateEndTS').val(), 'previous'));
		    //Update yearTarget and indices for intraannual
		    $('#yearTargetData').val($('#dateStartTS').val().slice(0,4));
            $('#yearTargetForm').val($('#dateStartTS').val().slice(0,4));
            $('#yearTargetFigure').val($('#dateStartTS').val().slice(0,4));
		    var idx = parseInt($('#minDate').val().slice(0,4)) - parseInt($('#yearTargetFigure').val());
		    $('#year_index').val(idx);
		    $('#dateStart').val($('#dateStartTS').val());
		}
	});

   /*--------------------------------------------*/
        /*       COUPLE TIME CLIMO YEARS      */
    /*--------------------------------------------*/
    jQuery('#yearStartClim').on('change', function(){
        //Update yearStart for time series
        $('#yearStart').val($(this).val());
    });
    jQuery('#yearEndClim').on('change', function(){
        //Update yearEnd for time series
        $('#yearEnd').val($(this).val());
        
    });
    jQuery('#yearStart').on('change', function(){
        //Update yearStart for time series
        $('#yearStartClim').val($(this).val());
    });
    jQuery('#yearEnd').on('change', function(){
        //Update yearEnd for time series
        $('#yearEndClim').val($(this).val());

    });
