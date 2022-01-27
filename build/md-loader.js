const fs = require('fs')
const path = require('path')
const glob = require("glob")
const matter = require('gray-matter')
const pkg = require('../package.json')
const dataDirPath = path.resolve(__dirname, '..', 'static', 'data')
const indexDirPath = path.resolve(__dirname, '..', 'static', 'index')

function truncateString(str, max, postfix = '...') {
  if (str.length > max) {
    return str.slice(0, max - postfix.length) + postfix
  }
  return str
}
async function genData() {
  return new Promise((resolve, reject) => {
    const result = {
      frontmatters: {
        // [id]: {
        //   ...attrs,
        //   description: '(trimmed description)...',
        //   link: links[0]
        // }
      },
      ids: [], // [id, ...]
      categories: {
        // [category]: {
        //   ids: [id, ...],
        //   count
        // }
      },
      tags: {
        // [tag]: {
        //   ids: [id, ...],
        //   count
        // }
      },
    }
    glob(dataDirPath + '/**/*.md', (err, matches) => {
      if (err) {
        return reject(err)
      }
      for (const f of matches) {
        const p = path.parse(f)
        const id = p.name
        const mdPath = '/' + path.join(path.relative(path.join(__dirname, '..', 'static'), p.dir), p.base)
        const url = `https://${pkg.name}${mdPath}`
        if (result.ids.indexOf(id) > -1) {
          throw new Error(`Duplicate id (${id}) in file (${f})`)
        }
        result.ids.push(id)
        const { data } = matter.read(f)
        result.frontmatters[id] = {
          ...data,
          description: truncateString(data.description, 255),
          url,
          path: mdPath,
        }
        if (result.categories.hasOwnProperty(data.category)) {
          result.categories[data.category].ids.push(id)
          result.categories[data.category].count++
        } else {
          result.categories[data.category] = {
            ids: [id],
            count: 1
          }
        }
        for (const tag of data.tags) {
          if (result.tags.hasOwnProperty(tag)) {
            result.tags[tag].ids.push(id)
            result.tags[tag].count++
          } else {
            result.tags[tag] = {
              ids: [id],
              count: 1
            }
          }
        }
      }
      resolve(result)
    })
  })
}

async function gen() {
  const data = await genData()
  for (const [k, o] of Object.entries(data)) {
    switch(k) {
      case 'frontmatters': {
        const dir = path.join(indexDirPath, k)
        fs.mkdirSync(dir, { recursive: true })
        Object.entries(o).map(([id, v]) => {
          fs.writeFileSync(path.join(dir, id + '.json'), JSON.stringify(v))
        })
        break;
      }
      default:
        fs.writeFileSync(path.join(indexDirPath, k + '.json'), JSON.stringify(o))
    }
  }
}

const main = function (source) {
  gen()
}
main.gen = gen
module.exports = main
