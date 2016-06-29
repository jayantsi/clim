	function getColorbarScale(){
                colorbarsize = parseInt(document.getElementById('colorbarsize').value);
                colorbarmap = document.getElementById('colorbarmap').value;
                colorbarType = document.getElementById('colorbarType').value;
                minColorbar = document.getElementById('minColorbar').value;
                maxColorbar = document.getElementById('maxColorbar').value;
                calculation = document.getElementById('calculation').value;

                colorbarTicks= document.getElementById('colorbarTicks').value;
		colorbarTicksNumbers = [];
	        colorbarTicksString= colorbarTicks.split(',');
		for (i=0;i<colorbarTicksString.length;i++){
			colorbarTicksNumbers[i]=colorbarTicks.split(',')[i];
		};
		colorbarTicks = colorbarTicksNumbers;

                myPalette=colorbrewer[colorbarmap][colorbarsize];
		//was a consistency check.. this is the palette used by GAE python code
                //var palette=jQuery('#palette').val();
                //palette_list = palette.split(",");
                //var myPalette = new Array();
                //for (var i = 0; i < palette_list.length; i++) {
                //        myPalette[i]="#"+palette_list[i];
               // }

		//make the palette for GAE python call
		 var palette = new String();
                palette=myPalette[0].replace(/#/g, '');
                for (var i=1;i<myPalette.length;i++){
                        palette = palette+','+myPalette[i].replace(/#/g, '');
                }
                jQuery('#palette').val(palette);

                if((colorbarmap=='invUSDM' | colorbarmap=='USDM') & calculation=='percentile'){
                    myScale = d3.scale.quantile().range(myPalette).domain([0,3,6,10,20,30,40]);
                    myScale.type = 'QUANTILE';
			        $("#minColorbar").prop('disabled',true);
			        $("#maxColorbar").prop('disabled',true);
			        $("#colorbarType").val('discrete');
			        $("#colorbarType").prop('disabled',true);
			        $(".colorbarTicks").show();
			        $("#colorbarTicks").val('0,3,6,10,20,30,40');
                }else if((colorbarmap=='invUSDMwWet' | colorbarmap=='USDMwWet') & calculation=='percentile'){
                    myScale = d3.scale.quantile().range(myPalette).domain([0,3,6,10,20,30,70,80,90,94,97,100]);
                    myScale.type = 'QUANTILE';
			        $("#minColorbar").prop('disabled',true);
			        $("#maxColorbar").prop('disabled',true);
			        $("#colorbarType").val('discrete');
		    	    	$("#colorbarType").prop('disabled',true);
			        $(".colorbarTicks").show();
			        $("#colorbarTicks").val('0,3,6,10,20,30,70,80,90,94,97,100');
                }else if (calculation=='anompercentof'){
		   var colorbarType = $('#colorbarType').val();
		   if(colorbarType=='discrete'){
			    myScale = d3.scale.quantize().range(myPalette).domain(d3.range(0,colorbarsize+1));
			    //colorbarTicks = [0,5,25,50,70,90,110,130,150,200,400,800];
			    myScale.ticks = colorbarTicks;
                    	    myScale.type = 'QUANTIZE';
		   }else if(colorbarType=='continuous'){
			//see http://stackoverflow.com/questions/29385146/changing-ticks-values-to-text-using-d3
                    	myScale = d3.scale.linear().range(myPalette)
                               .domain(d3.range(0,colorbarsize+1));
			//myScale.tickFormat(function(d,i){ return colorbarTicks[i] });
                    	myScale.type = 'LINEAR';
		   };
			        //$("#minColorbar").prop('disabled',true);
			        //$("#maxColorbar").prop('disabled',true);
			        //$("#colorbarType").val('discrete');
			        $(".colorbarTicks").show();
			        //$("#colorbarType").prop('disabled',true);
                }else if(colorbarType=='discrete'){
                    myScale = d3.scale.quantile().range(myPalette).domain([minColorbar,maxColorbar]);
                    myScale.type = 'QUANTILE';
			        $("#minColorbar").prop('disabled',false);
			        $("#maxColorbar").prop('disabled',false);
			        $("#colorbarType").prop('disabled',false);
			        $(".colorbarTicks").hide();
                }else{
                    myScale = d3.scale.linear().range(myPalette)
                                .domain(numeric.linspace(minColorbar,maxColorbar,colorbarsize));
                    myScale.type = 'LINEAR';
			        $("#minColorbar").prop('disabled',false);
			        $("#maxColorbar").prop('disabled',false);
			        $("#colorbarType").prop('disabled',false);
			        $(".colorbarTicks").hide();
                }
		
		return myScale;
        }

	//------------------------
        // redrawSampleColorbar
        //------------------------
        function redrawSampleColorbar(){
		myScale=getColorbarScale();

		var height=30;
		var width=250;
		if($('#colorbarType').val()=='continuous'){
			colorbar1 = Colorbar()
			    .thickness(height)
			    .barlength(width)
			    .orient("vertical")
			    .scale(myScale)
		}else{
			colorbar1 = Colorbar()
			    .thickness(height)
			    .barlength(width)
			    .orient("vertical")
			    .scale(myScale)
		};


                colorbarObject1 = d3.select("#colorbar1").call(colorbar1);
        }

	//------------------------
        // drawMapColorbar
        //------------------------
        function drawMapColorbar(){
		myScale=getColorbarScale();
                colorbar = Colorbar()
                    .thickness(30)
                    .barlength(400)
                    .orient("horizontal")
                    .scale(myScale)
                colorbarObject = d3.select("#colorbar").call(colorbar);
        }
