// script.js

async function fetchData() {
    const csvUrl = 'https://raw.githubusercontent.com/thrissur-thali/thrissur-thali/main/Thrissur%20Thali%20Menu%20-%20Sheet1.csv?t=' + Date.now();

    try {
        console.log('Fetching CSV from:', csvUrl); // Debug: Log the URL
        const response = await fetch(csvUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const csvText = await response.text();
        console.log('CSV Text:', csvText); // Debug: Log the raw CSV data

        const parsedData = Papa.parse(csvText, { header: true }).data;
        console.log('Parsed Data:', parsedData); // Debug: Log the parsed data

        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        parsedData.forEach(row => {
            const tr = document.createElement('tr');
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

// Fetch data when the page loads
window.onload = fetchData;

// Optionally, refresh the data periodically (e.g., every 5 minutes)
setInterval(fetchData, 5 * 60 * 1000); // Refresh every 5 minutes
