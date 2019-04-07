/**
 * Users
 * id: intending to store socket session ID here
 * name: username
 * score: user's score
 */

export class Users{
    userList = new Map()
    constructor(username){
        this.addUser(username);
     }
     /**addUser
      * checks for duplicates, and adjusts names as defined in validateUsername
      * add user to the list
      * @param username 
      */
    addUser(username:string){
        var temp = ''
        if(this.userList.has(username)){
            temp = this.checkIfExists(username);
            this.userList.set(username,0);
        } else {
            //user with the id doesnt exist
            this.userList.set(username,0)
        }
    }
    /** updateUserScore
     * increments score of user using their username as their identifier
     * @param score 
     */
    updateUserScore(username:string, score:number){
        var currentScore:number;
        if(this.userList.has(username)){
            currentScore = this.userList.get(username) + score;
            this.userList.set(username, currentScore)
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
     * @param username 
     * @returns string
     */
    checkIfExists(username:string){
        if(this.userList.has(username)){
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
        for(var name in this.userList.keys()){
            temp = n > 0 ? username+n : username;
            if(name === temp){
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
        for(var name in this.userList.keys){
            score = this.userList.get(name)
            list.push([name,score]);
        }
        list.sort((x,y) => {
            return y[1] - x[1]
        })
        return list
    }
}