<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid row">
        <div class="col-md-6 col-10">
          <router-link class="navbar-brand" tag="a" to="/bang-dieu-khien"
            >HỆ THỐNG QUẢN LÝ KHO XÉT NGHIỆM - QLAB
          </router-link>
        </div>
        <div class="col-md-6 col-2">
          <button
            type="button"
            aria-label="Toggle navigation"
            class="navbar-toggler navbar-burger"
            @click="toggleSidebar"
            :aria-expanded="$sidebar.showSidebar"
          >
            <span class="navbar-toggler-bar"></span
            ><span class="navbar-toggler-bar"></span
            ><span class="navbar-toggler-bar"></span>
          </button>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <drop-down
                class="nav-item"
                :title="name"
                style="margin-right: 100px"
              >
                <div class="account">
                  <div class="info">
                    <h4>{{ name }}</h4>
                    <!-- <p>Là thành viên từ 11-11-2020</p>
                    <p>Hạn sử dụng 11-12-2020 08:08:08</p> -->
                  </div>
                  <div class="function">
                    <button class="btn" @click="infoHandle">Thông tin</button>
                    <button class="btn" @click="log_out">Đăng xuất</button>
                  </div>
                </div>
              </drop-down>
              <!-- <li class="nav-item">
                <a href="#"> Tính năng </a>
              </li>
              <li class="nav-item">
                <a href="#"> Giới Thiệu </a>
              </li>
              <li class="nav-item">
                <a href="#"> Liên hệ </a>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/" tag="a" style="cursor: pointer"
            ><i class="fas fa-home"></i> Trang chủ</router-link
          >
        </li>
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
      id: localStorage.getItem("id"),
      name: "",
    };
  },
  mounted() {
    this.CallAPI("get", "user/detail/" + this.id, {}, (response) => {
      if (!response.data.data) {
        localStorage.clear();
        window.reload();
      }
      const profile = response.data.data;
      this.name = profile.name;
    });
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
    infoHandle() {
      this.$router.push("/thong-tin-ca-nhan");
    },
    log_out() {
      localStorage.clear();
      location.reload();
    },
  },
};
</script>
<style>
.header .navbar {
  background-color: #3c8dbc;
  border-bottom: 1px solid #dddddd;
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
  border: 1px solid #dddddd;
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
.header .dropdown-menu {
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
.header .account .btn {
  line-height: 0;
}
.header .account .function {
  height: 54px;
  width: 100%;
  background: #f9f9f9;
  padding: 0 10px;
  display: flex;
  border-top: 1px solid #eee;
}
.navbar-nav > li > .dropdown-menu:after {
  display: none !important;
}
.navbar-nav > li > .dropdown-menu:before {
  display: none !important;
}
.header .col-md-6.col-2,
.header .container-fluid.row {
  padding-right: 0;
  margin-right: 0;
}
@media (min-width: 992px) {
  .header .navbar {
    height: 50px;
    min-height: 50px;
  }
}
</style>
