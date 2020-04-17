import { GeneralError } from './GeneralError'
import { Exam } from './Exam'
import { MCQChoice } from './MCQChoice'

export class Question extends GeneralError{
    
    id : number
    title : string
    exam : Exam
    type : string

    constructor(id : number = null, title : string = null, error : string = null, exam : Exam = null, type : string = null){
        super(error)
        this.id = id
        this.title = title
        this.exam = exam
        this.type = type
    }   
}