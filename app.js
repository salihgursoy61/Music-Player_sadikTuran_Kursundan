const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const audio = document.querySelector("#audio");

const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");

const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");

const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");

const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
});
const displayMusic = (music) => {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
};

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});
const pauseMusic = () => {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
};
const playMusic = () => {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
};

prev.addEventListener("click", () => {
  prevMusic();
});

const prevMusic = () => {
  player.prev();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
};

next.addEventListener("click", () => {
  nextMusic();
});

const nextMusic = () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
};
const calculeteTime = (toplamSaniye) => {
  const dakika = Math.floor(toplamSaniye / 60);
  const saniye = Math.floor(toplamSaniye % 60);
  const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuc = `${dakika}:${guncellenenSaniye}`;
  return sonuc;
};
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculeteTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculeteTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculeteTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
  }
});

let sesDurumu = "sesli";

volume.addEventListener("click", () => {
  if (sesDurumu === "sesli") {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});


