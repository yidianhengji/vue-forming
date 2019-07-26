<template>
  <div class="ShowArea">
    <vuedraggable v-model="rows">
      <el-row v-for="(row, index) in rows" :key="index">
        <vuedraggable :list="row.items" :group="{ name: 'element' }" @change="log1($event, index)">
          <el-col :span="Math.floor(24/(row.items.length+1))"
                  v-for="(item ,newIndex) in row.items"
                  @click.native="selected(countIndex(newIndex, index))"
                  :key="newIndex">
            <RenderString :id="countIndex(newIndex, index)"/>
            <span class="iconfont trash" v-show="countIndex(newIndex, index) === active" @click="del(countIndex(newIndex, index))">&#xe618;</span>
          </el-col>
        </vuedraggable>
      </el-row>
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
import RenderString from './RenderString'
import { mapState, mapMutations } from 'vuex'
import settings from '@/assets/settings.json'

export default {
  name: 'ShowArea',
  components: {
    vuedraggable,
    RenderString
  },
  data () {
    return {
      active: -1,
      rows: []
    }
  },
  created () {
    const arr = []
    for (let i = 0; i < 2; i++) {
      arr.push({ index: i, items: [] })
    }
    this.rows = arr
  },
  computed: {
    ...mapState({
      attrs: state => state.attrs
    })
  },
  methods: {
    /**
     * 根据drag信息和行数，计算返回下标
     * @param  {Number} t 列数
     * @param  {Number} i 行数
     * @return {Number}   下标
     */
    countIndex (t, i) {
      let col = t
      let row = i
      let count = 0
      for (let j = 0; j < row; j++) {
        count += this.rows[j].items.length
      }
      count += col
      return count
    },
    selected (index) {
      console.log(index)
      this.active = index
    },
    /**
     * 当拖动时根据拖动情况进行vuex储存
     * @param  {Object} draginf vuedrag返回的信息
     * @param  {Number} row     行数
     */
    log1 (draginf, row) {
      console.log(draginf)
      for (const i in draginf) {
        switch (i) {
          // 新增
          case 'added':
            const isChanged = draginf[i].element.changed
            if (isChanged) {
              // 只是行间移动
              this.active = this.countIndex(draginf[i].newIndex, row)
              let oldIndex = draginf[i].element.index
              let newIndex = this.active
              let arr = this.attrs;
              [arr[oldIndex], arr[newIndex]] = [arr[newIndex], arr[oldIndex]]
              this.setAttrs(arr)
            } else {
              // 真正的新增
              this.active = this.countIndex(draginf[i].newIndex, row)
              const name = draginf[i].element.name
              draginf[i].element.index = this.active
              draginf[i].element.changed = true
              const d = window.Object.assign({}, this.clone(settings[name]), { name })
              const arr = this.attrs
              arr.splice(this.active, 1, d)
              this.setAttrs(arr)
            }
            break
          // 行内移动
          case 'moved':
            this.active = this.countIndex(draginf[i].newIndex, row)
            const oldIndex = draginf[i].element.oldIndex
            const newIndex = this.active
            const arr = this.attrs;
            [arr[oldIndex], arr[newIndex]] = [arr[newIndex], arr[oldIndex]]
            this.setAttrs(arr)
            break
          case 'removed':
            const arrList = this.attrs
            arrList[0].date = Date.now()
            this.setAttrs(arrList)
            break
        }
      }
    },
    log (t) {
      for (let i in t) {
        this.active = t[i].newIndex
        const item = this.list[this.active]
        if (i === 'added') {
          const d = window.Object.assign({}, this.clone(settings[item.name]), { name: item.name })
          const arr = this.attrs
          arr.splice(this.active, 1, d)
          this.setAttrs(arr)
        }

        if (i === 'moved') {
          const arr = this.attrs
          const old = t[i].oldIndex
          const olditem = this.attrs[old]
          arr.splice(old, 1)
          arr.splice(t[i].newIndex, 0, olditem)
          this.setAttrs(arr)
        }
      }
    },
    del (index) {
      this.attrs.splice(index, 1)
      this.list.splice(index, 1)
      this.setActiveAttrs(0)
    },
    ...mapMutations({
      setAttrs: 'changeAttrs',
      setActiveAttrs: 'setActiveAttrs',
      setList: 'setList'
    })
  },
  watch: {
    active () {
      this.setActiveAttrs(this.active)
    },
    rows: {
      handler (val) {
        this.setList(val)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .ShowArea {
    min-height: 80vh;
    flex: 1;
  }

  .draggable {
    min-height: 80vh;
    width: 100%;
  }

  .active {
    border: 2px solid #409eff;
  }

  .trash {
    float: right;
    font-size: 30px;
    position: relative;
    top: -30px;
    z-index: 999;
    cursor: pointer;
  }

  .el-row {
    width: 100%;
    height: 65px;
  }

  .el-col {
    border: 1px dashed #d4c9c9;
    height: 65px;
  }
</style>
