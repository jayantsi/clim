        //-------------------------
        // DUPLICATE FOR TIME DATE (Listener sets change in either to the other)
        //-------------------------
	    $( "#dateStartTS" ).datepicker({
	      showOn: "button",
	      buttonImage: "images/calendar.gif",
	      buttonImageOnly: true,
	      buttonText: "Open Calendar",
	      changeMonth: true,
	      changeYear: true,
	      numberOfMonths: 3,
	      minDate: $('#minDate').val(),
	      maxDate: $('#maxDate').val(),
	      //yearRange: $('#minYear').val() + ":+0",
	      //minDate: $('#minYear').val() + "-01-01",
	      //maxDate: "-2d",
	      yearRange: $('#minYear').val() + ":" + $('#maxYear').val(),
	      dateFormat: "yy-mm-dd",
	      onClose: function( selectedDate ) {
		    $( ".dateEndTS" ).datepicker( "option", "minDate", selectedDate );
		    document.getElementById('dateStart').value =document.getElementById('dateStartTS').value;
		    document.getElementById('mapid').value ='';
		    document.getElementById('token').value ='';
	      }
	    }).datepicker('setDate', $('#dateStartTS').val());
	    //}).datepicker('setDate', "{{ dateStartTS }}");

	    $( "#dateEndTS" ).datepicker({
	      showOn: "button",
	      buttonImage: "images/calendar.gif",
	      buttonImageOnly: true,
	      buttonText: "Open Calendar",
	      changeMonth: true,
	      changeYear: true,
	      numberOfMonths: 3,
	      minDate: $('#minDate').val(),
	      maxDate: $('#maxDate').val(),
	      //yearRange: $('#minYear').val() + ":+0", 
	      yearRange: $('#minYear').val() + ":" + $('#maxYear').val(),
	      dateFormat: "yy-mm-dd",
	      onClose: function( selectedDate ) {
		    $( ".dateStartTS" ).datepicker( "option", "maxDate", selectedDate );
		    document.getElementById('dateEnd').value =document.getElementById('dateEndTS').value;
		    document.getElementById('mapid').value ='';
		   document.getElementById('token').value ='';
	      }
	   }).datepicker('setDate',$('#dateEndTS').val());
	   //}).datepicker('setDate', '{{ dateEndTS }}');

 	  $( "#dateStart2TS" ).datepicker({
              showOn: "button",
              buttonImage: "images/calendar.gif",
              buttonImageOnly: true,
              buttonText: "Open Calendar",
              changeMonth: true,
              changeYear: true,
              numberOfMonths: 3,
              minDate: $('#minDate2').val(),
              maxDate: $('#maxDate2').val(),
              //yearRange: $('#minYear2').val() + ":+0",
	      yearRange: $('#minYear2').val() + ":" + $('#maxYear2').val(),
              dateFormat: "yy-mm-dd",
              onClose: function( selectedDate ) {
                    $( ".dateEnd2TS" ).datepicker( "option", "minDate", selectedDate );
              }
            }).datepicker('setDate', $('#dateStart2TS').val());
            //}).datepicker('setDate', "{{ dateStart2TS }}");

            $( "#dateEnd2TS" ).datepicker({
              showOn: "button",
              buttonImage: "images/calendar.gif",
              buttonImageOnly: true,
              buttonText: "Open Calendar",
              changeMonth: true,
              changeYear: true,
              numberOfMonths: 3,
              minDate: $('#minDate2').val(),
              maxDate: $('#maxDate2').val(),
              //yearRange: $('#minYear2').val() + ":+0",
	      yearRange: $('#minYear2').val() + ":" + $('#maxYear2').val(),
              dateFormat: "yy-mm-dd",
              onClose: function( selectedDate ) {
                    $( ".dateStart2TS" ).datepicker( "option", "maxDate", selectedDate );
              }
           }).datepicker('setDate', $('#dateEnd2TS').val());
           //}).datepicker('setDate', '{{ dateEnd2TS }}');
        //-------------------------
        // DUPLICATE FOR MAP DATE(Listener sets change in either to the other)
        //-------------------------
        $( "#dateStart" ).datepicker({
		  showOn: "button",
		  buttonImage: "images/calendar.gif",
		  buttonImageOnly: true,
		  buttonText: "Open Calendar",
		  changeMonth: true,
		  changeYear: true,
		  numberOfMonths: 3,
		  minDate: $('#minDate').val(),
		  maxDate: $('#maxDate').val(),
		  yearRange: $('#minYear').val() + ":" + $('#maxYear').val(), //can do :+0 for current day
		  dateFormat: "yy-mm-dd",
		  onClose: function( selectedDate ) {
			$( ".dateEnd" ).datepicker( "option", "minDate", selectedDate );
			document.getElementById('dateStartTS').value =document.getElementById('dateStart').value;
		  }
        }).datepicker('setDate', $('#dateStart').val());
        //}).datepicker('setDate', "{{ dateStart }}");

        $( "#dateEnd" ).datepicker({
		    showOn: "button",
		    buttonImage: "images/calendar.gif",
		    buttonImageOnly: true,
		    buttonText: "Open Calendar",
		    changeMonth: true,
		    changeYear: true,
		    numberOfMonths: 3,
		    minDate: $('#minDate').val(),
		    maxDate: $('#maxDate').val(),
		    yearRange: $('#minYear').val() + ":" +$('#maxYear').val(),
		    dateFormat: "yy-mm-dd",
		    onClose: function( selectedDate ) {
			$( ".dateStart" ).datepicker( "option", "maxDate", selectedDate );
			document.getElementById('dateEndTS').value =document.getElementById('dateEnd').value;
		    }
        }).datepicker('setDate', $('#dateEnd').val());
        //}).datepicker('setDate', '{{ dateEnd }}');

