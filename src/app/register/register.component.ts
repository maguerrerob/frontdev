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
      password1: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)/)]],
      password2: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      username: ['', [Validators.required]]
    })
  }

  min2wordsValidator(control: AbstractControl): ValidationErrors | null {
    const value =control.value?.trim();
    if (!value) return null

    const words = value.split(/\s+/)
    return words.length >= 2 ? null : { min2words: true };
  }

  onSubmit(): void{
    if (this.registerForm.valid){

    } else if (this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      alert('Por favor, complete los campos requeridos');
    }
  }
}
