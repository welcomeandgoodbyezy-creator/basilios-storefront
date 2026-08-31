'use client'

import { useEffect, useState } from 'react'

type BIPEvent = Event & {
  prompt: () => Promise<void>
}

export default function InstallButton() {
  const [evt, setEvt] = useState<BIPEvent | null>(null)

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setEvt(e as BIPEvent)
    }
    const onInstalled = () => setEvt(null)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (!evt) return null

  return (
    <button
      type="button"
      onClick={async () => {
        await evt.prompt()
        setEvt(null)
      }}
      className="fixed bottom-20 right-4 z-40 bg-berry text-cream font-extrabold text-sm px-5 py-3 rounded-full border-2 border-cream shadow-[3px_3px_0_0_#59371c] -rotate-2 hover:rotate-0 transition-transform"
    >
      get the app
    </button>
  )
}