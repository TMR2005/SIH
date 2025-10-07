function fetchData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            // Update core values
            document.getElementById('solarGen').innerText = data.solar.generation;
            document.getElementById('solarEff').innerText = data.solar.efficiency;
            document.getElementById('inverterEff').innerText = data.solar.inverter;
            document.getElementById('pumpEff').innerText = data.pump.efficiency;
            document.getElementById('costSavings').innerText = data.impact.cost_savings;
            document.getElementById('co2Saved').innerText = data.impact.co2_saved;
            document.getElementById('flow').innerText = data.pump.flow;
            document.getElementById('totalPanels').innerText = data.solar.total_panels;
            document.getElementById('faultyPanels').innerText = data.solar.faulty_panels;

            // Faulty panels logic
            const faultyList = document.getElementById('faultyList');
            faultyList.innerHTML = ''; // clear old entries

            if (data.solar.faulty_panels > 0) {
                if (data.solar.faulty_details && data.solar.faulty_details.length > 0) {
                    data.solar.faulty_details.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = `${item.panel_id} – ${item.location}`;
                        li.style.color = '#d32f2f';
                        li.style.fontWeight = '600';
                        faultyList.appendChild(li);
                    });
                } else {
                    const li = document.createElement('li');
                    li.textContent = 'Faulty panels detected (no location data)';
                    li.style.color = '#d32f2f';
                    faultyList.appendChild(li);
                }
            } else {
                const li = document.createElement('li');
                li.textContent = 'All optimal';
                li.style.color = '#00796b';
                li.style.fontWeight = '700';
                faultyList.appendChild(li);
            }

            // Update chart
            energyChart.data.datasets[0].data = data.energy_mix;
            energyChart.update();
        })
        .catch(err => console.error('Error fetching data:', err));
}

// Initialize Chart
const ctx = document.getElementById('energyMix').getContext('2d');
const energyChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Solar', 'Diesel'],
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#4CAF50', '#FF5722'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

// Fetch every 2 seconds
setInterval(fetchData, 2000);
fetchData();
