import read from './read.js';
import {stringify, data2week, data2city} from './lib.js';


(async () => {

    const data = await read('measurements.csv');

    document.getElementById('by-week').innerText = stringify(data2week(data));
    document.getElementById('by-city').innerText = stringify(data2city(data));


})();
