import { TagInput, Tag, Icon, Icons } from 'construct-ui'
import Toaster from '@/components/toaster.js'

const state = {
  data: [],
  prevKeyCode: null,
  prevToastKey: null,
  prev8remove: false,
}

export const ctrl = {
  warning: msg => {
    state.prevToastKey = Toaster.show({
      message: msg,
      icon: Icons.ALERT_TRIANGLE,
      intent: 'warning',
    })
  },
  add: v => {
    const tag = v.trim().toLowerCase()
    if (tag) {
      if (state.data.indexOf(tag) < 0) {
        state.data.push(tag)
      } else {
        state.warning(`Tag exist: ${tag}`)
      }
    }
  },
  remove: tag => {
    const i = state.data.indexOf(tag)
    state.data.splice(i, 1)
  },
  removeLast: () => {
    state.data.pop()
  },
  clear: () => {
    state.data = []
  },
  handleKeyDown: e => {
    if (
      state.data.length > 0 &&
      e.keyCode === 8
    ) {
      if (
        e.keyCode === state.prevKeyCode &&
        !state.prev8remove
      ) {
        ctrl.removeLast()
        state.prev8remove = true
      } else {
        state.prev8remove = false
      }
    }
    state.prevKeyCode = e.keyCode
  }
}

export function filter(row) {
  if (state.data.length === 0) {
    return true
  }
  const id = row[0]
  const o = row[1]
  top: for (const searchKey of state.data) {
    const re = new RegExp(searchKey, 'i')
    if (id.match(re)) {
      continue
    }
    if (o.title.match(re)) {
      continue
    }
    if (o.description.match(re)) {
      continue
    }
    for (const tag of o.tags) {
      if (tag.includes(searchKey)) {
        continue top
      }
    }
    return  false
  }
  return true
}

export default function () {
  return {
    view: function () {
      return (
        <>
          <TagInput
            inputAttrs={{
              onkeydown: ctrl.handleKeyDown
              // oninput: e => console.log(e.target.value)
            }}
            fluid={true}
            tags={state.data.map(tag => {
              return (
                <Tag
                  label={tag}
                  onRemove={() => ctrl.remove(tag)}
                ></Tag>
              )
            })}
            intent="primary"
            onAdd={ctrl.add}
            intent="primary"
            contentLeft={<Icon name="search" intent="primary"></Icon>}
            contentRight={state.data.length ? 
              <Icon
                // name={Icons.X}
                onclick={ctrl.clear}
              ></Icon>
              : <></>}
          ></TagInput>
        </>
      )
    }
  }
}
