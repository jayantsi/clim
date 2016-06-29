jQuery('#yearTargetData,#yearTargetFigure,#yearTargetForm,#yearTargetData2').on('change', function(){
    var year = $(this).val();
    $('.yeartimeperiod').val(year);
    //Clear old tab data
    $('#yearData').html('');
    $('#yearData2').html('');
    var x_min_1 = null, x_max_1 = null, x_min_2 = null, x_max_2 = null, x_min, x_max;
    var p_indices = [], c_indices = [];
    var temp_res = 1; //All data but chirps have daily res 
    for (var i = 0; i < myChart.series.length; i++) {
        var series_id = myChart.series[i].options.id;
        var series_type = series_id.split('_')[0];
        if (series_type == 'main'){
            var varnum = series_id.split('_')[2];
            var s_year = series_id.split('_')[1];
            if (s_year != year){
                //Hide series
                myChart.series[i].setVisible(false,false);
                myChart.series[i].update({showInLegend: false});
            }
            if (s_year == year){
                //Show series
                myChart.series[i].setVisible(true,true);
                //get x-axis max, min
                if (varnum == 1){
                    try{
                        x_min_1 = myChart.series[i].options.data[0][0];
                        x_max_1 = myChart.series[i].options.data[myChart.series[i].options.data.length -1][0];
                    }
                    catch(e){}
                }
                if (varnum == 2){
                    try{
                        x_min_2 = myChart.series[i].options.data[0][0];
                        x_max_2 = myChart.series[i].options.data[myChart.series[i].options.data.length -1][0];
                    }
                    catch(e){}
                }
                
                myChart.series[i].update({showInLegend: true});
                var chart_idx_showing = i;
                //Show data in data tab
                if (varnum == 1){
                    var product = $('#productTS').val();
                }
                else {
                    product = $('#product2TS').val();
                }
                setTabData(varnum);
            }
        }

        //Get climo and percentile indices
        if (series_type == 'climatology'){
            c_indices.push(i)
            var date0_int = myChart.series[i].options.data[0][0];
            var d = new Date(date0_int + 1000*60*60*24);
            var old_year = d.getFullYear();
            var year_diff = year - old_year;
        }
        if (series_type == 'percentile'){
            p_indices.push(i)
        }
    }
    //Update climo and perentile data to
    //match the new x_axis
    //CLIMO
    var date;
    for (var i = 0; i < c_indices.length; i++) {
        new_data = [];
        var series_id = myChart.series[c_indices[i]].options.id;
        var varnum = series_id.split('_')[1];
        if (varnum == 1){
            x_min = x_min_1;
        }
        if (varnum == 2){
            x_min = x_min_2;
        }
        if (x_min === null){
            myChart.series[c_indices[i]].setVisible(false,false);
            myChart.series[c_indices[i]].update({showInLegend: false});
        }
        else{
            for (var d_idx = 0;d_idx<myChart.series[c_indices[i]].options.data.length;d_idx++){
                //var date = x_min + d_idx * (24 * 60 * 60 * 1000);
                date = myChart.series[c_indices[i]].options.data[d_idx][0] + year_diff * 365 * 24 * 60 * 60 * 1000;
                new_data.push([date, myChart.series[c_indices[i]].options.data[d_idx][1]]);

            }
            myChart.series[c_indices[i]].update({data:new_data});
            if ($('#climatology').is(':checked')) {
                myChart.series[c_indices[i]].setVisible(true,true);
                myChart.series[c_indices[i]].update({showInLegend: true});
            }
            else{
                myChart.series[c_indices[i]].setVisible(false,false);
                myChart.series[c_indices[i]].update({showInLegend: false});
            }
        } 
    }
    //PERCENTILES
    for (var i = 0; i < p_indices.length; i++) {
        new_data = [];
        var series_id = myChart.series[p_indices[i]].options.id;
        var varnum = series_id.split('_')[2];
        if (varnum == 1){
            x_min = x_min_1;
        }
        if (varnum == 2){
            x_min = x_min_2;
        }
        if (x_min === null){
            myChart.series[p_indices[i]].setVisible(false,false);
            myChart.series[p_indices[i]].update({showInLegend: false});
        }
        else{
            for (var d_idx = 0;d_idx<myChart.series[p_indices[i]].options.data.length;d_idx++){
                //var date = x_min + d_idx * (24 * 60 * 60 * 1000);
                var date = myChart.series[p_indices[i]].options.data[d_idx][0] + year_diff * 365 * 24 * 60 * 60 * 1000; 
                new_data.push([date, myChart.series[p_indices[i]].options.data[d_idx][1],  myChart.series[p_indices[i]].options.data[d_idx][2]])
            }
            myChart.series[p_indices[i]].update({data:new_data});
            var series_id = myChart.series[p_indices[i]].options.id;
            var p = series_id.split('_')[1];
            if ($('#percentile_' + p).is(':checked')){
                myChart.series[p_indices[i]].setVisible(true,true);
                myChart.series[p_indices[i]].update({showInLegend: true});
            }
            else{
                myChart.series[p_indices[i]].setVisible(false,false);
                myChart.series[p_indices[i]].update({showInLegend: false});
            }
        }
    }
    
    myChart.redraw();
});

