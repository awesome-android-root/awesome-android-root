// Lucide's per-icon ESM files expose __iconData but ship no per-file declarations.
// Keep this narrow contract aligned with its public LucideIconData type.
declare module '@lucide/vue/dist/esm/icons/*.mjs' {
  export const __iconData: import('@lucide/vue').LucideIconData
}
