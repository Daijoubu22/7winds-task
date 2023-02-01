import React, { useEffect } from 'react';
import { useProjectsStore } from '@services/store';
import { EntityEditorProps } from './EntityEditor.types';
import EntityEditorRow from './EntityEditorRow';
import { displayTree } from './EntityEditor.service';
import './EntityEditor.style.scss';

function EntityEditor({ entityId }: EntityEditorProps) {
  const fetchRows = useProjectsStore((state) => (state.fetchRows));
  const createRow = useProjectsStore((state) => (state.createRow));
  const updateRow = useProjectsStore((state) => (state.updateRow));
  const createEmptyRow = useProjectsStore((state) => (state.createEmptyRow));
  const rows = useProjectsStore((state) => (state.rows));

  useEffect(() => {
    fetchRows(entityId);
  }, [entityId, fetchRows]);

  useEffect(() => {
    if (rows && !rows.length) {
      createEmptyRow();
    }
  }, [rows, createEmptyRow]);

  const saveChanges = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      rowName: { value: string };
      salary: { value: string };
      equipmentCosts: { value: string };
      overheads: { value: string };
      estimatedProfit: { value: string };
      rowId: { value: string };
      parentId: { value: string };
    };

    if (target.rowId.value === '0') {
      createRow({
        rowName: target.rowName.value,
        salary: Number(target.salary.value),
        equipmentCosts: Number(target.equipmentCosts.value),
        overheads: Number(target.overheads.value),
        estimatedProfit: Number(target.estimatedProfit.value),
        id: Number(target.rowId.value),
        parentId: Number(target.parentId ? target.parentId.value : 0),
      });
    } else {
      updateRow({
        rowName: target.rowName.value,
        salary: Number(target.salary.value),
        equipmentCosts: Number(target.equipmentCosts.value),
        overheads: Number(target.overheads.value),
        estimatedProfit: Number(target.estimatedProfit.value),
        id: Number(target.rowId.value),
      });
    }
  };

  return (
    <form
      className="entity-editor"
      onSubmit={saveChanges}
    >
      <div className="entity-editor__title">Уровень</div>
      <div className="entity-editor__title">Наименование работ</div>
      <div className="entity-editor__title">Основная з/п</div>
      <div className="entity-editor__title">Оборудование</div>
      <div className="entity-editor__title">Накладные расходы</div>
      <div className="entity-editor__title">Сметная прибыль</div>
      {
        rows && displayTree(rows).map((item) => (
          <EntityEditorRow
            row={item.row}
            deepLevel={item.deepLevel}
            key={item.row.id}
            parentId={item.parentId}
          />
        ))
      }
    </form>
  );
}

export default EntityEditor;
