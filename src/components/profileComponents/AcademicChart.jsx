export default function AcademicChart({ chartData }) {
  const svgWidth = 700
  const svgHeight = 310

  const leftPadding = 70
  const rightPadding = 30
  const topPadding = 55
  const bottomPadding = 60

  const axisGap = 5

  const plotStartX = leftPadding + axisGap
  const plotEndX = svgWidth - rightPadding

  const chartWidth = plotEndX - plotStartX
  const chartHeight = svgHeight - topPadding - bottomPadding

  const maxValue = 100
  const minValue = 0

  const stepX =
    chartData.length > 1 ? chartWidth / (chartData.length - 1) : 0

  function getX(index) {
    return plotStartX + index * stepX
  }

  function getY(value) {
    return topPadding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight
  }

  const points = chartData
    .map((item, index) => `${getX(index)},${getY(item.value)}`)
    .join(' ')

  const yAxisValues = [0, 20, 40, 60, 80, 100]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6">
      <h2 className="text-[#1f220f] font-bold text-center mb-6">
        رسم بياني لدرجات السلوك
      </h2>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full min-w-[700px] h-[310px]"
        >
          {yAxisValues.map((value) => (
            <g key={value}>
              <line
                x1={leftPadding}
                y1={getY(value)}
                x2={plotEndX}
                y2={getY(value)}
                stroke="#e5e2da"
                strokeWidth="1"
              />

              <text
                x={leftPadding - 25}
                y={getY(value) + 4}
                textAnchor="end"
                fontSize="12"
                fill="#555d30"
                fontWeight="bold"
              >
                {value}
              </text>
            </g>
          ))}

          <line
            x1={leftPadding}
            y1={topPadding}
            x2={leftPadding}
            y2={svgHeight - bottomPadding}
            stroke="#bfc4b2"
            strokeWidth="2"
          />

          <line
            x1={leftPadding}
            y1={svgHeight - bottomPadding}
            x2={plotEndX}
            y2={svgHeight - bottomPadding}
            stroke="#bfc4b2"
            strokeWidth="2"
          />

          <polyline
            fill="none"
            stroke="#5f6831"
            strokeWidth="4"
            points={points}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {chartData.map((item, index) => (
            <g key={item.label}>
              <circle
                cx={getX(index)}
                cy={getY(item.value)}
                r="5"
                fill="#5f6831"
              />

              <text
                x={getX(index)}
                y={getY(item.value) - 14}
                textAnchor="middle"
                fontSize="12"
                fill="#1f220f"
                fontWeight="bold"
              >
                {item.value}
              </text>

              <text
                x={getX(index)}
                y={svgHeight - bottomPadding + 28}
                textAnchor="middle"
                fontSize="12"
                fill="#1f220f"
                fontWeight="bold"
              >
                {item.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}