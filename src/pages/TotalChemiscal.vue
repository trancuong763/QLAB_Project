<template>
  <v-card>
    <v-card-title>
      Tổng hợp vật tư, hóa chất
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
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Mã hàng',
            align: 'start',
            sortable: false,
            value: 'ma',
          },
          { text: 'Tên hàng', value: 'ten' },
          { text: 'Người tạo', value: 'nguoitao' },
          { text: 'ĐVT', value: 'dvt' },
          { text: 'Kho/Máy', value: 'khomay' },
          { text: 'Định mức', value: 'dinhmuc' },
          { text: 'Mức báo dự trù', value: 'mucbao' },
          { text: 'Tồn đầu', value: 'tondau' },
          { text: 'Nhập trong kỳ', value: 'nhaptrongky' },
          { text: 'Xuất trong kỳ', value: 'xuattrongky' },
          { text: 'Tồn cuối kỳ', value: 'toncuoiky' },
          { text: 'Dự trù', value: 'dutru' },
        ],
        desserts: [
            {ma: "ma1", ten: "la la", nguoitao: "Hoàng Công Sơn", dvt: 5, khomay: 3, dinhmuc: 3, mucbao: 5, tondau: 100, nhaptrongky: 120, xuattrongky: 50,toncuoiky: 70,  dutru: 99}
        ]
      }
    },
  }
</script>