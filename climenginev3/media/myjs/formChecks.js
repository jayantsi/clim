/*********************************
*UTILITY FUNCTIONS FOR FORM CHECKS
*********************************/
function is_leap_year(year){
    var yr = parseInt(year);
    if (yr % 100 != 0 && yr % 4 == 0){
        return true
    }
    else if (yr % 100 == 0 && yr % 400 == 0){
        return true
    }
    else{
        return false
    }
}

function isValidDate(d) {
    var date, js_date;
    var mon_int = parseInt(d.slice(5,7));
    var day_int = parseInt(d.slice(8,10));
    var mon_len = parseInt(mon_lens[parseInt(d.slice(5,7))]);
    if (day_int > mon_len){
        if (mon_int == 2 && is_leap_year(d.slice(0,4)) && day_int == 29){
            return true
        }
        else{
            return false
        }
    }
    //Deals with js Date timezone offset
    date = new Date((d+'T00:00:00').replace(/-/g, '\/').replace(/T.+/, ''));
    try{
        js_date = new Date(d);
    }
    catch (e){
        return true;
    }
    if ( Object.prototype.toString.call(js_date) !== "[object Date]" ){
        return false;
    }
    return !isNaN(js_date.getTime());
}

/*********************************
*FORM CHECK FUNCTIONS
*********************************/
function check_date(fieldID,date){
    var err = false;
    var form_error = {'fieldID':fieldID, 'error':err};
    if (!isValidDate(date)){
        err = 'Wrong date format or invalid Start Date: ' + String(date);
        form_error.error = err;
        return form_error;
   }
   var now = new Date(); 
   //Deals with js Date timezone offset
   var dt = new Date((date+'T00:00:00').replace(/-/g, '\/').replace(/T.+/, ''));
   if (dt > now){
    err = 'Date cannot be in the future.'
    form_error.error = err;
    return form_error;
   }
   return form_error;
}

function check_date_range(fieldID, start, end, num_days){
    var err = false;
    var form_error = {'fieldID':fieldID, 'error':err};
    //Check if end - start >num_days
    var msDay =  60*60*24*1000;
    var dE = new Date(end);
    var dS = new Date(start);
    if (Math.floor((dE - dS) / msDay) > num_days){
        err = 'Calculations requiring climatologies over day ranges'
        err+= ' > ' + num_days + 'days are not currently available.'
        form_error.error = err;
        return form_error;
    }
    return form_error;
}

function check_climatologyyears(yearStartClim,yearEndClim){
    var err = false;
    var form_error = {'fieldID':'yearEndClim', 'error':err};
    if (parseInt(yearStartClim) > parseInt(yearEndClim)){
        err = 'Start year needs to be less than End year.';
        form_error.error = err;
        return form_error;
    }
    return form_error
}

function check_colorbarTicks(){
    var err = false;
    var form_error = {'fieldID':'colorbarTicks', 'error':err};
    var cT = $('#colorbarTicks').val();
    var cT_list = cT.replace(', ',',').split(',');
    if (cT_list.length < 3 || cT_list.length > 12){
        err = 'Number of colorbar ticks must be between 3 and 11.'
        form_error.error = err;
        return form_error;
    }
    var cT_list_floats = cT_list.map(function (x) {
        return parseFloat(x, 10);
    });
    for (var i=0;i<cT_list_floats.length - 1;i++){
        if (cT_list_floats[i] >= cT_list_floats[i+1]){
            err = 'Colorbar ticks must be entered in acsending order.'
            form_error.error = err;
            return form_error;
        }
    }
    return form_error;
}

function check_point(point, point_idx){
    var p_idx = String(point_idx);
    var p = String(point);
    var err = false;
    var form_error = {'fieldID':'p' + p_idx, 'error':err};
    var p_list = p.replace(', ',',').split(',');
    //Check that we have a comma separated pair of Lon,Lat coords
    if (p_list.length <= 1){
        err =  'Point must be entered as a Long,Lat pair. You entered: ' + p;
        form_error.error = err;
        return form_error;
    }
    if (p_list.length > 2){
        err = 'Please enter a single point as Long,Lat coordinate. You entered: ' + p;
        form_error.error = err;
        return form_error;
    }
    //Check that Lon and Lat are floats
    if (isNaN(parseFloat(p_list[0]))){
        err = p_list[0] + ' is not a valid longitude!'
        form_error.error = err;
        return form_error;
    }
    if (isNaN(parseFloat(p_list[1]))){
        err = p_list[1] + ' is not a valid latitude!'
        form_error.error = err;
        return form_error;
    }
    return form_error;
}

