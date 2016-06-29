//================
// FUSION TABLE INFO
//================
var temp = {   //fid,cid,column,selectid,styleId,templateId//
    'fewscountries':['1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk','Name','Rwanda','col9',403,398],
    'fewsadmin1overlayer':['1h0WEIL4xj87b8Cv5uvbHuISb-RgCgExjGOaZt_4r','FEWS_ID','Angola+Bengo','col4',2,3],
    'fewsadmin2overlayer':['1kGmSEhjSwZcbZN8zK1B_HkqCoBpU99dVtMqdjQST','FEWS_ID','Angola+Bengo+Ambriz','col3',2,2],
    'fewscropzoneoverlayer':['1O2w6JwOe82lGYMy7apMlrquCzg0II2V1I7g-1G3C','FEWS_ID','Congo+Pool+maize'],
    'fewslivelihoodzoneoverlayer':['1ZMyDfEW0USLFEhxwt2i7d72dqEy0A9_pH_siHyok','LZNAME','Afghanistan+Northwest Agro-Pastoral Zone','col3',2,2]
    //'fewslivelihoodzoneoverlayer':['17WB0N1bIE2ZIDRDXxFTPgqu3ZjbFSE8yZZqHj22U','LZNAME','Afghanistan+Northwest Agro-Pastoral Zone','col3',2,2]
    //'fewslivelihoodzoneoverlayer':['1SDqf1-lQ-wA-aicQjF-P6_5nG-qTkWLOY0kIcHtU','LZNAME','Afghanistan+Northwest Agro-Pastoral Zone','col3',2,2]
    //'fewslivelihoodzoneoverlayer':['1hBlaNlcTolPhvMpElqZJh9xeyufxSyD890hF_VVU','LZNAME','Agrofisheries','col9',2,2] //apparently ethiopia is not in names here but is above ???
}

$.extend(ftDefaults,temp);

styles_ftOutlines={
    'fewscountries': {
            'styleId': 403,
            'templateId': 398
    },
    'fewsadmin1overlayer': {
            'styleId': 2,
            'templateId': 3
         },
    'fewsadmin2overlayer': {
            'styleId': 2,
            'templateId': 2
         },
    'fewscropzoneoverlayer': {
            'styleId': 3,
            'templateId':3
         },
    'fewslivelihoodzoneoverlayer': {
            'styleId':2 ,
            'templateId':2
         },
};

styles_ftLayers ={
    'fewscountries': {
            'strokeColor':'#000000',
            'fillColor': '#000000',
            'fillOpacity': 0.01,
         },
    'fewsadmin1overlayer': {
            'strokeColor':'#800080',
            'fillColor': '#800080',
            'fillOpacity': 0.01
         },
    'fewsadmin2overlayer': {
            'strokeColor':'#0000ff',
            'fillColor': '#0000ff',
            'fillOpacity': 0.01
         },
    'fewscropzoneoverlayer': {
            'strokeColor':'#ff0000',
            'fillColor': '#ff0000',
            'fillOpacity': 0.01
         },
    'fewslivelihoodzoneoverlayer': {
            'strokeColor':'#008000',
            'fillColor': '#008000',
            'fillOpacity': 0.01
         },
    'polygon': {
            'strokeColor':'#008000',
            'fillColor': '#008000',
            'fillOpacity': 0.01
         },
    'custom': {
            'strokeColor':'#008000',
            'fillColor': '#008000',
            'fillOpacity': 0.01 //was 0.1
         }
}



//================
// TRANSLATE DICTIONARY
//================
function translate2Dict(a){
        var b= {};
        for(var i=0; i<a.length;i++){b[a[i]]="";} /* Transform the array in a dict */
return b
};

