        function set_form_models(product,numvar){
                if(product=='MACA'){
                        var ModelsList = window.ModelsMACA;
                }else if (product=='NASANEX'){
                        var ModelsList = window.ModelsNASANEX;
                };
                if(numvar==1){
                        replace_selectForm('#model',ModelsList);
                        replace_selectForm('#modelTS',ModelsList);
                }else if(numvar==2){
                        replace_selectForm('#model2TS',ModelsList);
                }
        };
         function set_form_scenarios(product,numvar){
                if(product=='MACA'){
                        var ScenariosList = window.ScenariosMACA;
                }else if (product=='NASANEX'){
                        var ScenariosList = window.ScenariosNASANEX;
                };
                if(numvar==1){
                        replace_selectForm('#scenario',ScenariosList);
                        replace_selectForm('#scenarioTS',ScenariosList);
                }else if(numvar==2){
                        replace_selectForm('#scenario2TS',ScenariosList);
                }
        };
