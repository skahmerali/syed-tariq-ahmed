// var port = "https://syed-tariq-ahmed-production.up.railway.app";
var port = "http://localhost:3000";

function sinup() {
  var obj = {
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
    confPassword: document.getElementById("confirm-password").value,
  };
  var Http = new XMLHttpRequest();
  Http.open("POST", port + "/signUp");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 200) {
        console.log(jsonRes);
        swal("Good job!", jsonRes.message, "success");
        setInterval(() => {
          window.location.href = "../Login/login.html"
        }, 3000);
      } else {
        swal("Opps!", jsonRes.message, "error");
        console.log(jsonRes.message);
      }
    }
  };

  return false;
}

let menu = document.getElementById("menu");
function toggleinMenu() {
  console.log("ello");
  menu.classList.toggle("open-menu");
}