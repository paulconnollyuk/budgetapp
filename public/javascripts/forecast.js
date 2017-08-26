$(function() {

var monthEnds = [
1502872091977,
1502878091977,
1504180800000, // 31st August 2017
1506772800000,
1509451200000,
1512043200000,
1514721600000,
1517400000000, // 31st Januray 2018
1519819200000,
1522497600000,
1525089600000,
1527768000000,
1530360000000,
1533038400000,
1535716800000,
1538308800000,
1540987200000,
1543579200000,
1546257600000,
1548936000000, // 31st Januray 2019
1551355200000,
1554033600000,
1556625600000,
1559304000000,
1561896000000,
1564574400000,
1567252800000,
1569844800000,
1572523200000,
1575115200000,
1577793600000  // 31st December 2019
];


var running_balances = [];
var month_ends = [];

$("#forecastGrid").jsGrid({
    height: "50%",
    width: "100%",
    filtering: false,
    inserting: true,
    editing: true,
    sorting: true,
    paging: true,
    autoload: true,
    pageSize: 10,
    pageButtonCount: 5,
    deleteConfirm: "Do you really want to delete item?",
    controller: {
        loadData: function(filter) {
            return $.ajax({
                type: "GET",
                url: "/budgets",
                data: filter
            });
        },
        insertItem: function(item) {
            return $.ajax({
                type: "POST",
                url: "/budgets",
                data: item
            });
        },
        updateItem: function(item) {
            return $.ajax({
                type: "PUT",
                url: "/budgets",
                data: item//,
//                success: function(data) {
//                    refreshChart();
//                }
            });
        },
        deleteItem: function(item) {
            return $.ajax({
                type: "DELETE",
                url: "/budgets",
                data: item
            });
        }
    },
    fields: [
        { name: "Description", title: "Description", type: "text", width: 100 },
        { name: "Month1", title: "This Month", type: "number", width: 45 },
        { name: "Month2", title: "Next Month", type: "number", width: 45 },
        { name: "Month3", title: "Month 3", type: "number", width: 45 },
        { name: "Month4", title: "Month 4", type: "number", width: 45 },
        { name: "Month5", title: "Month 5", type: "number", width: 45 },
        { name: "Month6", title: "Month 6", type: "number", width: 45 },
        { name: "Month7", title: "Month 7", type: "number", width: 45 },
        { name: "Month8", title: "Month 8", type: "number", width: 45 },
        { name: "Month9", title: "Month 9", type: "number", width: 45 },
        { name: "Month10", title: "Month 10", type: "number", width: 45 },
        { name: "Month11", title: "Month 11", type: "number", width: 45 },
        { name: "Month12", title: "Month 12", type: "number", width: 45 },
        { type: "control" }
    ]
});

var monthOffset = function(){
    var d = new Date();
    var date = d.getTime();;
    var arrayLength = monthEnds.length;

    for (var i = 0; i < arrayLength; i++) {
        if(monthEnds[i] > date){
           return i;
        }
    }
}

var getChartdatacashline = function(){
    var arr=[];
    var offset=monthOffset();
    for (i = 0; i < 12; i++) { 
        arr.push([monthEnds[i+offset], running_balances[i]])
    }
return arr;    
}

var getChartdatadateline = function(){
    var arr=[];
    var offset=monthOffset();
    for (i = 0; i < 12; i++) { 
        arr.push([monthEnds[i+offset], 0])
    }
return arr;    
}


var getChart = function (items) {
//  window.onload = function () {
    Highcharts.chart('container', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Cash Flow'
        },
        subtitle: {
            text: 'Where you\'ll be in One Year'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Bank Balance (£)'
            }//,
            //min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.textField}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Bank Balance',
            data: getChartdatacashline()
        }
        ,{
            name: 'Zero Balance',
            color: '#FF9999',
            data: getChartdatadateline()
        }
        ]
    });
}


var refreshChart = function () {
//  window.onload = function () {
    Highcharts.chart('container', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Cash Flow'
        },
        subtitle: {
            text: 'Where you\'ll be in One Year'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Bank Balance (£)'
            }//,
            //min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Bank Balance',
            data: getChartdatacashline()
        }
        ,{
            name: 'Zero Balance',
            color: '#FF9999',
            data: getChartdatadateline()
        }
        ]
    });
}

