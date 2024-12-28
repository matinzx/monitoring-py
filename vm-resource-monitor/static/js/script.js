document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('toggle-dark-mode');
    const body = document.body;

    // تغییر حالت دارک مود
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
    });

    // دریافت اطلاعات سیستم
    fetch('/system-info')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const infoDiv = document.getElementById('system-info');
            infoDiv.innerHTML = `
                <div class="text-left">
                    <h2 class="text-xl font-bold mb-2">System Information</h2>
                    <p><strong>OS:</strong> ${data.system.os}</p>
                    <p><strong>Node Name:</strong> ${data.system.node_name}</p>
                    <p><strong>Release:</strong> ${data.system.release}</p>
                    <p><strong>Processor:</strong> ${data.system.processor}</p>
                    
                    <h2 class="text-xl font-bold mt-4 mb-2">RAM</h2>
                    <p><strong>Total:</strong> ${data.ram.total.toFixed(2)} GB</p>
                    <p><strong>Used:</strong> ${data.ram.used.toFixed(2)} GB</p>
                    <p><strong>Available:</strong> ${data.ram.available.toFixed(2)} GB</p>
                    
                    <h2 class="text-xl font-bold mt-4 mb-2">Disk</h2>
                    <p><strong>Total:</strong> ${data.disk.total.toFixed(2)} GB</p>
                    <p><strong>Used:</strong> ${data.disk.used.toFixed(2)} GB</p>
                    <p><strong>Free:</strong> ${data.disk.free.toFixed(2)} GB</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching system information:', error);
            document.getElementById('system-info').innerHTML = `
                <p class="text-red-500">Error fetching system information. Please try again.</p>
            `;
        });
});
