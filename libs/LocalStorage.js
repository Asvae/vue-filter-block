import lockr from 'lockr'

export default class LocalStorage {
    
    /**
     * Read variable from local storage
     * @param key
     * @returns {*}
     */
    static getValue(key) {
        return lockr.get(key)
    }

    /**
     * Write variable to local storage
     * @param key
     * @param value
     */
    static setValue(key, value) {
        return lockr.set(key, value)
    }
}