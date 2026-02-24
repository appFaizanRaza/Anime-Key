import { ContentItem } from "@/app/data/apiData";
export interface MovieCardProps {
  item: ContentItem;
  horizontal?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}