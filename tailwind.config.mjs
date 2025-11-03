import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'
// import { plugin } from 'flowbite-react/tailwind'
import flowbitePlugin from 'flowbite/plugin'
import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography, flowbitePlugin, daisyui],
  daisyui: {
    themes: [
      {
        tropicallight: {
          primary: '#00C2A0', // Tropical teal
          'primary-content': '#ffffff', // Белый текст на primary

          secondary: '#FFD166', // Sun yellow
          'secondary-content': '#000000', // Чёрный текст на secondary (жёлтом)

          accent: '#FF6F61', // Coral
          'accent-content': '#ffffff', // Белый текст на accent

          neutral: '#2A2E37', // Deep gray
          'neutral-content': '#ffffff',

          'base-100': '#F6FFF8', // Light background
          'base-200': '#E0F0E5', // Slightly darker for borders/cards
          'base-300': '#C0DCC8',
          'base-content': '#2A2E37', // Основной текст — тёмный на светлом фоне

          info: '#3ABFF8',
          'info-content': '#000000',

          success: '#43E97B',
          'success-content': '#000000',

          warning: '#FFD166',
          'warning-content': '#000000',

          error: '#FF6F61',
          'error-content': '#ffffff',

          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',
          '--btn-text-case': 'uppercase',
          '--navbar-padding': '0.5rem',
          '--border-btn': '1px',
        },
      },
      'synthwave',
      'bumblebee',
    ],
    darkTheme: 'synthwave', // Set this if you want to override default dark mode behavior
  },
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground: 'rgb(var(--accent-content) / <alpha-value>)',
        },
        background: 'rgb(var(--base-100) / <alpha-value>)',
        border: 'rgb(var(--base-200) / <alpha-value>)',
        card: {
          DEFAULT: 'rgb(var(--base-100) / <alpha-value>)',
          foreground: 'rgb(var(--base-content) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--error) / <alpha-value>)',
          foreground: 'rgb(var(--error-content) / <alpha-value>)',
        },
        foreground: 'rgb(var(--base-content) / <alpha-value>)',
        input: 'rgb(var(--base-200) / <alpha-value>)',
        muted: {
          DEFAULT: 'rgb(var(--base-200) / <alpha-value>)',
          foreground: 'rgb(var(--base-content) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(var(--base-100) / <alpha-value>)',
          foreground: 'rgb(var(--base-content) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-content) / <alpha-value>)',
        },
        ring: 'rgb(var(--primary) / <alpha-value>)',
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-content) / <alpha-value>)',
        },
        success: 'rgb(var(--success) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
      },
      fontFamily: {
        mono: ['Satoshi', 'var(--font-geist-mono)'],
        sans: ['Satoshi', 'var(--font-geist-sans)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fadeInUp': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
