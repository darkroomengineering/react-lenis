import { useFrame } from '@studio-freight/hamo'
import Lenis from '@studio-freight/lenis'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

let rootLenisInstance

export function useScroll(callback, root = false) {
  const lenis = useLenis(root)

  useEffect(() => {
    if (!lenis) return

    console.log('subscribing scroll event')
    const unsubscribe = lenis.on('scroll', callback)

    console.log('Emitting scroll event')
    lenis.emit()

    return unsubscribe
  }, [lenis, callback])
}

export function useLenis(root = false) {
  const lenis = useContext(LenisContext)

  return root ? rootLenisInstance : lenis ?? rootLenisInstance
}

const LenisContext = createContext()

export function ReactLenis({ children, root, ...options }) {
  const wrapper = useRef()
  const content = useRef()

  const [lenis, setLenis] = useState()

  useEffect(() => {
    if (!root) {
      options.wrapper = wrapper.current
      options.content = content.current
    }

    const lenis = new Lenis({
      ...options,
    })

    setLenis(lenis)

    if (root) {
      rootLenisInstance = lenis
    }
  }, [root])

  useFrame((time) => {
    lenis.raf(time)
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {root ? (
        children
      ) : (
        <div ref={wrapper}>
          <div ref={content}>{children}</div>
        </div>
      )}
    </LenisContext.Provider>
  )
}
