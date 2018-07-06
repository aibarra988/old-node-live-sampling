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

const module = new Module({
    key: 'r',
    soundSource: ao
});

process.stdin.on('keypress', (ch, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    
    } else if (key.name === 'r') {
        
        // If the key hasn't been pressed before,
        // we are going to record the sample onto the module
        if (!module.hasSample) {
            module.record();
        } 
        
        //if the key has been pressed before and 
        // the module has a sample recorded, play that sample
        else {
            module.play();
        }
    }
});

process.stdin.off('keypress', (ch, key => {
    if (key.name === 'r') {
        module.stop();
    }
}));

// setup to close the output stream at the end of the read stage
rs.on('end', () => ao.end());

// Start piping data and start streaming to the AudioOutput
rs.pipe(ao);
ao.start();