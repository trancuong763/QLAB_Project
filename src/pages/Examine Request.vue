<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <button class="btn btn-success" @click="export_excel">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-file-earmark-excel-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7.5 1.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z"
            />
          </svg>
          Xuất Excel
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div>
          <label for="start_date">Từ ngày</label>
          <b-form-datepicker
            id="start_date"
            v-model="start_date"
            class="mb-2"
            label-no-date-selected="Chưa ngày nào được chọn"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="col-md-3">
        <div>
          <label for="end_date">Đến ngày</label>
          <b-form-datepicker
            id="end_date"
            v-model="end_date"
            class="mb-2"
            label-no-date-selected="Chưa ngày nào được chọn"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="col-md-3">
        <label for="">&nbsp;</label><br>
        <div class="btn btn-light looking" @click="show_list">
          <span v-if="!isSearching"
            >Tìm kiếm
            <i
              aria-hidden="true"
              class="v-icon notranslate mdi mdi-magnify theme--light"
            ></i
          ></span>
          <span v-if="isSearching">
            <div  class="spinner-border text-secondary" role="status">
  <span class="sr-only">Đang tìm...</span>
</div>
          </span>
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-md-4">
         <div>
    <label for="start_date">Từ ngày</label>
    <b-input-group class="mb-3">
      <b-form-input
        id="start_date"
        v-model="start_date"
        type="text"
        placeholder="DD-MM-YYYY"

        autocomplete="off"
      ></b-form-input>
      <b-input-group-append>
        <b-form-datepicker
          v-model="start_date"
          button-only
          aria-controls="start_date"
          @context="onContext"
        ></b-form-datepicker>
      </b-input-group-append>
    </b-input-group>
    <p class="mb-1">Value: '{{ start_date}}'</p>
    <p class="mb-1">Selected: '{{ selected }}'</p>
    <p>Formatted: '{{ formatted }}'</p>
  </div>
      </div>
    </div> -->
    <div class="row" v-if="errors != []">
      <div class="col-md-6">
        <div
          class="alert alert-danger"
          role="alert"
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
    <div id="export_excel" style="display: none">
      <table style="width: 1200px">
        <tr>
          <th>#</th>
          <th>Mã y tế</th>
          <th>Tên dịch vụ</th>
          <th>Nhóm dịch vụ</th>
          <th>Số bệnh án</th>
          <th>Giới tính</th>
          <th>Ngày sinh</th>
          <th>Địa chỉ thường trú</th>
          <th>Ngày tạo</th>
        </tr>
        <tr v-for="(item, index) in food" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.MAYTE }}</td>
          <td>{{ item.TENDICHVU }}</td>
          <td>{{ item.TENNHOMDICHVU }}</td>
          <td>{{ item.SOBENHAN }}</td>
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
      formatted: '',
      selected: '',
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
  methods: {
      onContext(ctx) {
        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted
        // The following will be an empty string until a valid date is entered
        this.selected = ctx.selectedYMD
      },
    getList() {
      this.isSearching = true;
      this.food = [];
      this.CallAPI(
        "get",
        `request/list?limit=9999999999&startDate=${this.start_date}&endDate=${this.end_date}&serviceGroup=1`,
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
</style>