//Global vars
var axisFontSize='16',labelsFontSize='20',year_index=null;
var product,variable,varUnits,variableShortName_time,productLongName_time;
var var2disp,variable2,variable2ShortName_time,var2Units;
var timeSeriesCalc,subDomainTypeTS,dateStart, dateEnd, season, season_start, season_end;
var chartType,chartTitle, chartSubTitle, chartLegendTitle,yLabel,yLabel2,chartSubTitle,legendTitle;;
var xLabelFormat, tooltipHeaderFormat, tooltipDataFormat, tooltipRangeFormat, dateFormat;
var yAxes,yAxisMin = null,highChartsChartType = 'Chart',running_mean_period = null;
var toolAction,series_data,yearTarget;


function setTimeSeriesTitle(){
    //timeSeriesTtile_byCalc defined in collections/dataStore.js
    var title = timeSeriesTtileByCalc[$('#timeSeriesCalc').val()];
    $('#timeSeriesTitle').html(title);
}

function showHideChartLayer(checkbox){
    var layer_type = checkbox.val();
    var tsCalc = $('#timeSeriesCalc').val();
    //Find the correct chart
    var s_layer;
    for(var i = myChart.series.length - 1; i > -1; i--){
        if (myChart.series[i].options.id.split('_')[0] == 'main'){
            continue;
        }
        if (layer_type.split('_')[0] == 'percentile'){
            s_layer = myChart.series[i].options.id.split('_')[0] + '_' + myChart.series[i].options.id.split('_')[1]
        }
        else{
            s_layer = myChart.series[i].options.id.split('_')[0]
        }
        if (s_layer != layer_type){continue;}
        if (s_layer == layer_type){
            if (checkbox.is( ":checked" )){
                myChart.series[i].setVisible(true, true);
                myChart.series[i].update({showInLegend: true});
            }
            else{
                myChart.series[i].setVisible(false, false);
                myChart.series[i].update({showInLegend: false});
            }
            myChart.redraw();
        }
    }
}


function setChartLayers(){
    var tsCalc = $('#timeSeriesCalc').val();
    var allChartLayers = chartLayersAll; 
    var chartLayerstoShow = chartLayersByCalc[tsCalc];
    for (l_idx in allChartLayers){
        var layer = allChartLayers[l_idx];

        if (layer.inList(chartLayerstoShow)){
            $('#cL_' + layer).css('display','block');
            if (layer == 'threshold' && window.timeSeriesGraphData2.length >0){
                $('#threshold2').css('display','block');
            }
            if (layer == 'threshold' && window.timeSeriesGraphData2.length == 0){
                $('#threshold2').css('display','none');
            }
            if (layer == 'runmean' &&  tsCalc == 'interannual'){
                $('#runmeanYearText').css('display','block');
                $('#runmeanDaysText').css('display','none');
            }
            if (layer == 'runmean' &&  tsCalc != 'interannual'){
                $('#runmeanYearText').css('display','none');
                $('#runmeanDaysText').css('display','block');
            }
        }
        else {
            $('#cL_' + layer).css('display','none');
        }
    }
    //Check the checkboxes and show/hode the chartLayers
    //chartCheckboxIdsbyCalc defined in collections/dataStore
    for (c in chartCheckboxIdsByCalc[tsCalc]){
        var checkbox = $('#' + chartCheckboxIdsByCalc[tsCalc][c]);
        showHideChartLayer(checkbox);
    }  
}

