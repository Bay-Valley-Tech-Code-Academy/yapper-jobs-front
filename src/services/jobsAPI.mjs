//fetches max of 10 jobs per request.
//add index of 1 to get the next 10 jobs
//%20 for each space in query. ex. web%20developer

import fetch from "node-fetch"
import { writeFileSync } from 'fs';

const fetchJobAPI = async (position = "developer") => {
    try {
        const url = `https://jobs-api14.p.rapidapi.com/list?query=${position}&location=United%20States&language=en_GB&employmentTypes=fulltime%3Bparttime%3Bintern%3Bcontractor&index=5`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3d7ce1d4fbmsh9dca1a5f72dab04p1be7eajsn596878a4599b',
                'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
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
    const data = await fetchJobAPI();
    if (data) {
        await saveDataToFile(data, 'jobsData.json');
    }
};

fetchAndSaveJobs();