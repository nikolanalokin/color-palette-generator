export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a
export const clamp = (a: number, min: number = 0, max: number = 1) => Math.min(max, Math.max(min, a))
export const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x))
export const range = (x1: number, y1: number, x2: number, y2: number, a: number) => lerp(x2, y2, invlerp(x1, y1, a))

export type Point = [number, number]
export const bezier = (t: number, p1: Point, p2: Point, p3: Point, p4?: Point) => {
    if (!p4) {
        const x = (t: number) => Math.pow(1 - t, 2) * p1[0] + 2 * t * (1 - t) * p2[0] + Math.pow(t, 2) * p3[0]
        const y = (t: number) => Math.pow(1 - t, 2) * p1[1] + 2 * t * (1 - t) * p2[1] + Math.pow(t, 2) * p3[1]
        return [x(t), y(t)] as Point
    }
    const x = (t: number) => Math.pow(1 - t, 3) * p1[0] + 3 * t * Math.pow(1 - t, 2) * p2[0] + 3 * Math.pow(t, 2) * (1 - t) * p3[0] + Math.pow(t, 3) * p4[0]
    const y = (t: number) => Math.pow(1 - t, 3) * p1[1] + 3 * t * Math.pow(1 - t, 2) * p2[1] + 3 * Math.pow(t, 2) * (1 - t) * p3[1] + Math.pow(t, 3) * p4[1]
    return [x(t), y(t)] as Point
}

/**
 * Линейная функция с пересечением в заданной точке
 * @param x
 * @param a - коэфициент увеличения
 * @param x0 - x координата точки пересечения
 * @param y0 - y координата точки пересечения
 * @returns
 */
export const linear = (x: number, a: number, x0: number, y0: number) => {
    return y0 + a * (x - x0)
}
/**
 * Параболическая функция с заданной вершиной
 * @param x
 * @param a - коэфициент расширения
 * @param x0 - x координата вершины
 * @param y0 - y координата вершины
 * @returns
 */
export const parabolaWithVertex = (x: number, a: number, x0: number, y0: number) => {
    return a * Math.pow(x - x0, 2) + y0
}

export function round (value: number, precision: number = 2) {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)
}

export function precision (value: number) {
    if (!isFinite(value)) return 0
    let e = 1, p = 0
    while (Math.round(value * e) / e !== value) {
        e *= 10
        p++
    }
    return p
}

export function ticks (range: number[], count: number): number[] {
    if (count < 2) {
        return range
    }
    return [...new Array(count)].map((_, i) => lerp(range.at(0), range.at(-1), i / (count - 1)))
}
