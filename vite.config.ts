import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import { copy } from 'vite-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
  
    copy([
      {
        src: 'node_modules/bootstrap/dist/*', 
        dest: 'public/vendor/bootstrap' 
      }
    ])
  ]
})
