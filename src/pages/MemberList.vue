<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Danh sách thành viên</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <div style="margin-right: 20px">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tìm kiếm"
            single-line
            hide-details
          ></v-text-field>
        </div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Thêm mới
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Họ tên"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="SĐT"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      name="input-10-2"
                      label="Mật khẩu"
                      class="input-group--focused"
                      @click:append="show = !show"
                      v-model="editedItem.password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-combobox
                      v-model="editedItem.roles"
                      :items="roleList"
                      label="Quyền"
                      multiple
                      chips
                      item-text="title"
                    ></v-combobox>
                  </v-col>
                </v-row>
                <p v-if="errors" class="alert alert-danger">{{ errors }}</p>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Hủy </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Lưu </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Chắc chắn xóa?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Hủy</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Họ tên",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Số điện thoại", value: "phone" },
        { text: "Ngày tạo", value: "date" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        email: "",
        phone: "",
        password: "",
        roles: "",
      },
      defaultItem: {
        name: "",
        email: "",
        phone: "",
        password: "",
        roles: "",
      },
      memberList: [],
      errors: "",
      show: false,
      roleList: [],
    };
  },
  mounted() {
    this.CallAPI("get", "role/full", {}, (response) => {
      for (let item of response.data.data) {
        for (let role of item.permissions) {
          this.roleList.push(role);
        }
      }
    });
    this.getMemberList();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Sửa";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    getMemberList() {
      this.desserts = [];
      this.CallAPI(
        "get",
        "user/list?order_by=created_at&order_direction=asc",
        {},
        (response) => {
          this.memberList = response.data.data.data;
          this.desserts = this.memberList;
          console.log(this.memberList);
        }
      );
    },
    initialize() {
      this.desserts = this.memberList;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.closeDelete();
      this.CallAPI(
        "delete",
        "user/delete/" + this.desserts[this.editedIndex].id,
        {},
        (response) => {
          if (response.data.error == "UNAUTHORIZED") {
            this.$toast.error("Không được phép!");
            return;
          }
          if (response.data.code == -1) {
            this.$toast.error("Xóa không thành công");
            return;
          }
          this.$toast.success("Xóa thành công");
          this.getMemberList();
        }
      );
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.errors = "";
      if (
        !this.editedItem.name ||
        !this.editedItem.phone ||
        !this.editedItem.email ||
        !this.editedItem.password
      ) {
        this.errors = "Vui lòng nhập đầy đủ thông tin!";
        return;
      }
      if (!this.validEmail(this.editedItem.email)) {
        this.errors = "Email không hợp lệ!";
        return;
      }
      if (!this.validPhone(this.editedItem.phone)) {
        this.errors = "Số điện thoại không đúng!";
        return;
      }
      if (this.editedItem.password.length < 8) {
        this.errors = "Mật khẩu phải có ít nhất 8 ký tự!";
        return;
      }
      if (this.editedIndex > -1) {
        this.CallAPI(
          "put",
          "user/update/" + this.desserts[this.editedIndex].id,
          this.editedItem,
          (response) => {
            if (response.data.error == "UNAUTHORIZED") {
              this.$toast.error("Không được phép!");
              return;
            }
            if (response.data.error == "EMAIL_USER_EXIST") {
              this.errors = "Email đã tồn tại";
              return;
            }
            if (response.data.code == -1) {
              this.$toast.error("Đã xảy ra lỗi: " + response.data.error);
              return;
            }
            this.getMemberList();
            this.$toast.success("Sửa thành công");
            this.close();
          }
        );
      } else {
        this.CallAPI("post", "user/create", this.editedItem, (response) => {
          if (response.data.error == "UNAUTHORIZED") {
            this.$toast.error("Không được phép!");
            return;
          }
          if (response.data.error == "EMAIL_USER_EXIST") {
            this.errors = "Email đã tồn tại";
            return;
          }
          if (response.data.code == -1) {
            this.$toast.error("Đã xảy ra lỗi: " + response.data.error);
            return;
          }
          this.getMemberList();
          this.$toast.success("Thêm thành công");
          this.close();
        });
      }
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