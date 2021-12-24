<template>
  <div>
    <div class="row stats-card">
      <div class="col-md-6 col-xl-3 stats" style="background: #3c8dbc">
        <h4>{{ member }}</h4>
        <span class="title">Danh sách thành viên</span>
        <span class="icon"><i class="fas fa-cubes"></i></span>
        <router-link tag="span" to="/danh-sach-thanh-vien" class="detail"
          >Chi tiết <i class="fa fa-arrow-circle-right"></i
        ></router-link>
      </div>
      <div class="col-md-6 col-xl-3 stats" style="background: #00a65a">
        <h4>{{ masterial }}</h4>
        <span class="title">Vật tư</span>
        <span class="icon"><i class="fas fa-cube"></i></span>
        <router-link tag="span" to="/vat-tu" class="detail"
          >Chi tiết <i class="fa fa-arrow-circle-right"></i
        ></router-link>
      </div>
      <div class="col-md-6 col-xl-3 stats" style="background: #ff851b">
        <h4>{{ machine }}</h4>
        <span class="title">Kho máy</span>
        <span class="icon"><i class="fas fa-stopwatch"></i></span>
        <router-link tag="span" to="/kho-may" class="detail"
          >Chi tiết <i class="fa fa-arrow-circle-right"></i
        ></router-link>
      </div>
      <div class="col-md-6 col-xl-3 stats" style="background: #dd4b39">
        <h4>{{ unit }}</h4>
        <span class="title">Đơn vị</span>
        <span class="icon"><i class="fas fa-exclamation-triangle"></i></span>
        <router-link tag="span" to="/don-vi" class="detail"
          >Chi tiết <i class="fa fa-arrow-circle-right"></i
        ></router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <img
          src="@/assets/img/hospital.jpg"
          style="width: 100%; margin-top: 20px"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { StatsCard } from "@/components/index";
export default {
  components: {
    StatsCard,
  },
  data() {
    return {
      member: "",
      masterial: 0,
      unit: "",
      machine: "",
    };
  },
  mounted() {
    this.CallAPI(
      "get",
      "user/list?page=1&limit=99999&order_by=created_at&order_direction=asc",
      {},
      (response) => {
        this.member = response.data.data.data.length;
      }
    );
    this.CallAPI(
      "get",
      `material/list?page=1&limit=99999&order_by=created_at&order_direction=asc`,
      {},
      (response) => {
        // this.masterial = response.data.data.total;
        this.masterial = response.data.data.length;
      }
    );
    this.CallAPI(
      "get",
      "machine-stock/list?page=1&limit=99999&order_by=created_at&order_direction=asc",
      {},
      (response) => {
        // this.machine = response.data.data.total;
        this.machine = response.data.data.length;
      }
    );
    this.CallAPI(
      "get",
      "unit/list?page=1&limit=99999&order_by=created_at&order_direction=asc",
      {},
      (response) => {
        // this.unit = response.data.data.total;
        this.unit = response.data.data.length;
      }
    );
  },
};
</script>
<style>
.stats-card {
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding-bottom: 40px;
  border-bottom: 1px solid #ddd;
}
.stats-card span {
  display: block;
}
.stats-card .stats {
  position: relative;
}
.stats-card h4 {
  font-size: 38px;
  margin: 10px;
}
.stats-card .title {
  font-size: 15px;
  font-weight: 600;
  margin: 10px;
}
.stats-card .detail {
  padding: 3px 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.15);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}
.stats-card .icon {
  font-size: 60px;
  position: absolute;
  top: 0;
  right: 10px;
  color: rgba(0, 0, 0, 0.15);
}
.stats-card .detail:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
}
.col-md-12 {
  padding: 0 !important;
}
@media (min-width: 1200px) {
  .stats-card .col-xl-3 {
    -ms-flex: 0 0 25%;
    flex: 0 0 23% !important;
    max-width: 23% !important;
    padding: 0;
  }
}
</style>
