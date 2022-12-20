var applicationUrl;
var ProfileDetail;
var status
var reportType = 1;
var sector = [], station = [], fleet = [], time = [], type = []

$(document).ready(function (event) {

    applicationUrl = $("#applicationPath").val();
    $("#overlay").hide();
    GetStaffIdAndEmployeeName();
    $('#sltStaffID').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        maxHeight: 300,
        nonSelectedText: 'Select StaffId',
        enableCaseInsensitiveFiltering: true,
        enableFullValueFiltering: true,
        includeFilterClearBtn: true,
        onChange: function () {
            console.log('EmployeeName lib chnage', $("#sltStaffID").val());
            if ($("#sltStaffID").val() != null) {
                $("#EmployeeName").multiselect("disable");
            } else {
                $("#EmployeeName").multiselect("enable");
            }
        },
        onSelectAll: function () {
            $("#EmployeeName").multiselect("disable");
        },
        onDeselectAll: function () {
            $("#EmployeeName").multiselect("enable");
        }
    });

    $('#EmployeeName').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        maxHeight: 300,
        nonSelectedText: 'Select Employee Name',
        enableCaseInsensitiveFiltering: true,
        enableFullValueFiltering: true,
        includeFilterClearBtn: true,
        onChange: function () {
            console.log('sltStaffID lib chnage', $("#sltStaffID").val());
            if ($("#EmployeeName").val() != null) {
                $("#sltStaffID").multiselect("disable");
            } else {
                $("#sltStaffID").multiselect("enable");
            }
        },
        onSelectAll: function () {
            $("#sltStaffID").multiselect("disable");
        },
        onDeselectAll: function () {
            $("#sltStaffID").multiselect("enable");
        }
    });

    $('input[type=radio][name=reportType]').change(function () {
        if (this.value == '1') {
            reportType = 1;
            ReLoadCrewReportGrid();
        }
        else if (this.value == '2') {
            reportType = 2;
            ReLoadCrewReportGrid();
        }
    });

    // On Chnages Events 

    $("#TxtToDate").change(function () {
        console.log("on date chage");
        GetBaseDD();
        GetStaffIdAndEmployeeName();
        loadRankWithSignleDD();


    });

    $("#TxtFromDate").change(function () {
        console.log("on date chage");
        GetBaseDD();
        loadRankWithSignleDD();
        GetStaffIdAndEmployeeName();

    });

    $("#baseCode").change(function () {
        loadRankWithSignleDD();
        GetStaffIdAndEmployeeName();
    });

    $("#TxtRank").change(function () {
        GetStaffIdAndEmployeeName();
    });



    //$("#datewise").click(function () {
    //    $("#collapseTwo").removeClass("show")

    //    DashboardType = 0
    //    console.log('fourth checkbox checked');
    //    $("#rosterRelease").attr("disabled", true);
    //    $("#monthWise").attr("disabled", true);
    //    $("#rankwise").attr("disabled", true);

    //    $('#SelRosterDD').next().hide();
    //    $('#SelMonthDD').next().hide();
    //    $("#baseCode").next().hide();
    //    $("#TxtRankMultiselect").next().hide();
    //    $("#sltStaffID").next().hide();
    //    $("#EmployeeName").next().hide();


    //});

    //$("#rosterWise").click(function () {

    //    $("#collapseTwo").removeClass("show")

    //    $("#SelMonthDD").multiselect("clearSelection");
    //    $("#SelMonthDD").multiselect('destroy');
    //    $('#SelMonthDD').next().hide();

    //    DashboardType = 1
    //    console.log('frist checkbox checked');
    //    $("#monthWise").attr("disabled", true);
    //    $("#rankwise").attr("disabled", true);
    //    $("#staffwise").attr("disabled", true);
    //    GetRosterDD();
    //    $('#SelRosterDD').next().show();

    //    $("#baseCode").next().hide();
    //    $("#TxtRankMultiselect").next().hide();
    //    $("#sltStaffID").next().hide();
    //    $("#EmployeeName").next().hide();


    //});

    //$("#monthwise").click(function () {

    //    $("#collapseTwo").removeClass("show")

    //    $("#SelRosterDD").multiselect("clearSelection");
    //    $("#SelRosterDD").multiselect('destroy');
    //    $('#SelRosterDD').next().hide();
    //    DashboardType = 2
    //    console.log('sec checkbox checked');
    //    $("#rosterRelease").attr("disabled", true);
    //    $("#rankwise").attr("disabled", true);
    //    $("#staffwise").attr("disabled", true);
    //    GetMonthDD();
    //    $('#SelMonthDD').next().show();

    //    $("#baseCode").next().hide();
    //    $("#TxtRankMultiselect").next().hide();
    //    $("#sltStaffID").next().hide();
    //    $("#EmployeeName").next().hide();

    //});

    //$("#rankwise").click(function () {

    //    $("#collapseTwo").removeClass("show")

    //    DashboardType = 3
    //    console.log('third checkbox checked');
    //    $("#rosterRelease").attr("disabled", true);
    //    $("#monthWise").attr("disabled", true);
    //    $("#staffwise").attr("disabled", true);

    //    //$("#baseCode").next().show();
    //    $("#TxtRankMultiselect").next().show();
    //    //$("#sltStaffID").next().show();
    //    //$("#EmployeeName").next().show();

    //    $('#SelRosterDD').next().hide();
    //    $('#SelMonthDD').next().hide();

    //    $("#baseCode").next().hide();
    //    //$("#TxtRankMultiselect").next().hide();
    //    $("#sltStaffID").next().hide();
    //    $("#EmployeeName").next().hide();

    //});

    //$("#staffwise").click(function () {

    //    $("#collapseTwo").removeClass("show")

    //    DashboardType = 4
    //    console.log('fourth checkbox checked');
    //    $("#rosterRelease").attr("disabled", true);
    //    $("#monthWise").attr("disabled", true);
    //    $("#rankwise").attr("disabled", true);

    //    $('#SelRosterDD').next().hide();
    //    $('#SelMonthDD').next().hide();
    //    $("#baseCode").next().show();
    //    $("#TxtRankMultiselect").next().show();
    //    $("#sltStaffID").next().show();
    //    $("#EmployeeName").next().show();

    //});

    //LoadCrewReportGrid()

    // Click To  Details grids
    var firstClick = true;
    $("#btnShowDetails").click(function () {

        if (!firstClick) {
            console.log("second btn click...");
            //$("#reloadGrid").trigger("reloadGrid");
            ReLoadCrewReportGrid();
            //LoadCrewReportGrid
        } else {
            firstClick = false;
            console.log("frist btn click...");
            LoadCrewReportGrid()
        }
    });


    $("#btnDownLoadCSV").click(function () {

        JSONToCSVConvertor(JSON.stringify($('#CrewRosterReport').jqGrid('getRowData')), 'Title', true);



    });

    $("#btnDownLoadExcel").click(function () {

        var data = $('#CrewRosterReport').jqGrid('getRowData');
        //var jsonData = JSON.parse(data)
        //   console.log("data", data);
        $("#CrewRosterReport").excelexportjs({
            containerid: "CrewRosterReport",
            datatype: 'json',
            dataset: data,
            columns: getColumns(data),
            worksheetName: "CrewRosterReport",
            locale: 'en-US'
        });

        //$("#CrewRosterReport").excelexportjs({
        //    containerid: "CrewRosterReport"
        //    , datatype: 'table'
        //});

    });

    $("#btnDownLoadPDF").click(function () {

        //$("#CrewRosterReport").tableHTMLExport({type:'pdf',filename:'sample.pdf'});
        demoFromHTML();

    });

    $(window).on("resize", function () {
        console.log("window resize...")
        var $grid = $("#CrewRosterReport"),
            newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);
    });

    var $grid = $("#CrewRosterReport"),
        newWidth = $grid.closest(".ui-jqgrid").parent().width();
    $grid.jqGrid("setGridWidth", newWidth, true);

});

