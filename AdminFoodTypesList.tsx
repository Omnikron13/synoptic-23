'use client';
import classnames from 'classnames';
import { useState } from 'react';

import styles from 'styles/foodtypes.admin.module.sass';


export default function AdminFoodTypesList({ data = [] }) {
   const [typesList, setTypesList] = useState(data);
   const [filterStr, setFilterStr] = useState('');

   const filteredTypesList = typesList.filter(ft =>
      ft.id.toLowerCase().includes(filterStr)          ||
      ft.name.toLowerCase().includes(filterStr)        ||
      ft.description.toLowerCase().includes(filterStr)
   );

   return(
      <ul className={styles.adminFoodTypesList}>
         <input
            className={styles.filter}
            value={filterStr}
            placeholder='Filter...'
            onChange={e => setFilterStr(e.target.value.toLowerCase())}
         />
         {filteredTypesList.map(ft => <FoodTypeEditor key={ft.id} {...ft} mark={filterStr} />)}
      </ul>
   );
}

function FoodTypeEditor({ id, name, description, meta, mark = '' }) {
   return(
      <li className={styles.foodTypeEditor}>
         <hgroup>
            <h2 className={styles.name}><MarkedText text={name} pattern={mark} /></h2>
            <p className={styles.id}>ID : <MarkedText text={id} pattern={mark} /></p>
         </hgroup>
         <p className={styles.description}><MarkedText text={description} pattern={mark} /></p>
         <p className={styles.meta}>{JSON.stringify(meta)}</p>
      </li>
   );
}

function MarkedText({ text, pattern }) {
   return pattern == '' ? text :
      text.split(new RegExp(`(${pattern})`, 'gi'))
          .map((s, i) => i % 2 ? <mark key={i}>{s}</mark> : s);
}
