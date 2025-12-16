# Azure Functions Weather API (TypeScript)

A **serverless HTTP-triggered Azure Function** that fetches and returns current weather data from [weatherapi.com](https://www.weatherapi.com/).

Deployed on **Azure Consumption Plan** (free tier) using the modern Node.js v4 programming model in TypeScript.

Perfect demonstration of:
- Serverless architecture on Azure
- External API integration
- Secure configuration (API keys via Application Settings)
- Clean error handling and JSON responses
- Type-safe code with TypeScript

## Live Demo

Try it right now (no authentication required):

**Endpoint**: `GET /api/weather?q={location}`

## Deployment
Deployed as a serverless Azure Function on the **Consumption Plan** (free tier) using the VS Code Azure Functions extension.

- API key securely stored in Azure Application Settings
- Live endpoint: https://geweather-dwbmcydtfmbbdaah.canadacentral-01.azurewebsites.net/api/weather?q=Toronto

## Future Improvements (Optional Ideas)
- Add caching with Azure Redis
- Support forecast endpoint
- Add input validation with Zod
- Integrate with Azure API Management

## Tech Stack
- **Azure Functions** (Consumption Plan, Node.js 20)
- **TypeScript** (v4 programming model)
- **node-fetch** for external API calls
- Deployed via VS Code Azure Extension

## Architecture Overview
This project uses Azure Functions' HTTP trigger to create a scalable, pay-per-execution endpoint.

## Local Development
1. Clone the repo
2. `npm install`
3. Add your weatherapi.com key to `local.settings.json`:
   ```json
   {
     "Values": {
       "WEATHER_API_KEY": "your-key-here"
     }
   }

Sample Response:
```json
{
  "location": "Toronto, Ontario, Canada",
  "temperature_c": -7.1,
  "temperature_f": 19.3,
  "condition": "Partly Cloudy",
  "humidity": 69,
  "wind_kph": 23.8,
  "feels_like_c": -13.5,
  "last_updated": "2025-12-15 19:45"
}
