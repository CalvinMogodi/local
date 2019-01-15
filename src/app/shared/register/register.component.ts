import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserProvider } from '../../providers/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitAttempt: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  confirmPassword = '';
  tncCheck: boolean = false;
  public user = {
    username: '',
    name: '',
    surname: '',
    password: '',
    isSupplier: false,
    userType: 'User'
  }

  constructor(public db: AngularFireDatabase, public fireAuth: AngularFireAuth, public formBuilder: FormBuilder, public userProvider: UserProvider, public router: Router) {
    this.registerForm = formBuilder.group({
      name: [this.user.name, Validators.compose([Validators.required])],
      surname: [this.user.surname, Validators.compose([Validators.required])],
      isSupplier: [this.user.isSupplier, Validators.compose([Validators.required])],
      password: [this.user.password, Validators.compose([Validators.required])],
      username: [this.user.username, Validators.compose([Validators.required])],
      confirmPassword: [this.confirmPassword]
    });
  }

  Register() {
    this.submitAttempt = true;
    this.showError = false;
    this.errorMessage = '';
    if (this.user.password != this.confirmPassword)
      return false;

    if (this.registerForm.valid) {
      if (this.user.isSupplier)
        this.user.userType = 'Supplier';
      this.fireAuth.auth.createUserWithEmailAndPassword(this.user.username, this.user.password).then((newUser) => {
        let user = {UserId: newUser.user.uid, Username: this.user.username, Name: this.user.name, Surname: this.user.surname,
          Password: this.user.password, UserType: this.user.userType}
        this.db.list('/users').push(user).then((response: any) => {
          let element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
          element.click();
          if(user.UserType == 'Supplier')
            this.router.navigate(['store']);
          else
            this.router.navigate(['product']);
        }, error => {
          this.showError = true;
          this.errorMessage = 'We are unable to register right now, Please try again later.';
        });
      }, error => {
        this.showError = true;
        this.errorMessage = 'We are unable to register right now, Please try again later.';
      });

    }
  }

}