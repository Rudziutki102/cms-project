'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon,MoonIcon } from './Icons';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button className="border border-purple-500 rounded-2xl p-1 hover:bg-purple-500 hover:bg-opacity-10 dark:bg-amber-250" onClick={()=>setTheme(theme==='dark' ? 'light' : 'dark')}>
      {theme=='dark' ? <SunIcon/> : <MoonIcon/>}
    </button>
  )
}

export default ThemeSwitch