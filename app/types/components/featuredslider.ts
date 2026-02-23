import { ContentItem } from "../../data/apiData";
export interface FeaturedSliderProps {
  title: string;
  items: ContentItem[];
  showSeeAll?: boolean;
  horizontal?: boolean; // 👈 add this
}