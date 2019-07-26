<template>
  <div class="FieldListContainer">
    <ul>
      <vuedraggable :group="{name: 'element', pull: 'clone', put: false}" :list="list" :clone="cloneCustom">
        <li v-for="item in list" :key="item.name">
          <span class="iconfont" v-html="item.icon"></span>
          <span v-text="item.desc"></span>
        </li>
      </vuedraggable>
    </ul>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
import { mapState } from 'vuex'

export default {
  name: 'FieldListContainer',
  components: {
    vuedraggable
  },
  data () {
    return {
      list: [
        { name: 'el-input', desc: '输入框', icon: '&#xe619;' },
        { name: 'el-radio', desc: '单选框', icon: '&#xe69c;' },
        { name: 'el-checkbox', desc: '多选框', icon: '&#xe62e;' },
        { name: 'el-input-number', desc: '计数器', icon: '&#xe9cc;' },
        { name: 'el-select', desc: '选择器', icon: '&#xe608;' },
        { name: 'el-switch', desc: '开关', icon: '&#xe6da;' },
        { name: 'el-slider', desc: '滑块', icon: '&#xe606;' },
        { name: 'el-time-select', desc: '时间选择器', icon: '&#xe63a;' },
        { name: 'el-date-picker', desc: '日期选择器', icon: '&#xe639;' },
        { name: 'el-upload', desc: '上传', icon: '&#xe612;' },
        { name: 'el-rate', desc: '评分', icon: '&#xe60f;' },
        { name: 'el-color-picker', desc: '颜色选择器', icon: '&#xe678;' },
        { name: 'el-transfer', desc: '穿梭框', icon: '&#xe691;' }
      ]
    }
  },
  computed: {
    ...mapState(['attrs'])
  },
  methods: {
    cloneCustom (t) {
      return window.Object.assign({}, t, { changed: false })
    }
  }
}
</script>

<style scoped>
  .FieldListContainer {
    width: 200px;
    border: 1px solid #eee;
  }

  .FieldListContainer ul {
    display: flex;
    flex-direction: column;
  }

  .FieldListContainer ul li {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #eee;
    border-color: transparent transparent #eee transparent;
    cursor: move;
  }

  .FieldListContainer ul li:hover {
    border: 1px dashed #409eff;
  }

  .FieldListContainer ul li span {
    padding: 0 5px;
  }
</style>
