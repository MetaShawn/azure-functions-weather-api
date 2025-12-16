import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import fetch from "node-fetch";

app.get("getWeather", {
    route: "weather",  // URL will be /api/weather?q=London
    authLevel: "anonymous",
    handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
        context.log("Processing weather request");

        // Get location from query param 'q'
        const location = request.query.get("q");
        if (!location) {
            return {
                status: 400,
                jsonBody: { error: "Please provide a location with ?q=<city or postcode>" }
            };
        }

        // Get API key from environment variable
        const apiKey = process.env.WEATHER_API_KEY;
        if (!apiKey) {
            context.error("WEATHER_API_KEY not configured");
            return { status: 500, jsonBody: { error: "Server configuration error" } };
        }

        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 400) {
                    return { status: 400, jsonBody: { error: "Invalid location" } };
                }
                throw new Error(`Weather API error: ${response.status}`);
            }

            const data: any = await response.json();

            const current = data.current;
            const loc = data.location;

            const simplified = {
                location: `${loc.name}, ${loc.region}, ${loc.country}`,
                temperature_c: current.temp_c,
                temperature_f: current.temp_f,
                condition: current.condition.text,
                humidity: current.humidity,
                wind_kph: current.wind_kph,
                feels_like_c: current.feelslike_c,
                last_updated: current.last_updated
            };

            return {
                status: 200,
                jsonBody: simplified
            };

        } catch (error) {
            context.error(`Error: ${error}`);
            return { status: 500, jsonBody: { error: "Failed to fetch weather data" } };
        }
    }
});