let songs = []; //this is global variable
let moods = ['Angry_(mood)','Bright_(mood)','Chill_(mood)','Dark_(mood)','Diljit','Funky_(mood)','Karan aujla','Love_(mood)']
let currentSong= new Audio()

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;

    // Ensure two-digit format using padStart()
    return minutes.toString().padStart(2, '0') + ":" + secs.toString().padStart(2, '0');
}

async function copyHTMLFromURL(hehe) {
    let response = await fetch(`http://127.0.0.1:5500/songs/${hehe}/`);
    
    if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    let htmlContent = await response.text();
    let div = document.createElement("div");
    div.innerHTML = htmlContent;
    let a = div.getElementsByTagName("a");

    for (let i = 0; i < a.length; i++) {
        const element = a[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return
}

const playMusic = (track)=>{
    currentSong.src= "/songs/"+ track
    currentSong.play()
    play.src="pause.svg"
    document.querySelector(".songinfo").innerHTML=track;
    document.querySelector(".songtime").innerHTML="00:00 / 00:00";
   
}

async function main(songs) {

   
    for (let element of moods){
       await copyHTMLFromURL(element)
    }
    let songul=document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML=songul.innerHTML + `<li><img class="invert" style="width: 20px;" src="music.svg" alt="">
                        <div class="info"> 
                            <div >${song.replaceAll("%20", " ")}</div>
                            <div>Abhiman</div>
                        </div>
                        <div class="play-now">
                            <span>Play now</span>
                            <img style="width: 20px;" src="play.svg" alt="">
                        </div>

        ${song.replaceAll("%20", " ")}</li>`
    }

    console.log(songs)
    //Attatch an event listeneer to each song 
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML) 
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
     
    });

    //Attatch an event listener to previous play and next
    play.addEventListener("click",()=>{
        if (currentSong.paused){
            currentSong.play()
            play.src="pause.svg"
        }
        else{
            currentSong.pause()
            play.src="play.svg"
        }
    })

    // Listen for time update event 
    currentSong.addEventListener("timeupdate",()=>{
        console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".songtime").innerHTML= `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left=currentSong.currentTime/currentSong.duration * 100 + "%";
    })

    //Listen for seekbar event listener
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left=percent + "%"
        currentSong.currentTime=((currentSong.duration)*percent)/100
    })

    //event listener for hamburger 
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0 "
    })

    //event listener for close button
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-120% "
    })
    //event listener to previous 
    previous.addEventListener("click",()=>{
        console.log("Previous clicked")
        console.log(currentSong)
    })
    //event listener to  next
    next.addEventListener("click",()=>{
        console.log("next clicked")
        console.log(currentSong.src.split("/").slice(1,-1))
        console.log(songs)

    })
}

main(songs);

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