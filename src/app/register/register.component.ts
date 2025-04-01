import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  mensajeError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private peticionAPI: ApiService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      last_name: ['', [Validators.required, this.min2wordsValidator]],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, this.samepasswordValidator]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      username: ['', [Validators.required]],
      rol : "3",
    })
  }

  min2wordsValidator(control: AbstractControl): ValidationErrors | null {
    const value =control.value?.trim();
    if (!value) return null

    const words = value.split(/\s+/)
    return words.length >= 2 ? null : { min2words: true };
  }

  samepasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password1 = control.root.get('password1')?.value;
    const password2 = control.value;
    return password1 === password2 ? null : { samepassword: true };
  }

  onSubmit(): void{
    if (this.registerForm.valid){
      this.mensajeError = '';

      this.peticionAPI.registerUsuario(this.registerForm.value).subscribe(
        data => {
          console.log(typeof(this.registerForm.value['telefono']));
          alert('Usuario registrado correctamente');
          this.router.navigate(['']);
        },
        error => {
          if (error.status == 400) {
            if (error.error.username){
              this.mensajeError = error.error.username[0];
            }
            if (error.error.email){
              this.mensajeError += "\n" + error.error.email[0];
            }
            if (error.error.telefono){
              this.mensajeError += "\n" + error.error.telefono[0];
            }
            alert(this.mensajeError);
          } else {
            alert('Error inesperado, intente nuevamente');
          }
        })
    } else if (this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      alert('Por favor, complete los campos requeridos');
    }
  }
}
