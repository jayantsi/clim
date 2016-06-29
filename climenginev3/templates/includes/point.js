initialize_pointDisplay();
$('.pointCheck[type=checkbox]').each(function() {
     if ($('#toolAction').val()=='getTimeSeriesOverDateRange' && subDomainTypeTS=='points'){
	   point_id = $(this).val();
	    if (String(point_id) == '1'){
		markers[point_id-1].setVisible(true);
	    }else if( $('#point' + String(point_id)).css('display') == 'block' &&
		$('#p' + String(point_id) + 'check').val('checked')){
			markers[point_id-1].setVisible(true);
	    }
    }
});

