import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0F1E',
        surface: '#111827',
        'surface-high': '#1E293B',
        'border-subtle': '#1E2D45',
        'accent-indigo': '#6366F1',
        'accent-violet': '#8B5CF6',
        'accent-cyan': '#06B6D4',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        'text-muted': '#475569',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        'space-grotesk': ['var(--font-space-grotesk)'],
        inter: ['var(--font-inter)'],
      }
    },
  },
  plugins: [],
}

export default config
