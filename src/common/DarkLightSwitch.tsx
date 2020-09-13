import React, { useState } from 'react';
import moon from './moon.svg';
import sun from './sun.svg';

const DarkLightSwitch = () => {
  const [lightTheme, setLightTheme] = useState(false);

  function handleUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    checked
      ? document.body.classList.add('light-theme')
      : document.body.classList.remove('light-theme');
    setLightTheme(checked);
  }

  return (
    <label className="switch">
      <input type="checkbox" checked={lightTheme} onChange={handleUpdate} />
      <span className="slider">
        <span className="icon">
          <img src={moon} alt="moon icon" className="dark" />
          <img src={sun} alt="sun icon" className="light" />
        </span>
      </span>
    </label>
  );
};

export default DarkLightSwitch;
