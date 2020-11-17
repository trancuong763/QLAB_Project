<template>
  <div>
    <div style="margin: 0 0 30px 0">
      <button
        class="btn btn-success"
        style="
          display: flex;
          align-items: center;
          padding-left: 30px;
          padding-right: 30px;
        "
      >
        Nhập kho
      </button>
    </div>
    <v-card >
      <v-tabs
        v-model="tab"
        background-color=" accent-4"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Hóa chất nhập kho
          <v-icon>mdi-file-export</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          phiếu nhập kho
          <v-icon>mdi-calendar-text</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :value="'tab-1'">
          <v-card flat>
            <v-card-text>
              <div class="flex" style="margin: 20px 0">
                <div style="margin-right: 20px">
                  <button
                    class="btn btn-success"
                    style="
                      display: flex;
                      align-items: center;
                      padding-left: 30px;
                      padding-right: 30px;
                    "
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-printer-fill"
                      style="margin-right: 5px"
                      fill="currentColor"
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
                    In danh sách
                  </button>
                </div>
                <div>
                  <button
                    class="btn btn-success"
                    style="
                      display: flex;
                      align-items: center;
                      padding-left: 30px;
                      padding-right: 30px;
                    "
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      style="margin-right: 5px"
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
              <v-card>
                <v-card-title>
                  Danh sách nhập kho
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search_1"
                    append-icon="mdi-magnify"
                    label="Tìm kiếm..."
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers_1"
                  :items="desserts_1"
                  :search="search_1"
                ></v-data-table>
              </v-card>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-tabs-items v-model="tab">
        <v-tab-item :value="'tab-2'">
          <v-card flat>
            <v-card-text>
              <div class="flex" style="margin: 20px 0">
                <div style="margin-right: 20px">
                  <button
                    class="btn btn-success"
                    style="
                      display: flex;
                      align-items: center;
                      padding-left: 30px;
                      padding-right: 30px;
                    "
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-printer-fill"
                      style="margin-right: 5px"
                      fill="currentColor"
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
                    In danh sách
                  </button>
                </div>
                <div>
                  <button
                    class="btn btn-success"
                    style="
                      display: flex;
                      align-items: center;
                      padding-left: 30px;
                      padding-right: 30px;
                    "
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      style="margin-right: 5px"
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
              <v-card>
                <v-card-title>
                  Phiếu nhập kho
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search_2"
                    append-icon="mdi-magnify"
                    label="Tìm kiếm..."
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers_2"
                  :items="desserts_2"
                  :search="search_2"
                ></v-data-table>
              </v-card>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
      search_1: "",
      headers_1: [
        {
          text: "STT",
          align: "start",
          sortable: false,
          value: "stt",
        },
        {
          text: "Mã hóa chất",
          align: "start",
          sortable: false,
          value: "ma",
        },
        { text: "Tên hóa chất", value: "ten" },
        { text: "Người tạo", value: "nguoitao" },

        { text: "Kho/Máy", value: "khomay" },
        { text: "ĐVT", value: "dvt" },
        { text: "Mức báo dự trù", value: "mucbao" },
        { text: "Tồn kho", value: "tonkho" },
        { text: "Dự trù", value: "dutru" },
      ],
      desserts_1: [
        {
          stt: 1,
          ma: "ma1",
          ten: "la la",
          nguoitao: "Hoàng Công Sơn",
          dvt: 5,
          khomay: 3,
          dinhmuc: 3,
          mucbao: 5,
          tonkho: 100,
          dutru: 99,
        },
      ],
      search_2: "",
      headers_2: [
        {
          text: "STT",
          align: "start",
          sortable: false,
          value: "stt",
        },
        {
          text: "Mã hóa chất",
          align: "start",
          sortable: false,
          value: "ma",
        },
        { text: "Tên hóa chất", value: "ten" },
        { text: "Người tạo", value: "nguoitao" },

        { text: "Kho/Máy", value: "khomay" },
        { text: "ĐVT", value: "dvt" },
        { text: "Mức báo dự trù", value: "mucbao" },
        { text: "Tồn kho", value: "tonkho" },
        { text: "Dự trù", value: "dutru" },
      ],
      desserts_2: [
        {
          stt: 1,
          ma: "ma2",
          ten: "la la",
          nguoitao: "Hoàng Công Sơn",
          dvt: 5,
          khomay: 3,
          dinhmuc: 3,
          mucbao: 5,
          tonkho: 100,
          dutru: 99,
        },
      ],
    };
  },
};
</script>