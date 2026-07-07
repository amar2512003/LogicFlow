import { useState } from 'react';
import { useStore } from '../store';

export const useNodeField = (nodeId, field, initialValue) => {
  const [value, setValue] = useState(initialValue);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const update = (nextValue) => {
    setValue(nextValue);
    updateNodeField(nodeId, field, nextValue);
  };

  return [value, update];
};
