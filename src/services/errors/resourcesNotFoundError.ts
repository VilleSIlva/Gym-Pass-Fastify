export class ResourcesNotFound extends Error{
    constructor(){
        super("Resource not found")
    }
}