<template>
  <div class="page">
    <h1>Vuex</h1>

    <h3 class="code">fetch()</h3>
    <test-case
      expected="fetch"
      :result="$store.state.vuexPlugin"
    />

    <h3 class="code">onHttpRequest()</h3>
    <test-case
      expected="onHttpRequest"
      :result="$store.state.initData"
    />

    <router-view/>
  </div>
</template>

<script>
import { promiseData } from '@/shared/utils';

export default {
  head() {
    return {
      meta: [{ vmid: 'desc', name: 'description', content: this.$store.state.vuexPlugin }],
    };
  },

  async fetch({ store }) {
    const value = await promiseData('fetch');
    store.commit('setVuexPlugin', value);
  },
};
</script>
