using AirCrew_Roster_BAL;
using AirCrew_Roster_EAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirCrew_Roster.BusinessHelper
{
    public class BusinessHelper
    {
        public static List<CrewRosterReport> Get_crewRosterReport(SearchCriteria search)
        {
            AirCrewRosterReportBL BL = new AirCrewRosterReportBL();
            return BL.Get_crewRosterReport(search);
        }
        public static List<CrewType> Get_CrewRank(SearchCriteria search)
        {
            AirCrewRosterReportBL BL = new AirCrewRosterReportBL();
            return BL.Get_CrewRank(search);
        }

        public static List<Employee> Get_employee(SearchCriteria search)
        {
            AirCrewRosterReportBL BL = new AirCrewRosterReportBL();
            return BL.Get_employee(search);
        }

        public static List<Employee> Get_Rank(SearchCriteria search)
        {
            AirCrewRosterReportBL BL = new AirCrewRosterReportBL();
            return BL.Get_Rank(search);
        }

        public static List<Base> Get_Base(SearchCriteria search)
        {
            AirCrewRosterReportBL BL = new AirCrewRosterReportBL();
            return BL.Get_Base(search);
        }

        public static List<Employee> Get_StaffList(SearchCriteria search)
        {
            AirCrewRosterReportBL BL = new AirCrewRosterReportBL();
            return BL.Get_StaffList(search);
        }

        public static List<Employee> Get_StaffListForDD(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_StaffListForDD(search);
        }

        public static List<Employee> Get_EmployeeNameForDD(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_EmployeeNameForDD(search);
        }

        public static List<Employee> Get_RankListForDD(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_RankListForDD(search);
        }

        public static List<Base> Get_BaseListForDD(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_BaseListForDD(search);
        }

        public static List<Employee> Get_RosterListForDD(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_RosterListForDD(search);
        }

        public static List<Employee> Get_MonthListForDD(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_MonthListForDD(search);
        }



        #region Chart
        public static List<Dashboardchart> Get_DashboardBaseWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_DashboardBaseWisePercentage(search);
        }



        public static List<Dashboardchart> DashboardRankWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardRankWisePercentage(search);
        }

        public static List<Dashboardchart> DashboardStaffWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardStaffWisePercentage(search);
        }

        // one staff
        public static List<Dashboardchart> Dashboard_one_StaffWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Dashboard_one_StaffWisePercentage(search);

        }
        // one staff for onload drilldown only
        public static List<Dashboardchart> DashboardOnload_one_StaffWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardOnload_one_StaffWisePercentage(search);

        }
        // all wise staff
        public static List<Dashboardchart> Dashboard_all_StaffWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Dashboard_all_StaffWisePercentage(search);


        }

        // Roster wise

        public static List<Dashboardchart> DashboardRosterWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardRosterWisePercentage(search);
        }

        public static List<Dashboardchart> DashboardSelectedRosterWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardSelectedRosterWisePercentage(search);
        }
        public static List<Dashboardchart> DashboardOnloadWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardOnloadWisePercentage(search);
        }
        public static List<Dashboardchart> DashboardSelectedValueWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardSelectedValueWisePercentage(search);
        }

        // Month wise

        public static List<Dashboardchart> DashboardMonthWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardMonthWisePercentage(search);
        }

        public static List<Dashboardchart> DashboardSelectedMonthWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardSelectedMonthWisePercentage(search);
        }

        public static List<Dashboardchart> DashboardCrewRankWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardCrewRankWisePercentage(search);
        }

        public static List<Dashboardchart> DashboardonloadBaseandRankwisepercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardonloadBaseandRankwisepercentage(search);
        }

        public static List<Dashboardchart> DashboardBase_RankCrewwisepercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardBase_RankCrewwisepercentage(search);
        }

        public static List<Dashboardchart> DashboardSelectedCrewRankWisePercentage(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.DashboardSelectedCrewRankWisePercentage(search);
        }

        #endregion

        #region grid
        public static List<CrewRosterReport> Get_Grid_DashboardBaseWiseDataForGrid(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_Grid_DashboardBaseWiseDataForGrid(search);
        }

        public static List<CrewRosterReport> Get_Grid_sp_DashboardStaffWiseDataForGrid(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_Grid_sp_DashboardStaffWiseDataForGrid(search);
        }
        public static List<CrewRosterReport> Get_Grid_sp_DashboardStaffnDateWiseDataForGrid(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_Grid_sp_DashboardStaffnDateWiseDataForGrid(search);
        }

        public static List<CrewRosterReport> Get_Grid_sp_DashboardCrewRankWiseDataForGrid(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_Grid_sp_DashboardCrewRankWiseDataForGrid(search);
        }

        public static List<CrewRosterReport> Get_Grid_sp_DashboardOnloadWiseDataForGrid(SearchCriteria search)
        {
            AirCrewRosterDashboardBL BL = new AirCrewRosterDashboardBL();
            return BL.Get_Grid_sp_DashboardOnloadWiseDataForGrid(search);
        }

        #endregion



    }
}