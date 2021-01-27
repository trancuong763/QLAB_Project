<template>
  <div>
    <div class="row">
      <div class="col-md-4 col-xl-3 flex space-between printer">
        <button class="btn btn-success" @click="export_excel">
          <i class="fas fa-file-excel" style="margin-right: 10px"></i> Xuất
          Excel
        </button>
        <button class="btn btn-success" @click="export_pdf">
          <i class="fas fa-file-pdf" style="margin-right: 10px"></i> Xuất PDF
        </button>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Tồn kho</v-toolbar-title>
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
            <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Thêm mới
            </v-btn>
          </template> -->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <!-- <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.TENHANG"
                      label="Tên hàng"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.MADUOC"
                      label="Mã dược"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.Total"
                      label="Số lượng"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-combobox
                      v-model="editedItem.services"
                      :items="serviceOptions"
                      label="Dịch vụ"
                      multiple
                      chips
                      item-text="TENDICHVU"
                      item-value="DICHVU_ID"
                    ></v-combobox>
                  </v-col>
                </v-row> -->
                  <!-- <p v-if="errors" class="alert alert-danger">{{ errors }}</p> -->
                  <v-simple-table height="300px">
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <th>Tên hàng</th>
                          <td>{{ editedItem.TENHANG }}</td>
                        </tr>
                        <tr>
                          <th>Mã dược</th>
                          <td>{{ editedItem.MADUOC }}</td>
                        </tr>
                        <tr>
                          <th>Số lượng</th>
                          <td>{{ editedItem.Total }}</td>
                        </tr>
                        <tr>
                          <th>Dịch vụ</th>
                          <td>
                            <span
                              v-for="(item, index) in editedItem.DichVu"
                              :key="index"
                            >
                              {{ item.DICHVU_ID }}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>Dược</th>
                          <td>
                            <span
                              v-for="(item, index) in editedItem.DichVu"
                              :key="index"
                            >
                              <span
                                v-for="(value, ind) in item.Duocs"
                                :key="ind"
                              >
                                {{ value.id }}
                              </span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-container>
              </v-card-text>

              <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Hủy </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Lưu </v-btn>
            </v-card-actions> -->
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Chắc chắn xóa?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Hủy</v-btn
                >
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
        <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
      </template>
      <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
    </v-data-table>
    <div id="export_inventory" style="display: none">
      <table style="width: 1200px">
        <tr>
          <th>STT</th>
          <th>Tên hàng</th>
          <th>Mã dược</th>
          <th>Số lượng</th>
        </tr>
        <tr v-for="(item, index) in desserts" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.TENHANG }}</td>
          <td>{{ item.MADUOC }}</td>
          <td>{{ item.Total }}</td>
        </tr>
      </table>
    </div>
  </div>
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
          text: "Tên hàng",
          align: "start",
          sortable: false,
          value: "TENHANG",
        },
        { text: "Mã dược", value: "MADUOC" },
        { text: "Số lượng", value: "Total" },
        { text: "Chi tiết", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        TENHANG: "",
        MADUOC: "",
        Total: "",
        DichVu: [],
      },
      defaultItem: {
        TENHANG: "",
        MADUOC: "",
        Total: "",
        DichVu: [],
      },
      inventoryList: [],
      errors: "",
      show: false,
      serviceOptions: [],
    };
  },
  mounted() {
    this.CallAPI("get", "dinhmuc/list-service?limit=999999", {}, (response) => {
      let data = response.data.data;
      for (let i = 0; i < data.length; i++) {
        for (let item of data[i]) {
          this.serviceOptions.push(item);
        }
      }
    });
    this.getInventoryList();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Chi tiết";
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
    getInventoryList() {
      this.desserts = [];
      this.CallAPI(
        "get",
        "request/export-ton-kho?duoc_id=&dichvu_id=&type=json",
        {},
        (response) => {
          this.inventoryList = response.data.data;
          // for (let item of this.inventoryList) {
          //   let services = [];
          //   for (let dv of item.DichVu) {
          //     for (let sv of this.serviceOptions) {
          //       if (sv.DICHVU_ID == dv.DICHVU_ID) {
          //         services.push({
          //           DICHVU_ID: sv.DICHVU_ID,
          //           TENDICHVU: sv.TENDICHVU,
          //           Duocs: dv.Duocs,
          //           total: dv.total,
          //         });
          //         break;
          //       }
          //     }
          //   }
          //   this.desserts.push({
          //     TENHANG: item.TENHANG,
          //     MADUOC: item.MADUOC,
          //     Total: item.Total,
          //     services: services,
          //   });
          // }
          this.desserts = this.inventoryList;
        }
      );
    },
    initialize() {
      this.desserts = this.inventoryList;
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
      this.editedItem.email = this.editedItem.email.trim();
      if (
        !this.editedItem.name ||
        !this.editedItem.phone ||
        !this.editedItem.email ||
        !this.editedItem.password ||
        !this.editedItem.roles[0]
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
    export_excel(e) {
      e.preventDefault();
      this.errors = [];
      this.CallAPI(
        "get",
        "request/export-ton-kho", {},
        (response) => {
          window.open(`${response.data.data.path}`, "_self");
        }
      );
    },
    export_pdf(e) {
      e.preventDefault();
      // console.log();
      // var printWindow = window.open("", "", "height=400,width=1200");
      // printWindow.document.write(
      //   "<html><head><title>Danh sách tồn kho</title>"
      // );
      // printWindow.document.write(
      //   "<style>table,td,th{border: 1px solid #ddd;text-align: left;}table {border-collapse: collapse;width: 100%;}th, td {padding: 15px;}</style>"
      // );
      // printWindow.document.write("</head><body>");
      // printWindow.document.write(
      //   document.querySelector("#export_inventory").innerHTML
      // );
      // printWindow.document.write("</body></html>");
      // printWindow.document.close()
      // printWindow.print();
      var sTable = document.getElementById('export_inventory').innerHTML;

        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";

        // CREATE A WINDOW OBJECT.
        var win = window.open('', '', 'height=800,width=1400');

        win.document.write('<html><head>');
        win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
        win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');

        win.document.close(); 	// CLOSE THE CURRENT WINDOW.

        win.print();    // PRINT THE CONTENTS.
    },
  },
};
</script>