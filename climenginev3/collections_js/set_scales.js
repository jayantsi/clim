        /*--------------------------------------------*/
        /*      SCALE RESOLUTION    */
        /*--------------------------------------------*/
	 function set_form_scales(product){
		//console.log('setting form'+product);
		
                var ScalesList = scaleListList[product];
                replace_selectForm('#scale',ScalesList);
        }

        function getsetScale(product,variable) {
		if(product=='M' && variable=='LST_Day_1km'){
			product=product+'_'+variable;
		}
		var scale = window.scale_list[product]
                $('#scale').val(scale);
                return scale;
        };

