import FeaturedSlider from "./components/featuredslider";
import Header from "./components/headers/mainHeader";
import HeroSection from "./components/herosection";
import TopFiveSlider from "./components/top5slider";
import { bannerItems, trendingItems } from "./data/apiData";
import Goblin from "./components/goblin";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection items={bannerItems} />
      <FeaturedSlider
        title="Featured"
        items={[...bannerItems, ...trendingItems]}
        showSeeAll
      />
      <FeaturedSlider title="Trending" items={[...trendingItems]} />
      <FeaturedSlider title="Movies For You" items={[...bannerItems]} horizontal={true} />
      <TopFiveSlider title="Top Five" items={bannerItems} />
      <Goblin />
      <FeaturedSlider
        title="Children"
        items={[...bannerItems, ...trendingItems]}
        showSeeAll
      />
      <FeaturedSlider title="Open Movies" items={[...bannerItems]} />
      <Footer />
    </div>
  );
}
