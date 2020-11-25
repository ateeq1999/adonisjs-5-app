const mix = require('laravel-mix')

// NOTE: Don't remove this, Because it's the default public folder path on AdonisJs
mix.setPublicPath('public')

// Add your assets here
mix.postCss('resources/css/styles.css', 'public/css', [require('tailwindcss')])
mix.js('resources/js/app.js', 'public/js')
