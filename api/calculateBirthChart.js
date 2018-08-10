import axios from 'axios';
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

export default (async function calculateBirthChart(data) {
	const PUSH_ENDPOINT = 'https://astrolibrary.org/wp-admin/admin-ajax.php';
  const FORM_DATA = '';
	// const FORM_DATA = `name=jayz&`
	// 	`month=${data.}&`
	// 	`day=${data.}&`
	// 	`year=${data.}&`
	// 	`hour=${data.}&`
	// 	`minute=${data.}&`
	// 	`unknown_time=${data.}&`
	// 	`place=${data.}&`
	// 	`geo_timezone_id=${data.}&`
	// 	`zp_lat_decimal=${data.}&`
	// 	`zp_long_decimal=${data.}&`
	// 	`zp-report-variation=${data.}&`
	// 	`zp_offset_geo=${data.}&`
	// 	`action=zp_birthreport`;
  
  const HEADER = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };


  let dom = await axios.post(PUSH_ENDPOINT, FORM_DATA, HEADER);
  // dom = new JSDOM(dom.data.report);
  // console.log(dom.window.document.querySelector("p").textContent)

  // return dom.window.document.querySelector('p').textContent;
});