import m from 'mithril';

export default class Panel {

  constructor() {}

  view(vnode) {
    return m('div', {class: 'panel'}, vnode.idx);
  }

}
