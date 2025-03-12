import dts from 'bun-plugin-dts'

await Bun.build({
  entrypoints: ['./src/app-store-connect-api.ts'],
  outdir: './dist',
  plugins: [
    dts({
      output: {
        exportReferencedTypes: true,
      }
    })
  ],
})
