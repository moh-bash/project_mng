/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
const currentTheme = localStorage.getItem('theme') || 'light'


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: currentTheme,
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#00796B',
          secondary: '#FFB300',
          background: '#FFFFFF ',
          surface: '#FFFFFF',
          error: '#B00020',
          success: '#4CAF50',
          app: '#FFFFF1',
        },
      },
      dark: {
        dark: true,
        colors: {
            primary: '#a34db6ff',       
            secondary: '#f6f5f1ff',
            background: '#121212',   
            surface: '#1E1E1E',
            error: '#ca1f3eff',
            success: '#58e65fff',
            app: '#2d2c2cff',
        },
      },
    },
  },
})
