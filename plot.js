function totalruns() {
    fetch('./jsons/team_total.json')
        .then(response => response.json())
        .then(data => {
            let team = [];
            let runs = []
            for (let item in data) {
                team.push(item);
                runs.push(data[item]);
            }
            Highcharts.chart('graph-1', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Total runs scored by teams'
                },
                xAxis: {
                    categories: team,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'total runs',

                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Runs',
                    data: runs
                }]
            });
        })
}

function umpirewala() {
    fetch('./jsons/umpire_origin.json')
        .then(response => response.json())
        .then(data => {
            let country = []
            let value = []
            for (let item in data) {
                country.push(item);
                value.push(data[item]);
            }

            Highcharts.chart('graph-2', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Origin of Umpires in IPL'
                },
                xAxis: {
                    categories: country,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'No. Of Umpire',

                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: '(All seasons)'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Number of Umpire',
                    data: value
                }]
            });
        })
}


function RcbBatsman() {
    fetch('./jsons/top_batsman.json')
        .then(response => response.json())
        .then(data => {
            let batsmen = []
            let runs = []
            for (let item in data) {
                batsmen.push(item);
                runs.push(data[item]);
            }

            Highcharts.chart('graph-3', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Top 5 batsmen from RCB'
                },
                xAxis: {
                    categories: batsmen,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'total runs',

                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 60,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'total runs',
                    data: runs
                }]
            });
        })
}


function matchesByteam() {
    fetch('./jsons/stacked.json')
        .then(response => response.json())
        .then(data => {
            let season = ['2017', '2009', '2013', '2016', '2014', '2012', '2008', '2015', '2010', '2011']
            let matches = []
            for (let item in data) {
                matches.push(data[item]);
            }

            Highcharts.chart('graph-4', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Stacked bar chart for matches played season-wise'
                },
                xAxis: {
                    categories: season
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of Matches Played'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Pune Warriors',
                    data: matches[0]
                },
                {
                    name: 'Royal Challengers Bangalore',
                    data: matches[1]
                }, {
                    name: 'Rising Pune Supergiant',
                    data: matches[2]
                }, {
                    name: 'Delhi Daredevils',
                    data: matches[3]
                }, {
                    name: 'Chennai Super Kings',
                    data: matches[4]
                }, {
                    name: 'Kings XI Punjab',
                    data: matches[5]
                }, {
                    name: 'Mumbai Indians',
                    data: matches[6]
                }, {
                    name: 'Kolkata Knight Riders',
                    data: matches[7]
                }, {
                    name: 'Gujarat Lions',
                    data: matches[8]
                }, {
                    name: 'Rajasthan Royals',
                    data: matches[9]
                }, {
                    name: "Sunrisers Hyderabad",
                    data: matches[10]
                }, {
                    name: "Kochi Tuskers Kerala",
                    data: matches[11]
                }, {
                    name: "Deccan Chargers",
                    data: matches[12]
                }]
            });
        })
}
totalruns()
umpirewala()
RcbBatsman()
matchesByteam()
