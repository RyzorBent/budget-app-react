import React from "react";

const ItemRecord = ({ record_type, percentage, description, value, onDelete }) => (
  <li>
    {description} -{value} {(record_type === 'expense') ?  <span>{percentage}%</span> : null}
    <span onClick={onDelete}>X</span>
  </li>
);

export default ItemRecord;
