import React, { useEffect, useRef, useState } from 'react'
import { ReactLenis, useLenis } from '../src'
import { useFrame } from '@studio-freight/hamo'
import cn from 'clsx'

function ScrollableContent() {
  useLenis((lenis) => {
    // console.log('Current page progress', lenis.progress)
    console.log(lenis.scroll, lenis.limit)
  })

  return (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit in excepturi id accusamus quisquam ipsum hic
      nostrum sapiente! Provident dolor architecto ullam explicabo mollitia est veniam. Nulla temporibus nisi iusto.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure repellendus illo nobis officiis quia ratione earum
      dolor. Eum, officiis! Voluptate qui harum pariatur accusamus, porro quis ipsum. Eius, nihil nesciunt!
    </p>
  )
}

function App() {
  // state change simulation to test deps
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((v) => v + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useLenis(
    ({ scroll }) => {
      console.log('Current scroll position', scroll, count)
    },
    [count],
    1,
  )

  const lenisRef = useRef()

  useFrame((time) => {
    lenisRef.current.raf(time)
  })

  return (
    <ReactLenis ref={lenisRef} className={cn('scroller', count)} options={{}} autoRaf={false}>
      <ScrollableContent />
    </ReactLenis>
  )
}

export default App
