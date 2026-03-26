import { Outlet } from 'react-router-dom'
import { Header } from './_layouts'
import { Footer } from './_layouts'
import { Modalleft } from './_layouts'

export default function Main() {
  return (
    <div className="overflow-hidden pb-8">
      <Header />
      <Outlet />
      <Footer />
      <Modalleft />
    </div>
  )
}
