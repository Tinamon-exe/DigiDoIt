import React from 'react';
import { Play, Pause, Square, } from 'lucide-react';

import type { TimerDisplayMode } from '../types.ts';
import { formatDurationHHMMSS } from '../lib/csvExport';

interface Props {
  sessionSeconds: number;
  isTaskTimerRunning: boolean;
  timerDisplayMode: TimerDisplayMode;
  onToggleTaskTimer: () => void;
  onStopAndSaveTaskTimer: () => void;
}


export const TimerBar: React.FC<Props> = ({
  sessionSeconds,
  isTaskTimerRunning,
  timerDisplayMode,
  onToggleTaskTimer,
  onStopAndSaveTaskTimer
}) => {
  // TODO: add option to have other traget session h
  const sessionTargetSeconds = 8 * 3600;
  const sessionPercent = Math.min(100, Math.round((sessionSeconds / sessionTargetSeconds) * 100));
  const isTaskFirst = timerDisplayMode === 'both_task_first' || timerDisplayMode === 'task_only';
  return(
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-colors">
      {/* TODO: add navigation and pomodoro section */}
      {/* Main timer */}
      <div className="pt-4 pb-2">
        {/* TODO: add cases: Task only, session only, Task first, session first */}
        {/* TODO also add DigiPartner */}
        {/* Session First / Only */}
        {!isTaskFirst && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                Overall Session Duration
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Goal: 8h ({sessionPercent}%)
                </span>
                {/* TODO: Add option: complete active task */}
              </div>
            </div>

            {/* Primary Timer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-6xl font-mono font-bold tracking-tight text-slate-900 dark:text-white">
                  {formatDurationHHMMSS(sessionSeconds)}
                </span>
                {isTaskTimerRunning && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Recording
                  </span>
                )}
              </div>

              {/* TODO add Digimon  Partner*/}
            </div>

            {/* TODO: add Task Timer Small Underneath */}
          </div>
        )}
      </div>
      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        {/* Play/Pause Button */}
        <button
          onClick={onToggleTaskTimer}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-2 ${
            isTaskTimerRunning
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isTaskTimerRunning ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause Timer</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Start Timer</span>
            </>
          )}
        </button>

        {/* Complete & Save Button */}
        <button
          onClick={onStopAndSaveTaskTimer}
        //   disabled={taskSeconds === 0}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-2"
          title="Save logged work duration into task history"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>Complete &amp; Save</span>
        </button>

        {/* TODO: add Adjust Time / Switch Task Button */}
        {/* TODO: Discard Timer */}
      </div>
    </div>
  );
};