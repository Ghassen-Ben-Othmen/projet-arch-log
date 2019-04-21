const mapper = (code) => {
    city_code = code.toString().slice(0,2);
    switch(city_code){
        case '10':
            return 'Nabeul';
        case '20':
            return 'Tunis';
        case '30':
            return 'Bizerte'
        case '40':
            return 'Zaghouan';
        case '50':
            return 'Beja';
        case '60':
            return 'Sousse';
        case '70':
            return 'Sfax';
        case '80':
            return 'Monastir';
        case '90':
            return 'Tataouin';
        case '11':
            return 'Jandouba';
        case '12':
            return 'Gafsa';
        case '13':
            return 'Kassrine';
        case '14':
            return 'Ariana';
        case '15':
            return 'Ben Arous';
        case '16':
            return 'Medinine';
        case '17':
            return 'Gabes';
        case '18':
            return 'Kairouan';
        case '19':
            return 'Kebili';
        case '21':
            return 'Kef';
        case '22':
            return 'Mahdia';
        case '23':
            return 'Manouba';
        case '24':
            return 'Sidi Bouzid';
        case '25':
            return 'Siliana';
        case '26':
            return 'Tozeur';
        default:
            return 'None';
    }
}

module.exports = mapper;