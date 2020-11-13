<template>
  <div>
    <div style="margin: 20px 0;">
      <button
        class="btn btn-success"
        style="padding-left: 30px; padding-right: 30px;"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-printer-fill"
          fill="currentColor"
          style="margin-right: 5px;"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5z" />
          <path
            fill-rule="evenodd"
            d="M11 9H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"
          />
          <path
            fill-rule="evenodd"
            d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"
          />
        </svg>
        In Danh Sách
      </button>
      <button
        class="btn btn-success"
        style="padding-left: 30px; padding-right: 30px; margin-left: 30px;"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-file-earmark-excel-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          style="margin-right: 5px;"
        >
          <path
            fill-rule="evenodd"
            d="M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7.5 1.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z"
          />
        </svg>
        Xuất Excel
      </button>
    </div>
    <v-card>
      <v-card-title>
        Danh sách hóa chất hết hạn
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
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Mã hóa chất",
          align: "start",
          sortable: false,
          value: "ma",
        },
        { text: "Tên hóa chất", value: "ten" },
        { text: "Người tạo", value: "nguoitao" },
        { text: "Kho/Máy", value: "khomay" },
        { text: "Định mức", value: "dinhmuc" },
        { text: "Mức báo dự trù", value: "dubao" },
        { text: "Số chứng từ", value: "chungtu" },
        { text: "Hạn sử dụng", value: "hansd" },
        { text: "Trạng thái", value: "trangthai" },
      ],
      food: [
        {
          ma: "hc01",
          ten: "con cá to đùng",
          nguoitao: "Hoàng Công Sơn",
          khomay: "la la la",
          dinhmuc: "5.5%",
          dubao: "khong co",
          chungtu: "khong co",
          hansd: "24/08/2025",
          trangthai: "Hoạt động",
        },
        {
          ma: "hc01",
          ten: "con cá to đùng",
          nguoitao: "Hoàng Công Sơn",
          khomay: "la la la",
          dinhmuc: "5.5%",
          dubao: "khong co",
          chungtu: "khong co",
          hansd: "24/08/2025",
          trangthai: "Hoạt động",
        },
        {
          ma: "hc01",
          ten: "con cá to đùng",
          nguoitao: "Hoàng Công Sơn",
          khomay: "la la la",
          dinhmuc: "4.5%",
          dubao: "khong co",
          chungtu: "khong co",
          hansd: "24/08/2025",
          trangthai: "Hoạt động",
        },
      ],
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
</style>