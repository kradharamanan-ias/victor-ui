import m from 'mithril';

export default class AddPanel {

  constructor() {}

  onclick(attrs) {
    attrs.showAddPanelForm = true;
  }

  view(vnode) {
    return m('div', {
      class: 'panel',
      onclick: this.onclick.bind(vnode, vnode.attrs)
    }, '+');
  }

}

