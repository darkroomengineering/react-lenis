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

const LenisContext = createContext()

const useRoot = create(() => ({}))

function useCurrentLenis() {
  const local = useContext(LenisContext)
  const root = useRoot()

  return local ?? root
}

/**
 * @param {CallbackFunction} [callback] Callback to be called on scroll
 * @param {Array=} [deps=[]] Dependencies for callback
 * @param {number=} [priority=0] Priority of callback (lower priority callbacks are called first)
 *
 * @returns {LenisInstance} Lenis instance
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
 * @param {ReactLenisOptions} [options={}] Lenis options {@link ReactLenisOptions}
 * @param {boolean=} [autoRaf=true] Whether to call Lenis.raf automatically on every frame
 * @param {number=} [rafPriority=0] Priority of Lenis.raf call (lower priority callbacks are called first)
 */
const ReactLenis = forwardRef(
  ({ children, root = false, options = {}, autoRaf = true, rafPriority = 0, ...props }, ref) => {
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

/**
 * @callback EasingFunction
 * @param {number} rawValue
 * @returns {number} outputValue
 */

/**
 * @callback CallbackFunction
 * @param {object} [eventParams]
 */

/**
 * @typedef {Object} CallbackEvents
 * @property {CallbackFunction[]} scroll scroll events
 */

/**
 * @callback RAF
 * @param {number} time
 */

/** 
 * @typedef {Object} ScrollToParams
 * @param {number} offset equivalent to scroll-padding-top
 * @param {number} lerp animation lerp intensity
 * @param {number} duration animation duration (in seconds)
 * @param {EasingFunction} easing animation easing
 * @param {boolean} immediate ignore duration, easing and lerp
 * @param {boolean} lock whether or not to prevent the user from scrolling until the target is reached
 * @param {boolean} force reach target even if instance is stopped
 * @param {CallbackFunction} onComplete called when the target is reached
 */

/**
 * @callback ScrollTo
 * @param {number|string|HTMLElement} target
 * @param {ScrollToOptions} options
 */

/**
 * @typedef {Object} ReactLenisOptions
 * @property {(HTMLElement|Window)} [wrapper=window] interpolation rate
 * @property {HTMLElement=} [content=document.documentElement] 
 * @property {(HTMLElement|Window)} [wheelEventsTarget=wrapper] 
 * @property {number=} [lerp=0.1] 
 * @property {number=} [duration=1.2] scroll duration
 * @property {EasingFunction=} [easing=(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))] // easing function to apply to scroll values
 * @property {string=} [orientation='vertical'] scroll orientation
 * @property {string=} [gestureOrientation='vertical']
 * @property {boolean=} [smoothWheel=false]
 * @property {boolean=} [smoothTouch=false]
 * @property {boolean=} [syncTouch=false]
 * @property {number=} [syncTouchLerp=0.1]
 * @property {number=} [touchInertiaMultiplier=1]
 * @property {boolean=} [normalizeWheel=false]
 * @property {boolean=} [infinite=false] enable infinite scroll
 * @property {boolean=} [autoResize=true]
 */

/**
 * @typedef {Object} Dimensions
 * @property {(HTMLElement|Window)} wrapper interpolation rate
 * @property {HTMLElement} content interpolation rate
 * @property {ResizeObserver} contentResizeObserver
 * @property {function():void} resize 
 * @property {function():void} onContentResize 
 * @property {function():void} onWrapperResize 
 * @property {number} width
 * @property {number} height
 * @property {number} scrollWidth
 * @property {number} scrollHeight
 */

/**
 * @typedef {Object} Emitter
 * @property {CallbackEvents} events
 */

/**
 * @callback EventHandler
 * @param {string} id lenis instance event
 * @param {CallbackFunction} fn callback
 */

/**
 * @typedef {Object} LenisInstance
 * @property {number} animatedScroll Current scroll value
 * @property {Dimensions} dimensions Dimensions instance
 * @property {number} direction scroll direction; 0: stopped, 1: scrolling up, -1: scrolling down
 * @property {Emitter} emitter Emitter instance
 * @property {ReactLenisOptions} options Instance options {@link ReactLenisOptions}
 * @property {number} targetScroll Target scroll value
 * @property {number} time Time elapsed since instance creation
 * @property {number} actualScroll Current scroll value registered by the browser
 * @property {number} velocity Current scroll velocity
 * @property {boolean} isHorizontal Whether or not the instance is horizontal
 * @property {boolean} isScrolling Whether or not the instance is being animated
 * @property {boolean} isSmooth Whether or not the instance is animated
 * @property {boolean} isStopped Whether or not the user should be able to scroll
 * @property {number} limit Maximum scroll value
 * @property {number} progress Scroll progress from 0 to 1
 * @property {HTMLElement} rootElement Element on which Lenis is instanced
 * @property {number} scroll Current scroll value (handles infinite scroll if activated)
 * @property {function():void} stop Pauses the scroll
 * @property {function():void} start Resumes the scroll
 * @property {function():void} resize Compute internal sizes, has to be used if autoResize option is false
 * @property {function():void} destroy Destroys the instance and removes all events	
 * @property {EventHandler} on Lenis event listener
 * @property {ScrollTo} scrollTo Scroll to target
 * @property {RAF} raf Must be called every frame for internal usage
 */
