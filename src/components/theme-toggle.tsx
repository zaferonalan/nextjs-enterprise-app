import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
    const{ theme ,setTheme }= useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

  return (
    <Button size={'icon'} variant={"outline"} onClick={toggleTheme}>
        <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90'/>
        <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all rotate-90 dark:scale-100 dark:rotate-0'/>
    </Button>
  )
}

export default ThemeToggle