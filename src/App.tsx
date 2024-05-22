import OtpPage from './Page/OtpPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OtpPage />} />
          <Route path="/success" element={<div>Home</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
