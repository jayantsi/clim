//came from http://gmaps-samples-v3.googlecode.com/svn-history/r282/trunk/drawing/drawing-tools.html


function showPolygonOnMap(ft_id){
    //make polgon visible on map
    if (window.polygons && window.polygons[ft_id - 1] != null){
        var polygon = window.polygons[ft_id -1];
        polygon.setVisible(true);
    }
}

function hidePolygonFromMap(ft_id){
    //Hides polygon without deleting it
    if (window.polygons && window.polygons[ft_id - 1] != null){
        var polygon = window.polygons[ft_id -1];
        polygon.setVisible(false);
    }
}

function addPolygonToMap(ft_id){
    var color = $('#color-button' + ft_id).css('background-color');
    function clearSelection() {
        if (selectedShape) {
            selectedShape.setEditable(false);
            selectedShape = null;
        }
    }
    function setSelection(shape) {
        clearSelection();
        selectedShape = shape;
        shape.setEditable(true);
        shape.setDraggable(true);
    }
    function deleteSelectedShape() {
        if (selectedShape) {
            selectedShape.setMap(null);
        }
        drawingManager.setOptions({
            drawingControl: true
        });
    }
    //Show polygon panel on map
    $('#polygon-panel').css('display','block');

    var selectedShape;
    var map = window.map;
    var shape_init = null;
    if (window.polygons) {
        var polygons = window.polygons;
    }
    else{
        var polygons = [null, null, null, null, null];
    }
    var polyOptions = {
      strokeWeight: 2,
      fillOpacity: 0.3,
      editable: true,
      draggable:true,
      fillColor: color,
      strokeColor: color
    };
    //Check form field for user entered lon, lat
    if ($('#polygon-popover' + String(ft_id)).length &&  $('#polygon-popover' + String(ft_id)).val().length > 0){
        var polCoordsStr = $('#polygon-popover' + String(ft_id)).val(); 
        //Update hidden var polygon
        $('#polygon' + String(ft_id)).val(polCoordsStr);
        var polCoordsList = polCoordsStr.replace(' ','').split(',');
        var poly_initial = [];
        if (polCoordsList.length == 4){
            //Rectangle
            var shape_init_opts = {
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(parseFloat(polCoordsList[1]), parseFloat(polCoordsList[0])),
                    new google.maps.LatLng(parseFloat(polCoordsList[3]), parseFloat(polCoordsList[2]))),
                    type:google.maps.drawing.OverlayType.RECTANGLE
            }
            var shape_init = new google.maps.Rectangle($.extend({},polyOptions,shape_init_opts));
            
        }
        else{
            //Polygon
            for (var idx=0;idx < polCoordsList.length ; idx+=2 ){
                poly_initial.push(new google.maps.LatLng(parseFloat(polCoordsList[idx+1]),parseFloat(polCoordsList[idx])));
            }
            var shape_init_opts = {
                path:poly_initial,
                type:google.maps.drawing.OverlayType.POLYGON    
            } 
            shape_init = new google.maps.Polygon($.extend({},polyOptions,shape_init_opts));
        } 
        polygons[ft_id - 1] = shape_init
        shape_init.setMap(map);
        setSelection(shape_init);
        try {
            var bounds = selectedShape.getBounds;
            map.fitBounds(bounds);
        }
        catch(e){}
        google.maps.event.addListener(shape_init, "dragend", function(){
            var len=selectedShape.getPath().getLength();
            var polCoordsStr = '';
            for (var i=0; i<len; i++) {
                polCoordsStr += shape_init.getPath().getAt(i).toUrlValue(4);
                if (i < len -1 ) {
                    polCoordsStr += ',';
                }
            }
            $('#polygon' + String(ft_id)).val(polCoordsStr);
            $('#polygon-popover' + String(ft_id)).val(polCoordsStr);
        });
    }
    if (window.drawingManager){
        var drawingManager = window.drawingManager;
    }
    else{
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingModes: [
                google.maps.drawing.OverlayType.POLYGON,
                //google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.RECTANGLE
            ],
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT,
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON,
                    //google.maps.drawing.OverlayType.CIRCLE,
                    google.maps.drawing.OverlayType.RECTANGLE        
                ]
            },
            rectangleOptions: polyOptions,
            polygonOptions: polyOptions
        });
    }
    //delete old drawing manager
    if (window.drawingManager){
        window.drawingManager.setMap(null);
    }
    window.drawingManager = drawingManager;
    window.drawingManager.setMap(map);
    //NOTE: ft needs to be set globally to make it into the overlaycomplete function
    window.ft_id = ft_id
    //Event handlers
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
        //deleteSelectedShape()
        set_form_field(e);
        set_event_handlers(e)
        var newShape = e.overlay;
        setSelection(newShape);
        //Override polygons
        polygons[window.ft_id - 1] = newShape;
        //Disable drawing manager
        drawingManager.setDrawingMode(null);
        drawingManager.setOptions({
            drawingControl: false
        });
    });
    if (!window.polygons){
        window.polygons = polygons;
    }
    //General event handlers
    //google.maps.event.addListener(drawingManager, 'drawingmode_changed', deleteSelectedShape);
    //google.maps.event.addListener(map,'click',clearSelection);
}

