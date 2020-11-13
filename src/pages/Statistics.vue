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
            text: 'STT',
            align: 'start',
            sortable: false,
            value: 'stt',
          },
          {
            text: 'Mã hóa chất',
            align: 'start',
            sortable: false,
            value: 'ma',
          },
          { text: 'Tên hóa chất', value: 'ten' },
          { text: 'Người tạo', value: 'nguoitao' },
          
          { text: 'Kho/Máy', value: 'khomay' },
          { text: 'ĐVT', value: 'dvt' },
          { text: 'Mức báo dự trù', value: 'mucbao' },
          { text: 'Tồn kho', value: 'tonkho' },
          { text: 'Dự trù', value: 'dutru' },
        ],
        desserts: [
            {stt: 1 ,ma: "ma1", ten: "la la", nguoitao: "Hoàng Công Sơn", dvt: 5, khomay: 3, dinhmuc: 3, mucbao: 5, tonkho: 100,  dutru: 99}
        ]
      }
    },
  }
</script>