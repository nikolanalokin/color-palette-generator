export interface Processor<TColor>{
    update(color: TColor, scaleValue: number, ...restPapams: any[]): TColor
    define?(color: TColor): number
}
