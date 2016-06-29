//initialize all the maxDates lookup tables with form elements
for (var product in window.valid_date_ranges) {
     change_valid_date_range(product,$('#variable').val());
}

function change_valid_date_range(product,variable){
    //checks if variable is in list
    var tempList = Object.keys(window.names_notdefault);
    if(tempList.indexOf(variable)!=-1){
	var varname = variable;
    }else{
	var varname = 'default';	
    }; 
    valid_date_ranges[product][1] = $('#'+window.maxDates_lookup[window.names_memcache[product][varname]]).val();
}
