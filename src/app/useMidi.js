import { useEffect } from 'react';
import { create } from 'zustand/react';

export const useMidiStore = create(() => ({
  midi: null,
  input: null,
  output: null,
  error: null,
}));

export const useMidi = () => {
  useEffect(() => {
    navigator
      .requestMIDIAccess({ sysex: true })
      .then((midi) => {
        useMidiStore.setState({ midi });
      })
      .catch((error) => {
        useMidiStore.setState({ error });
      });
  }, []);
};
