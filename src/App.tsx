import { Route, Routes } from 'react-router'
import './App.css'
import NewsApiPage from './pages/NewsApiPage'
import HomePage from './pages/HomePage'
import GuardianPage from './pages/GuardianPage'
import NytPage from './pages/Nytpage'

function App() {


  const routes = [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/news-api',
      element: <NewsApiPage />
    },
    {
      path: '/guardian-news',
      element: <GuardianPage />
    },
    {
      path: '/nyt-news',
      element: <NytPage />
    }
  ]

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default App
