import { defineComponent } from 'vue'

export default defineComponent({
  props: { type: { type: String, required: true } },
  setup(props, { slots }) {
    const labels: Record<string, string> = { warning: 'Warning', 'data-loss': 'Data loss', tip: 'Tip', requirement: 'Requirement' }
    return () => <aside class={['safety-callout', `safety-callout--${props.type}`]}><strong><span aria-hidden="true">{props.type === 'tip' ? 'i' : '!'}</span> {labels[props.type] ?? 'Note'}</strong><div>{slots.default?.()}</div></aside>
  }
})
