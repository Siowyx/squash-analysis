import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "bootstrap";
import AnalysisDataService from "../services/analysis";
import { UserContext } from "../contexts/userContext";
import squashfloor from "../img/squash-floor.png";

const SquashFloor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const id = new URLSearchParams(location.search).get("id");

  const getLocalStorage = () => {
    let markers = localStorage.getItem("markers");
    if (markers) {
      return JSON.parse(markers);
    } else {
      return [];
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState({});
  const [markers, setMarkers] = useState(getLocalStorage());
  const [count, setCount] = useState(markers.length);
  const [isShowStats, setIsShowStats] = useState(false);
  const [stats, setStats] = useState([0, 0, 0, 0, 0, 0]);
  const [form, setForm] = useState({
    tag: "",
    remarks: "",
  });
  const [isSubscribed, setIsSubscribed] = useState(true);

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const retrieveAnalysis = () => {
    AnalysisDataService.getAnalysis(user.id, id)
      .then((response) => {
        setAnalysis(response.data.analysis[0]);
        setIsLoading(false);
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    if (id) {
      retrieveAnalysis();
    } else {
      setIsLoading(false);
      location.state &&
        location.state.new &&
        localStorage.setItem("markers", JSON.stringify([]));
      setMarkers(getLocalStorage());
      setCount(markers.length);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (id) {
        if (!analysis) {
          // user doesnt own the analysis
          navigate("/error");
          return;
        }
        setMarkers(analysis.markers);
        setForm({ tag: analysis.tag, remarks: analysis.remarks });
      }
      setCount(markers.length);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("markers", JSON.stringify(markers));
      setCount(markers.length);
    }
  }, [markers]);

  const mark = (e) => {
    // reserve feature for paid user
    if (markers.length === 20 && !isSubscribed) {
      let modal = Modal.getOrCreateInstance(
        document.getElementById("staticBackdrop")
      );
      modal.show();
      return;
    }

    const offX = e.target.offsetParent.offsetLeft;
    const offY = e.target.offsetParent.offsetTop;
    setMarkers([...markers, [e.pageX - offX, e.pageY - offY]]);
    setCount(count + 1);
  };

  const toggleStats = () => {
    if (!isShowStats && markers.length > 0) {
      const top_left = markers.filter((marker) => {
        return marker[0] <= 167.5 && marker[1] <= 218;
      });
      const mid_left = markers.filter((marker) => {
        return marker[0] <= 167.5 && marker[1] > 218 && marker[1] <= 388;
      });
      const bot_left = markers.filter((marker) => {
        return marker[0] <= 167.5 && marker[1] > 388;
      });
      const top_right = markers.filter((marker) => {
        return marker[0] > 167.5 && marker[1] <= 218;
      });
      const mid_right = markers.filter((marker) => {
        return marker[0] > 167.5 && marker[1] > 218 && marker[1] <= 388;
      });
      const bot_right = markers.filter((marker) => {
        return marker[0] > 167.5 && marker[1] > 388;
      });

      setStats([
        Math.round((top_left.length / count) * 1000) / 10,
        Math.round((mid_left.length / count) * 1000) / 10,
        Math.round((bot_left.length / count) * 1000) / 10,
        Math.round((top_right.length / count) * 1000) / 10,
        Math.round((mid_right.length / count) * 1000) / 10,
        Math.round((bot_right.length / count) * 1000) / 10,
      ]);
    }
    setIsShowStats(!isShowStats);
  };

  const save = () => {
    var data = {
      user_id: user.id,
      tag: form.tag,
      remarks: form.remarks,
      markers: markers,
    };

    if (!id) {
      AnalysisDataService.createAnalysis(data)
        .then((response) => {
          localStorage.removeItem("markers");
          navigate("/home");
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      data.id = id;
      AnalysisDataService.updateAnalysis(data)
        .then((response) => {
          localStorage.removeItem("markers");
          navigate("/home");
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  const redirect = () => {
    // todo
  };

  return (
    <>
      <div className="squashfloor-div">
        <section className="squashfloor-container">
          <div className="info-container">
            <div className="count-container">
              <h3 style={{ display: "inline" }}>{count}</h3>{" "}
              <p style={{ display: "inline" }}>shots marked</p>
            </div>
            <div className="btn-container">
              <button
                className={"btn custom-btn btn-outline-primary"}
                style={{ width: `${isShowStats ? "45%" : ""}` }}
                onClick={toggleStats}
              >
                {isShowStats ? "resume marking" : "view stats"}
              </button>
              <button
                className="btn custom-btn btn-outline-warning"
                style={isShowStats ? { display: "none" } : {}}
                onClick={() => {
                  setMarkers(markers.slice(0, -1));
                }}
              >
                undo
              </button>
              <button
                className="btn custom-btn btn-outline-danger"
                style={isShowStats ? { display: "none" } : {}}
                data-bs-toggle="modal"
                data-bs-target="#resetModal"
              >
                reset
              </button>

              <div
                className="modal fade"
                id="resetModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body text-dark">
                      <p>
                        Are you sure you want to reset all markings? <br /> This
                        action is <strong> irreversible</strong>!
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn custom-btn btn-outline-danger"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          setMarkers([]);
                        }}
                      >
                        confirm reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* https://getbootstrap.com/docs/5.3/components/modal/#static-backdrop */}
              <button
                type="button"
                className="btn custom-btn btn-outline-success"
                style={
                  isShowStats
                    ? { position: "relative" }
                    : { display: "none", position: "relative" }
                }
                data-bs-toggle="modal"
                data-bs-target="#saveModal"
              >
                save
              </button>

              <div
                className="modal fade"
                id="saveModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body text-dark">
                      {isSubscribed ? (
                        <form>
                          <div className="mb-3">
                            <label htmlFor="tag" className="col-form-label">
                              Tag:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="tag"
                              maxLength="50"
                              name="tag"
                              value={form.tag}
                              onChange={onFormInputChange}
                              disabled={id ? true : false}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="remarks" className="col-form-label">
                              Remarks:
                            </label>
                            <textarea
                              className="form-control"
                              id="remarks"
                              maxLength="300"
                              name="remarks"
                              value={form.remarks}
                              onChange={onFormInputChange}
                            ></textarea>
                          </div>
                        </form>
                      ) : (
                        <p>Subscribes to unlock all features!</p>
                      )}
                    </div>
                    <div className="modal-footer">
                      {isSubscribed ? (
                        <button
                          type="button"
                          className={`btn custom-btn btn-outline-success ${
                            (form.tag === "" || form.remarks === "") &&
                            "disabled"
                          }`}
                          data-bs-dismiss="modal"
                          onClick={save}
                        >
                          confirm save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn custom-btn btn-outline-success"
                          data-bs-dismiss="modal"
                          onClick={redirect}
                        >
                          subscribe!
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="canvas-container">
            <img id="canvas-img" alt="squashfloor" src={squashfloor} />
            <div
              className="click-surface"
              style={{ zIndex: isShowStats ? "-1" : "1" }}
              onClick={mark}
            ></div>
            <div className="markers-container">
              {markers.length &&
                markers.map((marker, index) => {
                  return (
                    <span
                      key={index}
                      style={{
                        left: marker[0] - 3.5,
                        top: marker[1] - 13,
                      }}
                    >
                      &#x25cf;
                    </span>
                  );
                })}
              {isShowStats && (
                <div className="stats-container">
                  <div
                    className="stats-top-left"
                    style={{
                      background: `rgba(3, 138, 255, ${stats[0] / 100})`,
                    }}
                  >
                    <div className="stats-top-bg">
                      <h4 className="stats">{stats[0].toFixed(1)}%</h4>
                    </div>
                  </div>
                  <div
                    className="stats-mid-left"
                    style={{
                      background: `rgba(3, 138, 255, ${stats[1] / 100})`,
                    }}
                  >
                    <div className="stats-mid-bg">
                      <h4 className="stats">{stats[1].toFixed(1)}%</h4>
                    </div>
                  </div>
                  <div
                    className="stats-bot-left"
                    style={{
                      background: `rgba(3, 138, 255, ${stats[2] / 100})`,
                    }}
                  >
                    <div className="stats-bot-bg">
                      <h4 className="stats">{stats[2].toFixed(1)}%</h4>
                    </div>
                  </div>
                  <div
                    className="stats-top-right"
                    style={{
                      background: `rgba(3, 138, 255, ${stats[3] / 100})`,
                    }}
                  >
                    <div className="stats-top-bg">
                      <h4 className="stats">{stats[3].toFixed(1)}%</h4>
                    </div>
                  </div>
                  <div
                    className="stats-mid-right"
                    style={{
                      background: `rgba(3, 138, 255, ${stats[4] / 100})`,
                    }}
                  >
                    <div className="stats-mid-bg">
                      <h4 className="stats">{stats[4].toFixed(1)}%</h4>
                    </div>
                  </div>
                  <div
                    className="stats-bot-right"
                    style={{
                      background: `rgba(3, 138, 255, ${stats[5] / 100})`,
                    }}
                  >
                    <div className="stats-bot-bg">
                      <h4 className="stats">{stats[5].toFixed(1)}%</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SquashFloor;
