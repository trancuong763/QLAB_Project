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
                  <v-col cols="12" sm="12">
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
                  </v-col>
                  <v-col cols="12" sm="6">
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
                  <v-col cols="12" sm="6">
                    <v-combobox
                      v-model="editedItem.unit"
                      :items="unitIdList"
                      label="Đơn vị tính"
                      item-text="name"
                      item-value="id"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-combobox
                      v-model="editedItem.machineStock"
                      :items="machineList"
                      label="Kho/Máy"
                      item-text="name"
                      item-value="id"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="editedItem.description"
                      label="Mô tả"
                    ></v-textarea>
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
      <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
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
          text: "Tên hàng",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Mã hàng", value: "code" },
        { text: "Định mức", value: "defineLevel" },
        // { text: "Mức báo dự trù", value: "estimatedForecastLevel" },
        { text: "ĐVT", value: "unit.name" },
        { text: "Kho / máy", value: "machineStock.name" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        code: "",
        defineLevel: "",
        estimatedForecastLevel: "",
        description: "",
        unit: null,
        machineStock: null,
        services: [],
      },
      defaultItem: {
        name: "",
        code: "",
        defineLevel: "",
        estimatedForecastLevel: "",
        description: "",
        unit: null,
        machineStock: null,
        services: [],
      },
      materialList: [],
      errors: "",
      serviceOptions: [],
      machineList: [],
      unitIdList: [],
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
    this.CallAPI("get", "service/list?limit=99999", {}, (response) => {
      this.serviceOptions = response.data.data.data;
    });
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
      this.CallAPI(
        "get",
        "material/list?page=1&limit=99999&order_by=created_at&order_direction=asc",
        {},
        (response) => {
          this.materialList = response.data.data.data;
          this.desserts = response.data.data.data;
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
      if (
        !this.editedItem.name ||
        !this.editedItem.code ||
        !this.editedItem.defineLevel ||
        !this.editedItem.estimatedForecastLevel ||
        !this.editedItem.description ||
        !this.editedItem.unit ||
        !this.editedItem.machineStock ||
        !this.editedItem.services[0]
      ) {
        this.errors = "Vui lòng nhập đủ thông tin!";
        return;
      }
      const data = {
        name: this.editedItem.name,
        code: this.editedItem.code,
        defineLevel: this.editedItem.defineLevel,
        estimatedForecastLevel: this.editedItem.estimatedForecastLevel,
        description: this.editedItem.description,
        unitId: this.editedItem.unit.id,
        machineStockId: this.editedItem.machineStock.id,
        services: this.editedItem.services,
      };
      if (this.editedIndex > -1) {
        this.CallAPI(
          "put",
          "material/update/" + this.desserts[this.editedIndex].id,
          data,
          (response) => {
            if (response.data.error == "CODE_EXISTED") {
              this.errors = "Mã hàng đã tồn tại!";
              return;
            }
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
          if (response.data.error == "CODE_EXISTED") {
            this.errors = "Mã hàng đã tồn tại!";
            return;
          }
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
  },
};
</script>