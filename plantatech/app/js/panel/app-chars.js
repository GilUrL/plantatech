import { getReadingPots } from './hooks/getValues.js';
import { get_reading } from './chars-data.js';
const get_reading_data = () => {
    let userData = getReadingPots();
    const fetchData = () => {
        get_reading(userData);
        setTimeout(fetchData, 5000);
    };
    fetchData();
};
$(document).ready(function () {
    get_reading_data(); 
});