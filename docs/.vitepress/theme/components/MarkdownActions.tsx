import { defineComponent } from 'vue'
import CopyOrDownloadAsMarkdownButtons from 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue'

export default defineComponent(() => {
  return () => (
    // v1.15.0 does not default the optional showDownload prop to true.
    <CopyOrDownloadAsMarkdownButtons showDownload={true} />
  )
})
