<script>
import Vue from 'vue'

export default Vue.component('RenderString', {
  data () {
    return {
      html: ''
    }
  },
  props: {
    id: Number
  },
  render (h) {
    return h(Vue.extend({
      template: `
        <div class="item-container">
          <div class="mask"></div>
          <div class="item">
            id: ${this.id}
            <div v-text="content && content.subtitle && content.subtitle.default"></div>
            <div>${this.html}</div>
          </div>
        </div>
      `,
      computed: {
        content: {
          get () {
            return this.$store.state.attrs[this.$parent.id]
          }
        }
      }
    }))
  },
  computed: {
    content () {
      return this.$store.state.attrs
    }
  },
  watch: {
    content: {
      handler: function (val) {
        // 构造组件
        if (!val) return
        val = val[this.id]
        let tag = val.name
        let html = `<${tag}`
        for (let i in val) {
          let value = val[i]
          if (i === 'name') continue
          if (i === 'subtitle') continue
          if (i === 'id') continue
          if (i === 'date') continue
          if (value.default) {
            if (i === 'value') {
              html += ` :value="'${value.default}'"`
            } else {
              html += ` ${value.notbind === 'true' ? '' : ':'}${i}="${value.istrue && value.default === 'true' ? value.istrue : value.default}"`
            }
          }
        }
        html += `></${tag}>`
        this.html = html
      },
      deep: true
    }
  }
})
</script>

<style scoped>
.item-container {
  position: relative;
}

>>>.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

>>>.item {
  display: flex;
  align-items: center;
  padding: 10px;
}

>>>.item > div {
  margin: 0 10px;
}
</style>
