class Time {
    constructor(hours, minutes, seconds, time) {
        if (time !== undefined) {
            this.seconds = time.seconds;
            this.minutes = time.minutes;
            this.hours = time.hours;
        }
        else {
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;
        }
    }
    
    add(seconds, minutes, hours) {
        this.seconds += seconds;
        if (this.seconds >= 60) {
            const extraMinutes = Math.floor(this.seconds / 60);
            this.seconds -= 60 * extraMinutes;
            this.minutes += extraMinutes;
        }
        
        if (minutes !== undefined) this.minutes += minutes;
        
        if (this.minutes >= 60) {
            const extraHours =  Math.floor(this.minutes / 60);
            this.minutes -= 60 * extraHours;
            this.hours += extraHours;
        }
        
        if (hours !== undefined) this.hours += hours;
    }
    
    substract(seconds, minutes, hours) {
        if (this.toSeconds < (seconds + minutes * 60 + hours * 3600)) {
            console.log("Not enough time");
        }
        
        this.seconds -= seconds;
        if (this.seconds < 0) {
            this.seconds *= -1;
            const extraMinutes = Math.ceil(this.seconds / 60);
            this.minutes -= extraMinutes;
            this.seconds = 60 * extraMinutes - this.seconds;
        }
        
        if (minutes !== undefined && minutes > 0)
            this.minutes -= minutes;
        if (this.minutes < 0) {
            this.minutes *= -1;
            const extraHours = Math.ceil(this.minutes / 60);
            this.hours -= extraHours;
            this.minutes = 60 * extraHours - this.minutes;
        }
        
        if (hours !== undefined && hours > 0) 
            this.hours -= hours;
        return this;
    }
    
    toSeconds() {
        return this.seconds + this.minutes * 60 + this.hours * 3600;
    }
    
    floor() {
        this.seconds = 0;
    }
    
    getTime() {
        return new Time(this);
    }
    
    toString() {
        // For adding 0 (pad)
        // Eg,  5 -> "05", 12 -> "12"
        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
}

const test = new Time(1, 20, 20);

console.log(test.toString());

test.add(250, 120);
console.log("1:20:20 + 240s 120m = ", test.toString());

const seconds = 0;
const minutes = 160;
console.log(`${test.toString()} - ${minutes}:${seconds} = ${test.substract(seconds, minutes).toString()}`);
