document.addEventListener("DOMContentLoaded", function () {
    var tokenKey = sessionStorage.getItem("vie");
    var loginChecking = sessionStorage.getItem("vie2")
    if (loginChecking !== "y") {
        document.getElementById("loadingIcon").style.display = "none"
        document.getElementById("viewSongsLink").style.display = "none"
        document.getElementById("loginLink").style.display = ""
        document.getElementById("txtNoitification").innerText = "Please login first"
        $('#NoitiModal').modal({
            show: true
        })
    }
    const API_DOMAIN = "https://2-dot-backup-server-001.appspot.com";
    const CREATE_SONG_PATH = "/_api/v2/songs";
    var btnCreate = document.getElementById("create");
    var btnHome = document.getElementById("homepage02");
    btnHome.onclick = function () {
        window.location.href = "homePage.html";
    };

//Gửi data đi on button click;
    btnCreate.onclick = function () {
        document.getElementById("loadingIcon").style.display = ""
        var txtName = document.getElementById("name").value;
        var txtSinger = document.getElementById("singer").value;
        var txtAuthor = document.getElementById("author").value;
        var txtThumbnail = document.getElementById("thumbnail").value;
        var txtLink = document.getElementById("link").value;

// check null
        if (txtName === "" || txtSinger === "" || txtAuthor === "" || txtThumbnail === "" || txtLink === "") {
            document.getElementById("loadingIcon").style.display = "none"
            document.getElementById("txtNoitification").innerText = "Please complete all info"
            $('#NoitiModal').modal({
                show: true
            })

        } else {
// JS object
            var sendData = {
                name: txtName,
                singer: txtSinger,
                author: txtAuthor,
                thumbnail: txtThumbnail,
                link: txtLink
            }
// Json obj
            var JSonDataSend = JSON.stringify(sendData);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 201) {
                        document.getElementById("loadingIcon").style.display = "none"
                        document.getElementById("viewSongsLink").style.display = ""
                        document.getElementById("loginLink").style.display = "none"
                        document.getElementById("txtNoitification").innerText = "Create success"
                        $('#NoitiModal').modal({show: true})
                    } else {
                        document.getElementById("loadingIcon").style.display = "none"
                        console.log("co loi xay ra hay kiem tra lai");
                        document.getElementById("txtNoitification").innerText = "Upload failed, login fist or check your internet connection"
                        document.getElementById("viewSongsLink").style.display = "none"
                        document.getElementById("loginLink").style.display = ""
                        $('#NoitiModal').modal({show: true})
                    }
                }
            }
            xhr.open("POST", API_DOMAIN + CREATE_SONG_PATH);
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.setRequestHeader("Authorization", `Basic ${tokenKey}`)
            xhr.send(JSonDataSend);

        }
    }
// upload file Thumnail
    var btnThumnailLink = document.getElementById("btnThunailLink")
    var myWidget_thumnail = cloudinary.createUploadWidget({
            cloudName: 'quynv300192',
            uploadPreset: 'qivdh8qo'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Done! Here is the image info: ', result.info);
                console.log(result.info.url)
                document.getElementById("thumbnail").value = result.info.url;
            }
        }
    )
    btnThumnailLink.addEventListener("click", function () {
        myWidget_thumnail.open();
    }, false);
// upload file mp3
    var btnMp3Link = document.getElementById("btnMp3Link")
    var myWidget_mp3 = cloudinary.createUploadWidget({
            cloudName: 'quynv300192',
            uploadPreset: 'qivdh8qo'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Done! Here is the image info: ', result.info);
                console.log(result.info.url)
                document.getElementById("link").value = result.info.url;
            }
        }
    )
    btnMp3Link.addEventListener("click", function () {
        myWidget_mp3.open();
    }, false);
})






