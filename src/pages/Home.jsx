import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <BestSellers />
      <OurPolicy />
      <NewsLetter />
    </div>
  )
}

export default Home