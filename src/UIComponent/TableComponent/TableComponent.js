import React, { useEffect, useState, useContext } from "react";
import { FetchDataContext } from "../../context/fetch-data";
import "./TableComponent.scss";
import {
  faArrowUp,
  faArrowDown,
  faChevronCircleRight,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDeviceAgent from "../../hooks/device-agent";
import { ThemeContext } from "../../context/theme";
const TableComponent = React.memo((props) => {
  //const {type}  = props;
  const fetchCovidData = useContext(FetchDataContext);
  const [stateData, setStateData] = useState([]);
  const [stateDistrict, setStateDistrict] = useState([]);
  const [sortTable, setSortTable] = useState({ asc: true, label: "" });
  const [districtSortTable, setDistrictSortTable] = useState({
    asc: true,
    label: "",
    code: null,
    state: null,
  });
  const [mobileTable, setMobileTable] = useState(false);
  const { thememode } = useContext(ThemeContext);
  const heading = [
    {
      label: "Confirmed",
    },
    {
      label: "Recovered",
    },
    {
      label: "Active",
    },
    {
      label: "Deaths",
    },
  ];
  const districtHeading = [
    {
      label: "Confirmed",
    },
    {
      label: "Recovered",
    },
    {
      label: "Active",
    },
    {
      label: "Deceased",
    },
  ];
  const { device } = useDeviceAgent();
  useEffect(() => {
    if (device && (device.isSmallDevice || device.isMediumDevice)) {
      setMobileTable(true);
    } else {
      setMobileTable(false);
    }
  }, [device]);
  useEffect(() => {
    if (
      fetchCovidData &&
      fetchCovidData.statewise.length > 0 &&
      fetchCovidData.stateDistrict.length
    ) {
      setStateData(fetchCovidData.statewise.slice(1));
      setStateDistrict(fetchCovidData.stateDistrict);
    }
  }, [fetchCovidData]);

  useEffect(() => {
    if (sortTable && sortTable.label) {
      const tempArr = [...stateData];
      tempArr.sort(sortable);
      setStateData(tempArr);
    }
  }, [sortTable]);
  useEffect(() => {
    if (districtSortTable.label) {
      const tempArr = [...stateData];
      tempArr[districtSortTable.code].districtList.districtData.sort(
        districtsortable
      );
      setStateData(tempArr);
    }
  }, [districtSortTable]);
  const districtsortable = (a, b) => {
    return (
      (parseInt(a[districtSortTable.label]) -
        parseInt(b[districtSortTable.label])) *
      (districtSortTable.asc ? 1 : -1)
    );
  };
  const sortable = (a, b) => {
    return (
      (parseInt(a[sortTable.label]) - parseInt(b[sortTable.label])) *
      (sortTable.asc ? 1 : -1)
    );
  };
  const sortTableHandler = (e, heading) => {
    if (sortTable.label.toLowerCase() === heading.label.toLowerCase()) {
      setSortTable({ ...sortTable, asc: !sortTable.asc });
    } else {
      setSortTable({ asc: true, label: heading.label.toLowerCase() });
    }
  };
  const districtSortTableHandler = (e, heading, code) => {
    if (districtSortTable.label.toLowerCase() === heading.label.toLowerCase()) {
      setDistrictSortTable({
        ...districtSortTable,
        asc: !districtSortTable.asc,
        code: code,
      });
    } else {
      setDistrictSortTable({
        asc: true,
        label: heading.label.toLowerCase(),
        code: code,
      });
    }
  };
  const showDistrict = (e, code, state) => {
    state.showExpand = !state.showExpand;
    const tempArr = [...stateData];
    const districtList = stateDistrict.filter(
      (stDst) => stDst.statecode === state.statecode
    );
    state.showExpand
      ? (tempArr[code].districtList = districtList[0])
      : delete tempArr[code].districtList;

    setStateData(tempArr);
  };
  return (
    <>
      <div className={`table ${thememode}`}>
        <div className={`table__body ${thememode}`}>
          <div className={`table__row-heading ${thememode}`}>
            {!mobileTable && (
              <>
                <div className={`table__heading ${thememode}`}>
                  <div className="table__heading-content">State/UT</div>
                </div>
                {heading.map((head, key) => (
                  <div
                    key={key}
                    className={`table__heading ${thememode}`}
                    onClick={(e) => sortTableHandler(e, head)}
                  >
                    <div className="table__heading-content">{head.label}</div>
                    {head.label.toLowerCase() ===
                      sortTable.label.toLowerCase() && (
                      <div className="table__icon-container">
                        {sortTable.asc ? (
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            size="sm"
                            className="table__icon"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faArrowDown}
                            size="sm"
                            className="table__icon"
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
            {mobileTable && (
              <>
                <div
                  className={`table__heading table__heading-content-state ${thememode}`}
                >
                  <div className="table__heading-content-s">State/UT</div>
                </div>
                <div className={`table__heading ${thememode}`}>
                  <div className="table__heading-content">Confirmed</div>
                </div>
                <div className={`table__heading ${thememode}`}>
                  <div className="table__heading-content">Recovered</div>
                </div>
                <div className={`table__heading ${thememode}`}>
                  <div className="table__heading-content">Deaths</div>
                </div>
              </>
            )}
          </div>
          {stateData &&
            !mobileTable &&
            stateData.map((state, code) => (
              <React.Fragment key={code}>
                <div
                  className={`table__row ${thememode}`}
                  key={code}
                  onClick={(e) => showDistrict(e, code, state)}
                >
                  <div className="table__column">
                    <div className="table__body-content-delta">
                      {state.showExpand ? (
                        <FontAwesomeIcon
                          icon={faChevronCircleDown}
                          size="lg"
                          color="#b8b4e7"
                          className="table__body__icon"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faChevronCircleRight}
                          size="lg"
                          color="#b8b4e7"
                          className="table__body__icon"
                        />
                      )}
                    </div>
                    <div className="table__body-content">{state.state}</div>
                  </div>
                  <div className="table__column">
                    <div className="table__data__stats table__data__confirmed">
                      <div className="table__body-content">
                        {state.confirmed}
                      </div>
                      <div className="table__body-content-delta">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          size="sm"
                          className="table__body__icon"
                        />
                        {state.deltaconfirmed}
                      </div>
                    </div>
                  </div>
                  <div className="table__column">
                    <div className="table__data__stats table__data__recovered">
                      <div className="table__body-content">
                        {state.recovered}
                      </div>
                      <div className="table__body-content-delta">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          size="sm"
                          className="table__body__icon"
                        />
                        {state.deltarecovered}
                      </div>
                    </div>
                  </div>
                  <div className="table__column">
                    <div className="table__data__stats table__data__active">
                      <div className="table__body-content">{state.active}</div>
                    </div>
                  </div>
                  <div className="table__column">
                    <div className="table__data__stats table__data__deceased">
                      <div className="table__body-content">{state.deaths}</div>
                      <div className="table__body-content-delta">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          size="sm"
                          className="table__body__icon"
                        />
                        {state.deltadeaths}
                      </div>
                    </div>
                  </div>
                  {/* <div className="table__column check">                        
                        <div className="table__body-content" onClick={e=>showDistrict(e,code,state)}>
                          <button className="btn-inline2"> Details<span>&rarr;</span></button>
                        </div>
                      </div>*/}
                </div>
                {state.showExpand && (
                  <div
                    className={`table__row-heading table__row-heading-district ${thememode}`}
                  >
                    <div className={`table__heading ${thememode}`}>
                      <div className="table__heading-content">District</div>
                    </div>
                    {districtHeading.map((head, key) => (
                      <div
                        key={key}
                        className={`table__heading ${thememode}`}
                        onClick={(e) => districtSortTableHandler(e, head, code)}
                      >
                        <div className="table__heading-content">
                          {head.label}
                        </div>
                        {head.label.toLowerCase() ===
                          districtSortTable.label.toLowerCase() && (
                          <div className="table__icon-container">
                            {districtSortTable.asc ? (
                              <FontAwesomeIcon
                                icon={faArrowUp}
                                size="sm"
                                className="table__icon"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faArrowDown}
                                size="sm"
                                className="table__icon"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {state.districtList &&
                  state.districtList.districtData.map((district, index) => (
                    <div
                      className={`table__row table__row-district ${thememode}`}
                      key={index}
                    >
                      <div className="table__column">
                        <div className="table__body-content">
                          {district.district}
                        </div>
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats table__data__confirmed">
                          <div className="table__body-content">
                            {district.confirmed}
                          </div>
                        </div>
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats table__data__recovered">
                          <div className="table__body-content">
                            {district.recovered}
                          </div>
                        </div>
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats table__data__active">
                          <div className="table__body-content">
                            {district.active}
                          </div>
                        </div>
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats table__data__deceased">
                          <div className="table__body-content">
                            {district.deceased}
                          </div>
                        </div>
                        {/* <div className="table__column check">                        
                            <div className="table__body-content">
                              <button > Show All<span>&rarr;</span></button>
                            </div>
                          </div>                       */}
                      </div>
                    </div>
                  ))}
              </React.Fragment>
            ))}
          {stateData &&
            mobileTable &&
            stateData.map((state, code) => (
              <React.Fragment key={code}>
                <div
                  className={`table__row ${thememode}`}
                  key={code}
                  onClick={(e) => showDistrict(e, code, state)}
                >
                  <div className="table__column">
                    <div className="table__body-content-delta">
                      {state.showExpand ? (
                        <FontAwesomeIcon
                          icon={faChevronCircleDown}
                          size="lg"
                          color="#b8b4e7"
                          className="table__body__icon"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faChevronCircleRight}
                          size="lg"
                          color="#b8b4e7"
                          className="table__body__icon"
                        />
                      )}
                    </div>
                    <div className="table__body-content">{state.state}</div>
                  </div>
                  <div className="table__column">
                    <div className="table__data__stats ">
                      <div className="table__body-content table__data__confirmed ">
                        <span>{state.confirmed}</span>
                        <span className="table__data-mobile-label">
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            size="sm"
                            className="table__body__icon"
                          />
                          {state.deltaconfirmed}
                        </span>
                      </div>
                      {/* <span className={`lineseperator ${thememode}`}></span> */}
                      <div className="table__body-content table__data__recovered">
                        <span>{state.recovered}</span>
                        <span className="table__data-mobile-label">
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            size="sm"
                            className="table__body__icon"
                          />
                          {state.deltarecovered}
                        </span>
                      </div>
                      {/* <span className={`lineseperator ${thememode}`}></span> */}
                      <div className="table__body-content table__data__deceased">
                        <span>{state.deaths}</span>
                        <span className="table__data-mobile-label">
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            size="sm"
                            className="table__body__icon"
                          />
                          {state.deltadeaths}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {state.showExpand && (
                  <div
                    className={`table__row-heading table__row-heading-district ${thememode}`}
                  >
                    <div
                      className={`table__heading table__heading-content-district ${thememode}`}
                    >
                      <div className="table__heading-content-s">District</div>
                    </div>
                    <div className={`table__heading ${thememode}`}>
                      <div className="table__heading-content">Confirmed</div>
                    </div>
                    <div className={`table__heading ${thememode}`}>
                      <div className="table__heading-content">Recovered</div>
                    </div>
                    <div className={`table__heading ${thememode}`}>
                      <div className="table__heading-content">Deaths</div>
                    </div>
                  </div>
                )}

                {state.districtList &&
                  state.districtList.districtData.map((district, index) => (
                    <div
                      className={`table__row table__row-district ${thememode}`}
                      key={index}
                    >
                      <div className="table__column">
                        <div className="table__body-content">
                          {district.district}
                        </div>
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats">
                          <div className="table__body-content table__data__confirmed ">
                            <span>{district.confirmed}</span>
                            {Math.abs(parseInt(district.delta.confirmed)) >
                              0 && (
                              <span className="table__data-mobile-label">
                                <FontAwesomeIcon
                                  icon={faArrowUp}
                                  size="sm"
                                  className="table__body__icon"
                                />
                                {Math.abs(parseInt(district.delta.confirmed))}
                              </span>
                            )}
                          </div>
                          {/* <span className={`lineseperator ${thememode}`}></span> */}
                          <div className="table__body-content table__data__recovered">
                            <span>{district.recovered}</span>
                            {Math.abs(parseInt(district.delta.recovered)) >
                              0 && (
                              <span className="table__data-mobile-label">
                                <FontAwesomeIcon
                                  icon={faArrowUp}
                                  size="sm"
                                  className="table__body__icon"
                                />
                                {district.delta.recovered}
                              </span>
                            )}
                          </div>
                          {/* <span className={`lineseperator ${thememode}`}></span> */}
                          <div className="table__body-content table__data__deceased">
                            <span>{district.deceased}</span>
                            {Math.abs(parseInt(district.delta.deceased)) >
                              0 && (
                              <span className="table__data-mobile-label">
                                <FontAwesomeIcon
                                  icon={faArrowUp}
                                  size="sm"
                                  className="table__body__icon"
                                />
                                {district.delta.deceased}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
});

export default TableComponent;
