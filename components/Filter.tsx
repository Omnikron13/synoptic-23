'use client';
import { useState } from 'react';
import classnames from 'classnames';
import MarkedText from 'components/MarkedText';

import styles from 'styles/filter.module.sass';

export default function Filter({ foodTypes }) {
   return <FoodTypeFilter foodTypes={foodTypes} />;
}

function FoodTypeFilter({ foodTypes }) {
   // TODO: lift this up to where it is actually useful
   const [filter, setFilter] = useState([]);

   const [filterStr, setFilterStr] = useState('');

   const filteredFoodTypes = foodTypes.filter(ft =>
      ft.id.toLowerCase().includes(filterStr)          ||
      ft.name.toLowerCase().includes(filterStr)        ||
      ft.description.toLowerCase().includes(filterStr)
   );

   return(
      <>
         <input
            value={filterStr}
            placeholder='Filter...'
            onChange={e => setFilterStr(e.target.value.toLowerCase())}
         />
         <ul className={styles.foodTypeList}>
            {filteredFoodTypes.map(ft =>
               <FoodType
                  key={ft.id}
                  {...ft}
                  mark={filterStr}
                  filter={filter}
                  setFilter={setFilter}
               />
            )}
         </ul>
      </>
   );
}

function FoodType({ id, name, description, meta, mark = '', filter, setFilter }) {
   const selected = filter.includes(id);

   return(
      <li
         className={classnames(styles.foodType, selected && styles.selected)}
         onClick={() => {
            selected ? setFilter(filter.filter(x => x != id)) : setFilter([...filter, id]);
         }}
      >
         <h4 className={styles.name}><MarkedText text={name} pattern={mark} /></h4>
         <p className={styles.description}><MarkedText text={description} pattern={mark} /></p>
         {meta.icon && <p className={styles.icon}>{meta.icon}</p>}
      </li>
   );
}
