async function fetchGitHubUser() {
    const username = document.getElementById('usernameInput').value;
    const url = `https://api.github.com/users/${username}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const user = await response.json();
        displayUserInfo(user);
    } catch (error) {
        showNoResults();
    }
}

function displayUserInfo(user) {
    document.getElementById('noResults').classList.add('hidden');
    document.getElementById('avatar').src = user.avatar_url;
    document.getElementById('name').textContent = user.name || user.login;
    document.getElementById('username').textContent = `@${user.login}`;
    document.getElementById('usernameLink').href = user.html_url;
    document.getElementById('bio').textContent = user.bio || 'No bio available';
    document.getElementById('repos').textContent = user.public_repos;
    document.getElementById('followers').textContent = user.followers;
    document.getElementById('following').textContent = user.following;
    document.getElementById('location').innerHTML = `<img src="./assets/location-icon.svg" alt=""> ${user.location || 'No location provided'}`;
    document.getElementById('blog').innerHTML = `<img src="./assets/link-icon.svg" alt=""> <a href="${user.blog || '#'}" target="_blank">${user.blog || 'No blog available'}</a>`;
    document.getElementById('company').innerHTML = `<img src="./assets/company-icon.svg" alt=""> ${user.company || 'No company provided'}`;
    
    const twitterHandle = user.twitter_username;
    if (twitterHandle) {
        document.getElementById('twitterLink').textContent = `@${twitterHandle}`;
        document.getElementById('twitterLink').href = `https://twitter.com/${twitterHandle}`;
    } else {
        document.getElementById('twitterLink').textContent = 'Not Available';
        document.getElementById('twitterLink').href = '#';
    }

    document.getElementById('userInfo').classList.remove('hidden');
}

function showNoResults() {
    document.getElementById('noResults').classList.remove('hidden');
    document.getElementById('userInfo').classList.add('hidden');
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    const themeToggleButton = document.getElementById('themeToggle');
    if (document.body.classList.contains('dark')) {
        themeToggleButton.innerHTML = 'LIGHT <span>🌞</span>';
    } else {
        themeToggleButton.innerHTML = 'DARK <span>🌙</span>';
    }
}

document.getElementById('usernameInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchGitHubUser();
    }
});