function check_polygon(polygon, polygon_idx){
    var p_idx = String(polygon_idx);
    var p = String(polygon);
    var err = false;
    var form_error = {'fieldID':'ftSubChoice' + p_idx, 'error':err};
    if (p == ''){
        err = 'Polygon has no coordinates. '
        err+= ' Click the blue info/upload button above to re-enter the coordinates'
        err+=' or use the map to draw a polyon.'
        form_error.error = err;
        return form_error;
    }
    var p_list = p.replace(', ',',').split(',');
    for (var i=0;i<p_list.length;i++){
        if (isNaN(parseFloat(p_list[i]))) {
            err = p_list[i] + ' is not a valid entry!'
            err+= ' Click the blue info/upload button to re-enter the coordinates!'
            err+=' or use the map to draw a polyon.'
            form_error.error = err;
            return form_error;
        }
    }
    return form_error;
}

function check_fusiontable(fusiontable, fusiontable_idx){
    var ft_idx = String(fusiontable_idx);
    var ft = String(fusiontable);
    var err = false;
    var form_error = {'fieldID':'ftSubChoice' + ft_idx, 'error':err};
    if (ft == ''){
        err = 'Please upload fusion table '
        err+='(click blue info button above).'
        form_error.error = err;
        return form_error
    }
    return form_error;    
}

function check_subDomainTSCalc(){
    var err = false;
    var form_error = {'fieldID':'subDomainTypeTS', 'error':err};
    if ($('#subDomainTypeTS').val() == 'None' || $('#subDomainTypeTS').val() == ''){
        err =  'You must specify a region to view data. Choose either points or area averages.'
        form_error.error = err;
        return form_error;
    }
    return form_error 
}

function check_pointsLongLat(){
    var err = false;
    var form_error = {'fieldID':'pointsLongLat', 'error':err};
    var pLL = $('#pointsLongLat').val();
    if (pLL == ''){return form_error;}
    var pLL_list = pLL.replace(', ',',').split(',');
    for (var i =0;i<pLL_list.length;i++){
        try{
            parseFloat(pLL_list[i]);
        }
        catch(e){
            err = pLL_list[i] + ' is not a valid coordinate.'
            form_error.error = err;
            return form_error;
        }
    }
    if (pLL_list % 2 != 0){
        err = 'Number of longitudes not equal number of latitudes.'
        form_error.error = err;
        return form_error;
    }
    return form_error
}
/*****************************
*FORM CHECKS FOR MAP INTERFACE
******************************/
function checkMapFormFields(){
    var err = false, fieldID = '';
    var form_error = {'filedID':fieldID, 'error':err};
    //dateStart
    form_error = check_date('dateStart',$('#dateStart').val()); 
    if (form_error.error){
        return form_error;
    }
    //dateEnd
    form_error = check_date('dateEnd',$('#dateEnd').val());
    if (form_error.error){
        return form_error;
    }
    //Check if dateEnd - dateStart >365 for all 
    //calculations involving climos
    if ($('#calculation').val() != 'value' && $('#toolAction').val() != 'points'){
        form_error = check_date_range('dateEnd',$('#dateStart').val(),$('#dateEnd').val(),365);
        if (form_error.error){
            return form_error;
        }
    }
    
    //Climo Years
    if ($('#yearStartClim').length && $('#yearEndClim').length){
        form_error = check_climatologyyears($('#yearStartClim').val(),$('#yearEndClim').val());
        if (form_error.error){
            return form_error;
        }
    }

    //Check colorbarTicks for anomalies
    if ($('#calculation').val() =='anompercentof'){
        form_error = check_colorbarTicks();
        if (form_error.error){		
            $('#colormapDropdown').click();
            return form_error;
        }
    }
    return form_error  
}

