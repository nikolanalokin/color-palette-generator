export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a
export const clamp = (a: number, min: number = 0, max: number = 1) => Math.min(max, Math.max(min, a))
export const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x))
export const range = (x1: number, y1: number, x2: number, y2: number, a: number) => lerp(x2, y2, invlerp(x1, y1, a))

type Point = [number, number]
export const bezier = (t: number, p1: Point, p2: Point, p3: Point, p4: Point) => {
    const x = (t: number) => Math.pow(1 - t, 3) * p1[0] + 3 * t * Math.pow(1 - t, 2) * p2[0] + 3 * Math.pow(t, 2) * (1 - t) * p3[0] + Math.pow(t, 3) * p4[0]
    const y = (t: number) => Math.pow(1 - t, 3) * p1[1] + 3 * t * Math.pow(1 - t, 2) * p2[1] + 3 * Math.pow(t, 2) * (1 - t) * p3[1] + Math.pow(t, 3) * p4[1]
    return [x(t), y(t)] as Point
}
