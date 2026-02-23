import { ContentItem } from "@/app/data/apiData";
export interface MovieCardProps {
  item: ContentItem;
  isFirst?: boolean;
  isLast?: boolean;
}