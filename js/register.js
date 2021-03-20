document.addEventListener("DOMContentLoaded", function () {
    const API_DOMAIN = "https://2-dot-backup-server-001.appspot.com";
    const REGISTER_PATH = "/_api/v2/members";
    var email = document.getElementById("email");
    var password = document.getElementById("password")
    var confirmPassword = document.getElementById("confirmPassword")
    var firstName = document.getElementById("firstName")
    var lastName = document.getElementById("lastName")
    var address = document.getElementById("address")
    var phone = document.getElementById("phone")
    var avatar = document.getElementById("avatar")
    var gender = document.getElementById("gender")
    var birthday = document.getElementById("birthday")
    var btnSubmit = document.getElementById("submit")
    var btnHomePage = document.getElementById("homepage02")
// -----------------------------------------------------------------------------
    btnHomePage.onclick = function () {
        window.location.href = "homePage.html";
    };
//submit on button click;
    btnSubmit.onclick = function () {
        document.getElementById("loadingIcon").style.display = ""
        var txtEmail = email.value;
        var txtPassword = password.value;
        var txtLastName = lastName.value;
        var txtFirstName = firstName.value;
        var txtAddress = address.value;
        var txtPhone = phone.value;
        var urlAvatar = avatar.value;
        var txtGender = gender.value;
        var txtBirthday = birthday.value;
        var txtBirthdayConvertType = txtBirthday.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
        if (txtBirthday === "" || txtPassword === "" || txtLastName === "" || txtFirstName === "" || txtAddress === "" || txtPhone === "" || urlAvatar === "" || txtGender === "" || txtBirthday === "") {
            document.getElementById("loadingIcon").style.display = "none"
            document.getElementById("txtNoitification").innerText = "Please complete all information"
            $('#NoitiModal').modal({show: true})
        } else {
            // JS object
            var sendData = {
                firstName: txtFirstName,
                lastName: txtLastName,
                password: txtPassword,
                address: txtAddress,
                phone: txtPhone,
                avatar: urlAvatar,
                gender: txtGender,
                email: txtEmail,
                birthday: txtBirthdayConvertType
            }
            console.log(sendData)
            var JSonDataSend = JSON.stringify(sendData);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 201) {
                        document.getElementById("txtNoitification").innerText = "Registration Success"
                        document.getElementById("loadingIcon").style.display = "none"
                        $('#NoitiModal').modal({show: true})
                    } else {
                        document.getElementById("loadingIcon").style.display = "none"
                        console.log("co loi xay ra hay kiem tra lai");
                        document.getElementById("txtNoitification").innerText = "Sign up failed Please try again"
                        $('#NoitiModal').modal({show: true})
                    }
                }
            }
            xhr.open("POST", API_DOMAIN + REGISTER_PATH);
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

//Validate password
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

// Validate confirm_password
    var msgConfirmCheckingPassword = document.getElementById("msgChekingConfirmPassword");
    confirmPassword.onkeyup = validateConfirmPassword;

    function validateConfirmPassword() {
        var txtConfirmPassword = confirmPassword.value;
        var txtPassword = password.value;
        if (txtConfirmPassword === txtPassword) {
            msgConfirmCheckingPassword.className = "msgsuccess"
            msgConfirmCheckingPassword.innerText = "*correct";
        } else {
            msgConfirmCheckingPassword.className = "msgerror"
            msgConfirmCheckingPassword.innerText = "*re-enter password";
        }
    }

//Validate Fist Name
    var msgChekingFirstName = document.getElementById("msgChekingFirstName");
    firstName.onkeyup = validateFirstName;

    function validateFirstName() {
        var txtFirstName = firstName.value;
        if (txtFirstName.length === 0) {
            msgChekingFirstName.className = "msgerror"
            msgChekingFirstName.innerText = "*please enter your first name";
        } else if (txtFirstName.length < 2) {
            msgChekingFirstName.className = "msgerror"
            msgChekingFirstName.innerText = "*your name too short";
        } else {
            msgChekingFirstName.className = "msgsuccess"
            msgChekingFirstName.innerText = "*valid";
        }
    }

//Validate Last Name
    var msgChekingLastName = document.getElementById("msgChekingLastName");
    lastName.onkeyup = validateLastName;

    function validateLastName() {
        var txtLasttName = lastName.value;
        if (txtLasttName.length === 0) {
            msgChekingLastName.className = "msgerror"
            msgChekingLastName.innerText = "*please enter your first name";
        } else if (txtLasttName.length < 2) {
            msgChekingLastName.className = "msgerror"
            msgChekingLastName.innerText = "*your name too short";
        } else {
            msgChekingLastName.className = "msgsuccess"
            msgChekingLastName.innerText = "*valid";
        }
    }

//Upload file avatar
    var btnAvatar = document.getElementById("btnAvatar")
    var myWidget_Avatar = cloudinary.createUploadWidget({
            cloudName: 'quynv300192',
            uploadPreset: 'qivdh8qo'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Done! Here is the image info: ', result.info);
                console.log(result.info.url)
                document.getElementById("avatar").value = result.info.url;
            }
        }
    )
    btnAvatar.addEventListener("click", function () {
        myWidget_Avatar.open();
    }, false);
})






