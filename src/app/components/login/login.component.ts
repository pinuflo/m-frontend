import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,      
        private authenticationService: AuthenticationService
    ){}

    ngOnInit() 
    {

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

    get f() { return this.loginForm.controls; }

    onSubmit() 
    {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
       
        this.authenticationService.login(this.f.username.value , this.f.password.value)
        .pipe(first())
        .subscribe(
            data => 
            {
                console.log(data);
                this.loading = false;
                this.error = "Usuario logeado";
                this.router.navigate([this.returnUrl]);
            },
            error => {
                console.log(error);
                this.error = "ERROR:" + error.statusText;
                this.loading = false;
            });
       
    }

}
