<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/bang-dieu-khien"
          ><i class="fa fa-home"></i>Bảng điều khiển</sidebar-link
        >
        <sidebar-link to="/danh-sach-thanh-vien"
          ><i class="fa fa-briefcase"></i>Danh sách thành viên</sidebar-link
        >
        <sidebar-link to="/vat-tu"
          ><i class="fas fa-layer-group"></i>Vật tư</sidebar-link
        >
        <sidebar-link to="/kho-may"
          ><i class="fa fa-home"></i>Kho / máy</sidebar-link
        >
        <sidebar-link to="/don-vi"
          ><i class="fas fa-gem"></i>Đơn vị</sidebar-link
        >
        <!-- <sidebar-link to="/nha-cung-cap"
          ><i class="fas fa-building"></i>Nhà cung cấp</sidebar-link
        > -->
        <sidebar-link to="/yeu-cau-xet-nghiem"
          ><i class="fas fa-user-check"></i>Yêu cầu xét nghiệm</sidebar-link
        >
        <sidebar-link to="/hoa-chat-nhap-kho"
          ><i class="fas fa-sign-in-alt"></i>Hóa chất nhập kho</sidebar-link
        >
        <sidebar-link to="/hoa-chat-xuat-kho"
          ><i class="fas fa-external-link-alt"></i>Hóa chất xuất
          kho</sidebar-link
        >
        <sidebar-link to="/hoa-chat-het-han"
          ><i class="fas fa-exclamation-triangle"></i>Hóa chất hết
          hạn</sidebar-link
        >
        <sidebar-link to="/vat-tu-hoa-chat"
          ><i class="fas fa-bong"></i>Vật tư, hóa chất</sidebar-link
        >
        <sidebar-link to="/thong-ke-ton-kho"
          ><i class="fas fa-trash-alt"></i>Thống kê tồn kho</sidebar-link
        >
      </template>
      <mobile-menu>
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="">
            <i class="ti-settings"></i>Tính năng
          </router-link>
        </li>
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="">
            <i class="ti-settings"></i>Giới thiệu
          </router-link>
        </li>
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="">
            <i class="ti-settings"></i>Liên hệ
          </router-link>
        </li>
        <drop-down
          class="nav-item"
          title="Cài đặt"
          title-classes="nav-link"
          icon="ti-settings"
        >
          <router-link
            tag="a"
            class="dropdown-item"
            to="/thong-tin-ca-nhan"
            @click.native="toggleSidebar"
            >Thông tin cá nhân</router-link
          >
          <a class="dropdown-item">Đăng xuất</a>
        </drop-down>
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
