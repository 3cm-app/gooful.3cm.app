import { Dialog, Spinner } from 'construct-ui'

const styles = {
}

const state = {
  src: null,
  isOpen: false,
  loading: true
}

export const ctrl = {
  open: function(path) {
    state.src = `/data.html#${path}`
    state.isOpen = true
  }
}

export default function () {
  return {
    view: function ({ attrs }) {
      return (
        <Dialog
          portalAttrs={{ ...attrs }}
          basic={true}
          closeOnEscapeKey={false}
          closeOnOutsideClick={true}
          content={
            <>
              <Spinner
                active={state.loading}
                fill={true}
                size="xl"
              ></Spinner>
              <iframe src={state.src} onload={() => state.loading = false}></iframe>
            </>
          }
          hasBackdrop={true}
          isOpen={state.isOpen}
          onClose={() => {
            state.isOpen = false
            state.src = null
            state.loading = true
          }}
        ></Dialog>
      )
    }
  }
}
