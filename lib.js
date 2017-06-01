/** Created by azder on 2017-05-29. */


export const stringify = (
    data => {
        const json = JSON.stringify(data, null, 4);
        // eslint-disable-next-line no-console
        console.log(json);
        return json;
    }
);

export const matrix2data = matrix => {
    // column names that will become properties
    const props = matrix.shift();
    // data rows
    const data = matrix.map(
        row =>
            props.reduce(
                (memo, column, index) => {
                    memo[column] = row[index].trim();
                    return memo;
                },
                {}
            )
    );
    return {props, data};
};

export const data2week = (
    ({data}) => Object.values(
        data.reduce(
            (weeks, current) => {

                const cities = weeks[current.week] || {};
                const city = cities[current.city] || {city: current.city, total: 0, count: 0};

                city.week = current.week;
                city.total += (current.value - 0);
                city.count += 1;
                city.average = city.total / city.count;

                cities[current.city] = city;
                weeks[current.week] = cities;

                return weeks;

            },
            {}
        )
    )
);

export const data2city = (
    ({data}) => data.reduce(
        (cities, current) => {

            const city = cities[current.city] || {city: current.city, weeks: {}};
            const week = city.weeks[current.week] || {week: current.week, total: 0, count: 0};

            week.total += (current.value - 0);
            week.count += 1;
            week.average = week.total / week.count;

            city.weeks[current.week] = week;
            city.averages = Object.values(city.weeks);
            cities[current.city] = city;

            return cities;

        },
        {}
    )
);
