<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'

export default Vue.component('PreviewContainer', {
  props: {
    html: String
  },
  render (h) {
    return h(Vue.extend({
      template: `
        <div>
          ${this.html}
        </div>
      `,
      data () {
        return {
          d: {}
        }
      },
      computed: {
        visible: {
          get () {
            return this.$store.state.visible
          },
          set (val) {
            this.setVisible(val)
          }
        }
      },
      methods: {
        ...mapMutations(['setVisible'])
      }
    }))
  }
})
</script>

<style scoped>
  >>>.item {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }

  >>>.el-row {
    display: flex;
    align-items: center;
  }

  >>>.el-col {
    text-align: center;
  }
</style>
