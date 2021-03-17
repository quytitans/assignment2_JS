document.addEventListener("DOMContentLoaded", function () {
        var loginChecking = sessionStorage.getItem("vie2")
        if (loginChecking !== "y"){
            document.getElementById("txtNoitification").innerText="Please login first"
            $('#NoitiModal').modal({
                show: true
            })
        }
        const API_DOMAIN = "https://2-dot-backup-server-003.appspot.com";
        const SONG_PATH = "/_api/v2/songs";
        var tokenKey = sessionStorage.getItem("vie");
// -----------------------------------------------------------------------------
        var xhr = new XMLHttpRequest();
        var divResult = document.getElementById("mysongs");
        var realResult = "";
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    //ket qua tra ve duoc chuyen sang dinh dang JS object;
                    var responseJSobj = JSON.parse(this.responseText);
                    for (var i = 0; i < responseJSobj.length; i++) {
                        var author01 = responseJSobj[i].author;
                        var link01 = responseJSobj[i].link;
                        var singer01 = responseJSobj[i].singer;
                        var imgThumbnail01 = responseJSobj[i].thumbnail;
                        var name01 = responseJSobj[i].name;
                        realResult +=
                            `<div class="col-12 col col-sm-6 col-md-4 row">
                                <div class="col-12 col-sm-12 divIMG">
                                    <img class="imgThumnail01" src="${imgThumbnail01}" alt="" onclick="showVideo()" data-toggle="modal" data-target="#staticBackdrop">
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
                            </div>`
                    }
                    divResult.innerHTML = realResult;
                } else {
                    console.log("co loi xay ra hay kiem tra lai");
                    document.getElementById("txtNoitification").innerText="something's wrong please check and try again"
                    $('#NoitiModal').modal({
                        show: true
                    })
                }
            }
        }
        xhr.open("GET", API_DOMAIN + SONG_PATH);
        //Xác định kiểu dữ liệu gửi lên
        xhr.setRequestHeader("Content-Type", "application/json")
        //chỉ active khi có key
        xhr.setRequestHeader("Authorization", `Basic ${tokenKey}`)
        xhr.send();

        //Hàm mở video và show vào modal
        function showVideo(IDvideo, title01) {
            iFrame01.src = "https://www.youtube.com/embed/" + IDvideo;
            document.getElementById("titleModal").innerText = title01;
            // = title01
        }

        //Hàm đóng video trong modal xóa source
        function closeVideo() {
            iFrame01.src = "";
        }
    }
)






