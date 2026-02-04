import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

export function PerformanceScoreChart({ performance = [] }) {

  // Only use real data from API
  const performanceData = performance.length > 0 ? performance : [];

  return (
    <div className="h-[300px] w-full">
      {performanceData.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-500">No performance data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={performanceData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            {/* dotted grid like your UI */}
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={true}
              stroke="#e5e7eb"
            />

            {/* Months */}
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
              tickLine={false}
              axisLine={false}
            />

            {/* Score axis */}
            <YAxis
              domain={[0, 100]}
              stroke="#6b7280"
              style={{ fontSize: "11px" }}
              tickLine={false}
              axisLine={false}
            />

            {/* Purple smooth performance line */}
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{
                r: 6,
                fill: "#8b5cf6",
                strokeWidth: 0,
              }}
              activeDot={{ r: 7 }}
              name="Performance Score"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
