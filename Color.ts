export enum Color {
    Red = "\x1b[31m",
    Green = "\x1b[32m",
    Blue = "\x1b[34m",
    Yellow = "\x1b[33m",
    Magenta = "\x1b[35m",
    Cyan = "\x1b[36m",
    White = "\x1b[37m",
    Black = "\x1b[30m",
    BrightRed = "\x1b[91m",
    BrightGreen = "\x1b[92m",
    BrightYellow = "\x1b[93m",
    BrightBlue = "\x1b[94m",
    BrightMagenta = "\x1b[95m",
    BrightCyan = "\x1b[96m",
    BrightWhite = "\x1b[97m",
}

export enum Style {
    Reset = "\x1b[0m",
    Italic = "\x1b[3m",
    Bold = "\x1b[1m",
    ClearTerminal = "\x1b[2J\x1b[0;0H",
    Erreur = "\x1b[36m" + Italic,
    AfterNumberErreur = Reset + Erreur,
}