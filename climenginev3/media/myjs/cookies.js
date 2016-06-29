    /*--				--*/
    /*    *******  SET COOKIE ****        */
    /*--				--*/
    function setCookie(name, value){
    	document.cookie=name+"="+value;
    }
    
    /*--				--*/
    /*    *******  GET COOKIE ****        */
    /*--				--*/
    // Function to get cookie value from name

    function getCookieValue(cookieName) {
	    var name = cookieName + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return ""; // null if can't find cookie
	}
