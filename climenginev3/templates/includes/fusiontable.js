//put fusion table and polygon on map 
//initialize_ftDisplay();

    if ($('#subDomainTypeTS').val() != 'points'){
         //Disable drawing manager on map (will get added if there are any checked polygons)
        if (window.drawingManager){
            window.drawingManager.setOptions({
                drawingControl: false
            });
        };
        $('.ftCheck').each(function() {
            var ft_id = parseInt($(this).val());
            var display = $('#ft' + String(ft_id) + 'display').val();
            var checked = $('#ft' + String(ft_id) + 'check').val();
            var table_name = $('#SubChoice'+String(ft_id)).val();
            var table_id = $('#ft' + String(ft_id)).val();
            var column_name = $('#ft' + String(ft_id)+'columnName').val(); 
            if (display != 'none' && checked !='' && subDomainTypeTS=='customShapes'){
		    var ftChoice = $('#ftChoice'+String(ft_id)).val();
            if (ftChoice == 'polygon'){
                addPolygonToMap(ft_id);
                //add drawing manager to map
                if (window.drawingManager){
                        window.drawingManager.setOptions({
                        drawingControl: true
                    });
                }
                }else if(ftChoice=='custom'){
			        window.ftDefaults[ftChoice][0]=table_id;
			        window.ftDefaults[ftChoice][1]=column_name;
			        window.ftDefaults[ftChoice][2]=table_name;
			        setFTform(table_id,table_name,column_name,ft_id);
                    createAndPutFusionTableOnMap(ft_id,window.map,table_id,table_name);
		        }else{
                    createAndPutFusionTableOnMap(ft_id,window.map,table_id,table_name);
                }
            }
        });
    };


//best would be for the subChoice form to be filled out correctly before doing this.. 
 jQuery('.ftChoice').each(function(){
	ft_id = parseInt($(this).attr('id').split('ftChoice')[1]);
	ftChoice = $('#ftChoice'+String(ft_id)).val();
	changeToChoiceFT(ft_id,ftChoice)
	//below is giving null
	if(ft_id==1){
		//this might be problematic in not taking from template variable.. because we
		//are having problems putting this into the input form box
	       table_name= $('#temp_ftSubChoice1').val();
	       //table_name= '{{ ftSubChoice1 }}';
	}else if(ft_id==2){
	       table_name= $('#temp_ftSubChoice2').val();
	       //table_name= '{{ ftSubChoice2 }}';
	}else if (ft_id==3){
	       table_name= $('#temp_ftSubChoice3').val();
	       //table_name= '{{ ftSubChoice3 }}';
	}else if (ft_id ==4){
	       table_name= $('#temp_ftSubChoice4').val();
	       //table_name= '{{ ftSubChoice4 }}';
	}else if (ft_id ==5){
	       table_name= $('#temp_ftSubChoice5').val();
		//table_name= '{{ ftSubChoice5 }}';
	}
	//setCookie(ft_id, table_name);

	//$('#ftSubChoice'+String(ft_id)).val(getCookieValue(ft_id));
	$('#ftSubChoice'+String(ft_id)).val(table_name);
});

