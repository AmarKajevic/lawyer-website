import { Block } from '@/types/blocks';
import {v4 as uuid} from 'uuid';


export const cleanAndTransformBlocks = (blocksJSON?: Block[]): Block[] => {
  if (!Array.isArray(blocksJSON)) {
    console.error("cleanAndTransformBlocks: Invalid or undefined input", blocksJSON);
    return []; 
  }

  const blocks = JSON.parse(JSON.stringify(blocksJSON));
    
    const assignIds = (b: Block[]): void => {
        b.forEach(block => {
          block.id = uuid(); 
          if (block.innerBlocks?.length) {
            assignIds(block.innerBlocks); // Rekurzivno pozivamo za innerBlocks
          }
        });
      };

    assignIds(blocks);
    return blocks;
}