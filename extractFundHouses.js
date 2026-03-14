const fs = require("fs");
const axios = require("axios");

async function extractFundHouses() {
    try {
        const response = await axios.get("https://api.mfapi.in/mf");
        const data = response.data;

        const fundHousesSet = new Set();

        data.forEach(scheme => {
            let name = scheme.schemeName;

            if (name.includes("Fund")) {
                let fundHouse = name.split("Fund")[0].trim();
                fundHousesSet.add(fundHouse);
            }
        });

        const uniqueFundHouses = Array.from(fundHousesSet).sort();

        fs.writeFileSync("fundhouses.txt", uniqueFundHouses.join("\n"));

        console.log("Total Unique Fund Houses:", uniqueFundHouses.length);
        console.log("Saved to fundhouses.txt");

    } catch (error) {
        console.error("Error:", error.message);
    }
}

extractFundHouses();