import React from 'react'
import { ReactLenis, useScroll } from '../src/index'

function App() {
  return (
    <main className="main">
      <p>hi</p>
      <ReactLenis>
        <ContentWithLenis />
      </ReactLenis>
    </main>
  )
}

function ContentWithLenis() {
  useScroll(({ scroll }) => {
    console.log({ scroll })
  }, [])

  return (
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem porro! Iure aut vel facilis officia amet quia
      ex ab, eum adipisci reiciendis doloremque vero aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit
      amet consectetur adipisicing elit. Nemo, rem porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci
      reiciendis doloremque vero aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Nemo, rem porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci reiciendis
      doloremque vero aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Nemo, rem porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci reiciendis doloremque vero
      aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem
      porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci reiciendis doloremque vero aspernatur alias,
      repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem porro! Iure aut vel
      facilis officia amet quia ex ab, eum adipisci reiciendis doloremque vero aspernatur alias, repellat fuga.
      Blanditiis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem porro! Iure aut vel facilis
      officia amet quia ex ab, eum adipisci reiciendis doloremque vero aspernatur alias, repellat fuga. Blanditiis.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem porro! Iure aut vel facilis officia amet quia
      ex ab, eum adipisci reiciendis doloremque vero aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit
      amet consectetur adipisicing elit. Nemo, rem porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci
      reiciendis doloremque vero aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Nemo, rem porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci reiciendis
      doloremque vero aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Nemo, rem porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci reiciendis doloremque vero
      aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem
      porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci reiciendis doloremque vero aspernatur alias,
      repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem porro! Iure aut vel
      facilis officia amet quia ex ab, eum adipisci reiciendis doloremque vero aspernatur alias, repellat fuga.
      Blanditiis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem porro! Iure aut vel facilis
      officia amet quia ex ab, eum adipisci reiciendis doloremque vero aspernatur alias, repellat fuga. Blanditiis.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem porro! Iure aut vel facilis officia amet quia
      ex ab, eum adipisci reiciendis doloremque vero aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit
      amet consectetur adipisicing elit. Nemo, rem porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci
      reiciendis doloremque vero aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Nemo, rem porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci reiciendis
      doloremque vero aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Nemo, rem porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci reiciendis doloremque vero
      aspernatur alias, repellat fuga. Blanditiis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, rem
      porro! Iure aut vel facilis officia amet quia ex ab, eum adipisci reiciendis doloremque vero aspernatur alias,
      repellat fuga. Blanditiis.
    </p>
  )
}

export default App
