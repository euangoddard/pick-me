(function ($) {
    'use strict';
    
    var PEOPLE = [
        'Alice',
        'Bob',
        'Claire',
        'Darren',
        'Elizabeth',
        'Farah',
        'Gilberto',
        'Harriet',
        'Iris',
        'Johannes',
        'Kelvin',
        'Mohammed',
        'Norbert',
        'Olivia',
        'Peter',
        'Quentin',
        'Roberta',
        'Sid',
        'Tobias',
        'Ursula',
        'Victoria',
        'Wendy',
        'Xavier',
        'Yolanda',
        'Zack',
    ];
    
    var current_person = null;
    
    $(function () {
        $('button').on('click', change_person);
    });
    
    var change_person = function () {
        var person = get_new_person_at_random();
        
        for (var i=0; i<12; i++) {
            $('.cog:eq(' + i + ')').attr('class', 'cog space');
        }
        
        for (var i=0; i<person.length; i++) {
            var letter = person.substr(i, 1).toUpperCase();
            $('.cog:eq(' + i + ')').addClass('letter-' + letter);
        }
    };
    
    var get_new_person_at_random = function () {
        var person;
        while (person = pick_person_at_random()) {
            if (person !== current_person) {
                current_person = person;
                break;
            }
        }
        return person;
    };
    
    var pick_person_at_random = function () {
        var person_count = PEOPLE.length;
        var random_index = Math.round(Math.random() * (person_count - 1));
        return PEOPLE[random_index];
    };
})(window.jQuery);
