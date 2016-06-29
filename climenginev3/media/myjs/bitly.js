function generateBitlyShareLink(func)
{
	long_url = $('#shareLink').val();
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?", 
        { 
            "format": "json",
            "apiKey": "R_869cd41a5f714fd6bb492b4179abed13",
            "login": "climateengine",
            "longUrl": long_url
        },
        function(response)
        {
            func(response.data.url);
        }
    );
}
