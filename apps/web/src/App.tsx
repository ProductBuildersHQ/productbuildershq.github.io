import { Routes, Route } from 'react-router'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Frameworks from '@/pages/Frameworks'
import FrameworkDetail from '@/pages/FrameworkDetail'
import CaseStudies from '@/pages/CaseStudies'
import CaseStudyDetail from '@/pages/CaseStudyDetail'
import Papers from '@/pages/Papers'
import About from '@/pages/About'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="frameworks" element={<Frameworks />} />
        <Route path="frameworks/:slug" element={<FrameworkDetail />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="papers" element={<Papers />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}
