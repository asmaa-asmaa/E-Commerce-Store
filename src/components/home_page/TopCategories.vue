<template>
  <div class="top-cat">
    <div class="cyber-banner">
      <img src="@/assets/images/cyber-banner.webp" alt="" class="w-100" />
    </div>
    <div class="categories pt-13">
      <div class="title d-flex justify-center align-center px-5 mb-3">
        <h3
          class="text-center flex-grow-1"
          style="font-weight: 900; font-size: 20px"
        >
          Top Categories
        </h3>
      </div>
      <v-container fluid>
        <v-row>
          <v-col
            cols="6"
            sm="4"
            md="3"
            lg="2"
            v-for="cat in categories"
            :key="cat.title"
          >
            <v-card class="text-center py-3 px-2" elevation="0">
              <v-hover v-slot="{ isHovering, props }">
                <div
                  class="img-parent"
                  style="
                    overflow: hidden;
                    width: 100%;
                    height: 170px;
                    border-radius: 50%;
                  "
                >
                  <img
                    :src="cat.image"
                    alt=""
                    :style="`cursor: pointer; height:100%; width: 100%; transition: 0.4s all ease-in-out; scale: ${
                      isHovering ? 1.05 : 1
                    }`"
                    v-bind="props"
                  />
                </div>
              </v-hover>
              <card-text>{{ cat.title }}</card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    categories: [
      {
        title: "Mobile Phone",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/mobile-phones.png?v=10616357514144629263",
      },
      {
        title: "laptop category",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/laptops-tablets.png?v=17546078654541140209",
      },
      {
        title: "tv category",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/televisions.png?v=792225267698738137",
      },
      {
        title: "pc category",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/pcs-accessories.png?v=7913320403362682840",
      },
      {
        title: "audio & videon category",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/audio-video.png?v=17118273463527967791",
      },
      {
        title: "gaming category",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/gaming-accessories.png?v=5365032838061682635",
      },
      {
        title: "home appliances category",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/home-appliances.png?v=4122646624966862882",
      },
      {
        title: "kitchen category",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/kitchen-appliances.png?v=912885117927234410",
      },
      {
        title: "cameras category",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/cameras.png?v=10468174360605840515",
      },
      {
        title: "consume cat",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/consumables.png?v=1604898607781595964",
      },
      {
        title: "smart cat",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/smart-homes.png?v=11511407578445752828",
      },
      {
        title: "accessories cat",
        image:
          "https://new-ella-demo.myshopify.com/cdn/shop/files/accessories.png?v=16090558546215869367",
      },
    ],
  }),
};
</script>
