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
      sort-by="calories"
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
            <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" style="display:" v-on="on">
              Thêm mới
            </v-btn>
          </template> -->
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
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="editedItem.defineLevel"
                        label="Định mức"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.estimatedForecastLevel"
                      label="Mức báo dự trù"
                      type="number"
                    ></v-text-field>
                  </v-col> -->
                    <v-col cols="12" sm="12">
                      <v-combobox
                        v-model="editedItem.unit"
                        :items="unitIdList"
                        label="Đơn vị tính"
                        item-text="name"
                        item-value="id"
                      ></v-combobox>
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
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.description"
                        label="Mô tả"
                      ></v-textarea>
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
        <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
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
      headers: [
        {
          text: "Tên hàng",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Mã hàng", value: "code" },
        { text: "Định mức", value: "defineLevel" },
        // { text: "Mức báo dự trù", value: "estimatedForecastLevel" },
        { text: "ĐVT", value: "unit_name" },
        // { text: "Kho / máy", value: "machineStock.name" },
        { text: "Số lượng", value: "SOLUONGYEUCAU" },
        { text: "Ngày tạo", value: "NGAYTAO" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        defineLevel: "",
        description: "",
        unit: null,
        // machineStock: null,
      },
      defaultItem: {
        defineLevel: "",
        description: "",
        unit: null,
        // machineStock: null,
      },
      materialList: [],
      errors: "",
      serviceOptions: [],
      machineList: [],
      unitIdList: [],
      //search for date
      start_date: "",
      end_date: "",
      formatted_start: new Date().toLocaleDateString(),
      selected_start: new Date().toLocaleDateString(),
      formatted_end: new Date().toLocaleDateString(),
      selected_end: new Date().toLocaleDateString(),
      errorDate: [],
      isSearching: false,
    };
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

  mounted() {
    this.getMaterialList();
    this.CallAPI("get", "dinhmuc/list-service?limit=999999", {}, (response) => {
      let data = response.data.data;
      for(let i = 0 ; i < data.length ; i++) {
        for(let item of data[i]) {
          this.serviceOptions.push(item);
        }
      }
    })
    this.CallAPI(
      "get",
      "machine-stock/list?page=1&limit=99999&order_by=created_at&order_direction=asc",
      {},
      (response) => {
        this.machineList = response.data.data.data;
      }
    );
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
      this.CallAPI(
        "get",
        `material/list?page=1&limit=99999&startDate=${this.format(this.selected_start)}&endDate=${this.format(this.selected_end)}&order_by=created_at&order_direction=asc`,
        {},
        (response) => {
          this.isSearching = false;
          this.materialList = response.data.data.data;
          for (let item of this.materialList) {
            this.desserts.push({
              unit: item.unit,
              NGAYTAO: this.formatDate(item["NGAYTAO"]),
              SOLUONGYEUCAU: item["SOLUONGYEUCAU"],
              code: item["code"],
              defineLevel: item["defineLevel"],
              description: item["description"],
              id: item["id"],
              name: item["name"],
              services: item["services"],
              unit_name: item.unit.name,
            });
          }
        }
      );
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
      const data = {
        defineLevel: this.editedItem.defineLevel,
        description: this.editedItem.description,
        unitId: this.editedItem.unit.id,
      };
      if (this.editedIndex > -1) {
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
              this.$toast.error("Đã xảy ra lỗi: " + response.data.error);
              return;
            }
            this.$toast.success("Sửa thành công!");
            this.getMaterialList();
            this.close();
          }
        );
      } else {
        this.CallAPI("post", "material/create", data, (response) => {
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
    show_list(e) {
      e.preventDefault();
      this.errorDate = [];
      this.selected_start = this.formatted_start
      this.selected_end = this.formatted_end
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