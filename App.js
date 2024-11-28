import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Utility function to generate realistic environmental data for Gurgaon
const generateEnvironmentalData = () => {
  const time = new Date().toLocaleTimeString();
  
  // Realistic data ranges for Gurgaon
  const temperature = Math.floor(Math.random() * (35 - 25 + 1)) + 25; // 25-35°C
  const humidity = Math.floor(Math.random() * (70 - 40 + 1)) + 40; // 40-70%
  const windSpeed = Math.floor(Math.random() * (15 - 5 + 1)) + 5; // 5-15 km/h
  
  // Pollution data
  const baseLevel = 80; // Average high pollution level
  const variation = Math.floor(Math.random() * 40);
  const pm25 = baseLevel + variation;

  return {
    time,
    temperature,
    humidity,
    windSpeed,
    pm25,
    airQualityIndex: calculateAQI(pm25)
  };
};

// AQI calculation based on PM2.5 levels
const calculateAQI = (pm25) => {
  if (pm25 <= 30) return "Good";
  if (pm25 <= 60) return "Moderate";
  if (pm25 <= 90) return "Unhealthy for Sensitive Groups";
  if (pm25 <= 120) return "Unhealthy";
  if (pm25 <= 250) return "Very Unhealthy";
  return "Hazardous";
};

// Color coding for AQI levels
const getAQIColor = (aqi) => {
  const colorMap = {
    "Good": "text-green-400",
    "Moderate": "text-yellow-400",
    "Unhealthy for Sensitive Groups": "text-orange-400",
    "Unhealthy": "text-red-400",
    "Very Unhealthy": "text-purple-400",
    "Hazardous": "text-red-600"
  };
  return colorMap[aqi] || "text-white";
};

const GurgaonEnvironmentalDashboard = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setGraphData((prevData) => {
        const newData = [...prevData, generateEnvironmentalData()];
        return newData.slice(Math.max(newData.length - 10, 0));
      });
    }, 3000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-7xl border-4 border-green-500 rounded-2xl p-8 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-white uppercase tracking-wider">
          Gurgaon Environmental Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Location and City Details */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-gray-800 text-center transform transition-all hover:scale-105">
            <h2 className="text-2xl font-bold mb-6 text-white uppercase">Location Details</h2>
            <div className="space-y-4">
              <p className="font-bold"><strong>City:</strong> Gurgaon</p>
              <p className="font-bold"><strong>State:</strong> Haryana</p>
              <p className="font-bold"><strong>Region:</strong> National Capital Region (NCR)</p>
              <div className="mt-6">
                <h3 className="font-bold mb-4 text-xl uppercase">Environmental Challenges:</h3>
                <ul className="list-none space-y-2">
                  <li className="font-bold">High Urban Pollution</li>
                  <li className="font-bold">Rapid Industrialization</li>
                  <li className="font-bold">Extreme Temperature Variations</li>
                  <li className="font-bold">Water Resource Stress</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Temperature Graph */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-gray-800 text-center transform transition-all hover:scale-105">
            <h2 className="text-2xl font-bold mb-6 text-white uppercase">Temperature Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#FFFFFF" />
                <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#FFFFFF' }} stroke="#FFFFFF" />
                <Tooltip />
                <Line type="monotone" dataKey="temperature" stroke="#F87171" name="Temperature" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Humidity Graph */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-gray-800 text-center transform transition-all hover:scale-105">
            <h2 className="text-2xl font-bold mb-6 text-white uppercase">Humidity Levels</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#FFFFFF" />
                <YAxis label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft', fill: '#FFFFFF' }} stroke="#FFFFFF" />
                <Tooltip />
                <Line type="monotone" dataKey="humidity" stroke="#60A5FA" name="Humidity" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Wind Speed Graph */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-gray-800 text-center transform transition-all hover:scale-105">
            <h2 className="text-2xl font-bold mb-6 text-white uppercase">Wind Speed</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#FFFFFF" />
                <YAxis label={{ value: 'Wind Speed (km/h)', angle: -90, position: 'insideLeft', fill: '#FFFFFF' }} stroke="#FFFFFF" />
                <Tooltip />
                <Line type="monotone" dataKey="windSpeed" stroke="#10B981" name="Wind Speed" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* PM2.5 Graph */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-gray-800 text-center transform transition-all hover:scale-105">
            <h2 className="text-2xl font-bold mb-6 text-white uppercase">PM2.5 Pollution Levels</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#FFFFFF" />
                <YAxis label={{ value: 'PM2.5 (µg/m³)', angle: -90, position: 'insideLeft', fill: '#FFFFFF' }} stroke="#FFFFFF" />
                <Tooltip />
                <Line type="monotone" dataKey="pm25" stroke="#FF6B6B" name="PM2.5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Current Metrics */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-gray-800 col-span-full text-center transform transition-all hover:scale-105">
            <h2 className="text-2xl font-bold mb-6 text-white uppercase">Current Environmental Metrics</h2>
            {graphData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
                <div>
                  <p className="text-white font-bold mb-2">Temperature</p>
                  <p className="text-2xl font-extrabold text-red-400">
                    {graphData[graphData.length - 1].temperature}°C
                  </p>
                </div>
                <div>
                  <p className="text-white font-bold mb-2">Humidity</p>
                  <p className="text-2xl font-extrabold text-blue-400">
                    {graphData[graphData.length - 1].humidity}%
                  </p>
                </div>
                <div>
                  <p className="text-white font-bold mb-2">Wind Speed</p>
                  <p className="text-2xl font-extrabold text-green-400">
                    {graphData[graphData.length - 1].windSpeed} km/h
                  </p>
                </div>
                <div>
                  <p className="text-white font-bold mb-2">PM2.5</p>
                  <p className="text-2xl font-extrabold text-red-500">
                    {graphData[graphData.length - 1].pm25} µg/m³
                  </p>
                </div>
                <div>
                  <p className="text-white font-bold mb-2">Air Quality</p>
                  <p className={`text-xl font-extrabold ${getAQIColor(
                    graphData[graphData.length - 1].airQualityIndex
                  )}`}>
                    {graphData[graphData.length - 1].airQualityIndex}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GurgaonEnvironmentalDashboard;
