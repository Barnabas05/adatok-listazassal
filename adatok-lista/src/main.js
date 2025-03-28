const loading = async () => {
  const response = await fetch("https://retoolapi.dev/PbsJ8o/data");
  if (!response.ok) { throw new Error("Hiba történt..."); }
  return await response.json();
};

const lista = (datas) => {
  document.getElementById("adatmegjelenites").innerText = "";
  const table = document.createElement("table");
  table.setAttribute("border", "1");
  table.setAttribute("cellpadding", "10");

  const header = table.createTHead();
  const row = header.insertRow();
  const headers = ["Vezetéknév", "Keresztnév", "Foglalkozás", "Email", "Telefonszám", "Törlés", "Módosítás"];
  
  headers.forEach(text => {
    const cell = row.insertCell();
    cell.innerHTML = `<b>${text}</b>`;
  });

  datas.forEach(data => {
    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    const cell3 = row.insertCell();
    const cell4 = row.insertCell();
    const cell5 = row.insertCell();
    const cell6 = row.insertCell();
    const cell7 = row.insertCell();

    cell1.textContent = data.lastname;
    cell2.textContent = data.firstname;
    cell3.textContent = data.job;
    cell4.textContent = data.email;
    cell5.textContent = data.phone;

    // Checkbox törléshez
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("data-id", data.id);
    cell6.appendChild(checkbox);

    // Módosítás gomb
    const updateButton = document.createElement("button");
    updateButton.textContent = "Módosítás";
    updateButton.addEventListener("click", () => szerkesztesInditas(data));
    cell7.appendChild(updateButton);
  });

  document.getElementById("adatmegjelenites").append(table);
};

// Adatfelvétel / Módosítás küldése a szerverre
const adatFelvetelVagyModositas = async (e) => {
  e.preventDefault();
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let job = document.getElementById("job").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let userId = document.getElementById("userId").value;

  const url = userId ? `https://retoolapi.dev/PbsJ8o/data/${userId}` : "https://retoolapi.dev/PbsJ8o/data";
  const method = userId ? "PUT" : "POST";

  const response = await fetch(url, {
    method: method,
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

  // Form ürítése és lista frissítése
  document.getElementById("userId").value = "";
  document.getElementById("felvetel").textContent = "Hozzáadás";
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("job").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

  lista(await loading());
};

// Szerkesztés indítása
const szerkesztesInditas = (data) => {
  document.getElementById("userId").value = data.id;
  document.getElementById("firstname").value = data.firstname;
  document.getElementById("lastname").value = data.lastname;
  document.getElementById("job").value = data.job;
  document.getElementById("email").value = data.email;
  document.getElementById("phone").value = data.phone;
  document.getElementById("felvetel").textContent = "Módosítás";
};

// Törlés
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

// Törlés eseménykezelő
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

// Inicializálás
const init = async () => {
  document.getElementById("felvetel").addEventListener("click", adatFelvetelVagyModositas);
  lista(await loading());
};

document.addEventListener("DOMContentLoaded", init);
