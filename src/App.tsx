import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Guide from './components/Guide'
import Tokenomics from './components/Tokenomics'
import Community from './components/Community'
import Game from './components/Game'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Guide />
      <Tokenomics />
      <Game />
      <Community />
    </>
  )
}

export default App
