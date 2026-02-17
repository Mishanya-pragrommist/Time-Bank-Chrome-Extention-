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
    
    // Rounds time to minutes in smaller side
    floor() {
        this.seconds = 0;
    }
    
    // Increases time by 1 second
    up() {
        this.seconds++;
        if (this.seconds >= 60) {
            this.seconds = 0;
            this.minutes++;
        }
        if (this.minutes >= 60) {
            this.minutes = 0;
            this.hours++;
        }
    }
    
    // Decreases time by 1 second
    down() {
        this.seconds--;
        if (this.seconds < 0) {
            this.seconds = 59;
            this.minutes--;
        }
        if (this.minutes < 0) {
            this.minutes = 59;
            this.hours--;
        }
    }
    
    getTime() {
        return new Time(this);
    }
    
    // Formats time in "hh:mm:ss" format
    toString() {
        // For adding 0 (pad)
        // Eg,  5 -> "05", 12 -> "12"
        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
}

//Tests

const test = new Time(1, 20, 20);

console.log(test.toString());

test.add(250, 120);
console.log("1:20:20 + 240s 120m = ", test.toString());

const seconds = 0;
const minutes = 160;
console.log(`${test.toString()} - ${minutes}:${seconds} = ${test.substract(seconds, minutes).toString()}`);

test.floor();
console.log("floor() = ", test.toString());

console.log("Testing methods up() and down()");
console.log("Up()");
for (let i = 0; i < 200; i++) {
    test.up();
    console.log(test.toString());
}

console.log("Down()");
for (let i = 0; i < 200; i++) {
    test.down();
    console.log(test.toString());
}

test.seconds = 23;
test.minutes = 54;
test.hours = 3;
console.log(test.toString(), " + toSeconds() = ", test.toSeconds());

class Transaction {
    constructor(date, time, description) {
        
    }
    
    toString() {
        
    }
}