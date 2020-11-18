<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"
          >HỆ THỐNG QUẢN LÝ KHO XÉT NGHIỆM - QLAB
        </a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a href="#"> Tính năng </a>
            </li>
            <li class="nav-item">
              <a href="#"> Giới Thiệu </a>
            </li>
            <li class="nav-item">
              <a href="#"> Liên hệ </a>
            </li>
            <drop-down class="nav-item" title="Nguyễn Xuân Sơn">
              <div class="account">
                <div class="info">
                  <h4>Nguyễn Xuân Sơn</h4>
                  <p>Là thành viên từ 11-11-2020</p>
                  <p>Hạn sử dụng 11-12-2020 08:08:08</p>
                </div>
                <button class="btn" @click="infoHandle">Thông tin của bạn</button>
                <div class="function">
                  <button class="btn" @click="infoHandle">Đổi mật khẩu</button>
                  <button class="btn">Đăng xuất</button>
                </div>
              </div>
            </drop-down>
          </ul>
        </div>
      </div>
    </nav>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/" tag="a" style="cursor: pointer;"><i class="fas fa-home"></i> Trang chủ</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ routeName }}
        </li>
      </ol>
    </nav>
  </div>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    infoHandle(){
      this.$router.push("/thong-tin-ca-nhan")
    }
  },
};
</script>
<style>
.header .navbar {
  background-color: #3c8dbc;
  border-bottom: 1px solid #DDDDDD;
}
.header .navbar a {
  color: #fff;
}
.header .navbar .navbar-brand {
  padding: 5px 15px;
}
.header .navbar .navbar-nav .nav-item a {
  padding: 0 15px;
  margin: 0;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
}
.header .navbar .navbar-nav .nav-item:hover {
  background: #337ab7;
}
.header .navbar-expand-lg .navbar-collapse .navbar-nav {
  height: 48px;
}
.header .navbar .navbar-nav li {
  line-height: 48px;
  cursor: pointer;
}
.header .account {
  width: 100%;
  background: #fff;
  border: 1px solid #DDDDDD;
  cursor: default;
}
.header .account .info {
  background: #3c8dbc;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  padding: 20px;
}
.header .account .info p {
  margin: 0;
  font-size: 12px;
  margin-top: 5px;
}
.header .account .info h4 {
  margin: 0;
  font-size: 17px;
}
.header .dropdown-menu{
  width: 280px;
  left: -100px;
}
.header .account button {
  color: #444;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  height: 35px;
  margin: 10px auto;
  display: block;
  border-radius: 0;
  font-weight: normal;
  text-transform: none;
  font-size: 14px;
}
.header .account button:hover {
  background: #e7e7e7;
  border: 1px solid #999;
}
.header .account .btn{
  line-height: 0;
}
.header .account .function{
  height: 54px;
  width: 100%;
  background: #f9f9f9;
  padding: 0 10px;
  display: flex;
  border-top: 1px solid #eee;
}
@media (min-width: 992px) {
  .header .navbar {
    height: 50px;
    min-height: 50px;
  }
}
</style>
