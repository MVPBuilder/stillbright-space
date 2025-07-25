//
// script.js
// ----------
// Handles onboarding form submission, stores user details in
// localStorage and personalises the dashboard. Also rotates
// inspirational messages.

document.addEventListener('DOMContentLoaded', function () {
  // Onboarding form logic
  const onboardingForm = document.getElementById('onboarding-form');
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', function (event) {
      event.preventDefault();
      // Capture form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const stageSelect = document.getElementById('stage');
      const stage = stageSelect.options[stageSelect.selectedIndex].value;
      // Construct user object
      const user = { name, email, stage };
      // Persist to localStorage
      try {
        localStorage.setItem('stillbrightUser', JSON.stringify(user));
      } catch (e) {
        console.error('Unable to save user details:', e);
      }
      // Redirect to dashboard page
      window.location.href = 'dashboard.html';
    });
  }

  // Dashboard personalisation logic
  const userNameSpan = document.getElementById('userName');
  if (userNameSpan) {
    let user = null;
    try {
      const stored = localStorage.getItem('stillbrightUser');
      user = stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Error reading user data from localStorage:', e);
    }
    if (user) {
      userNameSpan.textContent = user.name;
      const stageMessage = document.getElementById('stageMessage');
      if (stageMessage) {
        switch (user.stage) {
          case 'pre-retiree':
            stageMessage.textContent = 'Here are resources to help you plan ahead for retirement.';
            break;
          case 'newly-retired':
            stageMessage.textContent = 'Welcome to a new chapter! Find support as you adjust to retirement.';
            break;
          case 'retired':
            stageMessage.textContent = 'Keep thriving in retirement with our curated resources.';
            break;
          default:
            stageMessage.textContent = '';
        }
      }
    }
    // Inspirational quotes
    const inspirationText = document.getElementById('inspirationText');
    if (inspirationText) {
      const quotes = [
        'Retirement is not the end of the road; it’s the beginning of the open highway.',
        'The best is yet to come. Enjoy every moment of your retirement.',
        'Retirement is when you stop living at work and start working at living.',
        'Every day is a new adventure. Embrace it with joy and purpose.',
        'A new chapter awaits you – let it be filled with growth, joy and discovery.'
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      inspirationText.textContent = randomQuote;
    }
  }
});