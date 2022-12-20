var applicationUrl;
var ProfileDetail;
var status
var reportType = 1;
var ddTpye = 0
var RankDDType = 2;
var DashboardType = 0;

var DrilldownValue = 0;

var drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

var baseSelected = 0;
var SelectedRank = 0;
var SelectedStaffId = 0;
var SelectedChangeType_glob = 0;
var fromDate = '', toDate = '';
var sector = [], station = [], fleet = [], time = [], type = []
// GRID LOAD STATUS PARAMS
var rankwiseGrid = false, basewiseGrid = false, rosterwiseGrid = false, monthwiseGrid = false, staffwiseSingleGrid = false, staffwiseMultipleGrid = false, staffnDatewiseGrid = false, onloadwiseGrid = false

$(document).ready(function (event) {

    $('#TxtRankSingleSelect').hide();
    $("#overlay").hide();
    $("#filter-table").css("display", "block");
    // loadRankWithMultipleDD();
    applicationUrl = $("#applicationPath").val();

    $("#report_0").hide();
    $("#report_1").hide();
    $("#report_2").hide();
    $("#rosterChart").hide();
    $("#monthChart").hide();
    $("#dateWiseChartFilter").hide();
    $("#topWiseChartFilter").hide();
    $("#topCaseWiseChartFilter").hide();



    $('#SelRosterDD').next().hide();
    $('#SelMonthDD').next().hide();

    //$("#baseCode").next().hide();
    //$("#TxtRankMultiselect").next().hide();
    //$("#sltStaffID").next().hide();
    //$("#EmployeeName").next().hide();

    fromDate = moment().clone().subtract(1, 'days').startOf('month').format('DD-MM-YYYY');
     toDate = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');

   // fromDate = '01-01-2022';
   // toDate = '28-02-2022';

    // on load 

    //loadOnloadChart();
    loadOnloadChart_secOne();
    loadOnloadChart_secTwo();
    loadOnloadChart_secThree();
    LoadOnloadWiseGrid();
    $("#OnloadChart_one").show();
    $("#OnloadChart_two").show();
    $("#OnloadChart_three").show();
    $("#OnloadGridSec").hide();


    $('#TxtRankMultiselect').next().show();
    $('#TxtRankMultiselect').css("display", "block");
    $('#TxtRankSingleSelect').hide();


    //var OnloadGridwidth = $("#OnloadGrid").closest(".ui-jqgrid").parent().width();
    //console.log("OnloadGridwidth", OnloadGridwidth);
    //$("#OnloadGrid").jqGrid("setGridWidth", OnloadGridwidth, true);

    $('#sltStaffID').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        maxHeight: 300,
        enableCaseInsensitiveFiltering: true,
        enableFullValueFiltering: true,
        includeFilterClearBtn: true,
        nonSelectedText: 'Select StaffId',
        onChange: function () {
            var selCout = $("#sltStaffID").val();
            //StaffCout = selCout.length;
            console.log("here", $("#sltStaffID").val())
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
        enableCaseInsensitiveFiltering: true,
        enableFullValueFiltering: true,
        includeFilterClearBtn: true,
        nonSelectedText: 'Select Employee Name',
        onChange: function () {
            console.log("here", $("#EmployeeName").val())
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

    $('#baseCode').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        maxHeight: 300,
        enableCaseInsensitiveFiltering: true,
        enableFullValueFiltering: true,
        includeFilterClearBtn: true,
        nonSelectedText: 'Select Base Code',
        onChange: function () {
            var len = $('#baseCode').val();
            console.log("len", len)
            if (len != null) {
                if (len.length > 0) {
                    $("#overlay").show();
                    RankDDType = 1;
                    //loadRankWithSignleDD();
                    loadRankWithMultipleDD();
                    GetStaffIdAndEmployeeName();
                } else {
                    RankDDType = 2;
                    loadRankWithMultipleDD();
                    GetStaffIdAndEmployeeName();
                    $('#TxtRankMultiselect').next().show();
                    $('#TxtRankMultiselect').css("display", "block");
                    $('#TxtRankSingleSelect').hide();
                }
            } else {
                RankDDType = 2;
                loadRankWithMultipleDD();
                GetStaffIdAndEmployeeName();
                $('#TxtRankMultiselect').next().show();
                $('#TxtRankMultiselect').css("display", "block");
                $('#TxtRankSingleSelect').hide();
            }

        },
        onSelectAll: function () {
            GetStaffIdAndEmployeeName();
            // loadRankWithSignleDD();
        },
        onDeselectAll: function () {
            $('#TxtRankMultiselect').next().show();
            $('#TxtRankMultiselect').css("display", "block");
            $('#TxtRankSingleSelect').hide();
            GetStaffIdAndEmployeeName();
            //loadRankWithSignleDD();
        }
    });

    $('#TxtRankMultiselect').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        maxHeight: 300,
        enableCaseInsensitiveFiltering: true,
        enableFullValueFiltering: true,
        includeFilterClearBtn: true,
        nonSelectedText: 'Select Rank',
        onChange: function () {
            if (DashboardType != 3) {
                //console.log("Problem is here");
                GetStaffIdAndEmployeeName();
            }


        },
        onSelectAll: function () {
            if (DashboardType != 3) {
                //console.log("Problem is here");
                GetStaffIdAndEmployeeName();
            }

        },
        onDeselectAll: function () {
            if (DashboardType != 3) {
                //console.log("Problem is here");
                GetStaffIdAndEmployeeName();
            }

        }
    });

    $('#SelRosterDD').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        maxHeight: 300,
        enableCaseInsensitiveFiltering: true,
        enableFullValueFiltering: true,
        includeFilterClearBtn: true,
        nonSelectedText: 'Select Roster',
        onChange: function () {

        },
        onSelectAll: function () {

        },
        onDeselectAll: function () {

        }
    });

    $('#SelMonthDD').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        maxHeight: 300,
        enableCaseInsensitiveFiltering: true,
        enableFullValueFiltering: true,
        includeFilterClearBtn: true,
        nonSelectedText: 'Select Month',
        onChange: function () {

        },
        onSelectAll: function () {

        },
        onDeselectAll: function () {

        }
    });

    $('#SelRosterDD').next().hide();
    $('#SelMonthDD').next().hide();

    $("#baseCode").next().hide();
    $("#TxtRankMultiselect").next().hide();
    $("#sltStaffID").next().hide();
    $("#EmployeeName").next().hide();

    //$('input[type=radio][name=reportType]').change(function () {
    //    if (this.value == '1') {
    //        ddTpye = 1;
    //        GetRosterDD();
    //        $('#SelRosterDD').next().show();
    //        $('#SelMonthDD').next().hide();
    //       // ReLoadCrewReportGrid();
    //    }
    //    else if (this.value == '2') {
    //        ddTpye = 2;
    //        GetMonthDD();
    //        $('#SelRosterDD').next().hide();
    //        $('#SelMonthDD').next().show();
    //      //  ReLoadCrewReportGrid();
    //    }
    //});

    //LoadCrewReportGrid()



    $("#datewise").click(function () {
        $("#collapseTwo").removeClass("show")

        DashboardType = 0

        document.getElementById('dateRangeDD').value = '0';
        $("#TxtFromDate").val('');
        $("#TxtToDate").val('');

        $("#baseCode").multiselect("clearSelection");
        //$("#baseCode").multiselect('refresh');

        $("#SelMonthDD").multiselect("clearSelection");
        //$("#SelMonthDD").multiselect('refresh');

        $("#SelRosterDD").multiselect("clearSelection");
        //$("#SelRosterDD").multiselect('refresh');

        $("#TxtRankMultiselect").multiselect("clearSelection");
        //$("#TxtRankMultiselect").multiselect('refresh');

        var staffIds = $("#sltStaffID").val();
        var empids = $("#EmployeeName").val();

        if (staffIds) {
            if (staffIds.length > 0) {
                $("#sltStaffID").multiselect("clearSelection");
                //$("#sltStaffID").multiselect('refresh');
            }
        }

        if (empids) {
            if (empids.length > 0) {
                $("#EmployeeName").multiselect("clearSelection");
                //$("#EmployeeName").multiselect('refresh');
            }
        }

        console.log('fourth checkbox checked');
        $("#rosterRelease").attr("disabled", true);
        $("#monthWise").attr("disabled", true);
        $("#rankwise").attr("disabled", true);

        $('#SelRosterDD').next().hide();
        $('#SelMonthDD').next().hide();
        $("#baseCode").next().hide();
        $("#TxtRankMultiselect").next().hide();
        $("#sltStaffID").next().hide();
        $("#EmployeeName").next().hide();



    });

    $("#rosterWise").click(function () {

        $("#collapseTwo").removeClass("show")

        $("#SelMonthDD").multiselect("clearSelection");
        $("#SelMonthDD").multiselect('destroy');
        $('#SelMonthDD').next().hide();

        DashboardType = 1

        document.getElementById('dateRangeDD').value = '0';
        $("#TxtFromDate").val('');
        $("#TxtToDate").val('');

        console.log('frist checkbox checked');
        $("#monthWise").attr("disabled", true);
        $("#rankwise").attr("disabled", true);
        $("#staffwise").attr("disabled", true);
        GetRosterDD();
        $('#SelRosterDD').next().show();

        $("#baseCode").next().hide();
        $("#TxtRankMultiselect").next().hide();
        $("#sltStaffID").next().hide();
        $("#EmployeeName").next().hide();



    });

    $("#monthwise").click(function () {

        $("#collapseTwo").removeClass("show")

        $("#SelRosterDD").multiselect("clearSelection");
        $("#SelRosterDD").multiselect('destroy');
        $('#SelRosterDD').next().hide();
        DashboardType = 2

        document.getElementById('dateRangeDD').value = '0';
        $("#TxtFromDate").val('');
        $("#TxtToDate").val('');

        console.log('sec checkbox checked');
        $("#rosterRelease").attr("disabled", true);
        $("#rankwise").attr("disabled", true);
        $("#staffwise").attr("disabled", true);
        GetMonthDD();
        $('#SelMonthDD').next().show();

        $("#baseCode").next().hide();
        $("#TxtRankMultiselect").next().hide();
        $("#sltStaffID").next().hide();
        $("#EmployeeName").next().hide();



    });

    $("#rankwise").click(function () {

        $("#collapseTwo").removeClass("show")

        DashboardType = 3
        console.log('third checkbox checked');

        document.getElementById('dateRangeDD').value = '0';
        $("#TxtFromDate").val('');
        $("#TxtToDate").val('');

        $("#rosterRelease").attr("disabled", true);
        $("#monthWise").attr("disabled", true);
        $("#staffwise").attr("disabled", true);

        //$("#baseCode").next().show();
        $("#TxtRankMultiselect").next().show();
        //$("#sltStaffID").next().show();
        //$("#EmployeeName").next().show();

        $('#SelRosterDD').next().hide();
        $('#SelMonthDD').next().hide();

        $("#baseCode").next().hide();
        //$("#TxtRankMultiselect").next().hide();
        $("#sltStaffID").next().hide();
        $("#EmployeeName").next().hide();



    });

    $("#staffwise").click(function () {

        $("#collapseTwo").removeClass("show")

        DashboardType = 4
        console.log('fifth checkbox checked');

        document.getElementById('dateRangeDD').value = '0';

        $("#TxtFromDate").val('');
        $("#TxtToDate").val('');

        $("#SelMonthDD").multiselect("clearSelection");
        //$("#SelMonthDD").multiselect('refresh');

        $("#SelRosterDD").multiselect("clearSelection");
        //$("#SelRosterDD").multiselect('refresh');
        $("#rosterRelease").attr("disabled", true);
        $("#monthWise").attr("disabled", true);
        $("#rankwise").attr("disabled", true);

        $('#SelRosterDD').next().hide();
        $('#SelMonthDD').next().hide();
        $("#baseCode").next().show();
        $("#TxtRankMultiselect").next().show();
        $("#sltStaffID").next().show();
        $("#EmployeeName").next().show();

        /////////////////////////



        fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().endOf('month').format('DD-MM-YYYY');

        $("#baseCode").multiselect("clearSelection");
        //$("#baseCode").multiselect('refresh');

        //$("#SelMonthDD").multiselect("clearSelection");
        ////$("#SelMonthDD").multiselect('refresh');

        //$("#SelRosterDD").multiselect("clearSelection");
        ////$("#SelRosterDD").multiselect('refresh');

        $("#TxtRankMultiselect").multiselect("clearSelection");
        //$("#TxtRankMultiselect").multiselect('refresh');

        var staffIds = $("#sltStaffID").val();
        var empids = $("#EmployeeName").val();

        if (staffIds) {
            if (staffIds.length > 0) {
                $("#sltStaffID").multiselect("clearSelection");
                //$("#sltStaffID").multiselect('refresh');
            }
        }

        if (empids) {
            if (empids.length > 0) {
                $("#EmployeeName").multiselect("clearSelection");
                //$("#EmployeeName").multiselect('refresh');
            }
        }

        //$("#rosterRelease").removeAttr('checked');
        //$("#monthWise").removeAttr('checked');
        //$("#rankwise").removeAttr('checked');
        //$("#staffwise").removeAttr('checked');

        //$("#rosterRelease").attr("disabled", false);
        //$("#monthWise").attr("disabled", false);
        //$("#rankwise").attr("disabled", false);
        //$("#staffwise").attr("disabled", false);
        //$("#rosterChart").hide();
        //$("#monthChart").hide();

        //$('#SelRosterDD').next().hide();
        //$('#SelMonthDD').next().hide();

        //$("#overlay").hide();

        //rankwiseGrid = false;
        //basewiseGrid = false;
        //rosterwiseGrid = false;
        //monthwiseGrid = false;
        //staffwiseSingleGrid = false;
        //staffwiseMultipleGrid = false;

        //$("#baseCode").next().hide();
        //$("#TxtRankMultiselect").next().hide();
        //$("#sltStaffID").next().hide();
        //$("#EmployeeName").next().hide();

    });


    $("#btnClearDetails").click(function () {

        $("#overlay").show();

        if (DashboardType == 0) {
            //Onload wise
            DashboardType = 0;
            $("#TxtFromDate").val('');
            $("#TxtToDate").val('');

            fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
            toDate = moment().clone().endOf('month').format('DD-MM-YYYY');

            $("#baseCode").multiselect("clearSelection");
            //$("#baseCode").multiselect('refresh');

            $("#SelMonthDD").multiselect("clearSelection");
            //$("#SelMonthDD").multiselect('refresh');

            $("#SelRosterDD").multiselect("clearSelection");
            //$("#SelRosterDD").multiselect('refresh');

            $("#TxtRankMultiselect").multiselect("clearSelection");
            //$("#TxtRankMultiselect").multiselect('refresh');

            var staffIds = $("#sltStaffID").val();
            var empids = $("#EmployeeName").val();

            if (staffIds) {
                if (staffIds.length > 0) {
                    $("#sltStaffID").multiselect("clearSelection");
                    //$("#sltStaffID").multiselect('refresh');
                }
            }

            if (empids) {
                if (empids.length > 0) {
                    $("#EmployeeName").multiselect("clearSelection");
                    //$("#EmployeeName").multiselect('refresh');
                }
            }

            $("#rosterRelease").removeAttr('checked');
            $("#monthWise").removeAttr('checked');
            $("#rankwise").removeAttr('checked');
            $("#staffwise").removeAttr('checked');

            $("#rosterRelease").attr("disabled", false);
            $("#monthWise").attr("disabled", false);
            $("#rankwise").attr("disabled", false);
            $("#staffwise").attr("disabled", false);
            $("#rosterChart").hide();
            $("#monthChart").hide();

            $('#SelRosterDD').next().hide();
            $('#SelMonthDD').next().hide();


        }
        else if (DashboardType == 1) {
            //Roster wise
            DashboardType = 1;
            $("#TxtFromDate").val('');
            $("#TxtToDate").val('');

            fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
            toDate = moment().clone().endOf('month').format('DD-MM-YYYY');

            $("#baseCode").multiselect("clearSelection");
            //$("#baseCode").multiselect('refresh');

            $("#SelMonthDD").multiselect("clearSelection");
            //$("#SelMonthDD").multiselect('refresh');

            $("#SelRosterDD").multiselect("clearSelection");
            //$("#SelRosterDD").multiselect('refresh');

            $("#TxtRankMultiselect").multiselect("clearSelection");
            //$("#TxtRankMultiselect").multiselect('refresh');

            var staffIds = $("#sltStaffID").val();
            var empids = $("#EmployeeName").val();

            if (staffIds) {
                if (staffIds.length > 0) {
                    $("#sltStaffID").multiselect("clearSelection");
                    //$("#sltStaffID").multiselect('refresh');
                }
            }

            if (empids) {
                if (empids.length > 0) {
                    $("#EmployeeName").multiselect("clearSelection");
                    //$("#EmployeeName").multiselect('refresh');
                }
            }

            $("#rosterRelease").removeAttr('checked');
            $("#monthWise").removeAttr('checked');
            $("#rankwise").removeAttr('checked');
            $("#staffwise").removeAttr('checked');

            $("#rosterRelease").attr("disabled", false);
            $("#monthWise").attr("disabled", false);
            $("#rankwise").attr("disabled", false);
            $("#staffwise").attr("disabled", false);
            $("#rosterChart").hide();
            $("#monthChart").hide();

            //$('#SelRosterDD').next().hide();
            $('#TxtRankMultiselect').next().hide();

            $('#SelMonthDD').next().hide();


        }
        else if (DashboardType == 2) {
            DashboardType = 2;
            $("#TxtFromDate").val('');
            $("#TxtToDate").val('');

            fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
            toDate = moment().clone().endOf('month').format('DD-MM-YYYY');

            $("#baseCode").multiselect("clearSelection");
            //$("#baseCode").multiselect('refresh');

            $("#SelMonthDD").multiselect("clearSelection");
            //$("#SelMonthDD").multiselect('refresh');

            $("#SelRosterDD").multiselect("clearSelection");
            //$("#SelRosterDD").multiselect('refresh');

            $("#TxtRankMultiselect").multiselect("clearSelection");
            //$("#TxtRankMultiselect").multiselect('refresh');

            var staffIds = $("#sltStaffID").val();
            var empids = $("#EmployeeName").val();

            if (staffIds) {
                if (staffIds.length > 0) {
                    $("#sltStaffID").multiselect("clearSelection");
                    //$("#sltStaffID").multiselect('refresh');
                }
            }

            if (empids) {
                if (empids.length > 0) {
                    $("#EmployeeName").multiselect("clearSelection");
                    //$("#EmployeeName").multiselect('refresh');
                }
            }

            $("#rosterRelease").removeAttr('checked');
            $("#monthWise").removeAttr('checked');
            $("#rankwise").removeAttr('checked');
            $("#staffwise").removeAttr('checked');

            $("#rosterRelease").attr("disabled", false);
            $("#monthWise").attr("disabled", false);
            $("#rankwise").attr("disabled", false);
            $("#staffwise").attr("disabled", false);
            $("#rosterChart").hide();
            $("#monthChart").hide();

            $('#SelRosterDD').next().hide();
            $('#TxtRankMultiselect').next().hide();
            //$('#SelMonthDD').next().hide();


        }
        else if (DashboardType == 3) {
            DashboardType = 3;
            $("#TxtFromDate").val('');
            $("#TxtToDate").val('');

            fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
            toDate = moment().clone().endOf('month').format('DD-MM-YYYY');

            $("#baseCode").multiselect("clearSelection");
            //$("#baseCode").multiselect('refresh');

            $("#SelMonthDD").multiselect("clearSelection");
            //$("#SelMonthDD").multiselect('refresh');

            $("#SelRosterDD").multiselect("clearSelection");
            //$("#SelRosterDD").multiselect('refresh');

            $("#TxtRankMultiselect").multiselect("clearSelection");
            //$("#TxtRankMultiselect").multiselect('refresh');

            var staffIds = $("#sltStaffID").val();
            var empids = $("#EmployeeName").val();

            if (staffIds) {
                if (staffIds.length > 0) {
                    $("#sltStaffID").multiselect("clearSelection");
                    //$("#sltStaffID").multiselect('refresh');
                }
            }

            if (empids) {
                if (empids.length > 0) {
                    $("#EmployeeName").multiselect("clearSelection");
                    //$("#EmployeeName").multiselect('refresh');
                }
            }

            $("#rosterRelease").removeAttr('checked');
            $("#monthWise").removeAttr('checked');
            $("#rankwise").removeAttr('checked');
            $("#staffwise").removeAttr('checked');

            $("#rosterRelease").attr("disabled", false);
            $("#monthWise").attr("disabled", false);
            $("#rankwise").attr("disabled", false);
            $("#staffwise").attr("disabled", false);
            $("#rosterChart").hide();
            $("#monthChart").hide();

            $('#SelRosterDD').next().hide();
            $('#SelMonthDD').next().hide();


        }
        else if (DashboardType == 4) {
            DashboardType = 4;
            $("#TxtFromDate").val('');
            $("#TxtToDate").val('');

            fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
            toDate = moment().clone().endOf('month').format('DD-MM-YYYY');

            $("#baseCode").multiselect("clearSelection");
            //$("#baseCode").multiselect('refresh');

            $("#SelMonthDD").multiselect("clearSelection");
            //$("#SelMonthDD").multiselect('refresh');

            $("#SelRosterDD").multiselect("clearSelection");
            //$("#SelRosterDD").multiselect('refresh');

            $("#TxtRankMultiselect").multiselect("clearSelection");
            //$("#TxtRankMultiselect").multiselect('refresh');

            var staffIds = $("#sltStaffID").val();
            var empids = $("#EmployeeName").val();

            if (staffIds) {
                if (staffIds.length > 0) {
                    $("#sltStaffID").multiselect("clearSelection");
                    //$("#sltStaffID").multiselect('refresh');
                }
            }

            if (empids) {
                if (empids.length > 0) {
                    $("#EmployeeName").multiselect("clearSelection");
                    //$("#EmployeeName").multiselect('refresh');
                }
            }

            $("#rosterRelease").removeAttr('checked');
            $("#monthWise").removeAttr('checked');
            $("#rankwise").removeAttr('checked');
            $("#staffwise").removeAttr('checked');

            $("#rosterRelease").attr("disabled", false);
            $("#monthWise").attr("disabled", false);
            $("#rankwise").attr("disabled", false);
            $("#staffwise").attr("disabled", false);
            $("#rosterChart").hide();
            $("#monthChart").hide();

            $('#SelRosterDD').next().hide();
            $('#SelMonthDD').next().hide();


        }
        else {
            DashboardType = 0;
            $("#TxtFromDate").val('');
            $("#TxtToDate").val('');

            fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
            toDate = moment().clone().endOf('month').format('DD-MM-YYYY');

            $("#baseCode").multiselect("clearSelection");
            //$("#baseCode").multiselect('refresh');

            $("#SelMonthDD").multiselect("clearSelection");
            //$("#SelMonthDD").multiselect('refresh');

            $("#SelRosterDD").multiselect("clearSelection");
            //$("#SelRosterDD").multiselect('refresh');

            $("#TxtRankMultiselect").multiselect("clearSelection");
            //$("#TxtRankMultiselect").multiselect('refresh');

            var staffIds = $("#sltStaffID").val();
            var empids = $("#EmployeeName").val();

            if (staffIds) {
                if (staffIds.length > 0) {
                    $("#sltStaffID").multiselect("clearSelection");
                    //$("#sltStaffID").multiselect('refresh');
                }
            }

            if (empids) {
                if (empids.length > 0) {
                    $("#EmployeeName").multiselect("clearSelection");
                    //$("#EmployeeName").multiselect('refresh');
                }
            }

            $("#rosterRelease").removeAttr('checked');
            $("#monthWise").removeAttr('checked');
            $("#rankwise").removeAttr('checked');
            $("#staffwise").removeAttr('checked');

            $("#rosterRelease").attr("disabled", false);
            $("#monthWise").attr("disabled", false);
            $("#rankwise").attr("disabled", false);
            $("#staffwise").attr("disabled", false);
            $("#rosterChart").hide();
            $("#monthChart").hide();

            $('#SelRosterDD').next().hide();
            $('#SelMonthDD').next().hide();
            $('#TxtRankMultiselect').next().hide();


        }


        $("#overlay").hide();

        rankwiseGrid = false;
        basewiseGrid = false;
        rosterwiseGrid = false;
        monthwiseGrid = false;
        staffwiseSingleGrid = false;
        staffwiseMultipleGrid = false;

        //$("#baseCode").next().hide();
        //$("#TxtRankMultiselect").next().hide();
        //$("#sltStaffID").next().hide();
        //$("#EmployeeName").next().hide();

        $("#report_0").hide();
        $("#report_1").hide();
        $("#report_2").hide();
        $("#rosterChart").hide();
        $("#monthChart").hide();
        $("#rosterChart_one").hide();
        $("#rosterChart_two").hide();
        $("#rosterChart_three").hide();
        $("#monthChart").hide();
        $("#OnloadChart_one").hide();
        $("#OnloadChart_two").hide();
        $("#OnloadChart_three").hide();
        $("#full_screen_chart_sec").hide();
        $("#baseWisegridSec").hide();
        $("#staffWiseGridSec").hide();
        $("#staffnDateWiseGridSec").hide();
        $("#rankWiseGridSec").hide();
        $("#OnloadGridSec").hide();


    });

    // Click To  Details grids
    var firstClick = true;
    $("#btnShowDetails").click(function () {

        $("#staffWiseGridSec").hide();
        $("#baseWisegridSec").hide();
        $("#rankWiseGridSec").hide();
        $("#OnloadGridSec").hide();
        $("#staffnDateWiseGridSec").hide();

        $("#report_2").hide();
        $("#report_1").hide();
        $("#report_0").hide();

        $("#OnloadChart_one").hide();
        $("#OnloadChart_two").hide();
        $("#OnloadChart_three").hide();

        $("#rosterChart_one").hide();
        $("#rosterChart_two").hide();
        $("#rosterChart_three").hide();
        $("#full_screen_chart_sec").hide();

        var OnloadGridwidth = $("#OnloadGrid").closest(".ui-jqgrid").parent().width();
        $("#OnloadGrid").jqGrid("setGridWidth", OnloadGridwidth, true);

        var rankSelCout, StaffSelCount, employeeSelCount, baseCode;
        // month wise
        var month = $("#SelMonthDD").val();

        if (RankDDType == 1) {
            rankSelCout = $("#TxtRankSingleSelect").val();
        } else {
            console.log("RankDDType is 2", $("#TxtRankMultiselect").val());
            rankSelCout = $("#TxtRankMultiselect").val();
        }
        // rosterwise
        var roster = $("#SelRosterDD").val();
        StaffSelCount = $("#sltStaffID").val();
        baseCode = $("#baseCode").val();
        employeeSelCount = $("#EmployeeName").val();

        //console.log("RankDDType", RankDDType);
        //console.log("rankSelCout", rankSelCout);
        //console.log("StaffSelCount", StaffSelCount);
        //console.log("baseCode", baseCode);
        //console.log("employeeSelCount", employeeSelCount);
        //console.log("roster", roster);
        //console.log('DashboardType != 3', DashboardType);  

        console.log("DashboardType", DashboardType);
        if (DashboardType == 0 && (roster == null && month == null && (StaffSelCount == null && employeeSelCount == null) && baseCode == null && rankSelCout == null && DashboardType != 3 && DashboardType != 4)) {
            var from = $("#TxtFromDate").val();
            var to = $("#TxtToDate").val();

            var date1 = to;
            var date2 = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
            console.log("date1", date1)
            console.log("date2", date2)

            var date3 = moment(date1, "DD-MM-YYYY").toDate();
            console.log("date3", date3)
            var date4 = moment(date2, "DD-MM-YYYY").toDate();

            //var arrStartDate = date1.split("-");
            //var arrStartDate = date1.split("-");
            //console.log("arrStartDate", arrStartDate)
            //var date3 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
            //var date5 = new Date(2021, 1, 28);
            //var date3 = moment(date1, "DD-MM-YYYY").toDate();
            //console.log("date5", date5)
            ////console.log("date6", date6)
            //console.log("2", arrStartDate[2])
            //console.log("1", arrStartDate[1])
            //console.log("0", arrStartDate[0])
            // console.log("date3", date3)

            //var arrEndDate = date2.split("-");
            //var arrEndDate = date2.split("-");
            //console.log("arrEndDate", arrEndDate)
            //console.log("2", Date(arrEndDate[2]))
            //console.log("1", Date(arrEndDate[1]))
            //console.log("0", Date(arrEndDate[0]))
            //var date4 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);
            //var date4 = moment(date2, "DD-MM-YYYY").toDate();


            //date1 = $.datepicker.parseDate('dd/mm/yy', date1)
            //date2 = $.datepicker.parseDate('dd/mm/yy', date2)
            console.log("date1", date1)
            console.log("date2", date2)
            console.log("date3", date3)
            console.log("date4", date4)

            if (from != '' && to != '') {
                if (date3 > date4)
                    //if ($.datepicker.parseDate('dd/mm/yy', date1) > $.datepicker.parseDate('dd/mm/yy', date2))
                {
                    console.log("to Date selected", to)
                    console.log("Compare Date", moment().clone().subtract(1, 'days').format('DD-MM-YYYY'))
                    console.log("Testing Current date logic")
                    alert("Please select To Date less than the current date.. !!")
                }
                else {
                    fromDate = from;
                    toDate = to;
                    $("#OnloadChart_one").show();
                    $("#OnloadChart_two").show();
                    $("#OnloadChart_three").show();
                    $("#OnloadGridSec").hide();
                    loadOnloadChart_secOne();
                    loadOnloadChart_secTwo();
                    loadOnloadChart_secThree();
                    if (onloadwiseGrid == false) {
                        LoadOnloadWiseGrid();
                    } else {
                        ReLoadOnloadWiseGrid();
                    }
                    onloadwiseGrid = true;
                }
            }
            else {
                console.log("date wise")
                alert("Please select From Date & To Date.. !!")
            }
            return;
        }


        if (roster == null && month == null && (StaffSelCount == null && employeeSelCount == null) && baseCode == null && rankSelCout == null && DashboardType != 3 && DashboardType == 4) {
            console.log("date wise")
            var from = $("#TxtFromDate").val();
            var to = $("#TxtToDate").val();

            var date1 = to;
            var date2 = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
            console.log("date1", date1)
            console.log("date2", date2)

            var date3 = moment(date1, "DD-MM-YYYY").toDate();
            console.log("date3", date3)
            var date4 = moment(date2, "DD-MM-YYYY").toDate();

            //var arrStartDate = date1.split("-");
            //var date3 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
            //var arrEndDate = date2.split("-");
            //var date4 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);


            //date1 = $.datepicker.parseDate('dd/mm/yy', date1)
            //date2 = $.datepicker.parseDate('dd/mm/yy', date2)
            console.log("date1", date1)
            console.log("date2", date2)
            console.log("date3", date3)
            console.log("date4", date4)

            if (from != '' && to != '') {
                if (date3 > date4) {
                    console.log("date wise")
                    console.log("Testing Current date logic")
                    alert("Please select To Date less than the current date.. !!")
                }
                else {
                    $("#dateWiseChartFilter").show();
                    $("#topCaseWiseChartFilter").hide();

                    loadOnloadChart_dateWise('name for chart');
                    //LoadStaffWiseGrid();


                    if (staffwiseMultipleGrid == false) {
                        LoadStaffWiseGrid();
                    } else {
                        ReLoadStaffWiseGrid();
                    }
                    staffwiseMultipleGrid = true;

                    $("#full_screen_chart_sec").show();
                    $("#staffWiseGridSec").show();


                    console.log("Test 473");

                    var staffwiseGridwidth = $("#staffwiseGrid").closest(".ui-jqgrid").parent().width();
                    console.log("staffwiseGridwidth", staffwiseGridwidth);
                    $("#staffwiseGrid").jqGrid("setGridWidth", staffwiseGridwidth, true);

                }

            }

            else {
                console.log("date wise")
                alert("Please select From Date & To Date.. !!")
            }
            return;
        }
        else if ((StaffSelCount != null || employeeSelCount != null) && DashboardType != 3 && DashboardType == 4) {
            console.log('DashboardType where DashboardType != 3', DashboardType);
            var from = $("#TxtFromDate").val();
            var to = $("#TxtToDate").val();
            var date1 = to;
            var date2 = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
            console.log("date1", date1)
            console.log("date2", date2)

            var date3 = moment(date1, "DD-MM-YYYY").toDate();
            console.log("date3", date3)
            var date4 = moment(date2, "DD-MM-YYYY").toDate();

            //var arrStartDate = date1.split("-");
            //var date3 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
            //var arrEndDate = date2.split("-");
            //var date4 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);


            //date1 = $.datepicker.parseDate('dd/mm/yy', date1)
            //date2 = $.datepicker.parseDate('dd/mm/yy', date2)
            console.log("date1", date1)
            console.log("date2", date2)
            console.log("date3", date3)
            console.log("date4", date4)

            if (from != '' && to != '') {
                if (date3 > date4) {
                    console.log("date wise")
                    console.log("Testing Current date logic")
                    alert("Please select To Date less than the current date.. !!")
                }
                else {
                    $("#dateWiseChartFilter").hide();
                    $("#topCaseWiseChartFilter").show();
                    DrilldownValue = 0;

                    if (StaffSelCount) {
                        if (StaffSelCount.length == 1) {
                            getChartDataStaffIDfor_secOne_forOne();
                            getChartDataStaffIDfor_secTwo_forOne();
                            getChartDataStaffIDfor_secThree_forOne();

                            if (staffwiseSingleGrid == false) {
                                LoadStaffWiseGrid_typeTwo();
                            } else {
                                ReLoadStaffWiseGrid_typeTwo();
                            }
                            staffwiseSingleGrid = true;

                            $("#report_0").show();
                            $("#report_1").show();
                            $("#report_2").show();

                            $("#staffnDateWiseGridSec").show();
                            var staffnDatewiseGridwidth = $("#staffnDatewiseGrid").closest(".ui-jqgrid").parent().width();
                            console.log("staffnDatewiseGridwidth", staffnDatewiseGridwidth);
                            $("#staffnDatewiseGrid").jqGrid("setGridWidth", staffnDatewiseGridwidth, true);


                        }
                        else if (StaffSelCount.length > 1) {

                            // multiselect 
                            var from = $("#TxtFromDate").val();
                            var to = $("#TxtToDate").val();
                            if (from != '' && to != '') {

                                loadOnloadChart_MultStaffIdWise('name for chart');

                                if (staffwiseMultipleGrid == false) {
                                    LoadStaffWiseGrid();
                                } else {
                                    ReLoadStaffWiseGrid();
                                }
                                staffwiseMultipleGrid = true;
                                $("#full_screen_chart_sec").show();
                                $("#staffWiseGridSec").show();

                                var staffwiseGridwidth = $("#staffwiseGrid").closest(".ui-jqgrid").parent().width();
                                console.log("staffwiseGridwidth", staffwiseGridwidth);
                                $("#staffwiseGrid").jqGrid("setGridWidth", staffwiseGridwidth, true);




                            }
                        }
                    }

                    if (employeeSelCount) {

                        if (employeeSelCount.length == 1) {

                            getChartDataStaffIDfor_secOne_forOne();
                            getChartDataStaffIDfor_secTwo_forOne();
                            getChartDataStaffIDfor_secThree_forOne();

                            if (staffwiseSingleGrid == false) {
                                LoadStaffWiseGrid_typeTwo();
                            } else {
                                ReLoadStaffWiseGrid_typeTwo();
                            }
                            staffwiseSingleGrid = true;

                            $("#report_0").show();
                            $("#report_1").show();
                            $("#report_2").show();

                            $("#staffnDateWiseGridSec").show();

                            var staffnDatewiseGridwidth = $("#staffnDatewiseGrid").closest(".ui-jqgrid").parent().width();
                            console.log("staffnDatewiseGridwidth", staffnDatewiseGridwidth);
                            $("#staffnDatewiseGrid").jqGrid("setGridWidth", staffnDatewiseGridwidth, true);


                        } else if (employeeSelCount.length > 1) {

                            // multiselect 
                            var from = $("#TxtFromDate").val();
                            var to = $("#TxtToDate").val();
                            if (from != '' && to != '') {

                                loadOnloadChart_MultStaffIdWise('name for chart');

                                if (staffwiseMultipleGrid == false) {
                                    LoadStaffWiseGrid();
                                } else {
                                    ReLoadStaffWiseGrid();
                                }
                                staffwiseMultipleGrid = true;
                                $("#full_screen_chart_sec").show();
                                $("#staffWiseGridSec").show();

                                var staffwiseGridwidth = $("#staffwiseGrid").closest(".ui-jqgrid").parent().width();
                                console.log("staffwiseGridwidth", staffwiseGridwidth);
                                $("#staffwiseGrid").jqGrid("setGridWidth", staffwiseGridwidth, true);




                            }
                        }
                    }
                }


            }
            else {
                console.log("date wise")
                alert("Please select From Date & To Date.. !!")
            }
            return;
        }
        else if (DashboardType == 3) {
            //  rank wise cond
            var from = $("#TxtFromDate").val();
            var to = $("#TxtToDate").val();

            var date1 = to;
            var date2 = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
            console.log("date1", date1)
            console.log("date2", date2)

            var date3 = moment(date1, "DD-MM-YYYY").toDate();
            console.log("date3", date3)
            var date4 = moment(date2, "DD-MM-YYYY").toDate();

            //var arrStartDate = date1.split("-");
            //var date3 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
            //var arrEndDate = date2.split("-");
            //var date4 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);


            //date1 = $.datepicker.parseDate('dd/mm/yy', date1)
            //date2 = $.datepicker.parseDate('dd/mm/yy', date2)
            console.log("date1", date1)
            console.log("date2", date2)
            console.log("date3", date3)
            console.log("date4", date4)

            if (from != '' && to != '') {
                if (date3 > date4) {
                    console.log("date wise")
                    console.log("Testing Current date logic")
                    alert("Please select To Date less than the current date.. !!")
                }
                else {
                    if (rankSelCout) {
                        console.log("Rank wise test1")
                        console.log("to date", to)
                        console.log("Comapare to date", moment().clone().subtract(1, 'days').format('DD-MM-YYYY'))
                        if ((rankSelCout != null || rankSelCout.length != 0) && (StaffSelCount == null || employeeSelCount == null)) {
                            console.log("rank wise result", RankDDType);
                            // code
                            {
                                rankSelCout = $("#TxtRankMultiselect").val();
                                //var text = $('#TxtRankMultiselect option:selected').toArray().map(item => item.text).join();
                                var text = $('#TxtRankMultiselect option:selected').toArray().map(function (item) {
                                    return item.text;
                                });
                                let rank_name = text;
                                console.log("rankwiseGrid...", rank_name)

                                //if (rankwiseGrid == false) {
                                //    LoadRankWiseGrid();
                                //} else {
                                //    ReLoadRankWiseGrid();
                                //}

                                rankwiseGrid = true;
                                $("#rankWiseGridSec").show();
                                var rankwiseGridwidth = $("#rankwiseGrid").closest(".ui-jqgrid").parent().width();
                                console.log("rankwiseGridwidth", rankwiseGridwidth)
                                $("#rankwiseGrid").jqGrid("setGridWidth", rankwiseGridwidth, true);

                                if (rankSelCout.length > 3) {
                                    alert("Can not Select more then 3 .. !!")
                                    return false;
                                } else {
                                    if (rankSelCout.length == 1) {
                                        getChart_rank_secOne(rank_name[0]);
                                        $("#report_0").show();
                                        $("#report_1").hide();
                                        $("#report_2").hide();
                                    } else if (rankSelCout.length == 2) {
                                        getChart_rank_secOne(rank_name[0]);
                                        getChart_rank_secTwo(rank_name[1]);
                                        $("#report_0").show();
                                        $("#report_1").show();
                                        $("#report_2").hide();
                                    } else if (rankSelCout.length == 3) {
                                        getChart_rank_secOne(rank_name[0]);
                                        getChart_rank_secTwo(rank_name[1]);
                                        getChart_rank_secThree(rank_name[2]);
                                        $("#report_0").show();
                                        $("#report_1").show();
                                        $("#report_2").show();
                                    } else {
                                        $("#report_0").hide();
                                        $("#report_1").hide();
                                        $("#report_2").hide();
                                    }
                                }
                                return true;
                            }
                        }
                    }
                }

            }
            else {
                console.log("Rank wise test")
                alert("Please select From Date & To Date.. !!")
            }
            return;
        }
        else if (roster == null && month == null && (StaffSelCount == null && employeeSelCount == null) && DashboardType != 3 && DashboardType == 4) {
            var from = $("#TxtFromDate").val();
            var to = $("#TxtToDate").val();

            var date1 = to;
            var date2 = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
            console.log("date1", date1)
            console.log("date2", date2)

            var date3 = moment(date1, "DD-MM-YYYY").toDate();
            console.log("date3", date3)
            var date4 = moment(date2, "DD-MM-YYYY").toDate();

            //var arrStartDate = date1.split("-");
            //var date3 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
            //var arrEndDate = date2.split("-");
            //var date4 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);


            //date1 = $.datepicker.parseDate('dd/mm/yy', date1)
            //date2 = $.datepicker.parseDate('dd/mm/yy', date2)
            console.log("date1", date1)
            console.log("date2", date2)
            console.log("date3", date3)
            console.log("date4", date4)

            if (from != '' && to != '') {
                if (date3 > date4) {
                    console.log("date wise")
                    console.log("Testing Current date logic")
                    alert("Please select To Date less than the current date.. !!")
                }
                else {
                    $("#topCaseWiseChartFilter").show();
                    $("#dateWiseChartFilter").hide();
                    //$("#topWiseChartFilter").show();
                    loadOnloadChart_MultStaffIdWise('name for chart');

                    if (staffwiseMultipleGrid == false) {
                        LoadStaffWiseGrid();
                    } else {
                        ReLoadStaffWiseGrid();
                    }
                    staffwiseMultipleGrid = true;
                    $("#staffWiseGridSec").show();
                    console.log("testing 471 wise")
                    $("#full_screen_chart_sec").show();
                    console.log("testing 472 wise")
                    var staffwiseGridwidth = $("#staffwiseGrid").closest(".ui-jqgrid").parent().width();
                    console.log("staffwiseGridwidth", staffwiseGridwidth);
                    $("#staffwiseGrid").jqGrid("setGridWidth", staffwiseGridwidth, true);
                }

            }
            else {
                //console.log("Rank wise")
                alert("Please select From Date & To Date.. !!")
            }
            return;
        }

        console.log("DashboardType roster", roster)
        console.log("DashboardType month", month)

        if (roster) {
            var from = $("#TxtFromDate").val();
            var to = $("#TxtToDate").val();
            var date1 = to;
            var date2 = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
            console.log("date1", date1)
            console.log("date2", date2)

            var date3 = moment(date1, "DD-MM-YYYY").toDate();
            console.log("date3", date3)
            var date4 = moment(date2, "DD-MM-YYYY").toDate();

            //var arrStartDate = date1.split("-");
            //var date3 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
            //var arrEndDate = date2.split("-");
            //var date4 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);


            //date1 = $.datepicker.parseDate('dd/mm/yy', date1)
            //date2 = $.datepicker.parseDate('dd/mm/yy', date2)
            console.log("date1", date1)
            console.log("date2", date2)
            console.log("date3", date3)
            console.log("date4", date4)
            if (from != '' && to != '') {

                if (date3 > date4) {
                    console.log("date wise")
                    console.log("Testing Current date logic")
                    alert("Please select To Date less than the current date.. !!")
                }
                else {
                    if (roster.length != 0) {
                        if (roster.length > 3) {
                            alert("Can not Select more then 3 .. !!")
                            return false;
                        }
                        else {

                            //var text = $('#SelRosterDD option:selected').toArray().map(item => item.text).join();
                            var text = $('#SelRosterDD option:selected').toArray().map(function (item) {
                                return item.text;
                            });
                            console.log("text", text);
                            let roster_name = text;
                            console.log("roster_name", roster_name[0])

                            if (roster.length == 1) {
                                loadRosterChart_one(roster_name[0]);
                                $("#rosterChart_one").show();
                                $("#rosterChart_two").hide();
                                $("#rosterChart_three").hide();
                            } else if (roster.length == 2) {
                                loadRosterChart_one(roster_name[0]);
                                loadRosterChart_two(roster_name[1]);
                                $("#rosterChart_one").show();
                                $("#rosterChart_two").show();
                                $("#rosterChart_three").hide();
                            } else if (roster.length == 3) {
                                loadRosterChart_one(roster_name[0]);
                                loadRosterChart_two(roster_name[1]);
                                loadRosterChart_three(roster_name[2]);
                                $("#rosterChart_one").show();
                                $("#rosterChart_two").show();
                                $("#rosterChart_three").show();
                            } else {
                                $("#rosterChart_one").hide();
                                $("#rosterChart_two").hide();
                                $("#rosterChart_three").hide();
                            }
                            return
                        }
                    } else {
                        $("#rosterChart").hide();
                        return
                    }
                }
            }
            else {
                //console.log("Rank wise")
                alert("Please select From Date & To Date.. !!")
            }
            return;

        }

        if (month) {
            var from = $("#TxtFromDate").val();
            var to = $("#TxtToDate").val();

            var date1 = to;
            var date2 = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
            console.log("date1", date1)
            console.log("date2", date2)

            var date3 = moment(date1, "DD-MM-YYYY").toDate();
            console.log("date3", date3)
            var date4 = moment(date2, "DD-MM-YYYY").toDate();

            //var arrStartDate = date1.split("-");
            //var date3 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
            //var arrEndDate = date2.split("-");
            //var date4 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);


            //date1 = $.datepicker.parseDate('dd/mm/yy', date1)
            //date2 = $.datepicker.parseDate('dd/mm/yy', date2)
            console.log("date1", date1)
            console.log("date2", date2)
            console.log("date3", date3)
            console.log("date4", date4)

            if (from != '' && to != '') {

                if (date3 > date4) {
                    console.log("date wise")
                    console.log("Testing Current date logic")
                    alert("Please select To Date less than the current date.. !!")
                }
                else {
                    if (month.length != 0) {
                        if (month.length > 3) {
                            alert("Can not Select more then 3 .. !!")
                            return false;
                        } else {

                            //var text = $('#SelMonthDD option:selected').toArray().map(item => item.text).join();
                            var text = $('#SelMonthDD option:selected').toArray().map(function (item) {
                                return item.text;
                            });
                            let month_name = text;

                            console.log("month_name", month_name)

                            if (month.length == 1) {
                                loadMonthChart_one(month_name[0]);
                                $("#rosterChart_one").show();
                                $("#rosterChart_two").hide();
                                $("#rosterChart_three").hide();
                            } else if (month.length == 2) {
                                loadMonthChart_one(month_name[0]);
                                loadMonthChart_two(month_name[1]);
                                $("#rosterChart_one").show();
                                $("#rosterChart_two").show();
                                $("#rosterChart_three").hide();
                            } else if (month.length == 3) {
                                loadMonthChart_one(month_name[0]);
                                loadMonthChart_two(month_name[1]);
                                loadMonthChart_three(month_name[2]);
                                $("#rosterChart_one").show();
                                $("#rosterChart_two").show();
                                $("#rosterChart_three").show();
                            } else {
                                $("#rosterChart_one").hide();
                                $("#rosterChart_two").hide();
                                $("#rosterChart_three").hide();
                            }
                            return
                        }
                    } else {
                        $("#rosterChart").hide();
                        return
                    }
                }
            }
            else {
                //console.log("Rank wise")
                alert("Please select From Date & To Date.. !!")
            }
            return;
        }

        // staff or emp wise condition
        //if (StaffSelCount) {
        //    if ((StaffSelCount.length != 0 || employeeSelCount == null)) {
        //        console.log("staff wise result");
        //        // code
        //        var text = $('#sltStaffID option:selected').toArray().map(item => item.text).join();
        //        let staff_name = text.split(",")
        //        //if (StaffSelCount.length > 3) {
        //        //    alert("Can not Select more then 3 .. !!")
        //        //    return false;
        //        //} else {
        //            if (StaffSelCount.length == 1) {
        //                getChartDataStaffIDfor_secOne_forOne(staff_name[0]);
        //                getChartDataStaffIDfor_secTwo_forOne(staff_name[0]);
        //                getChartDataStaffIDfor_secThree_forOne(staff_name[0]);
        //                $("#report_0").show();
        //                $("#report_1").show();
        //                $("#report_2").show();
        //                LoadStaffWiseGrid_typeTwo();
        //            }
        //            //else if (StaffSelCount.length == 2) {
        //            //    getChartDataStaffIDfor_secOne(staff_name[0]);
        //            //    getChartDataStaffIDfor_secTwo(staff_name[1]);
        //            //    $("#report_0").show();
        //            //    $("#report_1").show();
        //            //    $("#report_2").hide();
        //            //}
        //            else if (StaffSelCount.length > 1) {
        //                getChartDataStaffIDfor_secOne_forAll(staff_name[0]);
        //                getChartDataStaffIDfor_secTwo_forAll(staff_name[1]);
        //                getChartDataStaffIDfor_secThree_forAll(staff_name[2]);
        //                $("#report_0").show();
        //                $("#report_1").show();
        //                $("#report_2").show();
        //            } else {
        //                $("#report_0").hide();
        //                $("#report_1").hide();
        //                $("#report_2").hide();
        //            }
        //        //}     
        //        LoadStaffWiseGrid();
        //        var staffwiseGridwidth = $("#staffwiseGrid").closest(".ui-jqgrid").parent().width();
        //        console.log("staffwiseGridwidth", staffwiseGridwidth);
        //        $("#staffwiseGrid").jqGrid("setGridWidth", OnloadGridwidth, true);      
        //        $("#staffWiseGridSec").show();
        //        return true;
        //    }
        //}  
        //if (employeeSelCount) {
        //    if ((StaffSelCount == null || employeeSelCount.length != 0)) {
        //        console.log("staff wise result");
        //        // code
        //        var text = $('#EmployeeName option:selected').toArray().map(item => item.text).join();
        //        let emp_name = text.split(",")
        //        //if (employeeSelCount.length > 3) {
        //        //    alert("Can not Select more then 3 .. !!")
        //        //    return false;
        //        //} else {
        //            if (employeeSelCount.length == 1) {
        //                //getChartDataStaffIDfor_secOne(emp_name[0]);
        //                //$("#report_0").show();
        //                //$("#report_1").hide();
        //                //$("#report_2").hide();
        //                getChartDataStaffIDfor_secOne_forOne(staff_name[0]);
        //                getChartDataStaffIDfor_secTwo_forOne(staff_name[0]);
        //                getChartDataStaffIDfor_secThree_forOne(staff_name[0]);
        //                $("#report_0").show();
        //                $("#report_1").show();
        //                $("#report_2").show();
        //                LoadStaffWiseGrid_typeTwo();
        //            }
        //            //else if (employeeSelCount.length == 2) {
        //            //    getChartDataStaffIDfor_secOne(emp_name[0]);
        //            //    getChartDataStaffIDfor_secTwo(emp_name[1]);
        //            //    $("#report_0").show();
        //            //    $("#report_1").show();
        //            //    $("#report_2").hide();
        //            //}
        //            else if (StaffSelCount.length > 1) {
        //                getChartDataStaffIDfor_secOne_forAll(staff_name[0]);
        //                getChartDataStaffIDfor_secTwo_forAll(staff_name[1]);
        //                getChartDataStaffIDfor_secThree_forAll(staff_name[2]);
        //                $("#report_0").show();
        //                $("#report_1").show();
        //                $("#report_2").show();
        //            } else {
        //                $("#report_0").hide();
        //                $("#report_1").hide();
        //                $("#report_2").hide();
        //            }
        //        //}       
        //        LoadStaffWiseGrid();
        //        $("#staffWiseGridSec").show();
        //        var staffwiseGridwidth = $("#staffwiseGrid").closest(".ui-jqgrid").parent().width();
        //        console.log("staffwiseGridwidth", staffwiseGridwidth);
        //        $("#staffwiseGrid").jqGrid("setGridWidth", OnloadGridwidth, true);
        //        return true;
        //    }
        //}     
        // base wise
        //if (baseCode) {
        //    if (baseCode.lenght != 0 && (rankSelCout == '' || rankSelCout == null) && (StaffSelCount == null || employeeSelCount == null)) {      
        //        console.log("baseCode", baseCode)
        //        if (baseCode.length > 3) {
        //            alert("Can not Select more then 3 .. !!")
        //            return false;
        //        } else {
        //            var text = $('#baseCode option:selected').toArray().map(item => item.text).join();
        //            let base_name = text.split(",")
        //            console.log("base_name slipt", base_name);
        //            if (baseCode.length == 1) {
        //                getChartDatafor_secOne(base_name[0]);
        //                $("#report_0").show();
        //                $("#report_1").hide();
        //                $("#report_2").hide();
        //            } else if (baseCode.length == 2) {
        //                getChartDatafor_secOne(base_name[0]);
        //                getChartDatafor_secTwo(base_name[1]);
        //                $("#report_0").show();
        //                $("#report_1").show();
        //                $("#report_2").hide();
        //            } else if (baseCode.length == 3) {
        //                getChartDatafor_secOne(base_name[0]);
        //                getChartDatafor_secTwo(base_name[1]);
        //                getChartDatafor_secThree(base_name[2]);
        //                $("#report_0").show();
        //                $("#report_1").show();
        //                $("#report_2").show();
        //            } else {
        //                $("#report_0").hide();
        //                $("#report_1").hide();
        //                $("#report_2").hide();
        //            }
        //            LoadBaseWiseGrid();
        //            $("#baseWisegridSec").show();                   
        //            var baseWiseGridwidth = $("#baseWiseGrid").closest(".ui-jqgrid").parent().width();
        //            console.log("baseWiseGridwidth", baseWiseGridwidth)
        //            $("#baseWiseGrid").jqGrid("setGridWidth", baseWiseGridwidth, true);                  
        //        }
        //        return true;
        //    }
        //}        
        // rank wise cond
        //if (rankSelCout) {
        //    if ((rankSelCout != null || rankSelCout.length != 0) && (StaffSelCount == null || employeeSelCount == null)) {
        //        console.log("rank wise result", RankDDType);
        //        // code
        //        if (RankDDType == 1) {
        //            var text = $('#TxtRankSingleSelect option:selected').text();
        //            //let rank_name = text.split(",")
        //            getChar_single_rank_secOne(text);
        //            $("#report_0").show();
        //            $("#rankWiseGridSec").show();
        //            LoadRankWiseGrid();
        //        } else {
        //            rankSelCout = $("#TxtRankMultiselect").val();
        //            var text = $('#TxtRankMultiselect option:selected').toArray().map(item => item.text).join();
        //            let rank_name = text.split(",")
        //            console.log("rankSelCout multiselect...", rankSelCout)
        //            if (rankSelCout.length > 3) {
        //                alert("Can not Select more then 3 .. !!")
        //                return false;
        //            } else {
        //                if (rankSelCout.length == 1) {
        //                    getChart_rank_secOne(rank_name[0]);
        //                    $("#report_0").show();
        //                    $("#report_1").hide();
        //                    $("#report_2").hide();
        //                } else if (rankSelCout.length == 2) {
        //                    getChart_rank_secOne(rank_name[0]);
        //                    getChart_rank_secTwo(rank_name[1]);
        //                    $("#report_0").show();
        //                    $("#report_1").show();
        //                    $("#report_2").hide();
        //                } else if (rankSelCout.length == 3) {
        //                    getChart_rank_secOne(rank_name[0]);
        //                    getChart_rank_secTwo(rank_name[1]);
        //                    getChart_rank_secThree(rank_name[2]);
        //                    $("#report_0").show();
        //                    $("#report_1").show();
        //                    $("#report_2").show();
        //                } else {
        //                    $("#report_0").hide();
        //                    $("#report_1").hide();
        //                    $("#report_2").hide();
        //                }
        //            }                      
        //            LoadRankWiseGrid();
        //            $("#rankWiseGridSec").show();
        //            var rankwiseGridwidth = $("#rankwiseGrid").closest(".ui-jqgrid").parent().width();
        //            console.log("rankwiseGridwidth", rankwiseGridwidth)
        //            $("#rankwiseGrid").jqGrid("setGridWidth", rankwiseGridwidth, true);
        //            return true;
        //        }
        //    }
        //}


    });

    $("#btnDownLoadCSV").click(function () {

        JSONToCSVConvertor(JSON.stringify($('#CrewRosterReport').jqGrid('getRowData')), 'Title', true);

        //$("#CrewRosterReport").jqGrid('exportToExcel', {
        //    includeLabels: true,
        //    excel_parser: true,
        //    excel_format: '',
        //    replace_format: null,
        //    includeGroupHeader: true,
        //    includeFooter: true,
        //    includeHeader: true,
        //    fileName: "jqGridExport.xlsx",
        //    mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //    maxlength: 40,
        //    onBeforeExport: null,
        //    replaceStr: null,
        //    loadIndicator: true,
        //    treeindent: ' '
        //});


        //$.ajax({
        //    type: 'POST',
        //    url: applicationUrl + "CrewRosterReport/DownloadExcel",
        //    dataType: 'json',
        //    data: {
        //        FromDate: function () { return $("#TxtFromDate").val(); },
        //        Todate: function () { return $("#TxtToDate").val(); },
        //        Crewtype: function () { return $("#TxtRank").val(); },
        //        empname: function () { return $("#EmployeeName").val(); },
        //        staffId: function () { return $("#sltStaffID").val(); },
        //    },
        //    success: function (subcategories) {
        //        console.log('in success...');

        //    },
        //    error: function (ex) {
        //        alert('Failed to dwonload excel sheet : ' + ex);
        //    }
        //});

    });

    $("#btnDownLoadExcel").click(function () {

        var data = $('#CrewRosterReport').jqGrid('getRowData');
        //var jsonData = JSON.parse(data)
        //   console.log("data", data);
        $("#CrewRosterReport").excelexportjs({
            containerid: "CrewRosterReport",
            datatype: 'json',
            dataset: data,
            columns: getColumns(data)
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

    $("#rosterRelease").change(function () {
        if (this.checked) {

            $("#SelMonthDD").multiselect("clearSelection");
            $("#SelMonthDD").multiselect('destroy');
            $('#SelMonthDD').next().hide();

            DashboardType = 1
            console.log('frist checkbox checked');
            $("#monthWise").attr("disabled", true);
            $("#rankwise").attr("disabled", true);
            $("#staffwise").attr("disabled", true);
            GetRosterDD();
            $('#SelRosterDD').next().show();

            //$("#baseCode").next().show();
            //$("#TxtRankMultiselect").next().show();
            //$("#sltStaffID").next().show();
            //$("#EmployeeName").next().show();
            $("#baseCode").next().hide();
            $("#TxtRankMultiselect").next().hide();
            $("#sltStaffID").next().hide();
            $("#EmployeeName").next().hide();
        } else {
            DashboardType = 0
            console.log('frist checkbox unchecked');
            $("#SelRosterDD").multiselect("clearSelection");
            $("#rosterChart").hide();

            $("#monthWise").attr("disabled", false);
            $("#rankwise").attr("disabled", false);
            $("#staffwise").attr("disabled", false);
            $("#SelRosterDD").multiselect('destroy');
            $('#SelRosterDD').next().hide();

            $("#baseCode").next().hide();
            $("#TxtRankMultiselect").next().hide();
            $("#sltStaffID").next().hide();
            $("#EmployeeName").next().hide();
        }
    })

    $("#monthWise").change(function () {

        if (this.checked) {
            $("#SelRosterDD").multiselect("clearSelection");
            $("#SelRosterDD").multiselect('destroy');
            $('#SelRosterDD').next().hide();
            DashboardType = 2
            console.log('sec checkbox checked');
            $("#rosterRelease").attr("disabled", true);
            $("#rankwise").attr("disabled", true);
            $("#staffwise").attr("disabled", true);
            GetMonthDD();
            $('#SelMonthDD').next().show();

            $("#baseCode").next().hide();
            $("#TxtRankMultiselect").next().hide();
            $("#sltStaffID").next().hide();
            $("#EmployeeName").next().hide();
        } else {
            DashboardType = 0
            console.log('sec checkbox unchecked');
            $("#SelMonthDD").multiselect("clearSelection");
            $("#monthChart").hide();
            $("#rosterRelease").attr("disabled", false);
            $("#rankwise").attr("disabled", false);
            $("#staffwise").attr("disabled", false);
            $("#SelMonthDD").multiselect('destroy');
            $('#SelMonthDD').next().hide();

            $("#baseCode").next().hide();
            $("#TxtRankMultiselect").next().hide();
            $("#sltStaffID").next().hide();
            $("#EmployeeName").next().hide();
        }
    })

    $("#rankwise").change(function () {

        if (this.checked) {
            DashboardType = 3
            console.log('third checkbox checked');
            $("#rosterRelease").attr("disabled", true);
            $("#monthWise").attr("disabled", true);
            $("#staffwise").attr("disabled", true);

            //$("#baseCode").next().show();
            $("#TxtRankMultiselect").next().show();
            //$("#sltStaffID").next().show();
            //$("#EmployeeName").next().show();

            $("#baseCode").next().hide();
            //$("#TxtRankMultiselect").next().hide();
            $("#sltStaffID").next().hide();
            $("#EmployeeName").next().hide();

        } else {
            DashboardType = 0
            console.log('third checkbox unchecked');
            $("#monthChart").hide();
            $("#rosterRelease").attr("disabled", false);
            $("#rosterChart").hide();
            $("#monthWise").attr("disabled", false);
            $("#staffwise").attr("disabled", false);
            $("#SelMonthDD").multiselect('destroy');
            $('#SelMonthDD').next().hide();
            $("#SelRosterDD").multiselect('destroy');
            $('#SelRosterDD').next().hide();

            $("#baseCode").next().hide();
            $("#TxtRankMultiselect").next().hide();
            $("#sltStaffID").next().hide();
            $("#EmployeeName").next().hide();
        }
    })

    $("#staffwise").change(function () {

        if (this.checked) {
            DashboardType = 4
            console.log('fourth checkbox checked');
            $("#rosterRelease").attr("disabled", true);
            $("#monthWise").attr("disabled", true);
            $("#rankwise").attr("disabled", true);

            $("#baseCode").next().show();
            $("#TxtRankMultiselect").next().show();
            $("#sltStaffID").next().show();
            $("#EmployeeName").next().show();

        } else {
            DashboardType = 0
            console.log('fourth checkbox unchecked');
            $("#monthChart").hide();
            $("#rosterRelease").attr("disabled", false);
            $("#rosterChart").hide();
            $("#monthWise").attr("disabled", false);
            $("#rankwise").attr("disabled", false);
            $("#SelMonthDD").multiselect('destroy');
            $('#SelMonthDD').next().hide();
            $("#SelRosterDD").multiselect('destroy');
            $('#SelRosterDD').next().hide();

            $("#baseCode").next().hide();
            $("#TxtRankMultiselect").next().hide();
            $("#sltStaffID").next().hide();
            $("#EmployeeName").next().hide();
        }
    })

    $("#changesMadeBetween").change(function () {
        if (this.checked) {
            console.log('second checkbox checked');
            $("#dutydate").attr("disabled", true);
        } else {
            console.log('second checkbox unchecked');
            $("#dutydate").attr("disabled", false);
        }
    })

    // All Change events 

    $("#TxtFromDate").change(function () {
        console.log("on date chage");
        if (DashboardType != 1 && DashboardType != 2 && DashboardType != 0 && DashboardType != 3) {
            GetBaseDD();
            loadRankWithMultipleDD();
            loadRankWithSignleDD();
            GetStaffIdAndEmployeeName();
        }

        else if (DashboardType == 3) {
            //GetBaseDD();
            loadRankWithMultipleDD();
            //loadRankWithSignleDD();
            //GetStaffIdAndEmployeeName();
        }



        if (DashboardType == 1) {
            GetRosterDD();
        } else if (DashboardType == 2) {
            GetMonthDD();
        }

    });

    $("#TxtToDate").change(function () {
        console.log("on date chage");
        if (DashboardType != 1 && DashboardType != 2 && DashboardType != 0 && DashboardType != 3) {
            GetBaseDD();
            GetStaffIdAndEmployeeName();

            base_val = $("#baseCode").val();
            if (base_val != null) {
                loadRankWithSignleDD();
            } else {
                loadRankWithMultipleDD();
            }
        }
        else if (DashboardType == 3) {
            //GetBaseDD();
            //GetStaffIdAndEmployeeName();

            //base_val = $("#baseCode").val();
            //if (base_val != null) {
            //    loadRankWithSignleDD();
            //} else {
            loadRankWithMultipleDD();
            //}
        }


        if (DashboardType == 1) {
            GetRosterDD();
        } else if (DashboardType == 2) {
            GetMonthDD();
        }

    });

    $("#TxtRankSingleSelect").change(function () {
        if (DashboardType != 3) {
            console.log("problem")
            GetStaffIdAndEmployeeName();
        }

        //GetRosterDD();
        //GetMonthDD();
    });

    console.log("hig chart col", Highcharts.getOptions().colors)

    // Radialize the colors
    Highcharts.setOptions({
        colors: Highcharts.map(["#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#7cb5ec", "#434348", "#91e8e1", '#f15a60', '#d77fb4', '#7ac36a', '#faa75b', '#9e67ab', '#5a9bd4', '#b8d2ec', '#185aa9'], function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        })
    });

    $(window).on("resize", function () {
        console.log("window resize...")
        var baseWiseGridwidth = $("#baseWiseGrid").closest(".ui-jqgrid").parent().width();
        $("#baseWiseGrid").jqGrid("setGridWidth", baseWiseGridwidth, true);

        var staffwiseGridwidth = $("#staffwiseGrid").closest(".ui-jqgrid").parent().width();
        $("#staffwiseGrid").jqGrid("setGridWidth", staffwiseGridwidth, true);

        var staffnDatewiseGridwidth = $("#staffnDatewiseGrid").closest(".ui-jqgrid").parent().width();
        $("#staffnDatewiseGrid").jqGrid("setGridWidth", staffnDatewiseGridwidth, true);

        var rankwiseGridwidth = $("#rankwiseGrid").closest(".ui-jqgrid").parent().width();
        $("#rankwiseGrid").jqGrid("setGridWidth", rankwiseGridwidth, true);

        var OnloadGridwidth = $("#OnloadGrid").closest(".ui-jqgrid").parent().width();
        $("#OnloadGrid").jqGrid("setGridWidth", OnloadGridwidth, true);
    });



});


// date Range Change

function dateRangeChange() {

    var range = $("#dateRangeDD").val();
    var fromDate = '', toDate = '';

    if (range == 1) {
        //fromDate = moment().clone().startOf('month').format('DD-MM-YYYY');
        fromDate = moment().clone().subtract(1, 'days').startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().subtract(1, 'days').format('DD-MM-YYYY');
        //toDate = moment().clone().endOf('month').format('DD-MM-YYYY')
    } else if (range == 2) {
        fromDate = moment().clone().subtract(1, 'months').startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().subtract(1, 'months').endOf('month').format('DD-MM-YYYY')
    } else if (range == 3) {
        fromDate = moment().clone().add(1, 'months').startOf('month').format('DD-MM-YYYY');
        toDate = moment().clone().add(1, 'months').endOf('month').format('DD-MM-YYYY')
    } else if (range == 4) {
        fromDate = moment().quarter(moment().quarter()).startOf('quarter').format('DD-MM-YYYY');
        toDate = moment().quarter(moment().quarter()).endOf('quarter').format('DD-MM-YYYY');
    } else if (range == 5) {
        fromDate = moment().subtract(1, 'Q').startOf('quarter').format('DD-MM-YYYY');
        toDate = moment().subtract(1, 'Q').endOf('quarter').format('DD-MM-YYYY');
    } else if (range == 6) {
        fromDate = moment().month(3).startOf('month').format('DD-MM-YYYY');
        toDate = moment().month(2).endOf('month').add('years', 1).format('DD-MM-YYYY');
    } else if (range == 7) {
        fromDate = moment().subtract('years', 1).month(3).startOf('month').format('DD-MM-YYYY');
        toDate = moment().month(2).endOf('month').format('DD-MM-YYYY');

        //fromDate = "01-03-2020";
        //toDate = "31-03-2020";
    }

    console.log("fromDate", fromDate);
    console.log("toDate", toDate);

    $("#TxtFromDate").val(fromDate);
    $("#TxtToDate").val(toDate);

    if (DashboardType != 1 && DashboardType != 2 && DashboardType != 0 && DashboardType != 3) {
        //console.log("idhar gadbad hai 1");
        GetBaseDD();
        loadRankWithMultipleDD();
    }



    if (DashboardType == 1) {
        GetRosterDD();
    } else if (DashboardType == 2) {
        GetMonthDD();
    } else if (DashboardType == 3) {
        loadRankWithMultipleDD();
    }
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
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
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
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
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
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
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
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
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
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
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

// onChanges APi Calls
function GetBaseDD() {

    $("#overlay").show();

    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/GetBaseList",
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

            $("#baseCode").multiselect('destroy');
            $('#baseCode').html('');
            console.log("type", type)

            for (var j = 0; j < type.length; j++) {
                //console.log(fleet[j].DisruptionTypeId + ' - ' + fleet[j].DisruptionType)
                $('#baseCode').append('<option value="' + type[j].Id + '">' + type[j].item + '</option>');
            }
            $('#baseCode').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                maxHeight: 300,
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
                nonSelectedText: 'Select Base Code',
                onChange: function () {
                    var len = $('#baseCode').val();
                    GetStaffIdAndEmployeeName();
                    console.log("len", len)
                    //if (len != null) {
                    //    if (len.length > 0) {
                    //        RankDDType =1
                    //        $("#overlay").show();
                    //        loadRankWithSignleDD();
                    //        $('#TxtRankMultiselect').next().hide();
                    //        $('#TxtRankMultiselect').css("display","none");
                    //        $('#TxtRankSingleSelect').show();
                    //        GetStaffIdAndEmployeeName();    
                    //    } else {
                    //        RankDDType = 2;
                    //        loadRankWithMultipleDD();
                    //        $('#TxtRankMultiselect').next().show();
                    //        $('#TxtRankMultiselect').css("display", "block");
                    //        $('#TxtRankSingleSelect').hide();
                    //    }
                    //} else {
                    //    RankDDType = 2;
                    //    loadRankWithMultipleDD();
                    //    $('#TxtRankMultiselect').next().show();
                    //    $('#TxtRankMultiselect').css("display", "block");
                    //    $('#TxtRankSingleSelect').hide();
                    //}

                },
                onSelectAll: function () {
                    GetStaffIdAndEmployeeName();
                    //loadRankWithSignleDD();
                },
                onDeselectAll: function () {
                    RankDDType = 2;
                    loadRankWithMultipleDD();
                    GetStaffIdAndEmployeeName();
                    $('#TxtRankMultiselect').next().show();
                    $('#TxtRankMultiselect').css("display", "block");
                    $('#TxtRankSingleSelect').hide();
                }
            });
        },
        complete: function () {
            console.log('on compelete');
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function loadRankWithSignleDD() {

    console.log("loadRankWithSignleDD..", $("#baseCode").val())

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_RankListForDD",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
        },
        success: function (data) {

            console.log("load single data..", data)
            // RankDDType = 1;

            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }
            $('#TxtRankSingleSelect').html('');
            $('#TxtRankSingleSelect').append('<option value="">Select Rank</option>');

            for (var j = 0; j < type.length; j++) {
                $('#TxtRankSingleSelect').append('<option value="' + type[j].Id + '">' + type[j].item + '</option>');
            }
            //$('#TxtRankMultiselect').next().hide();
            //$('#TxtRankMultiselect').css("display","none");
            //$('#TxtRankSingleSelect').show();

        },
        complete: function () {
            console.log('on compelete');
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Rank: ' + ex);
        }
    });
}

