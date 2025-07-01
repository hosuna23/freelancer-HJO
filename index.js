/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// === App State ===
const freelancers = Array.from({ length: NUM_FREELANCERS }, createFreelancer);
const averageRate = getAverageRate(freelancers);
const $app = document.querySelector("#app");

// === Helper Functions ===
function createFreelancer() {
  return {
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    occupation: OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)],
    rate: Math.floor(
      Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min) + PRICE_RANGE.min
    ),
  };
}

function getAverageRate(list) {
  const sum = list.reduce((acc, curr) => acc + curr.rate, 0);
  return (sum / list.length).toFixed(2);
}

// === Component Functions ===
function AverageRateComponent(rate) {
  const $heading = document.createElement("h2");
  $heading.textContent = `Average Freelancer Rate: $${rate}`;
  return $heading;
}

function FreelancerRow({ name, occupation, rate }) {
  const $tr = document.createElement("tr");

  $tr.innerHTML = `
        <td>${name}</td>
        <td>${occupation}</td>
        <td>$${rate}</td>
      `;
  return $tr;
}

function FreelancerTable(list) {
  const $table = document.createElement("table");
  $table.innerHTML = `
        <thead>
          <tr>
            <th>Name</th>
            <th>Occupation</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody id="FreelancerRows"></tbody>
      `;

  const $tbody = $table.querySelector("#FreelancerRows");

  list.forEach((freelancer) => {
    $tbody.appendChild(FreelancerRow(freelancer));
  });

  return $table;
}

// === Mounting the App ===
function renderApp() {
  const $title = document.createElement("h1");
  $title.textContent = "Freelancer Listings";

  $app.innerHTML = ""; // clear existing content
  $app.appendChild($title);
  $app.appendChild(AverageRateComponent(averageRate));
  $app.appendChild(FreelancerTable(freelancers));
}

// === Run the App ===
renderApp();
