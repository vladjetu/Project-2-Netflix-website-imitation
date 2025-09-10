// Hlavní stránka - Přidání šipky, která tě vrátí zpět nahoru
const arrow = document.querySelector("#arrow-up");

if (arrow) {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 350) {
      arrow.classList.add("show-arrow-up");
    } else {
      arrow.classList.remove("show-arrow-up");
    }
  });

  arrow.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Ověření shody hesla v registračním formuláři
const pass = document.querySelector("#your-pass");
const passConfirm = document.querySelector("#pass-again");

if (pass && passConfirm) {
  function passChecker() {
    if (pass.value === passConfirm.value) {
      pass.classList.add("correct-pass");
      pass.classList.remove("incorrect-pass");
      passConfirm.classList.add("correct-pass");
      passConfirm.classList.remove("incorrect-pass");
    } else {
      pass.classList.add("incorrect-pass");
      pass.classList.remove("correct-pass");
      passConfirm.classList.add("incorrect-pass");
      passConfirm.classList.remove("correct-pass");
    }
  }

  pass.addEventListener("input", passChecker);
  passConfirm.addEventListener("input", passChecker);
}

// Stránka s filmy - načtení dat z API
const moviesContainer = document.querySelector("#movies-container");
const select = document.querySelector("select");

if (moviesContainer && select) {
  function getMovies(option) {
    fetch(`https://api.tvmaze.com/search/shows?q=${option}`)
      .then((response) => response.json())
      .then((data) => {
        const movies = data.slice(0, 12);

        moviesContainer.innerHTML = "";

        movies.forEach((movie) => {
          if (!movie.show.image) return;

          const newDiv = document.createElement("div");
          newDiv.classList.add("movie");

          const newImg = document.createElement("img");
          newImg.src = movie.show.image.medium;
          newImg.alt = movie.show.name;

          moviesContainer.appendChild(newDiv);
          newDiv.appendChild(newImg);
        });
      })
      .catch((error) => console.error("Chyba pri načítaní filmov:", error));
  }

  select.addEventListener("change", () => {
    const value = select.value;
    if (value) {
      getMovies(value);
    }
  });
}
