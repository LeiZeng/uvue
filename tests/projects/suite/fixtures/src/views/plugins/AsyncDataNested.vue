<template>
  <div>
    <h2>Nested route</h2>

    <test-case
      expected="nested"
      :result="foo"
    />
  </div>
</template>

<script>
import { promiseData } from '@/shared/utils';

export default {
  async asyncData() {
    return {
      foo: await promiseData('nested'),
    };
  },
};
</script>
