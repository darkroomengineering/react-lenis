'use client'

import { useFrame } from '@studio-freight/hamo'
import Lenis from '@studio-freight/lenis'
import PropTypes from 'prop-types' // ES6
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { create } from 'zustand'

export const LenisContext = createContext()

const useRoot = create(() => ({}))

function useCurrentLenis() {
  const local = useContext(LenisContext)
  const root = useRoot()

  return local ?? root
}

/**
 * @param {function=} [callback] Callback to be called on scroll
 * @param {Array=} [deps=[]] Dependencies for callback
 * @param {number=} [priority=0] Priority of callback (lower priority callbacks are called first)
 *
 * @returns Lenis instance
 */
export function useLenis(callback, deps = [], priority = 0) {
  const { lenis, addCallback, removeCallback } = useCurrentLenis()

  useEffect(() => {
    if (!callback || !addCallback || !removeCallback || !lenis) return

    addCallback(callback, priority)
    callback(lenis)

    return () => {
      removeCallback(callback)
    }
  }, [lenis, addCallback, removeCallback, priority, ...deps])

  return lenis
}

/**
 * @param {boolean=} [root] Whether Lenis will be initialized on document.documentElement
 * @param {Object=} [options={}] Lenis options
 * @param {boolean=} [autoRaf=true] Whether to call Lenis.raf automatically on every frame
 * @param {number=} [rafPriority=0] Priority of Lenis.raf call (lower priority callbacks are called first)
 */
const ReactLenis = forwardRef(
  ({ children, root = false, options = {}, autoRaf = true, rafPriority = 0, className, ...props }, ref) => {
    const wrapper = useRef()
    const content = useRef()

    const [lenis, setLenis] = useState()

    const callbacks = useRef([])

    const addCallback = useCallback((callback, priority) => {
      callbacks.current.push({ callback, priority })
      callbacks.current.sort((a, b) => a.priority - b.priority)
    }, [])

    const removeCallback = useCallback((callback) => {
      callbacks.current = callbacks.current.filter((cb) => cb.callback !== callback)
    }, [])

    useImperativeHandle(ref, () => lenis, [lenis])

    useEffect(() => {
      const lenis = new Lenis({
        ...options,
        ...(!root && {
          wrapper: wrapper.current,
          content: content.current,
        }),
      })

      setLenis(lenis)

      return () => {
        lenis.destroy()
        setLenis(undefined)
      }
    }, [root, JSON.stringify(options)])

    useFrame((time) => {
      if (autoRaf) {
        lenis?.raf(time)
      }
    }, rafPriority)

    useEffect(() => {
      if (root && lenis) {
        useRoot.setState({ lenis, addCallback, removeCallback })
      }
    }, [root, lenis, addCallback, removeCallback])

    const onScroll = useCallback((e) => {
      for (let i = 0; i < callbacks.current.length; i++) {
        callbacks.current[i].callback(e)
      }
    }, [])

    useEffect(() => {
      if (!lenis) return

      lenis.on('scroll', onScroll)

      return () => {
        lenis.off('scroll', onScroll)
      }
    }, [lenis, onScroll])

    // prevent lenis classes from being removed by react className
    useEffect(() => {
      if (!className) return

      className = String(className).split(' ')

      wrapper.current?.classList.add(...className)

      return () => {
        wrapper.current?.classList.remove(...className)
      }
    }, [className])

    return (
      <LenisContext.Provider value={{ lenis, addCallback, removeCallback }}>
        {root ? (
          children
        ) : (
          <div ref={wrapper} {...props}>
            <div ref={content}>{children}</div>
          </div>
        )}
      </LenisContext.Provider>
    )
  },
)
ReactLenis.displayName = 'ReactLenis'

ReactLenis.propTypes = {
  children: PropTypes.node,
  root: PropTypes.bool,
  options: PropTypes.object,
  autoRaf: PropTypes.bool,
  rafPriority: PropTypes.number,
}

export { ReactLenis, ReactLenis as Lenis }
