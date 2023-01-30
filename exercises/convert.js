// Load Asciidoctor.js and the reveal.js converter
var asciidoctor = require('@asciidoctor/core')()

// Convert the document 'presentation.adoc' using the reveal.js converter
var options = { safe: 'safe' }
asciidoctor.convertFile('exercises.adoc', options) 