
document.getElementById("searchBtn").addEventListener("click", getDefinition);

async function getDefinition() {
    try {
        const word = document.getElementById("wordInput").value.trim();
        if (!word) {
            alert("Please enter a word.");
            return;
        }

        // API Key & URL
        const API_KEY = `5a726f4d-13e5-4657-a4d1-63e3c6e1b6bc`;
        const API_URL = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${API_KEY}`;


        const response = await fetch(API_URL);
        const data = await response.json();

        console.log(data);

        // If API returns an array of suggestions instead of a definition
        if (Array.isArray(data) && typeof data[0] === "string") {
            document.getElementById("wordTitle").innerText = `No definition found.\n\n Did you mean:`;
            document.getElementById("results").innerText = `Suggestions: \n ${data.slice(0, 5).join(", ")}`;
            document.getElementById("definition").innerText = "";
            document.getElementById("container").style.display = "block";
            return;
        }

        // If valid word entry exists
        if (!data || data.length === 0) {
            document.getElementById("wordTitle").innerText = `No definition found.`;
            document.getElementById("definition").innerText = "";
            document.getElementById("container").style.display = "block";
            return;
        }


        const entry = data[0];
        
        document.getElementById("wordTitle").innerText = word;

        const functionalLabel = entry.fl || "N/A";
        document.getElementById("functionalLabel").innerText = functionalLabel;

        document.getElementById("definition").innerText = entry.shortdef ? entry.shortdef.join("; ") : "No definition found.";
        document.getElementById("synonyms").innerText = entry.meta?.syns?.[0]?.join(", ") || "None";
        document.getElementById("antonyms").innerText = entry.meta?.ants?.[0]?.join(", ") || "None";
        // document.getElementById("examples").innerText = entry.def?.[0]?.sseq?.[0]?.[0]?.[1]?.vis?.map(v => v.t).join("; ") || "None";


        // Show results and adjust navbar height for mobile
        document.getElementById("container").style.display = "block";

    } catch (error) {
        console.log("Error fetching data:", error);
        document.getElementById("definition").innerText = "Error retrieving data.";
        document.getElementById("container").style.display = "none";
    }
}
