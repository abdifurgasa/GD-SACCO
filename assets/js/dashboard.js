document.addEventListener('DOMContentLoaded', function() {
    // Update date/time
    function updateDateTime() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        document.getElementById('currentDateTime').textContent = now.toLocaleDateString('en-US', options);
    }
    updateDateTime();
    setInterval(updateDateTime, 60000);

    // Charts
    const ctx1 = document.getElementById('loansRepaymentsChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets: [
                {
                    label: 'Loans Issued',
                    data: [45,52,48,60,55,70,65,58,72,80,75,90],
                    backgroundColor: 'rgba(45,122,61,0.7)',
                    borderColor: '#2d7a3d',
                    borderWidth: 1
                },
                {
                    label: 'Repayments',
                    data: [30,35,32,40,38,50,45,40,55,60,58,70],
                    backgroundColor: 'rgba(54,162,235,0.7)',
                    borderColor: '#36a2eb',
                    borderWidth: 1
                }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } }
    });

    const ctx2 = document.getElementById('monthlyChart').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets: [
                {
                    label: 'Savings',
                    data: [120,135,150,170,160,190,210,200,230,250,240,280],
                    borderColor: '#2d7a3d',
                    backgroundColor: 'rgba(45,122,61,0.1)',
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Loans',
                    data: [80,90,85,100,95,110,105,98,120,130,125,140],
                    borderColor: '#36a2eb',
                    backgroundColor: 'rgba(54,162,235,0.1)',
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } }
    });
});
