import m from 'mithril';

export default class AddPanel {

  constructor() {}

  onclick(attrs) {
    m.route.set('/addReport');
  }

  view(vnode) {

    return m('div', {
      class: 'panel add-panel',
      onclick: this.onclick
    }, '+');
  }

}

