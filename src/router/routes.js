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
        name: "trang-chu",
        component: Dashboard
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "don-vi",
        name: "don-vi",
        component: Icons
      },
      {
        path: "hoa-chat-het-han",
        name: "hoa-chat-het-han",
        component: Expired
      },
      {
        path: "vat-tu-hoa-chat",
        name: "vat-tu-hoa-chat",
        component: TotalChemiscal
      },
      {
        path: "thong-ke-ton-kho",
        name: "thong-ke-ton-kho",
        component: Statistics
      },
      {
        path: "hoa-chat-nhap-kho",
        name: "hoa-chat-nhap-kho",
        component: ChemiscalImport
      },
      {
        path: "hoa-chat-xuat-kho",
        name: "hoa-chat-xuat-kho",
        component: ChemiscalExport

      },
      {
        path: "danh-sach-thanh-vien",
        name: "danh-sach-thanh-vien",
        component: MemberList
      },
      {
        path: "kho-may",
        name: "kho-may",
        component: Machine
      },
      {
        path: "vat-tu",
        name: "vat-tu",
        component: Supplies
      },
      {
        path: "nha-cung-cap",
        name: "nha-cung-cap",
        component: Supplier
      },
      {
        path: "thong-tin-ca-nhan",
        name: "thong-tin-ca-nhan",
        component: Profile
      },
    ]
  },
  {
    path: "/login",
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
