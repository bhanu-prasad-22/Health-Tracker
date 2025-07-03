document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const Weight = parseFloat(document.getElementById("weight").value);
  const heightcm = parseFloat(document.getElementById("Height").value);
  const age = parseInt(document.getElementById("age").value);
  const name = document.getElementById("name").value.trim();

  if (isNaN(Weight) || isNaN(heightcm) || isNaN(age) || name === "") {
    alert("Please enter all values correctly.");
    return;
  }

  const heightM = heightcm / 100;
  const bmi = Weight / (heightM * heightM);
  let resultText = `Your BMI is ${bmi.toFixed(2)} – `;

  if (bmi < 18.5) resultText += "Underweight";
  else if (bmi < 25) resultText += "Normal (Fit)";
  else if (bmi < 30) resultText += "Overweight";
  else resultText += "Obese";

  let resultBox = document.getElementById("result");
  resultBox.textContent = resultText;
  resultBox.style.fontWeight = "bold";
  resultBox.style.color = "#222";

  // ✅ Save to localStorage
  const entry = {
    name,
    age,
    weight: Weight,
    height: heightcm,
    bmi: bmi.toFixed(2),
    time: new Date().toLocaleString()
  };

  let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
  history.push(entry);
  localStorage.setItem("bmiHistory", JSON.stringify(history));

  showHistory();
});

function showHistory() {
  const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
  const historyBox = document.getElementById("history");

  if (!historyBox) return;

  if (history.length === 0) {
    historyBox.innerHTML = "<p>No history found.</p>";
    return;
  }

  let html = "<h3>Last 5 Entries:</h3><ul>";
  for (let i = history.length - 1; i >= 0 && i > history.length - 6; i--) {
    const h = history[i];
    let category = "";
    const bmi = parseFloat(h.bmi);

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal (Fit)";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    html += `<li>${h.time} – ${h.name} – BMI: ${h.bmi} (${category})</li>`;

  }
  html += "</ul>";

  historyBox.innerHTML = html;
}

function clearHistory() {
  localStorage.removeItem("bmiHistory");
  showHistory();
}

window.addEventListener("load", showHistory);
