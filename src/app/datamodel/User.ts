import { GeneralError } from './GeneralError'

export class User extends GeneralError{
    name : string
    email : string
    type : string
    constructor(name:string = null, email : string = null, error : string = null, type : string = null){
        super(error)
        this.name = name
        this.email = email
        this.type = type
    }
}