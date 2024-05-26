import pkg from '@@/package.json'
import { EmptyState, Button } from 'construct-ui'
import Search from '@/components/search.js'
import { default as Result, ctrl as resultCtrl } from '@/components/result.js'
import Toaster from '@/components/toaster.js'
import GithubCorner from '@/components/github-corner.js'
import ItemDialog from '@/components/item-dialog.js'

const styles = {
  header: {
    minWidth: '100%',
    padding: '20px',
  },
  body: {
    minWidth: '100%',
    padding: '20px',
  },
  footer: {
    minWidth: '100%',
  }
}

const state = {
  loading: false
}

export default function () {
  return {
    view: () => {
      const el = window.document.querySelector('#item-dialog')
      return (
        <>
          <GithubCorner></GithubCorner>
          <EmptyState style={styles.header}
            fill={false}
            icon={[
              <img src="/logo.png" />
            ]}
            header={[
              <h4>{pkg.description}</h4>
            ]}
            content={[
              <Search></Search>,
              <Button style={{
                right: 0,
                position: 'absolute',
                marginRight: '10px',
              }}
                iconRight="refresh-cw"
                loading={state.loading}
                disabled={state.loading}
                rounded={true}
                onclick={() => {
                  state.loading = true
                  resultCtrl.fetchAll(() => {
                    state.loading = false
                  })
                }}
              ></Button>
            ]}
          ></EmptyState>
          <EmptyState style={styles.body}
            fill={false}
            header={<Result></Result>}
            ></EmptyState>
          <EmptyState style={styles.footer}
            fill={false}
            header={<div></div>}
          ></EmptyState>
          <Toaster position="top-end"></Toaster>
          <ItemDialog container={el}></ItemDialog>
          <div id="item-dialog"></div>
        </>
      )
    }
  }
}
