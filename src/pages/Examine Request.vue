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
          <span v-if="!loading"
            >Tìm kiếm
            <i
              aria-hidden="true"
              class="v-icon notranslate mdi mdi-magnify theme--light"
            ></i
          ></span>
          <span v-if="loading">
            <div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Đang tìm...</span>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-xl-3 flex printer">
        <button
          class="btn btn-success"
          @click="export_excel"
          style="margin-right: 25px"
        >
          <i class="fas fa-file-excel" style="margin-right: 10px"></i> Xuất
          Excel
        </button>
        <button class="btn btn-success" @click="export_pdf">
          <i class="fas fa-file-pdf" style="margin-right: 10px"></i> Xuất PDF
        </button>
      </div>
    </div>
    <div class="row" v-if="errors != []">
      <div class="col-md-6">
        <div class="text-danger" v-for="item in errors" :key="item">
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
        :options.sync="options"
        :server-items-length="totalDesserts"
        no-data-text="Không có dữ liệu"
        class="elevation-1"
        :loading="loading"
        loading-text="Đang tải..."
      ></v-data-table>
    </v-card>
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
      options: {},
      totalDesserts: 0,
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
      loading: false,
      medthod: "",
      htmls: "",
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
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

  computed: {},
  methods: {
    getMaterialList() {
      this.loading = true;
      this.food = [];
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
        "&serviceGroup=1";
      this.CallAPI("get", "request/list" + params, {}, (response) => {
        let error = response.data.error;
        if (error == "START_DATE_NOT_GREATER_THAN_END_DATE") {
          this.errors.push("Ngày không hợp lệ!");
          return;
        }
        if (response.data.code === 1) {
          this.food = [];
          this.loading = false;
          this.list = response.data.data.data;
          this.totalDesserts = response.data.data.total;
          for (let item of this.list) {
            this.food.push({
              MAYTE: item.MAYTE,
              TENDICHVU: item.TENDICHVU,
              TENBENHNHAN: item.TENBENHNHAN,
              SOBENHAN: item.SOBENHAN,
              TENNHOMDICHVU: item.TENNHOMDICHVU,
              GIOITINH: item.GIOITINH == 1 ? "Nam" : "Nữ",
              NGAYSINH: this.formatDate(item.NGAYSINH),
              DIACHITHUONGTRU: item.DIACHITHUONGTRU,
              NGAYTAO: this.formatDate(item.NGAYTAO),
            });
          }

          this.htmls = `
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
        </tr>`;
          let i = 0;
          for (let item of this.food) {
            this.htmls += `
              <tr>
                 <td>${i++}</td>
                <td>${item.MAYTE}</td>
                <td>${item.SOBENHAN}</td>
                <td>${item.TENBENHNHAN}</td>
                <td>${item.TENDICHVU}</td>
                <td>${item.TENNHOMDICHVU}</td>
                <td>${item.GIOITINH}</td>
                <td>${item.NGAYSINH}</td>
                <td>${item.DIACHITHUONGTRU}</td>
                <td>${item.NGAYTAO}</td>
              </tr>
            `;
          }
          this.htmls += `
          <tr>
              <td colspan="10" height: 60px;></td>
            </tr>
            <tr>
              <td colspan="10" style="text-align: right;">Từ ngày...........................Đến ngày.........................</td>
            </tr>
             <tr><td colspan="11" style="height: 60px"></td></tr>
            <tr>
              <td colspan="2" style="text-align: center; font-style: italic; width: 20%"><b>Thủ kho</b><br>(Ký, ghi rõ họ tên)</td>
              <td style="text-align: center; font-style: italic; width: 20%"><b>Thống kê</b><br>(Ký, ghi rõ họ tên)</td>
              <td colspan="2" style="text-align: center; font-style: italic; width: 20%"><b>Trưởng khoa dược</b><br>(Ký, ghi rõ họ tên)</td>
              <td colspan="3" style="text-align: center; font-style: italic; width: 20%"><b>Kế toán trưởng</b><br>(Ký, ghi rõ họ tên)</td>
              <td colspan="3" style="text-align: center; font-style: italic; width: 20%"><b>Giám đốc</b><br>(Ký, ghi rõ họ tên)</td>
            </tr>
            <tr>
              <td colspan="2"  style="text-align: center; font-style: italic; width: 20% ; height: 80px;"></td>
              <td  style="text-align: center; font-style: italic; width: 20%"></td>
              <td colspan="2"  style="text-align: center; font-style: italic; width: 20%; height: 80px; " ></td>
              <td colspan="3"  style="text-align: center; font-style: italic; width: 20%; height: 80px; " ></td>
              <td colspan="3" style="text-align: center; font-style: italic; width: 20%; height: 80px;"></td>
            </tr>
          `;
        }
      });
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
    export_excel() {
      this.method = "export";
      this.selected_start = this.formatted_start;
      this.selected_end = this.formatted_end;
      this.getMaterialList();
      let title = ` <tr>
          <td colspan="10" style="text-align: left;">SỞ Y TẾ TP ĐÀ NẴNG</td>
        </tr>
        <tr>
          <th colspan="10" style="text-align: left;">BỆNH VIỆN Y HỌC CỔ TRUYỀN</th>
        </tr>
        <tr>
          <th colspan="10" style="height: 60px text-align: center;"><h2>BÁO CÁO YÊU CẦU XÉT NGHIỆM</h2></th>
        </tr>
        <tr>
          <td colspan="10" style="text-align: center;">Từ ngày ${
            this.selected_start ? this.selected_start : "01/01/2021"
          } Đến ngày ${
        this.selected_end
          ? this.selected_start
          : new Date().toLocaleDateString("en-GB")
      }</td>
        </tr>`;
      var uri = "data:application/vnd.ms-excel;base64,";
      var template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
      var base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      };
      var format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };

      var ctx = {
        worksheet: "Worksheet",
        table: `${title} ${this.htmls}`,
      };
      var link = document.createElement("a");
      link.download =
        "Báo cáo yêu cầu xét nghiệm ngày " +
        new Date().toLocaleDateString("en-GB") +
        ".xls";
      link.href = uri + base64(format(template, ctx));
      link.click();
    },
    show_list() {
      this.errors = [];
      this.selected_start = this.formatted_start;
      this.selected_end = this.formatted_end;
      this.getMaterialList();
    },
    export_pdf() {
      this.errors = [];
      this.method = "export";
      this.selected_start = this.formatted_start;
      this.selected_end = this.formatted_end;
      let title = ` <tr>
          <td colspan="10" style="text-align: left;">SỞ Y TẾ TP ĐÀ NẴNG</td>
        </tr>
        <tr>
          <th colspan="10" style="text-align: left;">BỆNH VIỆN Y HỌC CỔ TRUYỀN</th>
        </tr>
        <tr>
          <th colspan="10" style="height: 60px text-align: center;"><h2>BÁO CÁO YÊU CẦU XÉT NGHIỆM</h2></th>
        </tr>
        <tr>
          <td colspan="10" style="text-align: center;">Từ ngày ${
            this.selected_start ? this.selected_start : "01/01/2020"
          } Đến ngày ${
        this.selected_end
          ? this.selected_start
          : new Date().toLocaleDateString("en-GB")
      }</td>
        </tr>`;
      var printWindow = window.open("", "", "height=800,width=1400");
      printWindow.document.write(
        "<html><head> <title>Yêu cầu xét nghiệm</title>"
      );
      printWindow.document.write(
        `<style>
          table,
          td,
          th {
            border: 1px solid #999;
            text-align: center;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th,
          td {
            padding: 2px 5px;
          }
          body {
            font: 14px Calibri;
          }
         </style>`
      );
      printWindow.document.write(`</head><body>`);
      printWindow.document.write(`<table>${title} ${this.htmls}</table>`);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB");
    },
    initialize() {
      this.food = this.list;
    },
    formatNumber(number) {
      return new Intl.NumberFormat('de-DE').format(number);
    }
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

.long.primary,
.short.primary {
  background-color: #1867c0 !important;
  border-color: #1867c0 !important;
}
</style>