function loadRankWithMultipleDD() {

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_RankListForDD",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
        },
        success: function (data) {

            console.log("load multiple data..", data)
            // RankDDType = 1;

            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }

            $("#TxtRankMultiselect").multiselect('destroy');
            $('#TxtRankMultiselect').html('');

            for (var j = 0; j < type.length; j++) {
                $('#TxtRankMultiselect').append('<option value="' + type[j].Id + '">' + type[j].item + '</option>');
            }

            $('#TxtRankMultiselect').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                maxHeight: 300,
                nonSelectedText: 'Select Rank',
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
                onChange: function () {
                    var len = $('#TxtRankMultiselect').val();
                    if (DashboardType != 3) {
                        GetStaffIdAndEmployeeName();
                    }

                    // GetRosterDD();
                    // GetMonthDD();
                },
                onSelectAll: function () {
                    //loadRankWithSignleDD();
                    if (DashboardType != 3) {
                        GetStaffIdAndEmployeeName();
                    }
                    // GetRosterDD();
                    // GetMonthDD();

                },
                onDeselectAll: function () {
                    if (DashboardType != 3) {
                        GetStaffIdAndEmployeeName();
                    }
                    // GetRosterDD();
                    // GetMonthDD();
                }
            });
        },
        complete: function () {
            console.log('on compelete');
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Multiple rank: ' + ex);
        }
    });
}

