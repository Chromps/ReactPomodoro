import React from 'react';

const Settings = ({currentSettings, plusClick, minusClick}) => {
    return (
        <div className="subSettings">
          <span>{currentSettings}</span>
          <br/>
          <button className="btn" onClick={plusClick}>Plus</button>
          <button className="btn" onClick={minusClick}>Minus</button>
        </div>
    )
}

export default Settings

Settings.propTypes = {
    currentSettings: React.PropTypes.string.isRequired,
    plusClick: React.PropTypes.func.isRequired,
    minusClick: React.PropTypes.func.isRequired
}