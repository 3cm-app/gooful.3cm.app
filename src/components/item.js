import { Tag, Card, Icon, Tooltip } from 'construct-ui'
import { ctrl as dialogCtrl } from '@/components/item-dialog.js'
import { ctrl as searchCtrl } from '@/components/search.js'

const styles = {
  card: {
    margin: 'auto',
    borderRadius: '10px',
    overflowWrap: 'break-word',
    // whiteSpace: 'nowrap',
    // lineBreak: 'anywhere',
  },
  cate: {
    right: 0,
    position: 'absolute'
  }
}

const state = {
}

const ctrl = {
}

export default function () {
  return {
    view: function ({ attrs: { id, data } }) {
      return (
        <Card key={id} interactive={true} elevation={2} style={styles.card} >
          <h5 class="cui-text-disabled" style={{position: 'relative'}}>{id}
            <Tag rounded={true} size="xs" label={data.category} style={styles.cate}
              onclick={() => {
                searchCtrl.clear()
                searchCtrl.add(data.category)
              }}
            ></Tag>
          </h5>
          <h2 style={{
            position: 'relative'
          }}>
            {data.title}
            <Tooltip
              content={data.links[0]}
              trigger={
                <Icon name="external-link" style={{
                  right: 0,
                  height: '100%',
                  position: 'absolute',
                  alignItems: 'center',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
                  onclick={() => {
                    if (data.links[0]) {
                      window.open(data.links[0])
                    }
                  }}
                ></Icon>
              }
            ></Tooltip>
          </h2>
          <h4 onclick={() => dialogCtrl.open(data.path)}>{data.description}</h4>
          <div>
            {
              data.tags.map(tag => {
                return (
                  <Tag rounded={true} size="xs" label={tag}
                    onclick={() => {
                      searchCtrl.clear()
                      searchCtrl.add(tag)
                    }}
                  ></Tag>
                )
              })
            }
          </div>
        </Card>
      )
    }
  }
}
