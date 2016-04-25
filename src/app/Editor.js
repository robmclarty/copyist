import React, { PropTypes } from 'react';

const Editor = React.createClass({
  displayName: 'Editor',

  propTypes: {
    markdown: PropTypes.string,
    scrollPercent: PropTypes.number,
    onChange: PropTypes.func,
    onScroll: PropTypes.func
  },

  getDefaultProps: function () {
    return {
      markdown: '',
      scrollPercent: 0
    };
  },

  componentDidUpdate: function () {
    const editorEl = this.refs.editor;
    const scrollOffset = this.props.scrollPercent * editorEl.scrollHeight / 100;
    console.log('editor: ', scrollOffset);

    editorEl.scrollTop = scrollOffset;
  },

  onScroll: function (e) {
    this.props.onScroll(e.target.scrollTop * 100 / e.target.scrollHeight);
  },

  render: function () {
    return (
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

        <div
            ref="editor"
            className="copyist-editor-input"
            onScroll={this.onScroll}>
          <textarea
              className="copyist-editor-textarea"
              defaultValue={this.props.markdown}
              onChange={e => this.props.onChange(e.target.value)}>
          </textarea>
        </div>
      </div>
    );
  }
});

export default Editor;