function setHighchartParameters(){
    series_data = []
    GraphDataArray = [window.timeSeriesGraphData];
    if (window.timeSeriesGraphData2 && window.timeSeriesGraphData2.length > 0){
        GraphDataArray.push(timeSeriesGraphData2);
    }
    variable = $('#variableTS').val();    
    varUnits = $('#varUnitsTS').val();
    variableShortName_time = window.variableShortName_list[variable];
    product = $('#productTS').val();
    productLongName_time = window.source_desc[product];
    var2disp = $('#variable2display').val(); 
    if (var2disp != 'none'){
        variable2 = $('#variable2TS').val(); 
        variable2ShortName_time = window.variableShortName_list[variable2];
        var2Units = $('#var2UnitsTS').val();
    }
    timeSeriesCalc = $('#timeSeriesCalc').val();
    subDomainTypeTS = $('#subDomainTypeTS').val();
    //------------------------
    //CHART OPTIONS
    //------------------------
    chartType = $('#chartType').val();  //don't let user change default
    //
    //OTHER OPTIONS
    //
    //for threshold plots of seasonal ts
    toolAction = $('#toolAction').val(); 
    
    //------------------------
    // DAYS/INTRAAANNUAL RUNNING MEAN 
    //------------------------
    //set params according to timeSeriesCalc
    if (timeSeriesCalc == "days" || timeSeriesCalc == "intraannual"){
        running_mean_period = parseInt($('#runningMeanDays').val());
        if(variable in ColumnChartTypeVariables){
		if(timeSeriesCalc=='intraannual'){
			chartType = 'line'
		}else{
			chartType = 'column';
		 }
                $('#chartType').val(chartType);
        }else{
            chartType = 'line'
                $('#chartType').val(chartType);
        }
        dateStart = $('#dateStartTS').val();
        dateEnd = $('#dateEndTS').val();
        if( timeSeriesCalc == "intraannual" && variable in CumulativeVariables){
            chartTitle = "Cumulative Daily " + variableShortName_time;
            yLabel = 'Cumulative '+ variableShortName_time + ' (' + varUnits+')';
        }else{
            chartTitle = 'Daily ' + variableShortName_time;
            if(varUnits==''){
                yLabel = variableShortName_time;
            }else{
                yLabel = variableShortName_time + ' (' + varUnits+')';
            }
        }
        if(timeSeriesCalc == "intraannual" && variable2 in CumulativeVariables){
            y2Label = 'Cumulative '+variable2ShortName_time + ' (' + var2Units+')';
        }else{
            if(var2Units==''){
                y2Label = variable2ShortName_time;
            }else{
                y2Label = variable2ShortName_time + ' (' + var2Units+')';
            }
        }
        if ($('#productTS').val() == "CFSV2"){
            dateFormat = '%Y-%m-%d:%I %p';
            xLabelFormat = '{value:%Y-%m-%d}';
            tooltipMainFormat = '<b>{series.name}, {point.x:%b %e,%Y:%I %p}</b>: {point.y:.4f}';
            //tooltipSecondaryFormat = '<b>{series.name}</b>: {point.y:.4f}';
            tooltipSecondaryFormat = '<b>{series.name}, {point.x:%b %e,%Y:%I %p}</b>: {point.y:.4f}';
            tooltipRangeFormat = '<b>{series.name}</b>: {point.low:.4f} - {point.high:.4f}';
        }else {
            dateFormat = '%Y-%m-%d';
            xLabelFormat = '{value:%Y-%m-%d}';
            //technically for interannual
            if(timeSeriesCalc == "intraannual"){ //need name here to get variable distinction
              tooltipMainFormat = '<b>{series.name},{point.x:%b %e,%Y}</b>: {point.y:.4f}';
            }else{
              tooltipMainFormat = '<b>{series.name}, {point.x:%b %e,%Y}</b>: {point.y:.4f}';
            }
            //tooltipSecondaryFormat = '<b>{series.name}</b>: {point.y:.4f}';
            tooltipSecondaryFormat = '<b>{series.name}, {point.x:%b %e}</b>: {point.y:.4f}';
            tooltipRangeFormat = '<b>{series.name}</b>: {point.low:.4f} - {point.high:.4f}';
        }
        tooltipHeaderFormat = '';
        if (timeSeriesCalc == "intraannual"){
            year_index = parseInt($('#yearTargetForm').val()) - parseInt($('#minDate').val().slice(0,4));
        }
    }
    //------------------------
    //   INTERANNUAL RUNNING MEAN
    //------------------------
    else if(timeSeriesCalc =="interannual"){
        running_mean_period = parseInt($('#runningMeanYears').val());
        dateStart = $('#yearStart').val() + '-01-01';
        dateEnd = $('#yearEnd').val() + '-12-31';
        //season = $('#seasonStart').val()  + ' to ' + $('#seasonEnd').val();
        season_start = monNamesShort[$('#monthStart').val()] + ' ' + $('#dayStart').val();
        season_end = monNamesShort[$('#monthEnd').val()] + ' ' + $('#dayEnd').val(); 
        season = season_start + ' to ' + season_end
        chartTitle = $('#statisticTS').val() + ' ' + variableShortName_time + " over season: " + season;
        if (varUnits==''){
            yLabel = $('#statisticTS').val() + ' '+ variableShortName_time;
        }else{
            yLabel = $('#statisticTS').val() + ' ' + variableShortName_time+' (' + varUnits+')';
        }
        if (var2Units==''){
            y2Label = $('#statistic2TS').val() + ' ' + variable2ShortName_time;
        }else{
            y2Label = $('#statistic2TS').val() +  ' ' + variable2ShortName_time+' (' + var2Units+')';
        }
        chartType = 'column';
        $('#chartType').val(chartType);
        dateFormat = '%Y';
        xLabelFormat = '{value:%Y}';
        tooltipHeaderFormat = '';
        tooltipMainFormat = '{series.name}, {point.x:%Y}</b>: {point.y:.4f}';
        tooltipSecondaryFormat = '<b>{series.name}</b>: {point.y:.4f}';
    }
    chartSubTitle="Data Source:" + productLongName_time;
    legendTitle='<b>Point Locations:</b>';
    //Define Axes
    yAxes = [{
        gridLineWidth: 1,
        title: {
            text: yLabel,
            style: {
                fontSize: labelsFontSize,
            },
        },
        //min: yAxisMin,
        tickLength: 5,
        tickWidth: 1,
        tickPosition: 'outside',
        lineWidth:1,
        labels: {
            style: {
                fontSize: axisFontSize,
                //zIndex: 6,
            }
        }
    }];
    if (var2disp != 'none'){
        y2Ax = {
            gridLineWidth: 1,
            title: {
                text: y2Label,
                style: {
                    fontSize: labelsFontSize,
                },
            },
            //min: yAxisMin,
            tickLength: 5,
            tickWidth: 1,
            //tickPosition: 'outside',
            lineWidth:1,
            labels: {
                format: '{value}',
                style: {
                    fontSize: axisFontSize,
                    //zIndex: 6,
                }
            },
            opposite:true
        };
        yAxes.push(y2Ax);
    }    
    //------------------------
    //define chart data
    //------------------------
    var s,d;
    //Variable loop
    for (var j=0;j<GraphDataArray.length;j++) {
        //Point loop
        for (var k=0;k<GraphDataArray[j].length;k++){
            if (GraphDataArray[j][k].length == 0){
                continue;
            }
            //Set up  ids and colors
            //Ids will be used to show/hide 
            var p_id = '', s_data, s_name = GraphDataArray[j][k].Name;
            if (j == 0){
                s_name+= ' ' + $('#variableTS').val();
            }
            if (j ==1){
                s_name+= ' ' + $('#variable2TS').val();
                //Override chartType
                if(variable2 in ColumnChartTypeVariables){
                    if(timeSeriesCalc =='intraannual'){
                        chartType = 'line'
                    }else{
                        chartType = 'column'
                    }
                }else{
                    chartType = 'line'
               }
            }
            //------------------------
            //DAYS AND INTERANNUAL
            //------------------------
            if(timeSeriesCalc == "days" || timeSeriesCalc == "interannual"){
                //name series after point
                var p_id = 'p' + String(k + 1);
                s_data = GraphDataArray[j][k].Data;
                //Define main series data
                s = {
                    type:chartType,
                    id: 'main_' + p_id + '_' + String(j+ 1),
                    name: s_name,
                    data: s_data,
                    color: Highcharts.getOptions().colors[2*k + 2*j]
                }
                if (j == 0){s['tooltip'] = {pointFormat:tooltipMainFormat + varUnits + '<br>'}}
                if (j == 1 ){s['tooltip'] = {pointFormat:tooltipMainFormat + var2Units + '<br>'}}
                //Deal with skinny bar bug
                if (chartType == 'column'){
                    s['stacking'] = null;
                    if (timeSeriesCalc == "days" || timeSeriesCalc == "intraannual"){
                        s['pointRange'] = 1 * 24 * 3600*1000;
                    }
                    if (timeSeriesCalc == "interannual"){
                        s['pointRange'] = 1 * 24 * 3600*1000*365;
                    }
                }
                //Override default options if needed
                if ('MarkerColor' in GraphDataArray[j][k] && j == 0){
                    s['color'] = GraphDataArray[j][k].MarkerColor;
                }
                if ('AltName' in GraphDataArray[j][k] && GraphDataArray[j][k].AltName != ''){
                    s['name']= GraphDataArray[j][k].AltName +' ('+s['name']+')';
                }
                s['yAxis'] = j;
                series_data.push(s);
                //if(subDomainTypeTS!='customShapes'){  //don't do this for fusion tables (not sure why not need ave1 for FT? - KH)
                    //Add average but hide it
                    var average = compute_average_val(s_data);
                    if (j == 0){var ave1 = average;}
                    if (j == 1){var ave2 = average;}
                    if (!s_data || s_data.length == 0){
                        var a_data = [];
                    }
                    else {
                        var a_data = [[s_data[0][0], average],[s_data[s_data.length -1][0], average]];
                    }
                    var ave = {
                    yAxis:j,
                    visible:false,
                    includeInCSVExport: false,
                    id:'average_' + p_id + '_' + String(j+ 1),
                    name: 'Average ' + s['name'],
                    showInLegend:false,
                    type:'line',
                    lineWidth:1,
                    color:'#c00',
                    data:a_data
                    }
                    if (j == 0){ave['tooltip'] = {pointFormat:tooltipSecondaryFormat + varUnits + '<br>'}}
                    if (j == 1 ){ave['tooltip'] = {pointFormat:tooltipSecondaryFormat + var2Units + '<br>'}}
                    //dashed line for second variable
                    if (j == 1){
                        ave['dashStyle'] = 'longdash';
                    }
                    series_data.push(ave) 
                    //Compute running mean       
                    if (running_mean_period != null ){
                        var r_name = running_mean_period + '-';
                        if (timeSeriesCalc == 'days' || timeSeriesCalc == 'intraannual'){
                            r_name+='day Running Mean ';
                        }
                        if (timeSeriesCalc == 'interannual'){
                            r_name+='year Running Mean ';
                        }
                        if (!s_data || s_data.length == 0){
                            var rm_data = [];
                        }
                        else{
                            var rm_data = compute_running_mean(s_data, running_mean_period);
                        }
                        //Running mean
                        var rm = {
                            yAxis:j,
                            visible:false,
                            id:'runmean_' + p_id  + '_' + String(j+ 1),
                            showInLegend:false,
                            type:'line',
                            lineWidth:1,
                            color:'#000',
                            name: r_name + s['name'],
                            data:rm_data
                        }
                        if (j == 0){rm['tooltip'] = {pointFormat:tooltipSecondaryFormat + varUnits + '<br>'}}
                        if (j == 1 ){rm['tooltip'] = {pointFormat:tooltipSecondaryFormat + var2Units + '<br>'}}
                        //dashed line for second variable
                        if (j == 1){
                            rm['dashStyle'] = 'longdash';
                        }    
                        series_data.push(rm);
                    }
                //}
                /*
                Range
                if (!s_data || s_data.length == 0 ){
                    var range_data = [];
                }
                else{
                    var range_data = compute_range(s_data);
                }
                var r = {
                    yAxis:j,
                    visible:false,
                    includeInCSVExport: false,
                    id: 'range_' + p_id + String(j+1),
                    name: 'Range:' + s['name'],
                    showInLegend:false,
                    type:'arearange',
                    lineWidth:0,
                    color:'#ff0000',
                    data: range_data,
                   fillOpacity: 0.1,
                   zIndex:0.1,
                   linkedTo: p_id
                };
                if (j == 0){r['tooltip'] = {pointFormat:tooltipRangeFormat + varUnits + '<br>'}}
                if (j == 1 ){r['tooltip'] = {pointFormat:tooltipRangeFormat + var2Units + '<br>'}}
                series_data.push(r);
                */
            }
            //------------------------
            //INTRAANNUAL
            //------------------------
            if(timeSeriesCalc == "intraannual"){
                var yearTarget;
                if ($('#yearTargetFigure').length){
                     yearTarget = $('#yearTargetFigure').val();
                }
                else{
                    var yearTarget = $('#yearTargetForm').val();
                }
                if (j == 0) {
                    var yS = parseInt($('#minDate').val() .slice(0,4));
                    var yE = parseInt($('#maxDate').val() .slice(0,4));
                }
                if (j == 1) {
                    var yS = parseInt($('#minDate2').val() .slice(0,4));
                    var yE = parseInt($('#maxDate2').val() .slice(0,4));
                }
                for (var l=0; l< GraphDataArray[j][k].Data.length;l++){
                    s_data = GraphDataArray[j][k].Data[l];
                    y_id = String(yS + l);
                    //Define main series data
                    s = {
                        type:chartType,
                        id: 'main_' + y_id + '_' + String(j+1),
                        name: s_name,
                        data: s_data,
                        yAxis:j,
                        color: Highcharts.getOptions().colors[2*k + 2*j]
                    }
                    if (j == 0){s['tooltip'] = {pointFormat:tooltipMainFormat + varUnits + '<br>'}}
                    if (j == 1 ){s['tooltip'] = {pointFormat:tooltipMainFormat + var2Units + '<br>'}}
                    if (y_id == yearTarget){
                        s['visible'] = true;
                        s['showInLegend'] = true;
                    }
                    else{
                        s['visible'] = false;
                        s['includeInCSVExport'] = false
                        s['showInLegend'] = false;
                    }
                    //Deal with skinny bar bug
                    if (chartType == 'column'){
                        s['pointRange'] = 1 * 24 * 3600*1000;
                    }
                    series_data.push(s);
                }
                //Climo Data var 1
                if (j == 0 && window.climoData &&  window.climoData.length > 0){
                    var c = {
                        yAxis:j,
                        visible:false,
                        showInLegend:false,
                        id: 'climatology' + '_' + String(j + 1),
                        name: '50% Percentile',
                        data: window.climoData,
                        color: '#000'
                    }
                    c['tooltip'] = {pointFormat:tooltipSecondaryFormat + varUnits + '<br>'}
                    series_data.push(c);
                }
                //Climo Data var 2
                if (j == 1 && window.climoData2 && window.climoData2.length > 0){
                    var c = {
                        yAxis:j,
                        visible:false,
                        showInLegend:false,
                        id: 'climatology' + '_' + String(j + 1),
                        name: '50% Percentile',
                        data: window.climoData2,
                        color: '#000',
                        dashStyle:'longdash'
                    }
                    c['tooltip'] = {pointFormat:tooltipSecondaryFormat + var2Units + '<br>'}
                    series_data.push(c);
                }
                //Percentiles var 1
                if (j == 0 && window.percentileData && window.percentileData.length > 0){
                    for (var i=0; i< window.percentileData.length;i++){
                        var p_name = percentile_names[i];
                        var p_id = percentile_ids[i];
                        var p_color = percentile_colors[i];
                        var r = {
                            yAxis:j,
                            visible:false,
                            id: 'percentile_' + p_id + '_' + String(j+1),
                            name: p_name + ' Percentile',
                            showInLegend:false,
                            type:'arearange',
                            color:p_color,
                            data: window.percentileData[i],
                            fillOpacity: 0.6,
                            zIndex:-1,
                            linkedTo: y_id
                        };
                        r['tooltip'] = {pointFormat:tooltipRangeFormat + varUnits + '<br>'}
                        series_data.push(r);       
                    }
                }
                //Percentiles var 2
                if (j == 1 && window.percentileData2 && window.percentileData2.length > 0){
                    for (var i=0; i< window.percentileData2.length;i++){
                        var p_name = percentile_names[i];
                        var p_id = percentile_ids[i];
                        var p_color = percentile_colors2[i];
                        var r = {
                            yAxis:j,
                            visible:false,
                            id: 'percentile_' + p_id  + '_' + String(j+1),
                            name: p_name + ' Percentile',
                            showInLegend:false,
                            type:'arearange',
                            color:p_color,
                            data: window.percentileData2[i],
                            fillOpacity: 0.6,
                            zIndex:-1,
                            linkedTo: y_id
                        };
                        r['tooltip'] = {pointFormat:tooltipRangeFormat + var2Units + '<br>'}
                        series_data.push(r);       
                    }
                }
            }
        }
    }
    generateHighChartFigure();
    //------------------------
    // for interannual... change coloring with a threshold
    //------------------------
    //Threshold tool action 
    if(toolAction == 'getTimeSeriesOverDateRange' & timeSeriesCalc == 'interannual'){
        if(variable=='pdsi'){
            var threshold='0';
        }else{
            var threshold = ave1;
        }
        $('#threshold').val(threshold);
        var a_color, b_color;
        a_color = threshold_colors[variable][0];
        b_color = threshold_colors[variable][1];
        try {
            a_color = threshold_colors[variable][0];
            b_color = threshold_colors[variable][1];
        }
        catch(e){
            a_color = 'blue';
            b_color = 'red';
        }
        changeToColorAboveBelowChart(window.myChart, threshold,a_color,b_color, 1);
        if (var2disp != 'none'){
            //Second var
            if(variable2=='pdsi'){
                var threshold2='0';
            }else{
                var threshold2 = ave2;
            }
            $('#threshold2').val(threshold2);
            var a2_color, b2_color;
            a2_color = threshold_colors[variable2][0];
            b2_color = threshold_colors[variable2][1];
            try {
                a2_color = threshold_colors[variable2][0];
                b2_color = threshold_colors[variable2][1];
            }
            catch(e){
                a2_color = 'blue';
                b2_color = 'red';
            }
            changeToColorAboveBelowChart(window.myChart,threshold2,a2_color,b2_color,2);
        }
    }

}

