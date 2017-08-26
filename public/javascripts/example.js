// specify the columns
var columnDefs = [
    {headerName: "Description", field: "description", editable:true},
    {headerName: "This Month", field: "month1"},
    {headerName: "Next Month", field: "month2"},
    {headerName: "Third Month", field: "month3"},
    {headerName: "Fourth Month", field: "month4"},
    {headerName: "Fifth Month", field: "month5"},
    {headerName: "Sixth Month", field: "month6"},
    {headerName: "Seventh Month", field: "month7"},
    {headerName: "Eight Month", field: "month8"},
    {headerName: "Ninth Month", field: "month9"},
    {headerName: "Tenth Month", field: "month10"},
    {headerName: "Eleventh Month", field: "month11"},
    {headerName: "Twelth Month", field: "month12"}
];

// specify the data
var rowData = [
    {description: "Income one", month1: 15000,month2: 15000,month3: 15000,
    month4: 15000,month5: 15000,month6: 15000,month7: 15000,month8: 15000,
    month9: 15000,month10: 15000,month11: 15000,month12: 15000},
    {description: "Income two", month1: 15000,month2: 15000,month3: 15000,
    month4: 15000,month5: 15000,month6: 15000,month7: 15000,month8: 15000,
    month9: 15000,month10: 15000,month11: 15000,month12: 15000},
    {description: "Expense one", month1: -15000,month2: -15000,month3: -15000,
    month4: -15000,month5: -15000,month6: -15000,month7: -15000,month8: -15000,
    month9: -15000,month10: -15000,month11: -15000,month12: -15000}
];

// let the grid know which columns and what data to use
var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    onGridReady: function () {
        gridOptions.api.sizeColumnsToFit();
    }
};

// used in our jasmine test
function selectAllRows() {
    gridOptions.api.selectAll();
}

// wait for the document to be loaded, otherwise ag-Grid will not find the div in the document.
document.addEventListener("DOMContentLoaded", function () {
    // lookup the container we want the Grid to use
    var eGridDiv = document.querySelector('#forecastGrid');

    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, gridOptions);
});