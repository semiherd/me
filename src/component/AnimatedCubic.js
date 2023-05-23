import * as React from 'react';
import '../App.css';

const AnimatedCubic=() => {
  return (
    <div className="stage-cube-cont">
      <div className="cubespinner">
        <div className="face1">
          JS
        </div>
        <div className="face2">
          CSS
        </div>
        <div className="face3">
          SQL
        </div>
        <div className="face4">
          AWS
        </div>
        <div className="face5">
          AGILE
        </div>
        <div className="face6">
          TDD
        </div>
      </div>
    </div>
  );
}
export default AnimatedCubic;