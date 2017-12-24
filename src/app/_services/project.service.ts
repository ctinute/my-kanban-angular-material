import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AppService} from './app.service';
import {ProjectWithRole} from '../_models/projectWithRole';

@Injectable()
export class ProjectService {

    endPoint = '/api/projects';

    constructor(private _appService: AppService) {
    }

    getProjectsOfCurrentUser(): Observable<ProjectWithRole[]> {
        return this._appService.get(this.endPoint);
    }


}
