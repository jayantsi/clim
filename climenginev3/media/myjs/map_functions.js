/*********************************
*     SETTING THE BASE MAP
*********************************/
function getBaseMap(){
	    var variable = $('#variable').val();
	    if(variable == 'TrueColor' || variable == 'FalseColor'){
		var basemap = 'lightPoliticalStyle';
	    }else{
    		var basemap = $('#basemap').val();  //this hold basemap if user ever changed to their own
	    };
    return basemap;
}

/*********************************
*     FUNCTION FOR UPDATING MAP ZOOM/CENTER FOR SHARE MAP LINK
*********************************/
function update_share_link(share_link){
      // Get zoom level
      document.getElementById('mapzoom').value = map.getZoom();
      myZoom = map.getZoom();

      // Get coordinates
      var newCenter = window.map.getCenter();
      myCenterLat = newCenter.lat().toFixed(4);
      myCenterLong = newCenter.lng().toFixed(4);
      var LongLat = String(myCenterLong)+','+String(myCenterLat);
      var latlong = new google.maps.LatLng(myCenterLat,myCenterLong);
      document.getElementById('mapCenterLongLat').value = LongLat;

      // Assign the share map link to a variable
      var sL = share_link;

      // Update the map zoom in the share map link
      var sL_new = sL.replace(/mapzoom=\d+/m,encodeURI('mapzoom=' + String(myZoom)));

      // Update the map center in the share map link
      sL_new = sL_new.replace(/mapCenterLongLat=([\-\d.]+),([\d.]+)/m,
            encodeURI('mapCenterLongLat=' + LongLat));

      jQuery('#shareLink').val(sL_new);

}

//we could use these two general functions instead of the above two
function remove_variable_from_share_link(variable,value){
    var sL_new,share_link;
    share_link = $('#shareLink').val();
    sL_new = share_link.replace('&' + variable + '=' + value,'')
    $('#shareLink').val(sL_new);
}

function add_variable_to_share_link(variable,value){
    var sL_new, share_link;
    share_link = $('#shareLink').val();
    //remove all first
    sL_new = share_link.replace('&' + variable + '=' + value,'')
 
    //add only one copy
    sL_new = sL_new+'&' + variable + '=' + value;
    //console.log('adding '+ variable + '=' + value);
    //console.log(sL_new);
    $('#shareLink').val(sL_new);
}


/*********************************
*   UPDATE POINTS ON CHANGES TO MAP 
    (ZOOM CHANGE/PANNING)
*********************************/
function update_markers_on_map_change(){
    //Get new map coordinates
    var newCenter = window.map.getCenter();
    var myCenterLat = newCenter.lat().toFixed(4);
    var myCenterLong = newCenter.lng().toFixed(4);
    var LongLat = String(myCenterLong)+','+String(myCenterLat);
    var latlong = new google.maps.LatLng(myCenterLat,myCenterLong);
    document.getElementById('mapCenterLongLat').value = LongLat;
    var num_points = $('.point').length;
    var last_displayed = 1;
    $('.point').each(function() {
        point_id = parseFloat($(this).attr('id').split('point')[1]);
        //Check if this point is displayed
        if ($('#point' + String(point_id)).css('display') != 'none') {
            //Set this marker as the last on displayed
            if (point_id > last_displayed){
                last_displayed = point_id;
            }
        }
 
       //only update points if they are not displayed yet
       if($('#point' + String(point_id)).css('display') == 'none'){
           //Check if marker is off map
           if ( !map.getBounds().contains(window.markers[point_id - 1].getPosition())) {
               window.markers[point_id - 1].position = latlong;
               window.markers[point_id - 1].setMap(map);
               $('#p' + String(point_id)).val(LongLat);
           }
          //Update the last displayed marker
          window.markers[point_id-1].position = latlong;
          window.markers[point_id-1].setMap(map);
          $('#p' + String(point_id)).val(LongLat);
        };
    });
    //Update first marker on TS if timeseries tab has not been opened yet
    if (!userHasSeenTimeSeriesTab && $('#applicationName').val() != 'fewsNet'){
        window.markers[0].position = latlong;
        window.markers[0].setMap(map);
        $('#p1').val(LongLat);
    }
    //Update first marker on TS if timeseries tab has not been opened yet
    if ($('#applicationName').val() == 'fewsNet' && $('#subDomainTypeTS').val()!= 'points'){
        window.markers[0].position = latlong;
        window.markers[0].setMap(map);
        $('#p1').val(LongLat);
    }
}

