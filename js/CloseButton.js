import m from 'mithril';

export default class AddPanelForm {

  constructor() {}

  onclick(attrs) {
    attrs.isVisible = false;
  }

  view(vnode) {
    return m('div', {class: 'close-button', onclick: this.onclick.bind(vnode, vnode.attrs)}, 'x');
  }

}
