import { Block } from '@/types/blocks';
import React from 'react';
import { Cover } from '../Cover/Cover';
import { Heading } from '../Heading/Heading';
import { Paragraph } from '../Paragraph/Paragraph';
import { theme, Theme } from '../../theme';
import CallToActionButton from '../CallToActionButton/CallToActionButton';
import Columns from '../Columns/Columns';
import Column from '../Column/Column';
import Image from 'next/image';
import { PropertySearch } from '../PropertySearch/PropertySearch';
import FormspreeForm from '../FormspreeForm/FormspreeForm';
import Group from '../Group/Group';
import GoogleMapEmbed from '../GoogleMapEmbed/GoogleMapEmbed';
import AnimatedColumnWrapper from '../AnimatedColumnWrapper/AnimatedColumnWrapper';
import Faq from '../Faq/Faq';



interface BlockRendererProps {
  blocks: Block[];
  className?: string;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, className }) => {
  return (
    <>
      {blocks.map((block) => {
        const blockClassName = block.attributes?.className ?? className; // Držimo className konsistentnim

        switch (block.name) {
            case 'acf/videocover': {
              const videoUrl = block.attributes?.data?.video_url;
              const posterUrl = block.attributes?.data?.poster_image?.url;

              return (
                <div key={block.id} >
                  <Cover
                    background={videoUrl}
                    poster={posterUrl}
                    isVideo={true}
                    
                  >
                    <BlockRenderer blocks={block.innerBlocks ?? []} />
                  </Cover>
                </div>
              );
            }

          case 'core/cover': {
            const url = block.attributes?.url ?? '';
            const isVideo = url.endsWith('.mp4') || url.endsWith('.webm');
            return (
              <Cover
                key={block.id}
                background={url}
                isVideo={isVideo}
                poster={block.attributes?.poster} // Ako WordPress podržava poster sliku
              >
                <BlockRenderer blocks={block.innerBlocks ?? []} />
              </Cover>
            );
          }

          case 'acf/formspreeform': 
            return<FormspreeForm key={block.id} 
            formId={block.attributes.data.form_id}/>
          
          case 'acf/ctabutton':
            return (
              <CallToActionButton
                key={block.id}
                buttonLabel={block.attributes.data.label}
                destination={block.attributes.data.destination || '/'}
                align={block.attributes.data.align}
              />
            );
            


          case 'core/paragraph': {
            const colorKey = block.attributes.textColor as keyof Theme;
            return (
              <Paragraph
                key={block.id}
                textAlign={block.attributes.textAlign}
                textColor={theme[colorKey] || block.attributes.style?.color?.text}
                content={block.attributes.content}
              />
            );
          }
          case 'core/post-title':
          case 'core/heading': {
            const cleanContent = block.attributes.content.replace(/<br\s*\/?>/gi, '');
            const colorKey = block.attributes.textColor as keyof Theme;
            return (
              <Heading key={block.id} 
              textAlign={block.attributes.textAlign}
               level={block.attributes.level} 
              textColor={theme[colorKey] || block.attributes.style?.color?.text} className={blockClassName}>
                {cleanContent}
              </Heading>
            );
          }
          case 'acf/propertysearch':{
            return <PropertySearch key={block.id}/>
          }
        


          case 'core/columns': {
             const colorKey = block.attributes.textColor as keyof Theme;
             const bgColorKey = block.attributes.backgroundColor as keyof Theme;
            
            return (
              <Columns
                key={block.id}
                className={blockClassName} // Upotrebiti zajednički className
                isStackedOnMobile={block.attributes.isStackedOnMobile}
                textColor={theme[colorKey] || block.attributes.style?.color?.text}
                backgroundColor={theme[bgColorKey] || block.attributes.style?.color?.background}
                
              >
                <BlockRenderer blocks={block.innerBlocks ?? []} />
              </Columns>
            );
          }
          



          case 'core/column': {
            
              const width = block.attributes?.width ?? null;

              const bgColorKey = block.attributes?.backgroundColor as keyof Theme | undefined;
              const colorKey = block.attributes?.textColor as keyof Theme | undefined;

              const textColor =
                (colorKey && theme[colorKey]) || block.attributes?.style?.color?.text;

              const backgroundColor =
                (bgColorKey && theme[bgColorKey]) || block.attributes?.style?.color?.background;
                

              return (
                <AnimatedColumnWrapper key={block.id} className={blockClassName}>
                <Column
                  
                  width={width}
                  textColor={textColor}
                  backgroundColor={backgroundColor}
                >
                  <BlockRenderer blocks={block.innerBlocks ?? []} />
                </Column>
                </AnimatedColumnWrapper>
              );
              
            }


          case 'core/group': {
            const bgImageUrl = block.attributes?.style?.background?.backgroundImage?.url;
            const bgSize = block.attributes?.style?.background?.backgroundSize || 'auto';
          
            const hoverImageBlock = block.innerBlocks?.find(b => b.name === 'core/image');
            const ctaButtonBlock = block.innerBlocks?.find(b => b.name === 'acf/ctabutton');
          
            const hoverImageUrl = hoverImageBlock?.attributes?.url;
            const hoverImageAlt = hoverImageBlock?.attributes?.alt;
          
            const buttonLabel = ctaButtonBlock?.attributes?.data?.label;
            const buttonDestination = ctaButtonBlock?.attributes?.data?.destination || '/';
          
            const childrenBlocks = block.innerBlocks?.filter(
              b => b.name !== 'core/image' && b.name !== 'acf/ctabutton'
            );
          
            return (
              <Group
                key={block.id}
                className={blockClassName}
                backgroundImageUrl={bgImageUrl}
                backgroundSize={bgSize}
                hoverImageUrl={hoverImageUrl}
                hoverImageAlt={hoverImageAlt}
                ctaButton={{ label: buttonLabel, destination: buttonDestination }}
              >
                <BlockRenderer blocks={childrenBlocks} />
              </Group>
            );
          }
         case 'core/list': {
            return (
              <ul key={block.id} className="list-disc list-inside ml-6">
                {block.innerBlocks?.map((innerBlock) => {
                  if (innerBlock.name === 'core/list-item') {
                    return (
                      <li key={innerBlock.id} className="mb-1">
                        {/* innerBlock.attributes.content sadrži tekst stavke liste */}
                        {innerBlock.attributes?.content || ''}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            );
          }

          
          
          case 'core/block': {
            return (
              <div key={block.id} className={blockClassName}>
                <BlockRenderer blocks={block.innerBlocks ?? []} className={blockClassName} />
              </div>
            );
          }
          case 'yoast/faq-block':{
            const questions = block.attributes?.questions || [];
            return(
              <div key={block.id} className='my-8'>
                <Faq items={questions}/>

              </div>
            )
          }
          case 'core/image':
            const borderRadius = block.attributes?.style?.border?.radius;
            return (
              <Image
                className={blockClassName}
                alt={block.attributes.alt || ''}
                key={block.id}
                src={block.attributes.url}
                height={block.attributes.height}
                width={block.attributes.width}
                style={{ borderRadius: borderRadius ?? "0" }}
              />
            );
            case 'acf/googlemapembed':
            return (
              <GoogleMapEmbed
                key={block.id}
                iframeHtml={block.attributes.data.google_map_iframe}
              />
            );


          default: {
            console.log('Unknown block:', block);
            return null;
          }
          
        }
      })}
    </>
  );
};