function GetStaffIdAndEmployeeName() {

    $("#overlay").show();

    // staffid DD
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_StaffListForDD",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
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
                nonSelectedText: 'Select StaffId',
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
                onChange: function () {
                    var selCout = $("#sltStaffID").val();
                    //StaffCout = selCout.length;
                    console.log("here", $("#sltStaffID").val())
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
        complete: function () {
            console.log('on compelete');
            //$("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve staff & emp name : ' + ex);
        }
    });
    $("#overlay").show();
    // employeeName DD
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_EmployeeNameForDD",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
        },
        success: function (data) {
            console.log("employeeName staff id", data)
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
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
                onChange: function () {
                    console.log("here", $("#EmployeeName").val())
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
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

// Roster DD
function GetRosterDD() {

    $("#overlay").show();

    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_RosterListForDD",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            StaffID: function () { return $("#sltStaffID").val(); },
            EmployeeName: function () { return $("#EmployeeName").val(); },
        },
        success: function (data) {
            console.log("data", data)
            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }

            $("#SelRosterDD").multiselect('destroy');
            $('#SelRosterDD').html('');

            for (var j = 0; j < type.length; j++) {
                //console.log(fleet[j].DisruptionTypeId + ' - ' + fleet[j].DisruptionType)
                $('#SelRosterDD').append('<option value="' + type[j].item + '">' + type[j].item + '</option>');
            }
            $('#SelRosterDD').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                maxHeight: 300,
                nonSelectedText: 'Select Roster',
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
                onChange: function () {

                },
                onSelectAll: function () {
                    //loadRankWithSignleDD();

                },
                onDeselectAll: function () {

                }
            });

        },
        complete: function () {
            console.log('on compelete');
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

// Month DD

function GetMonthDD() {

    $("#overlay").show();

    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_MonthListForDD",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            StaffID: function () { return $("#sltStaffID").val(); },
            EmployeeName: function () { return $("#EmployeeName").val(); },
        },
        success: function (data) {
            console.log("data", data)
            type = [];
            for (var j = 0; j < data.length; j++) {
                type.push(data[j])
            }

            $("#SelMonthDD").multiselect('destroy');
            $('#SelMonthDD').html('');
            console.log("type", type)

            for (var j = 0; j < type.length; j++) {
                //console.log(fleet[j].DisruptionTypeId + ' - ' + fleet[j].DisruptionType)
                $('#SelMonthDD').append('<option value="' + type[j].item + '">' + type[j].item + '</option>');
            }
            $('#SelMonthDD').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                nonSelectedText: 'Select Month',
                maxHeight: 300,
                enableCaseInsensitiveFiltering: true,
                enableFullValueFiltering: true,
                includeFilterClearBtn: true,
                onChange: function () {

                },
                onSelectAll: function () {
                    //loadRankWithSignleDD();
                },
                onDeselectAll: function () {

                }
            });
        },
        complete: function () {
            console.log('on compelete');
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

// chart month wise
function loadMonthChart_one(month_name) {

    console.log("loadRankWithSignleDD..", month_name)

    var selectedBaseFor = 1;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardMonthWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelMonthDD").val(); },
            selectedMonth: selectedBaseFor,
        },
        success: function (data) {
            console.log("load chart data.. one", data)
            var categories = [];
            var flags = [], l = data.length, i;
            for (i = 0; i < l; i++) {
                if (flags[data[i].BaseName]) continue;
                flags[data[i].BaseName] = true;
                categories.push(data[i].BaseName);
            }
            console.log("categories", categories)

            let volChange = [], noChange = [], Change = []

            $.each(data, function (j, j_item) {
                if (j_item.ChangeType == 'VOL Change') {
                    volChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'No Change') {
                    noChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'Change') {
                    Change.push(parseFloat(j_item.Percentage))
                }
            });
            chart_data = [
                {
                    name: 'VOL Change',
                    data: volChange
                },
                {
                    name: 'No Change',
                    data: noChange
                },
                {
                    name: 'Change',
                    data: Change
                },
            ]

            console.log("chart data1.. one", chart_data)

            // Create the chart
            Highcharts.chart('roster_Chart_sec_one', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            chart.showLoading('Loading data ...');

                            $.ajax({
                                type: 'POST',
                                url: applicationUrl + "Dashboard/DashboardSelectedRosterWisePercentage",
                                dataType: 'json',
                                data: {
                                    fromDate: function () { return $("#TxtFromDate").val(); },
                                    toDate: function () { return $("#TxtToDate").val(); },
                                    baseCode: function () { return $("#baseCode").val(); },
                                    crewRank: function () {
                                        if (RankDDType == 1) {
                                            return $("#TxtRankSingleSelect").val();
                                        } else {
                                            return $("#TxtRankMultiselect").val();
                                        }
                                    },
                                    staffId: function () { return $("#sltStaffID").val(); },
                                    emplName: function () { return $("#EmployeeName").val(); },
                                    dashboardType: function () { return DashboardType; },
                                    selectedBase: function () { return selectedBaseFor; },
                                    drilldownValue: function () { return e.point.name; },
                                    reportval: function () { return $("#SelRosterDD").val(); },
                                },
                                success: function (data) {
                                    var drilldata = [];
                                    $.each(data, function (i, item) {
                                        drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                                    });
                                    let chart_d = { name: e.point.name, data: drilldata }
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, chart_d);
                                },
                                complete: function () {
                                    $("#overlay").hide();
                                },
                                error: function (ex) {
                                    alert('Failed to retrieve Sector : ' + ex);
                                }
                            });
                        }
                    },
                },
                title: {
                    text: month_name
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: true
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    },
                    series: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        },
                    }
                },
                tooltip: {
                    //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}',
                    pointFormat: '<span style="color:{series.color}"> <b> {series.name}  </span>: <b> {point.y} %',
                    shared: true
                },
                series: chart_data,
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}

