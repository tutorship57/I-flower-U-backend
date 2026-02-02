
export const addMinutesToDate = (date: Date, minutes: number): Date => {
    const MinutesInMilliseconds = minutes * 60000;
    return new Date(date.getTime() + MinutesInMilliseconds);
}