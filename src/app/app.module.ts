import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppMaterialModule} from './app.material.module';
import {RouterModule, Routes} from '@angular/router';
import {AppService} from './_services/app.service';
import {AuthService} from './_services/auth.service';
import {ProjectService} from './_services/project.service';
import {UserService} from './_services/user.service';
import {HomeComponent} from './_components/home/home.component';
import {LoginComponent} from './_components/login/login.component';
import {RegisterComponent} from './_components/register/register.component';
import {UserComponent} from './_components/user/user.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user', component: UserComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        AppService,
        AuthService,
        ProjectService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
