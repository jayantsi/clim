	/*--------------------------------------------*/
	/*         POINTS LISTENERS                    */
	/*--------------------------------------------*/
    /*
    On mouseover of zoom_incon, zoom map to marker
    */
    $( ".zoomToMarker" ).bind('click', function() {
        var m_id = $(this).attr('id').split('zoom')[1];
        var marker_position = window.markers[m_id-1].position;
        window.map.setCenter(marker_position); 
    });
    /*
    Deal with three inputs
    1. Checkbox for a marker has changed
    See if point is checked and update map, pointsLongLat accordingly
    */
    $(".pointCheck").bind("keyup change", function(e) {
        var LongLatStr,LongLatList,LongLat;
        var Long,Lat,latlong;
        LongLatStr = $('#pointsLongLat').val();
        LongLatList = LongLatStr.replace(' ','').split(',');
        point_id = parseInt($(this).val());
        LongLat = String($('#p' + point_id).val()).replace(' ','');
        Long = parseFloat(LongLat.split(',')[0])
        Lat = parseFloat(LongLat.split(',')[1])
        //See if point is checked and update map, pointsLongLat accordingly
        if ($(this).is(':checked')) {
            //Show marker to map
            if (LongLat){
                latlong = new google.maps.LatLng(Lat,Long);
                window.markers[point_id-1].position = latlong;
                window.markers[point_id-1].setVisible(true);
            }
            //Update hidden variable that keeps track of checkboxes
            $('#p' + String(point_id) + 'check').val('checked');
        }
        else {
            //Update hidden variable that keeps track of checkboxes
            $('#p' + String(point_id) + 'check').val('');
            //Hide marker from map
            window.markers[point_id-1].setVisible(false);
        }
    });
    
    //2. Input field for marker
    //jQuery('.point').bind('change paste keyup autocompletefocus','input.pointLongLat[type=text]', function(){
    jQuery('.point').bind('change paste autocompletefocus','input.pointLongLat[type=text]', function(){
	point_id = parseInt($(this).attr('id').split('point')[1]);
        //Change position of marker on map
        //Generate new pointsLongLat string
        //var point_id,LongLat,Lat,Long,latlong;
        if ($('#check' + String(point_id)).is(':checked')){
            LongLat = String($('#p' + String(point_id)).val()).replace(' ','');
		    $('#p'+String(point_id)).val(LongLat);
            Long = parseFloat(LongLat.split(',')[0]);
            Lat = parseFloat(LongLat.split(',')[1]);
            latlong = new google.maps.LatLng(Lat,Long);

            //Update marker on map
            window.markers[point_id-1].position = latlong;
            window.markers[point_id-1].setVisible(true);
        }
    });
    
    //3. Add another point button
    jQuery('.point').on('click','.add', function(){
        var next_point_id = parseInt($(this).attr('id').split('pl')[1]);
        //Hide plus icon of this marker
        $(this).css('display','none');
        //Show next point
        $('#point' + String(next_point_id)).css('display','block');
        //Show next marker
        window.markers[next_point_id - 1].setVisible(true);            
        //Update hidden check value and display
        $('#p' + String(next_point_id) + 'check').val('checked');
        $('#p' + String(next_point_id) + 'display').val('block');
    });

    //4. Take point button away
    jQuery('.point').on('click','.minus', function(){
        var point_id = parseInt($(this).attr('id').split('mi')[1]);
        //Find last marker and show the plus sign on that marker
        idx = point_id -1;
        if (String(point_id)== '1' ||  String(point_id) == '5'){
            while ($('#point' + idx).css('display') == 'none' ){
                idx-=1;
            }
        }
        $('#pl' + String(idx +1)).css('display','block');
        //Hide this point
        $('#point' + String(point_id)).css('display','none');

        //Hide this marker
        window.markers[point_id - 1].setVisible(false);
        //Update hidden check value and display
        $('#p' + String(point_id) + 'check').val('');
        $('#p' + String(point_id) + 'display').val('none');
    });
