document.addEventListener('DOMContentLoaded', function() {
    initializeSuccessPage();
});

function initializeSuccessPage() {
    console.log('Success page initialized');
    const successSection = document.getElementById('success-section');
    if (!successSection || !successSection.classList.contains('active')) {
        return;
    }
    setupWelcomeAnimation();
    setupSessionTimer();
    setupUserPreferences();
}

function setupWelcomeAnimation() {
    const successIcon = document.querySelector('.success-icon');
    const welcomeText = document.querySelector('.success-card h1');
    if (successIcon && welcomeText) {
        setTimeout(() => {
            successIcon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                successIcon.style.transform = 'scale(1)';
            }, 200);
        }, 500);
        addTypingEffect(welcomeText, welcomeText.textContent);
    }
}

function addTypingEffect(element, text) {
    element.textContent = '';
    let index = 0;
    const typeInterval = setInterval(() => {
        element.textContent += text[index];
        index++;
        if (index >= text.length) {
            clearInterval(typeInterval);
        }
    }, 100);
}

function setupSessionTimer() {
    const SESSION_TIMEOUT = 30 * 60 * 1000;
    let sessionTimer;
    let warningTimer;
    function resetSessionTimer() {
        clearTimeout(sessionTimer);
        clearTimeout(warningTimer);
        warningTimer = setTimeout(() => {
            showSessionWarning();
        }, SESSION_TIMEOUT - (5 * 60 * 1000));
        sessionTimer = setTimeout(() => {
            handleAutoLogout();
        }, SESSION_TIMEOUT);
    }
    function showSessionWarning() {
        const warning = document.createElement('div');
        warning.className = 'session-warning';
        warning.innerHTML = `
            <div class="warning-content">
                <h3>Session Expiring Soon</h3>
                <p>Your session will expire in 5 minutes due to inactivity.</p>
                <button onclick="extendSession()">Stay Logged In</button>
                <button onclick="handleLogout()">Logout Now</button>
            </div>
        `;
        document.body.appendChild(warning);
        setTimeout(() => {
            if (document.body.contains(warning)) {
                document.body.removeChild(warning);
            }
        }, 5 * 60 * 1000);
    }
    function handleAutoLogout() {
        console.log('Session expired - auto logout');
        alert('Your session has expired due to inactivity.');
        if (typeof handleLogout === 'function') {
            handleLogout();
        }
    }
    window.extendSession = function() {
        const warning = document.querySelector('.session-warning');
        if (warning) {
            document.body.removeChild(warning);
        }
        resetSessionTimer();
        console.log('Session extended');
    };
    resetSessionTimer();
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
        document.addEventListener(event, resetSessionTimer, { passive: true });
    });
}

function setupUserPreferences() {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) return;
    const loginTime = new Date().toISOString();
    sessionStorage.setItem('loginTime', loginTime);
    displayLoginTime(loginTime);
    setupTimeBasedGreeting();
    trackUserSession(userEmail);
}

function displayLoginTime(loginTime) {
    const loginDate = new Date(loginTime);
    const timeString = loginDate.toLocaleString();
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
        const loginTimeElement = document.createElement('p');
        loginTimeElement.innerHTML = `<strong>Login time:</strong> ${timeString}`;
        loginTimeElement.style.marginTop = '8px';
        loginTimeElement.style.fontSize = '14px';
        loginTimeElement.style.color = '#718096';
        userInfo.appendChild(loginTimeElement);
    }
}

function setupTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 17) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }
    const welcomeText = document.querySelector('.success-card h1');
    if (welcomeText && !welcomeText.textContent.includes('Good')) {
        welcomeText.textContent = `${greeting}! Welcome to Kalvium`;
    }
}

function trackUserSession(userEmail) {
    console.log('Session tracked for user:', userEmail);
    const sessionData = {
        user: userEmail,
        loginTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language
    };
    localStorage.setItem('lastSession', JSON.stringify(sessionData));
}

function enhancedLogout() {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        sessionStorage.clear();
        localStorage.removeItem('lastSession');
        if (typeof handleLogout === 'function') {
            handleLogout();
        }
    }
}

document.addEventListener('keydown', function(event) {
    const successSection = document.getElementById('success-section');
    if (!successSection || !successSection.classList.contains('active')) {
        return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault();
        enhancedLogout();
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        refreshUserInfo();
    }
});

function refreshUserInfo() {
    const userEmail = sessionStorage.getItem('userEmail');
    const loginTime = sessionStorage.getItem('loginTime');
    if (userEmail) {
        const userEmailDisplay = document.getElementById('user-email');
        if (userEmailDisplay) {
            userEmailDisplay.style.opacity = '0.5';
            setTimeout(() => {
                userEmailDisplay.textContent = userEmail;
                userEmailDisplay.style.opacity = '1';
            }, 200);
        }
        console.log('User info refreshed');
    }
}

window.successPageHelpers = {
    enhancedLogout,
    refreshUserInfo,
    extendSession: window.extendSession
};

console.log('Success page enhancements loaded');
