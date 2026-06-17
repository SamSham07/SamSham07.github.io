import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './layouts/AppShell'
import { CareerPage } from './pages/CareerPage'
import { HomePage } from './pages/HomePage'
import { ShowcasePage } from './pages/ShowcasePage'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="career" element={<CareerPage />} />
          <Route path="expert/:slug" element={<ShowcasePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
