<script>
import Vue from 'vue'

export default Vue.component('AttributesContainer', {
  data () {
    return {
      html: ''
    }
  },
  render (h) {
    return h(Vue.extend({
      template: `
        <div class="AttributesContainer">
          ${this.html}
        </div>
      `,
      computed: {
        c: {
          get () {
            return this.$store.state.currentAttr
          },
          set () {
            console.log('set')
            this.$store.commit('setcurrentattr', val)
          }
        }
      }
    }))
  },
  computed: {
    content () {
      return this.$store.state.currentAttr
    }
  },
  watch: {
    content: {
      handler () {
        let html = ''
        let c = this.content
        for (let i in c) {
          let item = c[i]
          if (i === 'name') continue
          if (i === 'id') continue
          html += '<div class="item">'
          html += `<div v-text="c['${i}'].desc"></div>`
          html += '<div class="content">'
          if (item.type === 'bool') {
            html += `<el-radio v-model="c['${i}'].default" label="">默认</el-radio>`
            html += `<el-radio v-model="c['${i}'].default" label="true">true</el-radio>`
            html += `<el-radio v-model="c['${i}'].default" label="false">false</el-radio>`
          } else if (item.type === 'number') {
            html += `<el-input-number v-model="c['${i}'].default"></el-input-number>`
          } else {
            html += `<el-input v-model="c['${i}'].default"></el-input>`
          }
          html += '</div>'
          html += '</div>'
        }
        this.html = html
      },
      deep: true
    }
  }
})
</script>

<style scoped>
  .AttributesContainer {
    width: 300px;
  }

  >>>.item {
    display: flex;
    flex-direction: column;
  }

  >>>.item>div {
    padding: 5px;
  }
</style>
