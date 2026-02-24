import { ContentItem } from "@/app/data/apiData";
export interface HoverPopupProps {
  rect: DOMRect | null;
  item: ContentItem;
  horizontalPoster: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
