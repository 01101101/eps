import { useEffect, useState } from 'react';
import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand/react';

export const useMidiStore = create(
  immer(() => ({
    midi: null,
    inputs: null,
    outputs: null,
  }))
);

export const useMidi = () => {
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const setState = () => {
      useMidiStore.setState((state) => ({
        inputs: Array.from(state.midi.inputs.values()),
        outputs: Array.from(state.midi.outputs.values()),
      }));
    };

    navigator
      .requestMIDIAccess({ sysex: true })
      .then((midi) => {
        useMidiStore.setState({ midi });
        midi.addEventListener('statechange', setState);
        setState();
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });

    return () => {
      useMidiStore.getState().midi?.removeEventListener('statechange', setState);
    };
  }, []);

  return error;
};
