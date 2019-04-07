/**
 * Users
 * id: intending to store socket session ID here
 * name: username
 * score: user's score
 */

export class Users{
    userList = new Map()
    constructor(socket_id, username){
        this.addUser(socket_id,username);
     }
     /**addUser
      * checks for duplicates, and adjusts names as defined in validateUsername
      * add user to the list
      * @param socket_id 
      * @param username 
      */
    addUser(socket_id:string, username:string){
        var temp = ''
        if(this.userList.has(socket_id)){
            temp = this.checkIfExists(socket_id,username);
            this.userList.set(socket_id,new User(temp));
        } else {
            //user with the id doesnt exist
            this.userList.set(socket_id, new User(username))
        }
    }
    /** updateUserScore
     * increments score of user using their socket_id as their identifier
     * @param socket_id 
     * @param score 
     */
    updateUserScore(socket_id:string, score:number){
        if(this.userList.has(socket_id)){
            this.userList.get(socket_id).addScore(score)
        } //else do nothing
    }
    /** clear
     * Clears the userList.  Use only when the game ends.
     */
    clear(){
        this.userList.clear()
    }
    /** checkIfExists
     * checks if socket_id is already registered.
     *  if so, check if username already exists, and apply any appends necessary
     * returns the username 
     * @param socket_id 
     * @param username 
     * @returns string
     */
    checkIfExists(socket_id:string, username:string){
        if(this.userList.has(socket_id)){
            return this.validateUsername(username,0)
        } else { return username }
    }
    /** validateUsername
     * recursively, checks if user exists within the userList
     * returns a name, appended by a number if applicable.
     * @param username
     * @param n The number that will be appended if username already exists
     * @returns string
     */
    validateUsername(username:string, n:number){
        var temp = '';
        for(var key in this.userList.keys){
            temp = n > 0 ? username+n : username;
            if(this.userList.get(key).name === temp){
                temp = this.validateUsername(username, n++)
            } else {
                return temp
            }
        }
        return temp
    }
    /** getUserList
     * creates a list of users and their score
     * Sorted by scores in descending order
     * @returns array[string, number]
     */
    getUserList(){
        var list = []
        var name:string
        var score:number
        for(var key in this.userList.keys){
            name = this.userList.get(key).name
            score = this.userList.get(key).score
            list.push([name,score]);
        }
        list.sort((x,y) => {
            return y[1] - x[1]
        })
        return list
    }
}

class User{
    name:string;
    score:number;
    constructor(username:string){
        this.name = username;
        this.score = 0;
    }
    addScore(val:number){
        this.score = this.score + val;
    }
    setScore(val:number){
        //shouldn't be needed, but who knows?
        this.score = val;
    }
}