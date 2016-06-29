
/*********************************
//POPOVER BOX ISSUES
*********************************/
$(function () {
	$('[data-toggle="popover"]').popover(
		{html:true , trigger:'click' })
});


/* this is how you detect popover fusion table boxes opening*/
$('#customft1,#customft2,#customft3,#customft4,#customft5').on('shown.bs.popover', function() {
	var ft_id = parseInt($(this).attr('id').split('customft')[1]);
	var ft= $('#ft'+String(ft_id)).val();
	$('#ft-popover'+String(ft_id)).val(ft);
	var ftcolname= $('#ft'+String(ft_id)+'columnName').val();
    if (ftcolname != ''){
        $('#ftcolumnName-popover'+String(ft_id)).val(ftcolname);
    }
});
/* this is how you detect popover polygon boxes opening*/
$('#custompolygon1,#custompolygon2,#custompolygon3,#custompolygon4,#custompolygon5').on('shown.bs.popover', function() {
	var ft_id = parseInt($(this).attr('id').split('custompolygon')[1]);
	var polygonstring= $('#polygon'+String(ft_id)).val();
    $('#polygon-popover'+String(ft_id)).val(polygonstring);
    var ftcolname = $('#ft'+String(ft_id)+'altname').val();
    if (ftcolname != ''){
        $('#polygonName-popover'+String(ft_id)).val(ftcolname);
    }
});

//this is how you close the popover box.. only when you click in the body (outside the popover)
$('body').on('click', function (e) {
	$('[data-toggle="popover"]').each(function () {
		if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            		$(this).popover('hide');
		}
	});
});
