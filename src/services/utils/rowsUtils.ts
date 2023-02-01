import { RowTree } from '@services/types';

export const findInRows = (rows: RowTree[], callback: (row: RowTree) => boolean) => {
  let result: RowTree | undefined;
  rows.some((row) => {
    if (result) {
      return true;
    }
    if (callback(row)) {
      result = row;
      return true;
    }
    if (!row.child) return true;
    result = findInRows(row.child, callback);
    return false;
  });
  return result;
};

export const deleteFromRows = (rows: RowTree[], rowId: number) => {
  const index = rows.findIndex((item) => item.id === rowId);
  if (index >= 0) {
    rows.splice(index, 1);
    return;
  }
  rows.forEach((row) => deleteFromRows(row.child, rowId));
};
