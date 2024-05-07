const express = require("express");
const { database } = require("./config.js");
const { ref, onValue, update, set } = require("firebase/database");
const app = express();
const PORT = process.env.PORT || 3000;
let cachedParkingArray = null;

app.get("/", (req, res) => {
    if (cachedParkingArray !== null) {
        console.log("from the api ", cachedParkingArray[0])
    }
});
function generateLicensePlate() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let plateNumber = "";

    // Generate three random letters
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        plateNumber += letters[randomIndex];
    }

    // Generate three random numbers
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        plateNumber += numbers[randomIndex];
    }

    return plateNumber;
}
function compareWithCachedParking(newData) {
    if (cachedParkingArray !== null) {
        let updated = false;
        for (let i = 0; i < cachedParkingArray.length; i++) {
            if (cachedParkingArray[i].status !== newData[i].status) {
                if (cachedParkingArray[i].status === false) {
                    console.log("Parking space will be taken now");
                    newData[i].entry_time = new Date();
                    newData[i].vehicle_plate = generateLicensePlate();
                    updated = true;
                } else {
                    console.log("Car is leaving the parking right now");
                    // Perform calculations or other actions
                    updated = true;
                }
            }
        }
        if (updated) {
            // Update cachedParkingArray
            cachedParkingArray = [...newData];
            console.log("this isthe cahced" , cachedParkingArray)
            console.log("this ist he new data", newData)
            return true;
        } else {
            console.log("No update needed");
            return false;
        }
    } else {
        console.log("cachedParkingArray is null");
        return false;
    }
}

function listenForDataChanges() {
    const dbRef = ref(database); // Reference to your database root

    // Listen for changes to the data
    onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();

            // Update cachedParking only if it's null (first time)
            if (cachedParkingArray === null) {
                cachedParkingArray = Object.values(data.parking_spaces);
                console.log("Cached parking initialized.");
            } else {
                // Compare with cached version and do something
                const newData = Object.values(data.parking_spaces);
                const updated = compareWithCachedParking(newData);
                if (updated) {
                    // Rest of your code to update the database
                    const updatedData = cachedParkingArray.reduce((acc, cur, idx) => {
                        acc[`space_${idx + 1}`] = cur;
                        return acc;
                    }, {});
    
                    console.log(updatedData);
    
                    // Set the value of the parking_spaces property back to its original structure
                    data.parking_spaces = updatedData;
    
                    // Reference to the root of your Firebase Realtime Database
                    const dbRootRef = ref(database);
                    
                    // Set the value of the root of the database to the updated data
                    set(dbRootRef, data)
                        .then(() => {
                            console.log("Updated data stored at the root of the database.");
                        })
                        .catch((error) => {
                            console.error("Error storing updated data:", error);
                        });
                } else {
                    console.log("No update needed");
                }
            }
        } else {
            console.log("No data available");
        }
    });
}





// Call the function to start listening for data changes
listenForDataChanges();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
