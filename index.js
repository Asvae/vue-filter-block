var components = require('./components/components')

module.exports = {
    mixins: {
        child: require('./mixins/child'),
        parent: require('./mixins/parent'),
    },
    components,
}

