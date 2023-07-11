import React, { useState } from "react";
import squashfloor from "./squash-floor.png";

function App() {
  const [markers, setMarkers] = useState([]);
  // const [imgDim, setImgDim] = useState([])

  const mark = (e) => {
    // console.log(e);
    const offX = e.target.offsetParent.offsetLeft;
    const offY = e.target.offsetParent.offsetTop;
    setMarkers([...markers, [e.clientX - offX, e.clientY - offY]]);
  };

  return (
    <main>
      <section className="container">
        <div id="canvas-container">
          <img id="canvas-img" src={squashfloor} onClick={mark} />
          <div className="markers-container">
            {markers.map((marker, index) => {
              return (
                <p
                  key={index}
                  style={{ left: marker[0] - 3, top: marker[1] - 8 }}
                >
                  &bull;
                  {/* {marker[0]}, {marker[1]} */}
                </p>
              );
            })}
          </div>
        </div>

        {/* <button className="reset-btn">reset</button> */}
      </section>
    </main>
  );
}

export default App;
