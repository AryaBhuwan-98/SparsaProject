document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const configScreen = document.getElementById('config-screen');
    const slideshowScreen = document.getElementById('slideshow-screen');
    const registerBtn = document.getElementById('register-btn');
    const nameInput = document.getElementById('name-input');
    const slideshowContainer = document.getElementById('slideshow-container');
    
    // Simulate Splash Screen display
    setTimeout(() => {
        splashScreen.classList.add('hidden');
        configScreen.classList.remove('hidden');
    }, 2000);

    // Register button event listener
    registerBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            localStorage.setItem('userName', name);
            startSlideshow();
        } else {
            alert('Enter the text on input box');
        }
    });

    // Start slideshow
    function startSlideshow() {
        configScreen.classList.add('hidden');
        slideshowScreen.classList.remove('hidden');
        
        const imagesAndVideos = [
            'image2.jpg',
            'image1.gif',
            'image2.jpg',
            'image1.gif'
        ];
        
        let currentIndex = 0;
        
        function showNext() {
            slideshowContainer.innerHTML = '';
            const media = document.createElement(imagesAndVideos[currentIndex].endsWith('.mp4') ? 'video' : 'img');
            media.src = imagesAndVideos[currentIndex];
            media.className = 'fade';
            if (media.tagName === 'VIDEO') {
                media.controls = true;
            }
            slideshowContainer.appendChild(media);
            media.classList.add('fade-in');
            setTimeout(() => media.classList.remove('fade-in'), 1000);
            currentIndex = (currentIndex + 1) % imagesAndVideos.length;
            setTimeout(showNext, 3000);
        }
        
        showNext();
    }
});

// Download files function
function downloadFile(url, filename) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        })
        .catch(console.error);
}

// CSS for fade-in effect
const style = document.createElement('style');
style.innerHTML = `
    .fade {
        opacity: 0;
        transition: opacity 1s ease-in-out;
    }
    .fade-in {
        opacity: 1;
    }
`;
document.head.appendChild(style);
