import m from 'mithril';
import Panel from './Panel.js';
import AddPanel from './AddPanel.js';
import AddPanelForm from './AddPanelForm.js';

export default class Index {

  constructor() {}

  oninit(vnode) {
    vnode.state.showAddPanelForm = false;
  }

  *getReports() {
    yield m.request('/codd/v1/templates');
  }

  view(vnode) {
    // reports shoudl replace the arbitrary array constructor in panels
    //let reports = this.getReports();
    const addPanelForm = m(AddPanelForm, {isVisible: vnode.state.showAddPanelForm});
    const addPanel = m(AddPanel, {showAddPanelForm: vnode.state.showAddPanelForm});

    const panels = Array.from(Array(70))
      .map((_, idx) => m(Panel, {idx}))
      .concat(addPanel);

    debugger;
    console.log(vnode.state.showAddPanelForm);

    let contents = vnode.state.showAddPanelForm ?
      addPanelForm :
      panels;

    return m('div', {class: 'container'}, contents);
  }

}

