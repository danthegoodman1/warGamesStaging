module.exports = {
    'registerUser': {
        userName: {
            'in': ['body'],
            'isString': {
                'errorMessage': 'API Key is not string'
            },
            'matches': {
                'errorMessage': 'API Key doesn\'t match expected regex',
                'options': '^[a-zA-Z0-9]{32}$'
            },
            'isEmpty': { 
                'negated': true,
                'errorMessage': 'API Key is empty'
            },
            'errorMessage': 'Missing apiKey'
        },
        firstName: {

        },
        lastName: {

        },
        password: {

        },
        email: {

        }
    }
}
