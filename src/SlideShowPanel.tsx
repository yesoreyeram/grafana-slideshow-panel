import React from 'react';
import { PanelProps, textUtil } from '@grafana/data';
import { Slide, Zoom, Fade } from 'react-slideshow-image';
import MarkdownIt from 'markdown-it';
import { SlideShowPanelOptions, SlideShowOptions } from 'types';
import 'react-slideshow-image/dist/styles.css';

const markdownToHTML = (mdText: string) => {
  const md = new MarkdownIt({ html: true });
  const html = md.render(mdText);
  const sanitizedHtml = textUtil.sanitize(html);
  return sanitizedHtml;
};

const Wrapper: React.FC<SlideShowOptions> = props => {
  switch (props.transitionType) {
    case 'zoom':
    case 'zoom-in':
      return <Zoom {...props} scale={1.4} />;
    case 'zoom-out':
      return <Zoom {...props} scale={0.4} />;
    case 'fade':
      return <Fade {...props} />;
    default:
      return <Slide {...props} />;
  }
};

interface SlideShowPanelProps extends PanelProps<SlideShowPanelOptions> {}

export const SlideShowPanel = (props: SlideShowPanelProps) => {
  const { options, width, height } = props;
  const { slides = [] } = options;
  slides.push({
    backgroundImage:
      'https://images.unsplash.com/photo-1622495966349-2857f74777a0?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
  });
  slides.push({
    backgroundImage:
      'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
    content: '# Welcome to Grafana slide show',
  });
  slides.push({
    backgroundColor: 'orange',
    content: `# Some markdown content
You can customize colors and content too
More detail [here](http://nowhere)`,
  });
  return (
    <div>
      <Wrapper {...options}>
        {slides.map(slide => {
          return (
            <div
              style={{
                height,
                width,
                padding: '10px',
                textAlign: slide.textAlign,
                color: slide.color || 'black',
                backgroundColor: slide.backgroundColor,
                backgroundImage: `url("${slide.backgroundImage}")`,
                backgroundSize: 'cover',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: markdownToHTML(slide.content || '') }}></div>
            </div>
          );
        })}
      </Wrapper>
    </div>
  );
};
