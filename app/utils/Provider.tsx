'use client'
import React from 'react'
import { ThemeProvider } from 'next-themes'


type ProviderProps= {
    children:React.ReactNode
}
const Provider = ({children}:ProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>
  
}

export default Provider