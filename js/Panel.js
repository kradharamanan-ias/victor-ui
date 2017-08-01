import m from 'mithril';

export default class Panel {

  constructor() {}

  onclick() {
    console.log('clicked!');
  }

  view(vnode) {
    return m('div', {
      class: 'panel',
      onclick: this.onclick
    }, vnode.attrs.idx);
  }

}
