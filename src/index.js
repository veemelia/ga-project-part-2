const slider = document.querySelector(".slider");
const previous = document.querySelector(".previous");
const mainBtn = document.querySelector(".play");
const next = document.querySelector(".next");
const mainImg = document.querySelector("#mainImg");
const audio = document.querySelector("#audio");

const playImg = "public/play.png";
const pauseImg = "public/pause.png";

let isPlaying = false;

const onLoad = () => {
  const songList = ["adaytoremember", "romantic", "thejazzpiano"];
  audio.src = `public/${
    songList[Math.floor(Math.random() * songList.length)]
  }.mp3`;
};

const togglePlay = () => {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    slider.max = audio.duration;
    mainImg.src = pauseImg;
  } else {
    audio.pause();
    isPlaying = false;
    mainImg.src = playImg;
  }

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    togglePlay();
  });

  audio.addEventListener("timeupdate", () => {
    slider.value = audio.currentTime;
  });

  slider.addEventListener("change", () => {
    audio.currentTime = slider.value;
  });
};

window.onload = onLoad();
