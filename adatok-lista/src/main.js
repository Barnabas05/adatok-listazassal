const loading = async () => {
  const response = await fetch("https://retoolapi.dev/PbsJ8o/data");
  if (!response.ok) { throw new Error("Hiba történt..."); }
  const json = await response.json();
  return json;
}





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
  const cell6 = row.insertCell(); 
  cell1.innerHTML = "<b>Vezetéknév</b>";
  cell2.innerHTML = "<b>Keresztnév</b>";
  cell3.innerHTML = "<b>Foglalkozás</b>";
  cell4.innerHTML = "<b>Email</b>";
  cell5.innerHTML = "<b>Telefonszám</b>";
  cell6.innerHTML = "<b>Törlés</b>";

  datas.forEach(data => {
    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    const cell3 = row.insertCell();
    const cell4 = row.insertCell();
    const cell5 = row.insertCell();
    const cell6 = row.insertCell();
    cell1.textContent = data.lastname;
    cell2.textContent = data.firstname;
    cell3.textContent = data.job;
    cell4.textContent = data.email;
    cell5.textContent = data.phone;

   
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("data-id", data.id);
    cell6.appendChild(checkbox);
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
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("job").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  
  lista(await loading());
}


const torles = async (id) => {
  const numericId = Number(id); 
  console.log("Törlés indítása ID:", numericId);

  const response = await fetch(`https://retoolapi.dev/PbsJ8o/data/${numericId}`, {
    method: 'DELETE',
  });

  console.log("API válaszkód:", response.status);

  if (!response.ok) {
    alert("Hiba történt a törlés során...");
    return;
  }

  lista(await loading());
};





document.getElementById("torles")?.addEventListener("click", async (e) => {
  e.preventDefault();
  const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  const checkedIds = Array.from(checkboxes).map(checkbox => checkbox.getAttribute("data-id"));

  console.log("Kiválasztott ID-k törléshez:", checkedIds);

  for (const id of checkedIds) {
    console.log(`Törlés megkezdése: ${id}`);
    await torles(id);
  }

  lista(await loading());
});




const init = async () => {
  document.getElementById("felvetel").addEventListener("click", adatfelvetel)
  lista(await loading());
}

document.addEventListener("DOMContentLoaded", init);