
export default class User {

    //props
    user_name
    user_password
    user_mail
    user_Team
    //ctor
    constructor(user_name, user_password, user_mail, user_Team) {
        this.user_name = user_name
        this.user_password = user_password
        this.user_mail = user_mail
        this.user_Team = user_Team
    }

    tos() {
        return `mail=${this.user_name},pass=${this.user_password},mail=${this.user_mail},userTeam=${this.user_Team}`
    }

}