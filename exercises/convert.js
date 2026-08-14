// Arguments
const revision = process.argv.revision || 'local'
const revdate = new Date().toLocaleDateString("en-US")
const fs = require('node:fs')
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

const htmlPath = 'exercises.html'
const scriptTag = '<script src="./assets/js/exercises-interactions.js"></script>'
const html = fs.readFileSync(htmlPath, 'utf8')

if (!html.includes(scriptTag)) {
    const updatedHtml = html.replace('</body>', `${scriptTag}\n</body>`)
    fs.writeFileSync(htmlPath, updatedHtml, 'utf8')
}