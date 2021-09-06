const audio = document.querySelector("#audio");

const songList = ["adaytoremember", "romantic", "thejazzpiano"];

let isPlaying = false;
let index = Math.floor(Math.random() * songList.length);

const setSong = () => {
  audio.src = `../public/${songList[index]}.mp3`;
};

const togglePlay = () => {
  const mainImg = document.querySelector("#mainImg");
  const slider = document.querySelector(".slider");
  const playImg = "../public/play.png";
  const pauseImg = "../public/pause.png";

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

const previous = () => {
  index -= 1;

  if (index < 0) {
    index = songList.length - 1;
  }

  setSong();

  if (!isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
};

const next = () => {
  index += 1;

  if (index === songList.length) {
    index = 0;
  }

  setSong();

  if (!isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
};

window.onload = setSong();
