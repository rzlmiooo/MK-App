document.getElementById('menuButton').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block';
    } else {
        sidebar.style.display = 'none';
    }
});

// Close sidebar when clicking outside of it
document.addEventListener('click', function(event) {
    var sidebar = document.getElementById('sidebar');
    var menuButton = document.getElementById('menuButton');

    // Check if the click is outside the sidebar and menu button
    if (!sidebar.contains(event.target) && event.target !== menuButton) {
        sidebar.style.display = 'none';
    }
});

//Cards 
const overpassUrl = 'https://overpass-api.de/api/interpreter';
const overpassQuery = `
[out:json];
area[name="Magetan"]->.magetan;
(
  node["amenity"="restaurant"](area.magetan);
  way["amenity"="restaurant"](area.magetan);
  relation["amenity"="restaurant"](area.magetan);
);
out center;
`;

let currentPage = 0;
const itemsPerPage = 12;
let restaurants = [];

async function fetchRestaurantData() {
    try {
        const response = await fetch(overpassUrl, {
            method: 'POST',
            body: overpassQuery,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = await response.json();
        restaurants = data.elements;
        renderPage(currentPage);
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
    }
}

function renderPage(page) {
    const startIndex = page * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, restaurants.length);
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';

    for (let i = startIndex; i < endIndex; i++) {
        const restaurant = restaurants[i];
        const restaurantId = restaurant.id || 'No ID';
        const restaurantName = restaurant.tags.name || 'Unnamed Restaurant';
        const restaurantPhone = restaurant.tags.phone || 'N/A';
        const restaurantLat = restaurant.lat || 0;
        const restaurantLon = restaurant.lon || 0;
        const restaurantLink = `https://www.openstreetmap.org/?mlat=${restaurantLat}&mlon=${restaurantLon}&zoom=16`;
        const restaurantRating = restaurant.tags.rating || (Math.random() * 5).toFixed(1);
        const restaurantImage = `https://picsum.photos/300/200?random=${i}`;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${restaurantImage}" alt="${restaurantName}" />
            <h2>${restaurantName}</h2>
            <p>Telephone: ${restaurantPhone}</p>
            <p>Rating: ${restaurantRating}</p>
           <p><a href="${restaurantLink}" target="_blank"><i class="fas fa-map-marker-alt"></i> ${restaurantName}</a></p>
        `;
        container.appendChild(card);
    }

    document.getElementById('prevPageButton').disabled = page === 0;
    document.getElementById('nextPageButton').disabled = endIndex === restaurants.length;
}

document.getElementById('prevPageButton').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        renderPage(currentPage);
    }
});

document.getElementById('nextPageButton').addEventListener('click', () => {
    if ((currentPage + 1) * itemsPerPage < restaurants.length) {
        currentPage++;
        renderPage(currentPage);
    }
});

fetchRestaurantData();
