export interface ReadMoreProps {
  text: string;
  onOpen?: () => void;
  href?: string;
  textClassName?: string;
  linkClassName?: string;
  lines?: number;
}