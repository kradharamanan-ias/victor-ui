import m from 'mithril';

export default class AddPanelForm {

  constructor() {}

  onclick(attrs) {
    m.route.set('/');
  }

  view(vnode) {
    return m('div', {
      class: 'close-button',
      onclick: this.onclick
    }, 'x');
  }

}
