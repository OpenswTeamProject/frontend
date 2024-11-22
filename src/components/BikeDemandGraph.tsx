import React from "react";
import { Line } from "react-chartjs-2";
import { mockBikeData } from "../api/mockBikeData";
import "../chartConfig";

const BikeDemandGraph: React.FC = () => {
  return (
    <div className="w-full">
      <Line
        data={mockBikeData}
        options={{
          plugins: {
            legend: { display: true },
          },
        }}
      />
    </div>
  );
};

export default BikeDemandGraph;
