class Module {
    constructor(options) {
        this.sample = null;
        this.key = options.key;
        this.soundSource = options.soundSource;
    }

    record() {
        
    }

    stop() {

    }
    
    play() {

    }

    hasSample() {
        return this.sample !== null;
    }
}

export default Module;