import React, { useState } from "react";
// import SquashFloor from "./SquashFloor";
import squashfloor from "./squash-floor.png";

function App() {
  const [markers, setMarkers] = useState([]);
  const [count, setCount] = useState(0);
  // const [imgDim, setImgDim] = useState([])

  const mark = (e) => {
    // console.log(e);
    const offX = e.target.offsetParent.offsetLeft;
    const offY = e.target.offsetParent.offsetTop;
    setMarkers([...markers, [e.pageX - offX, e.pageY - offY]]);
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

        {/* <button className="reset-btn">reset</button> */}
      </section>
    </main>

    // <SquashFloor />
  );
}

export default App;
