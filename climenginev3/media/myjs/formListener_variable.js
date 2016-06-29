	/*--------------------------------------------*/
        /*     UNITS CHANGE                     */
        /*--------------------------------------------*/
            function changeInUnits(variable){
                var calculation = $('#calculation').val()
                var units = $('#units').val()

                var product = $('#product').val()

		//have to hard code % for these..
       		varUnits=set_varUnits_display(variable,calculation,units);

                getsetDefaultColorbar(product,variable,calculation,units);
          };
        /*--------------------------------------------*/
        /*      SET VARIABLE SHORT NAME               */
        /*--------------------------------------------*/
        function setVariableShortName(variable){
                variableShortName = variableShortName_list[variable];
        }
        /*--------------------------------------------*/
        /*      VARIABLE CHANGE                       */
        /*--------------------------------------------*/
        function changeInVariable(product,variable) {
                numvar = 1;

                if(product == 'M'){
                         change_valid_date_range(product,variable);
                };
                update_date_availability(product,numvar);

                getsetScale(product,variable);

                var calculation = $('#calculation').val()
                initializeVariableDisplay(product, variable,numvar,calculation);
                var units = $('#units').val()

                getsetDefaultColorbar(product,variable,calculation,units);
                changeInStatistic(product,variable)

                //need to clear map information if variable changed
                $('#mapid').val('');
                $('#token').val('');

                getsetScale(product,variable);
                setDatePicker(product,1);
                setClimatologyYears(product,1);
                if (numvar == 1){
                        timeperiod = $('#timeperiod').val();
                }else if (numvar == 2){
                        timeperiod = $('#timeperiod2TS').val();
                }
                changeInTimePeriod(product,timeperiod, numvar);
                varUnits = $('#varUnits').val();
		$('.varUnits').html(varUnits);
          }
	 /*--------------------------------------------*/
        /*      VARIABLE 2 CHANGE                           */
        /*--------------------------------------------*/
        function changeInVariable2(product,variable) {
                numvar=2;
                if(product=='M'){
                         change_valid_date_range(product,variable);
                };
                update_date_availability(product,numvar);

                var calculation = $('#calculation2TS').val()
                initializeVariableDisplay(product, variable,numvar);
                var units = $('#units').val()

		if(units=='metric'){
                       varUnits=units_metric[variable];
                }else if(units=='english'){
                       varUnits=units_english[variable];
                 }
                $('#var2UnitsTS').val(varUnits);

                setDatePicker(product,2);
                setClimatologyYears(product,2);
                 if (numvar ==1 ){
                        timeperiod=$('#timeperiod').val();
                 }else if (numvar == 2){
                    timeperiod=$('#timeperiod2TS').val();
                  }
                changeInTimePeriod(product,timeperiod, numvar);

          }
