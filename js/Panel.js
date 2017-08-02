import m from 'mithril';

export default class Panel {

  constructor() {}

  onclick() {
    console.log('clicked!');
  }

  nameDecorator(attrs) {
    const rejectKeys = ['_reportType'];
    return Object.keys(attrs)
      .filter(key => !rejectKeys.includes(key))
      .map((key) => {
        const val = Array.isArray(attrs[key]) ?
          '\n' + attrs[key].join('\n') :
          attrs[key];

        return m('div', `${key}: ${val}`);
      });
  }

  view(vnode) {

    let contents = [
      m('div', {class: 'header'})
    ]
    .concat(this.nameDecorator(vnode.attrs));

    return m('div', {
      class: `panel ${vnode.attrs._reportType}`,
      onclick: this.onclick
    }, contents);
  }

}
