/* ================================================
   AI TRAVEL GUARDIAN — JAVASCRIPT
   ================================================ */

// ============================
// NAVBAR SCROLL EFFECT
// ============================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============================
// HAMBURGER MENU
// ============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ============================
// SMOOTH SCROLL FUNCTIONS
// ============================
function scrollToFeatures() {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

function openDemo() {
  document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
}

// ============================
// PHONE APP INTERACTIONS
// ============================
let currentPhoneState = 'risk';

function showScamAlert() {
  resetPhoneWidgets();
  currentPhoneState = 'scam';
  const scamAlert = document.getElementById('scamAlert');
  scamAlert.style.display = 'block';
  
  // Update risk circle to red
  const circle = document.getElementById('riskCircle');
  circle.className = 'risk-circle high';
  document.getElementById('riskNumber').textContent = '8.5';
  document.getElementById('riskText').textContent = 'HIGH';
}

function showSafeRoute() {
  resetPhoneWidgets();
  currentPhoneState = 'route';
  // Show a visual flash on the risk widget
  const riskWidget = document.getElementById('riskWidget');
  riskWidget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
  
  // Update risk to low
  const circle = document.getElementById('riskCircle');
  circle.className = 'risk-circle low';
  document.getElementById('riskNumber').textContent = '2.1';
  document.getElementById('riskText').textContent = 'SAFE';
  
  setTimeout(() => {
    riskWidget.style.borderColor = '';
  }, 2000);
}

function triggerEmergency() {
  const emergencyWidget = document.getElementById('emergencyWidget');
  resetPhoneWidgets();
  emergencyWidget.style.display = 'block';
  
  // Sequentially activate emergency steps
  const steps = document.querySelectorAll('.e-step');
  steps.forEach((step, i) => {
    setTimeout(() => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    }, i * 600);
  });

  // Also open the big SOS modal
  setTimeout(() => {
    openSosModal();
  }, 300);
}

function resetPhoneWidgets() {
  document.getElementById('scamAlert').style.display = 'none';
  document.getElementById('emergencyWidget').style.display = 'none';
  
  // Reset risk circle
  const circle = document.getElementById('riskCircle');
  circle.className = 'risk-circle medium';
  document.getElementById('riskNumber').textContent = '6.2';
  document.getElementById('riskText').textContent = 'MEDIUM';
}

// ============================
// SOS MODAL
// ============================
function openSosModal() {
  const modal = document.getElementById('sosModal');
  modal.classList.add('active');
  
  // Reset steps
  const steps = document.querySelectorAll('.modal-step');
  steps.forEach(step => {
    step.classList.remove('done');
    const status = step.querySelector('.ms-status');
    status.classList.remove('done');
    status.classList.add('pending');
  });

  // Sequentially complete steps
  const delays = [800, 1600, 2400, 3400, 4400];
  steps.forEach((step, i) => {
    setTimeout(() => {
      step.classList.add('done');
      const status = step.querySelector('.ms-status');
      status.classList.remove('pending');
      status.classList.add('done');
    }, delays[i]);
  });
}

function closeSosModal(event) {
  if (event.target === document.getElementById('sosModal')) {
    document.getElementById('sosModal').classList.remove('active');
  }
}

