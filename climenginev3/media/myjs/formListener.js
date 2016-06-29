	function replace_selectForm(listID,ValuesList){
	//i.e. replace_selectForm(ScalesList,'#scale');
       	jQuery(listID+' > option').remove();
	 for (var key in ValuesList) {
                    var value = ValuesList[key];
                    var myString = '<option value="' + key + '">' + value + '</option>';
                    jQuery(listID).append(myString);
                }
	};
	/*--------------------------------------------*/
        /*      ADD VARIABLE 2 LISTENER     */
        /*--------------------------------------------*/
        jQuery('.plusAddVar').on('click', function(){
            //Duplicate variableTS into variableTS2
            $('#var2TS').show();
            $('#addvar2').hide();
            $('#variable2display').val('block');
        });
        jQuery('.minusAddVar').on('click', function(){
            $('#var2TS').hide();
            $('#addvar2').show();
            $('#variable2display').val('none');
        });

	jQuery('#variable2display').on('change',function(){
               var variable2display = $('#variable2display').val();
		if(variable2display=='none'){
                       //One variable analysis
			$('.twoproducts').hide();
			$('.add').show();
		    if ($('#subDomainTypeTS').val() == 'points'){
			if (window.showing_marker_ids.length > 0){
			    for (var j = 0; j< window.showing_marker_ids.length;j++){
				 $('#point' + String(window.showing_marker_ids[j])).show();
				 $('#p' + String(window.showing_marker_ids[j])+'display').val('block');
				 window.markers[window.showing_marker_ids[j] - 1 ].setVisible(true);
			    }
			}
		    }
		    else{
			if (window.showing_fusion_table_ids.length > 0){
			    for (var j = 0; j< window.showing_fusion_table_ids.length;j++){
				 $('#fusiontable' + String(window.showing_fusion_table_ids[j])).show();
				 $('#ft' + String(window.showing_marker_ids[j])+'display').val('block');
				 //FIX ME: this is not working right now
				 //Help me, Katherine  :-)
				 window.fusion_tables[window.showing_marker_ids[j] - 1].setMap(window.map);
			    }
			}
			if (window.showing_polygon_ids.length > 0){
			    for (var j = 0; j< window.showing_polygon_ids.length;j++){
				 $('#fusiontable' + String(window.showing_polygon_ids[j])).show();
				 $('#ft' + String(window.showing_polygon_ids[j])+'display').val('block');
				window.polygons[window.showing_polygon_ids[j] - 1].setVisible(true);
			    }
			}
           	   }
		}
        else{
            //Two products, need to hide all other markers/ft/polygons other than the first one
			$('.twoproducts').show();
			$('.add').hide();
            //Hide fusiontables/points 2-5,
            //Store the layers that are currently
            //visible on the map in global variables windows.showing_<marker/polygon/fusion_table>_ids
            //So that they can be shown again on the map if user switches back to single variable analysis
            window.showing_marker_ids = [];
            window.showing_fusion_table_ids = [];
            window.showing_polygon_ids = [];
            for (var id=2;id<=5;id++){
                if ($('#subDomainTypeTS').val() == 'points'){
                    $('#point' + String(id)).hide();
                    $('#p' + String(id)+'display').val('none');
                    if (window.markers.length > id){
                        if (window.markers[id-1].getVisible() == true){
                            window.showing_marker_ids.push(id);
                        }
                        window.markers[id-1].setVisible(false);
                    }
                }
                else{
                    $('#fusiontable' + String(id)).hide();
                    $('#ft' + String(id)+'display').val('none');
                    if (window.fusion_tables.length > id && window.fusion_tables[id-1] != null){
                        //FIX ME: ft.getMap ygives error and so does getVisible()
                        try {
                            if (window.fusion_tables[id-1].getMap()){
                                window.showing_fusion_table_ids.push(id);
                            }

                            window.fusion_tables[id -1].setMap(null);
                        }catch(e){}
                    }
                    $('#polygon' + String(id)).hide();
                    if (window.polygons.length > id && window.polygons[id-1] != null){
                        if (window.polygons[id-1].getVisible() == true){
                            window.showing_polygon_ids.push(id);
                        }
                        window.polygons[id -1].setVisible(false);
                    }
                }
            }
		}
	});

        /*--------------------------------------------*/
        /*      YEARSTART/END LISTENER     */
        /*--------------------------------------------*/
        jQuery('#yearStartClimFut').on('change', function(){

		    yearStartClimFut=$('#yearStartClimFut').val();
		    yearEndClimFut = parseInt(yearStartClimFut) + 30;
                    if(yearEndClimFut>2099){
			yearEndClimFut = 2099;
		    }

		    $('#yearEndClimFut').val(String(yearEndClimFut));

		});
        jQuery('#yearStart').on('change', function(){
                var yearEnd = parseInt($('#yearEnd').val());
                if (parseInt($(this).val()) > yearEnd){
                    try {
                        $('#yearEnd').val($(this).val());
                    }
                    catch (e){}
                }
        });

        jQuery('#yearEnd').on('change', function(){
            var yearStart = parseInt($('#yearStart').val());
            if (parseInt($(this).val()) < yearStart){
                try {
                    $('#yearStart').val($(this).val());
                }
                catch (e){}
            }
        });

		/*--------------------------------------------*/
		/*      INITIALIZE YEARS  		     */
		/*--------------------------------------------*/
	     function initializeYears(yearStart,yearEnd,numvar){
		if(numvar==1){
		        var minYear = $('#minDate').val().slice(0,4);
		        var maxYear = $('#maxDate').val().slice(0,4);
            	        jQuery('#yearStart > option').remove();
			jQuery('#yearEnd > option').remove();
			for (yrString=minYear; yrString<=maxYear; yrString++) {
			      var myString = '<option value="' + yrString + '">' + yrString + '</option>';
			      jQuery('#yearStart').append(myString);
			      jQuery('#yearEnd').append(myString);
				}
			$('#yearStart').val(yearStart);
			$('#yearEnd').val(yearEnd);
		}else if(numvar==2){
                        var minYear = $('#minDate2').val().slice(0,4);
                        var maxYear = $('#maxDate2').val().slice(0,4);

			jQuery('#yearStart2 > option').remove();
			jQuery('#yearEnd2 > option').remove();
			for (yrString=minYear; yrString<=maxYear; yrString++) {
			      var myString = '<option value="' + yrString + '">' + yrString + '</option>';
			      jQuery('#yearStart2').append(myString);
			      jQuery('#yearEnd2').append(myString);
				}
			$('#yearStart2').val(yearStart);
			$('#yearEnd2').val(yearEnd);
		}
	    }


         /*--------------------------------------------*/
        /*     GET CURRENT DATE MINUS ___ LAG     */
        /*--------------------------------------------*/
        function getCurrentDateMinusLag(daysLag) {
                thisDate = new Date();
                thisDate.setDate(thisDate.getDate()-daysLag);
                year = thisDate.getFullYear();
                mm = thisDate.getMonth()+1; //Jan is 0
                dd = thisDate.getDate();
                if(dd<10){
                   dd='0'+dd;
                }
                if(mm<10){
                   mm='0'+mm;
                }
                lagDate=year+'-'+mm+'-'+dd;
                return lagDate;
        }
 	/*--------------------------------------------*/
        /*     GET DATE MINUS ___ LAG     */
        /*--------------------------------------------*/
        function getDateMinusLag(thisDate,daysLag) {
                thisDate = new Date(thisDate);
                thisDate.setDate(thisDate.getDate()-daysLag);
                year = thisDate.getFullYear();
                mm = thisDate.getMonth()+1; //Jan is 0
                dd = thisDate.getDate();
                if(dd<10){
                   dd='0'+dd;
                }
                if(mm<10){
                   mm='0'+mm;
                }
                lagDate=year+'-'+mm+'-'+dd;
                return lagDate;
        }

	 function getDateMinusYear(thisDate) {
                thisDate = new Date(thisDate);
                //thisDate.setDate(thisDate.getDate()-daysLag);
                thisDate.setFullYear(thisDate.getFullYear() - 1);
                thisDate.setDate(thisDate.getDate()+2);
                year = thisDate.getFullYear();
                mm = thisDate.getMonth()+1; //Jan is 0
                dd = thisDate.getDate();
                if(dd<10){
                   dd='0'+dd;
                }
                if(mm<10){
                   mm='0'+mm;
                }
                lagDate=year+'-'+mm+'-'+dd;
                return lagDate;
        }



	/*--------------------------------------------*/
	/*      DAYS BETWEEN                           */
	/*--------------------------------------------*/
	    //computes number of days between two date strings
	    function daysBetween( date1, date2 ) {
		//Get 1 day in milliseconds
		var one_day=1000*60*60*24;

		// Convert both dates to milliseconds
		var date1_ms = new Date(date1).getTime();
		var date2_ms = new Date(date2).getTime();

		// Calculate the difference in milliseconds
		var difference_ms = date2_ms - date1_ms;

		// Convert back to days and return
		return Math.round(difference_ms/one_day);
	    }

	/*--------------------------------------------*/
	/*      FIND YEAR                           */
	/*--------------------------------------------*/
	    //For interannual
	    function find_year(date_str,n_or_p){
		//Format date string for js DAte
		djs = date_str.split('-');
		djs = djs[0] + '-' + String(parseInt(djs[1])) + '-' + String(parseInt(djs[2]));
		//Compute one year from date_str for interannual
		if (n_or_p == 'previous'){
		    var d = new Date(new Date(djs).setYear(new Date(djs).getFullYear() - 1));
		}
		else{
		    var d = new Date(new Date(djs).setYear(new Date(djs).getFullYear() + 1));
		}
		var day = ("0" + d.getDate()).slice(-2);
		var mon = ("0" + (d.getMonth() + 1)).slice(-2);
		var year = d.getFullYear();
		return year + '-' + mon + '-' + day;
	    }

	/*--------------------------------------------*/
	/*      SET DATEPICKER                           */
	/*--------------------------------------------*/
	    function setDatePicker(product,numvar) {

		minDate=getMinDate(product);
		maxDate=getMaxDate(product);

		if(numvar==1){
			numvar_char = '';
		}else if(numvar==2){
			numvar_char='2';
		};

		$('#minDate'+numvar_char).val(minDate);
		$('#maxDate'+numvar_char).val(maxDate);

		//get yearRange
 		minYear = minDate.substr(0,4);
                maxYear = maxDate.substr(0,4);
		$('#minYear'+numvar_char).val(minYear);
		$('#maxYear'+numvar_char).val(maxYear);
                var yearRange = minYear + ':'+maxYear;

		//set datepicker values
		if(numvar==1){
			$('.dateStart').datepicker( "option", "minDate", minDate);
			$('.dateStart').datepicker( "option", "maxDate", maxDate);
			$('.dateStart').datepicker( "option", "yearRange", yearRange);
			$('.dateEnd').datepicker( "option", "minDate", minDate);
			$('.dateEnd').datepicker( "option", "maxDate", maxDate);
			$('.dateEnd').datepicker( "option", "yearRange",yearRange);
		};
		$('.dateStart'+numvar_char+'TS').datepicker( "option", "minDate", minDate);
		$('.dateStart'+numvar_char+'TS').datepicker( "option", "maxDate", maxDate);
		$('.dateStart'+numvar_char+'TS').datepicker( "option", "yearRange", yearRange);
		$('.dateEnd'+numvar_char+'TS').datepicker( "option", "minDate", minDate);
		$('.dateEnd'+numvar_char+'TS').datepicker( "option", "maxDate", maxDate);
		$('.dateEnd'+numvar_char+'TS').datepicker( "option", "yearRange",yearRange);
	   }

	/*--------------------------------------------*/
	/*     UPDATE DATE AVAILABLE 		      */
	/*--------------------------------------------*/
	function update_date_availability(product,numvar){

                availText = '(Data:'+valid_date_ranges[product][0]+' to '+
                                valid_date_ranges[product][1]+')';
                if(numvar==1){
                        $('.dataAvailability').html(availText);
                }else{
                        $('.dataAvailability2').html(availText);
                }
	};
	/*--------------------------------------------*/
	/*     INITIALIZE FORM DISPLAY     		      */
	/*--------------------------------------------*/
	 function initializeProductDisplay(product, numvar) {
                if (numvar==1){
		        $('.historical').css('display','block');
			$('.maca').css('display','none');
		}else if(numvar==2){
			$('.maca-var2').css('display','none');
		}
		$('.histYearRange').css('display','inline');
		$('.futYearRange').css('display','inline');
                $('#dayStartFut').css('display','none');
                $('#dayEndFut').css('display','none');

		//set scales
               if(numvar==1){
			set_form_scales(product);
		};

		//set variables
		set_form_variables(product,numvar);
                variable=window.default_variable[product];
                 if(numvar==1){
                        $('#variable').val(variable);
                        $('#variableTS').val(variable);
                }else if(numvar==2){
                        $('#variable2TS').val(variable);
                }
		update_date_availability(product,numvar);

		if(product=='MACA' || product=='NASANEX'){
			//set displays
			if(numvar==1){
                        	$('.maca').css('display','inline');
			}else if (numvar==2){
                        	$('.maca-var2').css('display','inline');
			};
			var calculation=$('#calculation').val();
                        if(calculation=='clim'){
                                $('.histYearRange').css('display','inline');
                                $('.futYearRange').css('display','none');
                        }else if(calculation=='value'){
                                $('.histYearRange').css('display','none');
                                $('.futYearRange').css('display','inline');
                        }else{
                                $('.histYearRange').css('display','inline');
                                $('.futYearRange').css('display','inline');
                        };
			 $('#timeperiod').val(default_timeperiod[product]);

                        $('.historical').css('display','none');
                        $('#dayStartFut').css('display','none');
                        $('#dayEndFut').css('display','none');

			//monthly data..start of startmonth  to end of endmonth
			$('#dayStartFut').val('1');
			$('#dayEndFut').val('28');

			//set model
			set_form_models(product,numvar);
			model=window.default_model[product]
			if(numvar==1){
				$('#model').val(model);
				$('#modelTS').val(model);
			}else if (numvar==2){
				$('#model2TS').val(model);
			};

			//set scenario
			set_form_scenarios(product,numvar);
			 scenario='rcp85';
			$('#scenario').val(scenario);
			changeInScenario(scenario);

		};
		yearStartClimFut = window.default_yearStartClimFut[product];
		yearEndClimFut = window.default_yearEndClimFut[product];
		$('#yearStartClimFut').val(yearStartClimFut);
		$('#yearEndClimFut').val(yearEndClimFut);
	}

	/*--------------------------------------------*/
	/*     CHANGE IN SCENARIO     		      */
	/*--------------------------------------------*/
	   jQuery('#scenario').on('change', function(){
		scenario=$('#scenario').val();
		changeInScenario(scenario);
	});
        function changeInScenario(scenario){
		//yearStartClim = window.valid_date_range_MACA[scenario][0].substr(0,4);
                //yearEndClim = window.valid_date_range_MACA[scenario][1].substr(0,4);
		yearStartClim = window.valid_date_range_NASANEX[scenario][0].substr(0,4);
                yearEndClim = window.valid_date_range_NASANEX[scenario][1].substr(0,4);
                jQuery('#yearStartClimFut > option').remove();
                jQuery('#yearEndClimFut > option').remove();
                for (yrString=yearStartClim; yrString<=yearEndClim; yrString++) {
                       var myString = '<option value="' + yrString + '">' + yrString + '</option>';
                       jQuery('#yearStartClimFut').append(myString);
                       jQuery('#yearEndClimFut').append(myString);
                }
	}

	/*--------------------------------------------*/
	/*     INITIALIZE VARIABLE DISPLAY     		      */
	/*--------------------------------------------*/
	/*want to split this into pieces using default_calculation, default_statistic in collections */
	 function initializeVariableDisplay(product, variable,numvar,calculation) {
		if(numvar==1){
			jQuery('#calculation > option').remove();
			jQuery('#calculationTS > option').remove();
			jQuery('#statistic > option').remove();
			jQuery('#statisticTS > option').remove();
		}else if(numvar==2){
			jQuery('#calculation2TS > option').remove();
			jQuery('#statistic2TS > option').remove();
		}

		statistic= get_defaultStatistic(product,variable);
		calculation=get_defaultCalculation(product,variable);

		CalculationList = get_CalculationList(product,variable);
		StatisticList = get_StatisticList(product,variable);
		 for (var key in CalculationList) {
		      var value = CalculationList[key];
		      var myString = '<option value="' + key + '">' + value + '</option>';
		      if(numvar==1){
			      jQuery('#calculation').append(myString);
			      jQuery('#calculationTS').append(myString);
		      }else if (numvar==2){
                      	jQuery('#calculation2TS').append(myString);
		      }
		}
		 for (var key in StatisticList) {
		      var value = StatisticList[key];
		      var myString = '<option value="' + key + '">' + value + '</option>';
		      if(numvar==1){
			      jQuery('#statistic').append(myString);
			      jQuery('#statisticTS').append(myString);
			}else if(numvar==2){
                      		jQuery('#statistic2TS').append(myString);
			}
		}
		if(numvar==1){
			$('#calculation').val(calculation);
			$('#calculationTS').val(calculation);
			$('#statistic').val(statistic);
			$('#statisticTS').val(statistic);
		}else if(numvar==2){
			$('#calculation2TS').val(calculation);
			$('#statistic2TS').val(statistic);
		}
		if(numvar==1){
			units = $('#units').val();
		        varUnits = set_varUnits_display(variable,calculation,units);
			varUnits=$('#varUnits').val();
			setColorbarLabel(variable,calculation,varUnits);
		};

	}

	/*--------------------------------------------*/
	/*      RESET FORM DISPLAY     		      */
	/*--------------------------------------------*/
	function resetFormDisplay(product, numvar) {

		initializeProductDisplay(product, numvar);
		if (numvar == 1){
			var variable=$('#variable').val();
			changeInVariable(product,variable);
		}
		if (numvar == 2){
		     var variable=$('#variable2TS').val();
		    changeInVariable2(product,variable);
		}
		calculation = $('#calculation').val();
		changeInCalculation(calculation);

		changeInStatistic(product,variable);

		changeColorbarMapSize();
	};

	/*--------------------------------------------*/
	/*      CLIMATOLOGY YEARS     */
	/* seems that we should be accessing arry in dataStore here */
	/*--------------------------------------------*/
     function initializeClimatologyYears(yearStartClim,yearEndClim){
	jQuery('#yearStartClim > option').remove();
                jQuery('#yearEndClim > option').remove();
                for (yrString=yearStartClim; yrString<=yearEndClim; yrString++) {
                      var myString = '<option value="' + yrString + '">' + yrString + '</option>';
                      jQuery('#yearStartClim').append(myString);
                      jQuery('#yearEndClim').append(myString);
                        }
    }

    /*--------------------------------------------*/
    /*       TARGET YEAR (INTRAANNUAL)     */
    /*--------------------------------------------*/
    function setYearTarget(product, numvar) {
        var yearTarget = parseInt($('#yearTargetForm').val());
        var vd_start = parseInt(valid_date_ranges[product][0].slice(0,4));
        var vd_end = valid_date_ranges[product][1];
        if (vd_end == 'Present'){
            var thisDate = new Date();
            thisDate.setDate(thisDate.getDate());
            vd_end = thisDate.getFullYear();
        }
        else{
            vd_end = parseInt(vd_end.slice(0,4));
        }

        if (vd_start <= yearTarget && yearTarget <= vd_end){
        }
        else {
            $('.yearTarget').val(String(vd_start));
            $('#yearTargetForm').val(String(vd_start));
        }
    }

    function initializeYearTarget(yearStart,yearEnd,numvar){
	    if(numvar==1){
		    jQuery('#yearTargetData> option').remove();
		    jQuery('#yearTargetFigure > option').remove();
	     }else if (numvar==2){
 	        jQuery('#yearTarget2Data > option').remove();
	     }
	    //if current date is < start Day... don't include this year
        todayDate = getCurrentDateMinusLag(2);
        var startDate = new Date();
	    monthStart = $('#monthStart').val()
	    dayStart = $('#dayStart').val()
	    startDate = String(yearEnd)+'-'+String(monthStart)+'-'+String(dayStart);
	    if(Date.parse(todayDate)<Date.parse(startDate)){
		    yearEnd = yearEnd-1;
	    }

        for (yrString=yearStart; yrString<=yearEnd; yrString++) {
            var myString = '<option value="' + yrString + '">' + yrString + '</option>';
			if(numvar==1){
				jQuery('#yearTargetData').append(myString);
				jQuery('#yearTargetFigure').append(myString);
			}else if(numvar==2){
				jQuery('#yearTarget2Data').append(myString);
			}
        }
        if(numvar==1){
		    $('#yearTargetFigure').val($('#yearTargetForm').val());
		    $('#yearTargetData').val($('#yearTargetForm').val());
        }
        if(numvar==2){
            $('#yearTarget2Data').val($('#yearTargetForm').val());
        }
	}


	/*--------------------------------------------*/
	/*      GET SET MIN DATE                     */
	/*--------------------------------------------*/
	function getMinDate(product) {
                minDate=valid_date_ranges[product][0]
                return minDate;
	}
	/*--------------------------------------------*/
        /*      GET SET MAX DATE    */
        /*--------------------------------------------*/
        function getMaxDate(product) {
                maxDate=valid_date_ranges[product][1]
                return maxDate;
        }

	/*--------------------------------------------*/
	/*        TIMESERIES  LISTENER 		      */
	/*--------------------------------------------*/
    jQuery('#timeSeriesCalc').on('change', function(){
		/*--------------------------------------------*/
		/*        INTERANNUAL     		      */
		/*--------------------------------------------*/
        if($(this).val()=='interannual'){
		 $('.intrannualoptions').hide();
                 $('.daytimeperiod').hide();
                 $('.yeartimeperiod').hide();
                 $('.seasontimeperiod').show();
                 $('.statisticChoice').show();
                 if ($('#subDomainTypeTS').val() == 'points'){ 
                    //Hide all other points but first one
                    $('.point').each(function(){
                        var point_idx = parseInt($(this).attr('id').slice(-1));
                        if (point_idx === 1){
                            $(this).css('display','block');
                        }
                        else {
                            $(this).css('display','none');
                            window.markers[point_idx-1].setVisible(false);
                        }
                    });
                    //Hide plus button on first point
                    $('#pl2').css('display','none');
                 }
                 if ($('#subDomainTypeTS').val() == 'customShapes'){
                    //Hide all other fusion tables but first one
                    $('.fusiontable').each(function(){
                        var ft_idx = parseInt($(this).attr('id').slice(-1));
                        if (ft_idx === 1){
                            $(this).css('display','block');
                        }
                        else {
                            $(this).css('display','none');
                            window.fusion_tables[ft_idx-1].setVisible(false);
                        }
                    });
                    //Hide plus button on first fusion table
                    $('#pl_ft2').css('display','none');
                 } 
                //Enable endDate (is disabled for intraannual)
                $('#dateEndTS').prop('disabled',false);
		        $('.timeperiodTS').hide();
		        $('.timeperiod2TS').hide();

		        var product = $('#productTS').val();
		        //var timeperiod = $('#timeperiodTS').val();
		        //setClimatologyYears(product,1);
		        var product2 = $('#product2TS').val();
		        setClimatologyYears(product2,2);

		/*--------------------------------------------*/
		/*      RANGE OF DAYS     		      */
		/*--------------------------------------------*/
	    }else if($(this).val()=='days'){
		    $('.intrannualoptions').hide();
		    $('.seasontimeperiod').hide();
		    $('.yeartimeperiod').hide();
		    $('.statisticChoice').hide();
		    $('.daytimeperiod').show();
		    $('.timeperiodTS').show();
		    $('.timeperiod2TS').show();
            if ($('#subDomainTypeTS').val() == 'points'){
                //Show plus button on first point
                $('#pl2').css('display','inline');
                //Show all add buttons
                $('.add').each(function(){
                    $(this).css('display','inline');
                });
            }
            if ($('#subDomainTypeTS').val() == 'customShapes'){
                //Show plus button on first point
                $('#pl2_ft').css('display','inline');
                //Show all add buttons
                $('.add').each(function(){
                    $(this).css('display','inline');
                });
            }
            //Enable endDate (is disabled for intraannual)
            $('#dateEndTS').prop('disabled',false);

		    var product = $('#productTS').val();
		    var timeperiod = $('#timeperiodTS').val();
		    changeInTimePeriod(product,timeperiod,1);

        	product = $('#product2TS').val();
       		timeperiod = $('#timeperiod2TS').val();
        	changeInTimePeriod(product,timeperiod,2);
		/*--------------------------------------------*/
		/*  	INTERANNUAL         		      */
		/*--------------------------------------------*/
	    }else if ($(this).val() =='intraannual'){
		    $('.intrannualoptions').show();
		    $('.seasontimeperiod').hide();
		    $('.daytimeperiod').hide();
		    $('.statisticChoice').hide();
		    $('.timeperiodTS').hide();
		    $('.timeperiod2TS').hide();
		    $('.yeartimeperiod').show();


		    //Show appropriate running mean options
		    if ($('#showRunningMean').val() == 'T'){
			$('#rmDays').css('display','block');
			$('#rmYears').css('display','none');
		     }
		    else{
			$('#rmYears').css('display','none');
			$('#rmDays').css('display','none');
		    }

		    //Hide all other points but first one
		    /*
            $('.point').each(function(){
			var point_idx = parseInt($(this).attr('id').slice(-1));
			if (point_idx === 1){
			    $(this).css('display','block');
			}
			else{
			    $(this).css('display','none');
			    window.markers[point_idx-1].setVisible(false);
			}
		    });
		    //Hide plus button on first point
		    $('#pl2').css('display','none');
            */
            if ($('#subDomainTypeTS').val() == 'points'){
                    //Hide all other points but first one
                    $('.point').each(function(){
                        var point_idx = parseInt($(this).attr('id').slice(-1));
                        if (point_idx === 1){
                            $(this).css('display','block');
                        }
                        else {
                            $(this).css('display','none');
                            window.markers[point_idx-1].setVisible(false);
                        }
                    });
                    //Hide plus button on first point
                    $('#pl2').css('display','none');
                 }
                 if ($('#subDomainTypeTS').val() == 'customShapes'){
                    //Hide all other fusion tables but first one
                    $('.fusiontable').each(function(){
                        var ft_idx = parseInt($(this).attr('id').slice(-1));
                        if (ft_idx === 1){
                            $(this).css('display','block');
                        }
                        else {
                            $(this).css('display','none');
                            window.fusion_tables[ft_idx-1].setVisible(false);
                        }
                    });
                    //Hide plus button on first fusion table
                    $('#pl_ft2').css('display','none');
                 }

	    }
    });
	/*--------------------------------------------*/
        /*        TIMESERIES ACCORDION LISTENERS      */
        /*--------------------------------------------*/
        /*Show markers only if time series option is expanded*/
        /*jQuery('#accordionBUILDTIMESERIES').on('hidden.bs.collapse', function (e) {     //for accordion*/
        /*jQuery('#tab2mapoptions,#tabmaprequired,#tabmapoptions').on('show.bs.tab', function (e) {*/
        jQuery('[data-toggle="tab"]').on('show.bs.tab', function (e) {
                var target = $(e.target).attr("href") // activated tab
                if(target=='#tabmapoptions' || target=='#tabblank'){
                        $('#showRect').attr('checked', false);
                        try {
                            window.rectangle.setMap(null);
                        }
                        catch(e){}
                        //$('#collapseDownMapOptions').collapse('hide');
                         //Hide all markers
                        for (var i=0;i<window.markers.length;i++){
                            window.markers[i].setVisible(false);
                        };
                }else if(target=='#tabtimeseriesoptions'){
			if(!userHasSeenTimeSeriesTab){
				userHasSeenTimeSeriesTab='true';

			}



			var product = $('#product').val();

                        $('#showRect').attr('checked', false);
                        window.rectangle.setMap(null);
                        var point_id,LongLat,Lat,Long,latlong;
                        $('.point').each(function() {
                            point_id = parseFloat($(this).attr('id').split('point')[1]);
                            if ($(this).css('display') == 'block' && $('#check' + String(point_id)).is(':checked')){
                                LongLat = String($('#p' + String(point_id)).val()).replace(' ','');
                                Long = parseFloat(LongLat.split(',')[0]);
                                Lat = parseFloat(LongLat.split(',')[1]);
                                latlong = new google.maps.LatLng(Lat,Long);
                                //Update marker on map
                                window.markers[point_id-1].position = latlong;
                                window.markers[point_id-1].setVisible(true);
                            };
                        });

                };
        });

        jQuery('#accordionDOWNMAP').on('hidden.bs.collapse', function (e) {
                        if(window.rectangle){
                                window.rectangle.setMap(null);
                        }
                        if(window.infomarker){
                                window.infomarker.setMap(null); //removes the infomarker
                        }
                        $('#showValue').attr('checked', false);
                        $('#showRect').attr('checked', false);
        });
