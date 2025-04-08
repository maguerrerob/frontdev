import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private peticionAPI: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void{
  //   this.peticionAPI.obtenerToken(this.loginForm.value).subscribe(
  //     data => {
  //       localStorage.setItem('token', data['access_token']);
  //       const token = localStorage.getItem('token') || '';
  //       this.peticionAPI.loginUsuario(token).subscribe(
  //         data => {
  //           console.log(data);
            
  //           // this.router.navigate(['home']);
  //         })
  //     },
  //     error => {
  //       alert(error.error);
  //     }
  //   ) 
  }
}