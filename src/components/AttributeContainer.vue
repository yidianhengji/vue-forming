<template>
  <div class="AttributeContainer" v-if="content && id !== void 0">
    <div v-for="(item, index) in content[id]" :key="index">
      <template v-if="item && index !== 'name' && index !== 'id'">
        <div class="item">
          <div v-text="item.desc"></div>
          <div class="content">
            <template v-if="item.type === 'bool'">
              <el-radio v-model="item.default" label="">默认</el-radio>
              <el-radio v-model="item.default" label="true">true</el-radio>
              <el-radio v-model="item.default" label="false">false</el-radio>
            </template>
            <template v-else-if="item.type === 'number'">
              <el-input-number v-model="item.default"></el-input-number>
            </template>
            <template v-else>
              <el-input v-model="item.default"></el-input>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'AttributeContainer',
  computed: {
    ...mapState({
      content: state => state.attrs,
      id: state => state.activeIndex
    })
  },
  methods: {
    ...mapMutations({
      setAttrs: 'changeAttrs'
    })
  }
}
</script>

<style scoped>
  .AttributesContainer {
    width: 300px;
  }

  .item {
    display: flex;
    flex-direction: column;
  }

  .item>div {
    padding: 5px;
  }
</style>
