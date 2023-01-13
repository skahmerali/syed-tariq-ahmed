function sendDescription() {
  const url = "https://syed-tariq-ahmed-production.up.railway.app";
  const Http = new XMLHttpRequest();
  Http.open("POST", url + "/desc");
  Http.setRequestHeader("Content-Type", "application/json");
  let obj = {
    desc: document.getElementById("desc").value,
    paradesc: document.getElementById("paradesc").value,
    date: document.getElementById("date").value,
  };
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      if (Http.status === 200) {
        let jsonRes = JSON.parse(Http.responseText);
        alert(jsonRes.message);
      } else {
        let jsonRes = JSON.parse(Http.responseText);
        alert(jsonRes.message);
      }
    }
  };

  return false;
}