function loadMonthChart_two(month_name) {

    console.log("loadRankWithSignleDD..", month_name)

    var selectedBaseFor = 2;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardMonthWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelMonthDD").val(); },
            selectedMonth: selectedBaseFor,
        },
        success: function (data) {

            console.log("load chart data.. two", data)
            var categories = [];
            var flags = [], l = data.length, i;
            for (i = 0; i < l; i++) {
                if (flags[data[i].BaseName]) continue;
                flags[data[i].BaseName] = true;
                categories.push(data[i].BaseName);
            }
            console.log("categories", categories)

            let volChange = [], noChange = [], Change = []

            $.each(data, function (j, j_item) {
                if (j_item.ChangeType == 'VOL Change') {
                    volChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'No Change') {
                    noChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'Change') {
                    Change.push(parseFloat(j_item.Percentage))
                }
            });
            chart_data = [
                {
                    name: 'VOL Change',
                    data: volChange
                },
                {
                    name: 'No Change',
                    data: noChange
                },
                {
                    name: 'Change',
                    data: Change
                },
            ]
            console.log("chart data1.. one", chart_data)

            // Create the chart
            Highcharts.chart('roster_Chart_sec_two', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            chart.showLoading('Loading data ...');

                            $.ajax({
                                type: 'POST',
                                url: applicationUrl + "Dashboard/DashboardSelectedRosterWisePercentage",
                                dataType: 'json',
                                data: {
                                    fromDate: function () { return $("#TxtFromDate").val(); },
                                    toDate: function () { return $("#TxtToDate").val(); },
                                    baseCode: function () { return $("#baseCode").val(); },
                                    crewRank: function () {
                                        if (RankDDType == 1) {
                                            return $("#TxtRankSingleSelect").val();
                                        } else {
                                            return $("#TxtRankMultiselect").val();
                                        }
                                    },
                                    staffId: function () { return $("#sltStaffID").val(); },
                                    emplName: function () { return $("#EmployeeName").val(); },
                                    dashboardType: function () { return DashboardType; },
                                    selectedBase: function () { return selectedBaseFor; },
                                    drilldownValue: function () { return e.point.name; },
                                    reportval: function () { return $("#SelRosterDD").val(); },
                                },
                                success: function (data) {
                                    var drilldata = [];
                                    $.each(data, function (i, item) {
                                        drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                                    });
                                    let chart_d = { name: e.point.name, data: drilldata }
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, chart_d);
                                },
                                complete: function () {
                                    $("#overlay").hide();
                                },
                                error: function (ex) {
                                    alert('Failed to retrieve Sector : ' + ex);
                                }
                            });
                        }
                    },
                },
                title: {
                    text: month_name
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: true
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    },
                    series: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        },
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}"> <b> {series.name}  </span>: <b> {point.y} %',
                    shared: true
                },
                series: chart_data,
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });

            $("#overlay").hide();
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}

function loadMonthChart_three(month_name) {

    console.log("loadRankWithSignleDD..", month_name)
    var selectedBaseFor = 3;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardMonthWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelMonthDD").val(); },
            selectedMonth: selectedBaseFor,
        },
        success: function (data) {
            console.log("load chart data.. three", data)
            var categories = [];
            var flags = [], l = data.length, i;
            for (i = 0; i < l; i++) {
                if (flags[data[i].BaseName]) continue;
                flags[data[i].BaseName] = true;
                categories.push(data[i].BaseName);
            }
            console.log("categories", categories)

            let volChange = [], noChange = [], Change = []

            $.each(data, function (j, j_item) {
                if (j_item.ChangeType == 'VOL Change') {
                    volChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'No Change') {
                    noChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'Change') {
                    Change.push(parseFloat(j_item.Percentage))
                }
            });
            chart_data = [
                {
                    name: 'VOL Change',
                    data: volChange
                },
                {
                    name: 'No Change',
                    data: noChange
                },
                {
                    name: 'Change',
                    data: Change
                },
            ]
            console.log("chart data1.. one", chart_data)

            // Create the chart
            Highcharts.chart('roster_Chart_sec_three', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            chart.showLoading('Loading data ...');

                            $.ajax({
                                type: 'POST',
                                url: applicationUrl + "Dashboard/DashboardSelectedRosterWisePercentage",
                                dataType: 'json',
                                data: {
                                    fromDate: function () { return $("#TxtFromDate").val(); },
                                    toDate: function () { return $("#TxtToDate").val(); },
                                    baseCode: function () { return $("#baseCode").val(); },
                                    crewRank: function () {
                                        if (RankDDType == 1) {
                                            return $("#TxtRankSingleSelect").val();
                                        } else {
                                            return $("#TxtRankMultiselect").val();
                                        }
                                    },
                                    staffId: function () { return $("#sltStaffID").val(); },
                                    emplName: function () { return $("#EmployeeName").val(); },
                                    dashboardType: function () { return DashboardType; },
                                    selectedBase: function () { return selectedBaseFor; },
                                    drilldownValue: function () { return e.point.name; },
                                    reportval: function () { return $("#SelRosterDD").val(); },
                                },
                                success: function (data) {
                                    var drilldata = [];
                                    $.each(data, function (i, item) {
                                        drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                                    });
                                    let chart_d = { name: e.point.name, data: drilldata }
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, chart_d);
                                },
                                complete: function () {
                                    $("#overlay").hide();
                                },
                                error: function (ex) {
                                    alert('Failed to retrieve Sector : ' + ex);
                                }
                            });
                        }
                    },
                },
                title: {
                    text: month_name
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: true
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    },
                    series: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        },
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}"> <b> {series.name}  </span>: <b> {point.y} %',
                    shared: true
                },
                series: chart_data,
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });

            $("#overlay").hide();
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}

// chart roster wise

function loadRosterChart_one(roster_name) {

    console.log("loadRankWithSignleDD..", roster_name)

    var selectedBaseFor = 1;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardRosterWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            selectedFor: function () { return selectedBaseFor; },
        },
        success: function (data) {
            console.log("load chart data.. one", data)
            var categories = [];
            var flags = [], l = data.length, i;
            for (i = 0; i < l; i++) {
                if (flags[data[i].BaseName]) continue;
                flags[data[i].BaseName] = true;
                categories.push(data[i].BaseName);
            }
            console.log("categories", categories)

            let volChange = [], noChange = [], Change = []

            $.each(data, function (j, j_item) {
                if (j_item.ChangeType == 'VOL Change') {
                    volChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'No Change') {
                    noChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'Change') {
                    Change.push(parseFloat(j_item.Percentage))
                }
            });
            chart_data = [
                {
                    name: 'VOL Change',
                    data: volChange
                },
                {
                    name: 'No Change',
                    data: noChange
                },
                {
                    name: 'Change',
                    data: Change
                },
            ]

            console.log("chart data1.. one", chart_data)

            // Create the chart
            Highcharts.chart('roster_Chart_sec_one', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            chart.showLoading('Loading data ...');

                            $.ajax({
                                type: 'POST',
                                url: applicationUrl + "Dashboard/DashboardSelectedRosterWisePercentage",
                                dataType: 'json',
                                data: {
                                    fromDate: function () { return $("#TxtFromDate").val(); },
                                    toDate: function () { return $("#TxtToDate").val(); },
                                    baseCode: function () { return $("#baseCode").val(); },
                                    crewRank: function () {
                                        if (RankDDType == 1) {
                                            return $("#TxtRankSingleSelect").val();
                                        } else {
                                            return $("#TxtRankMultiselect").val();
                                        }
                                    },
                                    staffId: function () { return $("#sltStaffID").val(); },
                                    emplName: function () { return $("#EmployeeName").val(); },
                                    dashboardType: function () { return DashboardType; },
                                    selectedBase: function () { return selectedBaseFor; },
                                    drilldownValue: function () { return e.point.name; },
                                    reportval: function () { return $("#SelRosterDD").val(); },
                                },
                                success: function (data) {
                                    var drilldata = [];
                                    $.each(data, function (i, item) {
                                        drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                                    });
                                    let chart_d = { name: e.point.name, data: drilldata }
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, chart_d);
                                },
                                error: function (ex) {
                                    alert('Failed to retrieve Sector : ' + ex);
                                }
                            });
                        }
                    },
                },
                title: {
                    text: roster_name
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    // disable hover style
                    itemStyle: {
                        cursor: 'default',
                    },
                    itemHoverStyle: {
                        color: '#333333',
                    }
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    },
                    series: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        },
                    }
                },
                tooltip: {
                    //pointFormat: '<span style="color:{series.color}"> {series.name} </span>: <b> {point.y}',
                    pointFormat: '<span style="color:{series.color}"> <b> {series.name}  </span>: <b> {point.y} % ',
                    shared: true
                },
                series: chart_data,
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty

                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}

function loadRosterChart_two(roster_name) {

    console.log("loadRankWithSignleDD..", roster_name)

    var selectedBaseFor = 2;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardRosterWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            selectedFor: function () { return selectedBaseFor; },
        },
        success: function (data) {

            console.log("load chart data.. two", data)
            var categories = [];
            var flags = [], l = data.length, i;
            for (i = 0; i < l; i++) {
                if (flags[data[i].BaseName]) continue;
                flags[data[i].BaseName] = true;
                categories.push(data[i].BaseName);
            }
            console.log("categories", categories)

            let volChange = [], noChange = [], Change = []

            $.each(data, function (j, j_item) {
                if (j_item.ChangeType == 'VOL Change') {
                    volChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'No Change') {
                    noChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'Change') {
                    Change.push(parseFloat(j_item.Percentage))
                }
            });
            chart_data = [
                {
                    name: 'VOL Change',
                    data: volChange
                },
                {
                    name: 'No Change',
                    data: noChange
                },
                {
                    name: 'Change',
                    data: Change
                },
            ]

            console.log("chart data1.. one", chart_data)

            // Create the chart
            Highcharts.chart('roster_Chart_sec_two', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            chart.showLoading('Loading data ...');

                            $.ajax({
                                type: 'POST',
                                url: applicationUrl + "Dashboard/DashboardSelectedRosterWisePercentage",
                                dataType: 'json',
                                data: {
                                    fromDate: function () { return $("#TxtFromDate").val(); },
                                    toDate: function () { return $("#TxtToDate").val(); },
                                    baseCode: function () { return $("#baseCode").val(); },
                                    crewRank: function () {
                                        if (RankDDType == 1) {
                                            return $("#TxtRankSingleSelect").val();
                                        } else {
                                            return $("#TxtRankMultiselect").val();
                                        }
                                    },
                                    staffId: function () { return $("#sltStaffID").val(); },
                                    emplName: function () { return $("#EmployeeName").val(); },
                                    dashboardType: function () { return DashboardType; },
                                    selectedBase: function () { return selectedBaseFor; },
                                    drilldownValue: function () { return e.point.name; },
                                    reportval: function () { return $("#SelRosterDD").val(); },
                                },
                                success: function (data) {
                                    var drilldata = [];
                                    $.each(data, function (i, item) {
                                        drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                                    });
                                    let chart_d = { name: e.point.name, data: drilldata }
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, chart_d);
                                },
                                error: function (ex) {
                                    alert('Failed to retrieve Sector : ' + ex);
                                }
                            });
                        }
                    },
                },
                title: {
                    text: roster_name
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: true
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    },
                    series: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        },
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}"> <b> {series.name}  </span>: <b> {point.y} % ',
                    shared: true
                },
                series: chart_data,
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}

function loadRosterChart_three(roster_name) {

    console.log("loadRankWithSignleDD..", roster_name)
    var selectedBaseFor = 3;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardRosterWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            selectedFor: function () { return selectedBaseFor; },
        },
        success: function (data) {
            console.log("load chart data.. three", data)
            var categories = [];
            var flags = [], l = data.length, i;
            for (i = 0; i < l; i++) {
                if (flags[data[i].BaseName]) continue;
                flags[data[i].BaseName] = true;
                categories.push(data[i].BaseName);
            }
            console.log("categories", categories)

            let volChange = [], noChange = [], Change = []

            $.each(data, function (j, j_item) {
                if (j_item.ChangeType == 'VOL Change') {
                    volChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'No Change') {
                    noChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'Change') {
                    Change.push(parseFloat(j_item.Percentage))
                }
            });
            chart_data = [
                {
                    name: 'VOL Change',
                    data: volChange
                },
                {
                    name: 'No Change',
                    data: noChange
                },
                {
                    name: 'Change',
                    data: Change
                },
            ]
            console.log("chart data1.. one", chart_data)

            // Create the chart
            Highcharts.chart('roster_Chart_sec_three', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            chart.showLoading('Loading data ...');

                            $.ajax({
                                type: 'POST',
                                url: applicationUrl + "Dashboard/DashboardSelectedRosterWisePercentage",
                                dataType: 'json',
                                data: {
                                    fromDate: function () { return $("#TxtFromDate").val(); },
                                    toDate: function () { return $("#TxtToDate").val(); },
                                    baseCode: function () { return $("#baseCode").val(); },
                                    crewRank: function () {
                                        if (RankDDType == 1) {
                                            return $("#TxtRankSingleSelect").val();
                                        } else {
                                            return $("#TxtRankMultiselect").val();
                                        }
                                    },
                                    staffId: function () { return $("#sltStaffID").val(); },
                                    emplName: function () { return $("#EmployeeName").val(); },
                                    dashboardType: function () { return DashboardType; },
                                    selectedBase: function () { return selectedBaseFor; },
                                    drilldownValue: function () { return e.point.name; },
                                    reportval: function () { return $("#SelRosterDD").val(); },
                                },
                                success: function (data) {
                                    var drilldata = [];
                                    $.each(data, function (i, item) {
                                        drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                                    });
                                    let chart_d = { name: e.point.name, data: drilldata }
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, chart_d);
                                },
                                error: function (ex) {
                                    alert('Failed to retrieve Sector : ' + ex);
                                }
                            });
                        }
                    },
                },
                title: {
                    text: roster_name
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: true
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    }, series: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        },
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}"> <b> {series.name}  </span>: <b> {point.y} % ',
                    shared: true
                },
                series: chart_data,
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}


// with from date To date only 

