class Movie {
  constructor(name, gender, rate) {
    this.nro = nro;
    this.name = name;
    this.gender = gender;
    this.rate = rate;
  }
}

document.getElementById("mainForm").addEventListener("submit", function (e) {
  // Evita que se envíe el formulario
  e.preventDefault();

  // Obtengo los valores del formulario
  const name = document.getElementById("movieInput").value;
  const genero = document.getElementById("genderInput");
  const nroGenero = genero.value;
  const selectedGender = genero[nroGenero].textContent;

  const selectedOption = document.querySelector('input[name="rating"]:checked');

  //Compruebo que la selección se haya realizado
  if (selectedOption) {
    rate = selectedOption.value;
  } else {
    console.log("Falta valoración");
    return;
  }

  //Obtengo nro de película ingresada en la tabla
  const table = document.getElementById("dataTable");
  const lastRow = table.rows[table.rows.length - 1];
  let nro = parseInt(lastRow.cells[0].textContent);

  if (isNaN(nro)) {
    rowNumber = "1";
  } else {
    rowNumber = parseInt(nro) + 1;
  }

  // Crear un objeto de tipo movie y le pasamos como parámetros:
  const newMovie = { rowNumber, name, selectedGender, rate };

  // Agregar los datos a la tabla
  addMovieToTable(newMovie);

  // Limpiar el formulario
  document.getElementById("mainForm").reset();
});

function addMovieToTable(movie) {
  const tableBody = document.querySelector("#dataTable tbody");

  // Crear una nueva fila en la tabla
  const newRow = document.createElement("tr");

  // Crear celdas para cada dato
  for (const key in movie) {
    const cell = document.createElement("td");

    if (key === "rate") {
      const rate = movie[key];

      // Crear un elemento span para cada estrella
      const starContainer = document.createElement("span");
      starContainer.classList.add("stars");

      cell.classList.add("filled-stars");

      for (let i = 0; i < rate; i++) {
        const star = document.createElement("span");
        star.textContent = "\u2605";
        star.classList.add("filled-stars");
        starContainer.appendChild(star);
      }

      for (let i = rate; i < 5; i++) {
        const star = document.createElement("span");
        star.textContent = "\u2605";
        star.classList.add("empty-stars");
        starContainer.appendChild(star);
      }

      // Agregar las estrellas al contenido de la celda
      cell.appendChild(starContainer);
    } else {
      cell.textContent = movie[key];
    }

    newRow.appendChild(cell);
  }

  // Agregar la nueva fila a la tabla
  tableBody.appendChild(newRow);
}
