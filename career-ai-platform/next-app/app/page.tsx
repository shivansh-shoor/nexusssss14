import React from 'react'
import dynamic from 'next/dynamic'

// Lazy-load components to avoid SSR issues
const ShaderAnimation = dynamic(() => import('../../src/components/ui/shader-lines').then(mod => mod.ShaderAnimation), { ssr: false })
const LuminaInteractiveList = dynamic(() => import('../../src/components/ui/lumina-interactive-list').then(mod => mod.LuminaInteractiveList), { ssr: false })

export default function Page() {
  return (
    <main className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">CB-AI UI Playground</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="ui-card p-4 h-64">
          <ShaderAnimation />
        </div>
        <div className="ui-card p-4 h-64 flex items-center justify-center">
          <LuminaInteractiveList />
        </div>
      </section>
    </main>
  )
}
