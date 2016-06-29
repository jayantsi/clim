        /*--------------------------------------------*/
        /*     CALCULATION CHANGE                     */
        /*--------------------------------------------*/
            function changeInCalculation(calculation) {
                  if(calculation=='value'){
                         jQuery('.climatologyYears').hide();
                  }else{
                         jQuery('.climatologyYears').show();
                  }

                var variable = $('#variable').val()
                var units = $('#units').val()
                var product = $('#product').val()
                getsetDefaultColorbar(product,variable,calculation,units);
		if(calculation=='anompercentof'){
                        $('.colorbarMinMaxChoices').css('display','none');
                        $('.colorbarSizeChoices').css('display','none');
                        $('#colorbarType').val('discrete');
                        changeColorbarTicks();
                        $('.colorbarType').css('display','none');
                        //$('.colorbarType').css('display','inline');

                }else{
                        $('.colorbarMinMaxChoices').css('display','inline');
                        $('.colorbarSizeChoices').css('display','inline');
                        $('.colorbarType').css('display','inline');
                };


		varUnits=set_varUnits_display(variable,calculation,units);

                product=$('#product').val();
                if(product=='MACA'||product=='NASANEX'){
                        if(calculation=='clim'){
                                $('.histYearRange').css('display','inline');
                                $('.futYearRange').css('display','none');
                        }else if(calculation=='values'){
                                $('.histYearRange').css('display','none');
                                $('.futYearRange').css('display','inline');
                        }else{
                                $('.histYearRange').css('display','inline');
                                $('.futYearRange').css('display','inline');
                        }
                };

          };

        /*--------------------------------------------*/
        /*      CHANGE IN STATISTIC     */
        /*--------------------------------------------*/
        function changeInStatistic(product,variable) {
		statistic = get_defaultStatistic(product,variable);

                $('#statistic').val(statistic);
                $('#statisticTS').val(statistic);
                $('.statistic').val(statistic);
                $('.statisticTS').val(statistic);
        };


