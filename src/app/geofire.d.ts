declare namespace geofire {
  function GeoFire(firebaseRef: any): void;
}

declare module 'geofire' {
  export = geofire;
}
