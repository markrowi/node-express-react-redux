module.exports = {
    users: [
                {
                    id:1,
                    username:'admin',
                    password:'password',
                    name: 'Administrator'
                },
                {
                    id:2,
                    username:'rowi',
                    password:'password',
                    name: 'Mark Rowi'
                }
            ],
    findOne : function(u, callback){
        var users = this.users
        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                var user = new User(users[key]);
                console.log(user)
                if(user.username === u.username){
                
                    callback(null, user);
                    return;
                }
            }
        }
         callback(null, false);
      
    },
    findById: function findById(id, callback){
        var users = this.users;
        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                var user = users[key];
                if(user.id === id){
                    callback(null, new User(user));
                    return;
                }
            }
        }
         callback(null, false);
    }
}

function validPassword(pass){
    return (this.password === pass);
}

function getAuthUser(){
    var user = {};
    user.id = this.id;
    user.username = this.username;
    user.name = this.name;
    return user;
}

function UserAuth(username, password){
    this.username = username;
    this.password = password;
}

UserAuth.prototype.validPassword = validPassword;


function User(user){
    this.id = user.id;
    // this.username = user.username;
    // this.password = user.password;
    this.name = user.name;
    UserAuth.call(this, user.username, user.password);

}

User.prototype = Object.create(UserAuth.prototype);


User.prototype.getAuthUser = getAuthUser;