// date Range Change

function dateRangeChange() {

    var range = $("#dateRangeDD").val();
    var fromDate = '', toDate = '';

    if (range == 1) {
        
        fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
       // toDate = moment().clone().endOf('month').format('DD-MM-YYYY')
        toDate = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
    } else if (range == 2) {
        
        fromDate = moment().clone().subtract(1, 'months').startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().subtract(1, 'months').endOf('month').format('DD-MM-YYYY')
    } else if (range == 3) {
        
        fromDate = moment().clone().add(1, 'months').startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().add(1, 'months').endOf('month').format('DD-MM-YYYY')
    } else if (range == 4) {
        
        fromDate = moment().quarter(moment().quarter()).startOf('quarter').format('DD-MM-YYYY');
        //toDate = moment().quarter(moment().quarter()).endOf('quarter').format('DD-MM-YYYY');

        toDate = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');

    } else if (range == 5) {
        
        fromDate = moment().subtract(1, 'Q').startOf('quarter').format('DD-MM-YYYY');
        toDate = moment().subtract(1, 'Q').endOf('quarter').format('DD-MM-YYYY');
    } else if (range == 6) {
       
        fromDate = moment().month(3).startOf('month').format('DD-MM-YYYY');
        //toDate = moment().month(2).endOf('month').add('years', 1).format('DD-MM-YYYY');

        toDate = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
    } else if (range == 7) {
        
        fromDate = moment().subtract('years', 1).month(3).startOf('month').format('DD-MM-YYYY');
        toDate = moment().month(2).endOf('month').format('DD-MM-YYYY');
    }

    console.log("fromDate", fromDate);
    console.log("toDate", toDate);

    $("#TxtFromDate").val(fromDate);
    $("#TxtToDate").val(toDate);

}

