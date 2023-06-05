import React from "react";

// Rank component -- displays name and current entry count
const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className="white f3">
            {`${name}, your current entry count is... `}
            </div>
            <div className="white f1">
              {entries}
            </div>
        </div>
    );
}

export default Rank;