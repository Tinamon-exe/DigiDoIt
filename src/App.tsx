import { useEffect, useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import { Timer, Clock } from 'lucide-react';


function App() { 
  const [seconds, setSeconds] = useState(60)
  const [running, setRunning] = useState(false)
  const [online, setOnline] = useState(false)

  useEffect(() => {
    if (!running) {
      return
    }

    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [running])

  function reset() {
    setSeconds(60)
    setRunning(false)
  }
  
  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          {/*  Name and Mode */}
          <div className="name-outer">
            <div className="brand-icon">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="brand-name">
                  Digi-Do it
                </span>
                <span className={online ? 'online-status--online' : 'online-status--offline'}
                  >
                  {online ? 'Online' : 'Offline'}
                </span>
              </div>
              <p className="brand-description">
                Train your Digimon and Focus.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="ticks"></div>

      <section id="timer-main">
        <div id="timer">
          <div className="w-7.5 h-7.5 rounded-xl bg-pink-600 flex items-center justify-center text-white shadow-sm shadow-pink-600/30">
          <Timer className="w-4.5 h-4.5" />
        </div>
          {/* <Timer className="rounded-lg bg-pink-600 flex items-center justify-center text-white" aria-hidden="true" /> */}
          <h2>Timer</h2>
          <p>{seconds}</p>
          <button type="button" 
          className="counter" onClick={() => setRunning(true)}>
            Start
          </button>

          <button type="button" 
          className="counter" onClick={reset}>
            Reset
          </button>
        </div>
      </section> 

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
