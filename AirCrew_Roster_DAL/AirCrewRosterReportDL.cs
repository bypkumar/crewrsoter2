using AirCrew_Roster_EAL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirCrew_Roster_DAL
{
    public class AirCrewRosterReportDL
    {
        SqlHelper sqlHelper;
        //LogExceptionDL logEx = null;
        CrewRosterReport obj_CrewRosterReport;
        CrewType obj_CrewType;
        Employee obj_Employee;
        Base obj_Base;

        public AirCrewRosterReportDL()
        {
            string connStr = ConfigurationManager.AppSettings["dbConnection"].ToString();
            sqlHelper = new SqlHelper(connStr);
            // logEx = new LogExceptionDL();
        }

        #region Report sp


        // Crew Report 
        public List<CrewRosterReport> Get_crewRosterReport(SearchCriteria search)
        {
            List<CrewRosterReport> lstAirField = new List<CrewRosterReport>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_ReportData]");

                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 9000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@Rank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Rank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@ReportType", SqlDbType.VarChar, 100, ParameterDirection.Input, search.reportType);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_CrewRosterReport = new CrewRosterReport();
                        obj_CrewRosterReport.DutyDate = Convert.ToString(Dr["DutyDate"]);
                        obj_CrewRosterReport.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_CrewRosterReport.EmployeeName = Convert.ToString(Dr["EmployeeName"]);
                        obj_CrewRosterReport.Rank = Convert.ToString(Dr["Rank"]);
                        obj_CrewRosterReport.EmployeeCategory = Convert.ToString(Dr["EmployeeCategory"]);
                        obj_CrewRosterReport.Base = Convert.ToString(Dr["Base"]);
                        obj_CrewRosterReport.PlannedDuty = Convert.ToString(Dr["PlannedDuty"]);
                        obj_CrewRosterReport.ActualDuty = Convert.ToString(Dr["ActualDuty"]);
                        obj_CrewRosterReport.Changes = Convert.ToString(Dr["changetype"]);
                        obj_CrewRosterReport.NotificationTimeGap = Convert.ToString(Dr["NotificationTimeGap"]);
                        obj_CrewRosterReport.Reportingstarttime = Convert.ToString(Dr["Reportingstarttime"]);
                        obj_CrewRosterReport.ChangedOn = Convert.ToString(Dr["ChangedOn"]);
                        obj_CrewRosterReport.ChangedBy = Convert.ToString(Dr["ChangedBy"]);
                        obj_CrewRosterReport.NotifiedOn = Convert.ToString(Dr["NotifiedOn"]);
                        obj_CrewRosterReport.NotifiedBy = Convert.ToString(Dr["NotifiedBy"]);
                        obj_CrewRosterReport.Remarks = Convert.ToString(Dr["Remarks"]);

                        lstAirField.Add(obj_CrewRosterReport);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstAirField;
        }


        // DD
        public List<CrewType> Get_CrewRank(SearchCriteria search)
        {
            List<CrewType> lstAirField = new List<CrewType>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DropdwonForCrewRank]");

                sqlHelper.AddParameter(cmd, "@Base ", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_CrewType = new CrewType();
                        obj_CrewType.RepositoryID = Convert.ToString(Dr["RankID"]);
                        obj_CrewType.RepositoryName = Convert.ToString(Dr["RepositoryName"]);
                        obj_CrewType.RepositoryShortName = Convert.ToString(Dr["EmployeeStatus"]);
                        //obj_CrewType.RepositoryDescription = Convert.ToString(Dr["RepositoryDescription"]);
                        //obj_CrewType.RepositoryType = Convert.ToString(Dr["RepositoryType"]);
                        //obj_CrewType.ReferenceCode = Convert.ToString(Dr["ReferenceCode"]);

                        lstAirField.Add(obj_CrewType);
                    }
                }

            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstAirField;
        }

        public List<Employee> Get_employee(SearchCriteria search)
        {
            List<Employee> lstAirField = new List<Employee>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DropdwonForEmployeeName]");

                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Employee = new Employee();
                        obj_Employee.EmployeeID = Convert.ToString(Dr["EmployeeID"]);
                        obj_Employee.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_Employee.CrewCode = Convert.ToString(Dr["CrewCode"]);
                        obj_Employee.EmployeeCategory = Convert.ToString(Dr["EmployeeCategory"]);
                        obj_Employee.EmployeeName = Convert.ToString(Dr["EmployeeName"]);
                        obj_Employee.ShortName = Convert.ToString(Dr["ShortName"]);

                        lstAirField.Add(obj_Employee);
                    }
                }

            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstAirField;
        }

        public List<Employee> Get_Rank(SearchCriteria search)
        {
            List<Employee> lstAirField = new List<Employee>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DropdwonForCrewRank]");

                sqlHelper.AddParameter(cmd, "@Base ", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Employee = new Employee();
                        obj_Employee.EmployeeStatus = Convert.ToString(Dr["EmployeeStatus"]);
                        obj_Employee.RepositoryName = Convert.ToString(Dr["RepositoryName"]);
                        obj_Employee.RankID = Convert.ToString(Dr["RankID"]);
                        lstAirField.Add(obj_Employee);
                    }
                }

            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstAirField;
        }

        public List<Base> Get_Base(SearchCriteria search)
        {
            List<Base> lstAirField = new List<Base>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DropdwonForBase]");

                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Base = new Base();
                        obj_Base.PresentBaseID = Convert.ToInt32(Dr["PresentBaseID"]);
                        obj_Base.PlaceID = Convert.ToInt32(Dr["PlaceID"]);
                        obj_Base.PlaceName = Convert.ToString(Dr["PlaceName"]);
                        obj_Base.PlaceCode = Convert.ToString(Dr["PlaceCode"]);

                        lstAirField.Add(obj_Base);
                    }
                }

            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstAirField;
        }


        public List<Employee> Get_StaffList(SearchCriteria search)
        {
            List<Employee> lstAirField = new List<Employee>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DropdwonForStaffId]");

                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Employee = new Employee();
                        obj_Employee.EmployeeID = Convert.ToString(Dr["EmployeeID"]);
                        obj_Employee.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_Employee.CrewCode = Convert.ToString(Dr["CrewCode"]);
                        obj_Employee.EmployeeCategory = Convert.ToString(Dr["EmployeeCategory"]);
                        obj_Employee.EmployeeName = Convert.ToString(Dr["EmployeeName"]);
                        obj_Employee.ShortName = Convert.ToString(Dr["ShortName"]);

                        lstAirField.Add(obj_Employee);
                    }
                }

            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstAirField;
        }


        #endregion



    }
}
