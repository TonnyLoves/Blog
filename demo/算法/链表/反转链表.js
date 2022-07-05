function LinkNode() {
    this.next = null
    this.value = null
}

function reserve(node) {
    if (node.next == null) {
        return
    }
    let head = node
    let a = reserve(head.next)
    head.next.next = head
    head.next = null
    return a
}