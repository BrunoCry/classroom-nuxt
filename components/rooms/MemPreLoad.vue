<template>
  <div>
      <div class="member flex align-items-center mb-3" key="div1">
          <Skeleton shape="circle" size="3rem" class="mr-3" />
          <div>
              <Skeleton width="10rem" class="mb-1" />
              <Skeleton width="7rem" class="mb-1" />
          </div>
      </div>
      <div class="member flex align-items-center mb-3" key="div2">
          <Skeleton shape="circle" size="3rem" class="mr-3" />
          <div>
              <Skeleton width="12rem" class="mb-1" />
              <Skeleton width="6rem" class="mb-1" />
          </div>
      </div>
      <div class="member flex align-items-center" key="div3">
          <Skeleton shape="circle" size="3rem" class="mr-3" />
          <div>
              <Skeleton width="9rem" class="mb-1" />
              <Skeleton width="8rem" class="mb-1" />
          </div>
      </div>
  </div>
</template>

<script>
import Skeleton from 'primevue/skeleton';
export default {
  components: {
    Skeleton
  }
}
</script>