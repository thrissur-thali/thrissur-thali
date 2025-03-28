const date = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById("currentDate").textContent = date.toLocaleDateString('en-US', options);

async function fetchData() {
    const csvUrl = 'https://raw.githubusercontent.com/thrissur-thali/thrissur-thali/refs/heads/main/Thrissur%20Thali%20Menu%20-%20Sheet1.csv?t=' + Date.now(); // Add cache-busting parameter

    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        console.log('CSV Text:', csvText);

        const parsedData = Papa.parse(csvText, { header: true }).data.filter(row => Object.values(row).some(value => value.trim() !== ""));
        console.log('Parsed Data:', parsedData);

        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        parsedData.forEach(row => {
            const tr = document.createElement('tr');
            console.log("Arpitha");
            Object.values(row).forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchData;

setInterval(fetchData, 5 * 60 * 1000);
