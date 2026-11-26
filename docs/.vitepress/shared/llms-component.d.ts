// The plugin exports an SFC without a declaration file. Keep this contract
// limited to its published props, not a wildcard that erases component types.
declare module 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{ showDownload?: boolean }>
  export default component
}
