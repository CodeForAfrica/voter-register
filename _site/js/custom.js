jQuery(function($) {
	$(document).ready(function() {

		county = 'nairobi'
		FusionCharts.ready(function(){
			id = translateIDtoTitle(county)
			new_KEMAP_DATA = updateMapData(id)
			draw_map(new_KEMAP_DATA)
			get_data_and_draw_graphs(county)
			
		});

	});
});

COUNTY_ARR = [["KE-28","Mombasa"],["KE-19","Kwale"],["KE-39","Taita-Taveta"],["KE-94","Kilifi"],["KE-21","Lamu"],["KE-23","Makueni"],["KE-30","Nairobi"],["KE-10","Kajiado"],["KE-22","Machakos"],["KE-13","Kiambu"],["KE-27","Migori"],["KE-29","Muranga"],["KE-16","Kisii"],["KE-33","Narok"],["KE-34","Nyamira"],["KE-02","Bomet"],["KE-08","Homa-Bay"],["KE-06","Embu"],["KE-15","Kirinyaga"],["KE-18","Kitui"],["KE-40","Tana-River"],["KE-36","Nyeri"],["KE-17","Kisumu"],["KE-12","Kericho"],["KE-41","Tharaka-Nithi"],["KE-35","Nyandarua"],["KE-45","Vihiga"],["KE-31","Nakuru"],["KE-38","Siaya"],["KE-32","Nandi"],["KE-26","Meru"],["KE-04","Busia"],["KE-20","Laikipia"],["KE-11","Kakamega"],["KE-44","Uasin-Gishu"],["KE-07","Garissa"],["KE-03","Bungoma"],["KE-42","Trans-Nzoia"],["KE-05","Elgeyo-Marakwet"],["KE-01","Baringo"],["KE-09","Isiolo"],["KE-37","Samburu"],["KE-47","West-Pokot"],["KE-46","Wajir"],["KE-24","Mandera"],["KE-25","Marsabit"],["KE-43","Turkana"]]
KEMAP_DATA = [{id: 'KE-01', value: 0}, {id: 'KE-02', value: 0}, {id: 'KE-03', value: 0}, {id: 'KE-04', value: 0}, {id: 'KE-05', value: 0}, {id: 'KE-06', value: 0}, {id: 'KE-07', value: 0}, {id: 'KE-08', value: 0}, {id: 'KE-09', value: 0}, {id: 'KE-10', value: 0}, {id: 'KE-11', value: 0}, {id: 'KE-12', value: 0}, {id: 'KE-13', value: 0}, {id: 'KE-94', value: 0}, {id: 'KE-15', value: 0}, {id: 'KE-16', value: 0}, {id: 'KE-17', value: 0}, {id: 'KE-18', value: 0}, {id: 'KE-19', value: 0}, {id: 'KE-20', value: 0}, {id: 'KE-21', value: 0}, {id: 'KE-22', value: 0}, {id: 'KE-23', value: 0}, {id: 'KE-24', value: 0}, {id: 'KE-25', value: 0}, {id: 'KE-26', value: 0}, {id: 'KE-27', value: 0}, {id: 'KE-28', value: 0}, {id: 'KE-29', value: 0}, {id: 'KE-30', value: 0}, {id: 'KE-31', value: 0}, {id: 'KE-32', value: 0}, {id: 'KE-33', value: 0}, {id: 'KE-34', value: 0}, {id: 'KE-35', value: 0}, {id: 'KE-36', value: 0}, {id: 'KE-37', value: 0}, {id: 'KE-38', value: 0}, {id: 'KE-39', value: 0}, {id: 'KE-40', value: 0}, {id: 'KE-41', value: 0}, {id: 'KE-42', value: 0}, {id: 'KE-43', value: 0}, {id: 'KE-44', value: 0}, {id: 'KE-45', value: 0}, {id: 'KE-46', value: 0}, {id: 'KE-47', value: 0}]

function draw_map(data) {
	var map = AmCharts.makeChart( "chartdiv", {
	  type: "map",
	  "theme": "none",

	  colorSteps: 10,

	  dataProvider: {
		map: "kenyaHigh",
		mapURL: "/lib/3/maps/svg/kenyaHigh.svg",
		areas: data
	  },

	  areasSettings: {
		autoZoom: false,
		"color": "#187db4",
		"selectedColor": "#ffe84a",
		"unselectedColor": "#187db4",//#ffe84a",
		"colorSolid": "#ffe84a",
		"selectable": true,
		"outlineColor": "#fff",
		"rollOverOutlineColor": "#ffe84a",
		"balloonText": "[[title]]: <strong>[[value]]</strong>"
	  },

	  "export": {
		"enabled": false
	  },

	  zoomable: false,
	  zoomControl: { zoomControlEnabled: false, panControlEnabled: false, homeButtonEnabled: false},
	});
	map.addListener("clickMapObject", function (event) {
		county = translateTitletoID(event.mapObject.id);
		updateMapData(translateIDtoTitle(county))
		get_data_and_draw_graphs(county)
	});
}

function translateIDtoTitle(name) {
    name = name.toLowerCase();
    for (k in COUNTY_ARR) {
        j = COUNTY_ARR[k];
        if (name == j[1].toLowerCase()) {
            return j[0];
        }
    }
}

function translateTitletoID(ID) {
    name = name.toLowerCase();
    for (k in COUNTY_ARR) {
        j = COUNTY_ARR[k];
        if (ID == j[0]) {
            return j[1].toLowerCase();
        }
    }
}

