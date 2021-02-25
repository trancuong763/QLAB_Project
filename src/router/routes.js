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
import ExamineRequest from "@/pages/Examine Request"
import Quota from "@/pages/Quota"
import Inventory from "@/pages/Inventory"
import SubMachine from "@/pages/Sub Machine"
import HIS from "@/pages/HIS"
var isAuthenticated = false;
if (localStorage.getItem('token')) isAuthenticated = true;

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/bang-dieu-khien",
    children: [
      {
        path: "bang-dieu-khien",
        name: "Bảng điều khiển",
        component: Dashboard
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "don-vi",
        name: "Đơn vị",
        component: Icons
      },
      {
        path: "hoa-chat-het-han",
        name: "Hóa chất hết hạn",
        component: Expired
      },
      {
        path: "vat-tu-hoa-chat",
        name: "Vật tư hóa chất",
        component: TotalChemiscal
      },
      {
        path: "thong-ke-ton-kho",
        name: "thống kê tồn kho",
        component: Statistics
      },
      {
        path: "hoa-chat-nhap-kho",
        name: "hóa chất nhập kho",
        component: ChemiscalImport
      },
      {
        path: "hoa-chat-xuat-kho",
        name: "hóa chất xuất kho",
        component: ChemiscalExport

      },
      {
        path: "danh-sach-thanh-vien",
        name: "danh sách thành viên",
        component: MemberList
      },
      {
        path: "kho-may",
        name: "kho máy",
        component: Machine
      },
      {
        path: "may",
        name: "máy",
        component: SubMachine
      },
      {
        path: "vat-tu",
        name: "vật tư",
        component: Supplies
      },
      {
        path: "nha-cung-cap",
        name: "nhà cung cấp",
        component: Supplier
      },
      {
        path: "thong-tin-ca-nhan",
        name: "thông tin cá nhân",
        component: Profile
      },
      {
        path: "yeu-cau-xet-nghiem",
        name: "yêu cầu xét nghiệm",
        component: ExamineRequest
      },
      {
        path: "dinh-muc",
        name: "định mức",
        component: Quota
      },
      {
        path: "ton-kho",
        name: "tồn kho",
        component: Inventory
      },
      {
        path: "phieu-linh",
        name: "phiếu lĩnh",
        component: HIS
      }
    ]
  },
  {
    path: "/login",
    name: "Đăng nhập",
    component: System,
    beforeEnter: (to, from, next) => {
      if (to.name == 'Đăng nhập' && isAuthenticated) { 
        
        next({ name: 'Bảng điều khiển' })
      }
      next()
    },
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