/*****************************
*FORM CHECKS FOR TIME SERIES INTERFACE
******************************/
function checkTSFormFields(){
    var err = false, fieldID = '';
    var form_error = {'filedID':fieldID, 'error':err};
    //dateStart
    form_error = check_date('dateStartTS',$('#dateStartTS').val());
    if (form_error.error){
        $('#product1tab').addClass('active');
        $('#product2tab').removeClass('active');
        $('#product1tabtoggle').addClass('active');
        $('#product2tabtoggle').removeClass('active');
        return form_error;
    }
    //dateEnd
    form_error = check_date('dateEndTS',$('#dateEndTS').val());
    if (form_error.error){
        $('#product1tab').addClass('active');
        $('#product2tab').removeClass('active');
        $('#product1tabtoggle').addClass('active');
        $('#product2tabtoggle').removeClass('active');
        return form_error;
    }
    //dateStart
    form_error = check_date('dateStart2TS',$('#dateStart2TS').val());
    if (form_error.error){
        $('#product1tab').removeClass('active');
        $('#product2tab').addClass('active');
        $('#product1tabtoggle').removeClass('active');
        $('#product2tabtoggle').addClass('active');
        return form_error;
    }
    //dateEnd
    form_error = check_date('dateEnd2TS',$('#dateEnd2TS').val());
    if (form_error.error){
        $('#product1tab').removeClass('active');
        $('#product2tab').addClass('active');
        $('#product1tabtoggle').removeClass('active');
        $('#product2tabtoggle').addClass('active');
        return form_error;
    }
    //FIX ME: is this really needed?    
    form_error = check_subDomainTSCalc();
    if (form_error.error){
        $('#subDomainTypeTS').focus();
        return form_error
    }


     //Climo Years for interannual
     if ($('#timeSeriesCalc').val() == 'interannual'){
        if ($('#yearStart').length && $('#yearEnd').length){
            form_error = check_climatologyyears($('#yearStart').val(),$('#yearEnd').val());
            if (form_error.error){
                $('#product1tab').addClass('active');
                $('#product2tab').removeClass('active');
                $('#product1tabtoggle').addClass('active');
                $('#product2tabtoggle').removeClass('active');
                return form_error;
            }
        }
        if ($('#yearStart2').length && $('#yearEnd2').length){
            form_error = check_climatologyyears($('#yearStart2').val(),$('#yearEnd2').val());
            if (form_error.error){
                $('#product1tab').removeClass('active');
                $('#product2tab').addClass('active');
                $('#product1tabtoggle').removeClass('active');
                $('#product2tabtoggle').addClass('active');
                return form_error;
            }
        }
    }

    //Point Locations and fusion tables
    var subDomain = $('#subDomainTypeTS').val();
    for (var i = 1;i<=5;i++){
        var idx = String(i),checkbox, display;
        if (subDomain == 'points'){
            var point = $('#p' +idx).val();
            checkbox = $('#p' + idx + 'check').val();
            display = $('#p' + idx + 'display').val();
            if (checkbox == 'checked' && display != 'none'){
                form_error = check_point(point, idx);
                if (form_error.error){
                    $('#p' + idx).focus();
                    return form_error; 
                }
            }   
        
        }
        if (subDomain == 'customShapes'){
            checkbox = $('#ft' + idx + 'check').val();
            display = $('#ft' + idx + 'display').val();
            if (checkbox == 'checked' && display != 'none'){
                if ($('#ftChoice' + idx).val() == 'polygon'){
                    var polygon = $('#polygon' + idx).val();
                    form_error = check_polygon(polygon, idx);
                    if (form_error.error){
                        $('#delete-button' + idx).focus();
                        //FIXME  Show the popover when error
                        //This does not work right now
                        //$('#custompolygon' + idx).click();
                        //$('#custompolygon' + idx).show();
                        return form_error;
                    }
                }
                if ($('#ftChoice' + idx).val() == 'custom'){
                    var ft = $('#ft' + idx).val();
                    form_error = check_fusiontable(ft, idx);
                    if (form_error.error){
                        $('#delete-button' + idx).focus();
                        $('.ftcustom' + idx).css('display','inline');
                        return form_error;
                    }
                }
            }
        }
        
    }
    return form_error
}

