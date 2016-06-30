# Vue Filter Block
Bundle of several mixins and coomponents aimed to simplify
table sorting in vue.js applications. Take a look at the [demo](http://asva.by/vue-filter-block/demo-page.html).

## Features
1. No duplication (you set filters only in template).
2. State support (local storage). Version safe, extensible to multiple states.
3. Throttling.

### Installing
```
npm install vue-filter-block
```

## Getting Started
As it's not a plugin, you don't have to install much.
Just require the package when needed:
```
var vueFilterBlock = require('vue-filter-block')
```

## Getting started

Let's assume you have a **table** and you want to add
some **filters** on top of it. To sort by name and date, for instance.
The component for parent mixin is one that contains
both **table** and **filters**.

`vueFilterBlock.mixins.child` is used for every filter in **filters**.
Take a look into [components/filters](components/filters) for usage hints.


## Demo
Yes, we have a [demo](http://asva.by/vue-filter-block/demo-page.html).

## Components
In demo every component has line such as `vm-wrapper-filter`. Just convert it
into camelCase and you have correct import name:
```
import {vmWrapperFilter} from 'asva-vue-filters'
```
Then you can add component to parent:
```
components: {
    vmWrapperFilter
}
```

### Prerequisities
Required **npm** packages:
* `lockr`
* `lodash`
* `vue`

You probably will also require bundling solution such as webpack or browserify.

## TODO
1. Filter group.

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

## History
* 15.04.2016 (0.0.1): Initial commit.
* 26.04.2016 (0.3.0): Add filter wrapper component.
* 11.06.2016 (1.0.0): Add jasmine tests.
* 01.07.2016 (1.4.0): Add filter wrapper component.

## Credits
* **Yauheni Prakopchyk** - [Asva](https://github.com/Asvae)

## License
This project is licensed under the MIT License