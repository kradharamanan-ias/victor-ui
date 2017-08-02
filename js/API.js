import m from 'mithril';

class API {

  constructor() {}

  getReports() {

    const reportTypes = ['attached_reports', 'embedded_reports', 'delivered_reports'];

    return Promise.all([
      m.request('http://69.164.208.35:14142/codd/v1/attached_reports'),
      m.request('http://69.164.208.35:14142/codd/v1/embedded_reports'),
      m.request('http://69.164.208.35:14142/codd/v1/delivered_reports')
    ]).then(
      (reports = []) => {
        return reports
          .reduce((out, reportList, i) => {
            let list = reportList[reportTypes[i]].map((report) => {
              report['_reportType'] = reportTypes[i];
              return report;
            })
            return out.concat(list);
          }, []);
      },
      (error) => {
        console.error(error);
        return [];
      }
    );

  }

}

export default new API();

