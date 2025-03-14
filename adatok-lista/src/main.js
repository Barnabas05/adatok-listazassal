const loading = async () => {
  const response = await fetch("https://retoolapi.dev/PbsJ8o/data");
  if (!response.ok) { throw new Error("Hiba történt..."); }
  const json = await response.json();
  return json;
}

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