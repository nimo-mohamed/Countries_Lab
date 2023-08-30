// Global variable to store all countries
let allCountries = [];

// Function to fetch all countries from the RESTCountries API
async function fetchCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();
  return countries;
}

// Function to set up the initial state
async function SetUp() {
  allCountries = await fetchCountries();
  
  // Remove the initial <p> element
  document.getElementById('countriesList').innerHTML = '';

  // Populate the country list
  populateCountryList(allCountries);
}

// Function to populate the country list
function populateCountryList(countries) {
  const countryList = document.getElementById('countriesList');
  
  // Clear existing list items
  countryList.innerHTML = '';
  
  // Add each country as a new list item
  for (const country of countries) {
    const listItem = document.createElement('li');
    listItem.textContent = `${country.name.common} (Population: ${country.population})`;
    countryList.appendChild(listItem);
  }
}

// Function to filter countries based on search query
function filterCountries(query) {
  const filtered = allCountries.filter(country => 
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );
  
  // Update the displayed list
  populateCountryList(filtered);
}

// Add form submit event listener
document.getElementById('searchForm').addEventListener('submit', function(event) {
  // Prevent the default form submit action
  event.preventDefault();
  
  // Get the search query
  const query = document.getElementById('searchInput').value;
  
  // Log to console (for debugging)
  console.log(`Searching for: ${query}`);
  
  // Filter and update the country list
  filterCountries(query);
});

// Call SetUp function when the page loads
window.onload = SetUp;
