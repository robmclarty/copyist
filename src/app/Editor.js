import React, { PropTypes } from 'react';

const Editor = ({ markdown, onChange }) => (
  <div className="copyist-editor copyist-panel-content">
    <div className="copyist-editor-controls">
      <button className="copyist-bold-button"></button>
      <button className="copyist-italic-button"></button>
      <button className="copyist-image-button"></button>
      <button className="copyist-link-button"></button>
      <button className="copyist-ol-button"></button>
      <button className="copyist-ul-button"></button>
      <button className="copyist-quote-button"></button>
      <button className="copyist-code-button"></button>
      <button className="copyist-undo-button"></button>
      <button className="copyist-redo-button"></button>
      <button className="copyist-custom-button"></button>
    </div>

    <div className="copyist-editor-input">
      <textarea
          className="copyist-editor-textarea"
          defaultValue={markdown}
          onChange={e => onChange(e.target.value)}
          onScroll={e => console.log('scrolling')}>
      </textarea>
    </div>
  </div>
);

export default Editor;
