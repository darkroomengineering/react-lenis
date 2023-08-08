/**
 * @callback EasingFunction
 * @param {number} rawValue
 * @returns {number} outputValue
 */

/**
 * @typedef {Object} EventParams
 * TODO: this
 */

/**
 * @typedef {Object} EventParams
 * TODO: this
 */

/**
 * @callback CallbackFunction
 * @param {EventParams} [eventParams]
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
 * TODO: type this with optional event object param
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
 * @property {HTMLElement=} [content=document.documentElement] interpolation rate
 * @property {(HTMLElement|Window)} [wheelEventsTarget=wrapper] interpolation rate
 * @property {number=} [lerp=0.1] interpolation rate
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
 * TODO: fill this
 */

/**
 * @typedef {Object} Emitter
 * TODO: fill this
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
