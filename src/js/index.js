"use strict";
import "../sass/main.scss";

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

  try {
    const data = await apiCall();

    console.log(data);
    spinner.style.display = "none";
    adviceContents.style.display = "block";

    idEl.textContent = data.slip.id;
    adviceEl.textContent = `"${data.slip.advice}"`;
  } catch (error) {
    console.error(error);
    spinner.style.display = "none";
  }
};

caller();

btnGenerate.addEventListener("click", function () {
  caller();
});
