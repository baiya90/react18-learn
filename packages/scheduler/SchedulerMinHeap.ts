export type Heap<T extends Node> = Array<T>;

export class Node {
   id: number; // 任务的唯一标识
   sortIndex:number; // 排序的依据
}

// ！获取堆顶元素
export function peek<T extends Node>(heap: Heap<T>) : T | null{
    return heap.length === 0 ? null : heap[0];
}


// ！给堆添加元素
export function push<T extends Node >(heap: Heap<T>, node: T):void {
    //  1.把node放到堆的最后
    const index =  heap.length;
    heap.push(node);
    //  2.调整最小堆，从下网上堆化
    shifUp(heap, node, index);
}

// ！调整堆,从下往上堆化
function shifUp<T extends Node >(heap: Heap<T>, node: T, i : number): void{
    let index = i;
    while (index > 0) {
        const parentIndex =(index - 1) >>> 1;
        const parent = heap[parentIndex];
        if(compare(node, parent) > 0){
            // node 子节点更小，和跟节点交换
            heap[parentIndex] = node;
            heap[index] = parent;
            index = parentIndex;
        } else {
            return;
        }
    }
};


// ！删除堆顶元素
export function pop<T extends Node>(heap: Heap<T>): T | null {
    if(heap.length === 0) return null;
    const first = heap[0];
    //  !: 非空断言操作符，告诉 TypeScript 编译器，这里不会返回 undefined。
    const last = heap.pop()!;
    if(first !== last){
        // 证明heap中有2个或者多个元素
        heap[0] = last;
        shifDown(heap, last, 0);
    }
    return first;
}

// 往下调整堆
function shifDown<T extends Node >(heap: Heap<T>, node: T, i : number): void{
    let index = i;
    const length = heap.length;
    const halfLength = length >>> 1;
    while (index < halfLength) {
        const leftIndex = (index + 1) * 2 - 1;
        const left = heap[leftIndex];
        const rightIndex = leftIndex + 1;
        const right = heap[rightIndex];
        if(compare(left, node) < 0){
            // left < node , 左子节点更小，交换
            if(rightIndex < length && compare(right, left) < 0){
                // right存在，且right<left。右子节点更小，交换
                heap[index] = right;
                heap[rightIndex] = node;
                index = rightIndex;
            } else {
                // left更小或者right不存在 
               heap[index] = left;
               heap[leftIndex] = node;
               index = leftIndex;
            }
        } else if(rightIndex < length && compare(right, node) < 0){
            // right存在，且right<node。右子节点更小，交换
            heap[index] = right;
            heap[rightIndex] = node;
            index = rightIndex;
        } else {
            // 根节点最小，直接返回
            return;
        }
 
    }
}



function compare(a: Node, b: Node) : number {
    // 对比数值大小，如果意向对比id
    const diff = a.sortIndex - b.sortIndex;
    return diff !== 0 ? diff : a.id - b.id;
}