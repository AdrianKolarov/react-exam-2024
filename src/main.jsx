
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import  store  from "./store/store"
import  AuthProvider from "./components/AuthProvider.jsx"


ReactDOM.createRoot(document.getElementById('root')).render(

<Provider store={store}>
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
</Provider>
  ,
)