function removePolygonFromMap(ft_id){
    if (window.polygons && window.polygons[ft_id -1]!=null){
        var polygon = window.polygons[ft_id -1];
        //$('#polygon' + String(ft_id)).val('');
        //$('#polygon-popover' + String(ft_id)).val('');
        polygon.setMap(null);
        window.polygons[ft_id -1] = null;
    }
}
function updatePolygonOnMap(ft_id){
        /*
        Used when user uses info box to change vertices
        or copy/paste polygon coords into 
        polygon-popover form field
        */
        table_id = $('#polygon-popover'+String(ft_id)).val();
        col_name= $('#polygonName-popover'+String(ft_id)).val();
        $('#polygon'+String(ft_id)).val(table_id);
        if (col_name != ''){
            $('#ft'+String(ft_id)+'altname').val(col_name);
        }
        /*
        Don't use removePolygonFromMap since it deletes popover field 
        if the polygon
        */
        if (window.polygons && window.polygons[ft_id -1]!=null){
            window.polygons[ft_id -1].setMap(null);
        }
        //add new polygon
        addPolygonToMap(ft_id);
}

function precise_round(num,decimals){
    return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
}

function set_form_field(ev){
    //ev is a map event, e.g. new polygon or circle was drawn
    try {
        var newShape = ev.overlay;
    }
    catch(e) {
        var newShape = ev;
    }
    newShape = ev.overlay;
    newShape.type = ev.type;
    if (ev.type == google.maps.drawing.OverlayType.POLYGON) {
        var polygon = newShape.getPath();
        var polCoordsStr = '';
        for (var j = 0;j<polygon.length;j++) {
            var lat = precise_round(polygon.getAt(j).lat(),6);
            var lon = precise_round(polygon.getAt(j).lng(),6);
            polCoordsStr+=lon + ',' + lat;
            if (j<polygon.length - 1){
                polCoordsStr+=','
            }
        }
    }
    if (ev.type == google.maps.drawing.OverlayType.RECTANGLE){
        var bounds=newShape.getBounds();
        
        //set new bounding box
        var sw_lng = precise_round(bounds.getSouthWest().lng(),6);
        var sw_lat = precise_round(bounds.getSouthWest().lat(),6);
        var ne_lng = precise_round(bounds.getNorthEast().lng(),6);
        var ne_lat = precise_round(bounds.getNorthEast().lat(),6);
        var polCoordsStr = sw_lng + ',' + sw_lat + ',' + ne_lng + ',' + ne_lat;
        //polCoordsStr += sw_lng + ',' + ne_lat + ',' + ne_lng + ',' + sw_lat;
    }
    $('#polygon' + String(window.ft_id)).val(polCoordsStr);
}

function set_event_handlers(ev){
    try {
        var newShape = ev.overlay;
    }
    catch(e) {
        var newShape = ev;
    }
    newShape.type = ev.type;
    //If a vertex is right clicked, remove it from polygon and update form
    newShape.addListener('rightclick', function(mev){
        if(mev.vertex != null && this.getPath().getLength() > 3){
            this.getPath().removeAt(mev.vertex);
        }
    });
    //If a point is dragged, update the form fiels
    if (ev.type == google.maps.drawing.OverlayType.POLYGON || ev.type == google.maps.drawing.OverlayType.POLYLINE) {
        newShape.getPaths().forEach(function(path, index){
            /*
            google.maps.event.addListener(path, 'insert_at', function(){
                // New point
                set_form_field(e);
            */
            google.maps.event.addListener(path, 'remove_at', function(){
                // Point was removed
                set_form_field(ev);
            });
            google.maps.event.addListener(path, 'set_at', function(){
                // Point was moved
                set_form_field(ev);
            });
        });
    }
    if (ev.type == google.maps.drawing.OverlayType.RECTANGLE){
        google.maps.event.addListener(newShape, 'bounds_changed', function(){
            // Polygon was dragged
            set_form_field(ev);
        });
    }
    if (ev.type == google.maps.drawing.OverlayType.CIRCLE){
        google.maps.event.addListener(newShape, 'radius_changed', function(){
            // Polygon was dragged
            set_form_field(ev);
        });
        google.maps.event.addListener(newShape, 'center_changed', function(){
            // Polygon was dragged
            set_form_field(ev);
        });
    }
}

