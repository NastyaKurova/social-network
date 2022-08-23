export function updateObjectArray(items, itemId, objectElementName, newObject) {
    return items.map(u => {
        if (u[objectElementName] === itemId) return {...u, ...newObject}
        return u;
    })
}