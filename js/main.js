// ==========================================
// GitHub Activity Feed - Beginner Friendly Version
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. Get the container where we'll show activity
    const githubFeed = document.getElementById('github-feed');
    
    // 2. Set your GitHub username
    const username = 'Jakobie97'; // ← Change this to yours
    
    // 3. TEST DATA - Safe version while learning
    const testData = [
        {
            type: "PushEvent",
            repo: { name: username + "/portfolio" }, // Uses your username
            payload: { 
                commits: [{ 
                    message: "Improved mobile layout" // Sample commit
                }]
            },
            created_at: new Date().toISOString() // Current time
        },
        {
            type: "PushEvent",
            repo: { name: username + "/blog" }, // Another sample repo
            payload: { 
                commits: [{ 
                    message: "Fixed image loading bug" 
                }]
            },
            created_at: new Date(Date.now() - 2*86400000).toISOString() // 2 days ago
        }
    ];

    // 4. Display loading state initially
    githubFeed.innerHTML = '<p>Loading activity...</p>';
    
    // 5. Function to display commits (used by both test and real data)
    function showCommits(events) {
        // Clear loading message
        githubFeed.innerHTML = '';
        
        // Filter for only PushEvents (commits)
        const pushEvents = events.filter(event => event.type === 'PushEvent');
        
        // Show message if no commits found
        if (pushEvents.length === 0) {
            githubFeed.innerHTML = '<p>No recent activity found</p>';
            return;
        }
        
        // Display each commit
        pushEvents.slice(0, 4).forEach(event => {
            const repoName = event.repo.name.split('/')[1]; // Get repo name
            const commitMsg = event.payload.commits[0].message;
            const commitDate = formatDate(event.created_at);
            
            githubFeed.innerHTML += `
                <div class="commit-card">
                    <span class="repo-name">${repoName}</span>
                    <p class="commit-message">${commitMsg}</p>
                    <div class="commit-meta">
                        <time>${commitDate}</time>
                    </div>
                </div>
            `;
        });
    }

    // 6. Helper function to format dates nicely
    function formatDate(dateString) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // 7. For now, use the test data
    setTimeout(() => {
        showCommits(testData);
        console.log("Displaying test data - working!");
    }, 800); // Small delay to see loading state

    /* 
    // 8. LATER: When ready for real API (just uncomment)
    fetch(`https://api.github.com/users/${username}/events`)
        .then(response => response.json())
        .then(showCommits)
        .catch(error => {
            console.error("API Error:", error);
            githubFeed.innerHTML = `
                <p>Couldn't load live activity</p>
                <small>Showing sample data instead</small>
            `;
            showCommits(testData); // Fallback to test data
        });
    */
});