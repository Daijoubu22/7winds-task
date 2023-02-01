import { RowUpdateData } from '@services/types/RowUpdateData';

export type RowCreateData = RowUpdateData & {
  parentId: number | null,
};
