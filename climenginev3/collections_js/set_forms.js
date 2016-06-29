	function clone(obj) {
	    if (null == obj || "object" != typeof obj) return obj;
	    var copy = obj.constructor();
	    for (var attr in obj) {
		if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}
    	/*--------------------------------------------*/
        /*     SET FORM X                     */
        /*--------------------------------------------*/
         function set_form_variables(product,numvar){
		var VariablesList = variableListList[product];
		var productType = $('#productType').val();
                if(numvar == 1){
                        replace_selectForm('#variable',VariablesList);
			//make sure that 'TrueColor' is not in the variableTS lists, but is for maps
			if(productType=='RS'){
			   var tempVarList = clone(VariablesList);
			   delete tempVarList['TrueColor'];
                           delete tempVarList['FalseColor'];
			   replace_selectForm('#variableTS',tempVarList);
			}else{
                           replace_selectForm('#variableTS',VariablesList);
			};
                }else if(numvar == 2){
			if(productType=='RS'){
			    //make sure that 'TrueColor' is not in the variableTS lists
			    var tempVarList = clone(VariablesList);
			    delete tempVarList['TrueColor'];
                	    delete tempVarList['FalseColor'];
                            replace_selectForm('#variable2TS',VariablesList);
			}else{
                        	replace_selectForm('#variable2TS',VariablesList);
			};
                }
        }
