import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  props: { id: { type: String, required: true }, steps: { type: Array as () => string[], required: true } },
  setup(props) {
    const checked = ref<string[]>([])
    onMounted(() => { try { const saved: unknown = JSON.parse(localStorage.getItem(`aar-checklist:${props.id}`) ?? '[]'); if (Array.isArray(saved)) checked.value = saved.filter((item): item is string => typeof item === 'string' && props.steps.includes(item)) } catch { /* Storage is optional. */ } })
    function toggle(step: string, value: boolean) {
      checked.value = value ? [...checked.value, step] : checked.value.filter((item) => item !== step)
      try { localStorage.setItem(`aar-checklist:${props.id}`, JSON.stringify(checked.value)) } catch { /* Keep the checklist usable without storage. */ }
    }
    return () => <section class="step-checklist" aria-label="Preparation checklist"><strong>Preparation checklist</strong><p>{checked.value.length} of {props.steps.length} complete</p><progress max={props.steps.length} value={checked.value.length} aria-label="Checklist progress"/><ul>{props.steps.map((step) => <li><label><input type="checkbox" checked={checked.value.includes(step)} onChange={(event) => toggle(step, (event.currentTarget as HTMLInputElement).checked)}/>{step}</label></li>)}</ul></section>
  }
})
