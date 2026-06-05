import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Wrapper from './components/Wrapper.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <App />
  </Wrapper>
)