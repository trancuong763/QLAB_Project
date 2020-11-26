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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Tên hàng"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.code"
                      label="Mã hàng"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.defineLevel"
                      label="Định mức"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.estimatedForecastLevel"
                      label="Mức báo dự trù"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Mô tả"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-combobox
                      v-model="editedItem.unitId"
                      :items="unitIdList"
                      label="Đơn vị tính"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12">
                    <v-combobox
                      v-model="editedItem.machineStockId"
                      :items="machineList"
                      label="Kho/Máy"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12">
                    <v-combobox
                      v-model="editedItem.services"
                      :items="serviceOptions"
                      label="Dịch vụ"
                      multiple
                      chips
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
          text: "Tên hàng",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Mã hàng", value: "code" },
        { text: "Định mức", value: "defineLevel" },
        { text: "Mức báo dự trù", value: "estimatedForecastLevel" },
        { text: "Mô tả", value: "description" },
        { text: "ĐVT", value: "unitId" },
        { text: "Kho / máy", value: "machineStockId" },
        // { text: "Dịch vụ", value: "services" },
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
        unitId: "",
        machineStockId: "",
        services: [],
      },
      defaultItem: {
        name: "",
        code: "",
        defineLevel: "",
        estimatedForecastLevel: "",
        description: "",
        unitId: "",
        machineStockId: "",
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
    this.CallAPI(
      "get",
      "material/list?order_by=created_at&order_direction=asc",
      {},
      (response) => {
        this.materialList = response.data.data.data;
        this.desserts = this.materialList;
      }
    );
    this.CallAPI("get", "service/list?", {}, (response) => {
      for (let item of response.data.data.data) {
        this.serviceOptions.push(item["DICHVU_ID"]);
      }
    });
    this.CallAPI(
      "get",
      "machine-stock/list?order_by=created_at&order_direction=asc",
      {},
      (response) => {
        for (let item of response.data.data.data) {
          this.machineList.push(item.id);
        }
      }
    );
    this.CallAPI(
      "get",
      "unit/list?order_by=created_at&order_direction=asc",
      {},
      (response) => {
        for (let item of response.data.data.data) {
          this.unitIdList.push(item.id);
        }
      }
    );
  },

  methods: {
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
          if (response.data.code == -1) {
            this.$toast.error("Xóa không thành công");
            return;
          }
          this.$toast.success("Xóa thành công");
          this.desserts.splice(this.editedIndex, 1);
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
      if (this.editedIndex > -1) {
        this.CallAPI(
          "put",
          "material/update/" + this.desserts[this.editedIndex].id,
          this.editedItem,
          (response) => {
            if (response.data.code == -1) {
              this.$toast.error("Sửa không thành công");
              return;
            }
            this.$toast.success("Sửa thành công");
            Object.assign(this.desserts[this.editedIndex], this.editedItem);
            this.close();
          }
        );
      } else {
        console.log(this.editedItem);
        this.CallAPI("post", "material/create", this.editedItem, (response) => {
          if (response.data.code == -1) {
            this.$toast.error("Đã xảy ra lỗi");
            return;
          }
          this.$toast.success("Thêm thành công");
          this.desserts.push(this.editedItem);
          this.close();
        });
      }
    },
  },
};
</script>