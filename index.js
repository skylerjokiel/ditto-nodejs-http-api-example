const axios = require('axios');
const readline = require('readline');

const APP_ID = "<APP-ID>";
const AUTHORIZATION_TOKEN = "<AUTHORIZATION-TOKEN>";

// Set up readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to make the API call
async function sendRequest() {
  const requestData = {
    statement: "SELECT * FROM cars"
  };

  try {
    const response = await axios.post(`https://${APP_ID}.cloud.ditto.live/api/v4/store/execute`, requestData, {
      headers: {
        'Authorization': AUTHORIZATION_TOKEN,
        'Content-Type': 'application/json'
      }
    });
    console.log("Response data:", response.data);
  } catch (error) {
    console.error("Error making request:", error.message);
  }
}

// Prompt user for input and handle commands
function promptUser() {
  rl.question("Enter 'send' to send a request or 'quit' to exit: ", (input) => {
    if (input.trim().toLowerCase() === 'send') {
      sendRequest().then(() => promptUser()); // Send request and prompt again
    } else if (input.trim().toLowerCase() === 'quit') {
      console.log("Exiting the application.");
      rl.close(); // Close the readline interface
    } else {
      console.log("Unknown command. Please enter 'send' or 'quit'.");
      promptUser(); // Prompt again if input is invalid
    }
  });
}

// Start the prompt loop
console.log("Welcome to the Ditto Cloud/Big Peer console app.");
promptUser();
