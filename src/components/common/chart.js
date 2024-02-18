import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts";

export function BasicPie() {
  return (
    <PieChart
      className="text-white"
      series={[
        {
          data: [
            { id: 0, value: 10, label: "خرید", color: "blue" },
            { id: 1, value: 15, label: "B" },
            { id: 2, value: 20, label: "C" },
          ],
        },
      ]}
      width={300}
      height={150}
      label={({ data }) => (
        <text
          x={data.datum.x}
          y={data.datum.y}
          sx={{
            fill: "white",
            fontSize: 12,
            fontFamily: "Arial",
            fontWeight: "bold",
          }}
        >
          {data.datum.label}
        </text>
      )}
    />
  );
}

export function BasicLineChart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          style: {
            stroke: "white", // Change line color to white
            // You can add more styling properties as needed
          },
        },
      ]}
      width={500}
      height={200}
    />
  );
}
