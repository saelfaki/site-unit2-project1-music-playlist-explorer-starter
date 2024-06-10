
const playlists =  data["playlists"];

var songSections = document.getElementsByClassName("playlist-cards*:not(.fa fa-heart-o btn btn-default)");
for (var i = 0; i < songSections.length; i++) {
  songSections[i].addEventListener("click", function() {
    openPlaylistModal();
  });
}

var playlistModal = document.getElementById("playlistModal");
var span = document.getElementsByClassName("close")[0];
var editPlayListModal = document.getElementById("editPlaylist");



function openPlaylistModal() {
  playlistModal.style.display = "block";
}

span.onclick = function() {
  playlistModal.style.display = "none";
}



function createSongInput(title, artist) {
  let songInput = document.createElement("div");
  songInput.classList.add("song");
  songInput.innerHTML = `
    <section class="song">
      <h3>Song Name</h3>
      <input type="text" class="editsongName" value="${title}">
      <h4>Creator Name</h4>
      <input type="text" class="editcreatorName" value="${artist}">
      <button class="removeSongButton" type="button">Remove</button>
    </section>`;

  return songInput;

}






document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", function() {
      const searchQuery = searchInput.value.trim().toLowerCase();
      filterPlaylists(searchQuery);
  });

  function filterPlaylists(query) {
      const playlistCards = document.querySelectorAll(".playlist");

      playlistCards.forEach(playlistCard => {
          const playlistName = playlistCard.querySelector("h3").textContent.toLowerCase();
          const playlistCreator = playlistCard.querySelector("h4").textContent.toLowerCase();
          console.log(playlistName, playlistCreator);
          if (playlistName.includes(query) || playlistCreator.includes(query)) {
              playlistCard.style.display = "block";
          } else {
              playlistCard.style.display = "none";
          }
      });
  }
});









function shuffle(array, container) {
  console.log(array);
  for (let i = array.length - 1; i > 0; i--) {
    console.log("im in loop");
    let j = Math.floor(Math.random() * (i+1));
    console.log(array[i], array[j]);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}



function createPlaylistCards() {
     const container = document.querySelector(".playlist-cards");
     container.innerHTML = "";
     for (const playlist of data.playlists) {
       const playlistCard = document.createElement("div");
       playlistCard.classList.add("playlist");

       playlistCard.innerHTML = `
         <section class="playlist">
           <img src="${playlist.playlist_art}" width="200" height="180">
           <h3>${playlist.playlist_name}</h3>
           <h4>Creator Name: ${playlist.playlist_creator}</h4>
           <i id=heart-${playlist.playlistID} class="fa fa-heart-o"></i>
           <span id=likeCount-${playlist.playlistID}>${playlist.likeCount}</span>
           <button class="delete-button">Delete</button>
       `;

       container.appendChild(playlistCard);

       const deleteButton = playlistCard.querySelector(".delete-button");
        deleteButton.addEventListener("click", function(event) {
          event.stopPropagation();
            playlistCard.remove();
            const index = data.playlists.indexOf(playlist);
            if (index !== -1) {
                data.playlists.splice(index, 1);
            }
        });



       const heart = document.getElementById(`heart-${playlist.playlistID}`);
       let likeCount = document.getElementById(`likeCount-${playlist.playlistID}`);
       let isLiked = playlist.likeCount === 1;
       heart.addEventListener('click', function(event) {
        if (isLiked){
          likeCount.textContent = 0;
          playlist.likeCount = 0;
        } else {
          likeCount.textContent = 1;
          playlist.likeCount = 1;
        }
        isLiked = !isLiked;
       });
       playlistCard.onclick = function(event) {
        if (event.target.classList.contains('fa-heart')) {
          event.target.classList.remove('fa-heart');
          event.target.classList.add('fa-heart-o');
          event.target.style.color = "black";
          likeCount.textContent = 0;
          playlist.likeCount = 0;
        } else if (event.target.classList.contains('fa-heart-o')) {
          event.target.classList.remove('fa-heart-o');
          event.target.classList.add('fa-heart');
          event.target.style.color = "red";
          likeCount.textContent = 1;
          playlist.likeCount = 1;
        } else {
          createTracklist(playlist);
        }
      }
 }}

function getStoredPlaylists(){
  const storedPlaylists = localStorage.getItem("playlists");
  return storedPlaylists ? JSON.parse(storedPlaylists) : [];
}

function storePlaylists(playlists){
  localStorage.setItem("playlists", JSON.stringify(playlists));
}


document.addEventListener("DOMContentLoaded", function () {
  let playlists = getStoredPlaylists();
  if (playlists.length === 0) {
    playlists = data.playlists;
  }
  createPlaylistCards(playlists);
});


function createTracklist(playlist){
  const container = document.querySelector(".tracklist");

  container.innerHTML = "";

  const playlistTitle = document.createElement("div");
  playlistTitle.classList.add("playlist-title");
  playlistTitle.innerHTML = `
    <section class="titleModal">
    <img src="${playlist.playlist_art}" width="20" height="20">
      <h3>${playlist.playlist_name}</h3>
      <h4>Creator Name: ${playlist.playlist_creator}</h4>
    </section>`
  container.appendChild(playlistTitle);


  const shuffleButton = document.createElement("button");
  shuffleButton.classList.add("shuffle-button");
  shuffleButton.innerHTML = `
  <button type="button">Shuffle!</button>`

  container.appendChild(shuffleButton);




  let songs = playlist.songs;
    for (let song of songs){
      const trackCard = document.createElement("div");
      trackCard.classList.add("track");

      trackCard.innerHTML = `
        <section class="tracklist">
          <img src="${song.cover_art}" width="200" height="180">
          <h3>${song.title}</h3>
          <div class="song-album-duration">
            <h4 class="song-artist">Artist: ${song.artist}</h4>
            <span class="song-duration">(${song.duration})</span>
          </div>
        </section>`
      ;

      container.appendChild(trackCard);
    }

  shuffleButton.addEventListener('click', function(event) {
    shuffle(playlist.songs, container);
    createTracklist(playlist);
  });


  playlistModal.style.display = "block";
}


const addsongButton = document.getElementById("addSongButton");
console.log(addsongButton);
  addsongButton.addEventListener('click', function(event) {
    const container = document.getElementById("playlistForm");
    const songInput = createSongInput("", "");
    container.appendChild(songInput);
  });


const submit = document.getElementById("submit");
console.log(submit);
submit.addEventListener("click", function(event) {
  event.preventDefault();
  const playlistName = document.getElementById("playlistName").value;
  const playlistCreator = document.getElementById("playlistCreator").value;
  const songName = document.getElementById("songTitle").value;
  const songArtist = document.getElementById("songArtist").value;
  const songDuration = document.getElementById("songDuration").value;


  const newPlaylist = {
    playlistID: data.playlists.length,
    playlist_name: playlistName,
    playlist_creator: playlistCreator,
    playlist_art: "assets/img/new.png",
    likeCount: 0,
    songs: [{
      songID : data.playlists[8].songs.length,
      title: songName,
      artist: songArtist,
      duration: songDuration,
      cover_art: "assets/img/new.png"
    }]
  }
  data.playlists.push(newPlaylist);
  createPlaylistCards(data.playlists);
});
