export interface IGetTimeAgoStrOptions {
    separator: string;
    suffix: {
        milliseconds: string;
        seconds: string;
        minutes: string;
        hours: string;
        days: string;
        months: string;
        years: string;
    }
}