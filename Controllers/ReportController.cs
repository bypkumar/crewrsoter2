using AirCrew_Roster.Constants;
using AirCrew_Roster_EAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirCrew_Roster.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
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

            search.FromDate = "";
            search.ToDate = "";
            search.Base = "";
            search.CrewRank = "";

            TempData["name"] = "Cockpit Roster Changes - Report";
            TempData["Username"] = Session["Username"];

            ViewBag.CrewType = new SelectList(BusinessHelper.BusinessHelper.Get_CrewRank(search), WebConstants.RepositoryName, WebConstants.RepositoryName);
            ViewBag.StaffID = new SelectList(BusinessHelper.BusinessHelper.Get_employee(search), WebConstants.StaffID, WebConstants.StaffID);
            ViewBag.EmployeeName = new SelectList(BusinessHelper.BusinessHelper.Get_employee(search), WebConstants.StaffID, WebConstants.EmployeeName);
            ViewBag.Rank = new SelectList(BusinessHelper.BusinessHelper.Get_Rank(search), WebConstants.RankID, WebConstants.RepositoryName);
            ViewBag.Base = new SelectList(BusinessHelper.BusinessHelper.Get_Base(search), WebConstants.PresentBaseID, WebConstants.PlaceCode);

            return View();
        }

        public JsonResult GetBaseListForDD_rpt(string fromDate, string toDate)
        {
            List<Base> LstBase = new List<Base>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;

            LstBase = BusinessHelper.BusinessHelper.Get_Base(search);
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

        public JsonResult Get_RankListForDD_rpt(string fromDate, string toDate, string baseCode)
        {
            List<Employee> LstRank = new List<Employee>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode; ;
            LstRank = BusinessHelper.BusinessHelper.Get_Rank(search);
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

        public JsonResult Get_StaffListForDD_rpt(string fromDate, string toDate, string baseCode, string crewRank)
        {
            List<Employee> LstBase = new List<Employee>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;

            LstBase = BusinessHelper.BusinessHelper.Get_StaffList(search);
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

        public JsonResult Get_EmployeeNameForDD_rpt(string fromDate, string toDate, string baseCode, string crewRank)
        {
            List<Employee> LstEmpList = new List<Employee>();

            SearchCriteria search = new SearchCriteria();
            search.FromDate = fromDate;
            search.ToDate = toDate;
            search.Base = baseCode == "null" ? "" : baseCode;
            search.CrewRank = crewRank == "null" ? "" : crewRank;

            LstEmpList = BusinessHelper.BusinessHelper.Get_employee(search);
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

        public JsonResult GetCrewRosterReport(int page, int rows, bool _search, string sortcolumn, string sidx, string sord, string FromDate, string Todate, string Crewtype, string staffId, string empname, string Base, int reportType)
        {
            int recordCount = 0;
            SearchCriteria search = new SearchCriteria();
            search.PageIndex = page;
            search.SearchText = "";
            search.PageSize = rows;
            search.SortColumn = sidx;
            search.SortOrder = sord.ToUpper();
            search.StaffID = staffId == "null" ? "" : staffId;
            search.Rank = Crewtype == "null" ? "" : Crewtype;
            search.Base = Base == "null" ? "" : Base;
            if (empname == "null")
            {
                search.EmployeeName = "";
            }
            else
            {
                search.EmployeeName = empname;
            }

            search.FromDate = FromDate;
            search.ToDate = Todate;
            search.reportType = reportType;

            try
            {
                List<CrewRosterReport> lst = BusinessHelper.BusinessHelper.Get_crewRosterReport(search);
                var lstagent_Togrid = lst.Select(
                       C => new
                       {
                           DutyDate = C.DutyDate,
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
                var res = Json(jsonData, JsonRequestBehavior.AllowGet);
                res.MaxJsonLength = int.MaxValue;

                return res;

                //string json = new JavaScriptSerializer().Serialize(jsonData);
                //return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //BusinessHelper.BusinessHelper.LogException(ex, "", "Account - ValidateLogin", 2, Convert.ToInt16(Session["Pid"]));
                return Json(new { message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}