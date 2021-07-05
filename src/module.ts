import { PanelPlugin } from '@grafana/data';
import { SlideShowPanelOptions } from './types';
import { SlideShowPanel } from './SlideShowPanel';

export const plugin = new PanelPlugin<SlideShowPanelOptions>(SlideShowPanel).setPanelOptions(builder => {
  return builder
    .addNumberInput({
      path: 'duration',
      name: 'Duration',
      defaultValue: 5000,
    })
    .addNumberInput({
      path: 'transitionDuration',
      name: 'transitionDuration',
      defaultValue: 1000,
    })
    .addNumberInput({
      path: 'defaultIndex',
      name: 'defaultIndex',
      defaultValue: 0,
    })
    .addBooleanSwitch({
      path: 'infinite',
      name: 'infinite',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'indicators',
      name: 'indicators',
      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'arrows',
      name: 'arrows',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'autoplay',
      name: 'autoplay',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'pauseOnHover',
      name: 'pauseOnHover',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'canSwipe',
      name: 'canSwipe',
      defaultValue: true,
    })
    .addRadio({
      path: 'transitionType',
      name: 'transitionType',
      defaultValue: 'linear',
      settings: {
        options: [
          { label: 'linear', value: 'linear' },
          { label: 'zoom', value: 'zoom' },
          { label: 'fade', value: 'fade' },
        ],
      },
    })
    .addSelect({
      path: 'Easing',
      name: 'Easing',
      defaultValue: 'linear',
      settings: {
        options: [
          { label: 'linear', value: 'linear' },
          { label: 'ease', value: 'ease' },
          { label: 'ease-in', value: 'ease-in' },
          { label: 'ease-out', value: 'ease-out' },
          { label: 'cubic', value: 'cubic' },
          { label: 'cubic-in', value: 'cubic-in' },
          { label: 'cubic-out', value: 'cubic-out' },
        ],
      },
    });
});
