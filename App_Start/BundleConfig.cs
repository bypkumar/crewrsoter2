using System.Web;
using System.Web.Optimization;

namespace AirCrew_Roster
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.validate*"));

            //// Use the development version of Modernizr to develop with and learn from. Then, when you're
            //// ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.js"));

            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //          "~/Content/bootstrap.css",
            //          "~/Content/site.css"));


            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                    "~/Content/theme/vendor/bootstrap/js/bootstrap.bundle.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                   "~/Scripts/jquery-3.4.1.min.js",
                   //"http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js",
                   // "~/Content/theme/vendor/jquery/jquery.min.js",
                   "~/Content/theme/vendor/jquery-easing/jquery.easing.min.js",
                   "~/Content/theme/js/sb-admin-2.min.js",
                   //"~/Content/theme/js/jqGrid/jquery.jqGrid.js",
                   // "~/Content/theme/js/jqGrid/js/jquery.jqGrid.min.js",
                   // "~/Content/theme/js/jqGrid/js/i18n/grid.locale-en.js",
                   "~/Content/theme/js/jquery.datetimepicker.js"
                   // "~/Content/theme/js/Jquery/jquery-ui-1.10.4.js"
                   ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/theme/css/sb-admin-2.min.css",
                     "~/Content/theme/css/style.css",
                     "~/Content/theme/css/jquery.datetimepicker.css",
                     "~/Content/theme/js/multiSelect/bootstrap-multiselect.css",
                     "~/Content/theme/js/jqGrid/css/ui.jqgrid.css"
                    ));
        }
    }
}