var getTable = function(items) {
  var str = "<table><thead><tr><th style='width:120px;text-align:left;'>Month</th>";
  str += "<th style='width:120px;text-align:left;'>Net C/Flow</th><th style='width:120px;text-align:left;'>Bank Balance</th></tr></thead><tbody>";

    var cashflows=[[]];
    var currentvalue=0;
    var current=0,m1=0,m2=0,m3=0,m4=0,m5=0,m6=0,m7=0,m8=0,m9=0,m10=0,m11=0,m12=0;
    var aggregates=[];
    var opening = 400;

        for(i=0; i<items.length+1; i++) {
            var array = $.map(items[i], function(value, index) {
            if (value != null){

                switch(index) {
                    case "Month1":
                        m1 = m1 + parseFloat(value);
                            cashflows[0] = m1; 
                            aggregates[0] = m1 + opening;
                        break;
                    case "Month2":
                        m2 = m2 + parseFloat(value);
                            cashflows[1] = m2; 
                            aggregates[1] = m2 + parseFloat(aggregates[0]);
                        break;
                    case "Month3":
                        m3 = m3 + parseFloat(value);
                            cashflows[2] = m3; 
                            aggregates[2] = m3 + parseFloat(aggregates[1]);
                        break;
                    case "Month4":
                        m4 = m4 + parseFloat(value);
                            cashflows[3] = m4; 
                            aggregates[3] = m4 + parseFloat(aggregates[2]);
                        break;
                    case "Month5":
                        m5 = m5 + parseFloat(value);
                            cashflows[4] = m5; 
                            aggregates[4] = m5 + parseFloat(aggregates[3]);
                        break;
                    case "Month6":
                        m6 = m6 + parseFloat(value);
                            cashflows[5] = m6; 
                            aggregates[5] = m6 + parseFloat(aggregates[4]);
                        break;
                    case "Month7":
                        m7 = m7 + parseFloat(value);
                            cashflows[6] = m7; 
                            aggregates[6] = m7 + parseFloat(aggregates[5]);
                        break;
                    case "Month8":
                        m8 = m8 + parseFloat(value);
                            cashflows[7] = m8; 
                            aggregates[7] = m8 + parseFloat(aggregates[6]);
                        break;
                    case "Month9":
                        m9 = m9 + parseFloat(value);
                            cashflows[8] = m9; 
                            aggregates[8] = m9 + parseFloat(aggregates[7]);
                        break;
                    case "Month10":
                        m10 = m10 + parseFloat(value);
                            cashflows[9] = m10; 
                            aggregates[9] = m10 + parseFloat(aggregates[8]);
                        break;
                    case "Month11":
                        m11 = m11 + parseFloat(value);
                            cashflows[10] = m11; 
                            aggregates[10] = m11 + parseFloat(aggregates[9]);
                        break;
                    case "Month12":
                        m12 = m12 + parseFloat(value);
                            cashflows[11] = m12; 
                            aggregates[11] = m12 + parseFloat(aggregates[10]);
                        break;
                    default:
                }
            }
            }); 
        }
            
   

    for(i=0; i<12; i++) {
        running_balances[i] = aggregates[i];
    }
           $('#containerDev').append(aggregates[11]);        
 
    str += "</tbody></table>";

    return ;
};


var getLastdayofthismonth = function(y,m){
    return new Date(y, m +1, 0).getDate();
}

var getPanel = function(items) {
    $('#jsBudgetsGraph').html(getTable(items));
  //  getChart(items);
};

var getThismonth = function(){
    var d = new Date();
    return d; //.getMonth();
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}


$("#jsBudgetsGraph").jsGrid({
    height: "50%",
    width: "100%",
    filtering: true,
    inserting: true,
    editing: true,
    sorting: true,
    paging: true,
    autoload: true,
    pageSize: 10,
    pageButtonCount: 5,
    deleteConfirm: "Do you really want to delete item?",
    controller: {
        loadData: function(items) {
            return $.ajax({
                type: "GET",
                url: "/budgets",
                success: getPanel,                    
                data: items
            });
        },
        insertItem: function(item) {
            return $.ajax({
                type: "POST",
                url: "/budgets",
                data: item
            });
        },
        updateItem: function(item) {
            return $.ajax({
                type: "PUT",
                url: "/budgets",
                data: item
            });
        },
        deleteItem: function(item) {
            return $.ajax({
                type: "DELETE",
                url: "/budgets",
                data: item
            });
        }
    }
});


});