function setTabData(num_var){
    var tsCalc,textData, units, v, v_short_name, prod, p_long_name;
    var stat, season_start,season_end,year_start, year_end;
    var date_Start, date_end;
    var br = '<br />', nv = '', hr = ''; 
    tsCalc = $('#timeSeriesCalc').val();
    if (num_var == 1){
        textData = window.timeSeriesTextData;
    }
    if (num_var == 2){
	    nv = '2';
        textData = window.timeSeriesTextData2;
    };
    v = $('#variable' + nv +'TS').val();
    units = $('#var' + nv +'UnitsTS').val();
    prod = $('#product' + nv +'TS').val();
    stat = $('#statistic' + nv +'TS').val();
    season_start = monNamesShort[$('#monthStart' + nv).val()] + ' ' + $('#dayStart' + nv).val();
    season_end = monNamesShort[$('#monthEnd' + nv).val()] + ' ' + $('#dayEnd' + nv).val();
    year_start = $('#yearStart' + nv).val();
    year_end = $('#yearEnd' + nv).val();
    date_start = $('#dateStart' + nv + 'TS').val();
    date_end = $('#dateEnd' + nv + 'TS').val();
    v_short_name = window.variableShortName_list[v];
    p_long_name = window.source_desc[product];
    //productLongName_time = '{{productLongName_time}}';
   
    //Clear old data tabs
    if (num_var == 1){
        for (var tab_idx = 0;tab_idx <5;tab_idx++){
            //Variable 1
            $('#d_' + String(tab_idx+1)).text('');
            $('#data_' + String(tab_idx+1)).html('');
            $('#d_' + String(tab_idx+1)).css('display','none');
            //Variable2
            $('#d2_' + String(tab_idx+1)).text('');
            $('#data2_' + String(tab_idx+1)).html('');
            $('#d2_' + String(tab_idx+1)).css('display','none');
        }
    }
    
    //Point loop
    for (var p_idx = 0;p_idx < textData.length;p_idx++){
        if (textData[p_idx].length == 0){
            continue;
        }
        var point = textData[p_idx];
        var html_str = ''
        //Header
        //var tab = $('[data-toggle="tab"][href="#data'+ nv + '_' + String(p_idx + 1) + '"]');
        var nav_pill = $('#d' + nv + '_' + String(p_idx + 1));
        var tab_div = $('#data' +  nv + '_' + String(p_idx + 1));
        var tab_name = '';
        html_str+='#Variable: ';
        if (tsCalc == 'months' && (prod == 'MACA' || prod == 'NASANEX' )){
            html_str+='Monthly ';
        }else{
	        html_str+='Daily ';
	    };
        html_str+= v_short_name + ' ' + units + br ;
        html_str+='#Data Source: ' + p_long_name + br;
        html_str+='#Missing Value: -9999' + br;
        if (tsCalc == 'interannual'){
            html_str+='#Statistic: ' + stat + br;
            html_str+='#Season: ' + season_start + ' to ' + season_end + br;
            html_str+='#Year Range: ' + year_start + ' - '+  year_end + br; 
        }
        if (tsCalc == 'days'){
            html_str+='#Time Period: ' + date_start +' to ' + date_end + br
        }
        if (tsCalc == 'intraannual'){
            html_str+='#Target Year: ' + $('#yearTargetFigure').val();
            html_str+='<select style="display:none;" id ="yearTargetData" name ="yearTargetData" class="yeartimeperiod">';
            html_str+='<option>loading</option></select>' + br;
        }
        html_str+='#Location: '
        if ($('#subDomainTypeTS').val() =='customShapes'){
            html_str+= 'Area-Average over ' + point.AltName + ' Region ';
            if (point.AltName != ''){
                tab_name = point.AltName;
            }
            else{ 
                tab_name = 'Polygon ' + String(p_idx +1);
            } 
        }
        else{
            html_str+='(' + point.Lat +' N, ' + point.Lon + ' E)' + br;
            if (point.AltName != ''){
                tab_name = point.AltName;    
            }
            else{
                tab_name = 'Location: (' +  point.Lat +' N, ' + point.Lon + ' E)';
            }
        }
        html_str+=br;
        html_str+='#Alternative Name: ' + point.AltName +br; 
        if (tsCalc == 'interannual'){html_str+='#Date(yyyy), ';}
        else{html_str+= '#Date(yyyy-mm-dd) '}
        html_str+= v_short_name;
        if (units){html_str+= ' ' + units; }
        html_str+=br;
        //Data
        if (tsCalc == 'intraannual'){
            //Need to find right data (year) index
            var index = parseInt($('#yearTargetForm').val()) - parseInt($('#minDate').val().slice(0,4));
            var Data = point.Data[index];
        } 
        else{
            Data = point.Data
        }
        html_str+='<div class="tabData">';
        for (var d=0;d<Data.length;d++){
            var date_vals = Data[d];
            for (var e=0;e<date_vals.length;e++){
                html_str+=String(date_vals[e]) + ' ';
            }
            html_str+=br
        }
        html_str+='</div>';
        //Set tab content
        tab_div.html(html_str);
        //Set tab name
        nav_pill.text(tab_name);
        //Make tab visible
        nav_pill.css('display','block');
        nav_pill.tab('show');
    }
}

