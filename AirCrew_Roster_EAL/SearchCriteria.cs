using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirCrew_Roster_EAL
{
   public class SearchCriteria
    {

        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string SearchColumName { get; set; }
        public string SearchText { get; set; }
        public string searchTextMonth { get; set; }
        public string searchTextYear { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }

        // Crew Roster Report
        public string StaffID { get; set; }
        public string EmployeeName { get; set; }
        public string Rank { get; set; }
        public string Base { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int isDutyDate { get; set; }
        public int reportType { get; set; }
        public string CrewRank { get; set; }

        // charts
        public int DashboardType { get; set; }
        public string ReportDropdownValue { get; set; }
        public int baseSelected { get; set; }
        public string DrilldownValue { get; set; }
        public int SelectedStaffId { get; set; }
        public string SelectedRank { get; set; }
        public string selectedChangeType { get; set; }
        public string selectPersentage { get; set; }
        public string drilldown_val_one { get; set; }
        public string drilldown_val_two { get; set; }
        public string drilldown_val_three { get; set; }
        public string drilldown_val_four { get; set; }

    }
}
