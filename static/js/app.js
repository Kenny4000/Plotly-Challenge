

function init() {
	var data = d3.json("samples.json").then(function (data) {
		//console.log(data);
		names = data.names;
		metadata = data.metadata;
		samples = data.samples;

		var dataset = d3.select("#selDataset");

		names.forEach((element) => {
			dataset.append("option").text(element);
		});
		var value = dataset.property("value");
		console.log(value);

		//Attach Personal Data for each sample.
		var metadata_to_be_filled = metadata.filter(
			(item) => item.id === parseInt(value)
		);

		//Converted samples to array

		var metadata_final = Object.entries(metadata_to_be_filled[0]);
		var sample_metadata = d3.select("#sample-metadata");
		sample_metadata.html("");

		metadata_final.forEach((element) => {
			sample_metadata.append("h6").text(element[0] + ":" + element[1]);
		});

		//Create a Bar graph.
		var samples_to_be_filled = samples.filter((item) => item.id === value);
		var samples_final = samples_to_be_filled[0];

		var id = samples_final["id"];
		var values = samples_final["sample_values"].slice(0, 10).reverse();
		var labels = samples_final["otu_ids"].slice(0, 10).reverse();
		var hover_text = samples_final["otu_labels"].slice(0, 10);

		trace = {
			type: "bar",
			x: values,
			y: labels.map((item) => {
				return "OTP" + item;
			}),
			orientation: "h",
			hovertext: hover_text.map((item) => {
				return item;
			}),


		};
		data = [trace];
		layout = {
			title: "Bar Chart for ID:" + id,
			font: { color: "#800000", family: "Times", size: 18 },
		};

		Plotly.newPlot("bar", data, layout);


		//Create Bubble Chart

		var values_ = samples_final["sample_values"];
		var labels_ = samples_final["otu_ids"];
		var hover_text_ = samples_final["otu_labels"];
		trace = {
			x: labels_,
			y: values_,
			mode: "markers",
			text: hover_text_,
			marker: {
				size: values_,
				color: labels_,
			},
		};
		data = [trace];
		layout = {
			title: "Bubble Chart for ID:" + id,
			font: {color: "#800000", family: "Times", size: 18 },
		};
		Plotly.newPlot("bubble", data, layout);

		// Create Plotly Gauge Chart

		console.log(metadata_to_be_filled);
		trace = {
			domain: { x: [0, 9], y: [0, 9] },
			value: metadata_to_be_filled[0].wfreq,
			title: { text: "Weekly Scrubs " },
			type: "indicator",
			mode: "gauge+number",
			gauge: {
				axis: { range: [null, 9] },
				steps: [
					{ range: [0, 1], color: "#7CFC00" },
					{ range: [1, 2], color: "#7FFF00" },
					{ range: [2, 3], color: "#00FF00" },
					{ range: [3, 4], color: "#32CD32" },
					{ range: [4, 5], color: "#3CB371" },
					{ range: [5, 6], color: "#2E8B57" },
					{ range: [6, 7], color: "#228B22" },
					{ range: [7, 8], color: "#008000" },
					{ range: [8, 9], color: "#006400" }

				],
				threshold: {
					line: { color: "#800000", width: 4 },
					thickness: 0.75,
					value: 9,
				},
			},
		};
		data = [trace];
		layout = {
			title: "Weekly Washing Frequency",
			font: { color: "#800000", family: "Times", size: 18 },
		};
		Plotly.newPlot("gauge", data, layout);
	});
}

var data = d3.json("samples.json").then(function (data) {
	
	//Advanced//
	
	//console.log(data);

	names = data.names;
	metadata = data.metadata;
	samples = data.samples;
	Washing_freq = data.metadata.map((item) => item.wfreq);
	Washing_freq = Washing_freq.map((item) => {
		if (item === null) return 0;
		else return item;
	});
	console.log(Washing_freq);

	var dataset = d3.select("#selDataset");

	names.forEach((element) => {
		dataset.append("option").text(element);
	});
	dataset.on("change", optionChanged);
	function optionChanged() {
		var value = dataset.property("value");
		console.log(value);

		////Attach Personal Data for each sample.

		var metadata_to_be_filled = metadata.filter(
			(item) => item.id === parseInt(value)
		);
		////Converted samples to array

		var metadata_final = Object.entries(metadata_to_be_filled[0]);
		var sample_metadata = d3.select("#sample-metadata");
		sample_metadata.html("");

		metadata_final.forEach((element) => {
			sample_metadata.append("h6").text(element[0] + ":" + element[1]);
		});

		////Create a Bar graph.

		var samples_to_be_filled = samples.filter((item) => item.id === value);
		var samples_final = samples_to_be_filled[0];

		var id = samples_final["id"];
		var values = samples_final["sample_values"].slice(0, 10).reverse();
		var labels = samples_final["otu_ids"].slice(0, 10).reverse();
		var hover_text = samples_final["otu_labels"].slice(0, 10);

		trace = {
			type: "bar",
			x: values,
			y: labels.map((item) => {
				return "OTP" + item;
			}),
			orientation: "h",

			hovertext: hover_text.map((item) => {
				return item;
			}),
		};
		data = [trace];
		layout = {
			title: "Bar chart for ID:" + id,
			font: { color: "#800000", family: "Times", size: 18 },
		};
		Plotly.newPlot("bar", data, layout);

		//Create Bonus Bubble chart

		var values_ = samples_final["sample_values"];
		var labels_ = samples_final["otu_ids"];
		var hover_text_ = samples_final["otu_labels"];
		trace = {
			x: labels_,
			y: values_,
			mode: "markers",
			text: hover_text_,
			marker: {
				size: values_,
				color: labels_,
			},
		};
		data = [trace];
		layout = {
			title: "Bubble Chart for ID:" + id,
			font: { color: "#800000", family: "Times", size: 18 },
		};
		Plotly.newPlot("bubble", data, layout);

		// Create Plotly Gauge Chart


		console.log(metadata_to_be_filled);
		
		trace = {
			domain: { x: [0, 9], y: [0, 9] },
			value: metadata_to_be_filled[0].wfreq,
			title: { text: "Scrubs per week" },
			type: "indicator",
			mode: "gauge+number",
			gauge: {
				axis: { range: [null, 9] },
				steps: [
					{ range: [0, 1], color: "#7CFC00" },
					{ range: [1, 2], color: "#7FFF00" },
					{ range: [2, 3], color: "#00FF00" },
					{ range: [3, 4], color: "#32CD32" },
					{ range: [4, 5], color: "#3CB371" },
					{ range: [5, 6], color: "#2E8B57" },
					{ range: [6, 7], color: "#228B22" },
					{ range: [7, 8], color: "#008000" },
					{ range: [8, 9], color: "#006400" }

				],
				threshold: {
					line: { color: "#800000", width: 5.0 },
					thickness: 1.0,
					value: 9,
				},
			},
		};
		data = [trace];
		layout = {
			title: "Weekly Washing frequency",
			font: { color: "#800000", family: "Times", size: 18 },
			textSize: "bold",
		};
		Plotly.newPlot("gauge", data, layout);
	}
});

init();



