import React, { useState, useEffect } from 'react';
import './ParkingGrid.css';
import ParkingSpaceCell from './ParkingSpaceCell';

const ParkingGrid = ({ parkingData }) => {
  const [maxRow, setMaxRow] = useState(0);
  const [maxCol, setMaxCol] = useState(0);

  useEffect(() => {
    // Calculate the maximum row and column values
    let maxRowValue = 0;
    let maxColValue = 0;
    parkingData.forEach(spaceData => {
      if (spaceData.position.x > maxRowValue) maxRowValue = spaceData.position.x;
      if (spaceData.position.y > maxColValue) maxColValue = spaceData.position.y;
    });
    setMaxRow(maxRowValue);
    setMaxCol(maxColValue);
  }, [parkingData]);

  if (maxRow === 0 || maxCol === 0) {
    return null;
  }

  return (
    <div className="parking-grid">
      {Array(maxRow).fill(null).map((_, rowIndex) => (
        <div className={`grid-row ${rowIndex + 1}`} key={rowIndex}>
          {Array(maxCol).fill(null).map((_, colIndex) => {
            const spaceData = parkingData.find(space => space.position.x === rowIndex + 1 && space.position.y === colIndex + 1);
            const spaceId =  `space_${rowIndex + 1}-${colIndex + 1}`;
            const gridNumber = rowIndex * maxCol + colIndex + 1;
            return (
              <ParkingSpaceCell key={spaceId} spaceId={spaceId} spaceData={spaceData} gridNumber={gridNumber} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ParkingGrid;