/*--------------------------------------------*/
/*        CHARTTYPE LISTENER for HIGHCHARTS      */
/*--------------------------------------------*/
jQuery('#chartType').on('change', function(){
    for (var i = 0; i < myChart.series.length; i++) {
        //Check if series is main/average or runmean
        var c_type = myChart.series[i].options.id.split('_')[0];
        if (c_type == 'main'){
            myChart.series[i].update({type:$(this).val()});
        }
    }
});

/*--------------------------------------------*/
/*      CHANGE OF RUNNING MEAN LISTENER     */
/*--------------------------------------------*/
jQuery('.runmean').on('change paste keyup autocompletefocus', function(){
    var running_mean_period = $(this).val();
    var rm_data = null, s_id = null, v_id = null,s_name = '';
    for (var i = 0; i < myChart.series.length; i++) {
        //Check if series is main/average or runmean
        var chart_prop_list = myChart.series[i].options.id.split('_');
        var c_type = chart_prop_list[0];
        if (c_type == 'main'){
            //Chart series.data is an object, need to pick the correct x,y values
            var s_data = [];
            for (var j = 0; j < myChart.series[i].data.length; j++) {
                s_data.push([myChart.series[i].data[j].x,myChart.series[i].data[j].y])
            }
            s_id = myChart.series[i].options.id.split('_')[1];
            v_id = chart_prop_list[2];
            s_name = myChart.series[i].options.name;
            rm_data = compute_running_mean(s_data, running_mean_period);
        }
        if (c_type == 'runmean' &&  myChart.series[i].options.id == 'runmean_' + s_id + '_' + v_id  && rm_data != null){
            var r_name = running_mean_period + '-';
            if ($('#timeSeriesCalc').val() == 'days' || $('#timeSeriesCalc').val() == 'intraannual'){
                r_name+='day Running Mean ' + s_name;
            }
            if ($('#timeSeriesCalc').val() == 'interannual'){
                r_name+='year Running Mean ' + s_name
            }
            myChart.series[i].update({data: rm_data, name:r_name });

            //myChart.series[i].data = rm_data;
            myChart.redraw();
            rm_data = null; 
            s_id = null;
        }
    } 
});

/*--------------------------------------------*/
/*        THRESHOLD (INTERANNUAL)                          
/*--------------------------------------------*/
jQuery('#threshold, #threshold2').on('change paste keyup autocompletefocus', function(){
    var threshold = $(this).val();
    if ($(this).attr('id') == 'threshold'){
        var variable = $('#variableTS').val();
    }
    if ($(this).attr('id') == 'threshold2'){
        var variable = $('#variable2TS').val();
    }
    var a_color = threshold_colors[variable][0];
    var b_color = threshold_colors[variable][1];
    //Check if user wants single color or a color switch
    if ($('#switchcolors').is(':checked')){
        a_color = threshold_colors[variable][1];
        b_color = threshold_colors[variable][0];
    }
    if ($('#onecolorabove').is(':checked')){
        b_color = c_color;
    }
    if ($('#onecolorabove').is(':checked')){
        a_color = b_color;
    }
    //Generate chart with new threshold and colors
    if ($(this).attr('id') == 'threshold'){
        changeToColorAboveBelowChart(myChart, threshold, a_color, b_color, 1);
    }
    if ($(this).attr('id') == 'threshold2'){
        changeToColorAboveBelowChart(myChart, threshold, a_color, b_color, 2);
    }
});
/*--------------------------------------------*/
/*        CHART COLORS AROUND THRESHOLD (INTERANNUAL)                           
/*--------------------------------------------*/    
jQuery('#co1, #co2, #co3, #co4').change(function(){ 
    if ($(this).is(':checked')){ 
        var color_type = $(this).val();
        var threshold = $('#threshold').val();
        var variable = $('#variableTS').val();
        //Default colors
        var a_color = threshold_colors[variable][0];
        var b_color = threshold_colors[variable][1];
        if (color_type == 'switchcolors'){
            a_color = threshold_colors[variable][1];
            b_color = threshold_colors[variable][0];
        }
        if (color_type == 'onecolorabove'){
            a_color = threshold_colors[variable][0];
            b_color = threshold_colors[variable][0];
        }
        if (color_type == 'onecolorbelow'){
            a_color = threshold_colors[variable][1];
            b_color = threshold_colors[variable][1];

        }
        //Generate chart with new threshold and colors
        changeToColorAboveBelowChart(myChart, threshold, a_color, b_color, 1);
    } 
});   


/*--------------------------------------------*/
/*        HIGHCHART LAYER LISTENERS      */
/*--------------------------------------------*/


//All other chart layers are treated the same
jQuery('#average, #range, #runmean, #climatology, #percentile_5,#percentile_10,#percentile_25').change(function(){
    showHideChartLayer($(this));
});

