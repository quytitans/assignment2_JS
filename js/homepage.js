document.addEventListener("DOMContentLoaded", function () {
    const API_DOMAIN = "https://2-dot-backup-server-001.appspot.com";
    const MY_INFO_PATH = "/_api/v2/members/information";
    var tokenKey = sessionStorage.getItem("vie");
    var btnMyinfo = document.getElementById("btnInfo")
    var btnMySongs = document.getElementById("btnMysongs")
    var btnCreateSong = document.getElementById("btnCreateSong")
    var btnGetLastestSong = document.getElementById("btnGetLastestSong")
    var btnNowLogin = document.getElementById("btnNowLogin")
    var btnRegister = document.getElementById("btnRegister")
    var loginChecking = sessionStorage.getItem("vie2")
    if (loginChecking !== "y"){
    btnNowLogin.style.display = ""
    btnRegister.style.display = ""
    }else {
        btnMyinfo.style.display = ""
        btnMySongs.style.display = ""
        btnCreateSong.style.display = ""
        btnGetLastestSong.style.display = ""
    }
    btnMySongs.onclick = function(){window.location.href = "get-my-song.html";};
    btnGetLastestSong.onclick = function(){window.location.href = "lastestSong.html";}
    btnCreateSong.onclick = function(){window.location.href = "createSong.html";}
    btnNowLogin.onclick = function(){window.location.href = "login.html";}
    btnMyinfo.onclick = function(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 201) {
                    //ket qua tra ve duoc chuyen sang dinh dang JS object;
                    var responseJSobj = JSON.parse(this.responseText);
                    console.log(responseJSobj)
                    var gender01="";
                    if (responseJSobj.gender === 1) {
                        gender01 = "Male";
                    } else {
                        gender01 = "Female";
                    }
                    document.getElementById("email").innerText = responseJSobj.email
                    document.getElementById("fistName").innerText = responseJSobj.firstName
                    document.getElementById("lastName").innerText = responseJSobj.lastName
                    // lấy birthday và convert về đúng định dạng
                    var birthday = new Date(responseJSobj.birthday);
                    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                    document.getElementById("birthDay").innerText = `${birthday.getDate()}-${months[birthday.getMonth()]}-${birthday.getFullYear()}`
                    document.getElementById("gender").innerText = gender01
                    document.getElementById("phoneNumber").innerText = responseJSobj.phone
                    document.getElementById("address").innerText = responseJSobj.address
                    document.getElementById("idNumber").innerText = responseJSobj.id
                    document.getElementById("imgAvatar").src = responseJSobj.avatar
                } else {
                    console.log("co loi xay ra hay kiem tra lai");
                    document.getElementById("txtNoitification").innerText="something's wrong please check and try again"
                    $('#NoitiModal').modal({show: true})
                }
            }
        }
        xhr.open("GET", API_DOMAIN + MY_INFO_PATH);
        //Xác định kiểu dữ liệu gửi lên
        xhr.setRequestHeader("Content-Type", "application/json")
        //chỉ active khi có key
        xhr.setRequestHeader("Authorization", `Basic ${tokenKey}`)
        xhr.send();
        $('#NoitiModal').modal({
            show: true
        })
    }
    btnRegister.onclick = function(){
        window.location.href = "register.html";
    }

})