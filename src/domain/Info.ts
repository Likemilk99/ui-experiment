import FieldType from "./FieldType"

interface Field {
    id: number
    field: string
    value: string | number | boolean
    bold: boolean
    type: FieldType
}

export default Field
