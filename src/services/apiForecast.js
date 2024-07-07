const baseUrl = `${import.meta.env.VITE_AI_URI}/forecast`;

// Function to post the prompt to the chatGPT api
export async function getForecastStock(product) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const forecast = await response.json();
    console.log('Forecast:', forecast);
    return forecast;
  } catch (error) {
    console.error('Error getting forecast:', error);
  }
}
