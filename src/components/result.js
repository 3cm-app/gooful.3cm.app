import { Grid, Col, Spinner, ResponsiveManager } from 'construct-ui'
import { filter as searchFilter } from '@/components/search.js'
import { default as Item } from '@/components/item.js'
import { shuffle } from '@/util.js'

const styles = {
  container: {
    padding: '10px',
    // minWidth: '100%',
  },
  card: {
    margin: 'auto',
    borderRadius: '10px',
    overflowWrap: 'break-word',
    // whiteSpace: 'nowrap',
    // lineBreak: 'anywhere',
  }
}

const state = {
  ids: [],
  frontmatters: {},
}

export const ctrl = {
  fetchAll: function(cb = () => {}) {
    return m.request({
      url: '/index/ids.json',
      responseType: 'json'
    })
    .then(function(data) {
      state.ids = shuffle(data)
      return Promise.all(data.map(id => ctrl.fetchMatter(id)))
    })
    .then(cb)
    .catch(cb)
  },
  fetchMatter: function(id) {
    const url = `/index/frontmatters/${id}.json`
    return m.request({
      url,
      responseType: 'json'
    })
    .then(function(data) {
      state.frontmatters[id] = data
    })
  },
  shuffle: function() {
    state.ids = shuffle(state.ids)
  }
}

export default function () {
  let itemPerRow = 0
  return {
    oninit: () => ctrl.fetchAll(),
    view: function () {
      if (ResponsiveManager.is('xs')) {
        itemPerRow = 1
      } else if (ResponsiveManager.is('sm')) {
        itemPerRow = 2
      } else if (ResponsiveManager.is('md')) {
        itemPerRow = 2
      } else if (ResponsiveManager.is('lg')) {
        itemPerRow = 3
      } else {
        itemPerRow = 4
      }
      const items = state.ids.filter(id => {
        if (state.frontmatters[id]) {
          return searchFilter([id, state.frontmatters[id]])
        }
        return false
      }).map(id => {
        return [id, state.frontmatters[id]]
      })
      if (items.length < itemPerRow) {
        itemPerRow = items.length
      }
      const span = 12 / itemPerRow
      return (
        <Grid justify="center" align="middle">
          <Spinner
            active={state.ids.length === 0}
            fill={true}
            size="xl"
          ></Spinner>
          {
            items.map(([id, o]) =>
              <Col span={span} fluid={true} style={styles.container}>
                  <Item id={id} data={o}></Item>
              </Col>
            )
          }
        </Grid>
      )
    }
  }
}
