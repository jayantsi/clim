function get_defaultStatistic(product,variable){
	statistic = 'Median';
	var tempList = Object.keys(window.variables_multStat);
       if(tempList.indexOf(variable)!=-1){
	    statistic='Total';
       }else{
	    statistic ='Mean';
       };
	return statistic;
};

function get_defaultCalculation(product,variable){
       calculation = 'value';
       var tempList = Object.keys(window.variables_multStat);
       if(tempList.indexOf(variable)!=-1){
		if(product=='MACA' || product=='NASANEX'){
			calculation = 'clim';
		}
	}else{
		if(product=='MACA' || product=='NASANEX'){
			calculation = 'clim';
		}
	}
	return calculation;
}

function get_StatisticList(product,variable){

       var tempList = Object.keys(window.variables_multStat);
       if(tempList.indexOf(variable)!=-1){
		var StatisticList = window.multStatistics;
	}else{
		var StatisticList = window.addStatistics;
	}
	return StatisticList;
};


function get_CalculationList(product,variable){
       var tempList = Object.keys(window.variables_multCalc);
       if(tempList.indexOf(variable)!=-1){
		var CalculationList = window.multCalculations;
		if(product=='MACA' || product=='NASANEX'){
			var CalculationList = window.futMultCalculations;
		}
	}else{
		var CalculationList = window.addCalculations;
		if(product=='MACA' || product=='NASANEX'){
			var CalculationList = window.futAddCalculations;
		}
	}
	return CalculationList;
};

function get_default_minColorbar(variable,calculation,units){

	if(calculation =='percentile'||calculation =='anompercentof'){
		minColorbar = '0';
	}else{
		minColorbar = colorbarMinMax_list1[variable][calculation][units]['min'];
	};
	return minColorbar;
}

function get_default_maxColorbar(variable,calculation,units){
	if(calculation =='percentile'){
		maxColorbar = '100';
	}else if(calculation =='anompercentof'){
		maxColorbar ='800';
	}else{
		maxColorbar = colorbarMinMax_list1[variable][calculation][units]['max'];
	}
        return maxColorbar;
}

function get_default_colorbarsize(variable,calculation){
	if(calculation =='percentile'||calculation =='anompercentof'){
		colorbarsize = '11';
	}else{
        	colorbarsize = colorbarSize_list1[variable][calculation];
	};
	return colorbarsize;
};
function get_default_colorbarmap(variable,calculation){
	if(calculation =='percentile'){
               var tempList = Object.keys(window.variables_multStat);
               if(tempList.indexOf(variable)!=-1){
			colorbarmap = 'invUSDMwWet';
		}else{
			colorbarmap = 'USDMwWet';
		};
	}else if(calculation=='anompercentof'){
               var tempList = Object.keys(window.variables_multCalc);
               if(tempList.indexOf(variable)!=-1){
			colorbarmap = 'invUSDMwWet';
		}else{
			colorbarmap = 'USDMwWet';
		};
	}else{
		colorbarmap = colorbarMap_list1[variable][calculation];
	        
	};
	return colorbarmap;
};


function set_varUnits_display(variable,calculation,units){
    var varUnits, varUnitsTS;
    if(units=='metric'){
        varUnits=units_metric[variable];
        varUnitsTS=units_metric[variable];
    }
    else{
        varUnits=units_english[variable];
        varUnitTS=units_english[variable];
    }
    if(calculation=='anompercentchange' | calculation=='anompercentof'| calculation=='percentile'){       
           varUnits='%';

    }else if(calculation=='zscore'){
            varUnits ='';
    }
    $('.showUnits').val(varUnits);
    $('#varUnits').val(varUnits);
    $('#varUnits2').val(varUnitsTS);
    $('#varUnitsTS').val(varUnitsTS);
    //$('.varUnits').html(varUnits);
    return varUnits;
}
