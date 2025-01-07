<template>

    <div class="music-player" v-if="ActivarMusica"> 
    

<q-btn-dropdown
      class="glossy"
      color="deep-orange"
     icon="eva-music-outline" 
     menu-anchor="top right"  
     menu-self="bottom right"  
     size="25px"
   
    >
    <div class="music-info">
        <p>{{ currentTrack.name }}</p>
        <p>{{ currentTrack.artist }}</p>
        
      </div>
     
      <div class="controls">
        <q-btn round color="primary" @click="backTrack" icon="eva-rewind-left-outline" glossy />
        <q-btn v-if="parado" round color="primary" @click="playTrack" icon="eva-play-circle-outline" glossy />
        <q-btn v-else round color="primary" @click="pauseTrack" icon="eva-pause-circle-outline" glossy />
        <q-btn round color="primary" @click="nextTrack" icon="eva-rewind-right-outline" glossy />
        
      </div>

    </q-btn-dropdown>
    <audio ref="audio" :src="currentTrack.url" autoplay  ></audio>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, onUnmounted,computed } from 'vue';
  import { useCounterStore } from '@/stores/counter';
  

    function mezclarMusica() {
    const aux = [
        { name: 'North Carolina', artist: 'Anuel AA,Eladio Carrion', url: '/songs/North_Carolina_Clean)-Anuel AA,Eladio Carrion .mp3' },
        { name: '200 MPH', artist: 'Bad Bunny, Diplo', url: '/songs/200 MPH (Clean) - Bad Bunny, Diplo.mp3' },
        { name: 'El Nene', artist: 'Anuel AA', url: '/songs/Anuel AA - El Nene (Clean Version).mp3' },
        { name: 'BRON 1', artist: 'Benny The Butcher', url: '/songs/Benny The Butcher - BRON (Prod. Hit-Boy) (New Official Audio) [7wORCtXe8ps].mp3' },
        { name: 'In Ha Mood', artist: 'Ice Spice', url: '/songs/In Ha Mood.mp3' },
        { name: 'Hora Cero', artist: 'Myke Towers', url: '/songs/Myke Towers - Hora Cero clean version.mp3' },
        { name: 'One Call', artist: 'Rich Amiri', url: '/songs/Rich Amiri - One Call (Official Audio).mp3' },
        { name: 'Rick Flair', artist: 'Anuel AA', url: '/songs/Rick Flair (Clean) - Anuel AA .mp3' },
        { name: 'I KNOW', artist: 'I KNOW', url: '/songs/Travis Scott - I KNOW _ (Official Audio).mp3' },
      ];
     
    return aux.sort(() => Math.random() - 0.5);
}
      const parado=ref(false)
      // Lista interna de canciones
      const playlist =  mezclarMusica();
      console.log(playlist)
    const useApp = useCounterStore();
    const ActivarMusica = computed(() => useApp.ActivarMusica);
  
        
  const audio = ref(null);
 
      const currentTrackIndex = ref(0);
  
     
      const currentTrack = reactive({
      
        name: playlist[0]?.name || '',
        artist: playlist[0]?.artist || '',
        url: playlist[0]?.url || '',
      });
  
      const updateTrack = () => {
        const track = playlist[currentTrackIndex.value];
        currentTrack.name = track.name;
        currentTrack.artist = track.artist;
        currentTrack.url = track.url;
        if (audio.value) {
          audio.value.load(); 
          audio.value.play(); 
          parado.value = false;
        }
      };
  
      const nextTrack = () => {
        currentTrackIndex.value =
          (currentTrackIndex.value + 1) % playlist.length;
        updateTrack();
      };

      const pauseTrack = () => {
        audio.value.pause();
        parado.value = true;
      };

      const playTrack = () => {
        audio.value.play();
        parado.value = false;
      };

      const backTrack = () => {
        currentTrackIndex.value =
        (currentTrackIndex.value - 1 + playlist.length) % playlist.length;
        updateTrack();
      };
  
  
  </script>
  
  <style scoped>
   
  .music-player {
  
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
   
    border-radius: 8px;
    max-width: 100px;
  }
  .music-info {
    margin-top: 5px;
    margin-bottom: 1rem;
    text-align: center;
  }
  .controls {
    text-align: center;
    margin: 0.5rem;

  }
  .controls button {
     
    margin: 0.5rem;

  }
  </style>
  