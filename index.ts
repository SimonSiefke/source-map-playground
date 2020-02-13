import * as fs from 'fs'
import MagicString from 'magic-string'
var s = new MagicString('problems = 99\nconsole.log("hello world")')

s.overwrite(0, 8, 'answer')
s.toString() // 'answer = 99'

s.overwrite(11, 13, '42') // character indices always refer to the original string
s.toString() // 'answer = 42'

s.prepend('var ').append(';') // most methods are chainable
s.toString() // 'var answer = 42;'

var map = s.generateMap({
  source: 'source.js',
  file: 'converted.js.map',
  includeContent: true,
}) // generates a v3 sourcemap

fs.writeFileSync(
  'converted.js',
  s.toString() + '\n//# sourceMappingURL=' + 'converted.js.map',
)
fs.writeFileSync('converted.js.map', map.toString())
