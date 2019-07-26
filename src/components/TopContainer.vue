<template>
  <div class="TopContainer">
    <el-button type="success" @click="preview">预览</el-button>
    <el-button type="warning" @click="print">打印生成代码</el-button>
    <PreviewContainer :html="html" />
    <el-dialog title="预览" :visible.sync="dialogTableVisible">
      <codemirror :value="content" :options="cmOptions"></codemirror>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PreviewContainer from './PreviewContainer'
import 'codemirror/mode/vue/vue.js'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

export default {
  name: 'TopContainer',
  components: { PreviewContainer, codemirror },
  computed: {
    ...mapState({
      attrs: state => state.attrs,
      activeIndex: state => state.activeIndex,
      list: state => state.list
    })
  },
  data () {
    return {
      html: '',
      dialogTableVisible: false,
      content: '',
      cmOptions: {
        tabSize: 2,
        mode: { name: 'vue' },
        theme: 'monokai',
        lineNumbers: true,
        line: true
      }
    }
  },
  methods: {
    preview () {
      let html = '<el-dialog title="预览" :visible.sync="visible">'
      this.list.forEach(a => {
        html += '<el-row>'
        a.items.forEach(aa => {
          html += '<el-col :span="' + 24 / (a.items.length) + '">'
          const v = this.attrs[aa.index]
          let tag = v.name
          html += '<el-row>'
          if (v.subtitle.default) { html += `<el-col :span="4"><div v-text="'${v.subtitle.default}'" style="flex-grow: 0;flex-shrink: 0;flex-basis: 20%;"></div></el-col>` }
          html += `<el-col :span="${v.subtitle.default ? 20 : 24}"><${tag}`
          for (const i in v) {
            let value = v[i]
            if (i === 'name') continue
            if (i === 'subtitle') continue
            if (i === 'id') continue
            if (i === 'value') continue
            if (value.default) {
              if (i !== 'model') {
                html += ` ${value.notbind === 'true' ? '' : ':'}${i}="${value.istrue && value.default === 'true' ? value.istrue : value.default}"`
              } else {
                html += ` v-model="d['${value.default}']"`
              }
            }
          }
          html += `></${tag}></el-col>`
          html += '</el-row>'
          html += '</el-col>'
        })
        html += '</el-row>'
      })
      html += '</el-dialog>'
      this.html = html
      this.setVisible(true)
    },
    print () {
      let html = ''
      // template部分
      html += '<template>\r\n'
      html += '  <div>\r\n'
      this.attrs.forEach(v => {
        let tag = v.name
        let subtitle = v.subtitle
        html += '    <div class="item">\r\n'
        html += '      <div>' + subtitle.default + '</div>\r\n'
        html += `      <${tag}`
        for (const i in v) {
          let value = v[i]
          if (i === 'name') continue
          if (i === 'subtitle') continue
          if (i === 'id') continue
          if (i === 'value') continue
          if (value.default) {
            if (i !== 'model') {
              html += ` ${value.notbind === 'true' ? '' : ':'}${i}="${value.istrue && value.default === 'true' ? value.istrue : value.default}"`
            } else {
              html += ` v-model="${value.default}"`
            }
          }
        }
        html += `></${tag}>\r\n`
        html += '    </div>\r\n'
      })
      html += '  </div>\r\n'
      html += '</template>\r\n\r\n'
      // script部分
      html += '<script>\r\n'
      html += 'export default {\r\n'
      html += '  data () {\r\n'
      html += '    return {\r\n'
      this.attrs.forEach((v, i) => {
        let data = v.model
        html += `      ${data.default}: ''${i === this.attrs.length - 1 ? '\r\n' : ',\r\n'}`
      })
      html += '    }\r\n'
      html += '}\r\n'
      html += '<\/script>\r\n'// eslint-disable-line
      // style部分
      html += '<style scoped>\r\n'
      html += '  .item {\r\n'
      html += '    display: flex;\r\n'
      html += '    align-items: center;\r\n'
      html += '    padding: 10px;\r\n'
      html += '  }\r\n'
      html += '<style>\r\n'
      this.content = html
      this.dialogTableVisible = true
    },
    ...mapMutations(['setVisible'])
  }
}
</script>

<style scoped>
.TopContainer {
  height: 56px;
  background: #409eff;
  display: flex;
  flex-direction: row-reverse;
  padding: 0 10px;
}

.TopContainer .el-button {
  margin: 0 10px;
}

>>>.CodeMirror {
  min-height: 500px;
  font-family: -apple-system,"Helvetica Neue",Helvetica,Arial,"PingFang SC","Hiragino Sans GB","WenQuanYi Micro Hei","Microsoft Yahei",sans-serif !important
}
</style>
