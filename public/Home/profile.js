const url = "https://syed-tariq-ahmed-production.up.railway.app";
function getData() {
  var showdata = document.getElementById("showdata");
  const data = localStorage.getItem("name");
  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");
  const password = localStorage.getItem("password");
  console.log(id);
  console.log(data);
  console.log(email);
  console.log(phone);
  console.log(password);
  let out;
  out = `
        <div class="Admission" id="${id}">
        <h2>Profile Edit</h2>
        <hr />
        <label for="stdName">User Name</label>
        <input type="text" id="stDname" value='${data}'disabled >
        <label for="email">Email</label>
        <input type="email" id="email" value='${email}'disabled >
        <label for="level"  >Contact</label>
        <input type="level" id="level" value='${phone}'disabled >
        <button onclick="return updateprofile('${id}','${data}','${email}','${phone}')">Update</button>
    </div>
        `;
  showdata.innerHTML += out;
}
getData();
function updateprofile(id, data, email, phone) {
  console.log(id);
  document.getElementById(`${id}`).innerHTML = `
  <div class="Admission" id="${id}">
  <h2>Profile Edit</h2>
        <hr />
        <label for="stdName">User Name</label>
  <input type='text' class='stDname' id='${id}-name' value='${data}' width='40'>
<label for="email">Email</label>
  <input type='text' class='email'  id='${id}-email' value='${email}' width='40'>
       <label for="email">Contact No.</label>
<input type='text' class='contactno' id='${id}-phone' value='${phone}' width='40'>
  <button onclick="return update_data('${id}')">Update Profile</button>
  </div>
  `;
  return false;
}
function update_data(id) {
  const url = "http://localhost:3000";
  const Http = new XMLHttpRequest();
  Http.open("PUT", url + `/update/${id}`);
  Http.setRequestHeader("Content-Type", "application/json");
  let obj = {
    username: document.getElementById(`${id}-name`).value,
    email: document.getElementById(`${id}-email`).value,
    phone: document.getElementById(`${id}-phone`).value,
  };
  console.log(obj);
  const _id = id;
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      if (Http.status === 200) {
        const data = localStorage.setItem("name", obj.username);
        const id = localStorage.setItem("id", _id);
        const email = localStorage.setItem("email", obj.email);
        localStorage.setItem("phone", obj.phone);
        let jsonRes = JSON.parse(Http.responseText);
        alert(jsonRes.message);
        window.location.reload();
        getData();
      } else {
        let jsonRes = JSON.parse(Http.responseText);
        console.log(jsonRes);
      }
    }
  };
  return false;
}

function AdmigetData() {
  var showdata = document.getElementById("showdata");
  const data = localStorage.getItem("stDname");
  const id = localStorage.getItem("ID");
  const adminemail = localStorage.getItem("adminemail");
  const contact = localStorage.getItem("contact");
  const adress = localStorage.getItem("adress");
  const level = localStorage.getItem("level");
  console.log(id);
  console.log(data);
  console.log(adress);
  console.log(level);
  let out;
  out = `
        <div class="Admission" id="admi-${id}">
        <h2>Admision Edit</h2>
        <hr />
        <label for="stdName">Student Name</label>
        <input type="text" id="stDname" value='null' disabled >
        <label for="email">Email</label>
        <input type="email" id="email" value='null' disabled >
        <label for="level"  >Contact</label>
        <input type="level" id="level" value='null' disabled >
        <label for="level"  >Adress</label>
        <input type="level" id="level" value='null' disabled >
        <label for="level"  >Level</label>
        <input type="level" id="level" value='null' disabled >
        <input type='button' value='Update'style='margin-top:30px onclick="return update('${id}','${data}','${adminemail}','${contact}','${adress}','${level}')" disabled>
    </div>
        `;
  showdata.innerHTML += out;
  return false;
}
AdmigetData();
function update(id, data, email, contact, adress, level) {
  console.log(id);
  document.getElementById(`admi-${id}`).innerHTML = `
  <div class="Admission" id="admi-${id}">
  <h2>Profile Edit</h2>
        <hr />
        <label for="Student Name">User Name</label>
  <input type='text' class='stDname' id="${id}-stDname" value='${data}' width='40'>
<label for="email">Email</label>
  <input type='text' class='email'  id="${id}-admiemail" value='${email}' width='40'>
       <label for="email">Contact.</label>
<input type='text' class='contactno' id="${id}-contact" value='${contact}' width='40'>
       <label for="email">Adress</label>
<input type='text' class='contactno' id="${id}-adress" value='${adress}' width='40'>
       <label for="email">Level</label>
<input type='text' class='contactno' id="${id}-level" value='${level}' width='40'>
  <button onclick="return update_data_admi('${id}')">Update Profile</button>
  </div>
  `;
  return false;
}
function update_data_admi(id) {
  const url = "http://localhost:3000";
  const Http = new XMLHttpRequest();
  Http.open("PUT", url + `/admiupdate/${id}`);
  Http.setRequestHeader("Content-Type", "application/json");
  let obj = {
    stDname: document.getElementById(`${id}-stDname`).value,
    adminemail: document.getElementById(`${id}-admiemail`).value,
    contact: document.getElementById(`${id}-contact`).value,
    adress: document.getElementById(`${id}-adress`).value,
    level: document.getElementById(`${id}-level`).value,
  };
  console.log(obj);
  const _id = id;
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      if (Http.status === 200) {
        localStorage.setItem("stDname", obj.stDname);
        localStorage.setItem("id", _id);
        localStorage.setItem("adminemail", obj.adminemail);
        localStorage.setItem("contact", obj.contact);
        localStorage.setItem("adress", obj.adress);
        localStorage.setItem("level", obj.level);
        let jsonRes = JSON.parse(Http.responseText);
        alert(jsonRes.message);
        window.location.reload();
        getData();
      } else {
        let jsonRes = JSON.parse(Http.responseText);
        console.log(jsonRes.message);
      }
    }
  };
  return false;
}
