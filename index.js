const lcdMidiIn = document.querySelector('#lcd .tag:first-child');
const lcdMidiOut = document.querySelector('#lcd .tag:last-child');
const lcd = document.querySelector('#lcd .text');

const midi = await navigator.requestMIDIAccess({ sysex: true }).catch(() => null);

lcd.textContent = midi == null ? 'PERMISSION DENIED' : 'ENSONIQ EPS';

if (midi != null) {
  const midiInSelect = document.querySelector('#midiIn');
  const midiOutSelect = document.querySelector('#midiOut');
  const logsIn = document.querySelector('#logs .in');

  midi.inputs.forEach(input => {
    const option = document.createElement('option');
    option.value = input.id;
    option.textContent = input.name;
    midiInSelect.appendChild(option);
  });

  midi.outputs.forEach(output => {
    const option = document.createElement('option');
    option.value = output.id;
    option.textContent = output.name;
    midiOutSelect.appendChild(option);
  });

  let abortController = null;

  midiInSelect.addEventListener('change', (event) => {
    if (abortController !== null) {
      abortController.abort();
    }
    abortController = new AbortController();
    let midiInTimeout = null;
    midi.inputs.get(event.target.value).addEventListener('midimessage', (event) => {
      clearTimeout(midiInTimeout);
      lcdMidiIn.classList.add('active');
      midiInTimeout = setTimeout(() => lcdMidiIn.classList.remove('active'), 150)
      const log = document.createElement('div');
      log.textContent = Array.from(event.data).map(byte => byte.toString(16).padStart(2, '0').toUpperCase()).join(' ');
      logsIn.appendChild(log);
    }, { signal: abortController.signal });
  })
}
