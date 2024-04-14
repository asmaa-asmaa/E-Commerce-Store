<template>
  <div class="product-details mt-16">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="7">
          <img
            :src="tab ? tab : singleProduct.thumbnail"
            class="w-100"
            alt=""
            height="500"
            v-if="!loading"
          />
          <v-skeleton-loader
            v-if="loading"
            type="image, image, image"
          ></v-skeleton-loader>
          <v-tabs center-active height="220" v-model="tab" class="mt-10">
            <v-tab
              v-for="(img, i) in singleProduct.images"
              :key="i"
              class="mx-10"
              :value="img"
            >
              <img :src="img" alt="" width="100" height="200" />
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" md="5" class="pt-0 pl-6 mt-8 mt-md-0">
          <v-skeleton-loader
            v-if="loading"
            type="article, article, article"
          ></v-skeleton-loader>

          <v-card elevation="0" v-if="!loading">
            <v-card-title
              class="px-0"
              style="font-size: 19px; font-weight: bold"
              >({{ singleProduct.title }}) sample -
              {{ singleProduct.category }} for sale
            </v-card-title>
            <div class="rating-parent d-flex align-center" style="gap: 10px">
              <v-rating
                v-model="singleProduct.rating"
                half-increments
                readonly
                color="yellow-darken-2"
                size="x-small"
                density="combact"
              ></v-rating>
              <span class="mt-1" style="font-size: 13px; color: rgb(83, 83, 83)"
                >stock: {{ singleProduct.stock }}</span
              >
            </div>
            <v-card-text
              class="px-0"
              style="font-size: 13px; color: rgb(83, 83, 83)"
              >{{ singleProduct.description }}</v-card-text
            >
            <v-card-text
              class="px-0 pt-0"
              style="font-size: 13px; color: rgb(83, 83, 83)"
              >Brand: {{ singleProduct.brand }}</v-card-text
            >
            <v-card-text
              class="px-0 pt-0"
              style="font-size: 13px; color: rgb(83, 83, 83)"
              >Availability:
              {{
                singleProduct.stock > 0 ? "In Stock" : "Out of Stock"
              }}</v-card-text
            >
            <v-card-text class="pl-0 pt-0">
              <del>$ {{ singleProduct.price }} </del> From
              <span style="font-weight: 900; font-size: 16px"
                >$
                {{
                  Math.ceil(
                    singleProduct.price -
                      singleProduct.price *
                        (singleProduct.discountPercentage / 100)
                  )
                }}</span
              >
            </v-card-text>
            <v-card-text class="pl-0 pt-0">Quantity </v-card-text>
            <div
              class="counter px-1"
              style="
                border-radius: 30px;
                border: 1px solid rgb(184, 184, 184);
                width: fit-content;
              "
            >
              <v-icon size="22" @click="quantity >= 1 ? quantity-- : false"
                >mdi-minus</v-icon
              >
              <input
                type="number"
                style="
                  border: none;
                  outline: none;
                  width: 60px;
                  font-size: 13px;
                "
                class="text-center py-3"
                min="1"
                v-model="quantity"
              />
              <v-icon size="22" @click="quantity++">mdi-plus</v-icon>
            </div>
            <v-card-text class="pl-0">
              Subtotal: ${{
                Math.ceil(
                  singleProduct.price -
                    singleProduct.price *
                      (singleProduct.discountPercentage / 100)
                ) * quantity
              }}
            </v-card-text>
            <v-card-actions class="mt-7 w-100 px-0">
              <v-btn
                variant="outlined"
                style="
                  text-transform: none;
                  border-radius: 30px;
                  background-color: rgb(15, 15, 15);
                "
                class="w-75 text-white"
                density="compact"
                height="50"
                @click="addToCart(singleProduct)"
                :loading="btnLoading"
                >Add To Cart</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { productsModule } from "@/stores/Products";
import { mapActions, mapState } from "pinia";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { cartStore } from "@/stores/cart";

export default {
  inject: ["Emitter"],
  methods: {
    ...mapActions(productsModule, ["getSingleProduct"]),
    ...mapActions(cartStore, ["addItem"]),
    addToCart(item) {
      item.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.addItem(item);
        this.Emitter.emit("openCart");
        this.Emitter.emit("showMsg", item.title);
      }, 1000);
    },
  },
  computed: {
    ...mapState(productsModule, ["singleProduct"]),
  },
  components: {
    VSkeletonLoader,
  },
  data: () => ({
    tab: "",
    quantity: 1,
    loading: false,
    btnLoading: false,
    product: {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/1/1.jpg",
        "https://cdn.dummyjson.com/product-images/1/2.jpg",
        "https://cdn.dummyjson.com/product-images/1/3.jpg",
        "https://cdn.dummyjson.com/product-images/1/4.jpg",
        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      ],
    },
  }),
  async mounted() {
    this.loading = true;
    await this.getSingleProduct(this.$route.params.productId);
    this.loading = false;
  },
};
</script>
