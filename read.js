/* globals fetch */

import {matrix2data} from './lib.js';

export default (
    file => fetch(file)
        .then(response => response.text())
        .then(text => text.split('\n'))
        .then(rows => rows.map(row => row.split(',')))
        .then(rows => {
            // if last split item is empty line, lenght will not be 4, but 1
            if (1 === rows[rows.length - 1].length) {
                rows.pop();
            }
            return rows;
        })
        .then(matrix2data) // {"week":"1","city":"dresden","station":"dresden_1","value":"6"}
);
