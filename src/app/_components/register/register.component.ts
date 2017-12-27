import {Component} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {User} from '../../_models/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: [
        '../../app.component.css',
        './register.component.css'
    ]
})
export class RegisterComponent {
    hasError = false;
    error: string;

    username: string;
    email: string;
    name: string;
    password: string;

    constructor(private _auth: AuthService,
                private _route: Router) {
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
                this._auth.login(
                    this.username,
                    this.password,
                    true,
                    data => this.onLoginSuccess(data),
                    err => this.onLoginError(err));
            },
            err => {
                console.log(err);
                this.hasError = true;
                this.error = err.error.message;
            }
        );
    }

    navigateHome() {
        this._route.navigate(['/']);
    }

    onLoginSuccess(data) {
        // console.log('onLoginSuccess');
        // console.log(data);
        this.navigateHome();
    }

    onLoginError(err) {
    }
}
