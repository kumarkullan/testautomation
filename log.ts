import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, prettyPrint, printf } = format;
export default class CutomLogger {
    public static myFormat = printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    });
    public static logger = createLogger({
        format: combine(
            label({ label: "right meow!" }),
            timestamp(),
            CutomLogger.myFormat,
        ),
        level: "info",
        transports: [
            new transports.File({ filename: "winston-basic.log" }),
            new transports.Console(),
        ],
    });

}
