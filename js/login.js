document.addEventListener("DOMContentLoaded", function () {
    var checkNull = true;
    const API_DOMAIN = "https://2-dot-backup-server-003.appspot.com";
    const LOGIN_PATH = "/_api/v2/members/authentication";
    var email = document.getElementById("email");
    var password = document.getElementById("password")
    var btnLogin = document.getElementById("login")
// -----------------------------------------------------------------------------
//Gửi data đi on button click;
    btnLogin.onclick = function () {
        var txtEmail = email.value;
        var txtPassword = password.value;
        if (txtPassword === "" ||txtEmail === "") {
            alert("vui long nhap du thong tin")
        } else {
            // JS object
            var sendData = {
                password: txtPassword,
                email: txtEmail
            }
            //Chuyen data sang JSon Obj
            var JSonDataSend = JSON.stringify(sendData);
            //khởi tạo biến, mở kết nối, tạo header ... và chuyển dữ liệu trả về sang JS object;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 201) {
                        //ket qua tra ve duoc chuyen sang dinh dang JS object;
                        var responseJSobj = JSON.parse(this.responseText);
                        //lưu token key ra sesstion storage hoặc local storage. lưu vào bằng setItem, lấy ra bằng getItem
                        sessionStorage.setItem("vie",responseJSobj.token);
                        window.location.href = "homePage.html";
                    }else {
                        console.log("co loi xay ra hay kiem tra lai");
                        $('#faileModal').modal({
                            show: true
                        })
                    }
                }
            }
            xhr.open("POST", API_DOMAIN + LOGIN_PATH);
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSonDataSend);

        }
    }





// validation-------------------------------------------------------------------
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



// end of everythings
})






