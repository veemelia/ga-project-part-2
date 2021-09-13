// Element selectors
const slider = document.querySelector(".slider");
const previous = document.querySelector(".previous");
const mainBtn = document.querySelector(".play");
const next = document.querySelector(".next");
const mainImg = document.querySelector("#mainImg");
const audio = document.querySelector("#audio");

// Media file imports
const playImg = require("../public/play.png");
const pauseImg = require("../public/pause.png");
const aDayToRemember = require("url:../public/adaytoremember.mp3");
const romantic = require("url:../public/romantic.mp3");
const theJazzPiano = require("url:../public/thejazzpiano.mp3");

// File setup
let isPlaying = false; // Indicator whether song is currently playing
const songList = [aDayToRemember, romantic, theJazzPiano]; // List of songs
let index = Math.floor(Math.random() * songList.length); // Index is initially randomized

// Function: Sets audio src based on song index
const setSong = () => {
  audio.src = songList[index];
};

// When main button (play/pause) is clicked
mainBtn.addEventListener("click", () => {
  if (!isPlaying) {
    // If music is not playing
    slider.max = audio.duration; // Set slider max to duration of song
    audio.play(); // Play song
    isPlaying = true; // Change indicator to true
    mainImg.src = pauseImg; // Set main button image to pause image
  } else {
    // If music is playing
    audio.pause(); // Pause song
    isPlaying = false; // Change indicator to false
    mainImg.src = playImg; // Set main button image to play image
  }
});

// When song has ended, reset song's current time and trigger next button to play next song
audio.addEventListener("ended", () => {
  audio.currentTime = 0;
  next.click();
});

// When there is a time change in the song is played, update the slider to follow accordingly
audio.addEventListener("timeupdate", () => {
  slider.value = audio.currentTime;
});

// When slider is moved by user, reset song time accordingly
slider.addEventListener("change", () => {
  audio.currentTime = slider.value;
});

// When back button is clicked
previous.addEventListener("click", () => {
  index -= 1; // Decrease index to get previous song in list

  // If song is already the first song in list, then set index for last song in list
  if (index < 0) {
    index = songList.length - 1;
  }

  setSong(); // Set new audio src

  if (!isPlaying) {
    // If no song is currently playing
    audio.pause(); // Leave audio paused
  } else {
    // If song is currently playing
    audio.play(); // Leave audio playing
  }
});

// When forward button is clicked
next.addEventListener("click", () => {
  index += 1; // Increase index to get next song in list

  // If song is alrady the last song in list, then set index for first song in list
  if (index === songList.length) {
    index = 0;
  }

  setSong(); // Set new audio src
  slider.max = audio.duration; // Set new slider max to match new audio

  if (!isPlaying) {
    // If no song is currently playing
    audio.pause(); // Leave audio paused
  } else {
    // If song is currently playing
    audio.play(); // Leave audio playing
  }
});

// When new song is loaded into player, make sure slider max has been adjust to song duration
audio.addEventListener("loadeddata", function () {
  slider.max = audio.duration;
});

window.onload = setSong(); // When window is loaded, set a (randomized) song
