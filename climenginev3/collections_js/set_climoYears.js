        /*--------------------------------------------*/
        function setClimatologyYears(product,numvar) {
                if(numvar==1){
                        initializeClimatologyYears(window.yearRangeClim[product][0],window.yearRangeClim[product][1]);
			$('#yearStartClim').val(window.default_yearRangeClim[product][0]);
			$('#yearEndClim').val(window.default_yearRangeClim[product][1]);
                }
                yearStart = valid_date_ranges[product][0].substr(0,4);
                yearEnd = valid_date_ranges[product][1].substr(0,4);
                if(yearEnd=='Pres'){
                        yearEnd=window.currentYear;
                }
                initializeYears(yearStart,yearEnd,numvar);
                initializeYearTarget(yearStart,yearEnd,numvar);
        }
