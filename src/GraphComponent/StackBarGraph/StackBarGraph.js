import React, { useEffect, useRef, useContext } from "react";
import "./StackBarGraph.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useDeviceAgent from "../../hooks/device-agent";
import { ThemeContext } from "../../context/theme";
const StackBarGraph = (props) => {
  const { device } = useDeviceAgent();
  // const [chartWidth, setChartWidth] = useState(300);
  // const [chartHeight, setChartHeight] = useState(550);
  // const [barSize, setBarSize] = useState(15);
  const stackBarGraph = useRef();
  const { thememode, nightMode } = useContext(ThemeContext);
  useEffect(() => {
    if (device && (device.isExtraLargeDevice || device.isLargeDevice)) {
      //setChartWidth(700);setChartHeight(700);
      stackBarGraph.current.container.firstElementChild.setAttribute(
        "viewBox",
        "-45 0 700 700"
      );
    }
    if (device && device.isMediumDevice) {
      //setChartWidth(650);setChartHeight(650);
      stackBarGraph.current.container.firstElementChild.setAttribute(
        "viewBox",
        "-40 0 500 700"
      );
    }
    if (device && device.isSmallDevice) {
      //setBarSize(5);
      //setChartWidth(300);setChartHeight(550);
      stackBarGraph.current.container.firstElementChild.setAttribute(
        "viewBox",
        "0 0 250 700"
      );
    }
  }, [device]);
  return (
    <>
      <div className="stack-bar-chart-container">
        <div className={`stack-bar-chart ${thememode}`}>
          {device && (device.isExtraLargeDevice || device.isLargeDevice) && (
            <BarChart
              ref={stackBarGraph}
              width={700}
              height={600}
              data={props.latestData}
              layout="vertical"
              margin={{ top: 5, right: 0, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey={props.datakey}
                stroke={nightMode ? "#fff" : "initial"}
              />
              <Tooltip />
              <Legend />
              <Bar
                barSize={20}
                dataKey="confirmed"
                stackId="a"
                fill="#e26868"
              />
              <Bar
                barSize={20}
                dataKey="recovered"
                stackId="a"
                fill="#206111"
              />
              <Bar barSize={20} dataKey="active" stackId="a" fill="#7e78f7" />
              {/* <Bar  barSize={18} dataKey="deaths" stackId="a" fill="grey" /> */}
            </BarChart>
          )}
          {device && device.isMediumDevice && (
            <BarChart
              ref={stackBarGraph}
              width={550}
              height={600}
              data={props.latestData}
              layout="vertical"
              margin={{ top: 5, right: 0, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey={props.datakey} />
              <Tooltip />
              <Legend />
              <Bar barSize={18} dataKey="confirmed" stackId="a" fill="red" />
              <Bar
                barSize={18}
                dataKey="recovered"
                stackId="a"
                fill="#206111"
              />
              <Bar barSize={18} dataKey="active" stackId="a" fill="#806bf9" />
              {/* <Bar  barSize={18} dataKey="deaths" stackId="a" fill="grey" /> */}
            </BarChart>
          )}
          {device && device.isSmallDevice && (
            <BarChart
              ref={stackBarGraph}
              width={300}
              height={550}
              data={props.latestData}
              layout="vertical"
              margin={{ top: 5, right: 0, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey={props.datakey} />
              <CartesianGrid strokeDasharray="6 6" />
              <Tooltip />
              <Legend />
              <Bar barSize={15} dataKey="confirmed" stackId="a" fill="red" />
              <Bar
                barSize={15}
                dataKey="recovered"
                stackId="a"
                fill="#206111"
              />
              <Bar barSize={15} dataKey="active" stackId="a" fill="#806bf9" />
              {/* <Bar  barSize={barSize} dataKey="deaths" stackId="a" fill="grey" /> */}
            </BarChart>
          )}
        </div>
      </div>
    </>
  );
};
export default StackBarGraph;
