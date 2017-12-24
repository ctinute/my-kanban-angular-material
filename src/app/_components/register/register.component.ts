import {Component} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {User} from '../../_models/user';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: [
        '../../app.component.css',
        './register.component.css'
    ]
})
export class RegisterComponent {

    username: string;
    email: string;
    name: string;
    password: string;

    constructor(private _auth: AuthService) {
    }

    register() {
        const user = new User();
        user.username = this.username;
        user.email = this.email;
        user.name = this.name;
        user.password = this.password;

        this._auth.register(user).subscribe(
            rUser => {
                console.log('New user added !');
                console.log(rUser);
                // login luon
                this._auth.login(this.username, this.password, true,
                    function () {
                    },
                    function () {
                    });
            },
            err => console.log(err)
        );
    }
}
