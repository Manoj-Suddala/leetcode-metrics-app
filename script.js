document.getElementById('fetchBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    if (!username) return alert('Please enter a username');
  
    // Show loading state (optional)
    document.getElementById('fetchBtn').textContent = 'Fetching...';
  
    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const data = await response.json();
  
      if (data.status === 'error') throw new Error(data.message);
  
      // Update UI
      document.getElementById('totalSolved').textContent = 
        data.totalSolved || 0;
      
      renderPieChart(data);
      document.getElementById('results').classList.remove('hidden');
    } catch (error) {
      alert('Error fetching data: ' + error.message);
    } finally {
      document.getElementById('fetchBtn').textContent = 'Get Stats';
    }
  });
  
  function renderPieChart(data) {
    document.getElementById('easySolved').textContent = data.easySolved || 0;
  document.getElementById('mediumSolved').textContent = data.mediumSolved || 0;
  document.getElementById('hardSolved').textContent = data.hardSolved || 0;
  const ctx = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [{
          data: [data.easySolved, data.mediumSolved, data.hardSolved],
          backgroundColor: [
            '#10B981', // Green (Easy)
            '#F59E0B', // Yellow (Medium)
            '#EF4444', // Red (Hard)
          ],
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
        animation: {
          animateScale: true, // Adds zoom-in effect
        }
      }
    });
  }