function updateMapData(id) {
	V = []
    for (k in KEMAP_DATA) {
        j = KEMAP_DATA[k];
        V.push({'id': j['id'], 'value':0} )
        if (j['id'] == id) {
            V.push({'id': j['id'], 'value': 100} )
        } else {
			V.push({'id': j['id'], 'value':0} )
		}
        KEMAP_DATA[k] = j
    }
    return V
}

function setMapData(data, id, j) {
    data[k] = {'id': id, 'value':j}
}

function draw_bars(id, height, dataset) {
	var fusioncharts = new FusionCharts({
		type: 'mscolumn2d',
		renderAt: id,
		width: '500',
		height: height,
		dataFormat: 'json',
		dataSource: {
				"chart": {"caption": "Registered Voters","xAxisname": "Age groups","yAxisName": "Voters","numberPrefix": "","plotFillAlpha": "80","paletteColors": "#0075c2,#1aaf5d","baseFontColor": "#333333","baseFont": "Helvetica Neue,Arial","captionFontSize": "14","subcaptionFontSize": "14","subcaptionFontBold": "0","showBorder": "0","bgColor": "#ffffff","showShadow": "0","canvasBgColor": "#ffffff","canvasBorderAlpha": "0","divlineAlpha": "100","divlineColor": "#999999","divlineThickness": "1","divLineIsDashed": "1","divLineDashLen": "1","divLineGapLen": "1","usePlotGradientColor": "0","showplotborder": "0","valueFontColor": "#ffffff","placeValuesInside": "1","showHoverEffect": "1","rotateValues": "1","showXAxisLine": "1","xAxisLineThickness": "1","xAxisLineColor": "#999999","showAlternateHGridColor": "0","legendBgAlpha": "0","legendBorderAlpha": "0","legendShadow": "0","legendItemFontSize": "10","legendItemFontColor": "#666666"
				},
				"categories": [
					{
						"category": [
							{
								"label": "18-24"
							},
							{
								"label": "25-34"
							},
							{
								"label": "35-44"
							},
							{
								"label": "45-54"
							},
							{
								"label": "55+"
							},
						]
					}
				],
				"dataset": dataset
			}
		});
	fusioncharts.render();
}

function get_data_and_draw_graphs(county) {
	$('#county').html('')
	$('#constituencies').html('')
	data = REG_DATA[county]
	$('#county').html(draw_section_template(data['name'], data['name'], data['total'], 0, data['male'], data['female'], data['female-median-age'] ,data['female-mode-age'],data['female-mean-age'], data['male-median-age'] ,data['male-mode-age'],data['male-mean-age'] ))
	draw_bars(data['name'], 350, data['dataset'])
	str = ''
	str += '<table class="table table-striped table-bordered"><thead><th>Constituency</th><th>Male</th><th>Female</th><th>Total</th><th>Mean Age(Male)</th><th>Mean Age(Female)</th></thead>'
	str += '<tbody>'
	for (k in data['constituencies']) {
		v = data['constituencies'][k]
		for (f in v){
			f = v[f]
			str += draw_table_view(f['name'], f['name'], f['total'], 0, f['male'], f['female'], f['female-median-age'] ,f['female-mode-age'],f['female-mean-age'], f['male-median-age'] ,f['male-mode-age'],f['male-mean-age'])
		}
	}
	str +='</tbody></table>'
	$('#constituencies').html(str)
}

function draw_section_template(id, title, total, pop, male, female, female_mean_age, female_mode_age, female_mean_age, male_mean_age, male_mode_age, male_mean_age) {
	str = ''
	str += '<div class="col-md-12">'
	str += '<div class="col-md-12 title">'+ title +'</div>'
	str += '<div class="col-md-12 total"><span>'+ commaseparatenumbers(total) +'</span> voters</div>'
	//str += '<div class="col-md-12"><span class="fraction">70%</span><span> of population</span><span class="pop">432,322</span></div>'
	str += '<div class="col-md-6 nums">Male:  <span>'+ commaseparatenumbers(male) +'</span></div>'
	str += '<div class="col-md-6 nums">Female:  <span>'+ commaseparatenumbers(female) +'</span></div>'
	str += '<div class="col-md-6 num">Female Mean Age:  <span>'+ female_mean_age +'</div>'
	str += '<div class="col-md-6 num">Male Mean Age:  <span>'+ male_mean_age +'</span></div>'
	str += '<div class="col-md-12" id="'+ id +'"></div>'
	str += '</div>'
	return str
}

function draw_table_view(id, title, total, pop, male, female, female_mean_age, female_mode_age, female_mean_age, male_mean_age, male_mode_age, male_mean_age) {
	title = title.trim()
	str = '<tr><td>'+ title[0].toUpperCase() + title.substring(1) +'</td>'
	str += '<td class="text-center">'+ commaseparatenumbers(male) +'</td>'
	str += '<td class="text-center">'+ commaseparatenumbers(female) +'</td>'
	str += '<td class="text-center">'+ commaseparatenumbers(total) +'</td>'
	str += '<td class="text-center">'+ male_mean_age +'</td>'
	str += '<td class="text-center">' + female_mean_age + '</td></tr>'
	return str
}

function commaseparatenumbers(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function get_all_median(gender) {
	data = KEMAP_DATA
	for (k in REG_DATA) {
		if (gender == 'F') {
			v = REG_DATA[k]['female-median-age']
		} else  {
			v = REG_DATA[k]['male-median-age']
		}
		s = translateIDtoTitle(k)
		setMapData(data, s, v)
	}
	draw_map(data)
}