// with from date To date only 
function loadOnloadChart_dateWise() {

    var selectedChangeType = 1;

    $("#overlay").show();
    $(".overlay").show();

    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Dashboard_all_StaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            selectPersentage: function () { return $("#dateWiseChartFilter").val(); },
            //selectedChangeType: function () { return selectedChangeType; },
            selectedChangeType: selectedChangeType,
        },
        success: function (data) {

            console.log("load chart data..", data)
            $("#lblrosterCount").empty()
            $("#lblrosterCount").html(data.length)
            var data1 = []
            var datacount = data.length
            //data = data.slice(0, 1250)            

            $.each(data, function (i, item) {
                data1.push({ 'name': item.StaffID, 'y': parseFloat(item.Percentage), 'drilldown': item.StaffID, 'empName': item.EmployeeName })
            });
            console.log("chart data1..lenght", data1.length)

            var drilldown_count = 0;
            var defaultTitle = "Change Percentage ";
            var drilldownTitle = "Change Count";


            // Bar chart
            Highcharts.chart('full_screen_chart', {
                chart: {
                    type: 'column',
                    zoomType: 'x',
                    events: {
                        drilldown: function (e) {

                            drilldown_count = drilldown_count + 1;
                            var chart = this;


                            console.log("drill down event..", e.point.name)
                            DrilldownValue = e.point.name
                            SelectedChangeType_glob = selectedChangeType
                            if (drilldown_count == 1) {
                                chart.setTitle({ text: drilldownTitle + ' of ' + e.point.name });
                                ReLoadStaffWiseGrid();
                                chart.showLoading('Loading data ...');


                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "Dashboard/Dashboard_one_StaffWisePercentage",
                                    dataType: 'json',
                                    data: {
                                        fromDate: function () { return $("#TxtFromDate").val(); },
                                        toDate: function () { return $("#TxtToDate").val(); },
                                        baseCode: function () { return $("#baseCode").val(); },
                                        crewRank: function () {
                                            if (RankDDType == 1) {
                                                return $("#TxtRankSingleSelect").val();
                                            } else {
                                                return $("#TxtRankMultiselect").val();
                                            }
                                        },
                                        staffId: function () { return DrilldownValue },
                                        emplName: function () { return $("#EmployeeName").val(); },
                                        dashboardType: function () { return DashboardType; },
                                        //SelectedStaffId: function () { return selectedBaseFor; },
                                        SelectedStaffId: 1,
                                        reportval: function () {
                                            if (DashboardType == 1) {
                                                return $("#SelRosterDD").val();
                                            } else {
                                                return $("#SelMonthDD").val();
                                            }
                                        },
                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ name: item.DutyDate, y: parseFloat(item.Percentage), 'drilldown': item.DutyDate })
                                        });

                                        $("#lblrosterCount").empty()
                                        $("#lblrosterCount").html(drilldata.length)


                                        let chart_d = { name: e.point.name, data: drilldata }
                                        console.log("chart_d", chart_d)

                                        chart.hideLoading();


                                        chart.yAxis[0].update({
                                            labels: {
                                                enabled: false
                                            },
                                            min: 0,
                                        })
                                        //chart.yAxis[0].setExtremes(0, 1);
                                        chart.addSeriesAsDrilldown(e.point, chart_d);
                                    },
                                    error: function (ex) {
                                        alert('Failed to retrieve Sector : ' + ex);
                                    }
                                });

                            } else {
                                //ReLoadStaffWiseGrid();

                                searchInJggrid('staffwiseGrid', DrilldownValue)
                            }
                        },
                        drillup: function (e) {

                            var chart = this;
                            chart.setTitle({ text: defaultTitle });
                            drilldown_count = 0;
                            console.log("data1", data1.length)
                            $("#lblrosterCount").empty()
                            $("#lblrosterCount").html(datacount)
                            chart.yAxis[0].update({
                                labels: {
                                    enabled: true
                                },
                                min: 0,
                            })

                            chart.series[0].setData(data1)
                            ReLoadStaffWiseGrid();
                        }
                    },
                },
                title: {
                    text: defaultTitle
                },
                xAxis: {
                    type: 'category',
                    min: 0,
                    //max: 100,
                    labels: {
                        style: {
                            color: '#000',
                            font: '10px Trebuchet MS, Verdana, sans-serif'
                        },
                        rotation: -90
                    },
                    //scrollbar: {
                    //    enabled: true
                    //}
                },
                yAxis: {
                    min: 0,
                    //max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        turboThreshold: 1000000,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.empName}</span>: <b>{point.y:.2f}'
                    //pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                credits: {
                    enabled: false
                }
            },
                function (chart) { // on complete
                    console.log("data chart", chart.series[0].data.length)
                    console.log("data1", data1.length)

                    if (data1.length < 1) { // check series is empty
                        console.log("Check point 1")
                        chart.renderer.text('No Data Available', 680, 180)
                            .css({
                                color: '#4572A7',
                                fontSize: '20px'
                            })
                            .add();
                    }


                });
        },
        complete: function () {
            console.log("in compelete...");
            $("#overlay").hide();
            $(".overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}

//function loadOnloadChart_dateWise() {
//    var selectedChangeType = 1;
//    $("#overlay").show();
//    $(".overlay").show();
//    $.ajax({
//        type: 'POST',
//        url: applicationUrl + "Dashboard/Dashboard_all_StaffWisePercentage",
//        dataType: 'json',
//        data: {
//            fromDate: function () { return $("#TxtFromDate").val(); },
//            toDate: function () { return $("#TxtToDate").val(); },
//            baseCode: function () { return $("#baseCode").val(); },
//            crewRank: function () {
//                if (RankDDType == 1) {
//                    return $("#TxtRankSingleSelect").val();
//                } else {
//                    return $("#TxtRankMultiselect").val();
//                }
//            },
//            staffId: function () { return $("#sltStaffID").val(); },
//            emplName: function () { return $("#EmployeeName").val(); },
//            dashboardType: function () { return DashboardType; },
//            reportval: function () { return $("#SelRosterDD").val(); },
//            //selectedChangeType: function () { return selectedChangeType; },
//            selectedChangeType: selectedChangeType,
//        },
//        success: function (data) {
//            console.log("load chart data..", data)
//            var data1 = []
//            //data1 = data
//            $.each(data, function (i, item) {
//                data1.push({ 'name': item.StaffID, 'y': parseFloat(item.Percentage), 'drilldown': item.StaffID, 'empName': item.EmployeeName })
//            });
//            console.log("chart data1..", data1)
//            var drilldown_count = 0;
//            // Bar chart
//            Highcharts.chart('full_screen_chart', {
//                chart: {
//                    type: 'column',
//                    events: {
//                        drilldown: function (e) {
//                            drilldown_count = drilldown_count + 1;
//                            var chart = this;
//                            console.log("drill down event..", e.point.name)
//                            DrilldownValue = e.point.name
//                            SelectedChangeType_glob = selectedChangeType
//                            if (drilldown_count == 1) {
//                                ReLoadStaffWiseGrid();
//                                chart.showLoading('Loading data ...');
//                                $.ajax({
//                                    type: 'POST',
//                                    url: applicationUrl + "Dashboard/Dashboard_one_StaffWisePercentage",
//                                    dataType: 'json',
//                                    data: {
//                                        fromDate: function () { return $("#TxtFromDate").val(); },
//                                        toDate: function () { return $("#TxtToDate").val(); },
//                                        baseCode: function () { return $("#baseCode").val(); },
//                                        crewRank: function () {
//                                            if (RankDDType == 1) {
//                                                return $("#TxtRankSingleSelect").val();
//                                            } else {
//                                                return $("#TxtRankMultiselect").val();
//                                            }
//                                        },
//                                        staffId: function () { return DrilldownValue },
//                                        emplName: function () { return $("#EmployeeName").val(); },
//                                        dashboardType: function () { return DashboardType; },
//                                        //SelectedStaffId: function () { return selectedBaseFor; },
//                                        SelectedStaffId: 1,
//                                        reportval: function () {
//                                            if (DashboardType == 1) {
//                                                return $("#SelRosterDD").val();
//                                            } else {
//                                                return $("#SelMonthDD").val();
//                                            }
//                                        },
//                                    },
//                                    success: function (data) {
//                                        var drilldata = [];
//                                        $.each(data, function (i, item) {
//                                            drilldata.push({ name: item.DutyDate, y: parseFloat(item.Percentage), 'drilldown': item.DutyDate })
//                                        });
//                                        let chart_d = { name: e.point.name, data: drilldata }
//                                        console.log("chart_d", chart_d)
//                                        chart.hideLoading();
//                                        chart.addSeriesAsDrilldown(e.point, chart_d);
//                                    },
//                                    error: function (ex) {
//                                        alert('Failed to retrieve Sector : ' + ex);
//                                    }
//                                });
//                            } else{
//                                //ReLoadStaffWiseGrid();
//                                searchInJggrid('staffwiseGrid', DrilldownValue)
//                            }
//                        }
//                    },
//                },
//                title: {
//                    text: 'Change Count'
//                },
//                xAxis: {
//                    type: 'category'
//                },
//                yAxis: {
//                    min: 0,
//                    //max: 100,
//                    plotLines: [{
//                        value: 15,
//                        zIndex: 5,
//                        width: 2,
//                        color: '#ff0000',
//                        dashStyle: 'longdashdot'
//                    }],
//                    title: {
//                        text: ''
//                    }
//                },
//                legend: {
//                    enabled: false
//                },
//                subtitle: {
//                    text: ''
//                },
//                accessibility: {
//                    announceNewData: {
//                        enabled: true
//                    },
//                    point: {
//                        valueSuffix: '%'
//                    }
//                },
//                plotOptions: {
//                    series: {
//                        borderWidth: 0,
//                        dataLabels: {
//                            enabled: false,
//                            format: '{point.name}: {point.y:.1f}'
//                        }
//                    }
//                },
//                tooltip: {
//                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//                    pointFormat: '<span style="color:{point.color}">{point.empName}</span>: <b>{point.y:.2f}'
//                    //pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}'
//                },
//                series: [
//                    {
//                        /*name: "Browsers",*/
//                        colorByPoint: true,
//                        data: data1
//                    }
//                ],
//                credits: {
//                    enabled: false
//                }
//            });
//        },
//        complete: function () {
//            console.log("in compelete...");
//            $("#overlay").hide();
//            $(".overlay").hide();
//        },
//        error: function (ex) {
//            alert('Failed to retrieve Sector : ' + ex);
//        }
//    });
//}


function searchInJggrid(gridname, searchVal) {

    //ReLoadStaffWiseGrid();
    console.log('#' + gridname)
    console.log("searchVal", searchVal)
    //var $grid = $(gridname).jqGrid()
    var rules = [], i, cm, postData = $('#' + gridname).jqGrid("getGridParam", "postData"),
        colModel = $('#' + gridname).jqGrid("getGridParam", "colModel"),
        searchText = searchVal,
        l = colModel.length;
    //for (i = 0; i < l; i++) {
    cm = colModel[1];
    //if (cm.name == "DutyDate") {
    if (cm.search !== false && (cm.stype === undefined || cm.stype === "text")) {
        rules.push({
            field: cm.name,
            op: "eq",
            data: searchText
        });
    }
    //}      
    //}
    postData.filters = JSON.stringify({
        groupOp: "OR",
        rules: rules
    });
    $('#' + gridname).jqGrid("setGridParam", { search: true });
    $('#' + gridname).trigger("reloadGrid", [{ page: 1, current: true }]);

}


// with from date To date and Multiple staffid wise chart
function loadOnloadChart_MultStaffIdWise() {
    $("#lblrosterCount").empty()
    var selectedChangeType = 1;
    ReLoadStaffWiseGrid();
    $("#overlay").show();
    $(".overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            staffId: function () { return $("#sltStaffID").val(); },
            crewRank: function () { return $("#TxtRankMultiselect").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            //selectedChangeType: function () { return selectedChangeType; },
            selectedChangeType: selectedChangeType,
            selectPersentage: function () { return $("#topCaseWiseChartFilter").val(); },
        },
        success: function (data) {

            console.log("load chart data..", data)
            var data1 = []

            $("#lblrosterCount").html(data.length)
            var datacount = data.length

            ////var staffIds = $("#sltStaffID").val();
            ////var empids = $("#EmployeeName").val();
            //var staffIds = document.querySelector("#sltStaffID").selectedOptions.length;
            //var empids = document.querySelector("#EmployeeName").selectedOptions.length;  
            //var sltStaffID_text = $('#sltStaffID option:selected').toArray().map(item => item.text).join();
            //var EmployeeName_text = $('#EmployeeName').val();
            //console.log("sltStaffID_text", sltStaffID_text)
            //console.log("EmployeeName_text", EmployeeName_text)
            //var text = EmployeeName_text != null ? EmployeeName_text : sltStaffID_text;
            //let slt_Staff_ids = []
            //if (EmployeeName_text != null) {              
            //    slt_Staff_ids = EmployeeName_text;
            //} else {
            //    slt_Staff_ids = text.split(",")
            //}
            //console.log("sltStaffID", slt_Staff_ids)
            //if (staffIds > 0)
            //{
            //    $.each(slt_Staff_ids, function (sel_i, sel_item) {
            //        $.each(data, function (i, item) {
            //            if (sel_item == item.StaffID) {
            //                data1.push({ 'name': item.StaffID, 'y': parseFloat(item.Percentage), 'drilldown': item.StaffID, 'empName': item.EmployeeName })
            //            } else {
            //                data1.push({ 'name': sel_item, 'y': parseFloat(0), 'drilldown': item.StaffID, 'empName': item.EmployeeName })
            //            }
            //        });
            //    });
            //}
            //else if (empids > 0)
            //{
            //    $.each(slt_Staff_ids, function (sel_i, sel_item) {
            //        $.each(data, function (i, item) {
            //            if (sel_item == item.StaffID) {
            //                data1.push({ 'name': item.StaffID, 'y': parseFloat(item.Percentage), 'drilldown': item.StaffID, 'empName': item.EmployeeName })
            //            } else {
            //                data1.push({ 'name': sel_item, 'y': parseFloat(0), 'drilldown': item.StaffID, 'empName': item.EmployeeName })
            //            }
            //        });
            //    });
            //}
            //else
            //{
            //    $.each(data, function (i, item) {
            //        data1.push({ 'name': item.StaffID, 'y': parseFloat(item.Percentage), 'drilldown': item.StaffID, 'empName': item.EmployeeName })
            //    });          
            //}

            $.each(data, function (i, item) {
                data1.push({ 'name': item.StaffID, 'y': parseFloat(item.Percentage), 'drilldown': item.StaffID, 'empName': item.EmployeeName })
            });

            console.log("data1 with 0 return value", data1);

            //data1 = data


            console.log("chart data1..", data1)
            var drilldown_count = 0;
            var noData_count = 0;
            var defaultTitle = "Change Percentage ";
            var drilldownTitle = "Change Count";
            var rer_chart = '';

            // Bar chart
            Highcharts.chart('full_screen_chart', {
                chart: {
                    type: 'column',
                    zoomType: 'x',
                    events: {
                        drilldown: function (e) {
                            drilldown_count = drilldown_count + 1;
                            var chart = this;
                            //chart.setTitle({ text: drilldownTitle });

                            console.log("drill down event..", e.point.name)
                            DrilldownValue = e.point.name
                            SelectedChangeType_glob = selectedChangeType
                            if (drilldown_count == 1) {
                                chart.setTitle({ text: drilldownTitle + ' of ' + e.point.name });
                                ReLoadStaffWiseGrid();
                                chart.showLoading('Loading data ...');
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "Dashboard/Dashboard_one_StaffWisePercentage",
                                    dataType: 'json',
                                    data: {
                                        fromDate: function () { return $("#TxtFromDate").val(); },
                                        toDate: function () { return $("#TxtToDate").val(); },
                                        baseCode: function () { return $("#baseCode").val(); },
                                        crewRank: function () {
                                            if (RankDDType == 1) {
                                                return $("#TxtRankSingleSelect").val();
                                            } else {
                                                return $("#TxtRankMultiselect").val();
                                            }
                                        },
                                        staffId: function () { return DrilldownValue },
                                        emplName: function () { return $("#EmployeeName").val(); },
                                        dashboardType: function () { return DashboardType; },
                                        //SelectedStaffId: function () { return selectedBaseFor; },
                                        SelectedStaffId: 1,
                                        reportval: function () {
                                            if (DashboardType == 1) {
                                                return $("#SelRosterDD").val();
                                            } else {
                                                return $("#SelMonthDD").val();
                                            }
                                        },
                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ name: item.DutyDate, y: parseFloat(item.Percentage), 'drilldown': item.DutyDate })
                                        });

                                        $("#lblrosterCount").empty()
                                        $("#lblrosterCount").html(drilldata.length)

                                        //Added this code to hnadle records with 0 value
                                        if (drilldata.length < 1) { // check series is empty
                                            console.log("Check point 1")
                                            noData_count = 1
                                            rer_chart = chart.renderer.text('No Data Available', 680, 180)
                                                .css({
                                                    color: '#4572A7',
                                                    fontSize: '20px'
                                                })
                                                .add();
                                        }

                                        let chart_d = {
                                            name: e.point.name, data: drilldata, tooltip: {
                                                pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}'
                                            }
                                        }
                                        console.log("chart_d", chart_d)

                                        chart.yAxis[0].update({
                                            labels: {
                                                enabled: false
                                            }
                                        })

                                        chart.hideLoading();
                                        chart.addSeriesAsDrilldown(e.point, chart_d);
                                    },
                                    error: function (ex) {
                                        alert('Failed to retrieve Sector : ' + ex);
                                    }
                                });
                            } else {
                                //ReLoadStaffWiseGrid();
                                searchInJggrid('staffwiseGrid', DrilldownValue)
                            }
                        },
                        drillup: function (e) {

                            var chart = this;

                            chart.setTitle({ text: defaultTitle });


                            //if (drilldata.length < 1) { // check series is empty
                            //    console.log("Check point 100")
                            //    rer_chart = chart.renderer.text('No Data Available', 680, 180)
                            //        .css({
                            //            color: '#4572A7',
                            //            fontSize: '20px'
                            //        })
                            //        .destroy();
                            //}

                            //if (data1.length < 1) { // check series is empty
                            //    console.log("Check point 101")
                            //    rer_chart = chart.renderer.text('No Data Available', 680, 180)
                            //        .css({
                            //            color: '#4572A7',
                            //            fontSize: '20px'
                            //        })
                            //        .destroy();
                            //}
                            drilldown_count = 0;

                            $("#lblrosterCount").empty()
                            $("#lblrosterCount").html(datacount)
                            console.log("noData_count", noData_count)
                            if (noData_count < 1) {
                                console.log("should work with staff")
                                chart.series[0].setData(data1)
                            }
                            else {
                                console.log("Check point 101")
                                rer_chart.destroy();
                                console.log("Check point 102")

                                //chart.redraw()
                            }


                            chart.yAxis[0].update({
                                labels: {
                                    enabled: true
                                }
                            })

                            ReLoadStaffWiseGrid();
                            noData_count = 0
                        }

                    },
                },
                title: {
                    text: defaultTitle
                },
                xAxis: {
                    type: 'category'
                    ,
                    labels: {
                        rotation: -90
                    }
                    //,
                    //max: 100,
                    //scrollbar: {
                    //    enabled: true
                    //}
                },
                yAxis: {
                    min: 0,
                    //max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: ''
                    }
                },

                plotOptions: {
                    series: {
                        turboThreshold: 1000000,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.y:.1f}'
                        },

                    },
                    column: {
                        dataLabels: {
                            align: 'center',
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}'
                    shared: true,
                    crosshairs: true,

                    pointFormat: '<span style="color:{point.color}">{point.empName}</span>: <b>{point.y:.2f}%'


                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                credits: {
                    enabled: false
                }
            });
            //function (chart) { // on complete
            //    console.log("data chart", chart.series[0].data.length)
            //    console.log("data1", data1.length)

            //    if (data1.length < 1) { // check series is empty
            //        console.log("Check point 1")
            //        chart.renderer.text('No Data Available', 680, 180)
            //            .css({
            //                color: '#4572A7',
            //                fontSize: '20px'
            //            })
            //            .add();
            //    }


            //}
            //);
        },

        complete: function () {
            console.log("in compelete...");
            $("#overlay").hide();
            $(".overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }

    });

}


// Chart Onload

