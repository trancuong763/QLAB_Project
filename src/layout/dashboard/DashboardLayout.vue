<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/"
          ><i class="fa fa-home"></i>Bảng điều khiển</sidebar-link
        >
        <sidebar-link to="/danh-sach-thanh-vien"><i class="fa fa-briefcase"></i>Danh sách thành viên</sidebar-link>
        <sidebar-link to="/vat-tu"><i class="fa fa-briefcase"></i>Vật tư</sidebar-link>
        <sidebar-link to="/kho-may"><i class="fa fa-home"></i>Kho / máy</sidebar-link>
        <sidebar-link to="/don-vi"><i class="fas fa-gem"></i>Đơn vị</sidebar-link>
        <sidebar-link to="/nha-cung-cap"><i class="fas fa-building"></i>Nhà cung cấp</sidebar-link>
        <sidebar-link to="/hoa-chat-nhap-kho"><i class="fas fa-sign-in-alt"></i>Hóa chất nhập kho</sidebar-link>
        <sidebar-link to="/hoa-chat-xuat-kho"><i class="fas fa-external-link-alt"></i>Hóa chất xuất kho</sidebar-link>
        <sidebar-link to="/hoa-chat-het-han"><i class="fas fa-exclamation-triangle"></i>Hóa chất hết hạn</sidebar-link>
        <sidebar-link to="/vat-tu-hoa-chat"><i class="fas fa-bong"></i>Vật tư, hóa chất</sidebar-link>
        <sidebar-link to="/thong-ke-ton-kho"><i class="fas fa-trash-alt"></i>Thống kê tồn kho</sidebar-link>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down
          class="nav-item"
          title="5 Notifications"
          title-classes="nav-link"
          icon="ti-bell"
        >
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
.wrapper .sidebar .nav i {
  font-size: 14px !important;
  line-height: 20px !important;
}
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
