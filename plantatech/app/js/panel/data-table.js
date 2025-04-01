
import { listPots } from './data.js';
$(document).ready(function () {
    listPots();
});
$(function () {
    "use strict";
    // $('').DataTable( {
    // 	dom: 'Bfrtip',
    // 	buttons: [
    // 		'copy', 'csv', 'excel', 'pdf', 'print'
    // 	]
    // } );

    $('#complex_header').DataTable();
});