using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirCrew_Roster_EAL
{
   public class CrewRosterReport
    {
        public string DutyDate { get; set; }
        public string RosterReleaseDate { get; set; }
        public string MonthName { get; set; }
        public string StaffID { get; set; }
        public string RosterPeriod { get; set; }
        public string EmployeeName { get; set; }
        public string Rank { get; set; }
        public string EmployeeCategory { get; set; }
        public string Base { get; set; }
        public string PlannedDuty { get; set; }
        public string ActualDuty { get; set; }
        public string Changes { get; set; }
        public string NotificationTimeGap { get; set; }
        public string Reportingstarttime { get; set; }
        public string ChangedOn { get; set; }
        public string ChangedBy { get; set; }
        public string NotifiedOn { get; set; }
        public string NotifiedBy { get; set; }
        public string Remarks { get; set; }
    }
}
