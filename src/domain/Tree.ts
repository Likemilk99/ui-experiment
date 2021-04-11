import Info from "./Info"

interface Tree {
    id: number
    label: string
    type: number
    children: Tree[]
    info: Info | null
}

export default Tree
