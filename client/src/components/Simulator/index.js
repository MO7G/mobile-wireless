import React, { useState, useEffect, useRef } from 'react';
import database from '../../config/firestore'; // Import your Firebase database configuration
import { ref, onValue, update } from 'firebase/database'; // Import Realtime Database methods
import ParkingGrid from './ParkingGrid';
import SimulatorHeader from './SimulatorHeader';
import './index.css';

const Simulator = ({ isAuthenticated, setIsAuthenticated }) => {
  const [parkingData, setParkingData] = useState(null);
  const prevParkingDataRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      const dbRef = ref(database); // Reference to your database root

      // Listen for changes to the data
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          // If data exists, set it to state after converting to array
          const data = snapshot.val();
          const updatedParkingData = Object.values(data.parking_spaces);
          
          // Set the parking data state
          setParkingData(updatedParkingData);
        } else {
          console.log("No data available");
        }
      });
    };

    fetchData(); // Fetch data when component mounts

    // Cleanup function
    return () => {
      // Unsubscribe from realtime updates when component unmounts
      // This is important to prevent memory leaks
    };
  }, []);

  return (
    <div className="Simulator-page">
      <SimulatorHeader isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      {parkingData && <ParkingGrid parkingData={parkingData} />}
    </div>
  );
};

export default Simulator;
