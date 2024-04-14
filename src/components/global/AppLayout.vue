<template>
  <div class="layout">
    <v-layout class="position-relative">
      <CardDrawer :windowWidth="windowWidth" />
      <MenuDrawer :windowWidth="windowWidth" />
      <AppNav
        v-show="$route.name != 'check_out' && !showFixed && windowWidth > 990"
      />
      <ResponsiveNav
        v-show="windowWidth <= 990 && $route.name != 'check_out'"
      />
      <FixedNav
        v-show="$route.name != 'check_out' && showFixed && windowWidth > 990"
      />
      <v-main
        :style="`padding-top: ${
          $route.name == 'check_out'
            ? '0px'
            : windowWidth <= 990
            ? '60px'
            : '150px'
        } `"
      >
        <slot></slot>
      </v-main>
      <AppFooter v-show="$route.name != 'check_out'" />
    </v-layout>
  </div>
</template>
<script>
import AppNav from "./AppNav.vue";
import FixedNav from "./FixedNav.vue";
import AppFooter from "./AppFooter.vue";
import CardDrawer from "./CardDrawer.vue";
import ResponsiveNav from "./ResponsiveNav.vue";
import MenuDrawer from "@/components/global/MenuDrawer.vue";
export default {
  data: () => ({
    drawer: true,
    showFixed: false,
    windowWidth: 0,
  }),
  components: {
    AppNav,
    AppFooter,
    CardDrawer,
    FixedNav,
    ResponsiveNav,
    MenuDrawer,
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
      console.log(this.windowWidth);
    };
    window.onscroll = () => {
      if (window.scrollY >= 205) {
        this.showFixed = true;
      } else {
        this.showFixed = false;
      }
    };
  },
};
</script>
