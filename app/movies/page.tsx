import FeaturedSlider from "../components/featuredslider";
import { bannerItems, trendingItems } from "../data/apiData";

export default function MoviesPage() {
  return (
    <div className="p-4">
      <h1 className="text-movie font-bold mb-4">Movies Page</h1>
      <p>
        Welcome to the Movies page! Here you can find all the latest movies.
      </p>
      <FeaturedSlider
        title="Featured"
        items={[...bannerItems, ...trendingItems]}
        showSeeAll
      />
    </div>
  );
}
