import fetch from "node-fetch"
import { writeFileSync } from 'fs';

const fetchJobSearchAPI = async (position = "Software Developer") => {
    try {
        const encodedPosition = encodeURIComponent(position);
        const url = `https://job-search-api1.p.rapidapi.com/v1/job-description-search?q=${encodedPosition}&page=1&country=us&city=Seattle`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3d7ce1d4fbmsh9dca1a5f72dab04p1be7eajsn596878a4599b',
                'X-RapidAPI-Host': 'job-search-api1.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};


const saveDataToFile = async (data, filename) => {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        writeFileSync(filename, jsonData);
        console.log(`Data saved to ${filename}`);
    } catch (error) {
        console.error('Error writing file:', error);
    }
};

const fetchAndSaveJobs = async () => {
    const data = await fetchJobSearchAPI();
    if (data) {
        await saveDataToFile(data, 'jobsData.json');
    }
};

fetchAndSaveJobs();
