       function changeColorbarTicks(){

                var colorbarTicks= $('#colorbarTicks').val();
                colorbarTicksNumbers = [];
                colorbarTicksString= colorbarTicks.split(',');
                for (i=0;i<colorbarTicksString.length;i++){
                        colorbarTicksNumbers[i]=colorbarTicks.split(',')[i];
                };
                colorbarTicks = colorbarTicksNumbers;
                $('#minColorbar').val(colorbarTicksNumbers[0]);
                $('#maxColorbar').val(colorbarTicksNumbers[colorbarTicksString.length-1]);
 		$('#colorbarsize').val(colorbarTicksString.length-1);

        };

	function changeInColorbarType(variable,calculation){
			if(variable=='pdsi'){
				 colorbarType='discrete';
			}else{
				colorbarType='continuous';
			 }
			if(calculation=='percentile'||calculation=='anompercentof'){
				 colorbarType='discrete';
			}
			$('#colorbarType').val(colorbarType);
	}
	/*--------------------------------------------*/
	/*    COLORBARMAP LISTENER	      */
	/*--------------------------------------------*/

	function changeColorbarMapSize(){
		calculation = $('#calculation').val();

		colorbarmap = $('#colorbarmap').val();
                if(colorbarmap == 'USDM' || colorbarmap == 'invUSDM'){
                        // Remove all options
                        //jQuery('#colorbarsize > option').remove();

                        // Add only one option
                       // jQuery('#colorbarsize').append('<option value="6">6</option>');

                       // jQuery('#colorbarsize').val('6');
                }else if(colorbarmap=='USDMwWet' || colorbarmap=='invUSDMwWet'){
                        // Remove all options
                        //jQuery('#colorbarsize > option').remove();

                        // Add only one option
                        //jQuery('#colorbarsize').append('<option value="11">11</option>');
                        //jQuery('#colorbarsize').val('11');
		}else if(calculation=='anompercentof'){
                        //jQuery('#colorbarsize > option').remove();
                        //jQuery('#colorbarsize').append('<option value="11">11</option>');
                        //jQuery('#colorbarsize').val('11');
                } else {
			temp = $('#colorbarsize').val();
                        // Remove all options
                        jQuery('#colorbarsize > option').remove();

                        //for (istring=3; istring<10; istring++) {
                        for (istring=3; istring<12; istring++) { //allow 11 options here
                          jQuery('#colorbarsize').append('<option value=' + istring + '>' + istring + '</option>');
                        }
                        //jQuery('#colorbarsize').val(colorbarsize);
                        jQuery('#colorbarsize').val(temp);
                }
	}

        /*--------------------------------------------*/
        /*    MIN/MAX COLORBAR LISTENER	      */
        /*--------------------------------------------*/
        jQuery('#minColorbar,#maxColorbar').keyup( function(){
                redrawSampleColorbar();
        });

        /*--------------------------------------------*/
        /*    COLORBAR TICKS LISTENER	      */
        /*--------------------------------------------*/
        jQuery('#colorbarTicks').keyup( function(){
		    //Check colorbarTicks for anomalies
		    if ($('#calculation').val() =='anompercentof'){
			form_error = check_colorbarTicks();
			if (form_error.error){
			    //$('#colormapDropdown').click();
			    $('#form_error_colorbarTicks').css('display','inline');
			    $('#form_error_colorbarTicks').html(form_error.error);
			}else{
			//calculate the number of colors
			changeColorbarTicks(); 
			redrawSampleColorbar();
			    $('#form_error_colorbarTicks').css('display','none');
			    $('#form_error_colorbarTicks').html('');
			};
		    };
        });

        jQuery('.colorbarType').on('change',function(){
		var colorbarType = $('#colorbarType').val();
		if(colorbarType=='discrete'){
			//$('.colorbarTicks').show();
			//$('#colorbarTicks').show();
		}else{
			//$('.colorbarTicks').hide();

		};
        });
        /*--------------------------------------------*/
        /*   REDRAW COLORBAR	      */
        /*--------------------------------------------*/
        jQuery('#colorbarmap,  #colorbarsize, #colorbarType').on('change', function(){
                changeColorbarMapSize();
                redrawSampleColorbar();
        });

        function setColorbarLabel(variable,calculation,varUnits){
                /*-----------------*/
                /*  VAR SHORTNAME AND COLORBAR LABEL  */
                /*-----------------*/
                setVariableShortName(variable);
                colorbarLabel = variableShortName;
                if(calculation == 'anom'){
                        colorbarLabel = colorbarLabel + ' Difference from Average'
                }
                else if(calculation == 'anompercentof'){
                        colorbarLabel = colorbarLabel + ' Percent of Average'
                }
                else if(calculation == 'anompercentchange'){
                        colorbarLabel = colorbarLabel + ' Percent Difference from Average'
                }

                if(varUnits != ''){
                        colorbarLabel = colorbarLabel+' ('+varUnits+')';
                }
                if(variable == 'TrueColor' || variable == 'FalseColor'){
                        colorbarLabel = ''
                }
                $('#colorbarLabel').val(colorbarLabel);
                if ($('#colorbarLabelOnMap')){
                    $('#colorbarLabelOnMap').html(colorbarLabel);
                }
        }

        /*--------------------------------------------*/
        /*       GET SET DEFAULT COLORBAR	      */
        /*--------------------------------------------*/
        function getsetDefaultColorbar(product,variable,calculation,units){
		  /*-----------------*/
		  /*   STATISTIC     */
		  /*-----------------*/
		  changeInStatistic(product,variable)
		  /*-----------------*/
		  /*  COLORBAR TYPE  */
		  /*-----------------*/
		  changeInColorbarType(variable,calculation);

		  /*-----------------*/
		  /*  UNITS  */
		  /*-----------------*/
		  varUnits = set_varUnits_display(variable,calculation,units);

		  /*-----------------*/
		  /*  VAR SHORTNAME AND COLORBAR LABEL  */
		  /*-----------------*/
		  setColorbarLabel(variable,calculation,varUnits);
		  /*-----------------*/
		  /* ATTEMPT AT DYNAMIC COLORBAR... DIDN"T WORK
		  /*-----------------*/
		   //Approx number of months in selection
		   //var dateStart = new Date($('#dateStart').val());
		   //var dateEnd = new Date($('#dateEnd').val());

		//can't make this dynamic because dynamic is really not working well
		   //numMonths = Math.ceil(Math.abs(dateEnd.getTime() - dateStart.getTime())/(1000*3600*24*30));
		  // numMonths = 3;


		/*-----------------*/
		/* COLORBAR LOOKUPS: MIN/MAX, SIZE/MAP
		/*-----------------*/
 		minColorbar=get_default_minColorbar(variable,calculation,units);
 		maxColorbar=get_default_maxColorbar(variable,calculation,units);
		$('#minColorbar').val(minColorbar);
		$('#maxColorbar').val(maxColorbar);

 		colorbarsize=get_default_colorbarsize(variable,calculation);
 		colorbarmap=get_default_colorbarmap(variable,calculation);

		$('#colorbarmap').val(colorbarmap);
		changeColorbarMapSize();
		$('#colorbarsize').val(colorbarsize);

	  	/*-----------------*/
		/*    MASK VALUES
		/*-----------------*/
		$('#maskMin').val(minColorbar);
		$('#maskMax').val(maxColorbar);
		//if reset colorbar, reset mask too
		$("input[name=mask][value='none']").prop("checked",true);
	  	/*-----------------*/
		/* REDRAW
		/*-----------------*/
	    redrawSampleColorbar();
};

