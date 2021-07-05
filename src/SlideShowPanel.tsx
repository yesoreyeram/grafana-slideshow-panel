import React from 'react';
import { PanelProps, textUtil } from '@grafana/data';
import { useTheme } from '@grafana/ui';
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
  const theme = useTheme();
  const { options, width, height } = props;
  const { defaultSlide, slides = [] } = options;
  if (slides.length === 0) {
    slides.push({
      bgImage: '/public/img/login_background_dark.svg',
      content: 'Grafana slideshow',
    });
  }
  return (
    <div>
      <Wrapper
        {...options}
        arrows={slides.length > 1 ? options.arrows : false}
        autoplay={slides.length > 1 ? options.autoplay : false}
      >
        {slides
          .filter(slide => !slide.disable)
          .map(slide => {
            if (slide.mode === 'iframe') {
              return (
                <div
                  style={{
                    width,
                    height,
                    textAlign: slide.textAlign || defaultSlide.textAlign || 'left',
                    color: slide.color || defaultSlide.color || theme.colors.text,
                    backgroundColor: slide.bgColor || defaultSlide.bgColor || theme.colors.bg1,
                    backgroundImage: `url("${slide.bgImage || defaultSlide.bgImage}")`,
                    backgroundSize: 'cover',
                  }}
                >
                  {slide.content && (
                    <div
                      style={{ width: width / 2, float: 'left', padding: '10px' }}
                      dangerouslySetInnerHTML={{ __html: markdownToHTML(slide.content || '') }}
                    ></div>
                  )}
                  <div style={{ float: 'left', width: width / 2, padding: '10px' }}>
                    <iframe
                      src={slide.url}
                      width={(slide.content ? width / 2 : width) - 20}
                      height={height - 20}
                      frameBorder="0"
                    ></iframe>
                  </div>
                </div>
              );
            }
            return (
              <div
                style={{
                  height,
                  width,
                  padding: '10px',
                  textAlign: slide.textAlign || defaultSlide.textAlign || 'left',
                  color: slide.color || defaultSlide.color || theme.colors.text,
                  backgroundColor: slide.bgColor || defaultSlide.bgColor || theme.colors.bg1,
                  backgroundImage: `url("${slide.bgImage || defaultSlide.bgImage}")`,
                  backgroundSize: 'cover',
                  overflowY: 'scroll',
                }}
                dangerouslySetInnerHTML={{ __html: markdownToHTML(slide.content || '') }}
              ></div>
            );
          })}
      </Wrapper>
    </div>
  );
};
