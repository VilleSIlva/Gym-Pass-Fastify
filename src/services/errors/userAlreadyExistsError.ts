export class UserAlreadyExistsError extends Error{
    constructor(){
        super("Already exists email")
    }
}