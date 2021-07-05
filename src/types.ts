export type SlideShowOptions = {
  duration: number;
  transitionDuration: number;
  defaultIndex: number;
  infinite: boolean;
  indicators: boolean;
  arrows: boolean;
  autoplay: boolean;
  pauseOnHover: boolean;
  canSwipe: boolean;
  transitionType: 'linear' | 'fade' | 'zoom' | 'zoom-in' | 'zoom-out';
  Easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'cubic' | 'cubic-in' | 'cubic-out';
};
export type SlideConfig = {
  mode?: 'text' | 'iframe';
  disable?: boolean;
  bgColor?: string;
  bgImage?: string;
  color?: string;
  url?: string; // mode = iframe
  content?: string;
  textAlign?: 'left' | 'center' | 'right';
};
export type SlideShowPanelOptions = SlideShowOptions & {
  defaultSlide: SlideConfig;
  slides: SlideConfig[];
};
