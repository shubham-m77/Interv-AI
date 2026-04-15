import Header from '../components/home/Header'
import TrustedBy from '../components/home/TrustedBy'
import FeatureBento from '../components/home/FeatureBento'
import HowItWorks from '../components/home/HowItWorks'
import HomeCta from '../components/home/HomeCta'

const Home = () => {
  return (
    <main className="space-y-20">
      <Header />
      <TrustedBy />
      <FeatureBento />
      <HowItWorks />
      <HomeCta />
    </main>
  )
}

export default Home