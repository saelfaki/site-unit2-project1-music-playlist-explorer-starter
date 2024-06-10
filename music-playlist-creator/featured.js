
function getRandomPlaylist(){
    const randomIndex = Math.floor(Math.random() * data.playlists.length);
    return data.playlists[randomIndex];
}

function displayrandomPlaylist(playlist){
    const featuredHome = document.querySelector(".featured-home");
    const featuredPlaylist = document.createElement("div");
    featuredPlaylist.classList.add("featured-playlist");
    featuredPlaylist.innerHTML = `
    <div style="display: flex; flex-direction: column; background-color: white;">
    <img src="${playlist.playlist_art}" alt="" width=300px height=300px>
    <h1>${playlist.playlist_name}</h1>
    <h2>${playlist.playlist_creator}</h2>
    </div>
    `
    featuredHome.appendChild(featuredPlaylist);

    const songContainer = document.createElement("div");
    songContainer.classList.add("song-container");



    playlist.songs.forEach(song => {
      const songCard = document.createElement("div");
      songCard.classList.add("song");
      songCard.innerHTML = `
      <img src="${song.cover_art}" alt="">
      <div class="song-info">
        <h3 class="song-title">${song.title}</h3>
        <div class="song-album-duration">
            <h4 class="song-artist">Artist: ${song.artist}</h4>
            <span class="song-duration">(${song.duration})</span>
          </div>
      </div>
      </div>`

      songContainer.appendChild(songCard);

    });
    console.log(songContainer);
    featuredPlaylist.appendChild(songContainer);
}

  document.addEventListener('DOMContentLoaded', () => {
    const playlist = getRandomPlaylist();
    console.log(playlist);
    displayrandomPlaylist(playlist);
  });
