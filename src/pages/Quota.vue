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
        <v-toolbar-title>Định mức</v-toolbar-title>
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
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Định mức"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="editedItem.services"
                      :items="serviceOptions"
                      item-text="TENDICHVU"
                      item-value="DICHVU_ID"
                      label="Dịch vụ"
                      return-object
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="editedItem.pharmacies"
                      :items="pharmacyOptions"
                      item-text="TENHANG"
                      item-value="DUOC_ID"
                      label="Dược"
                      return-object
                    ></v-autocomplete>
                  </v-col>
                   <v-col cols="12">
                    <v-autocomplete
                      v-model="editedItem.machineStock"
                      :items="machineStockOptions"
                      item-text="name"
                      item-value="id"
                      label="Kho/ Máy"
                      return-object
                    ></v-autocomplete>
                  </v-col>
                   <v-col cols="12">
                    <v-autocomplete
                      v-model="editedItem.unit"
                      :items="unitOptions"
                      item-text="name"
                      item-value="id"
                      label="Đơn vị"
                      return-object
                    ></v-autocomplete>
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
          text: "Định mức",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Dịch vụ", value: "service_name" },
        { text: "Dược", value: "pharmacy_name" },
        { text: "Kho / Máy", value: "machineName" },
        { text: "Đơn vị", value: "unitName" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        services: "",
        pharmacies: "",
        machineStock: "",
        unit: "",
      },
      defaultItem: {
        name: "",
        services: "",
        pharmacies: "",
        machineStock: "",
        unit: "",
      },
      quotaList: [],
      errors: "",
      show: false,
      serviceOptions: [],
      pharmacyOptions: [],
      machineStockOptions: [],
      unitOptions: [],
    };
  },
  mounted() {
    this.CallAPI("get", "duoc/list?limit=99999", {}, (response) => {
      this.pharmacyOptions = response.data.data;
    });
    this.CallAPI("get", "machine-stock/list?limit=99999", {}, (response) => {
      this.machineStockOptions = response.data.data.data;
    });
    this.CallAPI("get", "unit/list?", {}, (response) => {
      this.unitOptions = response.data.data.data;
    })
    this.CallAPI("get", "dinhmuc/list-service?limit=999999", {}, (response) => {
      let data = response.data.data;
      for(let i = 0 ; i < data.length ; i++) {
        for(let item of data[i]) {
          this.serviceOptions.push(item);
        }
      }
    });
    this.getQuotaList();
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
    getQuotaList() {
      this.desserts = [];
      this.CallAPI(
        "get",
        "dinhmuc/list?page=1&limit=99999&order_by=created_at&order_direction=asc",
        {},
        (response) => {
          this.quotaList = response.data.data.data;
          for (let item of this.quotaList) {
            this.desserts.push({
              id: item.id,
              name: item.name,
              services: item.DICHVU[0],
              pharmacies: item.DUOC[0],
              service_name: item.DICHVU[0].TENDICHVU,
              pharmacy_name: item.DUOC[0].TENHANG,
              machineStock: item.Machine_Name,
              unit: item.Unit_Name,
              machineName: item.Machine_Name.name,
              unitName: item.Unit_Name.name,
            });
          }
        }
      );
    },
    initialize() {
      this.desserts = this.quotaList;
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
        "dinhmuc/delete/" + this.desserts[this.editedIndex].id,
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
          this.getQuotaList();
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
      const data = {
        name: this.editedItem.name,
        DICHVU_ID: this.editedItem.services.DICHVU_ID,
        DUOC_ID: this.editedItem.pharmacies.DUOC_ID,
        machine_stock_id: this.editedItem.machineStock.id,
        unit_id: this.editedItem.unit.id,
      };
      if (
        !this.editedItem.name ||
        !this.editedItem.services ||
        !this.editedItem.pharmacies ||
        !this.editedItem.machineStock ||
        !this.editedItem.unit
      ) {
        this.errors = "Vui lòng nhập đầy đủ thông tin!";
        return;
      }
      if (this.editedIndex > -1) {
        this.CallAPI(
          "put",
          "dinhmuc/update/" + this.desserts[this.editedIndex].id,
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
            this.getQuotaList();
            this.$toast.success("Sửa thành công");
            this.close();
          }
        );
      } else {
        this.CallAPI("post", "dinhmuc/create", data, (response) => {
          if (response.data.error == "UNAUTHORIZED") {
            this.$toast.error("Không được phép!");
            return;
          }
          if (response.data.code == -1) {
            this.$toast.error("Đã xảy ra lỗi: " + response.data.error);
            return;
          }
          this.getQuotaList();
          this.$toast.success("Thêm thành công");
          this.close();
        });
      }
    },
  },
};
</script>