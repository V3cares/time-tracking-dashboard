const buttons = document.querySelectorAll(".activity-btn button");
const cards = document.querySelectorAll(".activity-cards");

let currentPeriod = "weekly";

// Fetch JSON data
async function fetchData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    updateUI(data, currentPeriod);

    // Button click events
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        currentPeriod = button.id;

        // Remove active class
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        updateUI(data, currentPeriod);
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Update UI function
function updateUI(data, period) {
  cards.forEach((card, index) => {
    const activity = data[index];

    const currentData = card.querySelector(".current-data");
    const previousData = card.querySelector(".previous-data");
    const previousTimeframe = card.querySelector(".previous-timeframe");

    // Current hours
    currentData.textContent =
      `${activity.timeframes[period].current}hrs`;

    // Previous hours
    previousData.textContent =
      ` ${activity.timeframes[period].previous}hrs`;

    // Previous timeframe text
    if (period === "daily") {
      previousTimeframe.textContent = "Yesterday";
    } else if (period === "weekly") {
      previousTimeframe.textContent = "Last Week";
    } else {
      previousTimeframe.textContent = "Last Month";
    }
  });
}

// Run app
fetchData();