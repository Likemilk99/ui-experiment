import Tree from "../domain/Tree"

export const treeRoot: Tree = {
    id: 0,
    label: "Root",
    type: 0,
    children: [],
    info: null,
}

export const treeData: Tree[] = Array.from(Array(10).keys()).map((it) => ({
    id: it,
    label: "Label_" + it,
    type: it,
    children: [],
    info: null,
}))
