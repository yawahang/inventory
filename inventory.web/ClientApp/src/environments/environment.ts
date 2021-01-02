export const environment = {
  production: false,
  apiUrl: 'http://localhost:5200/api/',
  webUrl: 'http://localhost:4200/',
  redirectUrl: '/dashboard',
  secretKey: 'secretKey@123',
  storageKey: 'Inventory',
  dashboardConfig: {
    maxAxisDivisions: {
      weeks: 7,
      months: 8,
      twoMonths: 9,
      sixMonths: 10,
      year: 12
    },
    format: {
      number: "{0:0}",
      decimal: "{0:n3}",
      money: "{0:c2}",
      date: "{0:MM/dd/yyyy}",
      datetime: "{0:MM/dd/yyyy hh:mm a}",
      time: "{0:hh:mm a}"
    }
  },
  report: {
    pageSize: 100,
    format: {
      number: "{0:0}",
      decimal: "{0:n3}",
      money: "{0:c2}",
      date: "{0:MM/dd/yyyy}",
      datetime: "{0:MM/dd/yyyy hh:mm a}",
      time: "{0:hh:mm a}"
    },
    filter: {
      number: "numeric",
      decimal: "numeric",
      money: "numeric",
      date: "date",
      datetime: "datetime",
      time: "time",
      select: "text",
      multiselect: "text",
      string: "text",
      text: "text",
      boolean: "boolean"
    }
  }
};
