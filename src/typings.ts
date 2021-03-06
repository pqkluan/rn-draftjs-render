import { RawDraftContentBlock, RawDraftContentState, RawDraftEntityRange, RawDraftInlineStyleRange } from 'draft-js';
import { TextProps, TextStyle, ViewStyle } from 'react-native';

/**
 * Known block type from draft-js
 */
export type BlockType =
  | 'blockquote'
  | 'code-block'
  | 'header-five'
  | 'header-four'
  | 'header-one'
  | 'header-six'
  | 'header-three'
  | 'header-two'
  | 'paragraph'
  | 'unstyled'
  | 'ordered-list-item'
  | 'unordered-list-item';

/**
 * A record of styles for valid block type
 */
export type BlockStyles = Record<BlockType, ViewStyle & TextStyle>;

export type InlineType = 'bold' | 'code' | 'italic' | 'strikethrough' | 'underline' | 'link';
// export type RawInlineType = DraftInlineStyleType | 'link';
export type InlineStyles = Record<InlineType, TextStyle>;
export type RawInlineStyle = RawDraftInlineStyleRange;

export type CustomStyleType =
  | BlockType
  | InlineType
  | 'viewAfterList'
  | 'blockquoteContainer'
  | 'blockquoteIconBefore'
  | 'blockquoteIconAfter'
  | 'orderedListItemContainer'
  | 'orderedListItemNumber'
  | 'unorderedListItemBullet'
  | 'unorderedListItemContainer';
export type CustomStyles = Partial<BlockStyles & InlineStyles & Record<CustomStyleType, ViewStyle & TextStyle>>;

export interface InlineStyleRange {
  key?: number | string;
  style: InlineType | InlineType[];
  offset: number;
  length: number;
}

export type EntityRange = RawDraftEntityRange;
export type EntityMap = RawDraftContentState['entityMap'];
export type Block = RawDraftContentBlock;
export interface ContentState {
  blocks: Block[];
  entityMap: EntityMap;
}
export type Attribute = RawInlineStyle | EntityRange;

interface BlockProps {
  type: string;
  text: string;
  customStyles?: CustomStyles;
  data?: Record<string, unknown>;
  entityMap?: EntityMap;
  textProps?: TextProps;
  inlineStyleRanges: RawInlineStyle[];
  entityRanges: EntityRange[];
  navigate?: (url: string) => Promise<void>;
}

export interface TextStyledProps {
  text: string;
  type: InlineType[];
  textProps?: TextProps;
  customStyles?: CustomStyles;
  onPress?: () => Promise<void>;
  lineHeight: TextStyle;
}

export interface BlockQuoteProps extends BlockProps {}

export interface DraftJsTextProps extends BlockProps {}

export interface OrderedListItemProps extends BlockProps {
  counter: number;
  separator?: string;
  depth: number;
  defaultMarginLeft?: number;
}

export interface UnorderedListItemProps extends BlockProps {
  depth: number;
  defaultMarginLeft?: number;
}
