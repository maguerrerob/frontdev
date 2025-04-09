import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { SesionService } from '../servicios/sesion.service';

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
    private peticionAPI: ApiService,
    private sesion: SesionService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void{
    this.peticionAPI.crearToken(this.loginForm.value).subscribe(
      data => {
        this.sesion.setToken(data['access_token']);
        const token = this.sesion.getToken();
        this.peticionAPI.obtenerUsuario(token).subscribe(
          data => {
            sessionStorage.setItem('usuario', JSON.stringify(data));
            // this.sesion.setUsuario(data);
            // console.log(this.sesion.getUsuario())
            this.router.navigate(['']);
          }
        )
      },
      error => {
        if (error){
          alert('Usuario o contraseña incorrectos');
        }
      }
    ) 
  }
}