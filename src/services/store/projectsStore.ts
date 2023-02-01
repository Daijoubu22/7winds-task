/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '@constants/api';
import { RowCreateData, RowTree, RowUpdateData } from '@services/types';
import { ENTITY_ID } from '@constants/entity';
import { devtools } from 'zustand/middleware';
import { findInRows, deleteFromRows } from '@utils/rowsUtils';
import { immer } from 'zustand/middleware/immer';

interface ProjectsState {
  rows: RowTree[] | null,
  editingId: number | undefined,

  fetchRows: (entityId: number) => Promise<void>,
  createRow: (rowData: RowCreateData) => Promise<void>,
  updateRow: (rowData: RowUpdateData) => Promise<void>,
  deleteRow: (rowId: number) => Promise<void>,
  createEmptyRow: (parentId?: number) => void,
  setEditingId: (value: number) => void,
}

interface UpdateRowResponse {
  current: RowTree,
}

export const useProjectsStore = create<ProjectsState>()(devtools(immer((set) => ({
  rows: null,
  editingId: undefined,

  fetchRows: async () => {
    const response = await axios.get<RowTree[]>(`${API_URL}/v1/outlay-rows/entity/${ENTITY_ID}/row/list`);
    set({ rows: response.data });
  },

  createRow: async (rowData) => {
    const response = await axios.post<UpdateRowResponse>(`${API_URL}/v1/outlay-rows/entity/${ENTITY_ID}/row/create`, {
      ...rowData,
      id: null,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      supportCosts: 0,
      parentId: rowData.parentId || null,
    });
    set((state) => {
      let parent: RowTree[] | undefined;
      if (rowData.parentId) {
        if (!state.rows) return;
        const row = findInRows(state.rows, (_row) => _row.id === rowData.parentId);
        if (!row) return;
        parent = row.child;
      } else {
        parent = state.rows || undefined;
      }
      if (!parent) return;
      parent.pop();
      parent.push({
        ...response.data.current,
        child: [],
      });
      state.editingId = undefined;
    });
  },

  updateRow: async (rowData) => {
    const response = await axios.post<UpdateRowResponse>(`${API_URL}/v1/outlay-rows/entity/${ENTITY_ID}/row/${rowData.id}/update`, {
      ...rowData,
      id: null,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      supportCosts: 0,
    });
    set((state) => {
      if (!state.rows) return;
      const row = findInRows(state.rows, (_row) => _row.id === response.data.current.id);
      if (!row) return;
      row.rowName = response.data.current.rowName;
      row.salary = response.data.current.salary;
      row.overheads = response.data.current.overheads;
      row.estimatedProfit = response.data.current.estimatedProfit;
      row.equipmentCosts = response.data.current.equipmentCosts;
      state.editingId = undefined;
    });
  },

  deleteRow: async (rowId) => {
    await axios.delete<UpdateRowResponse>(`${API_URL}/v1/outlay-rows/entity/${ENTITY_ID}/row/${rowId}/delete`);
    set((state) => {
      if (!state.rows) return;
      deleteFromRows(state.rows, rowId);
    });
  },

  createEmptyRow: async (parentId) => {
    set((state) => {
      let parent: RowTree[] | undefined;
      if (parentId) {
        if (!state.rows) return;
        const row = findInRows(state.rows, (_row) => _row.id === parentId);
        if (!row) return;
        parent = row.child;
      } else {
        parent = state.rows || undefined;
      }
      if (!parent) return;
      parent.push({
        equipmentCosts: 0,
        estimatedProfit: 0,
        id: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        rowName: '',
        salary: 0,
        supportCosts: 0,
        total: 0,
        child: [],
      });
      state.editingId = 0;
    });
  },

  setEditingId: (value) => (set({ editingId: value })),
}))));
