import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  baseUrl = 'http://localhost:3000/api/users/login'

  objLogin = {
    email: '',
    senha: ''
  }

  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  async login() {
    let resposta;
    await this.loginService.login(this.baseUrl, this.objLogin)
      .then(function (res: any) {
        resposta = res;
    })

    this.isAuthenticated = resposta.id == 1 ? true : false;

    if(this.isAuthenticated == true) {
      this.loginService.showMessage(resposta.response, false)
      this.router.navigate(["/home"])
    } else {
      this.loginService.showMessage(resposta.response, true)
      console.log(resposta.response)
    }
  }

}
