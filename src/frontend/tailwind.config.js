/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        devops: {
          bg: '#0F172A', // slate-900
          card: '#1E293B', // slate-800
          primary: '#3B82F6', // blue-500
          primaryHover: '#2563EB', // blue-600
          success: '#10B981', // emerald-500
          danger: '#EF4444', // red-500
          text: '#F8FAFC', // slate-50
          muted: '#94A3B8', // slate-400
        }
      }
    },
  },
  plugins: [],
}
