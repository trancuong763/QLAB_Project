<template>
  <div>
    <div class="row">
      <div class="col-12 flex printer">
        <button
          class="btn btn-success"
          @click="export_excel"
          disabled
          style="height: 47px; width: 150px"
        >
          <i class="fas fa-file-excel" style="margin-right: 10px"></i> Xuất
          Excel
        </button>
        <button
          class="btn btn-success"
          @click="export_pdf"
          disabled
          style="margin-left: 20px; height: 47px; width: 150px"
        >
          <i class="fas fa-file-pdf" style="margin-right: 10px"></i> Xuất PDF
        </button>
        <div
          style="
            margin-left: 20px;
            max-width: 300px;
            position: relative;
            top: 14px;
          "
        >
          <v-select
            v-model="supplies"
            :items="supplieOptions"
            label="Loại vật tư"
            item-text="name"
            item-value="id"
            solo
            @change="getList"
          ></v-select>
        </div>
      </div>
    </div>
    <v-app>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="calories"
        class="elevation-1"
        :loading="loading"
        loading-text="Đang tải..."
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Hoá chất sắp hết</v-toolbar-title>
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
                    <v-simple-table height="200px">
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
          <v-icon small class="mr-2" @click="editItem(item)">
            fas fa-eye
          </v-icon>
          <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
        </template>
        <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
      </v-data-table>
    </v-app>
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
          value: "TENHANG"
        },
        { text: "Mã dược", value: "MADUOC" },
        // { text: "Số QĐTT", value: "SO_QDTT" },
        // { text: "ĐVT", value: "DVT" },
        // { text: "SL nhập", value: "Total" },
        // { text: "SL đã dùng", value: "Used" },
        { text: "SL tồn", value: "Inventory" },
        // { text: "Giá tồn kho", value: "InventoryPrice" },
        // { text: "Giá đã sử dụng", value: "UsedPrice" },
        { text: "Chi tiết", value: "actions", sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        TENHANG: "",
        MADUOC: "",
        Total: "",
        DichVu: []
      },
      defaultItem: {
        TENHANG: "",
        MADUOC: "",
        Total: "",
        DichVu: []
      },
      inventoryList: [],
      errors: "",
      show: false,
      serviceOptions: [],
      htmls: "",
      supplieOptions: [
        {
          id: "13",
          name: "Hóa chất"
        },
        {
          id: "10",
          name: "Vật tư"
        }
      ],
      supplies: "",
      loading: false
    };
  },
  mounted() {
    this.CallAPI("get", "dinhmuc/list-service?limit=999999", {}, response => {
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
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    getList() {
      this.getInventoryList();
    },
    getInventoryList() {
      this.loading = true;
      this.desserts = [];
      this.CallAPI(
        "get",
        `request/export-ton-kho?duoc_id=&dichvu_id=&type=json&method=${this.supplies}`,
        {},
        response => {
          document.querySelectorAll(".printer button")[0].disabled = false;
          document.querySelectorAll(".printer button")[1].disabled = false;
          this.loading = false;
          this.inventoryList = response.data.data;
          for (let item of this.inventoryList) {
            if (item.Inventory <= 200) {
              this.desserts.push({
                DUOC_ID: item.DUOC_ID,
                DichVu: item.DichVu,
                Inventory: this.formatNumber(item.Inventory),
                MADUOC: item.MADUOC,
                TENHANG: item.TENHANG,
                Total: this.formatNumber(item.Total),
                Used: this.formatNumber(item.Used),
                TotalPrice: this.formatNumber(item.TotalPrice),
                UsedPrice: this.formatNumber(item.UsedPrice),
                InventoryPrice: this.formatNumber(item.InventoryPrice),
                dinh_muc: item.dinh_muc,
                HANGSANXUAT: item.detail_duoc
                  ? item.detail_duoc.HANGSANXUAT
                  : "",
                HAMLUONG: item.detail_duoc ? item.detail_duoc.HAMLUONG : "",
                QUOCGIA: item.detail_duoc ? item.detail_duoc.QUOCGIA : "",
                SO_QDTT: item.detail_duoc ? item.detail_duoc.SO_QDTT : "",
                detail_duoc: item.detail_duoc,
                DVT: item.dinh_muc
                  ? item.dinh_muc.unitName
                    ? item.dinh_muc.unitName
                    : ""
                  : ""
              });
            }
          }

          this.htmls = `
            <tr>
              <td colspan="12">SỞ Y TẾ TP ĐÀ NẴNG</td>
            </tr>
            <tr>
              <td colspan="12"><b>BỆNH VIỆN Y HỌC CỔ TRUYỀN</b></td>
            </tr>
            <tr>
              <th colspan="12"><h2>BÁO CÁO HÓA CHẤT SẮP HẾT</h2></th>
            </tr>
            <tr>
              <td colspan="12" style="text-align: center">Từ ngày ..................... đến ngày ..................... </td>
            </tr>
            <tr>
              <td colspan="12" style="text-align: center"><b>Phạm vi: Kho khoa xét nghiệm</b></td>
            </tr>
            <tr>
              <td style="height: 40px"></td>
            </tr>
            <tr class="boder">
                <th colspan="3">STT</th>
                <th colspan="3">Mã dược</th>
                <th colspan="3">Tên thuốc, vật tư, hóa chất</th>
                <th colspan="3">SL tồn</th>
            </tr>
        `;
          // <th>ĐVTT</th>
          // <th>Hoạt chất</th>
          for (let [index, item] of this.desserts.entries()) {
            this.htmls += `
                <tr class="boder">
                    <td colspan="3" style="text-align: center">${index + 1}</td>
                    <td colspan="3">${item.MADUOC}</td>
                    <td colspan="3">${item.TENHANG}</td>
                    <td colspan="3" style="text-align: center;">${item.Inventory}</td>
                    
                </tr>
            `;
          }
          this.htmls += `
            <tr>
              <td colspan="12" style="text-align: right; height: 60px">Ngày ........ tháng ........ năm ........... <td>
            </tr>
            <tr><td colspan="12" style="height: 60px"></td></tr>
            <tr>
              <td colspan="2" style="text-align: center; font-style: italic; width: 20%"><b>Thủ kho</b><br>(Ký, ghi rõ họ tên)</td>
              <td style="text-align: center; font-style: italic; width: 20%"><b>Thống kê</b><br>(Ký, ghi rõ họ tên)</td>
              <td colspan="2" style="text-align: center; font-style: italic; width: 20%"><b>Trưởng khoa dược</b><br>(Ký, ghi rõ họ tên)</td>
              <td colspan="3" style="text-align: center; font-style: italic; width: 20%"><b>Kế toán trưởng</b><br>(Ký, ghi rõ họ tên)</td>
              <td colspan="3" style="text-align: center; font-style: italic; width: 20%"><b>Giám đốc</b><br>(Ký, ghi rõ họ tên)</td>
            </tr>
          `;
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
        response => {
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
          response => {
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
        this.CallAPI("post", "user/create", this.editedItem, response => {
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
    validPhone: function(phone) {
      const reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      return reg.test(phone);
    },
    export_excel(e) {
      e.preventDefault();
      var uri = "data:application/vnd.ms-excel;base64,";
      var template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
      var base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      };

      var format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
          return c[p];
        });
      };

      var ctx = {
        worksheet: "Worksheet",
        table: this.htmls
      };

      var link = document.createElement("a");
      link.download =
        "Báo cáo hóa chất sắp hết " +
        new Date().toLocaleDateString("en-GB") +
        ".xls";
      link.href = uri + base64(format(template, ctx));
      link.click();
    },
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    export_pdf(e) {
      e.preventDefault();
      let style = `
          <style>
            table {
              width: 100%;
              font: 14px Calibri;
            }
            .boder th, .boder td {
              border: solid 1px #999; 
              padding: 2px 5px;
            }          
          </style>
        `;

      var win = window.open("", "", "height=800,width=1400");

      win.document.write("<html><head>");
      win.document.write(
        `<title>Báo cáo hóa chấp sắp hết ngày ${new Date().toLocaleDateString(
          "en-GB"
        )}</title>`
      );
      win.document.write(style);
      win.document.write("</head>");
      win.document.write("<body>");

      let table = `<table cellspacing="0">${this.htmls}</table>`;
      win.document.write(table);
      win.document.write("</body></html>");

      win.document.close();

      win.print();
    }
  }
};
</script>
<style>
.v-list-item__content {
  padding: 12px !important;
}
</style>