function loadOnloadChart_secOne() {

    var selectedChangeType = 1;
    //fromDate = '11-04-2021';
    //toDate = '12-04-2021';

    $("#overlay").show();
    $(".overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardOnloadrWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return fromDate },
            toDate: function () { return toDate },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            selectedChangeType: function () { return selectedChangeType; },
        },
        success: function (data) {

            console.log("load chart data..", data)
            var data1 = []
            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.BaseName, tooltip_name: item.BaseName, 'y': parseFloat(item.Percentage), 'drilldown': item.BaseName })
            });

            console.log("chart data1..", data1)
            var drilldown_count = 0;
            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

            var OnloadGridwidth = $("#OnloadGrid").closest(".ui-jqgrid").parent().width();
            $("#OnloadGrid").jqGrid("setGridWidth", OnloadGridwidth, true);
            // Bar chart


            Highcharts.chart('Onload_Chart_sec_one', {

                chart: {
                    type: 'column',
                    zoomType: 'x',
                    events: {
                        drilldown: function (e) {
                            drilldown_count = drilldown_count + 1;
                            var chart = this;
                            $("#OnloadGridSec").hide();
                            console.log("drill down event..", e.point.name)
                            DrilldownValue = e.point.name
                            //drilldown_val_one = e.point.name
                            SelectedChangeType_glob = selectedChangeType
                            console.log("drilldown_count", drilldown_count)

                            console.log("drilldown_val_one", drilldown_val_one)
                            console.log("drilldown_val_two", drilldown_val_two)
                            console.log("drilldown_val_three", drilldown_val_three)
                            console.log("drilldown_val_four", drilldown_val_four)

                            if (drilldown_count == 2) {
                                chart.showLoading('Loading data ...');
                                drilldown_val_two = e.point.name;
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "Dashboard/Get_DashboardBase_RankCrewwisepercentage",
                                    dataType: 'json',
                                    data: {
                                        fromDate: function () { return fromDate },
                                        toDate: function () { return toDate },
                                        baseCode: function () { return drilldown_val_one },
                                        crewRank: function () { return $("#TxtRankMultiselect").val(); },
                                        staffId: function () { return $("#sltStaffID").val(); },
                                        emplName: function () { return $("#EmployeeName").val(); },
                                        dashboardType: function () { return DashboardType; },
                                        selectedBase: function () { return SelectedChangeType_glob; },
                                        SelectedRank: function () { return e.point.name },

                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ 'name': item.StaffID, tooltip_name: item.EmployeeName, 'y': parseFloat(item.Percentage), 'drilldown': item.StaffID })
                                        });
                                        let chart_d = {
                                            name: e.point.name, data: drilldata, tooltip: {
                                                pointFormat: '<span style="color:{point.color}"><b>{point.tooltip_name:.2f}'
                                            }
                                        }

                                        chart.hideLoading();
                                        chart.addSeriesAsDrilldown(e.point, chart_d);
                                    },
                                    error: function (ex) {
                                        alert('Failed to retrieve : ' + ex.toString());
                                    }
                                });
                                $("#OnloadGridSec").hide();
                                //ReLoadOnloadWiseGrid();
                            }
                            else if (drilldown_count == 3) {

                                chart.showLoading('Loading data ...');
                                drilldown_val_three = e.point.name
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "Dashboard/DashboardOnload_one_StaffWisePercentage",
                                    dataType: 'json',
                                    data: {
                                        fromDate: function () { return fromDate },
                                        toDate: function () { return toDate },
                                        baseCode: function () { return drilldown_val_one },
                                        crewRank: function () { return drilldown_val_two },
                                        staffId: function () { return e.point.name },
                                        emplName: function () { return $("#EmployeeName").val(); },
                                        dashboardType: function () { return DashboardType; },
                                        //SelectedStaffId: function () { return selectedBaseFor; },
                                        SelectedStaffId: 1,
                                        reportval: function () {
                                            if (DashboardType == 1) {
                                                return $("#SelRosterDD").val();
                                            } else {
                                                return $("#SelMonthDD").val();
                                            }
                                        },
                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ name: item.DutyDate, tooltip_name: item.DutyDate, y: parseFloat(item.Percentage), 'drilldown': item.DutyDate })
                                        });

                                        $("#lblrosterCount").empty()
                                        $("#lblrosterCount").html(drilldata.length)

                                        let chart_d = {
                                            name: e.point.name, data: drilldata, tooltip: {
                                                pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}'
                                            }
                                        }

                                        chart.yAxis[0].update({
                                            labels: {
                                                enabled: false
                                            },
                                            min: 0,
                                        })
                                        //chart.yAxis[0].setExtremes(0, 1);
                                        console.log("chart_d", chart_d)
                                        chart.hideLoading();

                                        chart.addSeriesAsDrilldown(e.point, chart_d);
                                    },
                                    error: function (ex) {
                                        alert('Failed to retrieve Sector : ' + ex);
                                    }
                                });




                                $("#OnloadGridSec").show();

                                //New Change
                                if (onloadwiseGrid == false) {
                                    LoadOnloadWiseGrid();
                                } else {
                                    ReLoadOnloadWiseGrid();
                                }
                                onloadwiseGrid = true;
                                //New Change Ends

                                var OnloadGridwidth = $("#OnloadGrid").closest(".ui-jqgrid").parent().width();
                                $("#OnloadGrid").jqGrid("setGridWidth", OnloadGridwidth, true);

                                //ReLoadOnloadWiseGrid();
                                console.log("drilldown_count..", drilldown_count)
                            } else if (drilldown_count == 1) {

                                drilldown_val_one = e.point.name

                                chart.showLoading('Loading data ...');
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "Dashboard/Get_DashboardonloadBaseandRankwisepercentage",
                                    dataType: 'json',
                                    data: {
                                        fromDate: function () { return fromDate },
                                        toDate: function () { return toDate },
                                        baseCode: function () { return DrilldownValue },
                                        crewRank: function () { return $("#TxtRankMultiselect").val(); },
                                        staffId: function () { return $("#sltStaffID").val(); },
                                        emplName: function () { return $("#EmployeeName").val(); },
                                        dashboardType: function () { return DashboardType; },
                                        SelectedStaffId: 1,
                                        reportval: function () {
                                            if (DashboardType == 1) {
                                                return $("#SelRosterDD").val();
                                            } else {
                                                return $("#SelMonthDD").val();
                                            }
                                        },
                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ name: item.CrewRank, tooltip_name: item.CrewRank, y: parseFloat(item.Percentage), 'drilldown': item.CrewRank })
                                        });
                                        $("#lblrosterCount").empty()
                                        $("#lblrosterCount").html(drilldata.length)

                                        let chart_d = { name: e.point.name, data: drilldata }
                                        console.log("chart_d", chart_d)
                                        chart.hideLoading();
                                        chart.addSeriesAsDrilldown(e.point, chart_d);
                                    },
                                    error: function (ex) {
                                        alert('Failed to retrieve Sector : ' + ex);
                                    }
                                });
                                $("#OnloadGridSec").hide();
                                //ReLoadOnloadWiseGrid();
                                console.log("drilldown_count..", drilldown_count)
                            }
                            else {
                                drilldown_val_four = e.point.name;
                                $("#OnloadGridSec").show();
                                ReLoadOnloadWiseGrid();
                                console.log("drilldown_count..", drilldown_count)

                            }
                        },
                        drillup: function (e) {
                            if (drilldown_count >= 4) {
                                drilldown_count = 3
                            }
                            drilldown_count = drilldown_count - 1;
                            console.log("drilldown_count..", drilldown_count)

                            var chart = this;
                            if (drilldown_count == 1) {
                                console.log("drilldown_count..", drilldown_count)
                                drilldown_val_two = ''
                                drilldown_val_three = ''
                                drilldown_val_four = '';
                                chart.yAxis[0].update({
                                    labels: {
                                        enabled: true
                                    },
                                    min: 0,
                                })
                                $("#OnloadGridSec").hide();
                            } else if (drilldown_count == 2) {
                                console.log("drilldown_count..", drilldown_count)
                                drilldown_val_three = ''
                                drilldown_val_four = '';
                                chart.yAxis[0].update({
                                    labels: {
                                        enabled: true
                                    },
                                    min: 0,
                                })
                                $("#OnloadGridSec").show();
                            } else if (drilldown_count == 3) {
                                console.log("drilldown_count..", drilldown_count)
                                //drilldown_val_four = '';
                                drilldown_val_four = '';
                                $("#OnloadGridSec").show();
                                chart.yAxis[0].update({
                                    labels: {
                                        enabled: false
                                    },
                                    min: 0,
                                })
                            } else if (drilldown_count == 0) {
                                $("#OnloadGridSec").hide();

                            }
                            else {
                                $("#OnloadGridSec").show();
                                chart.series[0].setData(data1)
                            }

                            console.log("drilldown_count..", drilldown_count)

                            //labels: {
                            //    rotation: -90
                            //}

                            //chart.series[0].setData(data1)
                        },
                    },
                },
                title: {
                    text: 'Change'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    //max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],

                credits: {
                    enabled: false
                }
            },
            function (chart) { // on complete
                console.log("data chart", chart.series[0].data.length)
                console.log("data1", data1.length)


                //var arr = chart.options.exporting.buttons.contextButton.menuItems;
                //var index = arr.indexOf("viewData");
                //if (index !== -1) arr.splice(index, 1);


                if (data1.length < 1) { // check series is empty
                    console.log("Check point 1")
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '20px'
                        })
                        .add();
                }


            });
        },
        complete: function () {
            console.log("Compelete...");
            $("#overlay").hide();
            $(".overlay").hide();




        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}

function loadOnloadChart_secTwo() {
    //fromDate = '01-03-2021';
    //toDate = '28-03-2021';

    var selectedChangeType = 2;
    $("#overlay").show();
    $(".overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardOnloadrWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return fromDate },
            toDate: function () { return toDate },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            selectedChangeType: function () { return selectedChangeType; },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []
            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.BaseName, 'y': parseFloat(item.Percentage), 'drilldown': item.BaseName })
            });

            console.log("chart data1..", data1)

            //var drilldown_count = 0;

            drilldown_val_one = '', drilldown_val_two = '', drilldown_val_three = '', drilldown_val_four = '';

            // Bar chart
            Highcharts.chart('Onload_Chart_sec_two', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {

                            //drilldown_count = drilldown_count + 1;
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            //chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name
                            //drilldown_val_one = e.point.name
                            SelectedChangeType_glob = selectedChangeType
                            console.log("drilldown_count", drilldown_count)

                            console.log("drilldown_val_one", drilldown_val_one)
                            console.log("drilldown_val_one", drilldown_val_two)
                            console.log("drilldown_val_one", drilldown_val_three)

                            //console.log("drill down one level", DrilldownValue = e.point.name)
                            //ReLoadOnloadWiseGrid();

                        }
                    },
                },
                title: {
                    text: 'No Change'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    //    plotLines: [{
                    //        value: 15,
                    //    zIndex: 5,
                    //    width: 2,
                    //        color: '#ff0000',
                    //dashStyle: 'longdashdot'
                    //}],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },

                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                },

                series:
                    [
                        {
                            /*name: "Browsers",*/
                            colorByPoint: true,
                            data: data1
                        }
                    ],
                credits: {
                    enabled: false
                }
            },
            function (chart) { // on complete
                console.log("data chart", chart.series[0].data.length)
                console.log("data1", data1.length)

                if (data1.length < 1) { // check series is empty
                    console.log("Check point 1")
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '20px'
                        })
                        .add();
                }


            });
        },
        complete: function () {
            console.log("in compelete...");
            $("#overlay").hide();
            $(".overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}

function loadOnloadChart_secThree() {

    var selectedChangeType = 3;
    //fromDate = '01-03-2021';
    //toDate = '28-03-2021';

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardOnloadrWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return fromDate },
            toDate: function () { return toDate },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            selectedChangeType: function () { return selectedChangeType },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []
            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.BaseName, 'y': parseFloat(item.Percentage), 'drilldown': item.BaseName })
            });

            console.log("chart data1..", data1)

            //var drilldown_count = 0;

            // Bar chart
            Highcharts.chart('Onload_Chart_sec_three', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {

                            //drilldown_count = drilldown_count + 1;
                            var chart = this;
                            console.log("drill down event..", e.point.name)

                            //DrilldownValue = e.point.name
                            SelectedChangeType_glob = selectedChangeType
                            //ReLoadOnloadWiseGrid();

                        }
                    },
                },
                title: {
                    text: 'Vol Change'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    //    plotLines: [{
                    //        value: 15,
                    //    zIndex: 5,
                    //    width: 2,
                    //            color: '#ff0000',
                    //dashStyle: 'longdashdot'
                    //}],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },

                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                credits: {
                    enabled: false
                }
            },
            function (chart) { // on complete
                console.log("data chart", chart.series[0].data.length)
                console.log("data1", data1.length)

                if (data1.length < 1) { // check series is empty
                    console.log("Check point 1")
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '20px'
                        })
                        .add();
                }


            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });

}


// chart month wise

function loadMonthWise() {

    console.log("loadRankWithSignleDD..", $("#baseCode").val())

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardMonthWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.MonthType, 'y': parseFloat(item.Percentage), 'drilldown': item.MonthType })
            });

            console.log("chart data1..", data1)

            // Create the chart
            Highcharts.chart('month_Chart_sec', {
                chart: {
                    type: 'pie',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            chart.showLoading('Loading data ...');

                            $.ajax({
                                type: 'POST',
                                url: applicationUrl + "Dashboard/DashboardSelectedMonthWisePercentage",
                                dataType: 'json',
                                data: {
                                    fromDate: function () { return $("#TxtFromDate").val(); },
                                    toDate: function () { return $("#TxtToDate").val(); },
                                    baseCode: function () { return $("#baseCode").val(); },
                                    crewRank: function () {
                                        if (RankDDType == 1) {
                                            return $("#TxtRankSingleSelect").val();
                                        } else {
                                            return $("#TxtRankMultiselect").val();
                                        }

                                    },
                                    staffId: function () { return $("#sltStaffID").val(); },
                                    emplName: function () { return $("#EmployeeName").val(); },
                                    dashboardType: function () { return DashboardType; },
                                    drilldownValue: function () { return e.point.name; },
                                    reportval: function () { return $("#SelMonthDD").val(); }
                                },
                                success: function (data) {

                                    var drilldata = [];
                                    $.each(data, function (i, item) {
                                        drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                                    });
                                    let chart_d = { name: e.point.name, data: drilldata }
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, chart_d);

                                },
                                error: function (ex) {
                                    alert('Failed to retrieve Sector : ' + ex);
                                }
                            });
                        }
                    },
                },
                title: {
                    text: 'Report One'
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    },
                    pie: {
                        showInLegend: true,
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                exporting: {
                    showTable: false
                },
                credits: {
                    enabled: false
                }
            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

// Chart Data Base wise

function getChartDatafor_secOne(base_name) {

    console.log("loadRankWithSignleDD..", $("#baseCode").val())

    var selectedBaseFor = 1;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardBaseWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            selectedBase: function () { return selectedBaseFor; },
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ name: item.ChangeType, y: parseFloat(item.Percentage), drilldown: item.ChangeType })
            });

            console.log("chart data1..", data1)

            var drilldown_count = 0;

            // Create the chart
            Highcharts.chart('container_one', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            drilldown_count = drilldown_count + 1;
                            var chart = this;
                            console.log("drill down event..", e.point.name)

                            if (drilldown_count == 1) {

                                chart.showLoading('Loading data ...');
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "Dashboard/DashboardRankWisePercentage",
                                    dataType: 'json',
                                    data: {
                                        fromDate: function () { return $("#TxtFromDate").val(); },
                                        toDate: function () { return $("#TxtToDate").val(); },
                                        baseCode: function () { return $("#baseCode").val(); },
                                        crewRank: function () {
                                            if (RankDDType == 1) {
                                                return $("#TxtRankSingleSelect").val();
                                            } else {
                                                return $("#TxtRankMultiselect").val();
                                            }

                                        },
                                        staffId: function () { return $("#sltStaffID").val(); },
                                        emplName: function () { return $("#EmployeeName").val(); },
                                        dashboardType: function () { return DashboardType; },
                                        selectedBase: function () { return selectedBaseFor; },
                                        drilldownValue: function () { return e.point.name; },
                                        reportval: function () {
                                            if (DashboardType == 1) {
                                                return $("#SelRosterDD").val();
                                            } else {
                                                return $("#SelMonthDD").val();
                                            }

                                        },
                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ name: item.CrewRank, y: parseFloat(item.Percentage), 'drilldown': item.CrewRank })
                                        });
                                        let chart_d = { name: e.point.name, data: drilldata }
                                        console.log("chart_d", chart_d)
                                        chart.hideLoading();
                                        chart.addSeriesAsDrilldown(e.point, chart_d);
                                    },
                                    error: function (ex) {
                                        alert('Failed to retrieve Sector : ' + ex);
                                    }
                                });

                                DrilldownValue = e.point.name;
                                baseSelected = 1;
                                SelectedRank = 0;
                                console.log("1st click", DrilldownValue)
                                ReLoadBaseWiseGridtGrid();

                            } else {
                                //DrilldownValue = e.point.name;
                                baseSelected = 1;
                                SelectedRank = e.point.name;
                                console.log("2nd click", SelectedRank)
                                ReLoadBaseWiseGridtGrid();
                            }
                        }
                    },
                },
                title: {
                    text: base_name
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                credits: {
                    enabled: false
                },
                drilldown: {
                    series: []
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function getChartDatafor_secTwo(base_name) {
    var selectedBaseFor = 2;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardBaseWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            selectedBase: function () { return selectedBaseFor; },
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []
            $.each(data, function (i, item) {
                data1.push({ name: item.ChangeType, y: parseFloat(item.Percentage), drilldown: item.ChangeType })
            });

            var drilldown_count = 0;

            // Create the chart
            Highcharts.chart('container_two', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)

                            drilldown_count = drilldown_count + 1;

                            if (drilldown_count == 1) {
                                chart.showLoading('Loading data ...');
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "Dashboard/DashboardRankWisePercentage",
                                    dataType: 'json',
                                    data: {
                                        fromDate: function () { return $("#TxtFromDate").val(); },
                                        toDate: function () { return $("#TxtToDate").val(); },
                                        baseCode: function () { return $("#baseCode").val(); },
                                        crewRank: function () {
                                            if (RankDDType == 1) {
                                                return $("#TxtRankSingleSelect").val();
                                            } else {
                                                return $("#TxtRankMultiselect").val();
                                            }

                                        },
                                        staffId: function () { return $("#sltStaffID").val(); },
                                        emplName: function () { return $("#EmployeeName").val(); },
                                        dashboardType: function () { return DashboardType; },
                                        selectedBase: function () { return selectedBaseFor; },
                                        drilldownValue: function () { return e.point.name; },
                                        reportval: function () {
                                            if (DashboardType == 1) {
                                                return $("#SelRosterDD").val();
                                            } else {
                                                return $("#SelMonthDD").val();
                                            }

                                        },
                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ name: item.CrewRank, y: parseFloat(item.Percentage), 'drilldown': item.CrewRank })
                                        });
                                        let chart_d = { name: e.point.name, data: drilldata }
                                        console.log("chart_d", chart_d)
                                        chart.hideLoading();
                                        chart.addSeriesAsDrilldown(e.point, chart_d);
                                    },
                                    error: function (ex) {
                                        alert('Failed to retrieve Sector : ' + ex);
                                    }
                                });
                                DrilldownValue = e.point.name;
                                baseSelected = 2;
                                SelectedRank = 0;
                                ReLoadBaseWiseGridtGrid();

                            } else {
                                //  DrilldownValue = e.point.name;
                                baseSelected = 2;
                                SelectedRank = e.point.name;;
                                ReLoadBaseWiseGridtGrid();
                            }
                        }
                    },
                },
                title: {
                    text: base_name
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                drilldown: {
                    series: []
                }
                ,
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });



}

function getChartDatafor_secThree(base_name) {

    console.log("loadRankWithSignleDD..", $("#baseCode").val())

    var selectedBaseFor = 3;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardBaseWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            selectedBase: function () { return selectedBaseFor; },
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)
            var data1 = []
            $.each(data, function (i, item) {
                data1.push({ name: item.ChangeType, y: parseFloat(item.Percentage), drilldown: item.ChangeType })
            });

            var drilldown_count = 0;

            // Create the chart
            Highcharts.chart('container_three', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            drilldown_count = drilldown_count + 1;
                            var chart = this;
                            console.log("drill down event..", e.point.name)

                            if (drilldown_count == 1) {
                                chart.showLoading('Loading data ...');
                                $.ajax({
                                    type: 'POST',
                                    url: applicationUrl + "Dashboard/DashboardRankWisePercentage",
                                    dataType: 'json',
                                    data: {
                                        fromDate: function () { return $("#TxtFromDate").val(); },
                                        toDate: function () { return $("#TxtToDate").val(); },
                                        baseCode: function () { return $("#baseCode").val(); },
                                        crewRank: function () {
                                            if (RankDDType == 1) {
                                                return $("#TxtRankSingleSelect").val();
                                            } else {
                                                return $("#TxtRankMultiselect").val();
                                            }
                                        },
                                        staffId: function () { return $("#sltStaffID").val(); },
                                        emplName: function () { return $("#EmployeeName").val(); },
                                        dashboardType: function () { return DashboardType; },
                                        selectedBase: function () { return selectedBaseFor; },
                                        drilldownValue: function () { return e.point.name; },
                                        reportval: function () {
                                            if (DashboardType == 1) {
                                                return $("#SelRosterDD").val();
                                            } else {
                                                return $("#SelMonthDD").val();
                                            }
                                        },
                                    },
                                    success: function (data) {
                                        var drilldata = [];
                                        $.each(data, function (i, item) {
                                            drilldata.push({ name: item.CrewRank, y: parseFloat(item.Percentage), 'drilldown': item.CrewRank })
                                        });
                                        let chart_d = { name: e.point.name, data: drilldata }
                                        console.log("chart_d", chart_d)
                                        chart.hideLoading();
                                        chart.addSeriesAsDrilldown(e.point, chart_d);
                                    },
                                    error: function (ex) {
                                        alert('Failed to retrieve Sector : ' + ex);
                                    }
                                });
                                DrilldownValue = e.point.name;
                                baseSelected = 3;
                                SelectedRank = 0;
                                ReLoadBaseWiseGridtGrid();
                            } else {
                                // DrilldownValue = e.point.name;
                                baseSelected = 3;
                                SelectedRank = e.point.name;;
                                ReLoadBaseWiseGridtGrid();
                            }
                        }
                    },
                },
                title: {
                    text: base_name
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                drilldown: {
                    series: []
                },
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });



}

// chart data for Staff wise

function getChartDataStaffIDfor_secOne(staff_name) {

    console.log("loadRankWithSignleDD..", $("#baseCode").val())

    var selectedBaseFor = 1;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            SelectedStaffId: function () { return selectedBaseFor; },
            selectPersentage: function () { return $("#dateWiseChartFilter").val(); },
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.ChangeType, 'y': parseFloat(item.Percentage), 'drilldown': item.ChangeType })
            });

            console.log("chart data1..", data1)

            // Create the chart
            Highcharts.chart('container_one', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            //    chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name;
                            SelectedStaffId = 1;
                            SelectedRank = 0;
                            ReLoadStaffWiseGrid();

                            //$.ajax({
                            //    type: 'POST',
                            //    url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
                            //    dataType: 'json',
                            //    data: {
                            //        fromDate: function () { return $("#TxtFromDate").val(); },
                            //        toDate: function () { return $("#TxtToDate").val(); },
                            //        baseCode: function () { return $("#baseCode").val(); },
                            //        crewRank: function () {
                            //            if (RankDDType == 1) {
                            //                return $("#TxtRankSingleSelect").val();
                            //            } else {
                            //                return $("#TxtRankMultiselect").val();
                            //            }
                            //        },
                            //        staffId: function () { return $("#sltStaffID").val(); },
                            //        emplName: function () { return $("#EmployeeName").val(); },
                            //        dashboardType: function () { return DashboardType; },
                            //        selectedBase: function () { return selectedBaseFor; },
                            //        drilldownValue: function () { return e.point.name; },
                            //        reportval: function () {
                            //            if (DashboardType == 1) {
                            //                return $("#SelRosterDD").val();
                            //            } else {
                            //                return $("#SelMonthDD").val();
                            //            }

                            //        },
                            //    },
                            //    success: function (data) {
                            //        var drilldata = [];
                            //        $.each(data, function (i, item) {
                            //            drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage)})
                            //        });                           
                            //        let chart_d = { name: e.point.name, data: drilldata }                           
                            //        chart.hideLoading();
                            //        chart.addSeriesAsDrilldown(e.point, chart_d);
                            //    },
                            //    error: function (ex) {
                            //        alert('Failed to retrieve : ' + ex.toString());
                            //    }
                            //});
                        }
                    },
                },
                title: {
                    text: staff_name
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                drilldown: {

                },
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function getChartDataStaffIDfor_secTwo(staff_name) {

    var selectedBaseFor = 2;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            SelectedStaffId: function () { return selectedBaseFor; },
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.ChangeType, 'y': parseFloat(item.Percentage), 'drilldown': item.ChangeType })
            });

            console.log("chart data1..", data1)

            // Create the chart
            Highcharts.chart('container_one', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            //    chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name;
                            SelectedStaffId = 1;
                            SelectedRank = 0;
                            ReLoadStaffWiseGrid();

                            //$.ajax({
                            //    type: 'POST',
                            //    url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
                            //    dataType: 'json',
                            //    data: {
                            //        fromDate: function () { return $("#TxtFromDate").val(); },
                            //        toDate: function () { return $("#TxtToDate").val(); },
                            //        baseCode: function () { return $("#baseCode").val(); },
                            //        crewRank: function () {
                            //            if (RankDDType == 1) {
                            //                return $("#TxtRankSingleSelect").val();
                            //            } else {
                            //                return $("#TxtRankMultiselect").val();
                            //            }
                            //        },
                            //        staffId: function () { return $("#sltStaffID").val(); },
                            //        emplName: function () { return $("#EmployeeName").val(); },
                            //        dashboardType: function () { return DashboardType; },
                            //        selectedBase: function () { return selectedBaseFor; },
                            //        drilldownValue: function () { return e.point.name; },
                            //        reportval: function () {
                            //            if (DashboardType == 1) {
                            //                return $("#SelRosterDD").val();
                            //            } else {
                            //                return $("#SelMonthDD").val();
                            //            }

                            //        },
                            //    },
                            //    success: function (data) {
                            //        var drilldata = [];
                            //        $.each(data, function (i, item) {
                            //            drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage)})
                            //        });                           
                            //        let chart_d = { name: e.point.name, data: drilldata }                           
                            //        chart.hideLoading();
                            //        chart.addSeriesAsDrilldown(e.point, chart_d);
                            //    },
                            //    error: function (ex) {
                            //        alert('Failed to retrieve : ' + ex.toString());
                            //    }
                            //});
                        }
                    },
                },
                title: {
                    text: staff_name
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                drilldown: {

                },
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function getChartDataStaffIDfor_secThree(staff_name) {

    var selectedBaseFor = 3;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            SelectedStaffId: function () { return selectedBaseFor; },
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.ChangeType, 'y': parseFloat(item.Percentage), 'drilldown': item.ChangeType })
            });

            console.log("chart data1..", data1)

            // Create the chart
            Highcharts.chart('container_one', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            //    chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name;
                            SelectedStaffId = 1;
                            SelectedRank = 0;
                            ReLoadStaffWiseGrid();

                            //$.ajax({
                            //    type: 'POST',
                            //    url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
                            //    dataType: 'json',
                            //    data: {
                            //        fromDate: function () { return $("#TxtFromDate").val(); },
                            //        toDate: function () { return $("#TxtToDate").val(); },
                            //        baseCode: function () { return $("#baseCode").val(); },
                            //        crewRank: function () {
                            //            if (RankDDType == 1) {
                            //                return $("#TxtRankSingleSelect").val();
                            //            } else {
                            //                return $("#TxtRankMultiselect").val();
                            //            }
                            //        },
                            //        staffId: function () { return $("#sltStaffID").val(); },
                            //        emplName: function () { return $("#EmployeeName").val(); },
                            //        dashboardType: function () { return DashboardType; },
                            //        selectedBase: function () { return selectedBaseFor; },
                            //        drilldownValue: function () { return e.point.name; },
                            //        reportval: function () {
                            //            if (DashboardType == 1) {
                            //                return $("#SelRosterDD").val();
                            //            } else {
                            //                return $("#SelMonthDD").val();
                            //            }

                            //        },
                            //    },
                            //    success: function (data) {
                            //        var drilldata = [];
                            //        $.each(data, function (i, item) {
                            //            drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage)})
                            //        });                           
                            //        let chart_d = { name: e.point.name, data: drilldata }                           
                            //        chart.hideLoading();
                            //        chart.addSeriesAsDrilldown(e.point, chart_d);
                            //    },
                            //    error: function (ex) {
                            //        alert('Failed to retrieve : ' + ex.toString());
                            //    }
                            //});
                        }
                    },
                },
                title: {
                    text: staff_name
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                drilldown: {

                },
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });



}

