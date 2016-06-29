    /*--------------------------------------------*/
    /*      PRODUCT TYPE CHANGE                   */
    /*--------------------------------------------*/
    function changeInProductType(productType,numvar){ 
        ProductList = getProductList(numvar);
        var value,myString, optgroup;
        var prod = '#product', prodTS;
        if(numvar == 1){
            prodTS = '#productTS';
            $('#product > option').remove();
        }
        if(numvar == 2){
            prodTS = '#product2TS';
        }
        $(prodTS + ' > option').remove();
	//clear all optgroups from dropdown
	 $("#product").children().remove("optgroup");

        for (var key in ProductList) {
	    if (key == 'M'){
                optgroup = '<optgroup label="MODIS">'
                if(numvar == 1){$('#product').append(optgroup);}
                $(prodTS).append(optgroup);
            };
            if (key == 'PFV52'){
                optgroup = '<optgroup label="AVHRR">'
                if(numvar == 1){$('#product').append(optgroup);}
                $(prodTS).append(optgroup);
            }; 
            if (key == 'L_SR'){
                optgroup = '<optgroup label="Landsat At-Surface Reflectance">'
                if(numvar == 1){$('#product').append(optgroup);}
                $(prodTS).append(optgroup);
            }
            if (key == 'L_TOA'){
                optgroup = '<optgroup label="Landsat Top-Of-Atmosphere Reflectance">'
                if(numvar == 1){$('#product').append(optgroup);}
                $(prodTS).append(optgroup);
            }
            value = ProductList[key];
            if (value.indexOf('Landsat') > -1){
                value = '&nbsp;&nbsp;&nbsp;' + value;
            }
	    if(key=='PFV52'||key=='M'){
                value = '&nbsp;&nbsp;&nbsp;' + value;
	    };
            myString = '<option value="' + key + '">' + value + '</option>';

	    if ($('#applicationName').val() == 'lakeMead'){
		 if (key == 'L5_TOA'){
			optgroup = '<optgroup label="Landsat Top-Of-Atmosphere Reflectance">'
			if(numvar == 1){$('#product').append(optgroup);}
			$(prodTS).append(optgroup);
		    }
		 if(numvar == 1){$('#product').append(myString);}
            	 $(prodTS).append(myString);
                if (key == 'L8_TOA'){
                    if(numvar == 1){$('#product').append('</optgroup>');}
                    $(prodTS).append('</optgroup>');
                }
            }else{
		if (key == 'PFV52'||key=='M'){
		    if(numvar == 1){$('#product').append('</optgroup>');}
                    $(prodTS).append('</optgroup>');
		};
		 if(numvar == 1){$('#product').append(myString);}
            	 $(prodTS).append(myString);
	    } 
        }
    }


    /*--------------------------------------------*/
    /*      PRODUCT CHANGE                        */
    /*--------------------------------------------*/
    function changeInProduct(product,variable, numvar) {
        //need to set resolution scale

        change_valid_date_range(product,variable);

        getsetScale(product,variable);

        resetFormDisplay(product, numvar);

        setDatePicker(product,numvar);

        setClimatologyYears(product,numvar);

        setYearTarget(product, numvar);

        if (numvar ==1 ){
            timeperiod=$('#timeperiod').val();
        }else if (numvar == 2){
            timeperiod=$('#timeperiod2TS').val();
        }
        changeInTimePeriod(product,timeperiod, numvar);
    }


