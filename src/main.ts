import './style.css';

// Audio sources - using free ambient sounds
const audioSources = {
  rain: 'https://st2.asoftmurmur.com/assets/p/content/rain/main-rain.mp4',
  thunder: 'https://st2.asoftmurmur.com/assets/p/content/thunder/main-thunder.mp4',
  waves: 'https://st3.asoftmurmur.com/assets/p/content/waves/main-waves.mp4',
  wind: 'https://st2.asoftmurmur.com/assets/p/content/wind/main-wind.mp4',
  fire: 'https://st2.asoftmurmur.com/assets/p/content/fire/main-fire.mp4',
  birds: 'https://st3.asoftmurmur.com/assets/p/content/birds/main-birds.mp4',
  crickets: 'https://st3.asoftmurmur.com/assets/p/content/crickets/main-crickets.mp4',
  coffee: 'https://st3.asoftmurmur.com/assets/p/content/people/main-people.mp4',
  singingBowl: 'https://st1.asoftmurmur.com/assets/p/content/sbowl/main-sbowl.mp4',
  whitenoise: 'https://st3.asoftmurmur.com/assets/p/content/whitenoise/main-whitenoise.mp4',
};

class AmbientSoundMixer {
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private isPlaying = false;
  private isMuted = false;
  private masterVolume = 0.7;

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

    // Mute button in controls
    const muteControlBtn = document.getElementById('muteControlBtn') as HTMLButtonElement;
    muteControlBtn?.addEventListener('click', () => this.toggleMute());

    // Reset button
    const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
    resetBtn?.addEventListener('click', () => this.reset());

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

    // Info modal / floating button listeners
    const infoBtn = document.getElementById('infoFloatBtn') as HTMLButtonElement | null;
    const infoModal = document.getElementById('infoModal') as HTMLDivElement | null;
    const infoClose = document.getElementById('infoCloseBtn') as HTMLButtonElement | null;

    const openInfo = () => {
      if (!infoModal) return;
      infoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // move focus into the modal for accessibility
      infoClose?.focus();
    };

    const closeInfo = () => {
      if (!infoModal) return;
      infoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      infoBtn?.focus();
    };

    infoBtn?.addEventListener('click', openInfo);
    infoClose?.addEventListener('click', closeInfo);

    // close when clicking outside content
    infoModal?.addEventListener('click', (ev) => {
      if (ev.target === infoModal) closeInfo();
    });

    // close on Escape
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') closeInfo();
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
    const muteControlBtn = document.getElementById('muteControlBtn') as HTMLButtonElement;

    this.audioElements.forEach((audio) => {
      audio.muted = this.isMuted;
    });

    if (this.isMuted) {
      muteControlBtn?.classList.add('muted');
    } else {
      muteControlBtn?.classList.remove('muted');
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
  }
}

// Initialize the app
new AmbientSoundMixer();
