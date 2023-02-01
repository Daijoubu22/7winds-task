import React from 'react';
import { ReactComponent as ArrowIcon } from '@images/svg/arrow.svg';
import { ReactComponent as DataIcon } from '@images/svg/data.svg';
import { ENTITY_ID } from '@constants/entity';
import EntityEditor from '@shared/EntityEditor';
import '@pages/Projects/Projects.style.scss';

function Projects() {
  return (
    <div className="projects">
      <div className="projects__sidebar__header">
        <div>
          <h2 className="projects__sidebar__title">
            Название проекта
          </h2>
          <h3 className="projects__sidebar__subtitle">Аббревиатура</h3>
        </div>
        <ArrowIcon />
      </div>
      <div className="projects__sidebar__content">
        <ul className="projects__sidebar__items">
          <li className="projects__sidebar__item projects__sidebar__item--active">
            <DataIcon />
            Объекты
          </li>
        </ul>
      </div>
      <div className="projects__rows__header">
        <h1 className="projects__rows__title">Строительно-монтажные работы</h1>
      </div>
      <div className="projects__rows__content">
        <EntityEditor entityId={ENTITY_ID} />
      </div>
    </div>
  );
}

export default Projects;
