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
        
        if (minutes !== undefined) {
            this.minutes += minutes;
            if (this.minutes >= 60) {
                const extraHours =  Math.floor(this.minutes / 60);
                this.minutes -= 60 * extraHours;
                this.hours += extraHours;
            }
        }
        
        if (hours !== undefined) {
            this.hours += hours;
        }
    }
    
    substract(seconds, minutes, hours) {
        if (hours > this.hours) throw new Exception("Not enough hours");
        this.hours -= hours;
        this.minutes -= minutes;
        this.seconds -= seconds;
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

test.substract();
