'use client'

import { useEffect, useRef } from 'react'
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger)

export default function MoringaAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { rive, RiveComponent } = useRive({
    src: './moringa.riv', // Replace with your Rive file path
    stateMachines: 'State Machine 1', // Replace with your state machine name
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: false,
  })

  // Assuming you have a number input in your state machine to control the animation progress
  const progressInput = useStateMachineInput(rive, 'State Machine 1', 'progress')

  useEffect(() => {
    if (!rive || !containerRef.current || !progressInput) return

    // Create a proxy object to track scroll progress
    const proxy = { progress: 0 }

    gsap.to(proxy, {
      progress: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
      onUpdate: () => {
        if (progressInput) {
          // Set the progress input value based on scroll position
          progressInput.value = proxy.progress
        }
      },
    })

    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [rive, progressInput])

  return (
    // <div ref={containerRef} className="h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full">
        <RiveComponent />
      </div>
    // </div>
  )
}