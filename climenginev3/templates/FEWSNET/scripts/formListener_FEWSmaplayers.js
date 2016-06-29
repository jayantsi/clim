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
function set_FEWSmapLayers(){
   		/*-------------------*/
                /*       COUNTRIES        */
                /*-------------------*/
		 if($('input[id=countryoverlayer]:checked').val()=="countryoverlayer"){
                        window.countrymarkerOverLayer.setMap(window.map);
         		add_variable_to_share_link('layer','countryoverlayer');

                }else{
                        window.countrymarkerOverLayer.setMap(null);
        		remove_variable_from_share_link('layer','countryoverlayer');
                };
 		/*-------------------*/
                /*       ADMIN 1       */
                /*-------------------*/
		if($('input[id=admin1overlayer]:checked').val()=="admin1overlayer"){
			 window.admin1markerOverLayer.setMap(window.map);
         		add_variable_to_share_link('layer','admin1overlayer');
                }else{
                        window.admin1markerOverLayer.setMap(null);
        		remove_variable_from_share_link('layer','admin1overlayer');
                };
		 /*-------------------*/
                /*       ADMIN 2       */
                /*-------------------*/
                if($('input[id=admin2overlayer]:checked').val()=="admin2overlayer"){
                        window.admin2markerOverLayer.setMap(window.map);
         		add_variable_to_share_link('layer','admin2overlayer');
                }else{
                        window.admin2markerOverLayer.setMap(null);
        		remove_variable_from_share_link('layer','admin2overlayer');
                };
	  	/*-------------------*/
                /*       LIVELIHOOD       */
                /*-------------------*/
                if($('input[id=livelihoodoverlayer]:checked').val()=="livelihoodoverlayer"){
                        window.livelihoodmarkerOverLayer.setMap(window.map);
         		add_variable_to_share_link('layer','livelihoodoverlayer');
                }else{
                        window.livelihoodmarkerOverLayer.setMap(null);
        		remove_variable_from_share_link('layer','livelihoodoverlayer');
                };
		 /*-------------------*/
                /*       CROPZONE        */
                /*-------------------*/
                if($('input[id=cropzoneoverlayer]:checked').val()=="cropzoneoverlayer"){
                        window.cropzonemarkerOverLayer.setMap(window.map);
         		add_variable_to_share_link('layer','cropzoneoverlayer');
                }else{
                        window.cropzonemarkerOverLayer.setMap(null);
        		remove_variable_from_share_link('layer','cropzoneoverlayer');
                };

};
