import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// The build regenerates this index before VitePress evaluates the data loader.
declare const data: Record<string, number>
export { data }
export default {
  load(): Record<string, number> {
    const index = JSON.parse(readFileSync(fileURLToPath(new URL('../../../public/app-index.json', import.meta.url)), 'utf8')) as { pages: Record<string, number> }
    return index.pages
  }
}
