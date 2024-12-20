document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  const errorElement = document.getElementById("error-message");
  const weatherDataElement = document.getElementById("weather-data");

  
  errorElement.style.display = "none";
  weatherDataElement.style.display = "none";

  if (!city) {
    errorElement.style.display = "block";
    errorElement.textContent = "Please enter a city name.";
    return;
  }

 
  fetch("data.json")
    .then((response) => {
      console.log("Fetch response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to load data.json");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Loaded data:", data);

      
      const cityEntry = Object.entries(data.cities).find(
        ([key]) => key.toLowerCase() === city.toLowerCase()
      );

      if (cityEntry) {
         
        const [cityName, cityData] = cityEntry;

   
       
        document.getElementById("city-name").textContent = cityName;
        document.getElementById("date").textContent = `Date: ${new Date().toLocaleDateString()}`;
        document.getElementById("temperature").textContent = `Temperature: ${cityData.temperature}`;
        document.getElementById("description").textContent = `Weather: ${cityData.description}`;
        
        document.getElementById("humidity").textContent = `Humidity: ${cityData.humidity}`;
        document.getElementById("wind-speed").textContent = `Wind Speed: ${cityData.wind_speed}`;
        document.getElementById("pressure").textContent = `Pressure: ${cityData.pressure}`;

        weatherDataElement.style.display = "block";
      } else {
        errorElement.style.display = "block";
        errorElement.textContent = "City not found. Please try again.";
      }
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      errorElement.style.display = "block";
      errorElement.textContent = "Error loading weather data. Please try again later.";
    });
});
