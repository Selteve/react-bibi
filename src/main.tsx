import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import router from '@/router/index.tsx'
import { Provider } from 'react-redux'
import store from '@/store'
import '../theme.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} fallbackElement={<App />} />
  </Provider>
)
