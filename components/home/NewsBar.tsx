"use client";

import React from "react";

const NewsBar: React.FC = () => {
  return (
    <div className="news-bar">
      <div className="news-bar-viewport">
        <div className="news-bar-scroll">
          <p className="news-bar-text">
            Tuesday, 08 September, All our branches are open including Elephant Road branch. Additionally, our online activities are open and operational. Please check our contact page for the schedule.
          </p>
          <p className="news-bar-text" aria-hidden="true">
            Tuesday, 08 September, All our branches are open including Elephant Road branch. Additionally, our online activities are open and operational. Please check our contact page for the schedule.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsBar;
