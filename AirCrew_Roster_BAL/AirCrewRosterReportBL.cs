using AirCrew_Roster_DAL;
using AirCrew_Roster_EAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirCrew_Roster_BAL
{
    public class AirCrewRosterReportBL
    {
        AirCrewRosterReportDL DL;

        public AirCrewRosterReportBL()
        {
            DL = new AirCrewRosterReportDL();
        }


        #region Report

        public List<CrewRosterReport> Get_crewRosterReport(SearchCriteria search)
        {
            return DL.Get_crewRosterReport(search);
        }   

        public List<CrewType> Get_CrewRank(SearchCriteria search)
        {
            return DL.Get_CrewRank(search);
        }

        public List<Employee> Get_employee(SearchCriteria search)
        {
            return DL.Get_employee(search);
        }

        public List<Employee> Get_Rank(SearchCriteria search)
        {
            return DL.Get_Rank(search);
        }

        public List<Base> Get_Base(SearchCriteria search)
        {
            return DL.Get_Base(search);
        }

        public List<Employee> Get_StaffList(SearchCriteria search)
        {
            return DL.Get_StaffList(search);
        }

        #endregion

    }
}
