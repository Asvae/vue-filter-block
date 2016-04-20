var elixir = require('laravel-elixir')

elixir(function (mix) {
    mix.browserify('./examples/demo-bundle.js', 'public/index.js')

    mix.copy('./examples/demo-page.html', 'public/demo-page.html')
});
