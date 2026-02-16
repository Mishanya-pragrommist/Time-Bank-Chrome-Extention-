class Time {
    constructor(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
    
    add(time) {
        if (time.hours > 0 && time.minutes > 0 && time.seconds > 0) {
            this.seconds += time.seconds;
            this.minutes += this.seconds / 60; 
            
            this.hours = time.hours;
        }
    }
    
    substract(time) {
        this.seconds -= time.seconds;
    }
    
    round() {
        
    }
    
    toString() {
        // Вспомогательная функция для добавления нуля (pad)
        // Если число 5 -> "05", если 12 -> "12"
        const pad = (num) => String(num).padStart(2, '0');

        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
}