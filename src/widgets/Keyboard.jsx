import { useState } from 'react';
import { GridSize } from '~/app/GridBackground';

const Notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const AllNotes = Array.from(Array(9))
  .flatMap((_, octave) => (octave === 0 ? Notes.slice(-3) : octave === 8 ? Notes.slice(0, 1) : Notes).map((note) => note + octave))
  .reduce(
    ({ whiteIndex, notes }, name, index) => {
      const isWhite = name[1] !== '#';
      const nextWhiteIndex = whiteIndex + (isWhite ? 1 : 0);
      return {
        whiteIndex: nextWhiteIndex,
        notes: notes.concat({
          name,
          isWhite,
          whiteIndex: nextWhiteIndex,
          value: 21 + index,
        }),
      };
    },
    { whiteIndex: 0, notes: [] }
  ).notes;

export const Keyboard = ({ size }) => {
  const [note, setNote] = useState(null);

  const handlePointerOut = () => {
    setNote(null);
  };

  const handlePointerOver = (note) => () => {
    setNote(note);
  };

  return (
    <div className="border-border flex h-full gap-px rounded-sm border bg-black" onPointerOut={handlePointerOut}>
      {AllNotes.slice(0, AllNotes.findIndex(({ whiteIndex }) => whiteIndex === size.width) + 1).map(({ name, isWhite, whiteIndex }, index) =>
        isWhite ? (
          <div
            key={name}
            onPointerOver={handlePointerOver(name)}
            className="hover:bg-primary first:rounded-tl-sm-internal first:rounded-bl-sm-internal last:rounded-tr-sm-internal last:rounded-br-sm-internal bg-white"
            style={{ minWidth: `${GridSize - 1}px` }}
          />
        ) : (
          <div
            key={name}
            onPointerOver={handlePointerOver(name)}
            className="hover:bg-primary absolute h-1/2 rounded-b-xs bg-black"
            style={{ width: `${GridSize - 1}px`, left: `${whiteIndex * (GridSize - 1) + whiteIndex - 1}px` }}
          />
        )
      )}
      {note != null && <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 translate-y-full text-[10px]">{note}</div>}
    </div>
  );
};

Keyboard.defaultSize = { width: 10, height: 4 };

Keyboard.maximumWidth = 52;
Keyboard.maximumHeight = 4;

Keyboard.properties = {};

Keyboard.events = {
  change: {},
};
