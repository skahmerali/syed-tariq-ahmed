// var port = "https://sir-web.herokuapp.com";
var port = "https://syed-tariq-ahmed-production.up.railway.app";

function login() {
  var obj = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  console.log(obj)
  var Http = new XMLHttpRequest();
  Http.open("POST", port + "/logIn");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 200) {
        console.log(jsonRes)
        swal("Good job!", jsonRes.data , "success");
        setInterval(function () {
          window.location.href = "../Home/home.html";
        }, 3000);
        console.log(jsonRes.user_data_Secret.id);
        localStorage.setItem("id" , jsonRes.user_data_Secret.id)
        localStorage.setItem("name" , jsonRes.user_data_Secret.username)
        localStorage.setItem("email" , jsonRes.user_data_Secret.email)
        localStorage.setItem("`password" , jsonRes.user_data_Secret.password)
        localStorage.setItem("phone" , jsonRes.user_data_Secret.phone)
        localStorage.setItem("confPassword" , jsonRes.user_data_Secret.confPassword)
        return;
      }
      else if (Http.status === 201) {
        swal("Good job!", jsonRes.message , "success");
        setInterval(() => {
          window.location.href = "../Admin Panel/index.html"  
        }, 3000);
        // alert(jsonRe/s.message)
      }
      else {
        swal("Opps!", jsonRes.message, "error");
        console.log(jsonRes.message);
      }
    }
  };

  return false;
}
