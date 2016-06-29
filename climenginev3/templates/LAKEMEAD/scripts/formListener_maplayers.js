	if(window.map){
                window.kmlmarkerOverLayer2 = new google.maps.KmlLayer('', {
                    preserveViewport: true,
                    suppressInfoWindows: false
                });
                window.kmlmarkerOverLayer = new google.maps.KmlLayer('', {
                    preserveViewport: true,
                    suppressInfoWindows: false
                });
         };

	/*--------------------------------------------*/
	/*         LAYERS LISTENER                    */
	/*--------------------------------------------*/
	jQuery('.layer').on('change','input[type=checkbox]', function(){

	


        /*-------------------*/
        /*         MAP LAYER    */
        /*-------------------*/
        if($('input[id=custommaplayer]:checked').val()=="custommaplayer"){
            window.map.overlayMapTypes.push(mapType);
        }else{
             window.map.overlayMapTypes.clear();
        };

        /*-------------------*/
        /*         STATES    */
        /*-------------------*/ 
        if($('input[id=states]:checked').val()=="states"){
             window.statemarkerOverLayer.setMap(window.map);
        }else{
            window.statemarkerOverLayer.setMap(null);
        };
        /*-------------------*/
        /*        COUNTY    */
        /*-------------------*/
        if($('input[id=counties]:checked').val()=="counties"){
            window.countymarkerOverLayer.setMap(window.map);
        }else{
            window.countymarkerOverLayer.setMap(null);
        };
        /*-------------------*/
        /*        HUC    */
        /*-------------------*/
        //checkMapLayer('hucoverlayer',window.hucsmarkerOverLayer, window.layerKMLs['hucoverlayer']);
        if($('input[id=hucoverlayer]:checked').val()=="hucoverlayer"){
                    window.hucsmarkerOverLayer.setMap(window.map);
        }else{
                     window.hucsmarkerOverLayer.setMap(null);
        };
        /*-------------------*/
        /*        CLIMATE DIV    */
        /*-------------------*/
        if($('input[id=divisions]:checked').val()=="divisions"){
	    window.climatedivmarkerOverLayer.setMap(window.map);
	}else{
	    window.climatedivmarkerOverLayer.setMap(null);
	};
        /*-------------------*/
        /*       PSAS        */
        /*-------------------*/
        if($('input[id=psas]:checked').val()=="psas"){
	    window.psasmarkerOverLayer.setMap(window.map);
	}else{
	    window.psasmarkerOverLayer.setMap(null);
	};
        /*-------------------*/
        /*       KML        */
        /*-------------------*/
        if($('input[id=kmloverlayer]:checked').val()=="kmloverlayer"){
            kmlurl=document.getElementById('kmlurl').value;
            if(kmlurl!=''){
                window.kmlmarkerOverLayer.url = kmlurl; 
                window.kmlmarkerOverLayer.setMap(window.map);
            }
        }else{
		window.kmlmarkerOverLayer.url ='';
            window.kmlmarkerOverLayer.setMap(null);
        };
	/*-------------------*/
	/*       KML2        */
	/*-------------------*/
	if($('input[id=kmloverlayer2]:checked').val()=="kmloverlayer2"){
		kmlurl2=document.getElementById('kmlurl2').value;
		if(kmlurl2!=''){
			window.kmlmarkerOverLayer2.url =kmlurl2;
			window.kmlmarkerOverLayer2.setMap(window.map);
		}
	}else{
		window.kmlmarkerOverLayer2.url ='';
		window.kmlmarkerOverLayer2.setMap(null);
	};
    });

 	jQuery('#kmlurl').on('change paste keyup autocompletefocus', function(){
		var kmlurl=document.getElementById('kmlurl').value;
		window.kmlmarkerOverLayer.url = kmlurl;
	       if($('input[id=kmloverlayer]:checked').val()=="kmloverlayer"){
                	window.kmlmarkerOverLayer.setMap(window.map);
		}else{
                	window.kmlmarkerOverLayer.setMap(null);
		}
	});
	jQuery('#kmlurl2').on('change paste keyup autocompletefocus', function(){
                var kmlurl2=document.getElementById('kmlurl2').value;
		window.kmlmarkerOverLayer2.url = kmlurl2;
               if($('input[id=kmloverlayer2]:checked').val()=="kmloverlayer2"){
                        window.kmlmarkerOverLayer2.setMap(window.map);
                }else{
                        window.kmlmarkerOverLayer2.setMap(null);
                }
        });

