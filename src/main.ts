import './style.css';

// Audio sources - using free ambient sounds
const audioSources = {
  rain: 'https://cdn.pixabay.com/download/audio/2022/05/13/audio_257112ce97.mp3',
  thunder: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4a465d02ac.mp3',
  waves: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  wind: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3',
  fire: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7c3e5d0ee0.mp3',
  birds: 'https://cdn.pixabay.com/download/audio/2022/03/09/audio_c610232532.mp3',
  crickets: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_88c8a99f25.mp3',
  coffee: 'https://cdn.pixabay.com/download/audio/2023/10/30/audio_13ca089da8.mp3',
  whitenoise: 'https://cdn.pixabay.com/download/audio/2023/03/28/audio_d0eee1551f.mp3',
};

class AmbientSoundMixer {
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private isPlaying = false;
  private isMuted = false;
  private masterVolume = 0.7;
  private meanderActive = false;
  private meanderInterval: number | null = null;

  constructor() {
    this.initializeAudio();
    this.setupEventListeners();
  }

  private initializeAudio() {
    Object.entries(audioSources).forEach(([name, src]) => {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0;
      this.audioElements.set(name, audio);
    });
  }

  private setupEventListeners() {
    // Play/Pause button
    const playBtn = document.getElementById('playBtn') as HTMLButtonElement;
    playBtn?.addEventListener('click', () => this.togglePlay());

    // Master volume
    const masterVolumeSlider = document.getElementById('masterVolume') as HTMLInputElement;
    masterVolumeSlider?.addEventListener('input', (e) => {
      this.masterVolume = Number.parseInt((e.target as HTMLInputElement).value) / 100;
      this.updateAllVolumes();
    });

    // Mute button
    const muteBtn = document.getElementById('muteBtn') as HTMLButtonElement;
    muteBtn?.addEventListener('click', () => this.toggleMute());

    // Reset button
    const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
    resetBtn?.addEventListener('click', () => this.reset());

    // Meander button
    const meanderBtn = document.getElementById('meanderBtn') as HTMLButtonElement;
    meanderBtn?.addEventListener('click', () => this.toggleMeander());

    // Individual sound sliders
    document.querySelectorAll('.sound-container').forEach((container) => {
      const soundName = container.getAttribute('data-sound');
      const slider = container.querySelector('.sound-slider') as HTMLInputElement;
      const icon = container.querySelector('.sound-icon') as HTMLElement;

      slider?.addEventListener('input', (e) => {
        const value = Number.parseInt((e.target as HTMLInputElement).value) / 100;
        this.setSoundVolume(soundName!, value);

        if (value > 0) {
          container.classList.add('active');
        } else {
          container.classList.remove('active');
        }
      });

      icon?.addEventListener('click', () => {
        const currentValue = Number.parseInt(slider.value);
        if (currentValue === 0) {
          slider.value = '50';
          this.setSoundVolume(soundName!, 0.5);
          container.classList.add('active');
        } else {
          slider.value = '0';
          this.setSoundVolume(soundName!, 0);
          container.classList.remove('active');
        }
      });
    });
  }

  private togglePlay() {
    const playBtn = document.getElementById('playBtn') as HTMLButtonElement;

    if (this.isPlaying) {
      this.pause();
      playBtn.classList.remove('playing');
    } else {
      this.play();
      playBtn.classList.add('playing');
    }
  }

  private play() {
    this.isPlaying = true;
    this.audioElements.forEach((audio) => {
      audio.play().catch(err => console.log('Audio play failed:', err));
    });
  }

  private pause() {
    this.isPlaying = false;
    this.audioElements.forEach((audio) => {
      audio.pause();
    });
  }

  private toggleMute() {
    this.isMuted = !this.isMuted;
    const muteBtn = document.getElementById('muteBtn') as HTMLButtonElement;

    this.audioElements.forEach((audio) => {
      audio.muted = this.isMuted;
    });

    if (this.isMuted) {
      muteBtn.classList.add('active');
    } else {
      muteBtn.classList.remove('active');
    }
  }

  private setSoundVolume(soundName: string, volume: number) {
    const audio = this.audioElements.get(soundName);
    if (audio) {
      audio.volume = volume * this.masterVolume;
    }
  }

  private updateAllVolumes() {
    document.querySelectorAll('.sound-slider').forEach((slider) => {
      const container = slider.closest('.sound-container');
      const soundName = container?.getAttribute('data-sound');
      const value = Number.parseInt((slider as HTMLInputElement).value) / 100;

      if (soundName) {
        this.setSoundVolume(soundName, value);
      }
    });
  }

  private reset() {
    document.querySelectorAll('.sound-slider').forEach((slider) => {
      (slider as HTMLInputElement).value = '0';
    });

    document.querySelectorAll('.sound-container').forEach((container) => {
      container.classList.remove('active');
    });

    this.audioElements.forEach((audio) => {
      audio.volume = 0;
    });

    if (this.meanderActive) {
      this.toggleMeander();
    }
  }

  private toggleMeander() {
    this.meanderActive = !this.meanderActive;
    const meanderBtn = document.getElementById('meanderBtn') as HTMLButtonElement;

    if (this.meanderActive) {
      meanderBtn.classList.add('active');
      this.startMeander();
    } else {
      meanderBtn.classList.remove('active');
      this.stopMeander();
    }
  }

  private startMeander() {
    this.meanderInterval = window.setInterval(() => {
      document.querySelectorAll('.sound-slider').forEach((slider) => {
        const container = slider.closest('.sound-container');
        const soundName = container?.getAttribute('data-sound');
        const currentValue = Number.parseInt((slider as HTMLInputElement).value);

        if (currentValue > 0 && soundName) {
          // Random fluctuation ±10%
          const fluctuation = (Math.random() - 0.5) * 20;
          const newValue = Math.max(0, Math.min(100, currentValue + fluctuation));
          (slider as HTMLInputElement).value = newValue.toString();
          this.setSoundVolume(soundName, newValue / 100);
        }
      });
    }, 2000);
  }

  private stopMeander() {
    if (this.meanderInterval !== null) {
      clearInterval(this.meanderInterval);
      this.meanderInterval = null;
    }
  }
}

// Initialize the app
new AmbientSoundMixer();
