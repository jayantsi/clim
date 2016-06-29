
function compute_average_val(data){
    var average = null, count = 0, total = 0;
    for (var idx = 0;idx<data.length;idx++){
        var d = data[idx][1];
        if (String(d) != '-9999'){
            total+= Math.round(d*10000)/10000;
            count+=1;
        }
    }

    average = total / parseFloat(count); 
    return  Math.round(average*10000)/10000;
} 

function compute_running_mean(data,running_mean_period){
    var running_mean_data = [];
    if (running_mean_period%2 == 0){
        var num_nulls =running_mean_period/2 - 1;
    }
    else{
        var num_nulls =(running_mean_period - 1)/2;
    }
    for (var idx=0;idx<data.length;idx++) {
        var skip = 'F';
        var rm_data = [];
        if (idx >= num_nulls &&  idx <= data.length - 1 - num_nulls) {
            var cnt = 0;
            for(var i=idx - num_nulls,sum=0;i<=idx + num_nulls;i++){
                var val = data[i][1];
                if (val != null){
                    sum+=val;
                    cnt+=1;
                }
                else{
                    skip = 'T';
                    break;
                }
            }
            if (cnt > 0 && skip =='F'){
                rm_data = [data[idx][0],Math.round(parseFloat(sum)/parseFloat(cnt) * 10000) / 10000];
            }
        }
        if (rm_data.length > 0){
            running_mean_data.push(rm_data);
        }
    }
    return running_mean_data
}

function compute_range(data){
    var d,dt = [],mx = null, mn = null;
    for (var idx = 0;idx<data.length;idx++){
        d = data[idx][1];
        if (String(d) != '-9999' && d != null){
            dt.push(d);
        }
    }
    if (dt.length > 0){
        var mn = Math.min.apply(Math,dt);
        try {
            mn = Math.round(mn*10000) / 10000;
        }
        catch(e){}
        var mx = Math.max.apply(Math,dt);
        try {
            mx = Math.round(mx*10000) / 10000;
        }   
        catch(e){}
    }
    return [[data[0][0], mn, mx], [data[data.length -1][0], mn, mx]]
}
//------------------------
// changeToColorAboveBelowChart
//------------------------
function changeToColorAboveBelowChart(chart, threshold, colorTop, colorBottom, numvar){
    for (var i = 0; i < chart.series.length; i++) {
        //Only change main series, not aves and runmeans
        var c_type = chart.series[i].options.id.split('_')[0];
        var s_id = chart.series[i].options.id.split('_')[1];
        var var_id = chart.series[i].options.id.split('_')[2];
        if(c_type == 'main' && var_id == String(numvar)){
            chart.series[i].update({
                threshold: threshold,
                color:colorTop,
                negativeColor:colorBottom,
            }); 

            chart.redraw(true); 
        }
    }
};


