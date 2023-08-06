import React, { useState, useEffect } from "react";
import squashfloor from "../img/squash-floor.png";

const SquashFloor = () => {
  const [markers, setMarkers] = useState(getLocalStorage());
  const [count, setCount] = useState(markers.length);
  const [isShowStats, setIsShowStats] = useState(false);
  const [stats, setStats] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    localStorage.setItem("markers", JSON.stringify(markers));
    setCount(markers.length);
  }, [markers]);

  const mark = (e) => {
    const offX = e.target.offsetParent.offsetLeft;
    const offY = e.target.offsetParent.offsetTop;
    setMarkers([...markers, [e.pageX - offX, e.pageY - offY]]);
    setCount(count + 1);
  };

  const toggleStats = () => {
    if (!isShowStats && markers.length > 0) {
      const top_left = markers.filter((marker) => {
        return marker[0] <= 167.5 && marker[1] <= 221;
      });
      const mid_left = markers.filter((marker) => {
        return marker[0] <= 167.5 && marker[1] > 221 && marker[1] <= 393;
      });
      const bot_left = markers.filter((marker) => {
        return marker[0] <= 167.5 && marker[1] > 393;
      });
      const top_right = markers.filter((marker) => {
        return marker[0] > 167.5 && marker[1] <= 221;
      });
      const mid_right = markers.filter((marker) => {
        return marker[0] > 167.5 && marker[1] > 221 && marker[1] <= 393;
      });
      const bot_right = markers.filter((marker) => {
        return marker[0] > 167.5 && marker[1] > 393;
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

  const getLocalStorage = () => {
    let markers = localStorage.getItem("markers");
    if (markers) {
      return JSON.parse(markers);
    } else {
      return [];
    }
  };

  return (
    <div>
      <section className="container">
        <div className="info-container">
          <div className="count-container">
            <h3 style={{ display: "inline" }}>{count}</h3>{" "}
            <p style={{ display: "inline" }}>shots marked</p>
          </div>
          <div className="btn-container">
            <button
              className={`${isShowStats ? "stats-on" : "stats-off"} btn`}
              onClick={toggleStats}
            >
              {isShowStats ? "resume marking" : "view stats"}
            </button>
            <button
              className={`undo btn ${isShowStats ? "disabled-btn" : ""}`}
              style={isShowStats ? { display: "none" } : {}}
              onClick={() => {
                setMarkers(markers.slice(0, -1));
              }}
            >
              undo
            </button>
            <button
              className="reset btn"
              style={isShowStats ? { display: "none" } : {}}
              onClick={() => {
                setMarkers([]);
              }}
            >
              reset
            </button>
          </div>
        </div>
        <div id="canvas-container">
          <img id="canvas-img" src={squashfloor} />
          <div
            className="click-surface"
            style={{ zIndex: isShowStats ? "-1" : "1" }}
            onClick={mark}
          ></div>
          <div className="markers-container">
            {markers.map((marker, index) => {
              return (
                <span
                  key={index}
                  style={{
                    left: marker[0] - 3,
                    top: marker[1] - 10,
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
                  style={{ background: `rgba(3, 138, 255, ${stats[0] / 100})` }}
                >
                  <div className="stats-top-bg">
                    <h4 className="stats">{stats[0].toFixed(1)}%</h4>
                  </div>
                </div>
                <div
                  className="stats-mid-left"
                  style={{ background: `rgba(3, 138, 255, ${stats[1] / 100})` }}
                >
                  <div className="stats-mid-bg">
                    <h4 className="stats">{stats[1].toFixed(1)}%</h4>
                  </div>
                </div>
                <div
                  className="stats-bot-left"
                  style={{ background: `rgba(3, 138, 255, ${stats[2] / 100})` }}
                >
                  <div className="stats-bot-bg">
                    <h4 className="stats">{stats[2].toFixed(1)}%</h4>
                  </div>
                </div>
                <div
                  className="stats-top-right"
                  style={{ background: `rgba(3, 138, 255, ${stats[3] / 100})` }}
                >
                  <div className="stats-top-bg">
                    <h4 className="stats">{stats[3].toFixed(1)}%</h4>
                  </div>
                </div>
                <div
                  className="stats-mid-right"
                  style={{ background: `rgba(3, 138, 255, ${stats[4] / 100})` }}
                >
                  <div className="stats-mid-bg">
                    <h4 className="stats">{stats[4].toFixed(1)}%</h4>
                  </div>
                </div>
                <div
                  className="stats-bot-right"
                  style={{ background: `rgba(3, 138, 255, ${stats[5] / 100})` }}
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
  );
};

export default SquashFloor;
