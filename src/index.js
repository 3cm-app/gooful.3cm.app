import 'construct-ui/lib/index.css'
import './components/github-corner.css'
import './components/item-dialog.css'
import { ResponsiveManager } from 'construct-ui';
import { Routes, DefaultRoute } from '@/routes.js'

if (module.hot) {
  module.hot.accept()
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

m.route(document.querySelector('#root'), DefaultRoute, Routes)

ResponsiveManager.initialize({
  xs: '(max-width: 575.98px)',
  sm: '(min-width: 576px) and (max-width: 767.98px)',
  md: '(min-width: 768px) and (max-width: 991.98px)',
  lg: '(min-width: 992px) and (max-width: 1199.98px)',
  xl: '(min-width: 1200px)'
})
