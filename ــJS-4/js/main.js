let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
let emails = localStorage.getItem('emails') ? JSON.parse(localStorage.getItem('emails')) : [];
let error = document.getElementById('alirt');
let done = document.getElementById('alirtDone');
let loginEmail = document.getElementById('login-email')
let loginPassword = document.getElementById('login-password')
let check = document.getElementById('check')
let isLoginUser = JSON.parse(localStorage.getItem('isLoginUser'))


if (isLoginUser) {
    document.getElementById('welcome').innerHTML += ' ' + isLoginUser.name;
}

function dataError() {
    let { name, email, password } = getRegisterData();
    if (password == '' && email == '' && name == '') {
        error.classList.remove('d-none')
        error.classList.add('d-block')
        done.classList.remove('d-block')
        done.classList.add('d-none')
        return true;
    } else {
        return false;
    }
}



function register() {
    if (dataError()) {
        return;
    }
    let registerData = getRegisterData();


    if (emails.includes(registerData.email)) {
        error.classList.remove('d-none')
        error.classList.add('d-block')
        done.classList.remove('d-block')
        done.classList.add('d-none')
        return;
    } else {
        error.classList.remove('d-block')
        error.classList.add('d-none')
        done.classList.add('d-block')
        done.classList.remove('d-none');
    }


    users.push(registerData);
    emails.push(registerData.email)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("emails", JSON.stringify(emails))
    emptyInput();
}


function getRegisterData() {
    let name = document.getElementById('registerName').value;
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;

    return { name, email, password }
}

function emptyInput() {
    document.getElementById('registerName').value = "";
    document.getElementById('registerEmail').value = "";
    document.getElementById('registerPassword').value = "";
}

function goTo(target) {
    location.href = target;
};

function login() {
    let emailLog = document.getElementById('login-email').value;
    let passwordLog = document.getElementById('login-password').value;


    let findUser = users.find(e => e.email == emailLog);



    if (findUser) {
        if (findUser.password === passwordLog) {
            goTo('home.html');
            localStorage.setItem("isLoginUser", JSON.stringify(findUser))
        } else {
            check.classList.add('d-block');
            check.classList.remove('d-none');
        }
    } else {
        check.classList.add('d-block');
        check.classList.remove('d-none');
    }



}