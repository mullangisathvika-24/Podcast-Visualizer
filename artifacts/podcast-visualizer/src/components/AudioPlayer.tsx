import React from "react";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  audioProgress: number;
  duration: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  setIsPlaying,
  audioProgress,
  duration
}) => {
  return (
    <div className="flex items-center gap-4 w-full lg:w-auto" id="audio-visualizer-console">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-650 via-brand-orange to-brand-orange hover:opacity-95 text-white flex items-center justify-center transition shadow-md shrink-0 active:scale-95 cursor-pointer"
        title={isPlaying ? "Pause summary" : "Listen summary"}
        id="btn-play-audio"
      >
        {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 ml-1 text-white" />}
      </button>
 
      <div className="flex-1 lg:w-56 overflow-hidden">
        {/* Dynamic Wave Simulation indicator */}
        
        {/* Visual Wave bars simulation */}
        <div className="flex gap-1 h-7 items-end justify-center w-full bg-slate-950 p-1.5 rounded-lg border border-white/5">
          {[12, 18, 14, 8, 19, 22, 10, 16, 24, 11, 15, 6, 20, 14, 18, 9, 13, 21, 10, 15].map((val, idx) => {
            const getColorClass = (i: number) => {
              const mod = i % 4;
              if (mod === 0) return "bg-slate-500 dark:bg-slate-600";
              if (mod === 1) return "bg-brand-orange";
              if (mod === 2) return "bg-slate-400 dark:bg-slate-500";
              return "bg-brand-purple"; // Rare premium accent bar
            };
            return (
              <div
                key={idx}
                className={`w-1 rounded-t transition-all duration-300 ${getColorClass(idx)}`}
                style={{
                  height: isPlaying 
                    ? `${Math.max(4, Math.min(100, Math.sin(idx + audioProgress) * 12 + val))}0%` 
                    : "20%"
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
