import React, { useState, useEffect } from "react";
import squashfloor from "./squash-floor.png";

const getLocalStorage = () => {
  let markers = localStorage.getItem("markers");
  if (markers) {
    return JSON.parse(markers);
  } else {
    return [];
  }
};

function App() {
  const [markers, setMarkers] = useState(getLocalStorage());
  const [count, setCount] = useState(markers.length);
  // const [imgDim, setImgDim] = useState([])

  useEffect(() => {
    localStorage.setItem("markers", JSON.stringify(markers));
    setCount(markers.length);
  }, [markers]);

  const mark = (e) => {
    // console.log(e);
    const offX = e.target.offsetParent.offsetLeft;
    const offY = e.target.offsetParent.offsetTop;
    setMarkers([...markers, [e.pageX - offX, e.pageY - offY]]);
    setCount(count + 1);
  };

  return (
    <main>
      <section className="container">
        <div id="canvas-container">
          <img id="canvas-img" src={squashfloor} />
          <div className="click-surface" onClick={mark}></div>
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
          </div>
        </div>
      </section>
      <section className="info-container">
        <h3 style={{ display: "inline" }}>{count}</h3>{" "}
        <p style={{ display: "inline" }}>shots marked</p>
        <button
          className="undo btn"
          onClick={() => {
            setMarkers(markers.slice(0, -1));
          }}
        >
          undo
        </button>
        <button
          className="reset btn"
          onClick={() => {
            setMarkers([]);
          }}
        >
          reset
        </button>
      </section>
    </main>

    // <SquashFloor />
  );
}

export default App;
