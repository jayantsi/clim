//following: http://jsfiddle.net/SUcK7/

   $(function () {
    Highcharts.getOptions().exporting.buttons.contextButton.menuItems.push({
    text: 'Download CSV',
    onclick: function () {
        Highcharts.post('http://www.highcharts.com/studies/csv-export/csv.php', {
            csv: this.getCSV()
        });
    }
});
    
        // Options
    var itemDelimiter = ',',  // use ';' for direct import to Excel
    lineDelimiter = '\n';
        
    var each = Highcharts.each;
    Highcharts.Chart.prototype.getCSV = function () {
        var columns = [],columns1 = [],
            line,
            csv = "", 
            row,
            col;
        
       
        each (this.series[0].data, function (series,i) {
            columns.push(series.name);
            //columns[columns.length - 1].unshift(series.name);
        });
          each (this.series[0].data, function (series,i) {
            columns1.push(series.y);
            //columns[columns.length - 1].unshift(series.name);
        });
        // Transform the columns to CSV
        line = [];
        csv ="Name"+ itemDelimiter+"Count"+lineDelimiter;
        for (row = 0; row < columns.length; row++) {
            csv += columns[row] + itemDelimiter +columns1[row] +  lineDelimiter;
            
        }
        return csv;
    }; 
    
    
       $('#getcsv').click(function () {
           Highcharts.post('http://www.highcharts.com/studies/csv-export/csv.php', {
               csv: $('#container').highcharts().getCSV()
           });
        });
}); 
