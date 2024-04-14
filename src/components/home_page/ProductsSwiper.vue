<template>
  <div class="products-swiper pt-16 pb-5">
    <div class="title mb-10 px-5 d-flex align-center justify-space-between">
      <h2
        style="font-weight: 900; font-size: 30px"
        :class="[`text-${titleColor}`]"
      >
        {{ title }}
      </h2>
      <router-link
        class="text-black"
        style="font-size: 14px"
        :to="{
          name: 'products_category',
          query: {
            category: categories[index].route,
            title: categories[index].title,
          },
        }"
        >Shop All</router-link
      >
    </div>
    <v-container fluid v-if="!products.length">
      <v-row>
        <v-col cols="12" class="pt-14">
          <v-row>
            <v-col cols="3" v-for="num in 4" :key="num">
              <v-skeleton-loader
                type="image, article, button"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <Swiper
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :modules="modules"
      :slides-per-view="4"
      :space-between="35"
      class="pb-9 px-5"
      :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
      :autoplay="{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :breakpoints="breakpoints"
      :loop="true"
    >
      <swiper-slide v-for="item in products" :key="item.id">
        <v-card elevation="0" class="pb-5">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="img-parent position-relative"
              style="height: 200px; overflow: hidden"
            >
              <img
                :src="
                  showenItem[item.title]
                    ? showenItem[item.title]
                    : item.thumbnail
                "
                class="w-100"
                :style="`height: 100%; transition: 0.5s all ease-in-out; scale: ${
                  isHovering ? 1.05 : 1
                } ; cursor: pointer `"
                alt=""
                v-bind="props"
              />
              <v-btn
                density="compact"
                variant="outlined"
                class="bg-white quick-view-btn"
                width="60"
                height="30"
                style="
                  text-transform: none;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  border-radius: 30px;
                  font-size: 12px;
                  transition: 0.2s all ease-in-out;
                  opacity: 0;
                "
                @click="openQuickView(item)"
                >Quick View</v-btn
              >
            </div>
          </v-hover>
          <v-card-text class="pl-0 pb-1">
            <!-- ({{ item.title }})
            {{
              item.description + " " + item.title.split(" ").length <= 9
                ? item.description
                : item.description
                    .split(" ")
                    .slice(0, 9 - item.title.split(" ").length)
                    .join(" ")
            }} -->
            {{
              `(${item.title}) ${item.description}`.length <= 57
                ? `(${item.title}) ${item.description}`
                : `(${item.title}) ${item.description}`.substring(0, 57) + "..."
            }}
          </v-card-text>
          <v-rating
            v-model="item.rating"
            half-increments
            readonly
            color="yellow-darken-2"
            size="x-small"
            density="compact"
          ></v-rating>
          <v-card-text class="pl-0 pt-0">
            <del>$ {{ item.price }} </del> From
            <span class="text-red" style="font-weight: 900; font-size: 16px"
              >$
              {{
                Math.ceil(
                  item.price - item.price * (item.discountPercentage / 100)
                )
              }}</span
            >
          </v-card-text>
          <v-btn-toggle v-model="showenItem[item.title]" mandatory>
            <v-btn
              v-for="(pic, i) in item.images"
              :key="i"
              :value="pic"
              size="x-small"
              rounded="xl"
              :ripple="false"
            >
              <img
                :src="pic"
                alt=""
                width="30"
                height="30"
                style="border-radius: 50%; border: 1px solid rgb(172, 171, 171)"
              />
            </v-btn>
          </v-btn-toggle>
          {{ pic }}
          <div class="mt-5">
            <v-btn
              density="combat"
              class="py-2 px-12"
              style="text-transform: none; border-radius: 30px"
              variant="outlined"
              @click="
                $router.push({
                  name: 'product_details',
                  params: { productId: item.id },
                })
              "
              >Choose Options</v-btn
            >
          </div>
        </v-card>
      </swiper-slide>
      <div class="swiper-prev"></div>
      <div class="swiper-next"></div>
      <div class="swiper-pagination"></div>
    </Swiper>
    <!--<v-container fluid class="pt-9">
      <v-row>
        <v-col cols="3" v-for="item in products" :key="item.id">
          <v-card elevation="0" class="pb-5">
            <img
              :src="
                showenItem[item.title] ? showenItem[item.title] : item.thumbnail
              "
              class="w-100"
              style="height: 200px"
              alt=""
            />
            <v-card-text class="pl-0 pb-1">
              ({{ item.title }})
              {{
                item.description.split(" ").length <= 8
                  ? item.description
                  : item.description.split(" ").slice(0, 8).join(" ") + "..."
              }}
            </v-card-text>
            <v-rating
              v-model="item.rating"
              half-increments
              readonly
              color="yellow-darken-2"
              size="x-small"
              density="combact"
            ></v-rating>
            <v-card-text class="pl-0 pt-0">
              <del>$ {{ item.price }} </del> From
              <span class="text-red" style="font-weight: 900; font-size: 16px"
                >$
                {{
                  Math.ceil(
                    item.price - item.price * (item.discountPercentage / 100)
                  )
                }}</span
              >
            </v-card-text>
            <v-btn-toggle v-model="showenItem[item.title]">
              <v-btn
                v-for="(pic, i) in item.images"
                :key="i"
                :value="pic"
                size="x-small"
              >
                <img
                  :src="pic"
                  alt=""
                  width="30"
                  height="30"
                  style="
                    border-radius: 50%;
                    border: 1px solid rgb(172, 171, 171);
                  "
                />
              </v-btn>
            </v-btn-toggle>
            {{ pic }}
            <div class="mt-5">
              <v-btn
                density="combat"
                class="py-2 px-12"
                style="text-transform: none; border-radius: 30px"
                variant="outlined"
                >Choose Options</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>-->
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { productsModule } from "@/stores/Products";
import { mapState } from "pinia";
export default {
  inject: ["Emitter"],
  methods: {
    openQuickView(product) {
      this.Emitter.emit("openQuickView", product);
    },
  },
  computed: {
    ...mapState(productsModule, ["categories"]),
  },
  props: {
    products: {
      type: Array,
    },
    title: {
      type: String,
    },
    titleColor: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  data: () => ({
    showenItem: {},
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      580: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      990: {
        slidesPerView: 4,
      },
    },
  }),
  components: {
    Swiper,
    SwiperSlide,
    VSkeletonLoader,
  },
};
</script>
<style lang="scss">
.products-swiper {
  .swiper-button-next,
  .swiper-button-prev {
    width: 35px;
    height: 35px;
    border: 2px solid rgb(58, 57, 57);
    border-radius: 50%;
    background-color: white;
    top: 43%;
    &::after {
      font-size: 15px;
      color: rgb(58, 57, 57);
      padding: 0;
      display: flex;
      justify-content: center;
      font-weight: 900;
      align-items: center;
    }
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
  .img-parent:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
}
@media (max-width: 580px) {
  .img-parent {
    height: 300px !important;
  }
  .swiper-button-next,
  .swiper-button-prev {
    top: 56%;
  }
}
</style>
