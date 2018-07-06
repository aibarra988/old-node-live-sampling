const fs = require('fs');
const portAudio = require('node-portaudio');
const Module = require('Module.js');

// Do this without a 3rd party library
require('keypress')(process.stdin);
process.stdin.setRawMode(true);

const ao = new portAudio.AudioOutput({
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 48000,
    deviceId: -1
});

ao.on('error', err => console.error);

// Create a stream to pipe into the AudioOutput
// Note that this does not strip the WAV header so a click will be heard at the beginning
const rs = fs.createReadStream('burning-wires.wav');

const modules = Map();
modules.set(new Module());
modules.set(new Module());

process.stdin.on('keypress', (ch, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    
    // if 
    } else if (key.name === 'a') {
        console.log(ch, key);
        // module.
    }
});

process.stdin.off('keypress', (ch, key => {

}));

// setup to close the output stream at the end of the read stage
rs.on('end', () => ao.end());

// Start piping data and start streaming to the AudioOutput
rs.pipe(ao);
ao.start();