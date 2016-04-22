import React, { PropTypes } from 'react';
import hljs from 'highlight.js';
import mdConverter from 'markdown-it';
//import mdHighlightjs from 'markdown-it-highlightjs';
// import mdContainer from 'markdown-it-container';
// import mdDecorate from 'markdown-it-decorate';
// import mdExpandTabs from 'markdown-it-expand-tabs';
// import mdEmbed from 'markdown-it-html5-embed';

const mdOptions = {
  linkify: true,
  breaks: true,
  // highlight: function (str, lang) {
  //   console.log('lang: ', lang);
  //   console.log('hljs: ', hljs.getLanguage(lang));
  //   if (lang && hljs.getLanguage(lang)) {
  //     try {
  //       return '<pre class="hljs"><code>' +
  //              hljs.highlight(lang, str, true).value +
  //              '</code></pre>';
  //     } catch (__) {}
  //   }
  //
  //   return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  // }
  highlight: function (str, lang) {
    console.log('lang: ', lang);
    console.log('hljs: ', hljs.getLanguage(lang));
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

const Editor = ({ markdown }) => (
  <div className="copyist-preview copyist-panel-content">
    <div
        className="copyist-preview-content"
        dangerouslySetInnerHTML={createMarkup(markdown)}>
    </div>
  </div>
);

export default Editor;
