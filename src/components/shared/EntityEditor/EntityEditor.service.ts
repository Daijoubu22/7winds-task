import { RowTree } from '@services/types';

export const displayTree = (rows: RowTree[]) => {
  const rowsArray: {
    row: RowTree,
    deepLevel: number,
    parentId?: number,
  }[] = [];

  const dfs = (_rows: RowTree[], deepLevel: number, parentId?: number) => {
    _rows.forEach((row) => {
      rowsArray.push({
        row,
        deepLevel,
        parentId,
      });
      if (row.child) {
        dfs(row.child, deepLevel + 1, row.id);
      }
    });
  };

  dfs(rows, 0);

  return rowsArray;
};
