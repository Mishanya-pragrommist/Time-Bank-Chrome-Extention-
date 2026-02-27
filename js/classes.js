//Represents time in "hh:mm:ss" format
export class Time {
    constructor(hours, minutes, seconds) { 
        this.hours = (hours !== undefined ? hours : 0);
        this.minutes = (minutes !== undefined ? minutes : 0);
        this.seconds = (seconds !== undefined ? seconds : 0);
    }
    
    // Set seconds, minutes and hours separately
    set(seconds, minutes, hours) {
        this.seconds = seconds || 0;
        this.minutes = minutes || 0;
        this.hours = hours || 0;
    }
    
    // Set time using Time object
    setTime(time) {
        this.seconds = time.seconds;
        this.minutes = time.minutes;
        this.hours = time.hours;
    }
    
    // Set all values to 0
    reset() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
    
    add(seconds, minutes, hours) {
        if (seconds !== undefined) {
            this.seconds += seconds;
            if (this.seconds >= 60) {
                const extraMinutes = Math.floor(this.seconds / 60);
                this.seconds -= 60 * extraMinutes;
                this.minutes += extraMinutes;
            }
        }
        
        if (minutes !== undefined) {
            this.minutes += minutes;
            if (this.minutes >= 60) {
                const extraHours =  Math.floor(this.minutes / 60);
                this.minutes -= 60 * extraHours;
                this.hours += extraHours;
            }
        } 
        
        if (hours !== undefined) this.hours += hours;
    }
    
    substract(seconds, minutes, hours) {
        // If not enough time, an error is thrown
        if (this.toSeconds() < 
            (seconds + minutes * 60 + hours * 3600)) {
            throw new RangeError("Недостаточно времени для снятия");
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
        if (this.hours <= 0 &&
            this.minutes <= 0 &&
            this.seconds <= 0) {
            throw new RangeError("Недостаточно времени");
        }
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
    
    // Returns time in seconds
    toSeconds() {
        return this.seconds + this.minutes * 60 + this.hours * 3600;
    }
    
    // Formats time in "hh:mm:ss" format
    toString() {
        // Eg,  5 -> "05", 12 -> "12"
        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
}

//Type of events like "spent 30 minutes", 
//"got 20 minutes bonus" etc
export const Type = Object.freeze({
    SPEND: 1,
    EARN: 2,
    EVENT: 3
});

//Represents one action
export class Transaction {
    constructor(timestamp, type, description, time) {
        if (timestamp instanceof Date) this.timestamp = timestamp;
        if (type === Type) this.type = type;
        this.description = description;
        if (time !== undefined && time instanceof Time) this.amount = time;
    }
    
    toString() {
        return `${this.timestamp} ${this.type} ${this.description}`;
    }
}

export class Timer {
    static IDLE() { return 1; }
    static RUNNING() { return 2; }
    static PAUSED() { return 3; }
    
    constructor(hours, minutes, seconds) {
        this.time = new Time(hours, minutes, seconds);
        
        this.state = Timer.IDLE();
    }
    
    hasTime() {
        return this.time.toSeconds() > 0;
    }
    
    // Set seconds, minutes and hours separately
    set(seconds, minutes, hours) {
        this.time = new Time(hours, minutes, seconds);
    }
    
    // Set time using Time object
    setTime(time) {
        this.time.seconds = time.seconds;
        this.time.minutes = time.minutes;
        this.time.hours = time.hours;
    }
    
    // Set time to 0
    reset() {
        this.time.reset();
        this.state = Timer.IDLE();
    }
    
    // Will be written in future
    start() {
        this.state = Timer.RUNNING();
        console.log("Timer started working. state: ", this.state);
    }
    
    // Will be written in future
    pause() {
        this.state = Timer.PAUSED();
        console.log("Timer paused. isRunning: ", this.state);
    }
    
    // Will be written in future
    stop() {
        this.state = Timer.IDLE();
        console.log("Timer stopped. Rest: ", this.time.toString(), "; state: ", this.state);
    }
}

// Convert seconds to Time object
export function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return new Time(hours, minutes, seconds);
}
