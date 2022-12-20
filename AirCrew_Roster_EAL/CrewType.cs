using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirCrew_Roster_EAL
{
   public class CrewType
    {
        public string RepositoryID { get; set; }
        public string RepositoryName { get; set; }
        public string RepositoryShortName { get; set; }
        public string RepositoryDescription { get; set; }
        public string RepositoryType { get; set; }
        public string RepositoryCategory { get; set; }
        public string RepositoryLevel { get; set; }
        public string ReferenceCode { get; set; }
        public string IsValid { get; set; }
        public string OtherCode { get; set; }
        public string RepositorySortOrder { get; set; }
        public string LastUpdatedTS { get; set; }

    }
}
