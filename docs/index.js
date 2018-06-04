/* eslint-disable global-require, import/no-unresolved, react/no-multi-comp */
import React from 'react';
import ReactDOM from 'react-dom';
import GithubCorner from 'react-github-corner';
import { Catalog, CodeSpecimen, ReactSpecimen, pageLoader } from 'catalog';
import 'purecss/build/pure.css';

import { Timeline, Bookmark, Marker } from '../src/index';
import './main.css';
import '../style.css';

// Add your documentation imports here. These are available to
// React specimen. Do NOT pass React here as Catalog does that.
const documentationImports = {
  Timeline,
  Bookmark,
  Marker
};
const pages = [
  {
    path: '/',
    title: 'Introduction',
    content: pageLoader(() => import('../README.md'))
  }
];

// Catalog - logoSrc="../images/logo.png"
ReactDOM.render(
  <div>
    <GithubCorner
      href="https://github.com/yeyus/react-vertical-timeline"
      bannerColor="#fff"
      octoColor="#000"
      width={80}
      height={80}
      direction="right"
    />
    <Catalog
      imports={documentationImports}
      pages={pages}
      specimens={{
        javascript: props => <CodeSpecimen {...props} lang="javascript" />,
        js: props => <CodeSpecimen {...props} lang="javascript" />,
        jsx: props => <ReactSpecimen {...props} />
      }}
      title="React Vertical Timeline"
    />
  </div>,
  document.getElementById('catalog')
);
