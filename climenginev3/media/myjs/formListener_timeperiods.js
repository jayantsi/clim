/*--------------------------------------------*/
/*      CHANGE OF SEASON LISTENER     */
/*--------------------------------------------*/
jQuery('#seasonFut').on('change', function(){
	season = jQuery('#seasonFut').val();
	if (season != 'custom'){
	    $('#monthStartFut').val(seasons[season][0]);
	    $('#dayStartFut').val(seasons[season][1]);
	    $('#monthEndFut').val(seasons[season][2]);
	    $('#dayEndFut').val(seasons[season][3]);
	}
});
jQuery('#season').on('change', function(){
	season = jQuery('#season').val();
	if (season != 'custom'){
	    $('#monthStart').val(seasons[season][0]);
	    $('#dayStart').val(seasons[season][1]);
	    $('#monthEnd').val(seasons[season][2]);
	    $('#dayEnd').val(seasons[season][3]);
	}
});
 jQuery('#season2').on('change', function(){
	season = jQuery('#season2').val();
	if (season != 'custom'){
	    $('#monthStart2').val(seasons[season][0]);
	    $('#dayStart2').val(seasons[season][1]);
	    $('#monthEnd2').val(seasons[season][2]);
	    $('#dayEnd2').val(seasons[season][3]);
	}
});
 jQuery('#monthStartFut,#monthEndFut,#dayStartFut,#dayEndFut').on('change', function(){
   $('#seasonFut').val('custom')
});
 jQuery('#monthStart,#monthEnd,#dayStart,#dayEnd').on('change', function(){
   $('#season').val('custom')
});
 jQuery('#monthStart2,#monthEnd2,#dayStart2,#dayEnd2').on('change', function(){
   $('#season2').val('custom')
});

    /*--------------------------------------------*/
    /*       CHANGE IN START/END MONTH (INTERANNUAL)*/
    /*--------------------------------------------*/
    jQuery('#monthEnd').on('change', function(){
        var mon = $(this).val();
        var mon_len = mon_lens[mon];
        if ($('#timeperiodTS').val() == 'custom'){
            $('#dayEnd').val(mon_len);
        }
    });
    jQuery('#monthEnd2').on('change', function(){
        var mon = $(this).val();
        var mon_len = mon_lens[mon];
        if ($('#timeperiod2TS').val() == 'custom'){
            $('#dayEnd2').val(mon_len);
        }
    });
 	/*--------------------------------------------*/
        /*       CHANGE IN TIMEPERIOD      */
        /*--------------------------------------------*/
    function changeInTimePeriod(product,timeperiod,numvar) {
                //timeperiod = $('#timeperiod').val();
                //first determine the max date of the dataset
                var currentDate=getMaxDate(product);
		currentDate = new Date(currentDate);
                //var dateEnd = $('#maxDate').val(); //I believe this is an error
                var dateEnd = getMaxDate(product);

		//------------------------------
                if(timeperiod=='last15days'){
                        var dateStart = getDateMinusLag(dateEnd,15);
                }else if(timeperiod=='last30days'){
                        var dateStart=getDateMinusLag(dateEnd,30);
                }else if(timeperiod=='last60days'){
                        var dateStart=getDateMinusLag(dateEnd,60);
                }else if(timeperiod=='last90days'){
                        var dateStart=getDateMinusLag(dateEnd,90);
                }else if(timeperiod=='all'){
                        var dateStart=getMinDate(product);
		//------------------------------
		}else if (timeperiod =='nwy-todate' || timeperiod=='swy-todate'||timeperiod=='cy-todate'){
                        maxDate =new Date(getDateMinusLag(currentDate,0));
                        maxYear = maxDate.getFullYear();
                        year=maxYear;
			 if(timeperiod=='nwy-todate'){
                                maxSept = new Date(maxYear.toString()+'-09-30');
                                if (currentDate<maxSept){
                                        year = maxYear-2;
                                }else{
                                        year=maxYear-1;
                                }
                                var dateStart=year.toString()+'-10-01';
                                year=(parseInt(year)+1).toString();
                         }else if(timeperiod=='swy-todate'){
                                maxMar = new Date(maxYear.toString()+'-03-31');
                                if (currentDate<maxMar){
                                        year = maxYear-2;
                                }else{
                                        year=maxYear-1;
                                }
                                var dateStart=year.toString()+'-04-01';
                                year=(parseInt(year)+1).toString();
			}else if(timeperiod=='cy-todate'){
				year = maxYear;
                                var dateStart=year.toString()+'-01-01';
                                year=(parseInt(year)).toString();
			};
		//------------------------------
                }else{
                        //Determine the year of the last specified season
                        maxDate =new Date(getDateMinusLag(currentDate,0));
                        maxYear = maxDate.getFullYear();
                        year=maxYear;
			//------------------------------
                        if(timeperiod=='lastDJF'){
                                maxFeb = new Date(maxYear.toString()+'-02-28');
                                if (currentDate<maxFeb){
                                        year = maxYear-2;
                                }else{
                                        year=maxYear-1;
                                }
                                var dateStart=year.toString()+'-12-01';
                                year=(parseInt(year)+1).toString();
                                var dateEnd=year.toString()+'-02-28';
                        }else if(timeperiod=='lastMAM'){
                                maxMay = new Date(maxYear.toString()+'-05-31');
                                if (currentDate<maxMay){
                                        year=maxYear-1;
                                }
                                var dateStart=year.toString()+'-03-01';
                                var dateEnd=year.toString()+'-05-31';
                        }else if(timeperiod=='lastJJA'){
                                maxAug = new Date(maxYear.toString()+'-08-31');
                                if (currentDate<maxAug){
                                        year = maxYear-1;
                                }
                                var dateStart=year.toString()+'-06-01';
                                var dateEnd=year.toString()+'-08-31';
                        }else if(timeperiod=='lastSON'){
                                maxNov = new Date(maxYear.toString()+'-11-30');
                                if (currentDate<maxNov){
                                        year = maxYear-1;
                                }
                                var dateStart=year.toString()+'-09-01';
                                var dateEnd = year.toString()+'-11-30';
			//------------------------------
                        }else if(timeperiod=='lastANN'){
				var dateStart = getDateMinusYear(dateEnd);
                                //var dateStart = getDateMinusLag(dateEnd,364);
			//------------------------------
                        }else if(timeperiod=='lastWY'){
                                maxSept = new Date(maxYear.toString()+'-09-30');
                                if (currentDate<maxSept){
                                        year = maxYear-2;
                                }else{
                                        year=maxYear-1;
                                }
                                var dateStart=year.toString()+'-10-01';
                                year=(parseInt(year)+1).toString();
                                var dateEnd=year.toString()+'-09-30';
                         }else if(timeperiod=='lastWY-S'){
                                maxMar = new Date(maxYear.toString()+'-03-31');
                                if (currentDate<maxMar){
                                        year = maxYear-2;
                                }else{
                                        year=maxYear-1;
                                }
                                var dateStart=year.toString()+'-04-01';
                                year=(parseInt(year)+1).toString();
                                var dateEnd=year.toString()+'-03-31';
                          }else if(timeperiod=='lastGS'){
                                maxOct = new Date(maxYear.toString()+'-10-31');
                                if (currentDate<maxOct){
                                        year = maxYear-1;
                                }
                                var dateStart=year.toString()+'-04-01';
                                var dateEnd = year.toString()+'-10-31'
			}else if(timeperiod=='lastGS-S'){
                                maxMar = new Date(maxYear.toString()+'-03-31');
                                if (currentDate<maxMar){
                                        year = maxYear-2;
                                }else{
                                        year=maxYear-1;
                                }
                                var dateStart=year.toString()+'-11-01';
                                year=(parseInt(year)+1).toString();
                                var dateEnd=year.toString()+'-03-31';
			//------------------------------
                        }else if(timeperiod=='custom'){
                                var dateEnd=getMaxDate(product);
                                var dateStart=getMinDate(product);
                        }else if(timeperiod=='allYRS'){
                                var dateEnd=getMaxDate(product);
                                var dateStart=getMinDate(product);
                        }
                }
             if (numvar == 1){
                     if(timeperiod=='custom'){
                                //don't change the year range
                     }else{
                                $('#dateStart').val(dateStart);
                                $('#dateEnd').val(dateEnd);
                    		$('#dateStartTS').val(dateStart);
                   		 $('#dateEndTS').val(dateEnd);
                    }
            }
            if (numvar == 2){
                if(timeperiod=='custom'){
                                //don't change the year range
                }else{
                       $('#dateStart2TS').val(dateStart);
                       $('#dateEnd2TS').val(dateEnd);

                }
            }
        };




