import { getRegisterPots, getUpdatePots, setValuesDefault, getDeletePots} from './hooks/getValues.js';
import { new_pot, listPots,updatePots, deletePots } from './data.js';
$(function () {
    listPots();
});
$('#getRegisterPots').on('click', function (e) {
    let data = getRegisterPots();
    $('#name-pot').val("");
    $('#location-pot').val("");
    new_pot(data);
});
$('#update-pots-btn').on('click', function (e) {
    let data = getUpdatePots();
    console.log(data);
    updatePots(data);
});
$(document).on('click',"#sa-params", function (e) {
    let data = getDeletePots(this);
    deletePots(data);
});
$(document).on('click', "#update-pots-table", function (e) {
    setValuesDefault(this);
});

