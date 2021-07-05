import { PanelPlugin } from '@grafana/data';
import { SlideShowPanelOptions } from './types';
import { SlideShowPanel } from './SlideShowPanel';
import { SlideEditor, DefaultSlideEditor } from './editors/slidesEditor';

export const plugin = new PanelPlugin<SlideShowPanelOptions>(SlideShowPanel).setPanelOptions(builder => {
  return builder
    .addCustomEditor({
      id: 'defaultSlide',
      name: '',
      path: 'defaultSlide',
      editor: DefaultSlideEditor,
      category: ['Default Slide Settings'],
      defaultValue: {},
    })
    .addCustomEditor({
      id: 'slides',
      name: '',
      path: 'slides',
      category: ['Slides'],
      editor: SlideEditor,
      defaultValue: [],
    })
    .addNumberInput({
      path: 'duration',
      name: 'Duration',
      defaultValue: 5000,
      category: ['Slideshow Settings'],
    })
    .addNumberInput({
      path: 'transitionDuration',
      name: 'transitionDuration',
      defaultValue: 1000,
      category: ['Slideshow Settings'],
    })
    .addNumberInput({
      path: 'defaultIndex',
      name: 'defaultIndex',
      defaultValue: 0,
      category: ['Slideshow Settings'],
    })
    .addBooleanSwitch({
      path: 'infinite',
      name: 'infinite',
      defaultValue: true,
      category: ['Slideshow Settings'],
    })
    .addBooleanSwitch({
      path: 'indicators',
      name: 'indicators',
      defaultValue: false,
      category: ['Slideshow Settings'],
    })
    .addBooleanSwitch({
      path: 'arrows',
      name: 'arrows',
      defaultValue: true,
      category: ['Slideshow Settings'],
    })
    .addBooleanSwitch({
      path: 'autoplay',
      name: 'autoplay',
      defaultValue: true,
      category: ['Slideshow Settings'],
    })
    .addBooleanSwitch({
      path: 'pauseOnHover',
      name: 'pauseOnHover',
      defaultValue: true,
      category: ['Slideshow Settings'],
    })
    .addBooleanSwitch({
      path: 'canSwipe',
      name: 'canSwipe',
      defaultValue: true,
      category: ['Slideshow Settings'],
    })
    .addRadio({
      path: 'transitionType',
      name: 'transitionType',
      defaultValue: 'linear',
      category: ['Slideshow Settings'],
      settings: {
        options: [
          { label: 'linear', value: 'linear' },
          { label: 'fade', value: 'fade' },
          { label: 'zoom', value: 'zoom' },
          { label: 'zoom-in', value: 'zoom-in' },
          { label: 'zoom-out', value: 'zoom-out' },
        ],
      },
    })
    .addSelect({
      path: 'Easing',
      name: 'Easing',
      defaultValue: 'linear',
      category: ['Slideshow Settings'],
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
