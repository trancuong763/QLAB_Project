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
              v-on:change="formatDateSelected_start(formatted_start)"
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
              v-on:change="formatDateSelected_end(formatted_end)"
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
          <span v-if="isSearching">
            <div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Đang tìm...</span>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="row" v-if="errors != []">
      <div class="col-md-6">
        <div
          class="text-danger"
          style="margin-bottom: 15px"
          v-for="item in errors"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <v-card>
      <v-card-title>
        Danh sách yêu cầu xét nghiệm
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Tìm kiếm..."
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="food"
        :search="search"
        no-data-text="Không có dữ liệu"
      ></v-data-table>
    </v-card>
    <div id="export_pdf" style="display: none">
      <h3 class="text-center">
        Từ ngày {{ start_date }} đến ngày {{ end_date }}
      </h3>
      <table style="width: 1200px">
        <tr>
          <th>#</th>
          <th>Mã y tế</th>
          <th>Số bệnh án</th>
          <th>Tên bệnh nhân</th>
          <th>Tên dịch vụ</th>
          <th>Nhóm dịch vụ</th>
          <th>Giới tính</th>
          <th>Ngày sinh</th>
          <th>Địa chỉ thường trú</th>
          <th>Ngày tạo</th>
        </tr>
        <tr v-for="(item, index) in food" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.MAYTE }}</td>
          <td>{{ item.SOBENHAN }}</td>
          <td>{{ item.TENBENHNHAN }}</td>
          <td>{{ item.TENDICHVU }}</td>
          <td>{{ item.TENNHOMDICHVU }}</td>
          <td>{{ formatGender(item.GIOITINH) }}</td>
          <td>{{ formatDate(item.NGAYSINH) }}</td>
          <td>{{ item.DIACHITHUONGTRU }}</td>
          <td>{{ formatDate(item.NGAYTAO) }}</td>
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
      start_date: "",
      end_date: "",
      formatted_start: "",
      selected_start: "",
      formatted_end: "",
      selected_end: "",
      list: [],
      errors: [],
      isErrors: false,
      headers: [
        {
          text: "Mã y tế",
          align: "start",
          sortable: false,
          value: "MAYTE",
        },
        { text: "Số bệnh án", value: "SOBENHAN" },
        { text: "Tên bệnh nhân", value: "TENBENHNHAN" },
        { text: "Tên dịch vụ", value: "TENDICHVU" },
        { text: "Nhóm dịch vụ", value: "TENNHOMDICHVU" },
        { text: "Giới tính", value: "GIOITINH" },
        { text: "Ngày sinh", value: "NGAYSINH" },
        { text: "Địa chỉ thường trú", value: "DIACHITHUONGTRU" },
        { text: "Ngày tạo", value: "NGAYTAO" },
      ],
      food: [],
      isSearching: false,
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
  },
  computed: {},
  methods: {
    onContext_start(ctx) {
      if (ctx.selectedDate != null) {
        this.formatted_start = new Date(ctx.selectedDate).toLocaleDateString(
          "en-GB"
        );
        this.selected_start = ctx.selectedYMD;
      }
    },
    formatDateSelected_start(date) {
      this.start_date = date.split("/").reverse().join("-");
    },
    onContext_end(ctx) {
      if (ctx.selectedDate != null) {
        this.formatted_end = new Date(ctx.selectedDate).toLocaleDateString(
          "en-GB"
        );
        this.selected_end = ctx.selectedYMD;
      }
    },
    formatDateSelected_end(date) {
      this.end_date = date.split("/").reverse().join("-");
    },
    getList() {
      this.isSearching = true;
      this.food = [];
      this.CallAPI(
        "get",
        `request/list?limit=9999999999&startDate=${this.selected_start}&endDate=${this.selected_end}&serviceGroup=1`,
        {},
        (response) => {
          this.isSearching = false;
          let error = response.data.error;
          if (error == "START_DATE_NOT_GREATER_THAN_END_DATE") {
            this.errors.push("Ngày không hợp lệ!");
            return;
          }
          if (response.data.code === 1) {
            this.list = response.data.data.data;
            for (let item of this.list) {
              this.food.push({
                MAYTE: item.MAYTE,
                TENDICHVU: item.TENDICHVU,
                TENBENHNHAN: item.TENBENHNHAN,
                SOBENHAN: item.SOBENHAN,
                TENNHOMDICHVU: item.TENNHOMDICHVU,
                GIOITINH: this.formatGender(item.GIOITINH),
                NGAYSINH: this.formatDate(item.NGAYSINH),
                DIACHITHUONGTRU: item.DIACHITHUONGTRU,
                NGAYTAO: this.formatDate(item.NGAYTAO),
              });
            }
          }
        }
      );
    },
    export_excel(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.start_date || !this.end_date) {
        this.errors.push("Vui lòng nhập ngày cần tìm!");
        return;
      }
      this.errors = [];
      this.CallAPI(
        "post",
        "request/export",
        {
          startDate: this.start_date,
          endDate: this.end_date,
          serviceGroup: 1,
        },
        (response) => {
          let error = response.data.error;
          if (error == "START_DATE_NOT_GREATER_THAN_END_DATE") {
            this.errors.push("Ngày không hợp lệ!");
          }
          if (response.data.code == 1) {
            window.open(`${response.data.data.path}`, "_self");
          }
        }
      );
    },
    show_list(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.start_date || !this.end_date) {
        this.errors.push("Vui lòng nhập ngày cần tìm!");
        return;
      }
      this.errors = [];
      this.getList();
    },
    export_pdf(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.start_date || !this.end_date) {
        this.errors.push("Vui lòng nhập ngày cần tìm!");
        return;
      }
      this.errors = [];
      var printWindow = window.open("", "", "height=400,width=1200");
      printWindow.document.write(
        "<html><head><title>Danh sách yêu cầu xét nghiệm</title>"
      );
      printWindow.document.write(
        "<style>table,td,th{border: 1px solid #ddd;text-align: left;}table {border-collapse: collapse;width: 100%;}th, td {padding: 15px;}</style>"
      );
      printWindow.document.write("</head><body>");
      printWindow.document.write(
        this.$el.querySelector("#export_pdf").innerHTML
      );
      printWindow.document.write("</body></html>");
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB");
    },
    formatGender(value) {
      if (value == 1) {
        return "Nam";
      } else {
        return "Nữ";
      }
    },
  },
  mounted() {},
};
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 999;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  top: 50%;
  left: 50%;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>