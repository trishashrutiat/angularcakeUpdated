import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NodeUtilityService } from '../node-utility.service';
import { DataService } from '../dataservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  msg: string = "";
  user: string = "";
  collectedData: string = "";

  login: FormGroup; // Define login as a FormGroup here

  constructor(private router: Router, private util: NodeUtilityService, private dataService: DataService) {
    this.login = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ])
    });
  }

  onSubmit() {
    if (this.login.valid) {
      const { username, password } = this.login.value;
      this.util.insert1(username, password).subscribe((data) => {
        if (data.status) {
          console.log("Server response:", data);
          // If status is true, login successful
          if (data.message === 'admin') {
            localStorage.setItem("admin", username);
            this.router.navigate(['/admin']);
          } else {
            localStorage.setItem("user", username);
            this.router.navigate(['/product']);
          }
          this.msg = data.message;
        } else {
          // If status is false, login failed
          this.msg = data.message;
        }
      });
      this.dataService.setData(this.collectedData);
    }
  }

  get usernameControl() {
    return this.login.get('username');
  }

  get passwordControl() {
    return this.login.get('password');
  }
}
