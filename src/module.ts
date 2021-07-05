import { PanelPlugin } from '@grafana/data';
import { SlideShowPanelOptions } from './types';
import { SlideShowPanel } from './SlideShowPanel';

export const plugin = new PanelPlugin<SlideShowPanelOptions>(SlideShowPanel).setPanelOptions(builder => {
  return builder;
});
