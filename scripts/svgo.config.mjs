/**
 * SVGO configuration for `scripts/optimize-assets.sh`.
 *
 * Conservative on purpose: `favicon.svg` switches between a light and a dark
 * icon with an inline <style> block that targets `#light-icon` / `#dark-icon`,
 * so id cleanup and style inlining must stay disabled.
 */
export default {
  multipass: true,
  js2svg: { indent: 0, pretty: false },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          inlineStyles: false,
          minifyStyles: { usage: false },
          removeViewBox: false,
          convertPathData: { floatPrecision: 2 },
          cleanupNumericValues: { floatPrecision: 2 }
        }
      }
    }
  ]
}
