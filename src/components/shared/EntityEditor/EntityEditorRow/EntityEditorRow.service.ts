import { Row } from '@services/types';

export const getSchemas = (row: Row) => ([
  { name: 'rowName', value: row.rowName, type: 'text' },
  { name: 'salary', value: row.salary, type: 'number' },
  { name: 'equipmentCosts', value: row.equipmentCosts, type: 'number' },
  { name: 'overheads', value: row.overheads, type: 'number' },
  { name: 'estimatedProfit', value: row.estimatedProfit, type: 'number' },
]);
