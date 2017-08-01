import m from 'mithril';
import Panel from './Panel.js';
import AddPanel from './AddPanel.js';

export default class Index {

  constructor() {}

  *getReports() {
    yield m.request('/codd/v1/templates');
  }

  view(vnode) {
    // reports shoudl replace the arbitrary array constructor in panels
    //let reports = this.getReports();
    const addPanel = m(AddPanel);

    const panels = Array.from(Array(70))
      .map((_, idx) => m(Panel, {idx}))
      .concat(addPanel);

    return m('div', {class: 'container'}, panels);
  }

}

