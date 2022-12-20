using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirCrew_Roster_Logger
{
    class DebugLogger
    {
        public static string GetTempPath()
        {
            string path = Environment.GetEnvironmentVariable("TEMP");
            if (path != null && !path.EndsWith("\\"))
                path += "\\";
            return path;
        }

        public static void AddLog(string msg)
        {
            StreamWriter sw = File.AppendText(GetTempPath() + "OTTODebugLog.txt");
            try
            {
                string logLine = String.Format("{0:G}: {1}.", DateTime.Now, msg);
                sw.WriteLine(logLine);
            }
            finally
            {
                sw.Close();
            }
        }

    }
}
