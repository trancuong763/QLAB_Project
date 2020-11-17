import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Expired from "@/pages/Expired"
import TotalChemiscal from "@/pages/TotalChemiscal"
import Statistics from "@/pages/Statistics"
import ChemiscalImport from "@/pages/ChemiscalImport"
import ChemiscalExport from "@/pages/ChemiscalExport"
import MemberList from "@/pages/MemberList.vue";
import Machine from "@/pages/Machine.vue";
import Supplies from "@/pages/Supplies.vue";
import Supplier from "@/pages/Supplier.vue";
import Profile from "@/pages/Profile.vue";
import System from "@/pages/Login-Register/System"
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "don-vi",
        name: "icons",
        component: Icons
      },
      {
        path: "expired",
        name: "expired",
        component: Expired
      },
      {
        path: "total-chemiscal",
        name: "total-chemiscal",
        component: TotalChemiscal
      },
      {
        path: "statistics",
        name: "statistics",
        component: Statistics
      },
      {
        path: "chemiscal-import",
        name: "chemiscal-import",
        component: ChemiscalImport
      },
      {
        path: "chemiscal-export",
        name: "chemiscal-export",
        component: ChemiscalExport

      },
      {
        path: "danh-sach-thanh-vien",
        name: "MemberList",
        component: MemberList
      },
      {
        path: "kho-may",
        name: "Machine",
        component: Machine
      },
      {
        path: "vat-tu",
        name: "Supplies",
        component: Supplies
      },
      {
        path: "nha-cung-cap",
        name: "Supplier",
        component: Supplier
      },
      {
        path: "thong-tin-ca-nhan",
        name: "Profile",
        component: Profile
      },
    ]
  },
  {
    path: "/dang-nhap-he-thong",
    name: "system",
    component: System
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
