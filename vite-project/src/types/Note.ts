

export type Note = {
    id: number,
    userId: number
    title: string,
    content: string,
    creationDate: string
    tags?: string[]
}