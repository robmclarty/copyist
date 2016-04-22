import React, { PropTypes } from 'react';

const Header = ({ title, onChange }) => (
  <div className="copyist-header">
    <input
        type="text"
        name="title"
        className="copyist-title-input"
        defaultValue={title}
        onChange={e => onChange(e.target.value)}
    />

    <div className="copyist-global-controls">
      <button className="copyist-settings-button"></button>
      <button className="copyist-save-button">Save</button>
    </div>
  </div>
);

export default Header;
