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
        ></div>
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
        :options.sync="options"
        :server-items-length="totalDesserts"
        loading-text="Đang tải..."
      >
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
        { text: "Chứng từ", value: "CHUNGTU_ID" },
        { text: "Chứng từ chi tiết", value: "CHUNGTUCHITIET_ID" },
        { text: "Số lượng yêu cầu", value: "SOLUONGYEUCAU" },
        { text: "Số lượng tổng hợp thực tế", value: "SOLUONGTONGHOPTHUCTE" },
        { text: "Ngày tạo", value: "NGAYTAO" }
      ],
      desserts: [],
      editedIndex: -1,
      totalDesserts: 0,
      options: {},
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
      HISList: [],
      errors: "",
      show: false,
      htmls: "",
      method: "",
      loading: false,
      listExport: []
    };
  },
  mounted() {
    this.getListExport();
  },
  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    options: {
      handler() {
        this.getListHIS();
      },
      deep: true
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    getListHIS() {
      this.loading = true;
      this.desserts = [];
      if (
        this.options.itemsPerPage != 5 &&
        this.options.itemsPerPage != 10 &&
        this.options.itemsPerPage != 15
      ) {
        this.options.itemsPerPage = 99999;
      }
      let params =
        "?page=" + this.options.page + "&limit=" + this.options.itemsPerPage;
      this.CallAPI("get", "request/list-phieulinh" + params, {}, response => {
        document.querySelectorAll(".printer button")[0].disabled = false;
        document.querySelectorAll(".printer button")[1].disabled = false;
        this.loading = false;
        this.HISList = response.data.data.data;
        this.totalDesserts = response.data.data.total;
        for (let item of this.HISList) {
          this.desserts.push({
            DUOC_ID: item.DUOC_ID,
            CHUNGTU_ID: item.CHUNGTU_ID,
            Inventory: this.formatNumber(item.Inventory),
            CHUNGTUCHITIET_ID: item.CHUNGTUCHITIET_ID,
            MADUOC: item.MADUOC,
            NGAYTAO: this.formatDate(item.NGAYTAO),
            SOLUONGTONGHOPTHUCTE: this.formatNumber(item.SOLUONGTONGHOPTHUCTE),
            SOLUONGYEUCAU: this.formatNumber(item.SOLUONGYEUCAU),
            TENHANG: item.TENHANG
          });
        }
      });
    },
    getListExport() {
      this.desserts = [];
      let params =
        "?page=" +
        this.options.page +
        "&limit=" +
        this.options.itemsPerPage +
        "&method=export";
      this.CallAPI("get", "request/list-phieulinh" + params, {}, response => {
        document.querySelectorAll(".printer button")[0].disabled = false;
        document.querySelectorAll(".printer button")[1].disabled = false;
        this.loading = false;
        let list = response.data.data.data;
        this.totalDesserts = response.data.data.total;
        for (let item of list) {
          this.listExport.push({
            DUOC_ID: item.DUOC_ID,
            CHUNGTU_ID: item.CHUNGTU_ID,
            Inventory: this.formatNumber(item.Inventory),
            CHUNGTUCHITIET_ID: item.CHUNGTUCHITIET_ID,
            MADUOC: item.MADUOC,
            NGAYTAO: this.formatDate(item.NGAYTAO),
            SOLUONGTONGHOPTHUCTE: this.formatNumber(item.SOLUONGTONGHOPTHUCTE),
            SOLUONGYEUCAU: this.formatNumber(item.SOLUONGYEUCAU),
            TENHANG: item.TENHANG
          });
        }
        this.htmls = `
            <tr>
              <td colspan="8">SỞ Y TẾ TP ĐÀ NẴNG</td>
            </tr>
            <tr>
              <td colspan="8"><b>BỆNH VIỆN Y HỌC CỔ TRUYỀN</b></td>
            </tr>
            <tr>
              <th colspan="8"><h2>Phiếu lĩnh</h2></th>
            </tr>
            <tr>
              <td colspan="8" style="text-align: center">Từ ngày ..................... đến ngày ..................... </td>
            </tr>
            <tr>
              <td colspan="8" style="text-align: center"><b>Phạm vi: Kho khoa xét nghiệm</b></td>
            </tr>
            <tr>
              <td style="height: 40px"></td>
            </tr>
            <tr class="boder">
                <th>STT</th>
                <th>Tên hàng</th>
                <th>Mã dược</th>
                <th>Chứng từ</th>
                <th>Chứng từ chi tiết</th>
                <th>Số lượng yêu cầu</th>
                <th>Số lượng tổng hợp thực tế</th>
                <th>Ngày tạo</th>
            </tr>
        `;
        for (let [index, item] of this.listExport.entries()) {
          this.htmls += `
                <tr class="boder">
                    <td style="text-align: center">${index + 1}</td>
                    <td>${item.TENHANG}</td>
                    <td>${item.MADUOC}</td>
                    <td>${item.CHUNGTU_ID}</td>
                    <td>${item.CHUNGTUCHITIET_ID}</td>
                    <td>${item.SOLUONGYEUCAU}</td>
                    <td>${item.SOLUONGTONGHOPTHUCTE}</td>
                   <td>${item.NGAYTAO}</td>
                </tr>
            `;
        }
        this.htmls += `
            <tr>
              <td colspan="8" style="text-align: right; height: 60px">Ngày ........ tháng ........ năm ........... <td>
            </tr>
            <tr><td colspan="8" style="height: 60px"></td></tr>
            <tr>
              <td colspan="2" style="text-align: center; font-style: italic; width: 20%"><b>Thủ kho</b><br>(Ký, ghi rõ họ tên)</td>
              <td style="text-align: center; font-style: italic; width: 20%"><b>Thống kê</b><br>(Ký, ghi rõ họ tên)</td>
              <td colspan="2" style="text-align: center; font-style: italic; width: 20%"><b>Trưởng khoa dược</b><br>(Ký, ghi rõ họ tên)</td>
              <td colspan="2" style="text-align: center; font-style: italic; width: 20%"><b>Kế toán trưởng</b><br>(Ký, ghi rõ họ tên)</td>
              <td colspan="2" style="text-align: center; font-style: italic; width: 20%"><b>Giám đốc</b><br>(Ký, ghi rõ họ tên)</td>
            </tr>
          `;
      });
    },
    initialize() {
      this.desserts = this.HISList;
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
        "Báo cáo phiếu lĩnh ngày " +
        new Date().toLocaleDateString("en-GB") +
        ".xls";
      link.href = uri + base64(format(template, ctx));
      link.click();
    },
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB");
    },
    export_pdf(e) {
      e.preventDefault();
      this.getListExport();
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
        `<title>Báo cáo phiếu lĩnh ngày ${new Date().toLocaleDateString(
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
