import { Row } from '@services/types';

export interface EntityEditorRowProps {
  row: Row,
  deepLevel: number,
  parentId?: number | undefined,
}
