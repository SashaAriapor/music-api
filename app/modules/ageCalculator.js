function ageCalculator(value) {
    const day = value.split("/")[1]
    const month = value.split("/")[0]
    const year = value.split("/")[2]
    let nowDate = new Date();
    let nowDay = nowDate.getDay();
    let nowMonth = nowDate.getMonth() + 1;
    const nowYear = nowDate.getFullYear();
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > nowDay){
        nowDay = nowDay + months[ nowMonth - 1 ];
        nowMonth = nowMonth - 1;
    }
    if (month > nowMonth) {
       nowMonth = nowMonth + 12;
       nowYear = nowYear - 1; 
    }
    const userDay = nowDay - day;
    const userMonth = nowMonth - month;
    const userYear = nowYear - year;
    return [ `${userYear}y`, `${userMonth}m`, `${userDay}d` ];
} 

module.exports = {
    ageCalculator
}
            
