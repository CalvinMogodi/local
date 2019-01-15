import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StoreProvider } from '../../providers/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public submitAttempt: boolean = false;
  public showError: boolean = false;
  public user = {
    username: '',
    password: '',
  }

  constructor(public db: AngularFireDatabase, public fireAuth: AngularFireAuth, public formBuilder: FormBuilder, public userProvider: UserProvider, public router: Router, public storeProvider: StoreProvider) {
    this.loginForm = formBuilder.group({
      password: [this.user.password, Validators.compose([Validators.required])],
      username: [this.user.username, Validators.compose([Validators.required])]
    });
  }

  login() {
    this.submitAttempt = true;
    this.showError = false;

    if (this.loginForm.valid) {
      this.fireAuth.auth.signInWithEmailAndPassword(this.user.username, this.user.password).then((response: any) => {
        let key = response.user.uid;
        this.db.database.ref().child('users').orderByChild('UserId').equalTo(key).once('value', snapshot => {
          var result = snapshot.val();
          if (result != null) {
            snapshot.forEach(snap => {
              var user = snap.val();
              let element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
              element.click();
              sessionStorage.setItem('currentUser', JSON.stringify(user));
              if (user.UserType == 'Supplier') {
                this.storeProvider.getStoreByUserId({ userId: user.UserId }).subscribe((storeResponse: any) => {
                  if (storeResponse != null) {
                    sessionStorage.setItem('currentStore', JSON.stringify(storeResponse));
                  }
                  this.router.navigate(['store']);
                });
              } else {
                this.router.navigate(['product']);
              }
            });
          }
        })
      }, error => {
        this.showError = true;
      });
    }
  }
}