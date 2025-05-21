 // GitHub Activity Feed
 document.addEventListener('DOMContentLoaded', function() {
    const githubFeed = document.getElementById('github-feed');
    
    fetch('https://api.github.com/users/Jakobie97/events?per_page=5') //fetch commandssssssss
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            githubFeed.innerHTML = '';
            
            const pushEvents = data.filter(event => event.type === 'PushEvent').slice(0, 4);
            
            if (pushEvents.length === 0) {
                githubFeed.innerHTML = '<p>No recent commits found</p>';
                return;
            }
            
            pushEvents.forEach(event => {
                const commit = event.payload.commits[0];
                const repo = event.repo.name.split('/')[1];
                const date = new Date(event.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                githubFeed.innerHTML += `
                    <div class="commit-card">
                        <span class="repo-name">${repo}</span>
                        <p class="commit-message">${commit.message}</p>
                        <div class="commit-meta">
                            <time datetime="${event.created_at}">${date}</time>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub data:', error);
            githubFeed.innerHTML = '<p>GitHub activity currently unavailable</p>';
        });
});