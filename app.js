document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded");
    loadPharmacies();
});

function searchMedicine() {
    const medicine = document.getElementById("medicine").value;
    const location = document.getElementById("location").value;
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "<p>Searching for pharmacies...</p>";

    // Fetch pharmacy data from Firebase (Mock Data for now)
    fetchPharmacies().then(pharmacies => {
        const results = pharmacies.filter(pharmacy => pharmacy.available);
        displayResults(results);
    });
}

// Function to display results
function displayResults(results) {
    const resultsContainer = document.getElementById("results");
    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No pharmacies found with the requested medicine.</p>";
    } else {
        resultsContainer.innerHTML = results.map(pharmacy => `
            <div class="pharmacy-card">
                <h3>${pharmacy.name}</h3>
                <p>${pharmacy.address}</p>
                <p>Available: ${pharmacy.available ? "✅" : "❌"}</p>
                <a href="tel:${pharmacy.contact}" class="glow-button">Call</a>
                <button class="glow-button" onclick="openGoogleMaps('${pharmacy.address}')">Get Directions</button>
            </div>
        `).join("");
    }
}

// Function to open Google Maps with location
function openGoogleMaps(address) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, "_blank");
}

// Mock function to fetch pharmacy data (Replace with Firebase API)
function fetchPharmacies() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: "Health Plus Pharmacy", address: "123 Main St", available: true, contact: "123-456-7890" },
                { name: "MediCare Pharmacy", address: "456 Elm St", available: false, contact: "987-654-3210" },
                { name: "Wellness Pharmacy", address: "789 Oak St", available: true, contact: "456-789-1234" }
            ]);
        }, 1000);
    });
}
