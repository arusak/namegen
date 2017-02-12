  window.onload = function(){
    var button = document.querySelector('.nm-Main_go');
    var results = document.querySelector('.nm-Main_results');

    prepareData();

    button.addEventListener('click', function(){
      var format = document.querySelector('[name=format]:checked').value;
      var number = document.querySelector('.nm-Main_number').value;

      setResults(prepareResults(generate({number: number || 20}), format));
    });

    function generate(options){
      var data = [];
      var person;
      var sex;

      var sexSelected = document.querySelector('[name=sex]:checked').value;

      for (var i = 0; i < options.number; i++) {
        person = {};

        sex = sexSelected || (Math.random() < 0.5 ? 'males' : 'females');

        person.last = generateName('last', sex);
        person.first = generateName('first', sex);
        person.middle = generateName('middle', sex);

        data.push(person);
      }

      return data;
    }

    function generateName(which, sex) {
      var haystack = dictionary[sex][which];
      var p
      var randomItemNumber;
      var needle;

      while (!needle) {
        p = Math.random() / 100;
        randomItemNumber = Math.floor(Math.random() * haystack.length);
        console.log(p, haystack[randomItemNumber].c, haystack.total, haystack[randomItemNumber].c / haystack.total);
        if (haystack[randomItemNumber].c / haystack.total > p) {
          needle = haystack[randomItemNumber];
        }
      }


      return needle.n;
    }

    function prepareResults(data, format) {
      var results = [];
      if (data.length) {
        data.forEach(function(person){
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

    function setResults(data){
      if (data.length) {
        results.value = data.join('\n');
      }
    }

    function prepareData(){
      Object.keys(dictionary).forEach(function(key1){
        var level1 = dictionary[key1];
        Object.keys(level1).forEach(function(key2){
          var level2 = level1[key2];
          countDictionaryTotal(level2);
        });
      });
    }

    function countDictionaryTotal(dictionary){
      dictionary.total = dictionary.reduce(function(total, cur){
        total += cur.c;
        return total;
      }, 0);
    }
  };
