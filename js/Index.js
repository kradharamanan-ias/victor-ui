import m from 'mithril';
import Panel from './Panel.js';
import AddPanel from './AddPanel.js';

export default class Index {

  constructor() {}

  oninit(vnode) {
    vnode.state.reports = Promise.all([
      m.request('http://69.164.208.35:14142/codd/v1/attached_reports'),
      m.request('http://69.164.208.35:14142/codd/v1/embedded_reports'),
      m.request('http://69.164.208.35:14142/codd/v1/delivered_reports')
    ]);
  }

  view(vnode) {

    const reportTypes = ['attached', 'embedded', 'delivered'];
    const addPanel = m(AddPanel);

    return vnode.state.reports
      .then(function(reports) {
        const panels = reports
          .reduce((out, reportList, i) => {
            let list = reportList.map((report) => {
              report['_reportType'] = reportType[i];
              return report;
            })
            return out.concat(list);
          }, [])
          .map((report) => m(Panel, report))
          .concat(addPanel);

        debugger;

        return m('div', {class: 'container'}, panels);
      });

  }

}

