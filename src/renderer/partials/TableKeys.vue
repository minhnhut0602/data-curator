<template>
  <div>
    <div class="input-group">
      <label class="control-label" v-tooltip.left="tooltip(tooltipId)">{{labelName}}</label>
      <component :is="tooltipView" :index="index"/>
      <select class="form-control input-sm" :value="getSelectedTable()" @input="setSelectedTable($event.target.value)">
        <option v-for="tableName in allTables" :key="tableName" :id="tableName" :value="tableName">{{tableName}}</option>
      </select>
    </div>
  </div>
</template>
<script>
import ForeignKeysTooltip from '../mixins/ForeignKeysTooltip'
export default {
  name: 'tablekeys',
  mixins: [ForeignKeysTooltip],
  props: ['allTableNames', 'getSelectedTable', 'pushSelectedTable', 'labelName', 'tooltipId', 'tooltipView', 'index'],
  computed: {
    allTables() {
      return this.allTableNames || []
    }
  },
  methods: {
    setSelectedTable(value) {
      this.pushSelectedTable(value)
    }
  }
}
</script>
<style lang="styl" scoped>
@import '~static/css/foreignkeyheaders'
</style>
