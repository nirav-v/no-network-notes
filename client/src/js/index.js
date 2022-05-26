import Editor from "./editor";
import "./database";
import "../css/style.css";

const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === "undefined") {
  loadSpinner();
}

// Check that service workers are supported
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
