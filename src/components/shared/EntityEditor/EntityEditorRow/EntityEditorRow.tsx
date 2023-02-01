import React, { useEffect, useState } from 'react';
import { ReactComponent as CreateLogo } from '@images/svg/create.svg';
import { ReactComponent as RemoveLogo } from '@images/svg/remove.svg';
import { useProjectsStore } from '@services/store';
import { EntityEditorRowProps } from './EntityEditorRow.types';
import { getSchemas } from './EntityEditorRow.service';
import './EntityEditorRow.style.scss';

function EntityEditorRow({ row, deepLevel, parentId }: EntityEditorRowProps) {
  const editingId = useProjectsStore((state) => (state.editingId));
  const setEditingId = useProjectsStore((state) => (state.setEditingId));
  const createEmptyRow = useProjectsStore((state) => (state.createEmptyRow));
  const deleteRowStore = useProjectsStore((state) => (state.deleteRow));
  const [isEditing, setIsEditing] = useState(editingId === row.id);

  useEffect(() => {
    if (editingId !== row.id) setIsEditing(false);
  }, [editingId, row.id]);

  const enableEditingMode = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.detail > 1 && editingId === undefined) {
      setEditingId(row.id);
      setIsEditing(true);
    }
  };

  const createRow = () => {
    if (editingId === undefined) createEmptyRow(row.id);
  };

  const deleteRow = () => {
    if (editingId === undefined) deleteRowStore(row.id);
  };

  return (
    <div className="entity-editor__row" onClick={enableEditingMode}>
      <div className="entity-editor__value">
        <div
          className="entity-editor__btns"
          style={{ marginLeft: `${deepLevel * 20}px` }}
        >
          {deepLevel ? <div className="entity-editor__line" /> : null}
          <div className="entity-editor__btns-bg">
            <button
              type="button"
              className="entity-editor__btn entity-editor__create-btn"
              onClick={createRow}
            >
              <CreateLogo />
            </button>
            <button
              type="button"
              className="entity-editor__btn entity-editor__delete-btn"
              onClick={deleteRow}
            >
              <RemoveLogo />
            </button>
          </div>
        </div>
        {isEditing && <input name="rowId" value={row.id} className="entity-editor__id" readOnly />}
        {isEditing && parentId && <input name="parentId" value={parentId} className="entity-editor__id" readOnly />}
        <button type="submit" className="entity-editor__submit" />
      </div>
      {
        getSchemas(row).map((schema) => (
          <div className="entity-editor__value" key={schema.name}>
            {isEditing ? (
              <input
                type={schema.type}
                defaultValue={schema.value}
                name={schema.name.toString()}
                className="entity-editor__input"
              />
            ) : schema.value}
          </div>
        ))
      }
    </div>
  );
}

export default EntityEditorRow;
