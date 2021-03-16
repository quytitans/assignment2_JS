document.addEventListener("DOMContentLoaded", function () {
    var btnMyinfo = document.getElementById("btnInfo")
    var btnMySongs = document.getElementById("btnMysongs")
    var btnCreateSong = document.getElementById("btnCreateSong")
    var btnGetLastestSong = document.getElementById("btnGetLastestSong")

    btnMySongs.onclick = function(){
        window.location.href = "get-my-song.html";
    };
    btnGetLastestSong.onclick = function(){
        window.location.href = "lastestSongs.html";
    }
    btnCreateSong.onclick = function(){
        window.location.href = "createSong.html";
    }
})