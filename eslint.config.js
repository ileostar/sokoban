import antfu, { ignores } from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
  ignores([
    'components.d.ts',
    'auto-imports.d.ts',
    'typed-router.d.ts',
  ]),
)
