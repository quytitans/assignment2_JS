document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("loadingIcon").style.display = ""
        document.getElementById("home").onclick = function () {
            window.location.href = "homePage.html";}
        document.getElementById("create").onclick = function () {
            window.location.href = "createSong.html";}
        document.getElementById("songs").onclick = function () {
            window.location.href = "lastestSong.html";}
        var loginChecking = sessionStorage.getItem("vie2")
        if (loginChecking !== "y") {
            document.getElementById("loadingIcon").style.display = "none"
            document.getElementById("txtNoitification").innerText = "Please login first"
            $('#NoitiModal').modal({show: true})}
        const API_DOMAIN = "https://2-dot-backup-server-001.appspot.com";
        const MY_SONG_PATH = "/_api/v2/songs/get-mine";
        var tokenKey = sessionStorage.getItem("vie");
// -----------------------------------------------------------------------------
        var xhr = new XMLHttpRequest();
        var divResult = document.getElementById("mysongs");
        var realResult = "";
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    document.getElementById("loadingIcon").style.display = "none"
                    //ket qua tra ve duoc chuyen sang dinh dang JS object;
                    var responseJSobj = JSON.parse(this.responseText);
                    for (var i = 0; i < responseJSobj.length; i++) {
                        var author01 = responseJSobj[i].author;
                        var link01 = responseJSobj[i].link;
                        var singer01 = responseJSobj[i].singer;
                        var imgThumbnail01 = responseJSobj[i].thumbnail;
                        var name01 = responseJSobj[i].name;
                        realResult +=
                            `<div class="col-12 col col-sm-6 col-md-4 musicItem">
                        <div class="row">
                                <div class="col-12 col-sm-12 divIMG">
                                    <img class="imgThumnail01" src="${imgThumbnail01}" alt="">
                                </div>
                                <div class="col-12 col-sm-12 ">
                                    <h2 class="songName center">${name01}</h2>
                                </div>
                                <div class="col-12 col-sm-12 row divInfo" >
                                    <h3 class="col-12 col-sm-12 songInfo">Singer: ${singer01}</h3>
                                    <h3 class="col-12 col-sm-12 songInfo">Author: ${author01}</h3>
                                </div>
                                <div class="col-12 col-sm-12 divAudio" >
                                   <audio controls>
                                    <source src="${link01}" type="audio/ogg">
                                    <source src="${link01}" type="audio/mpeg">
                                    </audio>
                                </div>   
                        </div>
                                
                            </div>`
                    }
                    divResult.innerHTML = realResult;
                } else {
                    document.getElementById("loadingIcon").style.display = "none"
                    console.log("co loi xay ra hay kiem tra lai");
                    document.getElementById("txtNoitification").innerText = "something's wrong please check and try again"
                    $('#NoitiModal').modal({
                        show: true
                    })
                }
            }
        }
        xhr.open("GET", API_DOMAIN + MY_SONG_PATH);
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.setRequestHeader("Authorization", `Basic ${tokenKey}`)
        xhr.send();
    }
)






