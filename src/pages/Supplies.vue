<template>
  <div>
    <div class="row">
      <div class="col-md-4 col-xl-3">
        <div>
          <label for="start_date">Từ ngày</label>
          <b-input-group class="mb-3">
            <b-form-input
              id="start_date"
              v-model="formatted_start"
              type="text"
              placeholder="Ngày / Tháng / Năm"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                v-model="start_date"
                label-no-date-selected="Chưa có ngày nào được chọn"
                button-only
                aria-controls="start_date"
                @context="onContext_start"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
      <div class="col-md-4 col-xl-3">
        <div>
          <label for="end_date_date">Đến ngày</label>
          <b-input-group class="mb-3">
            <b-form-input
              id="end_date"
              v-model="formatted_end"
              type="text"
              placeholder="Ngày / Tháng / Năm"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                v-model="end_date"
                button-only
                aria-controls="end_date"
                label-no-date-selected="Chưa có ngày nào được chọn"
                @context="onContext_end"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
      <div class="col-md-4 col-xl-3 search">
        <label for="" class="space">&nbsp;</label><br />
        <div class="btn btn-light looking" @click="show_list">
          <span v-if="!isSearching"
            >Tìm kiếm
            <i
              aria-hidden="true"
              class="v-icon notranslate mdi mdi-magnify theme--light"
            ></i
          ></span>
          <span v-else>
            <div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Đang tìm...</span>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="row" v-if="errorDate[0]">
      <div class="col-md-6">
        <div
          class="text-danger"
          style="margin-bottom: 15px"
          v-for="item in errorDate"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :loading="isSearching"
      :options.sync="options"
      :server-items-length="totalDesserts"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Vật tư</v-toolbar-title>
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
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                style="display: "
                v-on="on"
              >
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
                    <!-- <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Tên hàng"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.code"
                      label="Mã hàng"
                    ></v-text-field>
                  </v-col> -->

                    <!-- <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.estimatedForecastLevel"
                      label="Mức báo dự trù"
                      type="number"
                    ></v-text-field>
                  </v-col> -->

                    <v-col cols="12" v-if="editedIndex <= -1">
                      <v-autocomplete
                        v-model="editedItem.pharmacies"
                        :items="pharmacyOptions"
                        :item-text="
                          (item) => item.TENHANG + ' - ' + item.MADUOC
                        "
                        label="Dược"
                        return-object
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="12">
                      <v-combobox
                        v-model="editedItem.unit"
                        :items="unitIdList"
                        label="Đơn vị tính"
                        item-text="name"
                        item-value="id"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="editedItem.defineLevel"
                        label="Định mức"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="editedItem.MADUOCCHUNG"
                        label="Mã dược chung"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col v-if="checkMethod == 2021" cols="12" sm="12">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Giá"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" v-if="editedIndex <= -1">
                      <v-text-field
                        v-model="editedItem.amount"
                        label="Số lượng yêu cầu"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="12">
                      <v-combobox
                        v-model="editedItem.machineStock"
                        :items="machineList"
                        label="Kho/Máy"
                        item-text="name"
                        item-value="id"
                      ></v-combobox>
                    </v-col> -->

                    <v-col cols="12" v-if="editedIndex > -1">
                      <v-textarea
                        v-model="editedItem.description"
                        label="Mô tả"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.methodValue"
                        :items="methodOptions"
                        label="Phương thức"
                        item-text="name"
                        item-value="id"
                      ></v-select>
                    </v-col>

                    <!-- <v-col cols="12">
                      <v-combobox
                        v-model="editedItem.services"
                        :items="serviceOptions"
                        label="Dịch vụ"
                        multiple
                        chips
                        item-text="TENDICHVU"
                        item-value="DICHVU_ID"
                      ></v-combobox>
                    </v-col> -->
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
        <v-icon
          small
          v-if="item.NGAYTAO <= '31/12/2020'"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      dialogDelete: false,
      totalDesserts: 0,
      options: {},
      headers: [
        {
          text: "Tên hàng",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Mã hàng", value: "code", sortable: false },
        { text: "Mã dược chung", value: "MADUOCCHUNG", sortable: false },
        { text: "Định mức", value: "defineLevel", sortable: false },
        // { text: "Mức báo dự trù", value: "estimatedForecastLevel" },
        { text: "ĐV nhập", value: "DONVITINH", sortable: false },
        { text: "ĐV tính", value: "unit_name", sortable: false },
        // { text: "Kho / máy", value: "machineStock.name" },
        { text: "Số lượng", value: "SOLUONGYEUCAU", sortable: false },
        { text: "Phương thức", value: "method", sortable: false },
        { text: "Giá", value: "price", sortable: true },
        { text: "Ngày tạo", value: "NGAYTAO", sortable: false },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        defineLevel: "",
        MADUOCCHUNG: "",
        pharmacies: "",
        description: "",
        amount: null,
        unit: null,
        type: "",
        methodValue: "",
        price: "",
        // machineStock: null,
      },
      defaultItem: {
        defineLevel: "",
        MADUOCCHUNG: "",
        description: "",
        pharmacies: "",
        unit: null,
        amount: null,
        type: "",
        methodValue: "",
        price: "",
        // machineStock: null,
      },
      materialList: [],
      errors: "",
      serviceOptions: [],
      pharmacyOptions: [],
      machineList: [],
      unitIdList: [],
      //search for date
      start_date: "",
      end_date: "",
      formatted_start: "",
      selected_start: "",
      formatted_end: "",
      selected_end: "",
      errorDate: [],
      isSearching: true,
      methodOptions: [
        {
          id: "dinhmuc",
          name: "2021",
        },
        {
          id: "vattu",
          name: "2020",
        },
        {
          id: "muon_hc",
          name: "Mượn hóa chất",
        },
      ],
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Sửa";
    },
    checkMethod() {
      if (this.editedItem.methodValue.name !== undefined) {
        return this.editedItem.methodValue.name;
      } else {
        return this.editedItem.methodValue;
      }
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    options: {
      handler() {
        this.getMaterialList();
      },
      deep: true,
    },
  },

  created() {
    this.initialize();
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
    this.CallAPI(
      "get",
      "machine-stock/list?page=1&limit=99999&order_by=created_at&order_direction=asc",
      {},
      (response) => {
        this.machineList = response.data.data.data;
      }
    );
    this.CallAPI("get", "duoc/list?limit=99999", {}, (response) => {
      this.pharmacyOptions = response.data.data;
    });
    this.CallAPI(
      "get",
      "unit/list?page=1&limit=99999&order_by=created_at&order_direction=asc",
      {},
      (response) => {
        this.unitIdList = response.data.data.data;
      }
    );
  },

  methods: {
    getMaterialList() {
      this.desserts = [];
      this.isSearching = true;
      if (
        this.options.itemsPerPage != 5 &&
        this.options.itemsPerPage != 10 &&
        this.options.itemsPerPage != 15
      ) {
        this.options.itemsPerPage = 99999;
      }
      let params =
        "?page=" +
        this.options.page +
        "&limit=" +
        this.options.itemsPerPage +
        "&startDate=" +
        this.format(this.selected_start) +
        "&endDate=" +
        this.format(this.selected_end) +
        "&order_by=created_at&order_direction=desc";

      this.CallAPI("get", "material/list" + params, {}, (response) => {
        this.desserts = [];
        this.isSearching = false;
        this.materialList = response.data.data.data;
        this.totalDesserts = response.data.data.total;
        for (let item of this.materialList) {
          this.desserts.push({
            unit: item.unit,
            DONVITINH: item["DONVITINH"],
            MADUOCCHUNG: item["MADUOCCHUNG"],
            NGAYTAO: this.formatDate(item["NGAYTAO"]),
            SOLUONGYEUCAU: this.formatNumber(item["SOLUONGYEUCAU"]),
            code: item["code"],
            defineLevel: this.formatNumber(item["defineLevel"]),
            description: item["description"],
            id: item["id"],
            price: item["price"] ? this.formatNumber(item["price"]) : "",
            name: item["name"],
            services: item["services"],
            unit_name: item.unit.name,
            method:
              item.method.trim() == "vattu"
                ? "2020"
                : item.method.trim() == "dinhmuc"
                ? "2021"
                : "Mượn hóa chất",
            methodValue: item.method.trim(),
          });
        }
      });
    },
    initialize() {
      this.desserts = this.materialList;
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
        "material/delete/" + this.desserts[this.editedIndex].id,
        {},
        (response) => {
          if (response.data.error == "UNAUTHORIZED") {
            this.$toast.error("Không được phép!");
            return;
          }
          if (response.data.code == -1) {
            this.$toast.error("Xóa không thành công!");
            return;
          }
          this.$toast.success("Xóa thành công!");
          this.getMaterialList();
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
      // if (!this.editedItem.unit || !this.editedItem.machineStock) {
      //   this.errors = "Vui lòng nhập đủ thông tin!";
      //   return;
      // }

      if (this.editedIndex > -1) {
        let data = {
          defineLevel: this.editedItem.defineLevel,
          description: this.editedItem.description,
          unitId: this.editedItem.unit.id,
          MADUOCCHUNG: this.editedItem.MADUOCCHUNG,
          method: this.editedItem.methodValue,
          price: this.editedItem.price ? this.editedItem.price : "",
        };
        this.CallAPI(
          "put",
          "material/update/" + this.desserts[this.editedIndex].id,
          data,
          (response) => {
            if (response.data.error == "UNAUTHORIZED") {
              this.$toast.error("Không được phép!");
              return;
            }
            if (response.data.code == -1) {
              this.$toast.error("Không được phép!");
              return;
            }
            this.$toast.success("Sửa thành công!");
            this.getMaterialList();
            this.close();
          }
        );
      } else {
        let data = {
          DUOC_ID: this.editedItem.pharmacies.DUOC_ID,
          MA_DUOC: this.editedItem.pharmacies.MADUOC,
          MADUOCCHUNG: this.editedItem.MADUOCCHUNG,
          SOLUONGYEUCAU: this.editedItem.amount,
          defineLevel: this.editedItem.defineLevel,
          unitId: this.editedItem.unit.id,
          method: this.editedItem.methodValue,
          name: this.editedItem.pharmacies.TENHANG,
        };
        this.CallAPI("post", "material/create-after", data, (response) => {
          if (response.data.error == "UNAUTHORIZED") {
            this.$toast.error("Không được phép!");
            return;
          }
          if (response.data.code == -1) {
            this.$toast.error("Đã xảy ra lỗi: " + response.data.error);
            return;
          }
          this.$toast.success("Thêm thành công");
          this.getMaterialList();
          this.close();
        });
      }
    },
    onContext_start(ctx) {
      if (ctx.selectedDate != null) {
        this.formatted_start = new Date(ctx.selectedDate).toLocaleDateString(
          "en-GB"
        );
        this.selected_start = ctx.selectedYMD;
      }
    },
    onContext_end(ctx) {
      if (ctx.selectedDate != null) {
        this.formatted_end = new Date(ctx.selectedDate).toLocaleDateString(
          "en-GB"
        );
        this.selected_end = ctx.selectedYMD;
      }
    },
    format(date) {
      return date.split("/").reverse().join("-");
    },
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    show_list(e) {
      e.preventDefault();
      this.errorDate = [];
      this.selected_start = this.formatted_start;
      this.selected_end = this.formatted_end;
      if (!this.formatted_start || !this.formatted_end) {
        this.errorDate.push("Vui lòng nhập ngày cần tìm!");
        return;
      }
      this.getMaterialList();
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB");
    },
  },
};
</script>