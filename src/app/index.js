import React, { PropTypes } from 'react';
import Header from './Header';
import Editor from './Editor';
import Preview from './Preview';

const Copyist = React.createClass({
  displayName: 'Copyist',

  propTypes: {
    title: PropTypes.string,
    markdown: PropTypes.string
  },

  getDefaultProps: function () {
    return {
      title: 'Sample Titlte',
      markdown: ''
    };
  },

  getInitialState: function () {
    return {
      title: '',
      markdown: '',
      scrollPercent: 0
    };
  },

  // Cache the props in the component state for the Editor to manipulate it.
  componentWillMount: function () {
    this.setState({ ...this.props });
  },

  // Override anything in the state with new updates from the props. It is
  // assumed that any changes made to the component state will have been
  // handled through callbacks and that the new props are the source of truth.
  // The component state is meant merely as a temporary cache until whatever
  // external data storage/handling mechanisms have completed their tasks and
  // generated a newly updated props.
  componentWillReceiveProps: function (nextProps) {
    this.setState({ ...this.props, ...nextProps });
  },

  // Only re-render if the nextProps are different from the current props.
  shouldComponentUpdate: function (nextProps, nextState) {
    const propsChanged = nextProps.markdown !== this.props.markdown ||
      nextProps.title !== this.props.title;
    const stateTextChanged = nextState.markdown !== this.state.markdown ||
      nextState.title !== this.state.title;
    const scrollChanged = nextState.scrollPercent !== this.state.scrollPercent;
    const stateChanged = stateTextChanged || scrollChanged;

    return propsChanged || stateChanged;
  },

  // Take a newly updated title and update the local cache, triggering any
  // callbacks for syncing with outside sources.
  onChangeTitle: function (updatedTitle) {
    this.setState({ title: updatedTitle });
  },

  // Take newly updated markdown and update the local cache, triggering redraws
  // on all dependant child components (e.g., from Editor and Preview). Also
  // triggers and callbacks for syncing with outside sources.
  onChangeMarkdown: function (updatedMarkdown) {
    this.setState({ markdown: updatedMarkdown });
  },

  onScroll: function (percentScrolled) {
    this.setState({ scrollPercent: percentScrolled });
  },

  render: function () {
    return (
      <div className="copyist">
        <Header
            title={this.state.title}
            onChange={this.onChangeTitle}
        />

        <div className="copyist-panels">
          <div className="copyist-panel">
            <Editor
                markdown={this.state.markdown}
                onChange={this.onChangeMarkdown}
                scrollPercent={this.state.scrollPercent}
                onScroll={this.onScroll}
            />

            <div className="copyist-panel-footer">
              <div className="copyist-panel-label">Markdown</div>
              <div className="copyist-panel-extra">
                <button className="copyist-distraction-free-button"></button>
              </div>
            </div>
          </div>

          <div className="copyist-panel with-divider">
            <Preview
                markdown={this.state.markdown}
                scrollPercent={this.state.scrollPercent}
                onScroll={this.onScroll}
            />

            <div className="copyist-panel-footer">
              <div className="copyist-panel-label">Preview</div>
              <div className="copyist-panel-extra">
                <div className="copyist-wordcount">503</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Copyist;
