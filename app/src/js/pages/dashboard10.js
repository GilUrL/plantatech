$(function () {
    "use strict";
  

    var options7 = {
          series: [70],
          chart: {
          type: 'radialBar',
          width: 80,
          height: 80,
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
    colors:['#4d7cff'],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '50%'
            },
            track: {
              margin: 0
            },
            dataLabels: {
              show: false
            }
          }
        }
        };

        var chart7 = new ApexCharts(document.querySelector("#booked-revenue-chart"), options7);
        chart7.render();


        var options1 = {
          series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
          chart: {
          type: 'line',
          width: 100,
          height: 70,
          sparkline: {
            enabled: true
          }
        },    
        stroke: {
          curve: 'smooth',
      width: 2,
        },
    colors:['#51ce8a'],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
        };

        var chart1 = new ApexCharts(document.querySelector("#new-leads-chart"), options1);
        chart1.render();
  

  var options5 = {
          series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
          chart: {
          type: 'bar',
          width: 100,
          height: 70,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 1
          },
        },
    colors:['#4d7cff'],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
        };

        var chart5 = new ApexCharts(document.querySelector("#campaign-sent"), options5);
        chart5.render();
  
   
  
    var a = c3.generate({
        bindto: "#area-chart",
        size: { height: 350 },
        point: { r: 4 },
        color: { pattern: ["#3e8ef7", "#ff4c52"] },
        data: {
            columns: [
                ['data1', 300, 350, 300, 0, 0, 0],
              ['data2', 130, 100, 140, 200, 150, 50]

            ],
            types: { data1: "area", data2: "area-spline" }
        },
        grid: { y: { show: !0 } }
    });


     // -----------------
  // - SPARKLINE BAR -
  // -----------------
  $('.sparkbar').each(function () {
    var $this = $(this);
    $this.sparkline('html', {
      type    : 'bar',
      height  : $this.data('height') ? $this.data('height') : '30',
      barColor: $this.data('color')
    });
  });

  $("#discretechart").sparkline([1,4,3,7,6,4,8,9,6,8,12], {
      type: 'discrete',
      width: '80',
      height: '70',
      lineColor: '#745af2',
    });


  


      // ------------------------------
    // Basic pie chart
    // ------------------------------
    // based on prepared DOM, initialize echarts instance
        var basicdoughnutChart = echarts.init(document.getElementById('basic-doughnut'));
        var option = {
            // Add title
                // title: {
                //     text: 'A site user access source',
                //     subtext: 'Purely Fictitious',
                //     x: 'center'
                // },

                // Add legend
                // legend: {
                //     orient: 'vertical',
                //     x: 'left',
                //     data: ['Direct Access', 'Mail Marketing', 'Union ad', 'Video ad', 'Search Engine']
                // },

                // Add custom colors
                color: ['#0052cc', '#00baff', '#ff9920'],

                // Display toolbox
                toolbox: {
                    show: false,
                    orient: 'vertical',
                    feature: {
                        mark: {
                            show: true,
                            title: {
                                mark: 'Markline switch',
                                markUndo: 'Undo markline',
                                markClear: 'Clear markline'
                            }
                        },
                        dataView: {
                            show: false,
                            readOnly: false,
                            title: 'View data',
                            lang: ['View chart data', 'Close', 'Update']
                        },
                        magicType: {
                            show: false,
                            title: {
                                pie: 'Switch to pies',
                                funnel: 'Switch to funnel',
                            },
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '100%',
                                    y: '100%',
                                    width: '100%',
                                    height: '100%',
                                    funnelAlign: 'left',
                                    max: 400
                                }
                            }
                        },
                        restore: {
                            show: false,
                            title: 'Restore'
                        },
                        saveAsImage: {
                            show: false,
                            title: 'Same as image',
                            lang: ['Save']
                        }
                    }
                },

                // Enable drag recalculate
                calculable: false,

                // Add series
                series: [
                    {
                        name: 'Marketing',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        center: ['50%', '50%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                    formatter: '{b}' + '\n\n' + '{c} ({d}%)',
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '17',
                                        fontWeight: '500'
                                    }
                                }
                            }
                        },

                        data: [
                            {value: 953, name: 'Direct Access'},
                          {value: 813, name: 'Mail Marketing'},
                          {value: 369, name: 'Union ad'}
                        ]
                    }
                ]
        };
    
        basicdoughnutChart.setOption(option);
  
  
  
  
  var n = c3.generate({
        bindto: "#spline-chart",
        size: { height: 340 },
        color: { pattern: ["#26C6DA", "#1e88e5"] },
        data: {
            columns: [
                ['data1', 14, 4, 6, 17, 5, 10, 14, 15, 14, 17, 29, 26, 30, 16, 37, 31, 44, 52],
              ['data2', 8, 3, 4, 14, 13, 5, 17, 24, 24, 45, 27, 20, 28, 13, 34, 48, 31, 50]
            ],
            type: "area-spline"
        },
        grid: { y: { show: !0 } }
    });
  
  

    // Callback that creates and populates a data table, instantiates the line region chart, passes in the data and draws it.
    var lineRegionChart = c3.generate({
        bindto: '#line-region',
        size: { height: 350 },
        point: {
            r: 4
        },
        color: {
            pattern: ['#0bb2d4', '#3e8ef7']
        },

        // Create the data table.
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 50, 20, 10, 40, 15, 25]
            ],
            regions: {
                'data1': [{ 'start': 1, 'end': 2, 'style': 'dashed' }, { 'start': 3 }], // currently 'dashed' style only
                'data2': [{ 'end': 3 }]
            }
        },
        grid: {
            y: {
                show: true
            }
        }
    });
  
  
  
  
  
  
  var o = c3.generate({
        bindto: "#simple-xy",
        size: { height: 350 },
        point: { r: 4 },
        color: { pattern: ["#0bb2d4", "#17b3a3"] },
        data: {
            x: "x",
            columns: [
                ['x', 30, 50, 100, 230, 300, 310],
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 130, 300, 200, 300, 250, 450]
            ]
        },
        grid: { y: { show: !0 } }
    });
    setTimeout(function() {
        o.load({
            columns: [
                ['data1', 100, 250, 150, 200, 100, 350]
            ]
        })
    }, 1e3), setTimeout(function() {
        o.load({
            columns: [
                ['data3', 80, 150, 100, 180, 80, 150]
            ]
        })
    }, 1500), setTimeout(function() { o.unload({ ids: "data2" }) }, 2e3)

  });


