const loading = async () => {
  const response = await fetch("https://retoolapi.dev/PbsJ8o/data");
  if (!response.ok) { throw new Error("Hiba történt..."); }
  const json = await response.json();
  return json;
}

//lista
/*
const lista = (datas) => {
  document.getElementById("adatmegjelenites").innerText = "";
  const szamozottLista = document.createElement("ul");
  datas.forEach(data => {
    const li = document.createElement("li");
    li.textContent = `${data.firstname} ${data.lastname} (${data.job}) - ${data.email} - ${data.phone}`;
    szamozottLista.appendChild(li);
  });
  document.getElementById("adatmegjelenites").append(szamozottLista);
}
*/
//tablazattal

const lista = (datas) => {
  document.getElementById("adatmegjelenites").innerText = "";
  const table = document.createElement("table");
  table.setAttribute("border", "1");
  table.setAttribute("cellpadding", "10");
  const header = table.createTHead();
  const row = header.insertRow();
  const cell1 = row.insertCell();
  const cell2 = row.insertCell();
  const cell3 = row.insertCell();
  const cell4 = row.insertCell();
  const cell5 = row.insertCell();
  cell1.innerHTML = "<b>Vezetéknév</b>";
  cell2.innerHTML = "<b>Keresztnév</b>";
  cell3.innerHTML = "<b>Foglalkozás</b>";
  cell4.innerHTML = "<b>Email</b>";
  cell5.innerHTML = "<b>Telefonszám</b>";
  datas.forEach(data => {
    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    const cell3 = row.insertCell();
    const cell4 = row.insertCell();
    const cell5 = row.insertCell();
    cell1.textContent = data.lastname;
    cell2.textContent = data.firstname;
    cell3.textContent = data.job;
    cell4.textContent = data.email;
    cell5.textContent = data.phone;
  });
  document.getElementById("adatmegjelenites").append(table);
}

const adatfelvetel = async (e) => {
  e.preventDefault();
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let job = document.getElementById("job").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  const response = await fetch("https://retoolapi.dev/PbsJ8o/data", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      job: job,
      phone: phone,
      email: email
    })
  });
  if (!response.ok) {
    alert("Hiba történt ...");
    return;
  }  
  document.getElementById("adatmegjelenites").innerText = "";
  lista(await loading());
}

const init = async () => {
  document.getElementById("felvetel").addEventListener("click", adatfelvetel)
  lista(await loading());
}

document.addEventListener("DOMContentLoaded", init);