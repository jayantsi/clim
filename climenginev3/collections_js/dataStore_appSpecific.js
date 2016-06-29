// ----------------------------------
//    COMMON TO ALL APPS
// ----------------------------------
//map center, zoom by application
var default_map_properties = {
    'climateEngine':['-112,42','5'],
    'climateEngineExpert':['-112,42','5'],
    'climateDashboard':['-112,42','5'],
    'nevadaet':['-115,37','7'],
    //'fewsNet':['8.6797,8.6832','4']
    'fewsNet':['-5.0,17.5','4']
};

// ----------------------------------
//    LAKE MEAD
// ----------------------------------
RSProduct_lakeMead = {
    'L5_TOA':'Landsat 5 TOA',
    'L7_TOA':'Landsat 7 TOA',
    'L8_TOA':'Landsat 8 TOA',
    'M':'MODIS Terra'
};
METProduct_lakeMead = {
    'G':'UI METDATA/gridMET'
};


// ----------------------------------
//    
// ----------------------------------
function getProductList(numvar){ 
	var appName = $('#applicationName').val();
	var productType;
    if (numvar == 1){
        productType = $('#productType').val();
    }
    if (numvar == 2){
        productType = $('#productType2TS').val(); 
    }
	var ProductList;
        if(productType=='RS'){
                if (appName == 'lakeMead'){
                    ProductList = window.RSProduct_lakeMead;
                }
                else{
                    ProductList = window.RSProduct;
                }
        }else if(productType=='MET'){
                if (appName == 'lakeMead'){
                    ProductList = window.METProduct_lakeMead;
                    var ProductList = window.METProduct_lakeMead;
                }
                else{
                    ProductList = window.METProduct;
                }
        }else if(productType=='CLIMATE'){
                ProductList = window.CLIMProduct;
        }
	return ProductList;
};
