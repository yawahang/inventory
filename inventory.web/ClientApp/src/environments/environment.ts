// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/',
  webUrl: 'http://localhost:9000/',
  redirectUrl: '/dashboard',
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
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
