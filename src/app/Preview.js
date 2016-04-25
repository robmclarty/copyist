import React, { PropTypes } from 'react';
import hljs from 'highlight.js';
import mdConverter from 'markdown-it';
// import mdContainer from 'markdown-it-container';
// import mdDecorate from 'markdown-it-decorate';
// import mdExpandTabs from 'markdown-it-expand-tabs';
// import mdEmbed from 'markdown-it-html5-embed';

const mdOptions = {
  linkify: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
};

const mdEmbedOptions = {
  html5embed: {
    useImageSyntax: true,
    attributes: {
      'audio': 'width="320" controls class="audioplayer"',
      'video': 'width="320" height="240" class="videoplayer" controls'
    }
  }
};

const md = mdConverter(mdOptions);
  // .use(mdContainer, 'custom')
  // .use(mdDecorate)
  // .use(mdExpandTabs)
  // .use(mdEmbed, mdEmbedOptions);

const createMarkup = (markdown) => ({
  __html: md.render(markdown)
});

const Preview = React.createClass({
  displayName: 'Preview',

  propTypes: {
    markdown: PropTypes.string,
    scrollPercent: PropTypes.number,
    onScroll: PropTypes.func
  },

  getDefaultProps: function () {
    return {
      markdown: '',
      scrollPercent: 0
    };
  },

  componentDidUpdate: function () {
    const previewEl = this.refs.preview;
    const scrollOffset = this.props.scrollPercent * previewEl.scrollHeight / 100;

    previewEl.scrollTop = scrollOffset;
  },

  onScroll: function (e) {
    this.props.onScroll(e.target.scrollTop * 100 / e.target.scrollHeight);
  },

  render: function () {
    return (
      <div
          ref="preview"
          className="copyist-preview copyist-panel-content"
          onScroll={this.onScroll}>
        <div
            className="copyist-preview-content"
            dangerouslySetInnerHTML={createMarkup(this.props.markdown)}>
        </div>
      </div>
    );
  }
});

export default Preview;