/**********************************   
UPDATE_INFOMARKER_BEFOREVALUE  
    this is the infomarker on the map 
    associated with getting the value 
    from the data layer
*********************************/
function update_infomarker_beforeValue(pointLat,pointLong){
    window.infomarker.position=new google.maps.LatLng(pointLat,pointLong);
    buttonString='<button type="button" class="btn btn-large btn-primary pull-right" id="form-button-submit-get-value"/>SHOW VALUE </button>';
        latString='<input type="text" id="pointLatInfo" name="pointLatInfo" value="" size="8" /> N';
        lonString='<input type="text" id="pointLongInfo" name="pointLongInfo" value="" size="8" /> E';

    messageString=
        '<div style="width:130px"><br>'+
        '<b>Lat:</b>&nbsp;&nbsp;&nbsp;'+latString+'<br><br>'+
        '<b>Lon:</b>&nbsp;&nbsp;'+lonString+'<br><br>'+
        buttonString+
        '</div>';
     var locations = [messageString,pointLat,pointLong];
     window.infomarker.setMap(window.map);
     window.infowindow.setContent(locations[0]);
    window.infowindow.open(map, infomarker);
    google.maps.event.addListener(window.infowindow,'closeclick',function(){
        window.infomarker.setMap(null); //removes the marker
        $('#showValue').attr('checked', false);
    });

    //fill lat/lon in input boxes
    $('#pointLatInfo').val(pointLat);
    $('#pointLongInfo').val(pointLong);
};

/*********************************
*   UPDATE_INFOMARKER_AFTERVALUE 
*********************************/
function update_infomarker_afterValue(pointLat,pointLong,pointValue,units){
    window.infomarker.position=new google.maps.LatLng(pointLat,pointLong),
    messageString=
        '<b>Lat:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+pointLat+ ' N<br>'+
        '<b>Lon:</b>&nbsp;&nbsp;&nbsp;&nbsp;'+pointLong+' E'+'<br><br>'+
        '<b>Value</b>:&nbsp;'+pointValue+' '+units;

    var locations = [messageString,pointLat,pointLong];
    window.infomarker.setMap(window.map);
    window.infowindow.setContent(locations[0]);
    window.infowindow.open(map, infomarker);
    google.maps.event.addListener(window.infowindow,'closeclick',function(){
        window.infomarker.setMap(null); //removes the marker
        $('#showValue').attr('checked', false);
    });
};

function updateMapTileOptions(MAPID,TOKEN){
    $('#maplayer').css('display','inline');
    $('#custommaplayer').prop('checked',true);
    var eeMapOptions = {
        getTileUrl: function(tile, zoom) {
	    //cross origin is for putting in to get the save pdf map working
            //var url = ['https://crossorigin.me/https://earthengine.googleapis.com/map',
            var url = ['https://earthengine.googleapis.com/map',
                         MAPID, zoom, tile.x, tile.y].join("/");
            url += '?token=' + TOKEN;
            return url;
        },
            tileSize: new google.maps.Size(256, 256)
    };
    return eeMapOptions;
};

/*********************************
*    GET VALUE BUTTON            *
*********************************/
function run_getValue(){
    var mapCenterLongLat = $('#mapCenterLongLat').val();
    var mapCenterLat = parseFloat(mapCenterLongLat.split(',')[1]).toFixed(4);
    var mapCenterLong = parseFloat(mapCenterLongLat.split(',')[0]).toFixed(4);
    $('#pointLat').val(mapCenterLat);
    $('#pointLong').val(mapCenterLong);
    $('#showValue').prop('checked',true);
    $('.seePtValues').show();
     pointValue = $('#pointValue').val();
     pointLat = $('#pointLat').val();
     pointLong = $('#pointLong').val();
     units = $('#varUnits').val();
     if(pointValue==''){
        update_infomarker_beforeValue(pointLat,pointLong);
     }else{
        update_infomarker_afterValue(pointLat,pointLong,pointValue,units);
     }
};
/*********************************
*    OPACITY SLIDER BUTTON            *
*********************************/
//set style of tooltip window
var tooltip = $('<div id="tooltip" />').css({
    position: 'relative',
    top: 0,
    left: -70,
    color: 'white',
    background: 'black',
    display:'block',
    padding: '10',
    opacity: 1,
    width: '60',
    range: true,
}).hide();

