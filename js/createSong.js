document.addEventListener("DOMContentLoaded", function () {
    var tokenKey = sessionStorage.getItem("vie");
    const API_DOMAIN = "https://2-dot-backup-server-003.appspot.com";
    const CREATE_SONG_PATH = "/_api/v2/songs";
    var name = document.getElementById("name");
    var singer = document.getElementById("singer");
    var author = document.getElementById("author");
    var urlThumbnail = document.getElementById("thumbnail");
    var urlLink = document.getElementById("link");
    var btnCreate = document.getElementById("create");


// -----------------------------------------------------------------------------
//Gửi data đi on button click;
    btnCreate.onclick = function () {
        var txtName = name.value;
        var txtSinger = singer.value;
        var txtAuthor = author.value;
        var txtThumbnail = urlThumbnail.value;
        var txtLink = urlLink.value;

        if (txtName === "" || txtSinger === "" || txtAuthor === "" || txtThumbnail === "" || txtLink === "") {
            alert("please complete full information")
        } else {
            // JS object
            var sendData = {
                name: txtName,
                singer: txtSinger,
                author: txtAuthor,
                thumbnail: txtThumbnail,
                link: txtLink
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
                        alert(`Register successfully, your ID is:+${responseJSobj.id}`)
                    }else {
                        console.log("co loi xay ra hay kiem tra lai");
                        $('#exampleModal').modal({
                            show: true
                        })
                    }
                }
            }
            xhr.open("POST", API_DOMAIN + CREATE_SONG_PATH);
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.setRequestHeader("Authorization", `Basic ${tokenKey}`)
            xhr.send(JSonDataSend);

        }
    }
//
//
//
//
//
// // validation-------------------------------------------------------------------
// //kiem tra email
//     var msgChekingEmail = document.getElementById("msgChekingEmail");
//     email.onkeyup = validateEmail;
//
//     function validateEmail() {
//         var txtEmail1 = email.value;
//         var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//
//         if (txtEmail1.match(mailformat)) {
//             msgChekingEmail.className = "msgsuccess"
//             msgChekingEmail.innerText = "*valid";
//         } else {
//             msgChekingEmail.className = "msgerror"
//             msgChekingEmail.innerText = "*invalid";
//         }
//     }
//
// //Kiểm tra password
//     var msgCheckingPassword = document.getElementById("msgChekingPassword");
//     password.onkeyup = validatePassword;
//
//     function validatePassword() {
//         var txtPassword = password.value;
//         if (txtPassword.length === 0) {
//             msgCheckingPassword.className = "msgerror"
//             msgCheckingPassword.innerText = "*please enter password";
//         } else if (txtPassword.length < 5) {
//             msgCheckingPassword.className = "msgerror"
//             msgCheckingPassword.innerText = "*password too short";
//         } else {
//             msgCheckingPassword.className = "msgsuccess"
//             msgCheckingPassword.innerText = "*valid";
//         }
//     }
//
// // Kiểm tra confirm_password
//     var msgConfirmCheckingPassword = document.getElementById("msgChekingConfirmPassword");
//     confirmPassword.onkeyup = validateConfirmPassword;
//
//     function validateConfirmPassword() {
//         var txtConfirmPassword = confirmPassword.value;
//         var txtPassword = password.value;
//         if (txtConfirmPassword === txtPassword) {
//             msgConfirmCheckingPassword.className = "msgsuccess"
//             msgConfirmCheckingPassword.innerText = "*correct";
//         } else {
//             msgConfirmCheckingPassword.className = "msgerror"
//             msgConfirmCheckingPassword.innerText = "*re-enter password";
//         }
//     }
//
// //Kiểm tra Fist Name
//     var msgChekingFirstName = document.getElementById("msgChekingFirstName");
//     firstName.onkeyup = validateFirstName;
//
//     function validateFirstName() {
//         var txtFirstName = firstName.value;
//         if (txtFirstName.length === 0) {
//             msgChekingFirstName.className = "msgerror"
//             msgChekingFirstName.innerText = "*please enter your first name";
//         } else if (txtFirstName.length < 2) {
//             msgChekingFirstName.className = "msgerror"
//             msgChekingFirstName.innerText = "*your name too short";
//         } else {
//             msgChekingFirstName.className = "msgsuccess"
//             msgChekingFirstName.innerText = "*valid";
//         }
//     }
//
// //Kiểm tra Last Name
//     var msgChekingLastName = document.getElementById("msgChekingLastName");
//     lastName.onkeyup = validateLastName;
//
//     function validateLastName() {
//         var txtLasttName = lastName.value;
//         if (txtLasttName.length === 0) {
//             msgChekingLastName.className = "msgerror"
//             msgChekingLastName.innerText = "*please enter your first name";
//         } else if (txtLasttName.length < 2) {
//             msgChekingLastName.className = "msgerror"
//             msgChekingLastName.innerText = "*your name too short";
//         } else {
//             msgChekingLastName.className = "msgsuccess"
//             msgChekingLastName.innerText = "*valid";
//         }
//     }
//

})






