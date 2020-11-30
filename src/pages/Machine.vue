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
        <v-toolbar-title>Kho / máy</v-toolbar-title>
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
                      label="Tên Kho/ Máy"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="editedItem.description"
                      label="Mô tả"
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
          text: "Tên kho / Máy",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Mô tả", value: "description" },
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
    initialize() {
      this.desserts = this.list;
    },
  getList() {
        this.desserts = [];
        
        this.CallAPI("get", "machine-stock/list", {}, (response) => {
        this.list = response.data.data.data;
        console.log(this.list);
        this.desserts = this.list;
      });
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
      let id = this.desserts[this.editedIndex].id;
      this.CallAPI("delete", "machine-stock/delete/" + id, {}, (response)=> {
        if(response.data.code == -1) {
          this.$toast.error("Không thể xóa bản ghi!");
          return ;
        }
        if(response.data.code == -100){
          this.$toast.error("Không có quyền xóa!");
          return ;
        }
        this.$toast.success("Xóa bản ghi thành công!");
        this.getList();
        this.closeDelete();
      })
      
      
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
        if(!this.editedItem.name || !this.editedItem.description) {
          this.$toast.error("Vui lòng điền đầy đủ thông tin!");
          return ;
        }
        let data = {
          name: this.editedItem.name,
          description: this.editedItem.description
        }
        let id = this.editedItem.id;
        this.CallAPI("put","machine-stock/update/" + id, data, (response)=>
        {
          if(response.data.code ==  -1) {
            this.$toast.error("Cập nhật không thành công!");
            return ;
          }
          if(response.data.code == -100) {
            this.$toast.error("Không có quyền sửa!");
            return ;
          }
          this.$toast.success("Cập nhật thành công!");
          this.getList();
          this.close();
        } )
      } else {
        if(!this.editedItem.name || !this.editedItem.description) {
          this.$toast.error("Vui lòng điền đầy đủ thông tin!");
          return ;
        }
        this.CallAPI(
          "post",
          "machine-stock/create",
          this.editedItem
          ,
          (response) => {
            console.log(response.data);
            if(response.data.code == -1) {
              this.$toast.error("Thêm bản ghi không thành công!");
              return ;
            }
            if(response.data.code == -100) {
              this.$toast.error("Không có quyền thêm!");
              return ;
            }
            this.$toast.success("Thêm bản ghi thành công!");
            this.getList();
            this.close();
          }
        );
      }
      
    },
  },
  mounted() {
   this.getList();
  },
};
</script>