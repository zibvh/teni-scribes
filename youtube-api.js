// YouTube API Integration for Teni Scribes

// YouTube API Configuration
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your actual API key
const YOUTUBE_CHANNEL_ID = 'YOUR_CHANNEL_ID'; // Replace with Teni's YouTube channel ID
const YOUTUBE_PLAYLISTS = {
    'writing-tips': 'PLAYLIST_ID_1',
    'journaling': 'PLAYLIST_ID_2',
    'storytelling': 'PLAYLIST_ID_3'
};

// DOM Elements
const latestVideoPlaceholder = document.getElementById('latest-video-placeholder');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');

// Initialize YouTube API
document.addEventListener('DOMContentLoaded', function() {
    // Load YouTube API script
    loadYouTubeAPI();
    
    // Fetch latest video on homepage
    if (latestVideoPlaceholder) {
        fetchLatestVideo();
    }
    
    // If on videos page, fetch playlists
    if (window.location.pathname.includes('videos.html')) {
        initializeVideoLibrary();
    }
});

// Load YouTube IFrame API
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Fetch Latest Video
function fetchLatestVideo() {
    // In a real implementation, you would use the YouTube Data API
    // For now, we'll use a placeholder with a demo video
    
    // Example API call (commented out as it requires API key):
    /*
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const video = data.items[0];
                displayLatestVideo(video.id.videoId, video.snippet.title, video.snippet.description);
            }
        })
        .catch(error => {
            console.error('Error fetching YouTube data:', error);
            // Fallback to a demo video
            displayDemoVideo();
        });
    */
    
    // For demo purposes, show a placeholder
    displayDemoVideo();
}

// Display Latest Video
function displayLatestVideo(videoId, title, description) {
    // Create YouTube player
    new YT.Player('latest-video-placeholder', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'autoplay': 0,
            'controls': 1,
            'rel': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
    
    // Update video info
    if (videoTitle) {
        videoTitle.textContent = title;
    }
    
    if (videoDescription) {
        // Truncate description if too long
        const maxLength = 200;
        const truncatedDesc = description.length > maxLength 
            ? description.substring(0, maxLength) + '...' 
            : description;
        videoDescription.textContent = truncatedDesc;
    }
}

// For demo purposes - display a placeholder video
function displayDemoVideo() {
    const placeholderHTML = `
        <div class="demo-video-placeholder">
            <div class="demo-video-info">
                <h3>Writing Prompts for Creative Block</h3>
                <p>Learn how to overcome writer's block with these creative writing prompts and exercises. Perfect for journaling or story starters!</p>
                <div class="demo-video-actions">
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" class="btn btn-primary">
                        <i class="fab fa-youtube"></i> Watch Demo Video
                    </a>
                </div>
            </div>
        </div>
    `;
    
    latestVideoPlaceholder.innerHTML = placeholderHTML;
    latestVideoPlaceholder.style.display = 'flex';
    latestVideoPlaceholder.style.alignItems = 'center';
    latestVideoPlaceholder.style.justifyContent = 'center';
    latestVideoPlaceholder.style.background = 'linear-gradient(135deg, #8B4513 0%, #2E8B57 100%)';
    
    // Style for demo video placeholder
    const style = document.createElement('style');
    style.textContent = `
        .demo-video-placeholder {
            padding: 2rem;
            color: white;
            text-align: center;
            max-width: 600px;
        }
        
        .demo-video-info h3 {
            color: white;
            margin-bottom: 1rem;
        }
        
        .demo-video-info p {
            margin-bottom: 1.5rem;
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
}

// YouTube Player Ready Event
function onPlayerReady(event) {
    // Player is ready
    console.log('YouTube player ready');
}

// Initialize Video Library Page
function initializeVideoLibrary() {
    // Create video categories
    createVideoCategories();
    
    // Initialize search functionality
    initVideoSearch();
    
    // Fetch and display videos (in a real implementation)
    // fetchPlaylistVideos();
}

// Create Video Categories
function createVideoCategories() {
    const categoriesContainer = document.getElementById('video-categories');
    
    if (!categoriesContainer) return;
    
    const categories = [
        { id: 'all', name: 'All Videos', icon: 'fas fa-play-circle', count: 32 },
        { id: 'poetry', name: 'Poetry & Verse', icon: 'fas fa-feather', count: 10 },
        { id: 'spoken-word', name: 'Spoken Word', icon: 'fas fa-microphone', count: 8 },
        { id: 'faith-journaling', name: 'Faith & Reflection', icon: 'fas fa-hands-praying', count: 9 },
        { id: 'creative-writing', name: 'Creative Writing', icon: 'fas fa-book-open', count: 5 }
    ];
    
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'video-category';
        categoryElement.dataset.category = category.id;
        categoryElement.innerHTML = `
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <div class="category-info">
                <h4>${category.name}</h4>
                <p>${category.count} videos</p>
            </div>
        `;
        
        categoryElement.addEventListener('click', () => filterVideosByCategory(category.id));
        categoriesContainer.appendChild(categoryElement);
    });
}

// Filter Videos by Category
function filterVideosByCategory(categoryId) {
    // Remove active class from all categories
    document.querySelectorAll('.video-category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // Add active class to selected category
    const selectedCategory = document.querySelector(`.video-category[data-category="${categoryId}"]`);
    if (selectedCategory) {
        selectedCategory.classList.add('active');
    }
    
    // In a real implementation, you would filter the displayed videos
    // For now, we'll just log the selection
    console.log(`Filtering videos by category: ${categoryId}`);
    
    // Show a message about filtering
    const videoGrid = document.querySelector('.video-grid');
    if (videoGrid) {
        // In a real app, you would update the grid with filtered videos
        // For demo, we'll just update a message
        const filterMessage = document.getElementById('filter-message') || createFilterMessage();
        filterMessage.textContent = `Showing ${categoryId === 'all' ? 'all' : categoryId} videos`;
    }
}

function createFilterMessage() {
    const message = document.createElement('div');
    message.id = 'filter-message';
    message.className = 'filter-message';
    const videoGrid = document.querySelector('.video-grid');
    if (videoGrid && videoGrid.parentNode) {
        videoGrid.parentNode.insertBefore(message, videoGrid);
    }
    return message;
}

// Initialize Video Search
function initVideoSearch() {
    const searchInput = document.getElementById('video-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // In a real implementation, you would filter videos based on search term
        // For now, we'll just log the search
        console.log(`Searching for: ${searchTerm}`);
        
        // Show search results message
        const searchMessage = document.getElementById('search-message') || createSearchMessage();
        if (searchTerm.length > 0) {
            searchMessage.textContent = `Search results for: "${searchTerm}"`;
            searchMessage.style.display = 'block';
        } else {
            searchMessage.style.display = 'none';
        }
    });
}

function createSearchMessage() {
    const message = document.createElement('div');
    message.id = 'search-message';
    message.className = 'search-message';
    const videoGrid = document.querySelector('.video-grid');
    if (videoGrid && videoGrid.parentNode) {
        videoGrid.parentNode.insertBefore(message, videoGrid);
    }
    return message;
}

// Fetch Playlist Videos (example function)
function fetchPlaylistVideos(playlistId) {
    // Example API call for playlist videos
    /*
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=10`)
        .then(response => response.json())
        .then(data => {
            displayPlaylistVideos(data.items);
        })
        .catch(error => {
            console.error('Error fetching playlist:', error);
        });
    */
}

// Display Playlist Videos (example function)
function displayPlaylistVideos(videos) {
    // This function would create video cards for each video in the playlist
    // Implementation depends on your design and data structure
}