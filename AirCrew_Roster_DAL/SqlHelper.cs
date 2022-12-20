using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using ConfigurationManager = System.Configuration.ConfigurationManager;

namespace AirCrew_Roster_DAL
{
   public class SqlHelper : IDisposable
    {

        private SqlConnection connection = null;
        private String connectionString = "dbConnection";

        /// <summary>
        /// Sets the connection string.
        /// </summary>
        /// <value>The connection string.</value>
        public String ConnectionString
        {
            set { connectionString = value; }
        }


        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="SqlHelper"></see> class.
        /// </summary>
        public SqlHelper()
        {
            // ConnectionString = ConfigurationManager.AppSettings["dbConnection"].ToString();
        }


        /// <summary>
        /// Initializes a new instance of the <see cref="SqlHelper"></see> class.
        /// </summary>
        /// <param name="p_connectionString">The p_connection string.
        public SqlHelper(string p_connectionString) { if (!string.IsNullOrEmpty(p_connectionString.Trim())) connectionString = p_connectionString; }
        #endregion

        #region Add Parameter TO Query
        /// <summary>
        /// Adds the parameter.
        /// </summary>
        /// <param name="command">The command.
        /// <param name="parameterName">Name of the parameter.
        /// <param name="dbType">Type of the db.
        /// <param name="size">The size.
        /// <param name="direction">The direction.
        /// <param name="precision">The precision.
        /// <param name="scale">The scale.
        /// <param name="sourceColumn">The source column.
        /// <param name="sourceVersion">The source version.
        /// <param name="value">The value.
        private void AddParameter(SqlCommand command, string parameterName, SqlDbType dbType, int size, ParameterDirection direction, byte precision, byte scale, string sourceColumn, DataRowVersion sourceVersion, object value)
        {
            SqlParameter p = new SqlParameter(parameterName, dbType, size, direction, precision, scale, sourceColumn,
                sourceVersion, true, value, null, null, null);
            command.Parameters.Add(p);
        }

        /// <summary>
        /// Adds the parameter.
        /// </summary>
        /// <param name="command">The command.
        /// <param name="parameterName">Name of the parameter.
        /// <param name="dbType">Type of the db.
        /// <param name="size">The size.
        /// <param name="direction">The direction.
        /// <param name="value">The value.
        public void AddParameter(SqlCommand command, string parameterName, SqlDbType dbType, int size, ParameterDirection direction, object value)
        {
            AddParameter(command, parameterName, dbType, size, direction, 0, 0, null, DataRowVersion.Current, value);
        }

        /// <summary>
        /// Adds the in parameter.
        /// </summary>
        /// <param name="command">The command.
        /// <param name="parameterName">Name of the parameter.
        /// <param name="dbType">Type of the db.
        /// <param name="value">The value.
        public void AddInParameter(SqlCommand command, string parameterName, SqlDbType dbType, object value)
        {
            AddParameter(command, parameterName, dbType, 0, ParameterDirection.Input, value);
        }

        /// <summary>
        /// Adds the out parameter.
        /// </summary>
        /// <param name="command">The command.
        /// <param name="parameterName">Name of the parameter.
        /// <param name="dbType">Type of the db.
        /// <param name="size">The size.
        public void AddOutParameter(SqlCommand command, string parameterName, SqlDbType dbType, int size)
        {
            AddParameter(command, parameterName, dbType, size, ParameterDirection.Output, null);
        }

        /// <summary>
        /// Gets the parameter value.
        /// </summary>
        /// <param name="command">The command.
        /// <param name="parameterName">Name of the parameter.
        /// <returns></returns>
        public object GetParameterValue(SqlCommand command, string parameterName)
        {
            return command.Parameters[parameterName].Value;
        }
        #endregion

        #region Generating SqlCommand

        /// <summary>
        /// Prepares the command.
        /// </summary>
        /// <param name="commandType">Type of the command.
        /// <param name="commandText">The command text.
        /// <returns></returns>
        private SqlCommand PrepareCommand(CommandType commandType, string commandText)
        {
            if (connection == null)
            {
                string _connectionString = ConfigurationManager.AppSettings["dbConnection"];
                connection = new SqlConnection(_connectionString);
            }
            if (connection.State == ConnectionState.Closed || connection.State == ConnectionState.Broken)
            {
                connection.Open();
            }
            SqlCommand command = new SqlCommand(commandText, connection);
            command.CommandType = commandType;
            return command;
        }

        /// <summary>
        /// Gets the store procedure command.
        /// </summary>
        /// <param name="spname">The spname.
        /// <returns></returns>
        public SqlCommand GetStoreProcedureCommand(string spname)
        {
            return PrepareCommand(CommandType.StoredProcedure, spname);
        }

