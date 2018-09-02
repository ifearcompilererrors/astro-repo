import axios from 'axios';
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

export default (async function calculateBirthChart(data) {
	const PUSH_ENDPOINT = 'https://astrolibrary.org/wp-admin/admin-ajax.php';
  // const FORM_DATA = 'name=sdfg&month=2&day=5&year=2004&hour=&minute=&unknown_time=on&place=Chicago%2C+Illinois%2C+United+States&geo_timezone_id=America%2FChicago&zp_lat_decimal=41.85003&zp_long_decimal=-87.65005&zp-report-variation=birthreport&zp_offset_geo=-6&action=zp_birthreport';
	const FORM_DATA = `name=jayz&`
		+ `month=${data.month}&`
		+ `day=${data.day}&`
		+ `year=${data.year}&`
		+ `hour=${data.hour}&`
		+ `minute=${data.minute}&`
		// + `unknown_time=off&`
    + 'place=Chicago%2C+Illinois%2C+United+States&geo_timezone_id=America%2FChicago&zp_lat_decimal=41.85003&zp_long_decimal=-87.65005&zp-report-variation=birthreport&zp_offset_geo=-6&action=zp_birthreport';
    // + `place=${data.}`
		// + `geo_timezone_id=${data.}&`
		// + `zp_lat_decimal=${data.}&`
		// + `zp_long_decimal=${data.}&`
		// + `zp-report-variation=${data.}&`
		// + `zp_offset_geo=${data.}&`
		// + `action=zp_birthreport`;


  const HEADER = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };


  let result = await axios.post(PUSH_ENDPOINT, FORM_DATA, HEADER);
  console.log(PUSH_ENDPOINT, FORM_DATA)
  let report = result.data.report;
  let chartDetails = {};
  const zRegex = /(Aries|Taurus|Gemini|Cancer|Leo|Virgo|Libra|Scorpio|Sagittarius|Capricorn|Aquarius|Pisces)/g;

  chartDetails['asc'] = report.match(/Ascendant in \w+/g) && report.match(/Ascendant in \w+/g)[0].match(zRegex)[0] || 'n/a';
  chartDetails['sun'] = report.match(/Sun in \w+/g) && report.match(/Sun in \w+/g)[0].match(zRegex)[0] || 'n/a';
  chartDetails['moon'] = report.match(/Moon in \w+/g) && report.match(/Moon in \w+/g)[0].match(zRegex)[0] || 'n/a';
  chartDetails['mercury'] = report.match(/Mercury in \w+/g) && report.match(/Mercury in \w+/g)[0].match(zRegex)[0] || 'n/a';
  chartDetails['venus'] = report.match(/Venus in \w+/g) && report.match(/Venus in \w+/g)[0].match(zRegex)[0] || 'n/a';
  chartDetails['mars'] = report.match(/Mars in \w+/g) && report.match(/Mars in \w+/g)[0].match(zRegex)[0] || 'n/a';
  chartDetails['jupiter'] = report.match(/Jupiter in \w+/g) && report.match(/Jupiter in \w+/g)[0].match(zRegex)[0] || 'n/a';
  chartDetails['saturn'] = report.match(/Saturn in \w+/g) && report.match(/Saturn in \w+/g)[0].match(zRegex)[0] || 'n/a';
  chartDetails['uranus'] = report.match(/Uranus in \w+/g) && report.match(/Uranus in \w+/g)[0].match(zRegex)[0] || 'n/a';
  chartDetails['neptune'] = report.match(/Neptune in \w+/g) && report.match(/Neptune in \w+/g)[0].match(zRegex)[0] || 'n/a';
  chartDetails['pluto'] = report.match(/Pluto in \w+/g) && report.match(/Pluto in \w+/g)[0].match(zRegex)[0] || 'n/a';

  getLocale(data.city);

  // console.log('Chiron', report.match(/Chiron in \w+/g)[0].match(zRegex));
  // console.log('Black Moon Lilith', report.match(/Black Moon Lilith in \w+/g)[0].match(zRegex));
  // console.log('North', report.match(/North in \w+/g)[0].match(zRegex));
  // console.log('Part of Fortune', report.match(/Part of Fortune in \w+/g)[0].match(zRegex));
  // console.log('Vertex', report.match(/Vertex in \w+/g)[0].match(zRegex));
  // console.log('Midheaven', report.match(/Midheaven in \w+/g)[0].match(zRegex));

  return chartDetails;
});

function getLocale(city) {
  const cityDetailsEndpoint = `http://gd.geobytes.com/GetCityDetails?callback=?&fqcn=`;
  const localeEndpoint = `https://astrolibrary.org/wp-admin/admin-ajax.php?action=zp_atlas_get_cities&c=`;

  axios.get(cityDetailsEndpoint+city).then((response) => {
    const searchableStr = [response.geobytesregion, response.geobytescity, response.geobytescountry].join(', ');
    axios.get(localeEndpoint+encodeURI(searchableStr))
        .then((response) => {
          console.log('getLocale', response);
          // const details = JSON.parse((response.data).substring(2, response.data.length-2));
          // console.log('Timezone', details[0].tz);
        });
  })
}