<template>
  <div>
    <template v-if="fields">
      <s-field v-for="(f, k) in fields" :field="f" :key="k"></s-field>
    </template>
  </div>
</template>
<script>

import { SField } from './index'

export default {
  name: 'SFieldset',
  components: { SField },
  props: {
    fields: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  created () {
    console.log('fields', this.fields)
  },
  methods: {
  }
}
</script>
