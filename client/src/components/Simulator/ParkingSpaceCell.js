import React from 'react';
import './ParkingSpaceCell.css';
import carImage from '../../static/car.png';
import Swal from 'sweetalert2';

const ParkingSpaceCell = ({ spaceId, spaceData, gridNumber }) => {
  // Generate class names based on space status and ID
  const classNames = `parking-space ${spaceData?.status ? 'occupied' : 'available'} space-${spaceId}`;

  const constructInfo = (data) => {
    // Check if the parking space is empty
    if (!data.status) {
      return "This parking space is empty.";
    } else {
      // Construct the information string
      let infoString = `This parking space was entered at ${data.entry_time} with vehicle plate ${data.vehicle_plate}.`;
      if (data.exit_time) {
        infoString += ` It was exited at ${data.exit_time}.`;
      }
      return infoString;
    }
  };
  

  const handleInfo = (data) => {
    const text = constructInfo(data)
    Swal.fire({
      icon: 'info',
      title: 'Parking Info',
      text: text,
      showCancelButton: false, // Hide the cancel button
      showCloseButton: true, // Hide the close button (x)
      allowOutsideClick: true, // Prevent the user from closing the dialog by clicking outside of it
      showConfirmButton: false,
    }).then(result => {
      console.log(result);
    });
  };

  return (
    <div className={classNames} onClick={() => handleInfo(spaceData)}>
      {/* Conditionally render vehicle plate if available */}
      {spaceData?.vehicle_plate && (
        <span className="vehicle-plate">{spaceData.vehicle_plate}</span>
      )}

      {/* Conditionally render the image if space is occupied */}
      {spaceData?.status && <img src={carImage} alt="Car" />}

      {/* Display the sum of x and y if it's not null */}
      {gridNumber !== null && !spaceData?.status && (
        <span className="space-number">{gridNumber}</span>
      )}
    </div>
  );
};

export default ParkingSpaceCell;
