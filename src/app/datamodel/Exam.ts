import { GeneralError } from './GeneralError'

export class Exam extends GeneralError{
    
    id : number
    title : string

    constructor(id : number = null, title : string = null, error : string = null){
        super(error)
        this.id = id
        this.title = title
    }
}