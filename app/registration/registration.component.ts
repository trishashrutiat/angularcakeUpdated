import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'] // Corrected styleUrl to styleUrls
})
export class RegistrationComponent {
  name: string = "";
  username: string = "";
  email: string = ""; // Changed String to string for consistency
  phone: string = ""; // Changed String to string for consistency
  password: string = ""; // Changed String to string for consistency
  gender: string = ""; // Changed String to string for consistency

  msg: string = '';
  collectedData: any;

  constructor(
    private util: NodeUtilityService,
    private http: HttpClient // Inject HttpClient
  ) {}

  onSubmit(form: any) {
    // Send registration data to the server
    if (form.valid) {

    this.util.insert(form.value.name, form.value.username, form.value.email, form.value.phone, form.value.password, form.value.gender)
      .subscribe((data) => {
        if (data.status) {
          this.msg = data.message;
          console.log(data.message)
        }
      });
      alert('Form is valid');
    }
    else {
      alert('Form is not valid. Please check all fields.'); // Display alert for invalid form
    }
  }

  
}
