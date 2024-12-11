function createStorage () {
    return {
        get (key: string) {
            try {
                return JSON.parse(localStorage.getItem(key))
            } catch (err) {
                return null
            }
        },
        set (key: string, data: any) {
            localStorage.setItem(key, JSON.stringify(data))
        },
        remove (key: string) {
            localStorage.removeItem(key)
        },
        clear (key?: string) {
            if (key) {
                localStorage.removeItem(key)
                return
            }

            localStorage.clear()
        },
        update (key: string, data: any) {
            if (!data) this.remove(key)
            else this.set(key, data)
        }
    }
}

export const storage = createStorage()
