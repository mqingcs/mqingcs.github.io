function reg() {
    var username = document.getElementById("username").value;
    var pwd = document.getElementById("password").value;
    var repwd = document.getElementById("repwd").value;
    if (username == '') {
        alert("username can't be empty");
        return false;
    }
    if (pwd != repwd) {
        alert("passwords aren't the same");
        return false;
    }
    if (pwd == '' || repwd == '') {
        alert("password can't be empty");
        return false;
    }
    localStorage.setItem("username", username);
    localStorage.setItem("password", pwd);
    alert("register successful");
    window.location.href = "login.html";
}
function login() {
    var username = document.getElementById("username").value;
    var pwd = document.getElementById("password").value;
    if (username == '') {
        alert("username can't be empty");
        return false;
    }
    if (pwd == '') {
        alert("password can't be empty");
        return false;
    }
    if (localStorage.getItem("username")) {
        var name = localStorage.getItem("username").toString();
        var pass = localStorage.getItem("password").toString();
        if (name == username)
            if (pwd == pass) {
                sessionStorage.setItem("username", name);
                alert("login success");
                window.location.href = "myzone.html";                
            } else {
                alert("wrong password");
            }
        else
            alert("wrong username");
    } else {
        alert("username doesn't exist,please register first");        
    }
}
function check() {
    if (sessionStorage.getItem("username")) {
        alert("welcome:"+sessionStorage.getItem("username").toString());
    } else {
        alert("please login first");
        window.location.href = "login.html";
    }
}