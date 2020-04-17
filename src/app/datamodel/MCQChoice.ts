import { GeneralError } from './GeneralError'
import { Question } from './Question'

export class MCQChoice extends GeneralError{
    
    id : number
    choice : string
    valid : boolean
    question : Question

    constructor(id : number = null, choice : string = null, error : string = null, valid : boolean = false, question : Question = null){
        super(error)
        this.id = id
        this.choice = choice
        this.valid = valid
        this.question = question
    }
}