// ============================
// FEATURE CARD INTERACTION
// ============================
function activateFeature(card, type) {
  document.querySelectorAll('.feature-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
}

// ============================
// DEMO SCENARIO SYSTEM
// ============================
const scenarios = {
  taxi: {
    headerClass: 'warning',
    headerText: '⚠️ SCAM DETECTED',
    content: `
      <div class="alert-detail"><strong>Location:</strong> India Gate, New Delhi</div>
      <div class="fare-compare-demo">
        <div class="fcd-item bad">
          <div class="fcd-label">Quoted Fare</div>
          <div class="fcd-price">₹2,500</div>
        </div>
        <div class="fcd-item good">
          <div class="fcd-label">Fair Fare</div>
          <div class="fcd-price">₹700</div>
        </div>
      </div>
      <div class="alert-recommendation">
        <strong>AI Recommendation:</strong> Decline this taxi. Use a metered cab or app-based taxi (Ola/Uber). You can report this driver to tourism police.
      </div>
      <div class="alert-actions">
        <button class="action-btn">📞 Tourism Police</button>
        <button class="action-btn primary-action">🗺️ Find Safe Taxi</button>
      </div>
    `
  },
  unsafe: {
    headerClass: 'caution',
    headerText: '⚠️ RISK LEVEL: HIGH — UNSAFE AREA',
    content: `
      <div class="alert-detail"><strong>Location:</strong> Paharganj Back Alley, Delhi — 11:34 PM</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;font-size:0.8rem;padding:8px 12px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:8px;">
          <span>💡 Lighting</span><span style="color:#f59e0b;font-weight:700;">Very Poor</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.8rem;padding:8px 12px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:8px;">
          <span>🚨 Crime reports (7 days)</span><span style="color:#ef4444;font-weight:700;">12 incidents</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.8rem;padding:8px 12px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:8px;">
          <span>👥 Foot traffic</span><span style="color:#f59e0b;font-weight:700;">Minimal</span>
        </div>
      </div>
      <div class="alert-recommendation">
        <strong>AI Recommendation:</strong> Turn back. AI has calculated a safer alternate route adding only 4 minutes.
      </div>
      <div class="alert-actions">
        <button class="action-btn">🆘 SOS Mode</button>
        <button class="action-btn primary-action">🗺️ Safe Alternate Route</button>
      </div>
    `
  },
  emergency: {
    headerClass: 'danger',
    headerText: '🆘 SOS ACTIVATED — HELP IS COMING',
    content: `
      <div class="alert-detail"><strong>Location:</strong> Shared automatically · Accuracy 5m</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:10px;font-size:0.8rem;padding:8px 12px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;">
          <span>✅</span><span style="color:#10b981;font-weight:600;">Location shared with family</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;font-size:0.8rem;padding:8px 12px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;">
          <span>✅</span><span style="color:#10b981;font-weight:600;">Police contacted — ETA: 4 mins</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;font-size:0.8rem;padding:8px 12px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;">
          <span>✅</span><span style="color:#10b981;font-weight:600;">Apollo Hospital — 1.2km away</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;font-size:0.8rem;padding:8px 12px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);border-radius:8px;">
          <span>⏳</span><span style="color:#3b82f6;font-weight:600;">Embassy being contacted...</span>
        </div>
      </div>
      <div class="alert-actions">
        <button class="action-btn primary-action" style="background:linear-gradient(135deg,#ef4444,#dc2626)">🆘 Cancel SOS</button>
      </div>
    `
  },
  weather: {
    headerClass: 'warning',
    headerText: '🌊 FLASH FLOOD WARNING',
    content: `
      <div class="alert-detail"><strong>Alert:</strong> Flash Flood Warning · Rishikesh, Uttarakhand</div>
      <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:10px;padding:14px;margin-bottom:16px;">
        <div style="font-size:0.85rem;color:#ef4444;font-weight:700;margin-bottom:8px;">⚠️ Immediate Danger Zone</div>
        <div style="font-size:0.8rem;color:#9ca3af;line-height:1.6;">
          Heavy rainfall upstream has triggered a flash flood alert. Water level rising at Ganga Ghat.<br/><br/>
          <strong style="color:#f9fafb;">Your planned route crosses the affected bridge.</strong>
        </div>
      </div>
      <div class="alert-recommendation">
        <strong>AI Recommendation:</strong> Avoid the riverside route. AI has found an inland alternate route. Move to higher ground immediately.
      </div>
      <div class="alert-actions">
        <button class="action-btn">📻 Disaster Alerts</button>
        <button class="action-btn primary-action">🗺️ Safe Inland Route</button>
      </div>
    `
  }
};

function runScenario(type) {
  // Update active button
  document.querySelectorAll('.scenario-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  const scenario = scenarios[type];
  const output = document.getElementById('demoOutput');
  
  // Fade out
  output.style.opacity = '0';
  output.style.transform = 'translateY(10px)';
  output.style.transition = 'all 0.3s';
  
  setTimeout(() => {
    output.innerHTML = `
      <div class="demo-alert-card">
        <div class="alert-header ${scenario.headerClass}">
          <span>${scenario.headerText}</span>
          <span class="alert-time">Just now</span>
        </div>
        <div class="alert-body">
          ${scenario.content}
        </div>
      </div>
    `;
    
    output.style.opacity = '1';
    output.style.transform = 'translateY(0)';
  }, 300);
}

// ============================
// SCROLL ANIMATIONS
// ============================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
  const animatableElements = document.querySelectorAll(
    '.problem-card, .feature-card, .step-item, .audience-card, .rev-card, .price-card, .test-card'
  );
  
  animatableElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.1}s, transform 0.6s ease ${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
});

// ============================
// LIVE RISK SCORE ANIMATION
// ============================
// Simulate risk score changing over time on the phone widget
let riskDirection = 1;
let currentRisk = 6.2;

setInterval(() => {
  if (currentPhoneState !== 'risk') return;
  
  currentRisk += (Math.random() - 0.5) * 0.3 * riskDirection;
  currentRisk = Math.max(3, Math.min(9, currentRisk));
  
  const riskNum = document.getElementById('riskNumber');
  if (riskNum) {
    riskNum.textContent = currentRisk.toFixed(1);
  }
}, 3000);

// ============================
// RISK BARS ANIMATION
// ============================
// Animate risk bars with subtle live changes
function animateRiskBars() {
  const bars = document.querySelectorAll('.bar-fill');
  bars.forEach(bar => {
    const currentWidth = parseInt(bar.style.width);
    const change = (Math.random() - 0.5) * 6;
    const newWidth = Math.max(20, Math.min(95, currentWidth + change));
    bar.style.width = newWidth + '%';
    bar.style.transition = 'width 1.5s ease';
  });
}

setInterval(animateRiskBars, 3500);

// ============================
// COUNTER ANIMATION
// ============================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const text = counter.textContent;
    if (text.includes('M')) {
      // Already formatted, skip
    }
  });
}

// ============================
// KEYBOARD SHORTCUTS
// ============================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('sosModal').classList.remove('active');
    mobileMenu.classList.remove('open');
  }
});

// ============================
// TYPING EFFECT FOR HERO SUBTITLE
// ============================
// Staggered entrance animation for hero on load
window.addEventListener('load', () => {
  const heroBadge = document.querySelector('.hero-badge');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');
  const heroStats = document.querySelector('.hero-stats');

  [heroBadge, heroTitle, heroSubtitle, heroCta, heroStats].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 150);
  });
});

// ============================
// TOOLTIP ON RISK CIRCLE CLICK
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const riskCircle = document.getElementById('riskCircle');
  if (riskCircle) {
    riskCircle.addEventListener('click', () => {
      riskCircle.style.transform = 'scale(1.1)';
      setTimeout(() => {
        riskCircle.style.transform = '';
      }, 300);
    });
  }
});

console.log('%c🛡️ TravelGuardian AI', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for safer travel worldwide', 'color: #10b981; font-size: 14px;');
