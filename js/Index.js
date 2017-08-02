import m from 'mithril';
import Panel from './Panel.js';
import AddPanel from './AddPanel.js';

import Connector from './Connector.js';

export default class Index {

  constructor() {}


  *_render(vnode) {
    const reportTypes = ['attached', 'embedded', 'delivered'];
    const addPanel = m(AddPanel);

    let reports = yield Connector.getReports();

    let panels = reports
      .map((report) => m(Panel, report))
      .concat(addPanel);

    return m('div', {class: 'container'}, panels);
  }

  view(vnode) {

    //const reportTypes = ['attached', 'embedded', 'delivered'];
    //const addPanel = m(AddPanel);

    //let reports = yield Connector.getReports();

    //let panels = reports
      //.map((report) => m(Panel, report))
      //.concat(addPanel);

    //return m('div', {class: 'container'}, panels);

    return this._render.call(this, vnode);
  }

}

