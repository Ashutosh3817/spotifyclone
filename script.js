console.log("Welcome To Spotify");

//Initaialize The Variables
let songIndex=0;
let audioElement = new Audio("songs/1.mp3");

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));//because it is a html connection
let masterSongName = document.getElementById("masterSongName");
let songs = [
  {
    songName: "Namo Namo",
    filePath: "songs/0.mp3",
    coverPath: "covers/kedarnath.jpg",
    
  },
  {
    songName: "Raabta Agent Vinod",
    filePath: "songs/1.mp3",
    coverPath: "covers/raabta.jpg",
  },
  {
    songName: "Barbaadiyan Shiddat",
    filePath: "songs/2.mp3",
    coverPath: "covers/shiddat.jpg",
  },
  {
    songName: "Desires",
    filePath: "songs/3.mp3",
    coverPath: "covers/ap.jpg",
  },
  {
    songName: "Excuses",
    filePath: "songs/4.mp3",
    coverPath: "covers/ap.jpg",
  },
  {
    songName: "Kacha Badam",
    filePath: "5.mp3",
    coverPath: "covers/kacha.jpg",
  },
  {
    songName: "Saiyaan Ne Dekha Aise",
    filePath: "songs/6.mp3",
    coverPath: "covers/badshah.jpg",
  },
  {
    songName: "Sooraj Dooba Hai",
    filePath: "songs/7.mp3",
    coverPath: "covers/sooraj.jpg",
  },
  {
    songName: "Tere Te",
    filePath: "songs/8.mp3",
    coverPath: "covers/ap.jpg",
  },
  {
    songName: "The-Kid-Laroi-Ft-Justin Bieber",
    filePath: "songs/9.mp3",
    coverPath: "covers/justin.jpg",
  },
];
songItems.forEach((element,i)=>{
  //console.log(element ,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();

//Handle Play/Pause Click
masterPlay.addEventListener("click", () => {
  //if audio element is not play

  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity=1;
  }

  //if we have to pause playing audio 
  else{
      audioElement.pause();
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      gif.style.opacity = 0;

    }
});
//Listen To Events
audioElement.addEventListener('timeupdate', ()=>{
   // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
 //   console.log(progress);
    myProgressBar.value = progress;
});
//jab bhi myprogressbar hum change krenge to audio ko
//sync krenge
//percentage se duration me convert krne ke liye
//current time/duration * 100 = PERCENTAGE
//Current Time = Percentage/100

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});
const makeAllPlays=()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    //console.log(e.target);//e.target se wo element mil jaayega jis par click hua hai
    makeAllPlays();

    masterSongName.innerText = songs[songIndex].songName;

    songIndex = parseInt(e.target.id);

    //console.log(index)
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime=0;

    audioElement.play();
    gif.style.opacity = 1;


    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    
  })
});
document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>=9){
    songIndex=0;
  }
  else{
  songIndex += 1;

  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;

  audioElement.currentTime=0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
})

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});