import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="body">
      <div className="loadingSun"></div>
      <div className="content">
        <div className="earth">
          <div className="circle">
            <div className="loadingMoon"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
