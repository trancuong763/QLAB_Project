<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="description"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Đơn vị</v-toolbar-title>
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
                      label="Tên đơn vị"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      name="input-7-1"
                      label="Miêu tả"
                      v-model="editedItem.description"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                </v-row>
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
      list: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Tên đơn vị",
          align: "start",
          value: "name",
        },
        { text: "Miêu tả", value: "description", sortable: false },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        description: "",
      },
      defaultItem: {
        name: "",
        description: "",
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
    initialize() {
      this.desserts = this.list;
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
      let id = this.editedItem.id;
      console.log(id);
      this.CallAPI("delete", "unit/delete/" + id, {}, (response) => {
        console.log(response.data);
        if (response.data.code == -1) {
          this.$toast.error("Xóa bản ghi không thành công!");
          return;
        }
        if (response.data.code == -100) {
          this.$toast.error("Không có quyền xóa bản ghi!");
          return;
        }
        this.$toast.success("Xóa bản ghi thành công!");
        this.desserts.splice(this.editedIndex, 1);
      });
      this.closeDelete();
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
        let data = {
          name: this.editedItem.name,
          description: this.editedItem.description,
        };
        
        let id = this.editedItem.id;
        console.log(data,id)
        if (!data.name || !data.description) {
          this.$toast.error("Vui lòng nhập đầy đủ thông tin!");
          return;
        }
        this.CallAPI("put", "unit/update/" + id, data, (response) => {
          console.log(response.data);
          if (response.data.code == -1) {
            this.$toast.error("Cập nhật không thành công!");
            return;
          }
          if (response.data.code == -100) {
            this.$toast.error("Không có quyền sửa bản ghi!");
            return;
          }
          this.$toast.success("Cập nhật thành công!");
        });
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        let data = {
          name: this.editedItem.name,
          description: this.editedItem.description,
        };
        if (!data.name || !data.description) {
          this.$toast.error("Vui lòng nhập đầy đủ thông tin!");
          return;
        }
        this.CallAPI("post", "unit/create", data, (response) => {
          console.log(response.data);
          if (response.data.code == -1) {
            this.$toast.error("Thêm bản ghi không thành công!");
            return;
          }
          if (response.data.code == -100) {
            this.$toast.error("Không có quyền thêm bản ghi!");
            return;
          }
          this.$toast.success("Thêm bản ghi thành công!");
        });
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
  mounted() {
    this.CallAPI("get", "unit/list", {}, (response) => {
      let list = response.data.data.data;
      console.log(list);
      for (let item of list) {
        this.list.push({
          id: item.id,
          name: item.name,
          description: item.description,
        });
      }
    });
  },
};
</script>