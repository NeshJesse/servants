document.addEventListener('DOMContentLoaded', () => {
    let profiles = [];

    const profileContainer = document.getElementById('profile-container');
    const countySelect = document.getElementById('countySelect');
    const constituencySelect = document.getElementById('constituencySelect');
    const filterForm = document.getElementById('filterForm');

    axios.get('/profiles')
        .then(response => {
            profiles = response.data;
            populateFilters(profiles);
            displayProfiles(profiles);
        })
        .catch(error => {
            console.error('Error fetching profiles:', error);
        });

    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        filterProfiles();
    });

    function populateFilters(profiles) {
        const counties = [...new Set(profiles.map(profile => profile.county).filter(Boolean))];
        counties.forEach(county => {
            const option = document.createElement('option');
            option.value = county;
            option.textContent = county;
            countySelect.appendChild(option);
        });

        const constituencies = [...new Set(profiles.map(profile => profile.constituency).filter(Boolean))];
        constituencies.forEach(constituency => {
            const option = document.createElement('option');
            option.value = constituency;
            option.textContent = constituency;
            constituencySelect.appendChild(option);
        });
    }

    function filterProfiles() {
        const selectedCounty = countySelect.value;
        const selectedConstituency = constituencySelect.value;

        const filteredProfiles = profiles.filter(profile => {
            return (!selectedCounty || profile.county === selectedCounty) &&
                   (!selectedConstituency || profile.constituency === selectedConstituency);
        });

        displayProfiles(filteredProfiles);
    }

    function displayProfiles(profiles) {
        profileContainer.innerHTML = '';

        profiles.forEach(profile => {
            const profileCard = document.createElement('a');
            profileCard.href = `/profile/${profile.id}`;
            profileCard.className = 'profile-card bg-white rounded-lg shadow-md p-6 block';

            profileCard.innerHTML = `
              <div class="profile-card bg-white p-6 rounded-lg shadow-md">
                <div class="card-image mb-4">
                    <img src="${profile.image}" alt="Profile image" class="w-32 h-32 rounded-full mx-auto">
                </div>
                <div class="text-center">
                    <p class="name text-xl font-semibold text-gray-800">${profile.name}</p>
                    <p class="text-gray-600">County: ${profile.county}</p>
                    <p class="text-gray-600 mt-2">Constituency: ${profile.constituency}</p>
                    <p class="text-gray-600 mt-2">Party Affiliate: ${profile.party}</p>
                    <p class="text-gray-600 mt-2">Voted: ${profile.vote || 'N/A'}</p>
                </div>
              </div>
            `;

            profileContainer.appendChild(profileCard);
        });
    }
});

