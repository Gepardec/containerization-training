// Arguments
const revision = process.argv.revision || 'local'
const revdate = new Date().toLocaleDateString("en-US")
// Load Asciidoctor.js and the reveal.js converter
var asciidoctor = require('@asciidoctor/core')()

// Convert the document 'presentation.adoc' using the reveal.js converter
var options = { 
    safe: 'safe',
    attributes: {
        linkcss: true,
        revnumber: revision,
        revdate: revdate
    }
}
asciidoctor.convertFile('exercises.adoc', options) 