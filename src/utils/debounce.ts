export interface Cancelable {
    clear(): void
}

// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number = 166): T & Cancelable {
    let timer: number | undefined

    function debounced (...args) {
        const later = () => {
            func?.apply(this, args)
        }
        clearTimeout(timer)
        timer = window.setTimeout(later, wait)
    }

    debounced.clear = () => {
        clearTimeout(timer)
    }

    // @ts-ignore
    return debounced
}
