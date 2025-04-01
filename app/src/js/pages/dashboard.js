$(function () {
    "use strict";

    Morris.Area({
    element: 'area-chart3',
    data: [{
                period: '2013',
                data1: 0,
                data2: 0
            }, {
                period: '2014',
                data1: 5,
                data2: 3
            }, {
                period: '2015',
                data1: 6,
                data2: 1
            }, {
                period: '2016',
                data1: 8,
                data2: 2
            }, {
                period: '2017',
                data1: 25,
                data2: 8
            }, {
                period: '2018',
                data1: 9,
                data2: 1
            }, {
                period: '2019',
                data1: 5,
                data2: 5
            },{
                period: '2023',
                data1: 24,
                data2: 1
            }


            ],
            lineColors: ['#4d7cff', '#f2426d'],
            xkey: 'period',
            ykeys: ['data1', 'data2'],
            labels: ['Data 1', 'Data 2'],
            pointSize: 0,
            lineWidth: 0,
            resize:true,
            fillOpacity: 0.8,
            behaveLikeLine: true,
            gridLineColor: '#e0e0e0',
            hideHover: 'auto'
        
    });


    Morris.Donut({
        element: 'donut-chart',
        data: [{
            label: "New York",
            value: 953,

        }, {
            label: "Los Angeles",
            value: 813
        }, {
            label: "Dallas",
            value: 369
        }],
        resize: true,
        colors:['#51ce8a', '#4d7cff', '#f2426d']
    });



});