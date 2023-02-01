import { Row } from './Row';

export interface RowTree extends Row {
  child: RowTree[],
}
