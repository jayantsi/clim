//------------------------
// General function for 
//------------------------
var myChart;
function generateHighChartFigure() {
    /*
    Function to generate time series graphs for interannual 
    Note: chart wil always be rendered to #container

    Template variable that need to be defined 
    before this function is called:
    DATA variables:
        timeSeriesGraphData: data dict containing data to be plotted
                        Note: for intraannual calculations, all years are contained
        varUnits: variable units
        timeSeriesCalc: daily/season or intraannual
        dateStart, dateEnd
        season (for seasonal time series only)
        
    CHART variables:
        chartType spline, bar, line, scatter, stacked area, (highstocks??)
        chartTitle, chartSubTitle, chartLegendTitle
        Label, xLabelFormat, tooltipHeaderFormat, tooltipDataFormat
        yAxisMin
        highChartsChartType: Chart 
    */

    var today = (new Date()).toISOString().substring(0, 10);
    //moved to js_highchartsfigure.js
    //axisFontSize = '16px';
    //labelsFontSize = '20px';

    //myChart=$(figureID).highcharts(highChartsChartType,{    
    //myChart = new Highcharts.Chart(

     basicOptions=
       {
        //------------------------
        //  CREDITS
        //------------------------
        credits: {
            text: window.location.href.split('?')[0],
            //text: 'clim-engine.appspot.com',
            //href: 'http://www.clim-engine.appspot.com'
            href: window.location.href.split('?')[0]
        },
        //------------------------
        //  CHART PROPERTIES
        //------------------------
        chart: {
                renderTo: 'highchartsfigure',
                type:  chartType,
        //zoomType: 'x', 
        zoomType: 'xy', 
        spacingBottom: 30,
        spacingTop: 10,
        spacingLeft: 10,
        spacingRight: 10,
        // Explicitly tell the width and height of a chart
        height: 700,
        },
        //------------------------
        //    EXPORTING (CSV/EXCEL)
        //------------------------ 
       navigation: {
            buttonOptions: {
                theme: {
                    // Good old text links
                    style: {
                        color: '#039',
                        border:'1px solid #039',
                        textDecoration: 'underline',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }
                }
            }
        },
        exporting: {
            csv: {
                dateFormat: dateFormat
            },
            buttons: {
                contextButton: {
                    enabled: false
                },
                exportButton: {
                    text: 'Download',
                    // Use only the download related menu items from the default context button
                    menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems.splice(2)
                },
                printButton: {
                    text: 'Print',
                    onclick: function () {
                        this.print();
                    }
                }
            }
        },
        //------------------------
        //    TITLE/SUBTITLE
        //------------------------
        title: {
            text: chartTitle,
            },
        subtitle: {
                text: chartSubTitle,
            },
        //------------------------
        //XAXIS
        //------------------------
        xAxis: {
            gridlineWidth: 1,
            type:'datetime',  
            showLastTickLabel: true,
            maxZoom: 1 * 24 * 3600*1000, // one day
            //plotBands: [{
            //    id: 'mask-before',
            //   from: Date.parse(dateStart),
            //   to: Date.parse(dateEnd),
            //   color: 'rgba(0, 0, 0, 0.2)'
            //}],
            title: {
                text: '', //no need to label this as Date
                style: {
                    fontSize: labelsFontSize,
                },
            },
            labels: {
                format: xLabelFormat,
                rotation: 90,
                align: 'left',
                style: {
                    fontSize: axisFontSize,
                    zIndex: 6,
                },
            }
        },
        //------------------------
        //YAXIS
        //------------------------
        yAxis: yAxes,
        //------------------------
        //LEGEND
        //------------------------
        legend: {
            layout: 'vertical',
            backgroundColor: 'white',
            align: 'right',
            verticalAlign: 'top',
            y: 50, // >0 moves down
            //x: -500, // >0 moves right
            borderWidth: 1,
            borderRadius: 5,
            floating: true,
            draggable: true,
            zIndex: 20,
            title: {
                //text: chartLegendTitle,
                text: ':: Drag-able Legend'
                ,
                style: {
                },
            }
        },
        //------------------------
        // PLOT OPTIONS
        //------------------------
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineWidth: 1,
                    enable: true,
                    symbol: 'circle',
                }, 
		//events: {
                //        legendItemClick: function () {
                 //           alert('I am an alert');
                 //       }
                 //   },	
		 //showInLegend: true
            },
            series: {
                states: {
                    hover: {
                        enabled: true,
                        brightness: 0.2
                    },
                    events: {
                       legendItemClick: function () {
                            var id = this.options.id.split('_')[0];
                            var visibility = this.visible;
                            if (visibility == 'visible' && $('#' + id).length){
                                $('#' + id).prop('checked',true);
                            }
                            if (visibility == 'hidden' && $('#' + id).length){
                                $('#' + id).prop('checked',false);
                            }
                        }
                    },
		            showInLegend: true
                },
           marker: {
                    radius: 4,
                    lineWidth: 1,
                    enable: true,
                    symbol: 'circle',
                }
            },
            areaspline: {
                fillOpacity: 0.1, //not working to be transparent... someone said need hex colors not 'red'
            },
            line: {
                  connectNulls: false
            },
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            },
     	    columnrange: {
                //groupPadding: 0.5,
                //pointPadding: 0,
                pointWidth: 20,
	        }, 
            column: {
                pointPlacement: 'on'
            }
        },
        //------------------------
        //TOOLTIP -What happens when hover over the item
        //------------------------
        tooltip: {
            headerFormat: tooltipHeaderFormat,
            //pointFormat: tooltipDataFormat,
            crosshairs: false,
            shared: true
        },
        //------------------------
	// SERIES - the data
        //------------------------
         series: series_data
    };       
    myChart = new Highcharts.Chart(basicOptions);
    $('#getcsv').click(function () {
       window.open("data:text/csv;charset=utf-8," + escape(myChart.getCSV()));
   });
}
