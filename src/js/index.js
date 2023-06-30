"use strict";
import "../sass/main.scss";

(function () {
  const idEl = document.getElementById("advice-id");
  const adviceEl = document.getElementById("advice");
  const btnGenerate = document.getElementById("generate-btn");
  const spinner = document.querySelector(".spinner");
  const adviceContents = document.querySelector(".advice-contents");

  const apiCall = async function () {
    const url = "https://api.adviceslip.com/advice?" + Date.now();

    const data = await fetch(url).then((res) => res.json());
    return data;
  };

  const caller = async function () {
    spinner.style.display = "block";
    adviceContents.style.display = "none";
    adviceContents.classList.remove("show-contents");

    try {
      const data = await apiCall();

      idEl.textContent = data.slip.id;
      adviceEl.textContent = `"${data.slip.advice}"`;
      adviceContents.style.display = "block";

      setTimeout(() => {
        spinner.style.display = "none";
        adviceContents.classList.add("show-contents");
      }, 10);
    } catch (error) {
      console.error(error);
      spinner.style.display = "block";
    }
  };
  caller();

  btnGenerate.addEventListener("click", caller);
})();
