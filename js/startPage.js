document.addEventListener("DOMContentLoaded", function () {
    var btnLoginNow = document.getElementById("btnNowLogin")
    var btnRegister = document.getElementById("btnRegister01")
    btnLoginNow.onclick = function(){
        window.location.href = "login.html";
    };
    btnRegister.onclick = function(){
        window.location.href = "register.html"
    }
})