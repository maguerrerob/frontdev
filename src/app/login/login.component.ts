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
    if (this.loginForm.valid){
      const infoform = this.loginForm.value;
      console.log(infoform['username']);
      this.peticionAPI.obtenerToken(infoform).subscribe(data => {
        localStorage.setItem('token', data['access_token'])
        console.log(data['access_token']);
        this.peticionAPI.loginUsuario(data['access_token']).subscribe(data => {
          console.log(data);
        })
      }
      )
      // this.router.navigate(['']);
      // Aquí puedes agregar la lógica para guardar la información del usuario, por ejemplo, enviarla a un servidor
    } else if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      alert('Por favor, complete los campos requeridos');
    }
  }
}