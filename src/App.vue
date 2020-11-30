<template>
  <div :class="{ 'nav-open': $sidebar.showSidebar }" id="app" data-app>
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.vue-notifyjs.notifications {
  .alert {
    z-index: 10000;
  }
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
.breadcrumb a {
  color: #3c8dbc;
  font-weight: 600;
}
.breadcrumb {
  background-color: #fff !important;
  font-weight: 600;
  color: #333;
}
.moving-arrow {
  display: none !important;
}
.Vue-Toastification__toast--success {
  background-color: #3c8dbc !important;
}
</style>