// For Dropdown Binds
function BindSector() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Home/GetSector",
        dataType: 'json',
        data: {},
        success: function (subcategories) {
            for (var j = 0; j < subcategories.length; j++) {
                sector.push(subcategories[j])
            }
            //   console.log(sector)
            $('#ScltSector').html('');

            for (var j = 0; j < sector.length; j++) {
                // console.log(dbval[j].SectorTypeId + ' - ' + dbval[j].SectorTypeName)
                $('#ScltSector').append('<option value="' + sector[j].SectorTypeId + '">' + sector[j].SectorTypeName + '</option>');
            }

            $('#ScltSector').multiselect({
                maxHeight: 200,
                includeSelectAllOption: true,
                selectAllText: 'Select All',
                buttonText: function (options, select) {
                    return 'Select Sector';
                },
            });
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function BindStations() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Home/GetStations",
        dataType: 'json',
        data: {},
        success: function (subcategories) {
            for (var j = 0; j < subcategories.length; j++) {
                station.push(subcategories[j])
            }
            //  console.log(station)
            $('#ScltStation').html('');

            for (var j = 0; j < station.length; j++) {
                // console.log(dbval[j].SectorTypeId + ' - ' + dbval[j].SectorTypeName)
                $('#ScltStation').append('<option value="' + station[j].AirfieldId + '">' + station[j].IATACode + '</option>');
            }

            $('#ScltStation').multiselect({
                maxHeight: 200,
                includeSelectAllOption: true,
                selectAllText: 'Select All',
                buttonText: function (options, select) {
                    return 'Select Station';
                },
            });
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function BindTime() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Home/GetTime",
        dataType: 'json',
        data: {},
        success: function (subcategories) {
            for (var j = 0; j < subcategories.length; j++) {
                time.push(subcategories[j])
            }
            // console.log(time)
            $('#ScltTime').html('');

            for (var j = 0; j < time.length; j++) {
                // console.log(dbval[j].SectorTypeId + ' - ' + dbval[j].SectorTypeName)
                $('#ScltTime').append('<option value="' + time[j].TimeId + '">' + time[j].ActualTime + '</option>');
            }

            $('#ScltTime').multiselect({
                maxHeight: 200,
                includeSelectAllOption: true,
                selectAllText: 'Select All',
                buttonText: function (options, select) {
                    return 'Select Time';
                },
            });
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function BindFleet() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Home/GetFleet",
        dataType: 'json',
        data: {},
        success: function (subcategories) {
            for (var j = 0; j < subcategories.length; j++) {
                fleet.push(subcategories[j])
            }
            // console.log(time)
            $('#ScltFleet').html('');

            for (var j = 0; j < fleet.length; j++) {
                // console.log(dbval[j].SectorTypeId + ' - ' + dbval[j].SectorTypeName)
                $('#ScltFleet').append('<option value="' + fleet[j].AircraftTypeId + '">' + fleet[j].AircraftIATA + '</option>');
            }

            $('#ScltFleet').multiselect({
                maxHeight: 200,
                includeSelectAllOption: true,
                selectAllText: 'Select All',
                buttonText: function (options, select) {
                    return 'Select Fleet';
                },
            });
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function BindGetDisruptionType() {
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Reports/GetDisruptionType",
        dataType: 'json',
        data: {},
        success: function (subcategories) {
            type = [];
            for (var j = 0; j < subcategories.length; j++) {
                type.push(subcategories[j])
            }
            // console.log(time)
            $('#ScltType').html('');

            for (var j = 0; j < type.length; j++) {
                //console.log(fleet[j].DisruptionTypeId + ' - ' + fleet[j].DisruptionType)
                $('#ScltType').append('<option value="' + type[j].DisruptionTypeId + '">' + type[j].DisruptionType + '</option>');
            }

            $('#ScltType').multiselect({
                maxHeight: 200,
                includeSelectAllOption: true,
                selectAllText: 'Select All',
                buttonText: function (options, select) {
                    return 'Select Type';
                },
            });
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

// grid 
function LoadCrewReportGrid() {

    /* $("#Gridoverlay").show();*/

    $("#CrewRosterReport").jqGrid({
        url: applicationUrl + "Report/GetCrewRosterReport",
        datatype: "json",
        mtype: 'POST',
        postData: {
            FromDate: function () { return $("#TxtFromDate").val(); },
            Todate: function () { return $("#TxtToDate").val(); },
            Crewtype: function () { return $("#TxtRank").val(); },
            empname: function () {
                console.log("grid empname", $("#EmployeeName").val())
                if ($("#EmployeeName").val()) {
                    return $("#EmployeeName").val();
                } else {
                    return "";
                }
            },
            staffId: function () { return $("#sltStaffID").val(); },
            Base: function () { return $("#baseCode").val(); },
            reportType: function () { return reportType },
        },
        colNames: ['Duty Date', 'Staff ID', 'Employee Name', 'Rank', 'Employee Category', 'Base', 'Planned Duty', 'Actual Duty', 'Changes', 'Notification Time Gap', 'Reporting start time', 'Changed On', 'Changed By', 'Notified On', 'Remarks'],
        colModel: [
            { hidden: false, name: 'DutyDate', index: 'DutyDate', align: "center" },
            { hidden: false, name: 'StaffID', index: 'StaffID', align: "center" },
            { hidden: false, name: 'EmployeeName', index: 'EmployeeName', align: "center" },
            { hidden: false, name: 'Rank', index: 'Rank', align: "center" },
            { hidden: true, name: 'EmployeeCategory', index: 'EmployeeCategory', align: "center" },
            { hidden: false, name: 'Base', index: 'Base', align: "center" },
            { hidden: false, name: 'PlannedDuty', index: 'PlannedDuty', align: "center" },
            { hidden: false, name: 'ActualDuty', index: 'ActualDuty', align: "center" },
            { hidden: false, name: 'Changes', index: 'Changes', align: "center" },
            { hidden: false, name: 'NotificationTimeGap', index: 'NotificationTimeGap', align: "center" },
            { hidden: false, name: 'Reportingstarttime', index: 'Reportingstarttime', align: "center" },
            { hidden: false, name: 'ChangedOn', index: 'ChangedOn', align: "center" },
            { hidden: false, name: 'ChangedBy', index: 'ChangedBy', align: "center" },
            { hidden: false, name: 'NotifiedOn', index: 'NotifiedOn', align: "center" },
            { hidden: false, name: 'Remarks', index: 'Remarks', align: "center" },
        ],
        pager: jQuery('#pagerCrewRosterReportGrid'),
        rowNum: 100,
        rownumbers: true,
        rowList: [10, 20, 30, 40, 50, 100],
        height: 400,
        width: '100%',
        autowidth: true,
        loadonce: true,
        viewrecords: true,
        cmTemplate: { title: false },
        // gridview: true,
        sortname: 'StaffID',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        gridComplete: function () {
            var objRows = $("#CrewRosterReport tr");
            var objHeader = $("#CrewRosterReport .jqgfirstrow td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        multiselect: false,
    }).navGrid('#pagerCrewRosterReportGrid', { edit: false, add: false, del: false, search: false, refresh: false })

    $("#CrewRosterReport").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true, searchOperators: false });
    //jQuery("#CrewRosterReport").jqGrid('navGrid', '#pagerCrewRosterReportGrid', { del: false, add: false, edit: false, search: false });
    //jQuery("#CrewRosterReport").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true });
}

function ReLoadCrewReportGrid() {
    $("#CrewRosterReport").jqGrid('setGridParam', { datatype: 'json', search: true, postData: { "filters": "" } }).trigger("reloadGrid", [{ current: true, page: 1 }]);
}





function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    //CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "Crew_roaster_report_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    console.log(document.body);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function demoFromHTML() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let thead_tr = document.createElement('tr');
    table.className = "table table-striped";

    var data = $('#CrewRosterReport').jqGrid('getRowData');
    //let sample = jsonResult.Products[0];
    let columns_obj = getColumns(data);

    let columns = [];
    for (let i = 0; i < columns_obj.length; i++) {
        columns.push(columns_obj[i].headertext)
    }

    //for (let column in sample) columns.push(column);    
    for (let i = 0; i < columns.length; i++) {
        let th = document.createElement('th');
        th.innerText = columns[i];
        thead_tr.appendChild(th);
    }
    thead.appendChild(thead_tr);
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
        let product = data[i];
        for (let column = 0; column < columns.length; column++) {
            let td = document.createElement('td');
            td.innerText = product[columns[column]];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(thead);
    table.appendChild(tbody);

    $("#pdftable").html(table);
    //console.log(table)
    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#pdftable')[0];


    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 40,
        bottom: 40,
        left: 20,
        width: 550
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, {// y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
    },
        function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF 
            //          this allow the insertion of new lines after html
            pdf.save('Test.pdf');
            $("#pdftable").hide()
        }
        , margins);
}



// Dropdown Api callbacks

// onChanges APi Calls
function GetBaseDD() {

    $("#overlay").show();

    $.ajax({
        type: 'POST',
        url: applicationUrl + "Report/GetBaseListForDD_rpt",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
        },
        success: function (data) {
            console.log("data", data)
            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }

            //$("#baseCode").multiselect('destroy');
            $('#baseCode').html('');
            console.log("type", type)
            $('#baseCode').append('<option value="0">Select Base</option>');
            for (var j = 0; j < type.length; j++) {
                //console.log(fleet[j].DisruptionTypeId + ' - ' + fleet[j].DisruptionType)
                $('#baseCode').append('<option value="' + type[j].Id + '">' + type[j].item + '</option>');
            }

            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function loadRankWithSignleDD() {


    $("#overlay").show();

    console.log("loadRankWithSignleDD..", $("#baseCode").val());
    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Report/Get_RankListForDD_rpt",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
        },
        success: function (data) {

            console.log("load single data..", data)
            RankDDType = 1;

            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }
            $('#TxtRank').html('');
            $('#TxtRank').append('<option value="0">Select Rank</option>');
            for (var j = 0; j < type.length; j++) {
                $('#TxtRank').append('<option value="' + type[j].Id + '">' + type[j].item + '</option>');
            }
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function GetStaffIdAndEmployeeName() {

    $("#overlay").show();

    // staffid
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Report/Get_StaffListForDD_rpt",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () { return $("#TxtRank").val(); },
        },
        success: function (data) {
            console.log("staff id", data)
            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }

            $("#sltStaffID").multiselect('destroy');
            $('#sltStaffID').html('');

            for (var j = 0; j < type.length; j++) {
                $('#sltStaffID').append('<option value="' + type[j].Id + '">' + type[j].item + '</option>');
            }

            $('#sltStaffID').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                maxHeight: 300,
                nonSelectedText: 'Select Staff Id',
                onChange: function () {
                    console.log('EmployeeName lib chnage', $("#sltStaffID").val());
                    if ($("#sltStaffID").val() != null) {
                        $("#EmployeeName").multiselect("disable");
                    } else {
                        $("#EmployeeName").multiselect("enable");
                    }
                },
                onSelectAll: function () {
                    $("#EmployeeName").multiselect("disable");
                },
                onDeselectAll: function () {
                    $("#EmployeeName").multiselect("enable");
                }
            });
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

    // employeeName
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Report/Get_EmployeeNameForDD_rpt",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () { return $("#TxtRank").val(); }
        },
        success: function (data) {
            console.log("staff id", data)
            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }

            $("#EmployeeName").multiselect('destroy');
            $('#EmployeeName').html('');

            for (var j = 0; j < type.length; j++) {
                $('#EmployeeName').append('<option value="' + type[j].Id + '">' + type[j].item + '</option>');
            }
            $('#EmployeeName').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                maxHeight: 300,
                nonSelectedText: 'Select Employee Name',
                onChange: function () {
                    console.log('sltStaffID lib chnage', $("#sltStaffID").val());
                    if ($("#EmployeeName").val() != null) {
                        $("#sltStaffID").multiselect("disable");
                    } else {
                        $("#sltStaffID").multiselect("enable");
                    }
                },
                onSelectAll: function () {
                    $("#sltStaffID").multiselect("disable");
                },
                onDeselectAll: function () {
                    $("#sltStaffID").multiselect("enable");
                }
            });

            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}