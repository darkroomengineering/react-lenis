import Lenis from '@studio-freight/lenis'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

let rootLenisInstance

const LenisContext = createContext()

export function useLenis() {
  const lenis = useContext(LenisContext)

  return lenis ?? rootLenisInstance
}

export function useScroll(callback, root = false) {
  const lenis = useLenis(root)

  useEffect(() => {
    if (!lenis) return

    const unsubscribe = lenis.on('scroll', callback)

    lenis.emit()

    return () => unsubscribe()
  }, [lenis, callback])
}

export function ReactLenis({ children, root, ...options }) {
  const wrapper = useRef()
  const content = useRef()

  const [lenis, setLenis] = useState()

  useEffect(() => {
    options.wrapper = wrapper.current
    options.content = content.current

    const lenis = new Lenis({
      ...options,
    })

    setLenis(lenis)

    if (root) {
      rootLenisInstance = lenis
    }
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
