import { Route, Routes } from 'react-router'
import './App.css'
import NewsApiPage from './pages/NewsApiPage'
import HomePage from './pages/HomePage'
import GuardianPage from './pages/GuardianPage'
import NytPage from './pages/Nytpage'
import Navbar from './components/Navbar'

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
    <div className='w-[100%]'>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  )
}

export default App
