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
    public class AirCrewRosterDashboardDL
    {
        SqlHelper sqlHelper;
        //LogExceptionDL logEx = null;

        CrewRosterReport obj_CrewRosterReport;
        CrewType obj_CrewType;
        Employee obj_Employee;
        Base obj_Base;
        Dashboardchart obj_Dashboardchart;

        public AirCrewRosterDashboardDL()
        {
            string connStr = ConfigurationManager.AppSettings["dbConnection"].ToString();
            sqlHelper = new SqlHelper(connStr);
            // logEx = new LogExceptionDL();
        }

        #region Dropdown 

        public List<Employee> Get_StaffListForDD(SearchCriteria search)
        {
            List<Employee> lstAirField = new List<Employee>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardDropdwonForStaffId]");

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

        public List<Employee> Get_EmployeeNameForDD(SearchCriteria search)
        {
            List<Employee> lstAirField = new List<Employee>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardDropdwonForEmployeeName]");

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

        public List<Employee> Get_RankListForDD(SearchCriteria search)
        {
            List<Employee> lstAirField = new List<Employee>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardDropdwonForCrewRank]");

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

        public List<Base> Get_BaseListForDD(SearchCriteria search)
        {
            List<Base> lstAirField = new List<Base>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardDropdwonForBase]");

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

        public List<Employee> Get_RosterListForDD(SearchCriteria search)
        {
            List<Employee> lstAirField = new List<Employee>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardDropdwonForRoster]");

                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@StaffId", SqlDbType.VarChar, 100, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);

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
                        obj_Employee.RosterId = Convert.ToInt32(Dr["RosterId"]);
                        obj_Employee.RosterName = Convert.ToString(Dr["RosterName"]);

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

        public List<Employee> Get_MonthListForDD(SearchCriteria search)
        {
            List<Employee> lstAirField = new List<Employee>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardDropdwonForMonth]");

                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@StaffId", SqlDbType.VarChar, 100, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);

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
                        obj_Employee.MonthId = Convert.ToInt32(Dr["MonthId"]);
                        obj_Employee.MonthName = Convert.ToString(Dr["MonthName"]);

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


        #endregion Dropdown

        #region charts
        public List<Dashboardchart> Get_DashboardBaseWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardBaseWisePercentage]");

                sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 100, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@SelectedBase", SqlDbType.VarChar, 100, ParameterDirection.Input, search.baseSelected);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
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
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        public List<Dashboardchart> DashboardRankWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardRankWisePercentage]");

                sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@SelectedBase", SqlDbType.Int, 100, ParameterDirection.Input, search.baseSelected);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DrilldownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DrilldownValue);


                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();
                        obj_Dashboardchart.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_Dashboardchart.CrewRank = Convert.ToString(Dr["CrewRank"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);
                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        public List<Dashboardchart> DashboardonloadBaseandRankwisepercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardonloadBaseandRankwisepercentage]");

                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@StaffId", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();
                        obj_Dashboardchart.CrewRank = Convert.ToString(Dr["Rank"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);
                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        public List<Dashboardchart> DashboardBase_RankCrewwisepercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardBase_RankCrewwisepercentage]");

                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@SelectedCrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.SelectedRank);
                sqlHelper.AddParameter(cmd, "@SelectedChangeType", SqlDbType.VarChar, 100, ParameterDirection.Input, search.selectedChangeType);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();
                        obj_Dashboardchart.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_Dashboardchart.EmployeeName = Convert.ToString(Dr["EmployeeName"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);
                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        // multiwise staff ids result
        public List<Dashboardchart> DashboardStaffWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardSelectedStaffWisePercentage]");

                //sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                //sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@SelectedChangeType", SqlDbType.VarChar, 100, ParameterDirection.Input, search.selectedChangeType);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@Percentage", SqlDbType.VarChar, 100, ParameterDirection.Input, search.selectPersentage);



                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.EmployeeName = Convert.ToString(Dr["EmployeeName"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }
        // one staff wise
        public List<Dashboardchart> Dashboard_one_StaffWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_Dashboardcrewdatewisepercentage]");

                //sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                //sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@SelectedChangeType", SqlDbType.VarChar, 100, ParameterDirection.Input, search.SelectedStaffId);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
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
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.DutyDate = Convert.ToString(Dr["DutyDate"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }
        // one staff wise for onload only
        public List<Dashboardchart> DashboardOnload_one_StaffWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardOnloadCrewDatewisePercentage]");
                                

                //sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                //sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@SelectedChangeType", SqlDbType.VarChar, 100, ParameterDirection.Input, search.SelectedStaffId);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
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
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.DutyDate = Convert.ToString(Dr["DutyDate"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        // all staff wise
        public List<Dashboardchart> Dashboard_all_StaffWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                //SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_Dashboardallcrewwisepercentage]");
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_CabinNew1]");

                //sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                //sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@SelectedChangeType", SqlDbType.VarChar, 100, ParameterDirection.Input, search.selectedChangeType);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@Percentage", SqlDbType.VarChar, 100, ParameterDirection.Input, search.selectPersentage);



                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);
                        obj_Dashboardchart.EmployeeName = Convert.ToString(Dr["EmployeeName"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        // rank wise
        public List<Dashboardchart> DashboardCrewRankWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardCrewRankWisePercentage]");

                sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@SelectedCrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        // Selected rank wise
        public List<Dashboardchart> DashboardSelectedCrewRankWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardselectedRankPercentage]");

                //sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                //sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@SelectedCrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.SelectedRank);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.BaseName = Convert.ToString(Dr["Base"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }


        // Roster wise
        public List<Dashboardchart> DashboardRosterWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardRosterWisePercentage]");

                //sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@SelectedRoster", SqlDbType.VarChar, 100, ParameterDirection.Input, search.SelectedRank);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.BaseName = Convert.ToString(Dr["Base"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        public List<Dashboardchart> DashboardSelectedRosterWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardSelectedRosterWisePercentage]");

                sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@SelectedRoster", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DrilldownValue);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        // Onload wise
        public List<Dashboardchart> DashboardOnloadWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_cp_DashboardOnLoadPercentage]");

                // sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                //sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@SelectedChangeType", SqlDbType.VarChar, 100, ParameterDirection.Input, search.selectedChangeType);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();

                        // obj_Dashboardchart.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);
                        obj_Dashboardchart.BaseName = Convert.ToString(Dr["Base"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        public List<Dashboardchart> DashboardSelectedValueWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardSelectedValueWisePercentage]");

                // sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                // sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@DrilldownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DrilldownValue);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_Dashboardchart.BaseName = Convert.ToString(Dr["BaseName"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        // month wise
        public List<Dashboardchart> DashboardMonthWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardMonthWisePercentage]");

                sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@SelectedMonth", SqlDbType.VarChar, 100, ParameterDirection.Input, search.selectedChangeType);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();
                        obj_Dashboardchart.BaseName = Convert.ToString(Dr["Base"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }

        public List<Dashboardchart> DashboardSelectedMonthWisePercentage(SearchCriteria search)
        {
            List<Dashboardchart> lstChartData = new List<Dashboardchart>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardSelectedMonthWisePercentage]");

                sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 100, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@SelectedMonth", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DrilldownValue);

                SqlDataReader Dr = sqlHelper.ExecuteReader(cmd);
                if (Dr == null || Dr.HasRows == false)
                {
                    //logEx.LogExceptionToDB(null, "No records returned from SP-H_ValidateUser", "Login - ValidateUser", 2);
                }

                if (Dr.HasRows)
                {
                    while (Dr.Read())
                    {
                        obj_Dashboardchart = new Dashboardchart();

                        obj_Dashboardchart.Pid = Convert.ToInt32(Dr["Pid"]);
                        obj_Dashboardchart.ChangeType = Convert.ToString(Dr["ChangeType"]);
                        obj_Dashboardchart.Percentage = Convert.ToString(Dr["Percentage"]);

                        lstChartData.Add(obj_Dashboardchart);
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
            }
            return lstChartData;
        }



        #endregion

        #region Grid

        // base wise grid 
        public List<CrewRosterReport> Get_Grid_DashboardBaseWiseDataForGrid(SearchCriteria search)
        {
            List<CrewRosterReport> lstAirField = new List<CrewRosterReport>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardBaseWiseDataForGrid]");

                sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@DrilldownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DrilldownValue);
                sqlHelper.AddParameter(cmd, "@SelectedBase", SqlDbType.VarChar, 100, ParameterDirection.Input, search.baseSelected);
                sqlHelper.AddParameter(cmd, "@SelectedRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.SelectedRank);

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
                        obj_CrewRosterReport.RosterReleaseDate = Convert.ToString(Dr["RosterReleaseDate"]);
                        obj_CrewRosterReport.RosterPeriod = Convert.ToString(Dr["RosterPeriod"]);
                        obj_CrewRosterReport.MonthName = Convert.ToString(Dr["MonthName"]);
                        obj_CrewRosterReport.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_CrewRosterReport.EmployeeName = Convert.ToString(Dr["EmployeeName"]);
                        obj_CrewRosterReport.Rank = Convert.ToString(Dr["Rank"]);
                        obj_CrewRosterReport.EmployeeCategory = Convert.ToString(Dr["EmployeeCategory"]);
                        obj_CrewRosterReport.Base = Convert.ToString(Dr["Base"]);
                        obj_CrewRosterReport.PlannedDuty = Convert.ToString(Dr["PlannedDuty"]);
                        obj_CrewRosterReport.ActualDuty = Convert.ToString(Dr["ActualDuty"]);
                        obj_CrewRosterReport.Changes = Convert.ToString(Dr["Changes"]);
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

        // staff wise grid       
        public List<CrewRosterReport> Get_Grid_sp_DashboardStaffWiseDataForGrid(SearchCriteria search)
        {
            List<CrewRosterReport> lstAirField = new List<CrewRosterReport>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardStaffWiseDataForGrid]");

                sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@DrilldownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DrilldownValue);
                sqlHelper.AddParameter(cmd, "@SelectedStaffId", SqlDbType.Int, 100, ParameterDirection.Input, search.SelectedStaffId);
                //sqlHelper.AddParameter(cmd, "@Percentage", SqlDbType.VarChar, 100, ParameterDirection.Input, search.selectPersentage);

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
                        obj_CrewRosterReport.RosterReleaseDate = Convert.ToString(Dr["RosterReleaseDate"]);
                        obj_CrewRosterReport.RosterPeriod = Convert.ToString(Dr["RosterPeriod"]);
                        obj_CrewRosterReport.MonthName = Convert.ToString(Dr["MonthName"]);
                        obj_CrewRosterReport.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_CrewRosterReport.EmployeeName = Convert.ToString(Dr["EmployeeName"]);
                        obj_CrewRosterReport.Rank = Convert.ToString(Dr["Rank"]);
                        obj_CrewRosterReport.EmployeeCategory = Convert.ToString(Dr["EmployeeCategory"]);
                        obj_CrewRosterReport.Base = Convert.ToString(Dr["Base"]);
                        obj_CrewRosterReport.PlannedDuty = Convert.ToString(Dr["PlannedDuty"]);
                        obj_CrewRosterReport.ActualDuty = Convert.ToString(Dr["ActualDuty"]);
                        obj_CrewRosterReport.Changes = Convert.ToString(Dr["Changes"]);
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

        // one staff wise grid       
        public List<CrewRosterReport> Get_Grid_sp_DashboardStaffnDateWiseDataForGrid(SearchCriteria search)
        {
            List<CrewRosterReport> lstAirField = new List<CrewRosterReport>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardStaffnDateWiseDataForGrid]");

                sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@DrilldownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DrilldownValue);
                sqlHelper.AddParameter(cmd, "@SelectedStaffId", SqlDbType.VarChar, 100, ParameterDirection.Input, search.SelectedStaffId);

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
                        obj_CrewRosterReport.RosterReleaseDate = Convert.ToString(Dr["RosterReleaseDate"]);
                        obj_CrewRosterReport.RosterPeriod = Convert.ToString(Dr["RosterPeriod"]);
                        obj_CrewRosterReport.MonthName = Convert.ToString(Dr["MonthName"]);
                        obj_CrewRosterReport.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_CrewRosterReport.EmployeeName = Convert.ToString(Dr["EmployeeName"]);
                        obj_CrewRosterReport.Rank = Convert.ToString(Dr["Rank"]);
                        obj_CrewRosterReport.EmployeeCategory = Convert.ToString(Dr["EmployeeCategory"]);
                        obj_CrewRosterReport.Base = Convert.ToString(Dr["Base"]);
                        obj_CrewRosterReport.PlannedDuty = Convert.ToString(Dr["PlannedDuty"]);
                        obj_CrewRosterReport.ActualDuty = Convert.ToString(Dr["ActualDuty"]);
                        obj_CrewRosterReport.Changes = Convert.ToString(Dr["Changes"]);
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

        // Rank wise grid       
        public List<CrewRosterReport> Get_Grid_sp_DashboardCrewRankWiseDataForGrid(SearchCriteria search)
        {
            List<CrewRosterReport> lstAirField = new List<CrewRosterReport>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardCrewRankWiseDataForGrid]");

                sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 100, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 100, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 100, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@DrilldownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DrilldownValue);
                sqlHelper.AddParameter(cmd, "@SelectedCrewRank ", SqlDbType.Int, 100, ParameterDirection.Input, search.SelectedRank);

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
                        obj_CrewRosterReport.RosterReleaseDate = Convert.ToString(Dr["RosterReleaseDate"]);
                        obj_CrewRosterReport.RosterPeriod = Convert.ToString(Dr["RosterPeriod"]);
                        obj_CrewRosterReport.MonthName = Convert.ToString(Dr["MonthName"]);
                        obj_CrewRosterReport.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_CrewRosterReport.EmployeeName = Convert.ToString(Dr["EmployeeName"]);
                        obj_CrewRosterReport.Rank = Convert.ToString(Dr["Rank"]);
                        obj_CrewRosterReport.EmployeeCategory = Convert.ToString(Dr["EmployeeCategory"]);
                        obj_CrewRosterReport.Base = Convert.ToString(Dr["Base"]);
                        obj_CrewRosterReport.PlannedDuty = Convert.ToString(Dr["PlannedDuty"]);
                        obj_CrewRosterReport.ActualDuty = Convert.ToString(Dr["ActualDuty"]);
                        obj_CrewRosterReport.Changes = Convert.ToString(Dr["Changes"]);
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

        // Onload Grid

        public List<CrewRosterReport> Get_Grid_sp_DashboardOnloadWiseDataForGrid(SearchCriteria search)
        {
            List<CrewRosterReport> lstAirField = new List<CrewRosterReport>();
            try
            {
                SqlCommand cmd = sqlHelper.GetStoreProcedureCommand("[cock].[sp_CP_DashboardOnLoadDataForGrid1]");


                //  sqlHelper.AddParameter(cmd, "@DashboardType", SqlDbType.Int, 100, ParameterDirection.Input, search.DashboardType);
                // sqlHelper.AddParameter(cmd, "@ReportDropdownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ReportDropdownValue);
                sqlHelper.AddParameter(cmd, "@Base", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.Base);
                sqlHelper.AddParameter(cmd, "@FromDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.FromDate);
                sqlHelper.AddParameter(cmd, "@ToDate", SqlDbType.VarChar, 100, ParameterDirection.Input, search.ToDate);
                sqlHelper.AddParameter(cmd, "@CrewRank", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.CrewRank);
                sqlHelper.AddParameter(cmd, "@StaffID", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.StaffID);
                sqlHelper.AddParameter(cmd, "@EmployeeName", SqlDbType.VarChar, 20000, ParameterDirection.Input, search.EmployeeName);
                sqlHelper.AddParameter(cmd, "@DrilldownValue", SqlDbType.VarChar, 100, ParameterDirection.Input, search.DrilldownValue);
                //sqlHelper.AddParameter(cmd, "@SelectedBase", SqlDbType.VarChar, 100, ParameterDirection.Input, search.SelectedRank);
                sqlHelper.AddParameter(cmd, "@SelectedChangeType", SqlDbType.VarChar, 100, ParameterDirection.Input, search.selectedChangeType);
                sqlHelper.AddParameter(cmd, "@DrilldownValue1", SqlDbType.VarChar, 100, ParameterDirection.Input, search.drilldown_val_one);
                sqlHelper.AddParameter(cmd, "@DrilldownValue2", SqlDbType.VarChar, 100, ParameterDirection.Input, search.drilldown_val_two);
                sqlHelper.AddParameter(cmd, "@DrilldownValue3", SqlDbType.VarChar, 100, ParameterDirection.Input, search.drilldown_val_three);
                sqlHelper.AddParameter(cmd, "@DrilldownValue4", SqlDbType.VarChar, 100, ParameterDirection.Input, search.drilldown_val_four);



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
                        obj_CrewRosterReport.RosterReleaseDate = Convert.ToString(Dr["RosterReleaseDate"]);
                        obj_CrewRosterReport.RosterPeriod = Convert.ToString(Dr["RosterPeriod"]);
                        obj_CrewRosterReport.MonthName = Convert.ToString(Dr["MonthName"]);
                        obj_CrewRosterReport.StaffID = Convert.ToString(Dr["StaffID"]);
                        obj_CrewRosterReport.EmployeeName = Convert.ToString(Dr["EmployeeName"]);
                        obj_CrewRosterReport.Rank = Convert.ToString(Dr["Rank"]);
                        obj_CrewRosterReport.EmployeeCategory = Convert.ToString(Dr["EmployeeCategory"]);
                        obj_CrewRosterReport.Base = Convert.ToString(Dr["Base"]);
                        obj_CrewRosterReport.PlannedDuty = Convert.ToString(Dr["PlannedDuty"]);
                        obj_CrewRosterReport.ActualDuty = Convert.ToString(Dr["ActualDuty"]);
                        obj_CrewRosterReport.Changes = Convert.ToString(Dr["Changes"]);
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


        #endregion




    }
}
