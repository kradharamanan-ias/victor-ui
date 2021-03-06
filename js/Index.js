import m from 'mithril';
import Panel from './Panel.js';
import AddPanel from './AddPanel.js';

import API from './API.js';

export default class Index {

  constructor() {}

  oninit(vnode) {
    vnode.state.reports = [];
    API.getReports()
      .then((reports) => {
        vnode.state.reports = reports;
        m.redraw();
      });
  }

  view(vnode) {

    const addPanel = m(AddPanel);

    const panels = vnode.state.reports
      .map((report) => m(Panel, report))
      .concat(addPanel);

    return m('div', {class: 'container'}, panels);
  }

}

