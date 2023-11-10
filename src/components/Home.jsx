/* eslint-disable no-useless-constructor */
import {
  CircularGauge,
  Label,
  Range,
  RangeContainer,
  Scale,
} from "devextreme-react/circular-gauge";
import React, { Component, useEffect, useState } from "react";
import { ReactInternetSpeedMeter } from "react-internet-meter";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "./home.scss";

/* link for the ip datas api 
https://app.ipgeolocation.io/
*/

function IpDatas() {
  const [intDatas, SetIntDatas] = useState({
    org: "",
    country: "",
    city: "",
    ip: "",
    country_flag: "",
    currency: "",
    calling_code: "",
    continent_name: "",
  });
  const [collapseState, setCollapseState] = useState("");

  useEffect(() => {
    fetchIp();
  }, []);

  async function fetchIp() {
    try {
      const response = await axios.get(
        "https://api.ipgeolocation.io/ipgeo?apiKey=9bef10d9cf88449f8ef4d8b2c4447407"
      );
      var resPattern = response.data;

      SetIntDatas({
        ip: resPattern.ip,
        org: resPattern.organization,
        country: resPattern.country_name,
        city: resPattern.city,
        country_flag: resPattern.country_flag,
        currency: resPattern.currency,
        calling_code: resPattern.calling_code,
        continent_name: resPattern.continent_name,
      });
    } catch {
      console.log("fetch err!");
    }
  }

  return (
    <>
      {intDatas.ip !== "" && (
        <div className="row mt-2">
          <div className="d-flex flex-column align-items-center">
            <p>
              <a
                className="btn "
                style={{
                  background: "transparent",
                  color: "#F39200",
                  border: "1px solid #F39200",
                }}
                onClick={() =>
                  setCollapseState(collapseState === "show" ? "" : "show")
                }
                data-bs-toggle="collapse"
                href="#contentId"
                aria-expanded="false"
                aria-controls="contentId"
              >
                {collapseState === "show" ? "Show less" : "Show more"}
              </a>
            </p>
            <div className="col-12 mt-3">
              <div className={`collapse ${collapseState}`} id="contentId">
                <div className="row">
                  <div className="col-12 col-sm-6 mb-4">
                    <fieldset
                      className="position-relative"
                      style={{
                        padding: "30px",
                        border: "3px solid #F39200",
                        background: "rgba(243, 146, 0, 0.1)",
                      }}
                    >
                      <legend
                        style={{
                          position: "absolute",
                          top: -20,
                          left: 10,
                          background: "white",
                          width: 130,
                          paddingLeft: 10,
                          fontSize: 20,
                        }}
                      >
                        Organisation
                      </legend>

                      {intDatas.org}
                    </fieldset>
                  </div>

                  <div className="col-12 col-sm-6 mb-4">
                    <fieldset
                      className="position-relative"
                      style={{
                        padding: "30px",
                        border: "3px solid #F39200",
                        background: "rgba(243, 146, 0, 0.1)",
                      }}
                    >
                      <legend
                        style={{
                          position: "absolute",
                          top: -20,
                          left: 10,
                          background: "white",
                          width: 53,
                          paddingLeft: 10,
                          fontSize: 20,
                        }}
                      >
                        City
                      </legend>

                      {intDatas.city}
                    </fieldset>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-6 mb-4">
                    <fieldset
                      className="position-relative"
                      style={{
                        padding: "30px",
                        border: "3px solid #F39200",
                        background: "rgba(243, 146, 0, 0.1)",
                      }}
                    >
                      <legend
                        style={{
                          position: "absolute",
                          top: -20,
                          left: 10,
                          background: "white",
                          width: 90,
                          paddingLeft: 10,
                          fontSize: 20,
                        }}
                      >
                        Country
                      </legend>
                      <img
                        src={intDatas.country_flag}
                        width="40"
                        alt="country_flag"
                      />{" "}
                      {intDatas.country} {intDatas.calling_code}
                    </fieldset>
                  </div>

                  <div className="col-12 col-sm-6 mb-4">
                    <fieldset
                      className="position-relative"
                      style={{
                        padding: "30px",
                        border: "3px solid #F39200",
                        background: "rgba(243, 146, 0, 0.1)",
                      }}
                    >
                      <legend
                        style={{
                          position: "absolute",
                          top: -20,
                          left: 10,
                          background: "white",
                          width: 36,
                          paddingLeft: 10,
                          fontSize: 20,
                        }}
                      >
                        Ip
                      </legend>

                      {intDatas.ip}
                    </fieldset>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-6 mb-4">
                    <fieldset
                      className="position-relative"
                      style={{
                        padding: "30px",
                        border: "3px solid #F39200",
                        background: "rgba(243, 146, 0, 0.1)",
                      }}
                    >
                      <legend
                        style={{
                          position: "absolute",
                          top: -20,
                          left: 10,
                          background: "white",
                          width: 108,
                          paddingLeft: 10,
                          fontSize: 20,
                        }}
                      >
                        Continent
                      </legend>

                      {intDatas.continent_name}
                    </fieldset>
                  </div>

                  <div className="col-12 col-sm-6 mb-4">
                    <fieldset
                      className="position-relative"
                      style={{
                        padding: "30px",
                        border: "3px solid #F39200",
                        background: "rgba(243, 146, 0, 0.1)",
                      }}
                    >
                      <legend
                        style={{
                          position: "absolute",
                          top: -20,
                          left: 10,
                          background: "white",
                          width: 96,
                          paddingLeft: 10,
                          fontSize: 20,
                        }}
                      >
                        Currency
                      </legend>
                      {intDatas.currency.symbol} ({intDatas.currency.name})
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speedMbps: [0],
      myPic:
        "https://dabarayao.com/wp-content/uploads/2023/02/IMG_20220306_154229_307.jpg",
    };

    this.reloadChecker = this.reloadChecker.bind(this);
  }

  reloadChecker = () => {
    this.setState({ speedMbps: [0] });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-column align-items-center">
                <div className="fw-bold" style={{ fontSize: "4.5vh" }}>
                  Your Internet speed is
                  {this.state.speedMbps.length < 5 && "..."}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-column align-items-center">
                <CircularGauge
                  id="gauge"
                  value={Math.max(...this.state.speedMbps)}
                >
                  <Scale startValue={0} endValue={100} tickInterval={10}>
                    <Label useRangeColors={true} />
                  </Scale>
                  <RangeContainer>
                    <Range startValue={0} endValue={20} color="#FF3232" />
                    <Range startValue={20} endValue={70} color="#F39200" />
                    <Range startValue={70} endValue={100} color="#3390F3" />
                  </RangeContainer>
                  {/* <Title text="Temperature of the Liquid in the Boiler">
                                    <Font size={28} />
                                    </Title>
                                    <Export enabled={true} /> */}
                </CircularGauge>{" "}
                <br />
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "3.5vh",
                    opacity: this.state.speedMbps.length < 6 ? "0.5" : "1",
                  }}
                >
                  {Math.max(...this.state.speedMbps)} Mbps &nbsp;
                  {this.state.speedMbps.length < 6 ? (
                    <div
                      className="spinner-grow"
                      style={{ background: "#F39200" }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={this.reloadChecker}
                      style={{
                        background: "transparent",
                        border: "2px solid #3390F3",
                        borderRadius: 50,
                        height: 44,
                      }}
                    >
                      <i className="fas fa-redo-alt"></i>
                    </button>
                  )}
                </div>
                {this.state.speedMbps.length < 6 && (
                  <ReactInternetSpeedMeter
                    txtSubHeading={` Mbps`}
                    outputType="alert"
                    customClassName="d-none"
                    txtMainHeading={`${Math.max(...this.state.speedMbps)}`}
                    pingInterval={1000} // milliseconds
                    clearInterval={true}
                    thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
                    threshold={100}
                    imageUrl={this.state.myPic}
                    downloadSize="1100000" //bytes
                    callbackFunctionOnNetworkDown={(speed) =>
                      console.log(`Internet speed is down ${speed}`)
                    }
                    callbackFunctionOnNetworkTest={(speed) => {
                      this.setState({
                        speedMbps: [...this.state.speedMbps, speed],
                      });
                      if (this.state.speedMbps.length > 5) {
                        for (var i = 1; i < 9999999; i++)
                          window.clearInterval(i);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <IpDatas />

          <div className="context container d-flex justify-content-center py-2"></div>
        </div>
      </div>
    );
  }
}

export default Home;
