function get_fusion_table_outline(layer){
	  return new google.maps.FusionTablesLayer({
		      map: map,
		      heatmap: { enabled: false },
		      query: {
			select: window.ftDefaults[layer][3],
			from: window.ftDefaults[layer][0],
			where: ""
		      },
		      options: 
			styles_ftOutlines[layer]
		 });
};
function set_PGmapLayers(){
   		/*-------------------*/
                /*-------------------*/
		 if($('input[id=zumwalt]:checked').val()=="zumwalt"){
                        window.zumwaltmarkerOverLayer.setMap(window.map);
         		add_variable_to_share_link('layer','zumwalt');

                }else{
                        window.zumwaltmarkerOverLayer.setMap(null);
        		remove_variable_from_share_link('layer','zumwalt');
                };
		   if($('input[id=zumwaltforage]:checked').val()=="zumwaltforage"){
                        window.zumwaltforagemarkerOverLayer.setMap(window.map);
                        add_variable_to_share_link('layer','zumwaltforage');

                }else{
                        window.zumwaltforagemarkerOverLayer.setMap(null);
                        remove_variable_from_share_link('layer','zumwaltforage');
                };
		 if($('input[id=counties]:checked').val()=="counties"){
                        window.countymarkerOverLayer.setMap(window.map);
                        add_variable_to_share_link('layer','counties');

                }else{
                        window.countymarkerOverLayer.setMap(null);
                        remove_variable_from_share_link('layer','counties');
                };

};

