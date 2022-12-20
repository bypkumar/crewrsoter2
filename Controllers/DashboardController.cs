using AirCrew_Roster.Constants;
using AirCrew_Roster_EAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace AirCrew_Roster.Controllers
{
    public class DashboardController : Controller
    {           
        public ActionResult Index()
        {

            //if (String.IsNullOrEmpty(Convert.ToString(Session["Username"])))
            //    return RedirectToAction("login", "User");

            SearchCriteria search = new SearchCriteria();
            search.SearchText = "";
            search.SortColumn = "";
            search.SortOrder = "";
            search.PageIndex = 0;
            search.PageSize = 0;
            //search.UserId = Convert.ToInt16(Session["Userid"]);

            search.StaffID = "";
            search.Rank = "";
            search.Base = "";
            search.EmployeeName = "";
            search.FromDate = "";
            search.ToDate = "";
            // search.reportType = 1;
            search.CrewRank = "";

            TempData["name"] = "Cockpit Roster Changes - Dashboard";
            TempData["Username"] = Session["Username"];

            ViewBag.CrewType = new SelectList(BusinessHelper.BusinessHelper.Get_RankListForDD(search), WebConstants.RankID, WebConstants.RepositoryName);
            ViewBag.StaffID = new SelectList(BusinessHelper.BusinessHelper.Get_StaffListForDD(search), WebConstants.StaffID, WebConstants.StaffID);
            ViewBag.EmployeeName = new SelectList(BusinessHelper.BusinessHelper.Get_EmployeeNameForDD(search), WebConstants.StaffID, WebConstants.EmployeeName);
            //ViewBag.Rank = new SelectList(BusinessHelper.BusinessHelper.Get_Rank(search), WebConstants.RankID, WebConstants.RepositoryName);
            ViewBag.Base = new SelectList(BusinessHelper.BusinessHelper.Get_BaseListForDD(search), WebConstants.PresentBaseID, WebConstants.PlaceCode);

            return View();
        }


        #region Fro Dropdowns


        // get base by filter
        public JsonResult GetBaseList(string fromDate, string toDate)
        {
            List<Base> LstBase = new List<Base>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;

            LstBase = BusinessHelper.BusinessHelper.Get_BaseListForDD(search);
            var json = from rs in LstBase
                       select new
                       {
                           // AircraftTypeId = rs.AircraftTypeId.ToString() +':'+  rs.AircraftTypeName.ToString()+';',
                           Id = rs.PresentBaseID.ToString(),
                           item = rs.PlaceCode.ToString(),
                           //AircraftTypeName = rs.AircraftTypeName.ToString(),
                           //MonthId = rs.MonthId.ToString(),
                       };
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        // get base by filter
        public JsonResult Get_RankListForDD(string fromDate, string toDate, string baseCode)
        {
            List<Employee> LstRank = new List<Employee>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            if (baseCode == "null")
            {
                search.Base = "";
            }
            else
            {
                search.Base = baseCode;
            }

            LstRank = BusinessHelper.BusinessHelper.Get_RankListForDD(search);
            var json = from rs in LstRank
                       select new
                       {
                           // AircraftTypeId = rs.AircraftTypeId.ToString() +':'+  rs.AircraftTypeName.ToString()+';',
                           Id = rs.RankID.ToString(),
                           item = rs.RepositoryName.ToString(),
                           //AircraftTypeName = rs.AircraftTypeName.ToString(),
                           //MonthId = rs.MonthId.ToString(),
                       };
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_StaffListForDD(string fromDate, string toDate, string baseCode, string crewRank)
        {
            List<Employee> LstBase = new List<Employee>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;

            LstBase = BusinessHelper.BusinessHelper.Get_StaffListForDD(search);
            var json = from rs in LstBase
                       select new
                       {
                           // AircraftTypeId = rs.AircraftTypeId.ToString() +':'+  rs.AircraftTypeName.ToString()+';',
                           Id = rs.StaffID.ToString(),
                           item = rs.StaffID.ToString(),
                           //AircraftTypeName = rs.AircraftTypeName.ToString(),
                           //MonthId = rs.MonthId.ToString(),
                       };
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_EmployeeNameForDD(string fromDate, string toDate, string baseCode, string crewRank)
        {
            List<Employee> LstEmpList = new List<Employee>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank; ;

            LstEmpList = BusinessHelper.BusinessHelper.Get_EmployeeNameForDD(search);
            var json = from rs in LstEmpList
                       select new
                       {
                           // AircraftTypeId = rs.AircraftTypeId.ToString() +':'+  rs.AircraftTypeName.ToString()+';',
                           Id = rs.StaffID.ToString(),
                           item = rs.EmployeeName.ToString(),
                           //AircraftTypeName = rs.AircraftTypeName.ToString(),
                           //MonthId = rs.MonthId.ToString(),
                       };
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_RosterListForDD(string fromDate, string toDate, string baseCode, string crewRank, string StaffID, string EmployeeName)
        {
            List<Employee> LstEmpList = new List<Employee>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = StaffID == "null" ? "" : StaffID; ;
            search.EmployeeName = EmployeeName;

            LstEmpList = BusinessHelper.BusinessHelper.Get_RosterListForDD(search);
            var json = from rs in LstEmpList
                       select new
                       {
                           // AircraftTypeId = rs.AircraftTypeId.ToString() +':'+  rs.AircraftTypeName.ToString()+';',
                           Id = rs.RosterId.ToString(),
                           item = rs.RosterName.ToString(),
                           //AircraftTypeName = rs.AircraftTypeName.ToString(),
                           //MonthId = rs.MonthId.ToString(),
                       };
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_MonthListForDD(string fromDate, string toDate, string baseCode, string crewRank, string StaffID, string EmployeeName)
        {
            List<Employee> LstEmpList = new List<Employee>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = StaffID == "null" ? "" : StaffID;
            search.EmployeeName = EmployeeName == "null" ? "" : EmployeeName;

            LstEmpList = BusinessHelper.BusinessHelper.Get_MonthListForDD(search);
            var json = from rs in LstEmpList
                       select new
                       {
                           // AircraftTypeId = rs.AircraftTypeId.ToString() +':'+  rs.AircraftTypeName.ToString()+';',
                           Id = rs.MonthId.ToString(),
                           item = rs.MonthName.ToString(),
                           //AircraftTypeName = rs.AircraftTypeName.ToString(),
                           //MonthId = rs.MonthId.ToString(),
                       };
            return Json(json, JsonRequestBehavior.AllowGet);
        }


        #endregion


        #region charts
        public JsonResult Get_DashboardBaseWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", int selectedBase = 0)
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DashboardType = dashboardType;
            search.baseSelected = selectedBase;

            LstBase = BusinessHelper.BusinessHelper.Get_DashboardBaseWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           Pid = rs.Pid.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DashboardRankWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", int selectedBase = 0, string drilldownValue = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DashboardType = dashboardType;
            search.baseSelected = selectedBase;
            search.DrilldownValue = drilldownValue;

            LstBase = BusinessHelper.BusinessHelper.DashboardRankWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           Pid = rs.Pid.ToString(),
                           CrewRank = rs.CrewRank.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        // multiple wise staff
        public JsonResult Get_DashboardStaffWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", int SelectedStaffId = 0, string selectPersentage = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DashboardType = dashboardType;
            search.SelectedStaffId = SelectedStaffId;
            search.selectedChangeType = "1";
            search.selectPersentage = selectPersentage;

            LstBase = BusinessHelper.BusinessHelper.DashboardStaffWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           StaffID = rs.StaffID.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                           EmployeeName = rs.EmployeeName.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        // one wise staff
        public JsonResult Dashboard_one_StaffWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", int SelectedStaffId = 0)
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DashboardType = dashboardType;
            search.SelectedStaffId = SelectedStaffId;

            LstBase = BusinessHelper.BusinessHelper.Dashboard_one_StaffWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           DutyDate = rs.DutyDate.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }
        // one wise staff For onload drilldown only
        public JsonResult DashboardOnload_one_StaffWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", int SelectedStaffId = 0)
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DashboardType = dashboardType;
            search.SelectedStaffId = SelectedStaffId;

            LstBase = BusinessHelper.BusinessHelper.DashboardOnload_one_StaffWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           DutyDate = rs.DutyDate.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        // all wise staff
        public JsonResult Dashboard_all_StaffWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", int SelectedStaffId = 0, string selectPersentage = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DashboardType = dashboardType;
            search.SelectedStaffId = SelectedStaffId;
            search.selectedChangeType = "1";
            search.selectPersentage = selectPersentage;

            LstBase = BusinessHelper.BusinessHelper.Dashboard_all_StaffWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           StaffID = rs.StaffID.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                           EmployeeName = rs.EmployeeName.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }


        // Roster wise 
        public JsonResult Get_DashboardRosterWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", string selectedFor = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DashboardType = dashboardType;
            search.SelectedRank = selectedFor;

            LstBase = BusinessHelper.BusinessHelper.DashboardRosterWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           BaseName = rs.BaseName.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DashboardSelectedRosterWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", string drilldownValue = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DashboardType = dashboardType;
            search.DrilldownValue = drilldownValue;
            //search.SelectedStaffId = SelectedStaffId;

            LstBase = BusinessHelper.BusinessHelper.DashboardSelectedRosterWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           Pid = rs.Pid.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        // Onload wise 
        public JsonResult Get_DashboardOnloadrWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", string selectedChangeType = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = "0";
            search.DashboardType = 0;
            search.selectedChangeType = selectedChangeType;

            LstBase = BusinessHelper.BusinessHelper.DashboardOnloadWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           Pid = rs.Pid.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                           BaseName = rs.BaseName.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        // Month Wise 
        public JsonResult Get_DashboardMonthWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", string selectedMonth = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DashboardType = dashboardType;
            search.selectedChangeType = selectedMonth;

            LstBase = BusinessHelper.BusinessHelper.DashboardMonthWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           BaseName = rs.BaseName.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DashboardSelectedMonthWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", int dashboardType = 0, string reportval = "", string drilldownValue = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DashboardType = dashboardType;
            search.DrilldownValue = drilldownValue;

            LstBase = BusinessHelper.BusinessHelper.DashboardSelectedMonthWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           Pid = rs.Pid.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        // Rank Wise
        public JsonResult Get_DashboardCrewRankWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", string DrilldownValue = "", string reportval = "", int DashboardType = 0, string SelectedRank = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId; ;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DrilldownValue = DrilldownValue;
            search.SelectedRank = SelectedRank;
            search.DashboardType = DashboardType;

            LstBase = BusinessHelper.BusinessHelper.DashboardCrewRankWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           Pid = rs.Pid.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_DashboardonloadBaseandRankwisepercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", string DrilldownValue = "", string reportval = "", int DashboardType = 0, string SelectedRank = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId; ;
            search.EmployeeName = emplName == "null" ? "" : emplName;


            LstBase = BusinessHelper.BusinessHelper.DashboardonloadBaseandRankwisepercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           CrewRank = rs.CrewRank.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_DashboardBase_RankCrewwisepercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", string DrilldownValue = "", string reportval = "", int DashboardType = 0, string SelectedRank = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId; ;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.SelectedRank = SelectedRank;
            search.selectedChangeType = "1";


            LstBase = BusinessHelper.BusinessHelper.DashboardBase_RankCrewwisepercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           StaffID = rs.StaffID.ToString(),
                           EmployeeName = rs.EmployeeName.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }

        // Selected Rank Wise
        public JsonResult Get_DashboardSelectedCrewRankWisePercentage(string fromDate = "", string toDate = "", string baseCode = "", string crewRank = "", string staffId = "", string emplName = "", string DrilldownValue = "", string reportval = "", int DashboardType = 0, string SelectedRank = "")
        {
            List<Dashboardchart> LstBase = new List<Dashboardchart>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId; ;
            search.EmployeeName = emplName == "null" ? "" : emplName;
            search.ReportDropdownValue = reportval;
            search.DrilldownValue = DrilldownValue;
            search.SelectedRank = SelectedRank;
            search.DashboardType = DashboardType;

            LstBase = BusinessHelper.BusinessHelper.DashboardSelectedCrewRankWisePercentage(search);
            var json = from rs in LstBase
                       select new
                       {
                           BaseName = rs.BaseName.ToString(),
                           ChangeType = rs.ChangeType.ToString(),
                           Percentage = rs.Percentage.ToString(),
                       };

            return Json(json, JsonRequestBehavior.AllowGet);
        }


        #endregion

        #region grid

        public JsonResult Get_Grid_DashboardBaseWiseDataForGrid(int page, int rows, bool _search, string sortcolumn, string sidx, string sord, string FromDate, string Todate, string crewRank, string staffId, string empname, string Base, int reportType, string DrilldownValue, int baseSelected, string SelectedRank)
        {
            int recordCount = 0;
            SearchCriteria search = new SearchCriteria();
            search.PageIndex = page;
            search.SearchText = "";
            search.PageSize = rows;
            search.SortColumn = sidx;
            search.SortOrder = sord.ToUpper();

            search.DashboardType = 0;
            search.ReportDropdownValue = "0";
            search.Base = Base == "null" ? "" : Base;
            search.FromDate = FromDate;
            search.ToDate = Todate;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = empname == "null" ? "" : empname;
            search.DrilldownValue = DrilldownValue;
            search.baseSelected = baseSelected;
            search.SelectedRank = SelectedRank;


            search.reportType = reportType;

            try
            {
                List<CrewRosterReport> lst = BusinessHelper.BusinessHelper.Get_Grid_DashboardBaseWiseDataForGrid(search);
                var lstagent_Togrid = lst.Select(
                       C => new
                       {
                           DutyDate = C.DutyDate,
                           RosterReleaseDate = C.RosterReleaseDate,
                           RosterPeriod = C.RosterPeriod,
                           MonthName = C.MonthName,
                           StaffID = C.StaffID,
                           EmployeeName = C.EmployeeName,
                           Rank = C.Rank,
                           EmployeeCategory = C.EmployeeCategory,
                           Base = C.Base,
                           PlannedDuty = C.PlannedDuty,
                           ActualDuty = C.ActualDuty,
                           Changes = C.Changes,
                           NotificationTimeGap = C.NotificationTimeGap,
                           Reportingstarttime = C.Reportingstarttime,
                           // Reportingstarttime = C.Reportingstarttime,
                           ChangedOn = C.ChangedOn,
                           ChangedBy = C.ChangedBy,
                           NotifiedOn = C.NotifiedOn,
                           NotifiedBy = C.NotifiedBy,
                           Remarks = C.Remarks,
                       }
                    );

                int totalRecords = (lst.Count() > 0) ? recordCount : 0;
                var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);

                var jsonData = new
                {
                    total = totalPages,
                    page,
                    records = totalRecords,
                    rows = lstagent_Togrid
                };
                string json = new JavaScriptSerializer().Serialize(jsonData);

                var res = Json(jsonData, JsonRequestBehavior.AllowGet);
                res.MaxJsonLength = int.MaxValue;

                return res;
            }
            catch (Exception ex)
            {
                //BusinessHelper.BusinessHelper.LogException(ex, "", "Account - ValidateLogin", 2, Convert.ToInt16(Session["Pid"]));
                return Json(new { message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Get_Grid_sp_DashboardStaffWiseDataForGrid(int page, int rows, bool _search, string sortcolumn, string sidx, string sord, string FromDate, string Todate, string crewRank, string staffId, string empname, string Base, int reportType, string DrilldownValue, int SelectedStaffId, string selectPersentage = "")
        //, string drilldown_val_one = "", string drilldown_val_two = "", string drilldown_val_three = "")
        {
            int recordCount = 0;
            SearchCriteria search = new SearchCriteria();
            search.PageIndex = page;
            search.SearchText = "";
            search.PageSize = rows;
            search.SortColumn = sidx;
            search.SortOrder = sord.ToUpper();

            search.DashboardType = 0;
            search.ReportDropdownValue = "0";
            search.FromDate = FromDate;
            search.ToDate = Todate;
            search.Base = Base == "null" ? "" : Base;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = empname == "null" ? "" : empname;
            search.DrilldownValue = DrilldownValue;
            //search.drilldown_val_one = drilldown_val_one;
            //search.drilldown_val_two = drilldown_val_two;
            //search.drilldown_val_three = drilldown_val_three;
            search.SelectedStaffId = SelectedStaffId;
            search.selectPersentage = selectPersentage;

            try
            {
                List<CrewRosterReport> lst = BusinessHelper.BusinessHelper.Get_Grid_sp_DashboardStaffWiseDataForGrid(search);
                var lstagent_Togrid = lst.Select(
                       C => new
                       {
                           DutyDate = C.DutyDate,
                           RosterReleaseDate = C.RosterReleaseDate,
                           RosterPeriod = C.RosterPeriod,
                           MonthName = C.MonthName,
                           StaffID = C.StaffID,
                           EmployeeName = C.EmployeeName,
                           Rank = C.Rank,
                           EmployeeCategory = C.EmployeeCategory,
                           Base = C.Base,
                           PlannedDuty = C.PlannedDuty,
                           ActualDuty = C.ActualDuty,
                           Changes = C.Changes,
                           NotificationTimeGap = C.NotificationTimeGap,
                           Reportingstarttime = C.Reportingstarttime,
                           // Reportingstarttime = C.Reportingstarttime,
                           ChangedOn = C.ChangedOn,
                           ChangedBy = C.ChangedBy,
                           NotifiedOn = C.NotifiedOn,
                           NotifiedBy = C.NotifiedBy,
                           Remarks = C.Remarks,
                       }
                    );

                int totalRecords = (lst.Count() > 0) ? recordCount : 0;
                var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);

                var jsonData = new
                {
                    total = totalPages,
                    page,
                    records = totalRecords,
                    rows = lstagent_Togrid
                };
                string json = new JavaScriptSerializer().Serialize(jsonData);

                var res = Json(jsonData, JsonRequestBehavior.AllowGet);
                res.MaxJsonLength = int.MaxValue;

                return res;
            }
            catch (Exception ex)
            {
                //BusinessHelper.BusinessHelper.LogException(ex, "", "Account - ValidateLogin", 2, Convert.ToInt16(Session["Pid"]));
                return Json(new { message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult Get_Grid_sp_DashboardStaffnDateWiseDataForGrid(int page, int rows, bool _search, string sortcolumn, string sidx, string sord, string FromDate, string Todate, string crewRank, string staffId, string empname, string Base, int reportType, string DrilldownValue, int SelectedStaffId)
        {
            int recordCount = 0;
            SearchCriteria search = new SearchCriteria();
            search.PageIndex = page;
            search.SearchText = "";
            search.PageSize = rows;
            search.SortColumn = sidx;
            search.SortOrder = sord.ToUpper();

            search.DashboardType = 0;
            search.ReportDropdownValue = "0";
            search.FromDate = FromDate;
            search.ToDate = Todate;
            search.Base = Base == "null" ? "" : Base;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = empname == "null" ? "" : empname;
            search.DrilldownValue = DrilldownValue;
            search.SelectedStaffId = SelectedStaffId;

            try
            {
                List<CrewRosterReport> lst = BusinessHelper.BusinessHelper.Get_Grid_sp_DashboardStaffnDateWiseDataForGrid(search);
                var lstagent_Togrid = lst.Select(
                       C => new
                       {
                           DutyDate = C.DutyDate,
                           RosterReleaseDate = C.RosterReleaseDate,
                           RosterPeriod = C.RosterPeriod,
                           MonthName = C.MonthName,
                           StaffID = C.StaffID,
                           EmployeeName = C.EmployeeName,
                           Rank = C.Rank,
                           EmployeeCategory = C.EmployeeCategory,
                           Base = C.Base,
                           PlannedDuty = C.PlannedDuty,
                           ActualDuty = C.ActualDuty,
                           Changes = C.Changes,
                           NotificationTimeGap = C.NotificationTimeGap,
                           Reportingstarttime = C.Reportingstarttime,
                           // Reportingstarttime = C.Reportingstarttime,
                           ChangedOn = C.ChangedOn,
                           ChangedBy = C.ChangedBy,
                           NotifiedOn = C.NotifiedOn,
                           NotifiedBy = C.NotifiedBy,
                           Remarks = C.Remarks,
                       }
                    );

                int totalRecords = (lst.Count() > 0) ? recordCount : 0;
                var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);

                var jsonData = new
                {
                    total = totalPages,
                    page,
                    records = totalRecords,
                    rows = lstagent_Togrid
                };
                //string json = new JavaScriptSerializer().Serialize(jsonData);

                var res = Json(jsonData, JsonRequestBehavior.AllowGet);
                res.MaxJsonLength = int.MaxValue;

                return res;
            }
            catch (Exception ex)
            {
                //BusinessHelper.BusinessHelper.LogException(ex, "", "Account - ValidateLogin", 2, Convert.ToInt16(Session["Pid"]));
                return Json(new { message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Get_Grid_sp_DashboardCrewRankWiseDataForGrid(int page, int rows, bool _search, string sortcolumn, string sidx, string sord, string FromDate, string Todate, string crewRank, string staffId, string empname, string Base, string DrilldownValue, string SelectedRank)
        {
            int recordCount = 0;
            SearchCriteria search = new SearchCriteria();
            search.PageIndex = page;
            search.SearchText = "";
            search.PageSize = rows;
            search.SortColumn = sidx;
            search.SortOrder = sord.ToUpper();

            search.DashboardType = 0;
            search.ReportDropdownValue = "0";
            search.FromDate = FromDate;
            search.ToDate = Todate;
            search.Base = Base == "null" ? "" : Base;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = empname == "null" ? "" : empname;
            search.DrilldownValue = DrilldownValue;
            search.SelectedRank = SelectedRank;

            try
            {
                List<CrewRosterReport> lst = BusinessHelper.BusinessHelper.Get_Grid_sp_DashboardCrewRankWiseDataForGrid(search);
                var lstagent_Togrid = lst.Select(
                       C => new
                       {
                           DutyDate = C.DutyDate,
                           RosterReleaseDate = C.RosterReleaseDate,
                           RosterPeriod = C.RosterPeriod,
                           MonthName = C.MonthName,
                           StaffID = C.StaffID,
                           EmployeeName = C.EmployeeName,
                           Rank = C.Rank,
                           EmployeeCategory = C.EmployeeCategory,
                           Base = C.Base,
                           PlannedDuty = C.PlannedDuty,
                           ActualDuty = C.ActualDuty,
                           Changes = C.Changes,
                           NotificationTimeGap = C.NotificationTimeGap,
                           Reportingstarttime = C.Reportingstarttime,
                           // Reportingstarttime = C.Reportingstarttime,
                           ChangedOn = C.ChangedOn,
                           ChangedBy = C.ChangedBy,
                           NotifiedOn = C.NotifiedOn,
                           NotifiedBy = C.NotifiedBy,
                           Remarks = C.Remarks,
                       }
                    );

                int totalRecords = (lst.Count() > 0) ? recordCount : 0;
                var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);

                var jsonData = new
                {
                    total = totalPages,
                    page,
                    records = totalRecords,
                    rows = lstagent_Togrid
                };
                var json = new JavaScriptSerializer().Serialize(jsonData);
                //json.MaxJsonLength = Int32.MaxValue;

                var res = Json(jsonData, JsonRequestBehavior.AllowGet);
                res.MaxJsonLength = int.MaxValue;

                return res;
            }
            catch (Exception ex)
            {
                //BusinessHelper.BusinessHelper.LogException(ex, "", "Account - ValidateLogin", 2, Convert.ToInt16(Session["Pid"]));
                return Json(new { message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Get_Grid_sp_DashboardOnLoadDataForGrid(int page, int rows, bool _search, string sortcolumn, string sidx, string sord, string FromDate, string Todate, string crewRank, string staffId, string empname, string Base, string DrilldownValue, string selectedChangeType = "", string drilldown_val_one = "", string drilldown_val_two = "", string drilldown_val_three = "", string drilldown_val_four = "")
        {
            int recordCount = 0;
            SearchCriteria search = new SearchCriteria();
            search.PageIndex = page;
            search.SearchText = "";
            search.PageSize = rows;
            search.SortColumn = sidx;
            search.SortOrder = sord.ToUpper();

            search.DashboardType = 0;
            search.ReportDropdownValue = "0";
            search.FromDate = FromDate;
            search.ToDate = Todate;
            //search.FromDate = "02-03-2020";
            //search.ToDate = "03-03-2020";
            search.Base = Base == "null" ? "" : Base;
            search.CrewRank = crewRank == "null" ? "" : crewRank;
            search.StaffID = staffId == "null" ? "" : staffId;
            search.EmployeeName = empname == "null" ? "" : empname;
            search.DrilldownValue = DrilldownValue;
            search.selectedChangeType = selectedChangeType;
            search.drilldown_val_one = drilldown_val_one;
            search.drilldown_val_two = drilldown_val_two;
            search.drilldown_val_three = drilldown_val_three;
            search.drilldown_val_four = drilldown_val_four;


            try
            {
                List<CrewRosterReport> lst = BusinessHelper.BusinessHelper.Get_Grid_sp_DashboardOnloadWiseDataForGrid(search);
                var lstagent_Togrid = lst.Select(
                       C => new
                       {
                           DutyDate = C.DutyDate,
                           RosterReleaseDate = C.RosterReleaseDate,
                           RosterPeriod = C.RosterPeriod,
                           MonthName = C.MonthName,
                           StaffID = C.StaffID,
                           EmployeeName = C.EmployeeName,
                           Rank = C.Rank,
                           EmployeeCategory = C.EmployeeCategory,
                           Base = C.Base,
                           PlannedDuty = C.PlannedDuty,
                           ActualDuty = C.ActualDuty,
                           Changes = C.Changes,
                           NotificationTimeGap = C.NotificationTimeGap,
                           Reportingstarttime = C.Reportingstarttime,
                           // Reportingstarttime = C.Reportingstarttime,
                           ChangedOn = C.ChangedOn,
                           ChangedBy = C.ChangedBy,
                           NotifiedOn = C.NotifiedOn,
                           NotifiedBy = C.NotifiedBy,
                           Remarks = C.Remarks,
                       }
                    );

                int totalRecords = (lst.Count() > 0) ? recordCount : 0;
                var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);

                ////This code is added to solve maxjson error
                //var jsonData1 = Json(lstagent_Togrid, JsonRequestBehavior.AllowGet);

                //return jsonData1;
                ////This code end

                var jsonData = new
                {
                    total = totalPages,
                    page,
                    records = totalRecords,
                    rows = lstagent_Togrid
                };

                var res = Json(jsonData, JsonRequestBehavior.AllowGet);
                res.MaxJsonLength = int.MaxValue;

                return res;


            }
            catch (Exception ex)
            {
                //BusinessHelper.BusinessHelper.LogException(ex, "", "Account - ValidateLogin", 2, Convert.ToInt16(Session["Pid"]));
                return Json(new { message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

    }
}