//set initial tooltip
tooltip.text(Math.round($('#opacity').val()*100)+"% Opaque");

function put_sliderOnMap(){
        //needs to be done after window.mapType is definitely not undefined
        $( "#slider" ).slider({
              orientation: "vertical",
              range: false,
              max: 1.00,
              min: 0.00,
              step: .05,
              animate: true,
              value: $('#opacity').val(),
              slide: function( event, ui ) {
	            set_opacity(ui.value);
              },
                change: function(event, ui) {}
                }).find(".ui-slider-handle").append(tooltip).hover(function() {
                    tooltip.show()
                }, function() {
                    tooltip.hide()
        });
	set_opacity(parseFloat($('#opacity').val()));
};


function set_opacity(opacity){
                   tooltip.text(Math.round(opacity*100)+"% Opaque");
		   window.mapType.setOpacity(opacity);
                    if(opacity==1){
                        opacity=1.0;
                        $('#opacity').val("1.0");
                    }else if(opacity==0){
                       opacity=0.0;
                       $('#opacity').val("0.0");
                    }else{
                       $('#opacity').val(opacity);
                    }
};

/*********************************/
/*    MAP TITLE            *
*********************************/
function set_titleRegion(){
    calculation = $('#calculation').val();
    statistic = $('#statistic').val();
    variable = $('#variable').val();
    product = $('#product').val();
    local_var_desc =window.variableShortName_list[variable]
    local_source_desc=window.source_desc[product];

    title = statistic + ' ' + local_var_desc
    if(calculation == 'clim'){
        title = title + ' Average Conditions ';
    }else if(calculation == 'anom'){
        title = title + ' Difference from Average';
    }else if(calculation == 'anompercentchange'){
        title = title + ' Percent Difference from Average';
    }else if(calculation == 'anompercentof'){
        title = title + ' Percent Of Average';
    }else if(calculation == 'percentile'){
        title = title + ' Percentile from Distribution of Past Observations';
    }else if(calculation == 'zscore'){
        title = title + ' Z-Score';
    }

    if(product=='MACA' || product =='NASANEX'){
    //all monthly data here

        monthList = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
              'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        yearStartClim = $('#yearStartClim').val();
        yearEndClim = $('#yearEndClim').val();
        yearStartClimFut = $('#yearStartClimFut').val();
        yearEndClimFut = $('#yearEndClimFut').val();
        monthStartFut = $('#monthStartFut').val();
        monthEndFut = $('#monthEndFut').val();


    if(calculation=='clim'){
            climo_targdesc = monthList[parseInt(monthStartFut)]  +' to ' + monthList[parseInt(monthEndFut)] +', '+
                 yearStartClim +' - '+ yearEndClim;
    }else{
            climo_targdesc = monthList[parseInt(monthStartFut)]  +' to ' + monthList[parseInt(monthEndFut)] +', '+
                 yearStartClimFut +' - '+ yearEndClimFut;

    };

    }else{
    dateStart = $('#dateStart').val();
    dateEnd = $('#dateEnd').val();
    yearStartClim = $('#yearStartClim').val();
        yearEndClim = $('#yearEndClim').val();
    targStartString = dateStart;
    targEndString = dateEnd;
        climo_targdesc = targStartString + ' to ' + targEndString;
        climo_histdesc = yearStartClim + ' - ' + yearEndClim;
    }

       titleString= '<span style="font-size:18pt"><div style="text-align:center">'+title+'</div></span>';
       sourceString = '<span style="font-size:10pt"><div style="text-align:center">Data Source: '+local_source_desc+'</div></span>';
       periodString = '<span style="font-size:10pt"><div style="text-align:center">Target Period: '+climo_targdesc+'</div></span>';

       if(product=='MACA'||product=='NASANEX'){
        if(calculation=='clim'){
            htmlString = titleString+sourceString+periodString;
        }else{
            climoString = '<span style="font-size:10pt"><div style="text-align:center">Historical Period: '+climo_histdesc+'</div></span>';
            htmlString = titleString+sourceString+periodString+climoString;
        }

    }else{
        if(calculation=='value'){
            htmlString = titleString+sourceString+periodString;
        }else{
            climoString = '<span style="font-size:10pt"><div style="text-align:center">Historical Period: '+climo_histdesc+'</div></span>';
            htmlString = titleString+sourceString+periodString+climoString;
        }
    }
    $('#titleRegion').html(htmlString);
}

