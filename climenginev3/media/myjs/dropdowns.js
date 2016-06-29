/*********************************
//DROPDOWN BOX ISSUES
*********************************/
$('li.dropdown.custom-dropdown-menu a').on('click', function (event) {
    $(this).parent().toggleClass('open');
});
$('body').on('click', function (e) {
    if (!$('li.dropdown.custom-dropdown-menu').is(e.target)
	&& $('li.dropdown.custom-dropdown-menu').has(e.target).length === 0
	&& $('.open').has(e.target).length === 0
    ) {
	$('li.dropdown.custom-dropdown-menu').removeClass('open');
    }
});

 $(function() {
	  // Fix input element click problem (how can't click in a dropdown menu without it closing)
	  $('.dropdown-menu, .dropdown input, .dropdown label').click(function(e) {
		  e.stopPropagation();
	  });

});
