import {namegen} from './lib/namegen.js';

var button = document.querySelector('.nm-Main_go');
var results = document.querySelector('.nm-Main_results');

namegen.init();

button.addEventListener('click', function () {
	var format = document.querySelector('[name=format]:checked').value;
	var number = document.querySelector('.nm-Main_number').value;
	var sex = document.querySelector('[name=sex]:checked').value;

	setResults(prepareResults(namegen.generate({number: number || 20, sex: sex}), format));
});

function prepareResults(data, format) {
	var results = [];
	if (data.length) {
		data.forEach(function (person) {
			var formatted = '';

			if (format === 'full') {
				formatted = person.last + ' ' + person.first + ' ' + person.middle;
			} else if (format === 'short') {
				formatted = person.last + ' ' + person.first.charAt(0) + '. ' + person.middle.charAt(0) + '.';
			}

			results.push(formatted);
		});
	}
	return results;
}

function setResults(data) {
	if (data.length) {
		results.value = data.join('\n');
	}
}
