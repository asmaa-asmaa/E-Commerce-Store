<template>
  <div class="home">
    <UpperBanner />
    <TheFeatures />
    <TopOffers />
    <ProductsComponent
      :products="flashDeals"
      title="Flash Deals"
      titleColor="red"
      :index="0"
    />
    <TopCategories />
    <NewProducts :products="newProducts" :index="1" />
    <QualityFeatures />
    <ProductsComponent
      :products="mobilePhones"
      title="Top Mobile Phones"
      titleColor="grey"
      :index="0"
    />
    <v-container fluid>
      <v-row>
        <v-col cols="6" class="pr-5">
          <img
            src="@/assets/images/band-left-cover.webp"
            alt=""
            class="w-100"
          />
        </v-col>
        <v-col cols="6" class="pl-5">
          <img
            src="@/assets/images/band-right-cover.webp"
            alt=""
            class="w-100"
          />
        </v-col>
      </v-row>
    </v-container>

    <ProductsComponent
      :products="mobilePhones"
      title=" Top Fragrances"
      titleColor="grey"
      :index="3"
    />
    <img src="@/assets/images/tv-banner.webp" alt="" class="w-100" />
    <ProductsComponent
      :products="groceries"
      title=" Top Groceries"
      titleColor="grey"
      :index="6"
    />
    <WhyShopwithus />
  </div>
</template>

<script>
// @ is an alias to /src
import UpperBanner from "@/components/home_page/UpperBanner.vue";
import TheFeatures from "@/components/home_page/TheFeatures.vue";
import TopOffers from "@/components/home_page/TopOffers.vue";
import ProductsComponent from "@/components/home_page/ProductsSwiper.vue";
import { productsModule } from "@/stores/Products";
import { mapActions, mapState } from "pinia";
import TopCategories from "@/components/home_page/TopCategories.vue";
import NewProducts from "@/components/home_page/NewProducts.vue";
import QualityFeatures from "@/components/home_page/QualityFeatures.vue";
import WhyShopwithus from "@/components/home_page/WhyShopWithUs.vue";
export default {
  name: "HomeView",
  components: {
    UpperBanner,
    TheFeatures,
    TopOffers,
    ProductsComponent,
    TopCategories,
    NewProducts,
    QualityFeatures,
    WhyShopwithus,
  },
  computed: {
    ...mapState(productsModule, [
      "flashDeals",
      "newProducts",
      "mobilePhones",
      "fragrances",
      "groceries",
    ]),
  },
  methods: {
    ...mapActions(productsModule, ["getProducts"]),
  },
  async mounted() {
    await this.getProducts();
  },
};
</script>
