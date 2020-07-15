import React, { useEffect, useState, useContext } from "react";
import "./BarGraph.scss";
import { XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

import useDeviceAgent from "../../hooks/device-agent";
import { ThemeContext } from "../../context/theme";
const BarGraph = (props) => {
  const { device } = useDeviceAgent();
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(400);
  const { filterCaseType } = props;
  const { thememode } = useContext(ThemeContext);
  useEffect(() => {
    if (device && device.isExtraLargeDevice) {
      setChartWidth(600);
      setChartHeight(600);
    }
    if (device && device.isLargeDevice) {
      setChartWidth(600);
      setChartHeight(400);
    }
    if (device && device.isMediumDevice) {
      setChartWidth(600);
      setChartHeight(400);
    }
    if (device && device.isSmallDevice) {
      setChartWidth(300);
      setChartHeight(300);
    }
  }, [device]);
  const caseType = () => {
    switch (filterCaseType) {
      case "totalconfirmed":
      case "Confirmed":
        return (
          <Bar
            barSize={15}
            dataKey={props.dataKey.totalconfirmed}
            fill="#c83b4c"
          />
        );
      case "totalrecovered":
      case "Recovered":
        return <Bar dataKey={props.dataKey.totalrecovered} fill="#206111" />;
      case "totaldeceased":
      case "Deceased":
        return <Bar dataKey={props.dataKey.totaldeceased} fill="#525050" />;
      case "totalactive":
      case "Active":
        return <Bar dataKey={props.dataKey.totalactive} fill="#806bf9" />;
      default:
        return <></>;
    }
  };
  return (
    <>
      <div className="bar-chart-container">
        <div className={`bar-chart ${thememode}`}>
          <BarChart
            width={chartWidth}
            height={chartHeight}
            data={props.latestData}
          >
            <XAxis dataKey={props.xDataKey} />
            <YAxis />
            <Tooltip />

            {props.filterCaseType === "all" && (
              <Bar barSize={3} dataKey="totalconfirmed" fill="#c83b4c" />
            )}
            {props.filterCaseType === "all" && (
              <Bar barSize={4} dataKey="totalrecovered" fill="#206111" />
            )}
            {/* {props.filterCaseType === "all" && (
              <Bar barSize={3} dataKey="totalactive" fill="#806bf9" />
            )} */}
            {props.filterCaseType === "all" && (
              <Bar barSize={2} dataKey="totaldeceased" fill="#525050" />
            )}
            {props.filterCaseType !== "all" && caseType()}
          </BarChart>
        </div>
      </div>
    </>
  );
};
export default BarGraph;
