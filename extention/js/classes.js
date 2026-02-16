class Time {
    constructor(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
    
    add(time) {
        this.seconds += time.seconds;
        if (this.seconds >= 60) {
            const minutes = Math.floor(this.seconds / 60);
            this.seconds -= 60 * minutes;
            this.minutes += minutes;
        }
        
        this.minutes += time.minutes;
        if (this.minutes >= 60) {
            const hours =  Math.floor(this.minutes / 60);
            this.minutes -= 60 * hours;
            this.hours += hours;
        }
        
        this.hours += time.hours;
    }
    
    substract(time) {
        this.seconds -= time.seconds;
    }
    
    round() {
        this.seconds = 0;
    }
    
    toString() {
        // For adding 0 (pad)
        // Eg,  5 -> "05", 12 -> "12"
        const pad = (num) => String(num).padStart(2, '0');

        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
}

const test = new Time(1, 20, 20);

console.log(time);
