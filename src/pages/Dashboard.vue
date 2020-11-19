<template>
  <div>
    <div class="row stats-card">
      <div class="col-md-6 col-xl-3 stats" style="background: #3c8dbc">
        <h4>1</h4>
        <span class="title">Tồn kho và dự trù hóa chất</span>
        <span class="icon"><i class="fas fa-cubes"></i></span>
        <router-link tag="span" to="/thong-ke-ton-kho" class="detail"
          >Chi tiết <i class="fa fa-arrow-circle-right"></i
        ></router-link>
      </div>
      <div class="col-md-6 col-xl-3 stats" style="background: #00a65a">
        <h4>0</h4>
        <span class="title">Hóa chất đã hết</span>
        <span class="icon"><i class="fas fa-cube"></i></span>
        <router-link tag="span" to="/vat-tu-hoa-chat" class="detail"
          >Chi tiết <i class="fa fa-arrow-circle-right"></i
        ></router-link>
      </div>
      <div class="col-md-6 col-xl-3 stats" style="background: #ff851b">
        <h4>0</h4>
        <span class="title">Hóa chất sắp hết hạn</span>
        <span class="icon"><i class="fas fa-stopwatch"></i></span>
        <router-link tag="span" to="/hoa-chat-het-han" class="detail"
          >Chi tiết <i class="fa fa-arrow-circle-right"></i
        ></router-link>
      </div>
      <div class="col-md-6 col-xl-3 stats" style="background: #dd4b39">
        <h4>0</h4>
        <span class="title">Hóa chất đã hết hạn</span>
        <span class="icon"><i class="fas fa-exclamation-triangle"></i></span>
        <router-link tag="span" to="/hoa-chat-het-han" class="detail"
          >Chi tiết <i class="fa fa-arrow-circle-right"></i
        ></router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <img src="6e7ad4c6b7a346fd1fb2.jpg" style="width: 100%; margin-top: 20px" />
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
    return {};
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
.col-md-12{
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
