export const DAY_DATA = {
  graph: [
    { time: '00:00', co: 5,  so2: 3, nox: 10, pm10: 22, pm25: 12 },
    { time: '01:00', co: 7,  so2: 2, nox: 8,  pm10: 18, pm25: 10 },
    { time: '02:00', co: 4,  so2: 3, nox: 6,  pm10: 15, pm25: 9 },
    { time: '03:00', co: 6,  so2: 2, nox: 7,  pm10: 21, pm25: 11 },
    { time: '04:00', co: 8,  so2: 4, nox: 9,  pm10: 23, pm25: 13 },
    { time: '05:00', co: 9,  so2: 3, nox: 11, pm10: 25, pm25: 14 },
    { time: '06:00', co: 11, so2: 5, nox: 13, pm10: 27, pm25: 15 },
    { time: '07:00', co: 13, so2: 6, nox: 15, pm10: 30, pm25: 17 },
    { time: '08:00', co: 14, so2: 7, nox: 18, pm10: 34, pm25: 19 },
    { time: '09:00', co: 12, so2: 5, nox: 14, pm10: 28, pm25: 16 },
    { time: '10:00', co: 10, so2: 4, nox: 12, pm10: 26, pm25: 14 },
    { time: '11:00', co: 11, so2: 5, nox: 13, pm10: 29, pm25: 15 },
    { time: '12:00', co: 12, so2: 6, nox: 14, pm10: 30, pm25: 17 },
    { time: '13:00', co: 13, so2: 7, nox: 15, pm10: 32, pm25: 18 },
    { time: '14:00', co: 15, so2: 8, nox: 17, pm10: 35, pm25: 20 },
    { time: '15:00', co: 14, so2: 6, nox: 16, pm10: 33, pm25: 19 },
    { time: '16:00', co: 12, so2: 5, nox: 14, pm10: 31, pm25: 18 },
    { time: '17:00', co: 11, so2: 4, nox: 12, pm10: 29, pm25: 16 },
    { time: '18:00', co: 10, so2: 3, nox: 11, pm10: 27, pm25: 15 },
    { time: '19:00', co: 9,  so2: 3, nox: 10, pm10: 26, pm25: 14 },
    { time: '20:00', co: 8,  so2: 2, nox: 9,  pm10: 24, pm25: 13 },
    { time: '21:00', co: 7,  so2: 3, nox: 8,  pm10: 22, pm25: 11 },
    { time: '22:00', co: 6,  so2: 2, nox: 7,  pm10: 20, pm25: 10 },
    { time: '23:00', co: 5,  so2: 3, nox: 6,  pm10: 19, pm25: 9 }
  ],
  table: [
    { component: 'CO', avg: 6, min: 4, max: 10, limit: 20, unit: 'ppm' },
    { component: 'SO₂', avg: 3.1, min: 2, max: 5, limit: 50, unit: 'ppm' },
    { component: 'NOx', avg: 7, min: 5, max: 10, limit: 40, unit: 'ppm' },
    { component: 'PM10', avg: 18, min: 14, max: 22, limit: 100, unit: 'µg/m³' },
    { component: 'PM2.5', avg: 11, min: 9, max: 15, limit: 60, unit: 'µg/m³' },
    { component: 'sensor 1', avg: 6, min: 4, max: 10, limit: 20, unit: 'ppm' },
    { component: 'sensor 2', avg: 3.1, min: 2, max: 5, limit: 50, unit: 'ppm' },
    { component: 'sensor 3', avg: 7, min: 5, max: 10, limit: 40, unit: 'ppm' },
    { component: 'sensor 4', avg: 18, min: 14, max: 22, limit: 100, unit: 'µg/m³' },
    { component: 'sensor 5', avg: 11, min: 9, max: 15, limit: 60, unit: 'µg/m³' }
  ]
};

export const WEEK_DATA = {
  graph: [
    { day: 'Mon', co: 5, so2: 3, nox: 8, pm10: 20, pm25: 10 },
    { day: 'Tue', co: 6, so2: 4, nox: 7, pm10: 21, pm25: 11 },
    { day: 'Wed', co: 4, so2: 2, nox: 6, pm10: 19, pm25: 9 },
    { day: 'Thu', co: 7, so2: 3, nox: 9, pm10: 23, pm25: 12 },
    { day: 'Fri', co: 6, so2: 3, nox: 8, pm10: 20, pm25: 10 },
    { day: 'Sat', co: 5, so2: 4, nox: 7, pm10: 18, pm25: 11 },
    { day: 'Sun', co: 4, so2: 2, nox: 6, pm10: 17, pm25: 8 }
  ],

  table: [
    { component: 'CO', avg: 5.2, min: 4, max: 7, limit: 20, unit: 'ppm' },
    { component: 'SO₂', avg: 3, min: 2, max: 4, limit: 50, unit: 'ppm' },
    { component: 'NOx', avg: 7, min: 5, max: 9, limit: 40, unit: 'ppm' },
    { component: 'PM10', avg: 19.7, min: 17, max: 23, limit: 100, unit: 'µg/m³' },
    { component: 'PM2.5', avg: 10.2, min: 8, max: 12, limit: 60, unit: 'µg/m³' },
     { component: 'sensor 1', avg: 6, min: 4, max: 10, limit: 20, unit: 'ppm' },
    { component: 'sensor 2', avg: 3.1, min: 2, max: 5, limit: 50, unit: 'ppm' },
    { component: 'sensor 3', avg: 7, min: 5, max: 10, limit: 40, unit: 'ppm' },
    { component: 'sensor 4', avg: 18, min: 14, max: 22, limit: 100, unit: 'µg/m³' },
    { component: 'sensor 5', avg: 11, min: 9, max: 15, limit: 60, unit: 'µg/m³' }
  ]
};

export const MONTH_DATA = {
  graph: [
    { day: 1, co: 6, so2: 3, nox: 9, pm10: 22, pm25: 14 },
    { day: 2, co: 7, so2: 2, nox: 8, pm10: 21, pm25: 15 },
    { day: 3, co: 5, so2: 4, nox: 7, pm10: 20, pm25: 10 },
    // ...30 days
  ],

  table: [
    { component: 'CO', avg: 6.1, min: 4, max: 9, limit: 20, unit: 'ppm' },
    { component: 'SO₂', avg: 3.1, min: 2, max: 5, limit: 50, unit: 'ppm' },
    { component: 'NOx', avg: 7.4, min: 5, max: 10, limit: 40, unit: 'ppm' },
    { component: 'PM10', avg: 21.2, min: 17, max: 25, limit: 100, unit: 'µg/m³' },
    { component: 'PM2.5', avg: 12, min: 9, max: 15, limit: 60, unit: 'µg/m³' },
     { component: 'sensor 1', avg: 6, min: 4, max: 10, limit: 20, unit: 'ppm' },
    { component: 'sensor 2', avg: 3.1, min: 2, max: 5, limit: 50, unit: 'ppm' },
    { component: 'sensor 3', avg: 7, min: 5, max: 10, limit: 40, unit: 'ppm' },
    { component: 'sensor 4', avg: 18, min: 14, max: 22, limit: 100, unit: 'µg/m³' },
    { component: 'sensor 5', avg: 11, min: 9, max: 15, limit: 60, unit: 'µg/m³' }
  ]
};
