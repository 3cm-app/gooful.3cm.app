import IndexPage from '@/pages/index.js'

export const Routes = {
  '/splash': {
    render: function () {
      return (
        <></>
      )
    }
  },
  '/index': {
    onmatch () {
      return new Promise((resolve/*, reject */) => {
        setTimeout(function () {
          resolve()
        }, 2000)
      }).catch((/* e */) => {
        return (
          <IndexPage></IndexPage>
        )
      })
    },
    render (vnode) {
      if (typeof vnode.tag === 'function') {
        return vnode
      }
      return (
        <IndexPage></IndexPage>
      )
    }
  }
}

export const DefaultRoute = '/index'