var zoom6countries = ["Afghanistan","Angola","Mozambique","Zambia","Madagascar","Zambia","Ethiopia","Somalia","South Sudan","Sudan","Tanzania","Central African Republic", "Chad","Mauritania","Mali","Nigeria","Niger"];
zoom6countries=translate2Dict(zoom6countries);
var zoom7countries = ["Tajikistan","Malawi","Zimbabwe","Kenya","Uganda","Yemen","Burkina Faso","Guinea","Senegal"];
zoom7countries=translate2Dict(zoom7countries);
var zoom8countries = ["Haiti","Liberia","Sierra Leone","Guatemala","Honduras","Nicaragua"];
zoom8countries=translate2Dict(zoom8countries);
var zoom9countries = ["Lesotho","El Salvador","Burundi","Dijibouti","Rwanda"];
zoom9countries=translate2Dict(zoom9countries);


//FEWS Livelihoods (GAULS?)
var ft_fewsGAULS={
    'Afghanistan':['1T96RidZY-XYXxrzT1l2qLRzkdhpUwFWBgzuP-k6t','LZNAME',''],
    'Angola':['1AOlTxdLGnBkATyIIEU7PmSGri8nwPaB_c_rE7rPS','LZNAME',''],
    'Burkina Faso':['1q06p9uRplV-YisB5WYfrZRaq4fSBiKWPwnlkrgVM','LZNAME',''],
    'Burindi':['11TRyi7QIHw4OAQVeqfPL1vzDM6O6ZeS9GeP5pPKv','LZNAME',''],
    'Central African Republic':['1-GVfJSUUP5a-2AMA7DOnLdb_qsGgBsmkn1_IEFk6','LZNAME',''], //Central African Republic or CAR
    'Chad':['1iUeY83Pwmgv9EH-y28MCD8S9iTnOlSFALd9u4jpg','LZNAME',''],
    'Dijibouti':['1C74Ci0QpEG99U5MNLZJFFa8PAhdfEKqqCLKpRaUS','LZNAME',''],
    'El Salvador':['14fc1YIkGIxS5c7TpthWS0DfINfrO3sYjl3S6xkAv','LZNAME',''],
    'Ethiopia':['1vqh4RyUTCZTHlSI1PbRpPUIL1J2-kgCC9R8dORkn','LZNAME',''],
    'Guatemala':['15G8iVfhVoIsG5_6Q7sHVbIOhyyOSTCVBiPgTyO2s','LZNAME',''],
    'Guinea':['1CF_g7JW77D2oazaPCY1i5nTzveKg_Aiv5nbVgo0w','LZNAME',''],
    'Haiti':['1gGdxWHmOi2anF6zfoFvO4gqjdctbih_9OqNflC_M','LZNAME',''],
    'Honduras':['17irQRE--NVPjA1Tl5yXKH5gVcme8tJE3CZBICX-u','LZNAME',''],
    'Kenya':['16QqjrObnq7HgeDfhLX9A8I244-CVbMsXCMNAiQmv','LZNAME',''],
    'Liberia':['10Rkk1FsYxjNkPnNG6qMFYIYEuA_j9CX6LbyQjrVV','LZNAME',''],
    'Lesotho':['1wMZhZm-honpWSY7k6a7DkzRXBEHDtDS5jlZJUjsG','LZNAME',''],
    'Madagascar':['1_oQhFELqan-ZU9ahQcC1z8cblaGlnrVEJNC2-icz','LZNAME',''],
    'Malawi':['1REhjuzoNNCjgorh02QwKAoPH7GHPcX-WqdK2UsEa','LZNAME',''],
    'Mali':['1LtOL95vs_ZV8LCryit6_HnpQaXjzu0g0_m9I6jfq','LZNAME',''],
    'Mauritania':['1c1Etvk75-6NIESTxMf14ZRUEaL1a56ojyaK1TDbb','LZNAME',''],
    'Mozambique':['132NdV8fkehfI_rzBBVh6Vgp00fEulUHPiYDlkrME','LZNAME',''],
    'Nicaragua':['1mJYa77VX67Yo-rRSFELQG3hXd-XYMwZKLdto4Jmq','LZNAME',''],
    'Niger':['1ecCXJ8WxdbC7LOCqsBMkGxF2Ql7CzpQcGZDrIIad','LZNAME',''],
    'Nigeria':['1L_IBz44smomz60xDvzz5r5aq_tRMa7hD0ZFBPjQ','LZNAME',''],
    'Rwanda':['1jY6rpVLw9EWj6v4dtpRSmcTTjFuTT9uHfw_MAUcz','LZNAME',''],
    'Senegal':['1KpumI_im4r9_rGH6Wxgk98S_k8C9XPYOkvO3wGvo','LZNAME',''],
    'Sierra Leone':['1SkbrDAKf102l8y_udR_x7eZgCp3ZoK31ojtaXlvK',''],
    'Somalia':['1v5PQnrl5Fjvn1m4WeGvLkHcCAor_ybv7XSs4Mmqy','LZNAME',''],
    'South Sudan':['1phjYGLF7ikGf1VwJMtYEJfMr3TgUVrBt0PoIGDH-','LZNAME',''],
    'Sudan':['1RWNHbszn9FL_zKGTPktIXZrJgbddFfHC9hOSgudy',''],
    'Tajikistan':['1p9fGF0VzL8LcOISD6ZBAgiYra4Phr42LnvElM9oY','LZNAME',''],
    'Tanzania':['1VsXOG-cZNHHCpqa6STGeIVwsUsvuAo3Zt9J-aYrT','LZNAME',''],
    'Uganda':['1XMSE538afVHxILxFNSRRAZiFs3wWo7LEZAkr6w8C','LZNAME',''],
    'Yemen':['1CDvMqnCNBNwFYCiL4ep1tK8-LBtwMGexxwUa6xsw','LZNAME',''],
    'Zambia':['1eEzwxyTGxVcB66tWYBslmMrYVZ75KzlbwRpbMczn','LZNAME',''],
    'Zimbabwe':['1fK9H8tmfWoHbyQ5Xo1f-yFNh45J8A4Xlp1fjX3Hq','LZNAME',''],
}
//might be missing Sudan, Sierra Leone, Somalia