// staff chart for One
function getChartDataStaffIDfor_secOne_forOne() {

    console.log("loadRankWithSignleDD..", $("#baseCode").val())

    var selectedBaseFor = 1;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Dashboard_one_StaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            //SelectedStaffId: function () { return selectedBaseFor; },
            SelectedStaffId: 1,
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            var from_date = '', to_date = ''
            from_date = $("#TxtFromDate").val();
            to_date = $("#TxtToDate").val();

            console.log("from_date.toString()", from_date.replaceAll("-", "/"))
            console.log("to_date.toString()", to_date.replaceAll("-", "/"))

            var datearray1 = from_date.toString().split("-");
            var datearray2 = to_date.toString().split("-");

            console.log("datearray1", datearray1)
            console.log("datearray2", datearray2)

            var date1 = new Date((datearray1[1] + '/' + datearray1[0] + '/' + datearray1[2]).toString());
            var date2 = new Date((datearray2[1] + '/' + datearray2[0] + '/' + datearray2[2]).toString());

            const diffTime = Math.abs(date1 - date2);
            const diffDays = Math.ceil((diffTime / (1000 * 60 * 60 * 24)) + 1);
            console.log(diffTime + " milliseconds");
            console.log(diffDays + " days");

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.DutyDate, 'y': parseFloat(item.Percentage), 'drilldown': item.DutyDate })
            });

            var per_total = 0;
            var data_lenght = data1.length;

            if (data_lenght != 0) {
                per_total = ((data_lenght / diffDays) * 100).toFixed(2);
            }

            console.log("chart data1..", data1)

            // Create the chart
            //Highcharts.setOptions({ lang: { noData: "Your custom message" } })
            Highcharts.chart('container_one', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            //    chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name;
                            //SelectedStaffId = 1;
                            SelectedRank = 0;
                            ReLoadStaffWiseGrid_typeTwo();



                        }
                    },
                },
                title: {
                    text: 'Change ' + per_total + ' %'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -90
                    }
                },
                yAxis: {
                    min: 0,
                    max: 1,
                    //plotLines: [{
                    //    value: 15,
                    //    zIndex: 5,
                    //    width: 2,
                    //    color: '#ff0000',
                    //    dashStyle: 'longdashdot'
                    //}],
                    title: {
                        text: ''
                    },
                    labels: {
                        enabled: false
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: ''
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                drilldown: {

                },
                credits: {
                    enabled: false
                }
            },
                function (chart) { // on complete
                    console.log("Gaya")
                    console.log(chart.series[0].data.length);

                    if (chart.series[0].data.length < 1) { // check series is empty
                        console.log("andar gaya")
                        chart.renderer.text('No Data Available', 140, 120)
                            .css({
                                color: '#4572A7',
                                fontSize: '16px'
                            })
                            .add();
                    }

                });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function getChartDataStaffIDfor_secTwo_forOne() {

    var selectedBaseFor = 2;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Dashboard_one_StaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            //SelectedStaffId: function () { return selectedBaseFor; },
            SelectedStaffId: 2,
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", $("#TxtFromDate").val())

            var data1 = []
            var from_date = '', to_date = ''
            from_date = $("#TxtFromDate").val();
            to_date = $("#TxtToDate").val();

            console.log("from_date.toString()", from_date.replaceAll("-", "/"))
            console.log("to_date.toString()", to_date.replaceAll("-", "/"))

            var datearray1 = from_date.toString().split("-");
            var datearray2 = to_date.toString().split("-");

            console.log("datearray1", datearray1)
            console.log("datearray2", datearray2)

            var date1 = new Date((datearray1[1] + '/' + datearray1[0] + '/' + datearray1[2]).toString());
            var date2 = new Date((datearray2[1] + '/' + datearray2[0] + '/' + datearray2[2]).toString());

            const diffTime = Math.abs(date1 - date2);
            const diffDays = Math.ceil((diffTime / (1000 * 60 * 60 * 24)) + 1);
            console.log(diffTime + " milliseconds");
            console.log(diffDays + " days");






            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.DutyDate, 'y': parseFloat(item.Percentage), 'drilldown': item.DutyDate })
            });
            var per_total = 0;
            var data_lenght = data1.length;

            if (data_lenght != 0) {
                per_total = ((data_lenght / diffDays) * 100).toFixed(2);
            }

            console.log("chart per_total..", per_total)
            console.log("chart data1..", data1)

            // Create the chart
            Highcharts.chart('container_two', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            //    chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name;
                            //SelectedStaffId = 2;
                            SelectedRank = 0;
                            ReLoadStaffWiseGrid_typeTwo();

                        }
                    },
                },
                title: {
                    text: 'No Change ' + per_total + ' %'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -90
                    }
                },
                yAxis: {
                    min: 0,
                    max: 1,
                    //labels: {
                    //    enabled: false
                    //},
                    title: {
                        text: ''
                    },
                    labels: {
                        enabled: false
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: ''
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                drilldown: {

                },
                credits: {
                    enabled: false
                }
            },
                function (chart) { // on complete

                    if (chart.series[0].data.length < 1) { // check series is empty
                        chart.renderer.text('No Data Available', 140, 120)
                            .css({
                                color: '#4572A7',
                                fontSize: '16px'
                            })
                            .add();
                    }
                });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function getChartDataStaffIDfor_secThree_forOne() {

    var selectedBaseFor = 3;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Dashboard_one_StaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            //SelectedStaffId: function () { return selectedBaseFor; },
            SelectedStaffId: 3,
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            var from_date = '', to_date = ''
            from_date = $("#TxtFromDate").val();
            to_date = $("#TxtToDate").val();

            console.log("from_date.toString()", from_date.replaceAll("-", "/"))
            console.log("to_date.toString()", to_date.replaceAll("-", "/"))

            var datearray1 = from_date.toString().split("-");
            var datearray2 = to_date.toString().split("-");

            console.log("datearray1", datearray1)
            console.log("datearray2", datearray2)

            var date1 = new Date((datearray1[1] + '/' + datearray1[0] + '/' + datearray1[2]).toString());
            var date2 = new Date((datearray2[1] + '/' + datearray2[0] + '/' + datearray2[2]).toString());

            const diffTime = Math.abs(date1 - date2);
            const diffDays = Math.ceil((diffTime / (1000 * 60 * 60 * 24)) + 1);
            console.log(diffTime + " milliseconds");
            console.log(diffDays + " days");

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.DutyDate, 'y': parseFloat(item.Percentage), 'drilldown': item.DutyDate })
            });

            var per_total = 0;
            var data_lenght = data1.length;

            if (data_lenght != 0) {
                per_total = ((data_lenght / diffDays) * 100).toFixed(2);
            }

            console.log("chart data1..", data1)

            // Create the chart
            Highcharts.chart('container_three', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            //    chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name;
                            //SelectedStaffId = 3;
                            SelectedRank = 0;
                            ReLoadStaffWiseGrid_typeTwo();


                        }
                    },
                },
                title: {
                    text: 'Vol Change ' + per_total + ' %'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -90
                    }
                },
                yAxis: {
                    min: 0,
                    max: 1,
                    //plotLines: [{
                    //    value: 15,
                    //    zIndex: 5,
                    //    width: 2,
                    //    color: '#ff0000',
                    //    dashStyle: 'longdashdot'
                    //}],
                    title: {
                        text: ''
                    },
                    labels: {
                        enabled: false
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: ''
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                drilldown: {

                },
                credits: {
                    enabled: false
                }
            },
                function (chart) { // on complete

                    if (chart.series[0].data.length < 1) { // check series is empty
                        chart.renderer.text('No Data Available', 140, 120)
                            .css({
                                color: '#4572A7',
                                fontSize: '16px'
                            })
                            .add();
                    }

                });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

// staff chart for One
function getChartDataStaffIDfor_secOne_forAll() {

    console.log("loadRankWithSignleDD..", $("#baseCode").val())

    var selectedBaseFor = 1;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Dashboard_all_StaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            SelectedStaffId: function () { return selectedBaseFor; },
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.ChangeType, 'y': parseFloat(item.Percentage), 'drilldown': item.ChangeType, 'empName': item.EmployeeName })
            });

            console.log("chart data1..", data1)

            // Create the chart
            Highcharts.chart('container_one', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            //    chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name;
                            SelectedStaffId = 1;
                            SelectedRank = 0;
                            ReLoadStaffWiseGrid();

                            //$.ajax({
                            //    type: 'POST',
                            //    url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
                            //    dataType: 'json',
                            //    data: {
                            //        fromDate: function () { return $("#TxtFromDate").val(); },
                            //        toDate: function () { return $("#TxtToDate").val(); },
                            //        baseCode: function () { return $("#baseCode").val(); },
                            //        crewRank: function () {
                            //            if (RankDDType == 1) {
                            //                return $("#TxtRankSingleSelect").val();
                            //            } else {
                            //                return $("#TxtRankMultiselect").val();
                            //            }
                            //        },
                            //        staffId: function () { return $("#sltStaffID").val(); },
                            //        emplName: function () { return $("#EmployeeName").val(); },
                            //        dashboardType: function () { return DashboardType; },
                            //        selectedBase: function () { return selectedBaseFor; },
                            //        drilldownValue: function () { return e.point.name; },
                            //        reportval: function () {
                            //            if (DashboardType == 1) {
                            //                return $("#SelRosterDD").val();
                            //            } else {
                            //                return $("#SelMonthDD").val();
                            //            }

                            //        },
                            //    },
                            //    success: function (data) {
                            //        var drilldata = [];
                            //        $.each(data, function (i, item) {
                            //            drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage)})
                            //        });                           
                            //        let chart_d = { name: e.point.name, data: drilldata }                           
                            //        chart.hideLoading();
                            //        chart.addSeriesAsDrilldown(e.point, chart_d);
                            //    },
                            //    error: function (ex) {
                            //        alert('Failed to retrieve : ' + ex.toString());
                            //    }
                            //});
                        }
                    },
                },
                title: {
                    text: 'Change'
                },
                xAxis: {
                    type: 'category'
                    , labels: {
                        rotation: -90
                    }
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.empName}</span>: <b>{point.y:.2f}%'
                    //pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                drilldown: {

                },
                credits: {
                    enabled: false
                }
            },
                function (chart) { // on complete

                    if (chart.series[0].data.length < 1) { // check series is empty
                        chart.renderer.text('No Data Available', 140, 120)
                            .css({
                                color: '#4572A7',
                                fontSize: '16px'
                            })
                            .add();
                    }

                });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function getChartDataStaffIDfor_secTwo_forAll() {

    var selectedBaseFor = 2;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Dashboard_all_StaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            SelectedStaffId: function () { return selectedBaseFor; },
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.ChangeType, 'y': parseFloat(item.Percentage), 'drilldown': item.ChangeType })
            });

            // Create the chart
            Highcharts.chart('container_two', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            // chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name;
                            SelectedStaffId = 2;
                            SelectedRank = 0;
                            ReLoadStaffWiseGrid();

                            //$.ajax({
                            //    type: 'POST',
                            //    url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
                            //    dataType: 'json',
                            //    data: {
                            //        fromDate: function () { return $("#TxtFromDate").val(); },
                            //        toDate: function () { return $("#TxtToDate").val(); },
                            //        baseCode: function () { return $("#baseCode").val(); },
                            //        crewRank: function () {
                            //            if (RankDDType == 1) {
                            //                return $("#TxtRankSingleSelect").val();
                            //            } else {
                            //                return $("#TxtRankMultiselect").val();
                            //            }

                            //        },
                            //        staffId: function () { return $("#sltStaffID").val(); },
                            //        emplName: function () { return $("#EmployeeName").val(); },
                            //        dashboardType: function () { return DashboardType; },
                            //        selectedBase: function () { return selectedBaseFor; },
                            //        drilldownValue: function () { return e.point.name; },
                            //        reportval: function () {
                            //            if (DashboardType == 1) {
                            //                return $("#SelRosterDD").val();
                            //            } else {
                            //                return $("#SelMonthDD").val();
                            //            }

                            //        },
                            //    },
                            //    success: function (data) {

                            //        console.log("drilldowns data", data)
                            //        var drilldata = [], series = [];
                            //        $.each(data, function (i, item) {
                            //            drilldata.push({ 'name': item.CrewRank, 'id': item.CrewRank, 'data': parseFloat(item.Percentage) })
                            //            //var val = [item.CrewRank.toString(), parseFloat(item.Percentage)];
                            //            //drilldata = [val];
                            //        });


                            //        console.log("drilldowns static drilldata", drilldata)
                            //        series.push({ 'name': e.point.name, 'id': e.point.name, data: drilldata });

                            //        //series = drilldata[e.point.name];
                            //        console.log("drilldowns series", series)
                            //        chart.hideLoading();
                            //        chart.addSeriesAsDrilldown(e.point, series);
                            //    },
                            //    error: function (ex) {
                            //        alert('Failed to retrieve Sector : ' + ex);
                            //    }
                            //});
                        }
                    },
                },
                title: {
                    text: 'No Change'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                credits: {
                    enabled: false
                }
            },
                function (chart) { // on complete

                    if (chart.series[0].data.length < 1) { // check series is empty
                        chart.renderer.text('No Data Available', 140, 120)
                            .css({
                                color: '#4572A7',
                                fontSize: '16px'
                            })
                            .add();
                    }

                });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function getChartDataStaffIDfor_secThree_forAll() {

    var selectedBaseFor = 3;

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Dashboard_all_StaffWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            SelectedStaffId: function () { return selectedBaseFor; },
            reportval: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }

            },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.ChangeType, 'y': parseFloat(item.Percentage), 'drilldown': item.ChangeType })
            });

            // Create the chart
            Highcharts.chart('container_two', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            // chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name;
                            SelectedStaffId = 3;
                            SelectedRank = 0;
                            ReLoadStaffWiseGrid();

                            //$.ajax({
                            //    type: 'POST',
                            //    url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
                            //    dataType: 'json',
                            //    data: {
                            //        fromDate: function () { return $("#TxtFromDate").val(); },
                            //        toDate: function () { return $("#TxtToDate").val(); },
                            //        baseCode: function () { return $("#baseCode").val(); },
                            //        crewRank: function () {
                            //            if (RankDDType == 1) {
                            //                return $("#TxtRankSingleSelect").val();
                            //            } else {
                            //                return $("#TxtRankMultiselect").val();
                            //            }

                            //        },
                            //        staffId: function () { return $("#sltStaffID").val(); },
                            //        emplName: function () { return $("#EmployeeName").val(); },
                            //        dashboardType: function () { return DashboardType; },
                            //        selectedBase: function () { return selectedBaseFor; },
                            //        drilldownValue: function () { return e.point.name; },
                            //        reportval: function () {
                            //            if (DashboardType == 1) {
                            //                return $("#SelRosterDD").val();
                            //            } else {
                            //                return $("#SelMonthDD").val();
                            //            }

                            //        },
                            //    },
                            //    success: function (data) {

                            //        console.log("drilldowns data", data)
                            //        var drilldata = [], series = [];
                            //        $.each(data, function (i, item) {
                            //            drilldata.push({ 'name': item.CrewRank, 'id': item.CrewRank, 'data': parseFloat(item.Percentage) })
                            //            //var val = [item.CrewRank.toString(), parseFloat(item.Percentage)];
                            //            //drilldata = [val];
                            //        });


                            //        console.log("drilldowns static drilldata", drilldata)
                            //        series.push({ 'name': e.point.name, 'id': e.point.name, data: drilldata });

                            //        //series = drilldata[e.point.name];
                            //        console.log("drilldowns series", series)
                            //        chart.hideLoading();
                            //        chart.addSeriesAsDrilldown(e.point, series);
                            //    },
                            //    error: function (ex) {
                            //        alert('Failed to retrieve Sector : ' + ex);
                            //    }
                            //});
                        }
                    },
                },
                title: {
                    text: 'Vol Change'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });



}


// chart data for Rank wise

function getChar_single_rank_secOne(rank_name) {

    SelectedRank = 1;
    DrilldownValue = "";

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardCrewRankWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }

            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return SelectedRank; },
        },
        success: function (data) {

            console.log("load chart data..", data)

            var data1 = []

            //data1 = data
            $.each(data, function (i, item) {
                data1.push({ 'name': item.ChangeType, 'y': parseFloat(item.Percentage), 'drilldown': item.ChangeType })
            });

            console.log("chart data1..", data1)

            // Create the chart
            Highcharts.chart('container_one', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            // chart.showLoading('Loading data ...');

                            DrilldownValue = e.point.name;
                            SelectedStaffId = 1;
                            SelectedRank = 1;
                            ReLoadRankWiseGrid();

                            //$.ajax({
                            //    type: 'POST',
                            //    url: applicationUrl + "Dashboard/Get_DashboardStaffWisePercentage",
                            //    dataType: 'json',
                            //    data: {
                            //        fromDate: function () { return $("#TxtFromDate").val(); },
                            //        toDate: function () { return $("#TxtToDate").val(); },
                            //        baseCode: function () { return $("#baseCode").val(); },
                            //        crewRank: function () {
                            //            if (RankDDType == 1) {
                            //                return $("#TxtRankSingleSelect").val();
                            //            } else {
                            //                return $("#TxtRankMultiselect").val();
                            //            }
                            //        },
                            //        staffId: function () { return $("#sltStaffID").val(); },
                            //        emplName: function () { return $("#EmployeeName").val(); },
                            //        dashboardType: function () { return DashboardType; },
                            //        selectedBase: function () { return selectedBaseFor; },
                            //        drilldownValue: function () { return e.point.name; },
                            //        reportval: function () {
                            //            if (DashboardType == 1) {
                            //                return $("#SelRosterDD").val();
                            //            } else {
                            //                return $("#SelMonthDD").val();
                            //            }

                            //        },
                            //    },
                            //    success: function (data) {
                            //        var drilldata = [];
                            //        $.each(data, function (i, item) {
                            //            drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                            //        });
                            //        let chart_d = { name: e.point.name, data: drilldata }
                            //        chart.hideLoading();
                            //        chart.addSeriesAsDrilldown(e.point, chart_d);
                            //    },
                            //    error: function (ex) {
                            //        alert('Failed to retrieve : ' + ex.toString());
                            //    }
                            //});
                        }
                    },
                },
                title: {
                    text: rank_name
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    plotLines: [{
                        value: 15,
                        zIndex: 5,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'longdashdot'
                    }],
                    title: {
                        text: ''
                    }

                },
                legend: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        },
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        }
                    },

                },
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.2f}%'
                },

                series: [
                    {
                        /*name: "Browsers",*/
                        colorByPoint: true,
                        data: data1
                    }
                ],
                credits: {
                    enabled: false
                },
                drilldown: {

                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function getChart_rank_secOne(rank_name) {

    var selectedBaseFor = 1;
    DrilldownValue = ""
    SelectedRank = 1

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardSelectedCrewRankWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            selectedFor: function () { return selectedBaseFor; },
            SelectedRank: function () { return SelectedRank; },
        },
        success: function (data) {
            console.log("load chart data.. one", data)
            var categories = [];
            var flags = [], l = data.length, i;
            for (i = 0; i < l; i++) {
                if (flags[data[i].BaseName]) continue;
                flags[data[i].BaseName] = true;
                categories.push(data[i].BaseName);
            }
            console.log("categories", categories)

            let volChange = [], noChange = [], Change = []

            $.each(data, function (j, j_item) {
                if (j_item.ChangeType == 'VOL Change') {
                    volChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'No Change') {
                    noChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'Change') {
                    Change.push(parseFloat(j_item.Percentage))
                }
            });
            chart_data = [
                {
                    name: 'VOL Change',
                    data: volChange
                },
                {
                    name: 'No Change',
                    data: noChange
                },
                {
                    name: 'Change',
                    data: Change
                },
            ]

            console.log("chart data1.. one", chart_data)

            // Create the chart
            Highcharts.chart('container_one', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            ReLoadRankWiseGrid();

                            //chart.showLoading('Loading data ...');

                            //$.ajax({
                            // type: 'POST',
                            // url: applicationUrl + "Dashboard/DashboardSelectedRosterWisePercentage",
                            // dataType: 'json',
                            // data: {
                            // fromDate: function () { return $("#TxtFromDate").val(); },
                            // toDate: function () { return $("#TxtToDate").val(); },
                            // baseCode: function () { return $("#baseCode").val(); },
                            // crewRank: function () {
                            // if (RankDDType == 1) {
                            // return $("#TxtRankSingleSelect").val();
                            // } else {
                            // return $("#TxtRankMultiselect").val();
                            // }
                            // },
                            // staffId: function () { return $("#sltStaffID").val(); },
                            // emplName: function () { return $("#EmployeeName").val(); },
                            // dashboardType: function () { return DashboardType; },
                            // selectedBase: function () { return selectedBaseFor; },
                            // drilldownValue: function () { return e.point.name; },
                            // reportval: function () { return $("#SelRosterDD").val(); },
                            // },
                            // success: function (data) {
                            // var drilldata = [];
                            // $.each(data, function (i, item) {
                            // drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                            // });
                            // let chart_d = { name: e.point.name, data: drilldata }
                            // chart.hideLoading();
                            // chart.addSeriesAsDrilldown(e.point, chart_d);
                            // },
                            // error: function (ex) {
                            // alert('Failed to retrieve Sector : ' + ex);
                            // }
                            //});
                        }
                    },
                },
                title: {
                    text: rank_name
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: true
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    },
                    series: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        },
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}"> <b> {series.name}  </span>: <b> {point.y} %',
                    shared: true
                },
                series: chart_data,
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function getChart_rank_secTwo(rank_name) {

    var selectedBaseFor = 2;
    DrilldownValue = ""
    SelectedRank = 2

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardSelectedCrewRankWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            selectedFor: function () { return selectedBaseFor; },
            SelectedRank: function () { return SelectedRank; },
        },
        success: function (data) {
            console.log("load chart data.. one", data)
            var categories = [];
            var flags = [], l = data.length, i;
            for (i = 0; i < l; i++) {
                if (flags[data[i].BaseName]) continue;
                flags[data[i].BaseName] = true;
                categories.push(data[i].BaseName);
            }
            console.log("categories", categories)

            let volChange = [], noChange = [], Change = []

            $.each(data, function (j, j_item) {
                if (j_item.ChangeType == 'VOL Change') {
                    volChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'No Change') {
                    noChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'Change') {
                    Change.push(parseFloat(j_item.Percentage))
                }
            });
            chart_data = [
                {
                    name: 'VOL Change',
                    data: volChange
                },
                {
                    name: 'No Change',
                    data: noChange
                },
                {
                    name: 'Change',
                    data: Change
                },
            ]

            console.log("chart data1.. one", chart_data)

            // Create the chart
            Highcharts.chart('container_two', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            ReLoadRankWiseGrid();
                            //chart.showLoading('Loading data ...');

                            //$.ajax({
                            // type: 'POST',
                            // url: applicationUrl + "Dashboard/DashboardSelectedRosterWisePercentage",
                            // dataType: 'json',
                            // data: {
                            // fromDate: function () { return $("#TxtFromDate").val(); },
                            // toDate: function () { return $("#TxtToDate").val(); },
                            // baseCode: function () { return $("#baseCode").val(); },
                            // crewRank: function () {
                            // if (RankDDType == 1) {
                            // return $("#TxtRankSingleSelect").val();
                            // } else {
                            // return $("#TxtRankMultiselect").val();
                            // }
                            // },
                            // staffId: function () { return $("#sltStaffID").val(); },
                            // emplName: function () { return $("#EmployeeName").val(); },
                            // dashboardType: function () { return DashboardType; },
                            // selectedBase: function () { return selectedBaseFor; },
                            // drilldownValue: function () { return e.point.name; },
                            // reportval: function () { return $("#SelRosterDD").val(); },
                            // },
                            // success: function (data) {
                            // var drilldata = [];
                            // $.each(data, function (i, item) {
                            // drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                            // });
                            // let chart_d = { name: e.point.name, data: drilldata }
                            // chart.hideLoading();
                            // chart.addSeriesAsDrilldown(e.point, chart_d);
                            // },
                            // error: function (ex) {
                            // alert('Failed to retrieve Sector : ' + ex);
                            // }
                            //});
                        }
                    },
                },
                title: {
                    text: rank_name
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: true
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    },
                    series: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        },
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}"> <b> {series.name}  </span>: <b> {point.y} %',
                    shared: true
                },
                series: chart_data,
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

