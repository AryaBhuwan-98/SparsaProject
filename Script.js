document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const configScreen = document.getElementById('config-screen');
    const slideshowScreen = document.getElementById('slideshow-screen');
    const registerBtn = document.getElementById('register-btn');
    const nameInput = document.getElementById('name-input');
    const slideshowContainer = document.getElementById('slideshow-container');
    const gridViewContainer = document.getElementById('grid-view-container');
    
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
        gridViewContainer.classList.remove('hidden');
        
        const imagesAndVideos = [
            { url: 'Asstes/image1.jpeg', type: 'image' },
            { url: 'Asstes/image2.jpeg', type: 'image' },
            { url: 'Asstes/image3.jpeg', type: 'image' },
            { url: 'Asstes/vedio1.mp4', type: 'video' },
            { url: 'Asstes/vedio2.mp4', type: 'video' }
        ];
        
        let currentIndex = 0;
        
        function showNext() {
            slideshowContainer.innerHTML = '';
            const currentMedia = imagesAndVideos[currentIndex];
            const mediaElement = document.createElement(currentMedia.type === 'video' ? 'video' : 'img');
            mediaElement.src = currentMedia.url;
            mediaElement.className = 'fade';
            if (currentMedia.type === 'video') {
                mediaElement.controls = true;
            }
            slideshowContainer.appendChild(mediaElement);
            mediaElement.classList.add('fade-in');
            setTimeout(() => mediaElement.classList.remove('fade-in'), 1000);
            currentIndex = (currentIndex + 1) % imagesAndVideos.length;
            setTimeout(showNext, 3000);
        }
        
        showNext();
        populateGrid(imagesAndVideos);
    }
    
    // Populate Grid View
    function populateGrid(items) {
        gridViewContainer.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'grid-card';
            
            const mediaElement = document.createElement(item.type === 'video' ? 'video' : 'img');
            mediaElement.src = item.url;
            if (item.type === 'video') {
                mediaElement.controls = true;
            }
            
            const actions = document.createElement('div');
            actions.className = 'card-actions';
            
            const watchBtn = document.createElement('button');
            watchBtn.textContent = 'Watch';
            watchBtn.addEventListener('click', () => {
                showMedia(item.url, item.type);
            });
            
            const downloadBtn = document.createElement('button');
            downloadBtn.textContent = 'Download';
            downloadBtn.addEventListener('click', () => {
                downloadFile(item.url, item.url.split('/').pop());
            });
            
            actions.appendChild(watchBtn);
            actions.appendChild(downloadBtn);
            card.appendChild(mediaElement);
            card.appendChild(actions);
            gridViewContainer.appendChild(card);
        });
    }

    // Show media in slideshow container
    function showMedia(url, type) {
        slideshowContainer.innerHTML = '';
        const mediaElement = document.createElement(type === 'video' ? 'video' : 'img');
        mediaElement.src = url;
        if (type === 'video') {
            mediaElement.controls = true;
        }
        slideshowContainer.appendChild(mediaElement);
    }

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
});