fewsCountries=Object.keys(ft_fewsGAULS);


//=======================
//  PRODUCTS
//=======================
fewsRegions={
    'All':'All FEWS Countries',
    'Central America':'Central America',
    'Central Asia':'Central Asia',
    'East Africa':'East Africa',
    'West Africa':'West Africa',
    'South Africa':'South Africa',
}

fewsCountries_CentralAmerica={
    'El Salvador':'El Salvador',
    'Guatemala':'Guatemala',
    'Haiti':'Haiti',
    'Honduras':'Honduras',
    'Nicaragua':'Nicaragua',
}

fewsCountries_CentralAsia={
    'Afghanistan':'Afghanistan',
    'Tajikistan':'Tajikistan',
}

fewsCountries_EastAfrica={
    'Burundi':'Burundi',
    'Dijibouti':'Dijibouti',
    'Ethiopia':'Ethiopia',
    'Kenya':'Kenya',
    'Rwanda':'Rwanda',
    'Somalia':'Somalia',
    'South Sudan':'South Sudan',
    'Sudan':'Sudan',
    'Tanzania':'Tanzania',
    'Uganda':'Uganda',
    'Yemen':'Yemen', //mid east
}
fewsCountries_WestAfrica={
    'Burkina Faso':'Burkina Faso',
    'Central African Republic':'Central African Republic',
    'Chad':'Chad',
    'Guinea':'Guinea',
    'Liberia':'Liberia',
    'Mauritania':'Mauritania',
    'Mali':'Mali',
    'Nigeria':'Nigeria',
    'Niger':'Niger',
    'Senegal':'Senegal',
    'Sierra Leone':'Sierra Leone',
}

fewsCountries_SouthAfrica={
    'Angola':'Angola',
    'Lesotho':'Lesotho',
    'Madagascar':'Madagascar',
    'Malawi':'Malawi',
    'Mozambique':'Mozambique',
    'Zambia':'Zambia',
    'Zimbabwe':'Zimbabwe',
}

styles_FEWScrops: [{
  where: "'CROPS' ='wheat'",
  polygonOptions: {
    fillColor: "#FF6600",
    strokeColor: "#FFFFFF",
    strokeWeight: 2
  }
}, {
  where: "'CROPS' = 'sorghum'",
  polygonOptions: {
    fillColor: "#00CCCC",
    strokeColor: "#FFFFFF",
    strokeWeight: 3
  }
}]

