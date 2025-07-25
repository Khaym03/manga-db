import { useState } from 'react'
import logo from './assets/images/logo-universal.png'
import { Greet } from '../wailsjs/go/main/App'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
    </ThemeProvider>
  )
}

export default App
