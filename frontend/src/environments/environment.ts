// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'http://ec2-3-145-106-79.us-east-2.compute.amazonaws.com',
  mapbox: {
    api: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    accessToken: 'sk.eyJ1Ijoic2FpbnR1cmIiLCJhIjoiY2w5ajJodTQ5MDR2ZzN2bjJvYW9wdWFmeSJ9.bGRj5jDUXvHa_Cg_mNXPZw',
    publicToken: 'pk.eyJ1Ijoic2FpbnR1cmIiLCJhIjoiY2t6Z3Riam84Mmp1dDMwbzFjbWs2ejYweiJ9.gLdloiyb3l_P2UfbgxVN9Q'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
