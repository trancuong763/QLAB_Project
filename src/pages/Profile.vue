<template>
  <div class="profile">
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Thông tin cá nhân</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
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
              <table>
                <tr>
                  <td width="150px">Số điện thoại:</td>
                  <td>0839575644</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>nguyensonn124@gmail.com</td>
                </tr>
                <tr>
                  <td>Địa chỉ:</td>
                  <td>Chưa câp nhật</td>
                </tr>
                <tr>
                  <td>Hạn sử dụng:</td>
                  <td>03:09:14 13-12-2020</td>
                </tr>
              </table>
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
                <input
                  type="text"
                  class="form-control"
                  value="Nguyễn Xuân Sơn"
                />
              </div>
              <div class="form-group">
                <label for="">Số điện thoại</label>
                <input type="text" class="form-control" value="0839575644" />
              </div>
              <div class="form-group">
                <label for="">Địa chỉ</label>
                <input type="text" class="form-control" value="Hà Nội" />
              </div>
              <div class="form-group">
                <label for="">Mô tả</label>
                <ckeditor :editor="editor" v-model="editorData"></ckeditor>
              </div>
              <div class="form-group">
                <button class="btn" style="padding: 8px 30px">Lưu</button>
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
      editorData: "Quá tuyệt vời",
    };
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
</style>