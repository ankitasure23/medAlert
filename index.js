document.addEventListener("DOMContentLoaded", () => {
    console.log("Admin Panel Loaded");
    loadMedicineList();
});

function addMedicine() {
    const pharmacyName = document.getElementById("pharmacy-name").value;
    const medicineName = document.getElementById("medicine-name").value;
    const quantity = document.getElementById("medicine-quantity").value;
    
    if (!pharmacyName || !medicineName || quantity === "") {
        alert("Please fill all fields.");
        return;
    }
    
    const newMedicine = { pharmacy: pharmacyName, name: medicineName, quantity: parseInt(quantity) };
    let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    
    const index = medicines.findIndex(med => med.name === medicineName && med.pharmacy === pharmacyName);
    if (index > -1) {
        medicines[index].quantity = parseInt(quantity);
    } else {
        medicines.push(newMedicine);
    }
    
    localStorage.setItem("medicines", JSON.stringify(medicines));
    alert("Medicine added/updated successfully!");
    loadMedicineList();
}

function updateStock() {
    const medicineName = document.getElementById("update-medicine").value;
    const newQuantity = document.getElementById("update-quantity").value;
    
    if (!medicineName || newQuantity === "") {
        alert("Please fill all fields.");
        return;
    }
    
    let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    const index = medicines.findIndex(med => med.name === medicineName);
    
    if (index > -1) {
        medicines[index].quantity = parseInt(newQuantity);
        localStorage.setItem("medicines", JSON.stringify(medicines));
        alert("Stock updated successfully!");
        loadMedicineList();
    } else {
        alert("Medicine not found!");
    }
}

function loadMedicineList() {
    const medicineListDiv = document.getElementById("medicine-list");
    let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    
    if (medicines.length === 0) {
        medicineListDiv.innerHTML = "<p>No medicines available.</p>";
        return;
    }
    
    medicineListDiv.innerHTML = medicines.map(med => `
        <div class="pharmacy-card">
            <h3>${med.name}</h3>
            <p>Pharmacy: ${med.pharmacy}</p>
            <p>Quantity: ${med.quantity}</p>
        </div>
    `).join("");
}
