<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3">
        <stats-card>
          <div class="icon-big text-center" slot="header"></div>
          <div class="numbers" slot="content">
            <p>Tồn kho và dự trù hóa chất</p>
          </div>
          <div class="stats text-center" slot="footer">Chi tiết</div>
        </stats-card>
      </div>
      <div class="col-md-6 col-xl-3">
        <stats-card>
          <div class="icon-big text-center" slot="header"></div>
          <div class="numbers" slot="content">
            <p>Hóa chất đã hết</p>
          </div>
          <div class="stats text-center" slot="footer">Chi tiết</div>
        </stats-card>
      </div>
      <div class="col-md-6 col-xl-3">
        <stats-card>
          <div class="icon-big text-center" slot="header"></div>
          <div class="numbers" slot="content">
            <p>Hóa chất sắp hết hạn</p>
          </div>
          <div class="stats text-center" slot="footer">Chi tiết</div>
        </stats-card>
      </div>
      <div class="col-md-6 col-xl-3">
        <stats-card>
          <div class="icon-big text-center" slot="header"></div>
          <div class="numbers" slot="content">
            <p>Hóa chất đã hết hạn</p>
          </div>
          <div class="stats text-center" slot="footer">Chi tiết</div>
        </stats-card>
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
</style>
