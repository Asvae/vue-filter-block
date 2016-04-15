# Vue Filter Block
Bundle of several mixins and coomponents aimed to simplify
table sorting in vue.js applications. Take a look at the [demo](http://asva.by/vue-filter-block/demo-page.html).

## Features
1. No duplication (you set filters only in template).
2. State support (local storage).
..* Easily extensible to multiple states.
..* No worries about versioning.
3. Throttling.

## Getting Started
As it's not a library, you don't have to install a thing.

Require the package:
```
var vueFilterBlock = require('vue-filter-block')
```
See the structure:
```
mixins
    child
    parent
components
    filters
        vmRemovableInputFilter
        vmThreeStateCheckboxFilter
        vmPaginatorFilter
        vmSortingOrderFilter
    other
        vmThreeStateCheckbox
        vmPaginator
        vmFilterMixinTest
    test
        vmFilterMixinTest
```

`vueFilterBlock.mixins.parent` is primary mixin for your parent
component.

Let's assume you have a **table** and you want to add
some **filters** on top of it. To sort by name and date, for instance.
The component for parent mixin is one that contains
both **table** and **filters**.

`vueFilterBlock.mixins.child` is used for every filter in **filters**.
Take a look into [components/filters](components/filters) for usage hints.

### Prerequisities
Required **npm** packages:
* `vue`
* `vueify`
* `browserify`

### Installing
```
npm install vue-filter-block
```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

## History
* 15.04.2016: Initial commit

## Credits
* **Yauheni Prakopchyk** - [Asva](https://github.com/Asvae)

## License
This project is licensed under the MIT License