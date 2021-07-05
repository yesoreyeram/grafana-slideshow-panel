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
  backgroundColor?: string;
  backgroundImage?: string;
  color?: string;
  content?: string;
  textAlign?: 'left' | 'center' | 'right';
};
export type SlideShowPanelOptions = SlideShowOptions & {
  slides: SlideConfig[];
};
