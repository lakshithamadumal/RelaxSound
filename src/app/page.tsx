'use client';

import { useState, useRef, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

type Sound = {
  id: string;
  name: string;
  url: string;
};

const SoundIcon = ({ type }: { type: string }) => {
  const iconClass = "w-16 h-16 stroke-current";

  switch (type) {
    case 'rain':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" fill="none">
          <path d="M16 32 Q24 20, 32 32 Q40 20, 48 32" strokeWidth="2" />
          <line x1="20" y1="38" x2="20" y2="44" strokeWidth="2" />
          <line x1="28" y1="40" x2="28" y2="46" strokeWidth="2" />
          <line x1="36" y1="38" x2="36" y2="44" strokeWidth="2" />
          <line x1="44" y1="40" x2="44" y2="46" strokeWidth="2" />
        </svg>
      );
    case 'thunder':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" fill="none">
          <path d="M16 32 Q24 20, 32 32 Q40 20, 48 32" strokeWidth="2" />
          <path d="M32 30 L28 40 L34 40 L30 50" strokeWidth="2" fill="currentColor" />
        </svg>
      );
    case 'waves':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" fill="none">
          <path d="M8 28 Q16 20, 24 28 Q32 20, 40 28 Q48 20, 56 28" strokeWidth="2" />
          <path d="M8 38 Q16 30, 24 38 Q32 30, 40 38 Q48 30, 56 38" strokeWidth="2" />
        </svg>
      );
    case 'wind':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" fill="none">
          <path d="M10 24 L40 24 Q48 24, 48 32 Q48 40, 40 40" strokeWidth="2" />
          <path d="M10 32 L50 32 Q58 32, 58 40" strokeWidth="2" />
          <path d="M10 40 L35 40 Q43 40, 43 48" strokeWidth="2" />
        </svg>
      );
    case 'fire':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" fill="none">
          <path d="M32 48 Q24 44, 24 36 Q24 28, 28 20 L32 12 L36 20 Q40 28, 40 36 Q40 44, 32 48 Z"
                strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
        </svg>
      );
    case 'birds':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" fill="none">
          <path d="M20 32 Q24 28, 28 32 Q32 28, 36 32" strokeWidth="2" />
          <path d="M40 28 Q44 24, 48 28 Q52 24, 56 28" strokeWidth="2" />
        </svg>
      );
    case 'crickets':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="32" rx="12" ry="8" strokeWidth="2" />
          <line x1="20" y1="28" x2="16" y2="24" strokeWidth="2" />
          <line x1="20" y1="36" x2="16" y2="40" strokeWidth="2" />
          <line x1="44" y1="28" x2="48" y2="24" strokeWidth="2" />
          <line x1="44" y1="36" x2="48" y2="40" strokeWidth="2" />
        </svg>
      );
    case 'coffee':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" fill="none">
          <path d="M16 28 L16 44 Q16 48, 20 48 L44 48 Q48 48, 48 44 L48 28" strokeWidth="2" />
          <rect x="16" y="28" width="32" height="4" fill="currentColor" fillOpacity="0.2" />
          <path d="M48 32 L52 32 Q56 32, 56 36 Q56 40, 52 40 L48 40" strokeWidth="2" />
          <path d="M24 20 Q24 24, 28 24" strokeWidth="2" />
          <path d="M32 20 Q32 24, 36 24" strokeWidth="2" />
        </svg>
      );
    case 'bowl':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" fill="none">
          <path d="M16 32 Q16 44, 32 48 Q48 44, 48 32" strokeWidth="2" />
          <ellipse cx="32" cy="32" rx="16" ry="4" strokeWidth="2" />
          <path d="M28 24 Q28 20, 32 20 Q36 20, 36 24" strokeWidth="2" />
        </svg>
      );
    case 'whitenoise':
      return (
        <svg className={iconClass} viewBox="0 0 64 64" fill="none">
          <rect x="20" y="20" width="24" height="24" strokeWidth="2" rx="2" />
          <line x1="26" y1="28" x2="38" y2="28" strokeWidth="2" />
          <line x1="26" y1="32" x2="38" y2="32" strokeWidth="2" />
          <line x1="26" y1="36" x2="38" y2="36" strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
};

