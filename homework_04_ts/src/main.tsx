import ReactDOM from 'react-dom/client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { App } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
// ! - I know what I do
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
