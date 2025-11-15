import React from 'react'
import { Command } from 'cmdk'
import { useEffect } from 'react'
export const CommandMenu = ({
  open, setOpen //props passed from parent component
}) => {


  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu"
      className='fixed inset-0 bg-stone-950/50'
      onClick={() => setOpen(false)}>
      <div onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden w-full max-w-lg mx-auto mt-12'>
        <Command.Input
          placeholder='What do you mean?'
          className='relative border-b border-stone-300 p-4 text=lg w-full placeholder:text-stone-400 focus:outline-none' />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
        //for the searching,.....In future we can add dynamic data here

        </Command.List>
      </div>
    </Command.Dialog>
  )
}