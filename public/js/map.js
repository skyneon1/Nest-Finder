document.addEventListener('DOMContentLoaded', function () {

    const map = L.map('map').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);


    let markers = [];


    function clearMarkers() {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
    }


    function clearCards() {
        document.getElementById('results').innerHTML = '';
    }


    function createCards(properties) {
        const resultsContainer = document.getElementById('results');
        properties.forEach(property => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${property.name}</h3>
                <p>Type: ${property.type}</p>
                <p>Location: ${property.location}</p>
                <p>Price: ${property.price}</p>
                <a href="/property/${property.id}" class="btn">Know More</a>
            `;
            resultsContainer.appendChild(card);
        });
    }


    async function fetchProperties(query) {
        try {
            const response = await fetch(`/api/properties?q=${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const properties = await response.json();


            clearMarkers();
            clearCards();


            createCards(properties);
            properties.forEach(property => {
                const marker = L.marker([property.latitude, property.longitude])
                    .addTo(map)
                    .bindPopup(`
                        <div>
                            <h3>${property.name}</h3>
                            <p>Type: ${property.type}</p>
                            <p>Location: ${property.location}</p>
                            <p>Price: ${property.price}</p>
                        </div>
                    `);
                markers.push(marker);
            });


            if (properties.length === 1) {
                map.setView([properties[0].latitude, properties[0].longitude], 15);
            } else if (properties.length > 1) {
                // Fit the map bounds to include all markers
                const bounds = L.latLngBounds(properties.map(p => [p.latitude, p.longitude]));
                map.fitBounds(bounds);
            }

        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }

    // fetchProperties('');
    const query = '<%= query %>';
fetchProperties(query || '');


    document.getElementById('search').addEventListener('input', function (e) {
        const query = e.target.value.trim();
        fetchProperties(query);
    });
});