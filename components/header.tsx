'use client'
import Link from "next/link";
import Github from "./github";
import { Button } from "./ui/button";
import { Moon, NotebookPen, Sun } from "lucide-react";
import { useTheme } from "next-themes";


export default function Header() {
    const {theme, setTheme} = useTheme()
    setTheme('light');
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
       <NotebookPen size={36}/>
        <h1 className="sm:text-3xl text-2xl font-bold ml-2 tracking-tight">
          Social Bio Generator
        </h1>
      </Link>
      
      <div className="flex gap-5">
      <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
            <span className="sr-only">Toggle theme</span>
          </Button>
      <a
        className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100"
        href="https://github.com/Mudasir-Fayaz/socialbio"
        target="_blank"
        rel="noopener noreferrer"
      >
        
         
       <Github />
        <p>Star on GitHub</p>
      </a>
      </div>
    </header>
  );
}