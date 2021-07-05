import React from 'react';
import { cloneDeep, set } from 'lodash';
import { Button, Input, TextArea, InlineFormLabel, ColorPicker, RadioButtonGroup, useTheme } from '@grafana/ui';
import { SlideConfig } from '../types';

interface DefaultSlideEditorProps {
  value: SlideConfig;
  onChange: (value: SlideConfig) => void;
}
export const DefaultSlideEditor = ({ value: slide, onChange }: DefaultSlideEditorProps) => {
  const theme = useTheme();
  const onValueChange = (key: string, value: string | boolean) => {
    const newSlide: SlideConfig = cloneDeep(slide);
    set(newSlide, key, value);
    onChange(newSlide);
  };
  return (
    <>
      <div className="gf-form">
        <InlineFormLabel>BG Color</InlineFormLabel>
        <InlineFormLabel width={2}>
          <ColorPicker color={slide.bgColor || theme.colors.bg1} onChange={e => onValueChange(`bgColor`, e)} />
        </InlineFormLabel>
        <InlineFormLabel>Color</InlineFormLabel>
        <InlineFormLabel width={2}>
          <ColorPicker color={slide.color || theme.colors.text} onChange={e => onValueChange(`color`, e)} />
        </InlineFormLabel>
      </div>
      <div className="gf-form">
        <InlineFormLabel>BG Image</InlineFormLabel>
        <Input css={{}} value={slide.bgImage} onChange={e => onValueChange(`bgImage`, e.currentTarget.value)} />
      </div>
      <div className="gf-form">
        <InlineFormLabel>Content Align</InlineFormLabel>
        <RadioButtonGroup
          options={[
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
          ]}
          value={slide.textAlign || 'left'}
          onChange={e => onValueChange(`textAlign`, e + '')}
        />
      </div>
    </>
  );
};

const swapArrayLocs = (arr: SlideConfig[], index1: number, index2: number) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  return arr;
};
interface SlideEditorProps {
  value: SlideConfig[];
  onChange: (value: SlideConfig[]) => void;
}
export const SlideEditor = ({ value: slides, onChange }: SlideEditorProps) => {
  const addSlide = () => {
    const newSlides: SlideConfig[] = cloneDeep(slides || []);
    newSlides.push({
      mode: 'text',
      content: 'My awesome slide',
      bgColor: '',
      bgImage: '',
      textAlign: 'left',
      color: '',
    });
    onChange(newSlides);
  };
  const removeSlide = (index: number) => {
    const newSlides: SlideConfig[] = cloneDeep(slides || []);
    newSlides.splice(index, 1);
    onChange(newSlides);
  };
  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides: SlideConfig[] = cloneDeep(slides || []);
    onChange(swapArrayLocs(newSlides, index, direction === 'up' ? index - 1 : index + 1));
  };
  const onValueChange = (key: string, value: string | boolean) => {
    const newSlides: SlideConfig[] = cloneDeep(slides || []);
    set(newSlides, key, value);
    onChange(newSlides);
  };
  return (
    <>
      {slides.map((slide, index) => (
        <>
          <h5>Step {index + 1}</h5>
          <div className="gf-form">
            <InlineFormLabel>Mode</InlineFormLabel>
            <RadioButtonGroup
              options={[
                { label: 'Text / Markdown', value: 'text' },
                { label: 'IFrame', value: 'iframe' },
              ]}
              value={slide.mode || 'text'}
              onChange={e => onValueChange(`${index}.mode`, e + '')}
            />
          </div>
          {slide.mode === 'iframe' && (
            <div className="gf-form">
              <InlineFormLabel>URL</InlineFormLabel>
              <Input css={{}} value={slide.url} onChange={e => onValueChange(`${index}.url`, e.currentTarget.value)} />
            </div>
          )}
          <div className="gf-form">
            <InlineFormLabel>Content</InlineFormLabel>
            <TextArea
              css={{}}
              value={slide.content}
              rows={3}
              onChange={e => onValueChange(`${index}.content`, e.currentTarget.value)}
            />
          </div>
          <div className="gf-form">
            <InlineFormLabel>BG Color</InlineFormLabel>
            <InlineFormLabel width={2}>
              <ColorPicker color={slide.bgColor + ''} onChange={e => onValueChange(`${index}.bgColor`, e)} />
            </InlineFormLabel>
            <InlineFormLabel>Color</InlineFormLabel>
            <InlineFormLabel width={2}>
              <ColorPicker color={slide.color + ''} onChange={e => onValueChange(`${index}.color`, e)} />
            </InlineFormLabel>
          </div>
          <div className="gf-form">
            <InlineFormLabel>BG Image</InlineFormLabel>
            <Input
              css={{}}
              value={slide.bgImage}
              onChange={e => onValueChange(`${index}.bgImage`, e.currentTarget.value)}
            />
          </div>
          <div className="gf-form">
            <InlineFormLabel>Content Align</InlineFormLabel>
            <RadioButtonGroup
              options={[
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
              ]}
              value={slide.textAlign}
              onChange={e => onValueChange(`${index}.textAlign`, e + '')}
            />
          </div>
          <div className="gf-form">
            <Button
              icon="trash-alt"
              variant="destructive"
              size="sm"
              style={{ margin: '5px' }}
              onClick={() => removeSlide(index)}
            >
              Remove slide {index + 1}
            </Button>
            {index !== 0 && (
              <Button
                icon="arrow-up"
                size="sm"
                variant="secondary"
                style={{ margin: '5px' }}
                onClick={() => moveSlide(index, 'up')}
              >
                Move Up
              </Button>
            )}
            {index !== slides.length - 1 && (
              <Button
                icon="arrow-down"
                size="sm"
                variant="secondary"
                style={{ margin: '5px' }}
                onClick={() => moveSlide(index, 'down')}
              >
                Move Down
              </Button>
            )}
            {slide.disable ? (
              <Button
                size="sm"
                variant="secondary"
                icon="eye"
                style={{ margin: '5px' }}
                onClick={() => onValueChange(`${index}.disable`, false)}
              >
                enable
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                icon="eye-slash"
                style={{ margin: '5px' }}
                onClick={() => onValueChange(`${index}.disable`, true)}
              >
                disable
              </Button>
            )}
          </div>
          <br />
        </>
      ))}
      <br />
      {<Button onClick={addSlide}>Add Slide</Button>}
    </>
  );
};