        /// <summary>
        /// Gets the SQL query command.
        /// </summary>
        /// <param name="query">The query.
        /// <returns></returns>
        public SqlCommand GetSqlQueryCommand(string query)
        {
            return PrepareCommand(CommandType.Text, query);
        }
        #endregion

        #region Database Related Command

        /// <summary>
        /// Executes the non query.
        /// </summary>
        /// <param name="command">The command.
        /// <returns></returns>
        public int ExecuteNonQuery(SqlCommand command)
        {
            //command.CommandTimeout = 6000;
            command.CommandTimeout = int.MaxValue;
            return command.ExecuteNonQuery();
        }

        /// <summary>
        /// Executes the scalar.
        /// </summary>
        /// <param name="command">The command.
        /// <returns></returns>
        public object ExecuteScalar(SqlCommand command)
        {
            return command.ExecuteScalar();
        }

        /// <summary>
        /// Executes the reader.
        /// </summary>
        /// <param name="command">The command.
        /// <returns></returns>
        public SqlDataReader ExecuteReader(SqlCommand command)
        {
            try
            {
                command.CommandTimeout = 8000;
                return command.ExecuteReader(CommandBehavior.CloseConnection);
            }
            catch (Exception ex)
            {
                string msg = ex.Message.ToString();
                return null;
            }
        }

        /// <summary>
        /// Executes the reader.
        /// </summary>
        /// <param name="command">The command.
        /// <param name="commandBehavior">The command behavior.
        /// <returns></returns>
        public SqlDataReader ExecuteReader(SqlCommand command, CommandBehavior commandBehavior)
        {
            return command.ExecuteReader(commandBehavior);
        }

        /// <summary>
        /// Loads the data table.
        /// </summary>
        /// <param name="command">The command.
        /// <param name="tableName">Name of the table.
        /// <returns></returns>
        public DataTable LoadDataTable(SqlCommand command, string tableName)
        {
            using (SqlDataAdapter da = new SqlDataAdapter(command))
            {
                using (DataTable dt = new DataTable(tableName))
                {
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        /// <summary>
        /// Loads the data set.
        /// </summary>
        /// <param name="command">The command.
        /// <param name="tableNames">The table names.
        /// <returns></returns>
        public DataSet LoadDataSet(SqlCommand command, string[] tableNames)
        {
            using (SqlDataAdapter da = new SqlDataAdapter(command))
            {
                using (DataSet ds = new DataSet())
                {
                    da.Fill(ds);
                    for (int i = 0; i < ds.Tables.Count; i++)
                    {
                        ds.Tables[i].TableName = "tableNames[i]";
                    }
                    return ds;
                }
            }
        }
        /// Prepares the transaction.
        /// </summary>
        /// <param name="isolationLevel">The isolation level.
        /// <returns></returns>
        private SqlTransaction PrepareTransaction(IsolationLevel isolationLevel)
        {
            if (connection == null)
            {
                string _connectionString = ConfigurationManager.ConnectionStrings[connectionString].ConnectionString;
                connection = new SqlConnection(_connectionString);
            }
            if (connection.State == ConnectionState.Closed || connection.State == ConnectionState.Broken)
            {
                connection.Open();
            }
            return connection.BeginTransaction(isolationLevel);
        }

        /// <summary>
        /// Begins the transaction.
        /// </summary>
        /// <returns></returns>
        public SqlTransaction BeginTransaction()
        {
            return PrepareTransaction(IsolationLevel.ReadCommitted);
        }

        /// <summary>
        /// Begins the transaction.
        /// </summary>
        /// <param name="isolationLevel">The isolation level.
        /// <returns></returns>
        public SqlTransaction BeginTransaction(IsolationLevel isolationLevel)
        {
            return PrepareTransaction(isolationLevel);
        }

        /// <summary>
        /// Commits the specified transaction.
        /// </summary>
        /// <param name="transaction">The transaction.
        public void Commit(SqlTransaction transaction)
        {
            if (transaction != null)
                transaction.Commit();
        }

        /// <summary>
        /// Rolls the back.
        /// </summary>
        /// <param name="transaction">The transaction.
        public void RollBack(SqlTransaction transaction)
        {
            if (transaction != null)
                transaction.Rollback();
        }
        #endregion

        #region IDisposable Members

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
        #endregion

        #region Destructor
        /// <summary>
        /// Releases unmanaged resources and performs other cleanup operations before the
        /// <see cref="SqlHelper"></see> is reclaimed by garbage collection.
        /// </summary>
        ~SqlHelper()
        {
            Dispose();
        }
        #endregion

        void IDisposable.Dispose()
        {
            if (connection != null)
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection.Dispose();
                }
            }
        }

    }
}
