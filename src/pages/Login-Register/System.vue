<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text-accent-3"
                        >
                          Đăng nhập
                        </h1>
                        <!-- <div class="text-center" mt-4>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div> -->
                        <!-- <h4 class="text-center mlt-4">
                          Để đăng nhập vào hệ thống bạn cần có một tài khoản
                        </h4> -->
                        <v-form>
                          <v-text-field
                            v-model="login.email"
                            id="email"
                            label="Email"
                            name="Email"
                            prepend-icon="fa fa-envelope"
                            type="text"
                            color="teal accent-3"
                          >
                          </v-text-field>
                          <v-text-field
                            v-model="login.password"
                            id="password"
                            label="Mật khẩu"
                            name="password"
                            prepend-icon="fa fa-key"
                            type="password"
                            color="teal accent-3"
                          >
                          </v-text-field>
                          <div
                          class="alert alert-danger"
                          role="alert"
                          v-for="item in errors"
                          :key="item"
                        >
                          {{ item }}
                        </div>
                        </v-form>

                        <!-- <h4 class="text-center mlt-4">Quên mật khẩu ?</h4> -->
                        <div class="text-center mt-5">
                          <v-btn
                            rounded
                            color="teal accent-3"
                            dark
                            @click.prevent="btn_login"
                            >Đăng Nhập</v-btn
                          >
                        </div>
                      </v-card-text>
                    </v-col>
                    <!-- <v-col cols="12" md="4" sm="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome !</h1>
                        <h5 class="text-center">
                          Chào mừng bạn đến với hệ thống quản lý QLAB.
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn
                          rounded
                          outlined=""
                          dark
                          @click="change_step(step++)"
                          >Đăng ký</v-btn
                        >
                      </div>
                    </v-col> -->
                  </v-row>
                </v-window-item>
                <!-- <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Wellcome !</h1>
                        <h5 class="text-center">
                          Vui lòng đăng nhập để kết nối với chúng tôi
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn
                          rounded
                          outlined
                          dark
                          @click="change_step(step--)"
                          >Đăng nhập</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text-accent-3"
                        >
                          Tạo tài khoản
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">
                          Vui lòng nhập đầy đủ thông tin để đăng ký
                        </h4>
                        <v-form>
                          <v-text-field
                            v-model="register.name"
                            label="Tên người dùng"
                            id="name"
                            name="name"
                            prepend-icon="fa fa-user"
                            type="text"
                            color="teal accent-3"
                          ></v-text-field>
                          <v-text-field
                            v-model="register.email"
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            prepend-icon="fas fa-envelope"
                            color="teal accent-3"
                          ></v-text-field>
                          <v-text-field
                            v-model="register.password"
                            label="Mật khẩu"
                            id="password"
                            name="password"
                            type="password"
                            prepend-icon="fa fa-lock"
                            color="teal accent-3"
                          ></v-text-field>
                          <v-text-field
                            v-model="register.confirm_password"
                            label="Xác nhận mật khẩu"
                            id="confirm_password"
                            name="confirm_password"
                            type="password"
                            prepend-icon="fas fa-user-lock"
                            color="teal accent-3"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                      <div
                        class="alert alert-danger"
                        role="alert"
                        v-for="item in errors"
                        :key="item"
                      >
                        {{ item }}
                      </div>
                      <div class="text-center mt-5">
                        <v-btn
                          rounded
                          color="teal accent-3"
                          dark
                          @click="btn_register"
                          >Đăng ký</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item> -->
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      login: {
        email: null,
        password: null,
      },
      register: {
        name: null,
        email: null,
        password: null,
        confirm_password: null,
      },
      errors: [],
    };
  },
  props: {
    source: String,
  },
  methods: {
    change_step(step) {
      this.errors = [];
      return step;
    },
    btn_login(e) {
      this.errors = [];
      e.preventDefault();
      if (!this.login.email || !this.login.password) {
        this.errors.push("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      if (!this.validEmail(this.login.email)) {
        this.errors.push("Email chưa đúng định dạng!");
        return;
      }
      this.CallAPI("post", "user/login", {
          email: this.login.email,
          password: this.login.password,
        }, (response) => {
          if (response.data.code == -1) {
            this.errors.push("Tài khoản hoặc mật khẩu chưa chính xác!");
            return;
          }
          localStorage.setItem("token", response.data.data[0].token);
          localStorage.setItem("id", response.data.data[0].id);
          this.login.email = null;
          this.login.password = null;
          location.reload();
        });
    },
    btn_register(e) {
      this.errors = [];
      e.preventDefault();
      if (!this.login.email || !this.login.password) {
        this.errors.push("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      if (!this.validEmail(this.login.email)) {
        this.errors.push("Email chưa đúng định dạng!");
        return;
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
  mounted() {},
};
</script>

<style>
  @media(min-width: 1200px) {
    form {
      padding: 30px 60px 20px 60px;
    }
  }
</style>
