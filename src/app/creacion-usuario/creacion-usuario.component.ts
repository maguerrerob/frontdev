import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creacion-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './creacion-usuario.component.html',
  styleUrl: './creacion-usuario.component.css'
})
export class CreacionUsuarioComponent implements OnInit {
  registerForm!: FormGroup;
  mensajeError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private peticion: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      last_name: ['', [Validators.required, this.min2wordsValidator]],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
      password2: ['', [Validators.required, this.samepasswordValidator]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      username: ['', [Validators.required]],
      rol: ['', [Validators.required]],
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

  onSubmit(): void {
    if (this.registerForm.valid){
      this.mensajeError = '';
      this.peticion.superRegistro(this.registerForm.value).subscribe({
        next: (success) => {alert("Usuario creado correctamente"),
          this.router.navigate([''])
        },
        error: (error) => {console.log(error.error);
        }
      })
    }  else if (this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      alert('Por favor, complete los campos requeridos');
    }
  }
}
