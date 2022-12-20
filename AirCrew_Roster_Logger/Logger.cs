using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirCrew_Roster_Logger
{
    public class Logger
    {

        #region :Private Property:

        /// <summary>
        /// Log Property
        /// </summary>
        private static ILog Log { get; set; }
        /* private static ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType); */

        #endregion :Private Property:

        #region :Constructor:

        /// <summary>
        /// Static Constructor Logger
        /// </summary>
        static Logger()
        {
            Log = LogManager.GetLogger(typeof(Logger));
        }

        #endregion :Constructor:

        #region :ERROR:

        /// <summary>
        /// Error
        /// </summary>
        /// <param name="msg"></param>
        public static void Error(object msg)
        {
            Log.Error(msg);
        }

        /// <summary>
        /// Error
        /// </summary>
        /// <param name="msg"></param>
        /// <param name="ex"></param>
        public static void Error(object msg, Exception ex)
        {
            Log.Error(msg, ex);
        }

        /// <summary>
        /// Error
        /// </summary>
        /// <param name="ex"></param>
        public static void Error(Exception ex)
        {
            Log.Error(ex.Message, ex);
        }

        #endregion :ERROR:

        #region :INFO:

        /// <summary>
        /// Info
        /// </summary>
        /// <param name="msg"></param>
        public static void Info(object msg)
        {
            Log.Info(msg);
        }

        #endregion :INFO:

        #region :DEBUG:

        /// <summary>
        /// Debug
        /// </summary>
        /// <param name="msg"></param>
        public static void Debug(object msg)
        {
            Log.Debug(msg);
        }

        /// <summary>
        /// Debug
        /// </summary>
        /// <param name="msg"></param>
        /// <param name="ex"></param>
        public static void Debug(object msg, Exception ex)
        {
            Log.Debug(msg, ex);
        }

        #endregion :DEBUG:

    }
}