function set_theMapLayer(){
    /*-------------------*/
    /*         MAP LAYER    */
    /*-------------------*/
    if($('input[id=custommaplayer]:checked').val()=="custommaplayer"){
        window.map.overlayMapTypes.push(mapType);
        add_variable_to_share_link('layer','custommaplayer');
        
    }else{
         window.map.overlayMapTypes.clear();
         remove_variable_from_share_link('layer','custommaplayer');
    };
}

function set_mapLayers(){
    /*-------------------*/
    /*         STATES    */
    /*-------------------*/ 
    if($('input[id=states]:checked').val()=="states"){
         window.statemarkerOverLayer.setMap(window.map);
         add_variable_to_share_link('layer','states');
    }else{
        window.statemarkerOverLayer.setMap(null);
        remove_variable_from_share_link('layer','states');
    };
    /*-------------------*/
    /*        COUNTY    */
    /*-------------------*/
    if($('input[id=counties]:checked').val()=="counties"){
        window.countymarkerOverLayer.setMap(window.map);
        add_variable_to_share_link('layer','counties');
    }else{
        window.countymarkerOverLayer.setMap(null);
        remove_variable_from_share_link('layer','counties');
    };
    /*-------------------*/
    /*        HUC    */
    /*-------------------*/
    //checkMapLayer('hucoverlayer',window.hucsmarkerOverLayer, window.layerKMLs['hucoverlayer']);
    if($('input[id=hucoverlayer]:checked').val()=="hucoverlayer"){
        window.hucsmarkerOverLayer.setMap(window.map);
        add_variable_to_share_link('layer','hucoverlayer');
    }else{
        window.hucsmarkerOverLayer.setMap(null);
        remove_variable_from_share_link('layer','hucoverlayer');
    };
    /*-------------------*/
    /*        CLIMATE DIV    */
    /*-------------------*/
    if($('input[id=divisions]:checked').val()=="divisions"){
        window.climatedivmarkerOverLayer.setMap(window.map);
        add_variable_to_share_link('layer','divisions');
    }else{
        window.climatedivmarkerOverLayer.setMap(null);
        remove_variable_from_share_link('layer','divisions');
    };
    /*-------------------*/
    /*       PSAS        */
    /*-------------------*/
    if($('input[id=psas]:checked').val()=="psas"){
        window.psasmarkerOverLayer.setMap(window.map);
        add_variable_to_share_link('layer','psas');
    }else{
        window.psasmarkerOverLayer.setMap(null);
        remove_variable_from_share_link('layer','psas');
    };
    /*-------------------*/
    /*       KML        */
    /*-------------------*/
    if($('input[id=kmloverlayer]:checked').val()=="kmloverlayer"){
        kmlurl = $('#kmlurl').val();
        if(kmlurl!=''){
            window.kmlmarkerOverLayer.url = kmlurl; 
            window.kmlmarkerOverLayer.setMap(window.map);
            add_variable_to_share_link('kmlurl',kmlurl);
        }
    }else{
        window.kmlmarkerOverLayer.url ='';
        window.kmlmarkerOverLayer.setMap(null);
	    remove_variable_from_share_link('kmlurl',kmlurl);
    };
    /*-------------------*/
    /*       KML2        */
    /*-------------------*/
    if($('input[id=kmloverlayer2]:checked').val()=="kmloverlayer2"){
        kmlurl2 = $('#kmlurl2').val();
        if(kmlurl2!=''){
            window.kmlmarkerOverLayer2.url =kmlurl2;
            window.kmlmarkerOverLayer2.setMap(window.map);
	    add_variable_to_share_link('kmlurl2',kmlurl2);
        }
    }else{
        window.kmlmarkerOverLayer2.url ='';
        window.kmlmarkerOverLayer2.setMap(null);
	    remove_variable_from_share_link('kmlurl2',kmlurl2);
    };
}

