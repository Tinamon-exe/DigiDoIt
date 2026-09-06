import { useEffect, useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import { Timer, Clock, Layers, BarChart3, FileSpreadsheet } from 'lucide-react';
import type { TimerDisplayMode } from './types';

import { TimerBar } from './components/TimerBar';


function App() { 
  const [seconds, setSeconds] = useState(60)
  const [running, setRunning] = useState(false)
  const [online, setOnline] = useState(false)
  const [activeTab, setActiveTab] = useState<'tasks' | 'stats' | 'export'>('tasks');

  // Timer Display Mode Preference
  const [timerDisplayMode, setTimerDisplayMode] = useState<TimerDisplayMode>(() => {
    try {
      const saved = localStorage.getItem('digidoit_timer_display_mode') as TimerDisplayMode;
      if (
        saved === 'both_task_first' ||
        saved === 'both_session_first' ||
        saved === 'task_only' ||
        saved === 'session_only'
      ) {
        return saved;
      }
    } catch {}
    return 'session_only';
    // TODO: whenn everything is set up make 'both_task_first' as default return.
    // return 'both_task_first';
  });
  
  // TODO add: handleTimerDisplayModeChange when display mode changes. 
  const savedTimerCheckpoint = (() => {
      try {
        const raw = localStorage.getItem('digidoit_active_session_checkpoint');
        if (raw) return JSON.parse(raw);
      } catch {}
      return null;
    })();
  
  const [sessionSeconds, setSessionSeconds] = useState<number>(() => savedTimerCheckpoint?.sessionSeconds || 0);
  const [isTaskTimerRunning, setIsTaskTimerRunning] = useState<boolean>(false);
  
   // Timer interval loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isTaskTimerRunning) {
      interval = setInterval(() => {
        setSessionSeconds((s) => s + 1);
        // TODO: add task timer

        // TODO: add real-time Digimon progression 
        

        // TODO: add Pomodoro timer
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTaskTimerRunning]);

  const handleToggleTaskTimer = () => {
    setIsTaskTimerRunning((prev) => !prev);
  };

  const handleStopAndSaveTaskTimer = () => {
    // TODO!
    }

// Old stuff only important for testing.
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navigation Bar */}
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
                <span className={`online-status ${online ? 'online-status--online' : 'online-status--offline'}`}
                  >
                  {online ? 'Online' : 'Offline'}
                </span>
              </div>
              <p className="brand-description">
                Train your Digimon and Focus.
              </p>
            </div>
          </div>
          {/* Primary View Switcher Tabs */}
          <div className="view-tabs">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`view-tab ${
                activeTab === 'tasks' ? 'view-tab--active' : ''
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`view-tab ${
                activeTab === 'stats' ? 'view-tab--active' : ''
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Stats</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`view-tab ${
                activeTab === 'export' ? 'view-tab--active' : ''
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
          {/* TODO: Add digimon Menu and Options (maybe burger menu) */}
        </div>
      </header>
      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Main Timer */}
        <TimerBar
          sessionSeconds={sessionSeconds}
          isTaskTimerRunning={isTaskTimerRunning}
          timerDisplayMode={timerDisplayMode}
          onToggleTaskTimer={handleToggleTaskTimer}
          onStopAndSaveTaskTimer={handleStopAndSaveTaskTimer}
        />
      </main>
    </div>

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
