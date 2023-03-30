import React from 'react'
import { ReactLenis, useLenis } from '../src'

function ScrollableContent() {
  useLenis((lenis) => {
    console.log('Current page progress', lenis.progress)
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

function ScrollListener() {
  useLenis(({ scroll }) => {
    console.log('Current scroll position', scroll)
  })

  return null
}

function App() {
  return (
    <ReactLenis root options={{}}>
      <ScrollListener />
      <ScrollableContent />
    </ReactLenis>
  )
}

export default App