function getChart_rank_secThree(rank_name) {

    var selectedBaseFor = 3;
    DrilldownValue = ""
    SelectedRank = 3

    $("#overlay").show();
    $.ajax({
        type: 'POST',
        url: applicationUrl + "Dashboard/Get_DashboardSelectedCrewRankWisePercentage",
        dataType: 'json',
        data: {
            fromDate: function () { return $("#TxtFromDate").val(); },
            toDate: function () { return $("#TxtToDate").val(); },
            baseCode: function () { return $("#baseCode").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            staffId: function () { return $("#sltStaffID").val(); },
            emplName: function () { return $("#EmployeeName").val(); },
            dashboardType: function () { return DashboardType; },
            reportval: function () { return $("#SelRosterDD").val(); },
            selectedFor: function () { return selectedBaseFor; },
            SelectedRank: function () { return SelectedRank; },
        },
        success: function (data) {
            console.log("load chart data.. one", data)
            var categories = [];
            var flags = [], l = data.length, i;
            for (i = 0; i < l; i++) {
                if (flags[data[i].BaseName]) continue;
                flags[data[i].BaseName] = true;
                categories.push(data[i].BaseName);
            }
            console.log("categories", categories)

            let volChange = [], noChange = [], Change = []

            $.each(data, function (j, j_item) {
                if (j_item.ChangeType == 'VOL Change') {
                    volChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'No Change') {
                    noChange.push(parseFloat(j_item.Percentage))
                }
                if (j_item.ChangeType == 'Change') {
                    Change.push(parseFloat(j_item.Percentage))
                }
            });
            chart_data = [
                {
                    name: 'VOL Change',
                    data: volChange
                },
                {
                    name: 'No Change',
                    data: noChange
                },
                {
                    name: 'Change',
                    data: Change
                },
            ]

            // Create the chart
            Highcharts.chart('container_three', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            var chart = this;
                            console.log("drill down event..", e.point.name)
                            ReLoadRankWiseGrid();
                            //chart.showLoading('Loading data ...');

                            //$.ajax({
                            // type: 'POST',
                            // url: applicationUrl + "Dashboard/DashboardSelectedRosterWisePercentage",
                            // dataType: 'json',
                            // data: {
                            // fromDate: function () { return $("#TxtFromDate").val(); },
                            // toDate: function () { return $("#TxtToDate").val(); },
                            // baseCode: function () { return $("#baseCode").val(); },
                            // crewRank: function () {
                            // if (RankDDType == 1) {
                            // return $("#TxtRankSingleSelect").val();
                            // } else {
                            // return $("#TxtRankMultiselect").val();
                            // }
                            // },
                            // staffId: function () { return $("#sltStaffID").val(); },
                            // emplName: function () { return $("#EmployeeName").val(); },
                            // dashboardType: function () { return DashboardType; },
                            // selectedBase: function () { return selectedBaseFor; },
                            // drilldownValue: function () { return e.point.name; },
                            // reportval: function () { return $("#SelRosterDD").val(); },
                            // },
                            // success: function (data) {
                            // var drilldata = [];
                            // $.each(data, function (i, item) {
                            // drilldata.push({ name: item.ChangeType, y: parseFloat(item.Percentage) })
                            // });
                            // let chart_d = { name: e.point.name, data: drilldata }
                            // chart.hideLoading();
                            // chart.addSeriesAsDrilldown(e.point, chart_d);
                            // },
                            // error: function (ex) {
                            // alert('Failed to retrieve Sector : ' + ex);
                            // }
                            //});
                        }
                    },
                },
                title: {
                    text: rank_name
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: true
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    },
                    series: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault(); // prevent toggling series visibility
                            },
                        },
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}"> <b> {series.name}  </span>: <b> {point.y} %',
                    shared: true
                },
                series: chart_data,
                credits: {
                    enabled: false
                }
            }, function (chart) { // on complete

                if (chart.series[0].data.length < 1) { // check series is empty
                    chart.renderer.text('No Data Available', 140, 120)
                        .css({
                            color: '#4572A7',
                            fontSize: '16px'
                        })
                        .add();
                }

            });
        },
        complete: function () {
            $("#overlay").hide();
        },
        error: function (ex) {
            alert('Failed to retrieve Sector : ' + ex);
        }
    });
}

// grid for base 
function LoadBaseWiseGrid() {

    console.log("baseCode", $("#baseCode").val());

    $("#baseWiseGrid").jqGrid({
        url: applicationUrl + "Dashboard/Get_Grid_DashboardBaseWiseDataForGrid",
        datatype: "json",
        mtype: 'POST',
        postData: {
            FromDate: function () { return $("#TxtFromDate").val(); },
            Todate: function () { return $("#TxtToDate").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            empname: function () { return $("#EmployeeName").val(); },
            staffId: function () { return $("#sltStaffID").val(); },
            Base: function () { return $("#baseCode").val(); },
            reportType: function () { return reportType },
            DrilldownValue: function () { return DrilldownValue },
            baseSelected: function () { return baseSelected },
            SelectedRank: function () { return SelectedRank },
        },
        colNames: ['Duty Date', 'Roster Release Date', 'Roster Period', 'Month Name', 'Staff ID', 'Employee Name', 'Rank', 'Employee Category', 'Base', 'Planned Duty', 'Actual Duty', 'Changes', 'Notif. Time Gap', 'Reporting start time', 'Changed On', 'Changed By', 'Notified On', 'NotifiedBy', 'Remarks'],
        colModel: [
            { hidden: false, name: 'DutyDate', index: 'DutyDate', align: "center" },
            { hidden: false, name: 'RosterReleaseDate', index: 'RosterReleaseDate', align: "center" },
            { hidden: false, name: 'RosterPeriod', index: 'RosterPeriod', align: "center" },
            { hidden: false, name: 'MonthName', index: 'MonthName', align: "center" },
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
            { hidden: false, name: 'NotifiedBy', index: 'NotifiedBy', align: "center" },
            { hidden: false, name: 'Remarks', index: 'Remarks', align: "center" },
        ],
        pager: jQuery('#pagerbaseWiseGrid'),
        rowNum: 10,
        rownumbers: true,
        rowList: [10, 20, 30, 40, 50, 100],
        height: 400,
        autowidth: true,
        width: '100%',
        loadonce: true,
        viewrecords: true,
        cmTemplate: { title: false },
        sortname: 'RosterReleaseDate',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        //autowidth: true,
        multiselect: false,
    }).navGrid('#pagerbaseWiseGrid', { edit: false, add: false, del: false, search: false, refresh: false })

    $("#baseWiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOperators: false });
    //jQuery("#CrewRosterReport").jqGrid('filterToolbar', { searchOperators: true });
    //jQuery("#baseWiseGrid").jqGrid('navGrid', '#pagerCrewRosterReportGrid', { del: false, add: false, edit: false, search: false });
    //jQuery("#baseWiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true });
}

function ReLoadBaseWiseGridtGrid() {
    $("#baseWiseGrid").jqGrid('setGridParam', { datatype: 'json', search: true, postData: { "filters": "" } }).trigger("reloadGrid", [{ current: true, page: 1 }]);
}

//grid for staff wise
function LoadStaffWiseGrid() {

    $("#staffwiseGrid").jqGrid({
        url: applicationUrl + "Dashboard/Get_Grid_sp_DashboardStaffWiseDataForGrid",
        datatype: "json",
        mtype: 'POST',
        postData: {
            FromDate: function () { return $("#TxtFromDate").val(); },
            Todate: function () { return $("#TxtToDate").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            empname: function () { return $("#EmployeeName").val(); },
            staffId: function () { return $("#sltStaffID").val(); },
            Base: function () { return $("#baseCode").val(); },
            reportType: function () { return reportType },
            DrilldownValue: function () { return DrilldownValue },
            drilldown_val_one: function () { return drilldown_val_one },
            drilldown_val_two: function () { return drilldown_val_two },
            drilldown_val_three: function () { return drilldown_val_three },
            //SelectedStaffId: function () { return SelectedStaffId },
            SelectedStaffId: 1,
            selectPersentage: function () { return $("#dateWiseChartFilter").val(); },
            //var selectedChangeType = 1;
        },
        colNames: ['Duty Date', 'Roster Release Date', 'Roster Period', 'Month Name', 'Staff ID', 'Employee Name', 'Rank', 'Employee Category', 'Base', 'Planned Duty', 'Actual Duty', 'Changes', 'Notif. Time Gap', 'Reporting start time', 'Changed On', 'Changed By', 'Notified On', 'NotifiedBy', 'Remarks'],
        colModel: [
            { hidden: false, name: 'DutyDate', index: 'DutyDate', align: "center" },
            { hidden: false, name: 'RosterReleaseDate', index: 'RosterReleaseDate', align: "center" },
            { hidden: false, name: 'RosterPeriod', index: 'RosterPeriod', align: "center" },
            { hidden: false, name: 'MonthName', index: 'MonthName', align: "center" },
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
            { hidden: false, name: 'NotifiedBy', index: 'NotifiedBy', align: "center" },
            { hidden: false, name: 'Remarks', index: 'Remarks', align: "center" },
        ],
        pager: jQuery('#pagerstaffwiseGrid'),
        rowNum: 100,
        rownumbers: true,
        rowList: [10, 20, 30, 40, 50, 100],
        height: 400,
        width: '100%',
        autowidth: true,
        loadonce: true,
        viewrecords: true,
        cmTemplate: { title: false },
        //gridview: false,
        sortname: 'RosterReleaseDate',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        multiselect: false,
    }).navGrid('#pagerstaffwiseGrid', { edit: false, add: false, del: false, search: false, refresh: false })

    $("#staffwiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOperators: false });
}

function ReLoadStaffWiseGrid() {
    $("#staffwiseGrid").jqGrid('setGridParam', { datatype: 'json', search: true, postData: { "filters": "" } }).trigger("reloadGrid", [{ current: true, page: 1 }]);
}

// type two
function LoadStaffWiseGrid_typeTwo() {

    $("#staffnDatewiseGrid").jqGrid({
        url: applicationUrl + "Dashboard/Get_Grid_sp_DashboardStaffnDateWiseDataForGrid",
        datatype: "json",
        mtype: 'POST',
        postData: {
            FromDate: function () { return $("#TxtFromDate").val(); },
            Todate: function () { return $("#TxtToDate").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
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
            DrilldownValue: function () { return DrilldownValue },
            SelectedStaffId: function () { return SelectedStaffId },
        },
        colNames: ['Duty Date', 'Roster Release Date', 'Roster Period', 'Month Name', 'Staff ID', 'Employee Name', 'Rank', 'Employee Category', 'Base', 'Planned Duty', 'Actual Duty', 'Changes', 'Notif. Time Gap', 'Reporting start time', 'Changed On', 'Changed By', 'Notified On', 'NotifiedBy', 'Remarks'],
        colModel: [
            { hidden: false, name: 'DutyDate', index: 'DutyDate', align: "center" },
            { hidden: false, name: 'RosterReleaseDate', index: 'RosterReleaseDate', align: "center" },
            { hidden: false, name: 'RosterPeriod', index: 'RosterPeriod', align: "center" },
            { hidden: false, name: 'MonthName', index: 'MonthName', align: "center" },
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
            { hidden: false, name: 'NotifiedBy', index: 'NotifiedBy', align: "center" },
            { hidden: false, name: 'Remarks', index: 'Remarks', align: "center" },
        ],
        pager: jQuery('#pagerstaffnDatewiseGrid'),
        rowNum: 100,
        rownumbers: true,
        rowList: [10, 20, 30, 40, 50, 100],
        height: 400,
        width: '100%',
        autowidth: true,
        loadonce: true,
        viewrecords: true,
        cmTemplate: { title: false },
        //gridview: false,
        sortname: 'RosterReleaseDate',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        multiselect: false,
    }).navGrid('#pagerstaffnDatewiseGrid', { edit: false, add: false, del: false, search: false, refresh: false })

    $("#staffnDatewiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOperators: false });
}

function ReLoadStaffWiseGrid_typeTwo() {
    $("#staffnDatewiseGrid").jqGrid('setGridParam', { datatype: 'json', search: true, postData: { "filters": "" } }).trigger("reloadGrid", [{ current: true, page: 1 }]);
}

//grid for Rank wise

function LoadRankWiseGrid() {

    $("#rankwiseGrid").jqGrid({
        url: applicationUrl + "Dashboard/Get_Grid_sp_DashboardCrewRankWiseDataForGrid",
        datatype: "json",
        mtype: 'POST',
        postData: {
            FromDate: function () { return $("#TxtFromDate").val(); },
            Todate: function () { return $("#TxtToDate").val(); },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
            empname: function () { return $("#EmployeeName").val(); },
            staffId: function () { return $("#sltStaffID").val(); },
            Base: function () { return $("#baseCode").val(); },
            reportType: function () { return reportType },
            DrilldownValue: function () { return DrilldownValue },
            ReportDropdownValue: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }
            },
            SelectedRank: function () { return SelectedRank },
            DashboardType: function () { return DashboardType },
        },
        colNames: ['Duty Date', 'Roster Release Date', 'Roster Period', 'Month Name', 'Staff ID', 'Employee Name', 'Rank', 'Employee Category', 'Base', 'Planned Duty', 'Actual Duty', 'Changes', 'Notif. Time Gap', 'Reporting start time', 'Changed On', 'Changed By', 'Notified On', 'NotifiedBy', 'Remarks'],
        colModel: [
            { hidden: false, name: 'DutyDate', index: 'DutyDate', align: "center" },
            { hidden: false, name: 'RosterReleaseDate', index: 'RosterReleaseDate', align: "center" },
            { hidden: false, name: 'RosterPeriod', index: 'RosterPeriod', align: "center" },
            { hidden: false, name: 'MonthName', index: 'MonthName', align: "center" },
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
            { hidden: false, name: 'NotifiedBy', index: 'NotifiedBy', align: "center" },
            { hidden: false, name: 'Remarks', index: 'Remarks', align: "center" },
        ],
        pager: jQuery('#pagerrankwiseGrid'),
        rowNum: 10,
        rownumbers: true,
        rowList: [10, 20, 30, 40, 50, 100],
        height: 400,
        width: '100%',
        autowidth: true,
        loadonce: true,
        viewrecords: true,
        cmTemplate: { title: false },
        //  gridview: false,
        sortname: 'RosterReleaseDate',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        //autowidth: true,
        multiselect: false,
    }).navGrid('#pagerrankwiseGrid', { edit: false, add: false, del: false, search: false, refresh: false })

    $("#rankwiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOperators: false });
    //jQuery("#baseWiseGrid").jqGrid('navGrid', '#pagerCrewRosterReportGrid', { del: false, add: false, edit: false, search: false });
    //jQuery("#baseWiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true });
}

function ReLoadRankWiseGrid() {
    console.log("on reload...");
    $("#rankwiseGrid").jqGrid('setGridParam', { datatype: 'json', search: true, postData: { "filters": "" } }).trigger("reloadGrid", [{ current: true, page: 1 }]);
}

//grid for Onload wise

function LoadOnloadWiseGrid() {

    $("#OnloadGrid").jqGrid({
        url: applicationUrl + "Dashboard/Get_Grid_sp_DashboardOnLoadDataForGrid",
        datatype: "json",
        mtype: 'POST',
        postData: {
            fromDate: function () { return fromDate },
            toDate: function () { return toDate },
            crewRank: function () {
                if (RankDDType == 1) {
                    return $("#TxtRankSingleSelect").val();
                } else {
                    return $("#TxtRankMultiselect").val();
                }
            },
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
            DrilldownValue: function () { return DrilldownValue },
            ReportDropdownValue: function () {
                if (DashboardType == 1) {
                    return $("#SelRosterDD").val();
                } else {
                    return $("#SelMonthDD").val();
                }
            },
            selectedChangeType: function () { return SelectedChangeType_glob },
            DashboardType: function () { return DashboardType },
            drilldown_val_one: function () { return drilldown_val_one },
            drilldown_val_two: function () { return drilldown_val_two },
            drilldown_val_three: function () { return drilldown_val_three },
            drilldown_val_four: function () { return drilldown_val_four },

            //console.log("drilldown_val_one", drilldown_val_one)
            //console.log("drilldown_val_one", drilldown_val_two)
            //console.log("drilldown_val_one", drilldown_val_three)

        },
        colNames: ['Duty Date', 'Roster Release Date', 'Roster Period', 'Month Name', 'Staff ID', 'Employee Name', 'Rank', 'Employee Category', 'Base', 'Planned Duty', 'Actual Duty', 'Changes', 'Notif. Time Gap', 'Reporting start time', 'Changed On', 'Changed By', 'Notified On', 'NotifiedBy', 'Remarks'],
        colModel: [
            { hidden: false, name: 'DutyDate', index: 'DutyDate', align: "center" },
            { hidden: false, name: 'RosterReleaseDate', index: 'RosterReleaseDate', align: "center" },
            { hidden: false, name: 'RosterPeriod', index: 'RosterPeriod', align: "center" },
            { hidden: false, name: 'MonthName', index: 'MonthName', align: "center" },
            { hidden: false, name: 'StaffID', index: 'StaffID', align: "center" },
            { hidden: false, name: 'EmployeeName', index: 'EmployeeName', align: "center" },
            { hidden: false, name: 'Rank', index: 'Rank', align: "center" },
            { hidden: true, name: 'EmployeeCategory', index: 'EmployeeCategory', align: "center" },
            { hidden: false, name: 'Base', index: 'Base', align: "center" },
            { hidden: false, name: 'PlannedDuty', index: 'PlannedDuty', align: "center", width: 150 },
            { hidden: false, name: 'ActualDuty', index: 'ActualDuty', align: "center", width: 150 },
            { hidden: false, name: 'Changes', index: 'Changes', align: "center" },
            { hidden: false, name: 'NotificationTimeGap', index: 'NotificationTimeGap', align: "center" },
            { hidden: false, name: 'Reportingstarttime', index: 'Reportingstarttime', align: "center" },
            { hidden: false, name: 'ChangedOn', index: 'ChangedOn', align: "center" },
            { hidden: false, name: 'ChangedBy', index: 'ChangedBy', align: "center" },
            { hidden: false, name: 'NotifiedOn', index: 'NotifiedOn', align: "center" },
            { hidden: false, name: 'NotifiedBy', index: 'NotifiedBy', align: "center" },
            { hidden: false, name: 'Remarks', index: 'Remarks', align: "center" },
        ],
        pager: jQuery('#pagerOnloadwiseGrid'),
        rowNum: 10,
        rownumbers: true,
        rowList: [10, 20, 30, 40, 50, 100],
        height: 300,
        autowidth: true,
        loadonce: true,
        width: '100%',
        shrinkToFit: false,
        viewrecords: true,
        cmTemplate: { title: false },
        // gridview: true,
        sortname: 'RosterReleaseDate',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        //autowidth: true,
        multiselect: false,
    }).navGrid('#pagerOnloadwiseGrid', { edit: false, add: false, del: false, search: false, refresh: false })

    $("#OnloadGrid").jqGrid('filterToolbar', { stringResult: true, searchOperators: false });
    //jQuery("#CrewRosterReport").jqGrid('filterToolbar', { searchOperators: true });
    //jQuery("#baseWiseGrid").jqGrid('navGrid', '#pagerCrewRosterReportGrid', { del: false, add: false, edit: false, search: false });
    //jQuery("#baseWiseGrid").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true });
}

function ReLoadOnloadWiseGrid() {
    console.log("on reload...");
    $("#OnloadGrid").jqGrid('setGridParam', { datatype: 'json', search: true, postData: { "filters": "" } }).trigger("reloadGrid", [{ current: true, page: 1 }]);
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