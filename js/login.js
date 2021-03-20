document.addEventListener("DOMContentLoaded", function () {
    const API_DOMAIN = "https://2-dot-backup-server-001.appspot.com";
    const LOGIN_PATH = "/_api/v2/members/authentication";
    var email = document.getElementById("email");
    var password = document.getElementById("password")
    var btnLogin = document.getElementById("login")
    var btnRegister = document.getElementById("register")
//Gửi data đi on button click;
    btnRegister.onclick = function () {
        window.location.href = "register.html";
    };
    btnLogin.onclick = function () {
        document.getElementById("loadingIcon").style.display = ""
        var txtEmail = email.value;
        var txtPassword = password.value;
        if (txtPassword === "" || txtEmail === "") {
            document.getElementById("loadingIcon").style.display = "none"
            console.log("Please fill all information");
            $('#faileModal').modal({show: true})
        } else {
            var sendData = {
                password: txtPassword,
                email: txtEmail
            }
            var JSonDataSend = JSON.stringify(sendData);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 201) {
                        var responseJSobj = JSON.parse(this.responseText);
                        sessionStorage.setItem("vie", responseJSobj.token);
                        sessionStorage.setItem("vie2", "y");
                        window.location.href = "homePage.html";
                        document.getElementById("loadingIcon").style.display = "none"
                    } else {
                        document.getElementById("loadingIcon").style.display = "none"
                        console.log("co loi xay ra hay kiem tra lai");
                        $('#faileModal').modal({show: true})
                    }
                }
            }
            xhr.open("POST", API_DOMAIN + LOGIN_PATH);
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSonDataSend);
        }
    }
//kiem tra email
    var msgChekingEmail = document.getElementById("msgChekingEmail");
    email.onkeyup = validateEmail;

    function validateEmail() {
        var txtEmail1 = email.value;
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (txtEmail1.match(mailformat)) {
            msgChekingEmail.className = "msgsuccess"
            msgChekingEmail.innerText = "*valid";
        } else {
            msgChekingEmail.className = "msgerror"
            msgChekingEmail.innerText = "*invalid";
        }
    }

//Kiểm tra password
    var msgCheckingPassword = document.getElementById("msgChekingPassword");
    password.onkeyup = validatePassword;

    function validatePassword() {
        var txtPassword = password.value;
        if (txtPassword.length === 0) {
            msgCheckingPassword.className = "msgerror"
            msgCheckingPassword.innerText = "*please enter password";
        } else if (txtPassword.length < 5) {
            msgCheckingPassword.className = "msgerror"
            msgCheckingPassword.innerText = "*password too short";
        } else {
            msgCheckingPassword.className = "msgsuccess"
            msgCheckingPassword.innerText = "*valid";
        }
    }
})






