export function getNextId (items: { id: string }[]) {
    return items.length > 0 ? String(Math.max(...items.map(p => +p.id)) + 1) : '1'
}
