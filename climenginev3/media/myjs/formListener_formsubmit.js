    /*--------------------------------------------*/
    /*        UTILITY FUNCTIONS              */
    /*--------------------------------------------*/
    String.prototype.inList=function(list){
        return ( list.indexOf(this.toString()) != -1)
    }
	/*--------------------------------------------*/
	/*      FORM SUBMIT FUNCTIONS                          */
	/*--------------------------------------------*/
    //On map or time series form submit
      //We need to update linked variables in the other form
    jQuery('#form_all').submit(function(event) {
        if ($('#toolAction').val() =='showSingleValueOnMap'){ 
            event.preventDefault(); 
        }
        
	//==============================
        //Update LongLats for points
	//==============================
		var LongLatStr = '';
		$('.point').each(function() {
		    point_id = parseInt($(this).attr('id').split('point')[1]);
		    if ($(this).css('display') !='none' && $('#check' + String(point_id)).is(':checked')) {
			//Update hidden check variables for display and checkbox
			$('#p' + String(point_id) + 'check').val('checked');
			$('#p' + String(point_id) + 'display').val('block');
			//Point visible and checkbox checked, add to pointsLongLat variable
			LongLat = String($('#p' + String(point_id)).val()).replace(' ','');
			Long = parseFloat(LongLat.split(',')[0]);
			Lat = parseFloat(LongLat.split(',')[1]);
			//Update LongLat string
			if (LongLatStr != '') {
			    LongLatStr+=',' + LongLat;
			}
			else{
			    LongLatStr+=LongLat;
			}
		    }
		    else {
			//Update hidden variables for display and checkbox
			if ($(this).css('display') == 'none'){
			    $('#p' + String(point_id) + 'display').val('none');
			}
			if ($('#check' + String(point_id)).not(':checked')){
			    $('#p' + String(point_id) + 'check').val('checked');
			}
		    }
		});
		//Update pointsLongLat
		$('#pointsLongLat').val(LongLatStr);

	//==============================
        //Update for fusion tables 
	//==============================
    //Set hidden variables
	$('.fusiontable').each(function() {
            ft_id = parseInt($(this).attr('id').split('fusiontable')[1]);
            //Safety check for ft checkbox
            //If the user forgets to click the checkbox, it will be checked on form submit
            if ( $('#toolAction').val() == 'getTimeSeriesOverDateRange' &&  $('#subDomainTypeTS').val() != 'points'){ 
                if (ft_id == 1 && !$('#checkft' + String(ft_id)).is(':checked')){
                    $('#checkft' + String(ft_id)).attr('checked','checked');
                }
            }
		    table_name = $('#ftSubChoice'+String(ft_id)).val();
            table_id = $('#ft' + String(ft_id)).val();
            if ($(this).css('display') !='none' && $('#checkft' + String(ft_id)).is(':checked')) {
                //Update hidden check variables for display and checkbox
			    $('#ft' + String(ft_id) + 'check').val('checked');
			    $('#ft' + String(ft_id) + 'display').val('block');
		    }
		    else {
			    //Update hidden variables for display and checkbox
			    if ($(this).css('display') == 'none'){
			        $('#ft' + String(ft_id) + 'display').val('none');
			    }
			    if ($('#checkft' + String(ft_id)).not(':checked')){
			        $('#ft' + String(ft_id) + 'check').val('');
			    }
		    }
		});
    });
