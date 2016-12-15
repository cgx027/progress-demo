// Copyright 2015, EMC, Inc.

import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import onReady from 'src-common/lib/onReady';
import NotFound from 'src-common/views/NotFound';

// import ManagementConsole from 'src-management-console/views/ManagementConsole';
// import NetworkTopology from 'src-network-topology/views/NetworkTopology';
// import OperationsCenter from 'src-operations-center/views/OperationsCenter';
// import SKUPacks from 'src-sku-packs/views/SKUPacks';
// import VisualAnalytics from 'src-visual-analytics/views/VisualAnalytics';
// import WorkflowEditor from 'src-workflow-editor/views/WorkflowEditor';
//
import App from './views/App';
// import Settings from './views/Settings';
console.log(App);

const main = () => {
  if (global.isUnitTesting) { return; }

  let container = document.createElement('div');
  container.className = 'react-container';
  document.body.appendChild(container);
  global.monorailContainer = container;

  render((
    <Router history={hashHistory}>
      <Route name="RackHD" path="/" component={App}>
      </Route>
    </Router>
  ), container);
};

onReady(main);