var options5 = {
          series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
          chart: {
          type: 'bar',
          width: 70,
          height: 50,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 1
          },
        },
    colors:['#ffffff'],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
        };

        var chart5 = new ApexCharts(document.querySelector("#campaign-sent-chart"), options5);
        chart5.render();


var options5 = {
          series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
          chart: {
          type: 'bar',
          width: 70,
          height: 50,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 1
          },
        },
    colors:['#ffffff'],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
        };

        var chart5 = new ApexCharts(document.querySelector("#campaign-sent-chart-2"), options5);
        chart5.render();



        var options5 = {
          series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
          chart: {
          type: 'bar',
          width: 70,
          height: 50,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 1
          },
        },
    colors:['#ffffff'],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
        };

        var chart5 = new ApexCharts(document.querySelector("#campaign-sent-chart-3"), options5);
        chart5.render();




      

        var options = {
          series: [{
          name: 'Net Profit',
          data: [5, 4, 3, 7, 5, 10, 3]
        }, {
          name: 'Revenue',
          data: [3, 2, 9, 5, 4, 6, 4]
        }],
          chart: {
          type: 'bar',
          height: 230
        },
        legend: {
          show: false,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
        };

        var chart = new ApexCharts(document.querySelector("#basic-bar"), options);
        chart.render();



// slimScroll-------------------------------------------------

window.onload = function() {
  // Cache DOM Element
  var scrollable = $('.scrollable');
  
  // Keeping the Scrollable state separate
  var state = {
    pos: {
      lowest: 0,
      current: 0
    },
    offset: {
      top: [0, 0], //Old Offset, New Offset
    }
  }
  //
  scrollable.slimScroll({
    height: '320px',
    width: '',
    start: 'top'
  });
  //
  scrollable.slimScroll().bind('slimscrolling', function (e, pos) {
    // Update the Scroll Position and Offset
    
    // Highest Position
    state.pos.highest = pos !== state.pos.highest ?
      pos > state.pos.highest ? pos : state.pos.highest
    : state.pos.highest;
    
    // Update Offset State
    state.offset.top.push(pos - state.pos.lowest);
    state.offset.top.shift();
    
    if (state.offset.top[0] < state.offset.top[1]) {
      console.log('...Scrolling Down')
      // ... YOUR CODE ...
    } else if (state.offset.top[1] < state.offset.top[0]) {
      console.log('Scrolling Up...')
      // ... YOUR CODE ...
    } else {
      console.log('Not Scrolling')
      // ... YOUR CODE ...
    }
  });
};



// slimScroll------------------------------------------------- End

