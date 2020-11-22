<template>
  <div class="profile">
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Thông tin cá nhân</v-toolbar-title>
      </v-toolbar>
      <v-tabs>
        <v-tab>
          <v-icon left> mdi-account </v-icon>
          Thông tin
        </v-tab>
        <v-tab>
          <v-icon left> mdi-lock </v-icon>
          Mật khẩu
        </v-tab>
        <v-tab>
          <v-icon left> mdi-access-point </v-icon>
          Cập nhật
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <div class="v-data-table__wrapper">
                <table>
                  <tr>
                    <td>Họ và tên:</td>
                    <td>{{name}}</td>
                  </tr>
                  <tr>
                    <td width="130px">Số điện thoại:</td>
                    <td>{{phone}}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{{email}}</td>
                  </tr>
                  <!-- <tr>
                    <td>Địa chỉ:</td>
                    <td>Chưa câp nhật</td>
                  </tr>
                  <tr>
                    <td>Hạn sử dụng:</td>
                    <td>03:09:14 13-12-2020</td>
                  </tr> -->
                </table>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <div class="form-group">
                <label for="">Mật khẩu cũ</label>
                <input type="password" class="form-control" />
              </div>
              <div class="form-group">
                <label for="">Mật khẩu mới</label>
                <input type="password" class="form-control" />
              </div>
              <div class="form-group">
                <label for="">Nhập lại mật khẩu</label>
                <input type="password" class="form-control" />
              </div>
              <div class="form-group">
                <button class="btn" style="padding: 8px 30px">Lưu</button>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <div class="form-group">
                <label for="">Họ tên</label>
                <input type="text" class="form-control" v-model="name" />
              </div>
              <div class="form-group">
                <label for="">Số điện thoại</label>
                <input type="text" class="form-control" v-model="phone" />
              </div>
              <div class="form-group">
                <label for="">Email</label>
                <input type="email" class="form-control" v-model="email" />
              </div>
              <!-- <div class="form-group">
                <label for="">Địa chỉ</label>
                <input type="text" class="form-control" v-model="address" />
              </div>
              <div class="form-group">
                <label for="">Mô tả</label>
                <ckeditor :editor="editor" v-model="description"></ckeditor>
              </div> -->
              <p v-if="errors" class="alert alert-danger">{{errors}}</p>
              <div class="form-group">
                <button
                  class="btn"
                  style="padding: 8px 30px"
                  @click="updateProfile"
                >
                  Lưu
                </button>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data() {
    return {
      editor: ClassicEditor,
      id: localStorage.getItem("id"),
      name: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      roles: [],
      errors: "",
      allRoles: [],
    };
  },
  mounted(){
    this.CallAPI("get", "user/detail/" + this.id, {}, (response) => {
      const profile = response.data.data;
      this.name = profile.name;
      this.phone = profile.phone;
      this.email = profile.email;
    })
    this.CallAPI("get", "role/full", {}, (response) => {
      this.allRoles = response.data.data
      for(let item of this.allRoles){
        for(let role of item.permissions){
          this.roles.push(role.key)
        }
      }
    })
    this.CallAPI("get", "user/list?page=2&limit=1&order_by=created_at&order_direction=asc", {}, (response) => {
      console.log(response);
    })
  },
  methods: {
    updateProfile() {
      this.errors = "";
      if (!this.name || !this.phone || !this.email) {
        this.error = "Vui lòng nhập đầy đủ thông tin";
        return;
      }
      if(!this.validEmail(this.email)){
        this.error = "Email không đúng";
        return;
      }
      if(!this.validPhone(this.phone)){
        this.error = "Số điện thoại không đúng";
        return;
      }
      const data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        roles: this.roles,
      };
      this.CallAPI(
        "put",
        "user/update/2",
        data,
        (response) => {
          this.$toast.success("Cập nhật thành công");
        },
        (error) => {
          this.errors = "Xảy ra lỗi";
        }
      );
    },
    validEmail(email) {
      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(email);
    },
    validPhone: function (phone) {
      const reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      return reg.test(phone);
    },
  },
};
</script>
<style>
.profile td {
  padding: 5px 0;
}
.profile table {
  margin-left: 30px;
}
.profile input {
  border: 1px solid #666;
}
.profile .form-control {
  background-color: #fff;
}
.profile .form-group {
  margin-left: 30px;
  width: 70%;
}
.ck.ck-content {
  height: 150px;
  color: #333;
}
.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
  border-color: #666;
}
.ck.ck-toolbar {
  border-color: #666;
}
@media (max-width: 480px) {
  .profile .form-group {
    margin-left: 10px;
    width: 95%;
  }
  .profile table {
    margin-left: 10px;
  }
}
</style>