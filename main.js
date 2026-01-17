document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([36.5, 127.5], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const minPopulationThreshold = 100000; // 10만명 기준

    let cities = [
        { name: 'Seoul', lat: 37.56, lon: 126.99, population: 9390000, malePopulation: 4481099, femalePopulation: 4818449 },
        { name: 'Busan', lat: 35.18, lon: 129.075, population: 3260000, malePopulation: 1575600, femalePopulation: 1666000 },
        { name: 'Incheon', lat: 37.4833, lon: 126.6333, population: 2964820, malePopulation: 1524286, femalePopulation: 1527675 },
        { name: 'Daegu', lat: 35.8717, lon: 128.6017, population: 2350000, malePopulation: 1152579, femalePopulation: 1200453 },
        { name: 'Daejeon', lat: 36.35, lon: 127.385, population: 1446749, malePopulation: 717936, femalePopulation: 722793 },
        { name: 'Gwangju', lat: 35.1653, lon: 126.8486, population: 1432049, malePopulation: 686799, femalePopulation: 705214 },
        { name: 'Ulsan', lat: 35.55, lon: 129.3167, population: 1111371, malePopulation: 562926, femalePopulation: 529022 },
        { name: 'Suwon', lat: 37.2667, lon: 127.0167, population: 1191063, malePopulation: 599668, femalePopulation: 593337 },
        { name: 'Goyang', lat: 37.65, lon: 126.8, population: 1063175, malePopulation: 519280, femalePopulation: 546843 },
        { name: 'Changwon', lat: 35.2708, lon: 128.6631, population: 1003737, malePopulation: 515722, femalePopulation: 498181 },
        { name: 'Hwaseong', lat: 37.208, lon: 126.831, population: 1040000, malePopulation: 506675, femalePopulation: 469980 },
    ];

    // Filter cities with population greater than or equal to 100,000
    cities = cities.filter(city => city.population >= minPopulationThreshold);

    // Add markers to map for filtered cities
    cities.forEach(city => {
        const ratio = (city.malePopulation / city.femalePopulation).toFixed(2);
        L.marker([city.lat, city.lon]).addTo(map)
            .bindPopup(`<b>${city.name}</b><br>Total Population: ${city.population.toLocaleString()}<br>Male: ${city.malePopulation.toLocaleString()}<br>Female: ${city.femalePopulation.toLocaleString()}<br>M/F Ratio: ${ratio}`);
    });

    // Dynamically generate population table
    const populationContainer = document.querySelector('.population-container');
    let tableHTML = `
        <h2>2025년 12월 기준 인구 10만명 이상 도시</h2>
        <table>
            <thead>
                <tr>
                    <th>도시 (City)</th>
                    <th>총 인구 (Total Population)</th>
                    <th>남자 인구 (Male Population)</th>
                    <th>여자 인구 (Female Population)</th>
                    <th>남녀 비율 (M/F Ratio)</th>
                </tr>
            </thead>
            <tbody>
    `;

    cities.forEach(city => {
        const ratio = (city.malePopulation / city.femalePopulation).toFixed(2);
        tableHTML += `
            <tr>
                <td>${city.name}</td>
                <td>${city.population.toLocaleString()}</td>
                <td>${city.malePopulation.toLocaleString()}</td>
                <td>${city.femalePopulation.toLocaleString()}</td>
                <td>${ratio}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;
    populationContainer.innerHTML = tableHTML;

    fetch('https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-geo.json')
        .then(response => response.json())
        .then(geojsonData => {
            L.geoJSON(geojsonData, {
                style: {
                    color: '#3388ff',
                    weight: 1,
                    opacity: 0.5
                }
            }).addTo(map);
        });
});
