import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/common/ThemeProvider.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
