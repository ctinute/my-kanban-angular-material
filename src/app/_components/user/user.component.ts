import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../../_models/user';
import {ProjectWithRole} from '../../_models/projectWithRole';
import {Team} from '../../_models/team';
import {Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';
import {UserService} from '../../_services/user.service';
import {ProjectService} from '../../_services/project.service';


@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html',
    styleUrls: [
        '../../app.component.css',
        './user.component.css'
    ]
})

export class UserComponent implements OnInit, AfterViewInit {

    displayedColumns = ['id', 'name', 'isPublic'];
    dataSource = new MatTableDataSource();
    isLoadingResults = false;

    @ViewChild(MatSort) sort: MatSort;

    private user: User;
    private projects: ProjectWithRole[];
    private teams: Team;

    constructor(private _router: Router,
                private _auth: AuthService,
                private _userService: UserService,
                private _projectService: ProjectService) {
    }

    ngOnInit(): void {
        if (!this._auth.isAuthenticated()) {
            this._router.navigate(['/login']);
        } else {
            this._userService.getCurrentUser()
                .subscribe(
                    data => this.user = data,
                    error => console.log(error)
                );
            this._projectService.getProjectsOfCurrentUser()
                .subscribe(
                    data => {
                        this.projects = data;
                        this.dataSource.data = this.projects;
                    },
                    error => {
                        console.log(error);
                    }
                );
        }
    }

    /**
     * Set the sort after the view init since this component will
     * be able to query its view for the initialized sort.
     */
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        // this.exampleDatabase = new ExampleHttpDao(this.http);
        //
        // // If the user changes the sort order, reset back to the first page.
        // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        //
        // Observable.merge(this.sort.sortChange, this.paginator.page)
        //     .startWith(null)
        //     .switchMap(() => {
        //         this.isLoadingResults = true;
        //         return this.exampleDatabase!.getRepoIssues(
        //             this.sort.active, this.sort.direction, this.paginator.pageIndex);
        //     })
        //     .map(data => {
        //         // Flip flag to show that loading has finished.
        //         this.isLoadingResults = false;
        //         this.isRateLimitReached = false;
        //         this.resultsLength = data.total_count;
        //
        //         return data.items;
        //     })
        //     .catch(() => {
        //         this.isLoadingResults = false;
        //         // Catch if the GitHub API has reached its rate limit. Return empty data.
        //         this.isRateLimitReached = true;
        //         return Observable.of([]);
        //     })
        //     .subscribe(data => this.dataSource.data = data);
    }
}
