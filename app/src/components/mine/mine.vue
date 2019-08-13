<template>
  <div class="mine">
    <h1>这是我的</h1>
  </div>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    name: 'mine',
    created() {
      this.changeTabActive(3);
    },
    methods: {
      ...mapMutations(['changeTabActive']),
    },
  };
</script>
