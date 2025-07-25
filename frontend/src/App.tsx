import { useState } from 'react'
import logo from './assets/images/logo-universal.png'
import './App.css'
import { Greet } from '../wailsjs/go/main/App'
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}

export default App
