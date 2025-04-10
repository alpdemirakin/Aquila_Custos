document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('modeToggle');
    const directionButtons = document.querySelectorAll('.direction-btn');
    const shootButton = document.querySelector('.shoot');

    let currentMode = 'manual';
    let currentDirection = null;
    let autoShootInterval = null;

    // Mode toggle handler
    modeToggle.addEventListener('change', (e) => {
        currentMode = e.target.checked ? 'auto' : 'manual';
        console.log(`Mode switched to: ${currentMode}`);
        
        if (currentMode === 'auto' && currentDirection) {
            startAutoShooting();
        } else {
            stopAutoShooting();
        }
    });

    // Direction button handlers
    directionButtons.forEach(button => {
        if (!button.classList.contains('shoot')) {
            button.addEventListener('click', () => {
                const direction = button.textContent;
                currentDirection = direction;
                console.log(`Direction set to: ${direction}`);

                // If in auto mode, start shooting
                if (currentMode === 'auto') {
                    startAutoShooting();
                }
            });
        }
    });

    // Shoot button handler
    shootButton.addEventListener('click', () => {
        if (currentMode === 'manual') {
            shoot();
        }
    });

    function shoot() {
        if (!currentDirection) {
            console.log('No direction selected!');
            return;
        }
        console.log(`Shooting in direction: ${currentDirection}`);
        
        // Visual feedback
        shootButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            shootButton.style.transform = 'scale(1)';
        }, 100);
    }

    function startAutoShooting() {
        stopAutoShooting(); // Clear any existing interval
        if (currentDirection) {
            autoShootInterval = setInterval(shoot, 500); // Shoot every 500ms
        }
    }

    function stopAutoShooting() {
        if (autoShootInterval) {
            clearInterval(autoShootInterval);
            autoShootInterval = null;
        }
    }
}); 