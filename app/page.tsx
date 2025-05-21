"use client";

import { useState } from "react";

const countryCodes = [
  "ru",
  "us",
  "cy",
  "gb",
  "de",
  "fr",
  "it",
  "es",
  "jp",
  "cn",
  "in",
  "br",
];

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const sendRandomCountryRequest = async () => {
    //Send a request to the backend with a random country code
    try {
      const randomCountry =
        countryCodes[Math.floor(Math.random() * countryCodes.length)];
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/statistics/${randomCountry}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        setResult(`Successfully sent request for country: ${randomCountry}`);
      } else {
        setResult("Error sending request");
      }
    } catch (error) {
      setResult("Error: " + error);
    }
  };

  const getAllStatistics = async () => {
    //Send a request to the backend to get all statistics
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/statistics`
      );
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error: " + error);
    }
  };

  const sendBulkRandomCountryRequests = async () => {
    //Send a bulk request to the backend with random country codes
    setLoading(true);
    setResult("Starting bulk requests...");

    const startTime = Date.now();
    const duration = 10000; // 10 seconds
    const requestsPerSecond = 1050;
    const delayBetweenRequests = 1000 / requestsPerSecond;

    let requestCount = 0;

    const sendRequest = async () => {
      const randomCountry =
        countryCodes[Math.floor(Math.random() * countryCodes.length)];
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/statistics/${randomCountry}`,
          {
            method: "POST",
          }
        );
        requestCount++;
      } catch (error) {
        console.error("Request failed:", error);
      }
    };

    const interval = setInterval(async () => {
      if (Date.now() - startTime >= duration) {
        clearInterval(interval);
        setLoading(false);
        setResult(`Completed ${requestCount} requests in 10 seconds`);
        return;
      }

      await sendRequest();
    }, delayBetweenRequests);
  };

  const sendBulkGetAllRequests = async () => {
    //Send a bulk request to the backend to get all statistics
    setLoading(true);
    setResult("Starting bulk getAll requests...");

    const startTime = Date.now();
    const duration = 10000; // 10 seconds
    const requestsPerSecond = 1050;
    const delayBetweenRequests = 1000 / requestsPerSecond;

    let requestCount = 0;

    const sendRequest = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/statistics`);
        requestCount++;
      } catch (error) {
        console.error("Request failed:", error);
      }
    };

    const interval = setInterval(async () => {
      if (Date.now() - startTime >= duration) {
        clearInterval(interval);
        setLoading(false);
        setResult(`Completed ${requestCount} getAll requests in 10 seconds`);
        return;
      }

      await sendRequest();
    }, delayBetweenRequests);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Statistics API Test</h1>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={sendRandomCountryRequest}
              disabled={loading}
              className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              Send Random Country Request
            </button>

            <button
              onClick={getAllStatistics}
              disabled={loading}
              className="p-4 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              Get All Statistics
            </button>

            <button
              onClick={sendBulkRandomCountryRequests}
              disabled={loading}
              className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
            >
              Send Bulk Random Country Requests
            </button>

            <button
              onClick={sendBulkGetAllRequests}
              disabled={loading}
              className="p-4 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-400"
            >
              Send Bulk GetAll Requests
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl text-black font-semibold mb-2">Result:</h2>
            <pre className=" text-black whitespace-pre-wrap">{result}</pre>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
