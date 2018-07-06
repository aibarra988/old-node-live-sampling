require('keypress')(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (ch, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else {
        console.log(ch, key);
        console.log('whattehfeck\n');
    }
});