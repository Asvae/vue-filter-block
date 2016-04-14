var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');

elixir(function (mix) {
    mix.browserify('./examples/demo-bundle.js', 'public/index.js');

    mix.copy('./examples/demo-page.html', 'public/demo-page.html');
});
