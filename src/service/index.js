import MOCK_DATA from "../assets/MOCK_DATA.csv"

export const getDataFromCSV = async () => {
    try {
        const result = await fetch(MOCK_DATA);
        const csvText = await result.text();
        const dataArray = processCSVText(csvText)
        return {
            dataArray,
            success: true,
        }
    } catch (error) {
        return {
            dataArray: null,
            success: false,
            message: error.message
        }
    }
}

const processCSVText = (str, delim = ',') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    const newArray = rows.map(row => {
        const values = row.split(delim);
        const eachObject = headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
        }, {})
        return eachObject;
    })

    return newArray;
}