const sounds: Sound[] = [
  {
    id: 'rain',
    name: 'Rain',
    url: 'https://cdn.freesound.org/previews/523/523606_1648170-lq.mp3',
  },
  {
    id: 'thunder',
    name: 'Thunder',
    url: 'https://cdn.freesound.org/previews/442/442158_907272-lq.mp3',
  },
  {
    id: 'waves',
    name: 'Waves',
    url: 'https://cdn.freesound.org/previews/237/237793_1015240-lq.mp3',
  },
  {
    id: 'wind',
    name: 'Wind',
    url: 'https://cdn.freesound.org/previews/388/388199_5121236-lq.mp3',
  },
  {
    id: 'fire',
    name: 'Fire',
    url: 'https://cdn.freesound.org/previews/235/235968_3905589-lq.mp3',
  },
  {
    id: 'birds',
    name: 'Birds',
    url: 'https://cdn.freesound.org/previews/548/548588_1153852-lq.mp3',
  },
  {
    id: 'crickets',
    name: 'Crickets',
    url: 'https://cdn.freesound.org/previews/434/434486_5121236-lq.mp3',
  },
  {
    id: 'coffee',
    name: 'Coffee shop',
    url: 'https://cdn.freesound.org/previews/521/521407_11374656-lq.mp3',
  },
  {
    id: 'bowl',
    name: 'Singing Bowl',
    url: 'https://cdn.freesound.org/previews/169/169868_37876-lq.mp3',
  },
  {
    id: 'whitenoise',
    name: 'White noise',
    url: 'https://cdn.freesound.org/previews/191/191963_3292233-lq.mp3',
  },
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [globalVolume, setGlobalVolume] = useState([0.7]);
  const [soundVolumes, setSoundVolumes] = useState<{ [key: string]: number }>(
    sounds.reduce((acc, sound) => ({ ...acc, [sound.id]: 0 }), {})
  );
  const [activeSounds, setActiveSounds] = useState<Set<string>>(new Set());
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    // Initialize audio elements
    sounds.forEach((sound) => {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audio.volume = 0;
      audioRefs.current[sound.id] = audio;
    });

    const currentAudioRefs = audioRefs.current;
    return () => {
      // Cleanup
      Object.values(currentAudioRefs).forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  useEffect(() => {
    // Update all audio volumes
    Object.keys(audioRefs.current).forEach((soundId) => {
      const audio = audioRefs.current[soundId];
      if (audio) {
        const soundVolume = soundVolumes[soundId] || 0;
        const finalVolume = isMuted ? 0 : soundVolume * globalVolume[0];
        audio.volume = finalVolume;
      }
    });
  }, [soundVolumes, globalVolume, isMuted]);

  const togglePlay = () => {
    if (isPlaying) {
      // Pause all playing sounds
      activeSounds.forEach((soundId) => {
        audioRefs.current[soundId]?.pause();
      });
    } else {
      // Play all active sounds
      activeSounds.forEach((soundId) => {
        audioRefs.current[soundId]?.play();
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleSound = (soundId: string) => {
    const newActiveSounds = new Set(activeSounds);

    if (activeSounds.has(soundId)) {
      newActiveSounds.delete(soundId);
      audioRefs.current[soundId]?.pause();
      setSoundVolumes({ ...soundVolumes, [soundId]: 0 });
    } else {
      newActiveSounds.add(soundId);
      setSoundVolumes({ ...soundVolumes, [soundId]: 0.5 });
      if (isPlaying) {
        audioRefs.current[soundId]?.play();
      }
    }

    setActiveSounds(newActiveSounds);
  };

  const handleSoundVolumeChange = (soundId: string, value: number[]) => {
    const newVolume = value[0];
    setSoundVolumes({ ...soundVolumes, [soundId]: newVolume });

    if (newVolume > 0 && !activeSounds.has(soundId)) {
      const newActiveSounds = new Set(activeSounds);
      newActiveSounds.add(soundId);
      setActiveSounds(newActiveSounds);
      if (isPlaying) {
        audioRefs.current[soundId]?.play();
      }
    } else if (newVolume === 0 && activeSounds.has(soundId)) {
      const newActiveSounds = new Set(activeSounds);
      newActiveSounds.delete(soundId);
      setActiveSounds(newActiveSounds);
      audioRefs.current[soundId]?.pause();
    }
  };

  const resetAll = () => {
    activeSounds.forEach((soundId) => {
      audioRefs.current[soundId]?.pause();
    });
    setActiveSounds(new Set());
    setSoundVolumes(sounds.reduce((acc, sound) => ({ ...acc, [sound.id]: 0 }), {}));
    setIsPlaying(false);
  };

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url('https://ext.same-assets.com/2596971692/3557157395.jpeg')` }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Global Volume Control */}
              <div className="flex items-center gap-4">
                <div className="w-32">
                  <Slider
                    value={globalVolume}
                    onValueChange={setGlobalVolume}
                    max={1}
                    step={0.01}
                    className="cursor-pointer"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsMuted(!isMuted)}
                  className="bg-transparent text-white border-white/30 hover:bg-white/10"
                >
                  {isMuted ? 'UNMUTE' : 'MUTE'}
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex items-center gap-6 text-white">
                <a href="#" className="hover:underline">Blog</a>
                <button className="hover:underline">Get Updates</button>
                <a href="#" className="hover:underline">About</a>
                <button className="hover:underline">Log in</button>
              </nav>
            </div>
          </div>
        </header>

        {/* Title */}
        <div className="text-center py-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-widest">
            A SOFT MURMUR
          </h1>
          <p className="text-white text-lg tracking-wide">
            Ambient sounds to wash away distraction.
          </p>
        </div>

        {/* Play Controls */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <button
            className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all"
            title="Meander"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12 Q 6 6, 9 12 T 15 12 T 21 12" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-white/10 border-2 border-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200"
          >
            {isPlaying ? (
              <div className="flex gap-1.5">
                <div className="w-1.5 h-8 bg-white" />
                <div className="w-1.5 h-8 bg-white" />
              </div>
            ) : (
              <div className="w-0 h-0 border-t-[16px] border-t-transparent border-l-[24px] border-l-white border-b-[16px] border-b-transparent ml-1" />
            )}
          </button>

          <button
            onClick={resetAll}
            className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all"
            title="Reset"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
          </button>
        </div>

        {/* Row Controls */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <Button variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10">
            TIMERS
          </Button>
          <Button variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10">
            MIXES
          </Button>
          <Button variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10">
            SHARE
          </Button>
        </div>

        {/* Sound Grid */}
        <div className="container mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 max-w-6xl mx-auto">
            {sounds.map((sound) => (
              <div key={sound.id} className="flex flex-col items-center gap-3">
                <button
                  onClick={() => toggleSound(sound.id)}
                  className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all text-white ${
                    activeSounds.has(sound.id) || soundVolumes[sound.id] > 0
                      ? 'border-white bg-white/20 scale-105'
                      : 'border-white/50 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <SoundIcon type={sound.id} />
                </button>
                <h3 className="text-white text-lg font-medium">{sound.name}</h3>
                <div className="w-full px-2">
                  <Slider
                    value={[soundVolumes[sound.id]]}
                    onValueChange={(value) => handleSoundVolumeChange(sound.id, value)}
                    max={1}
                    step={0.01}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
