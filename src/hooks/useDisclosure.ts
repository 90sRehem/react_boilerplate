import { useState, useCallback } from 'react';

interface UseDisclosureProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useDisclosure = (initial = false): UseDisclosureProps => {
  const [isOpen, setIsOpen] = useState(initial);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(state => !state), []);

  return { isOpen, open, close, toggle };
};
