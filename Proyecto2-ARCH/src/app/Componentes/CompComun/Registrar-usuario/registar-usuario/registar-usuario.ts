import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../../Services/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registar-usuario',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registar-usuario.html',
  styleUrl: './registar-usuario.css'
})
export class RegistarUsuario {

  usuarioForm: FormGroup;
  submitted = false;
  password: string = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      telefono: [''],
      direccion: [''],
      fechaNacimiento: [''],
      rol: ['COMUN', Validators.required],
    });
  }

  get f() {
    return this.usuarioForm.controls;
  }

  crearUsuario() {
    this.submitted = true;

    if (this.usuarioForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos requeridos.',
      });
      return;
    }

    const usuario = this.usuarioForm.value;
    this.auth.crearEmpleado(usuario, usuario.password).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'Haz sido registrado exitosamente.',
          confirmButtonColor: '#28a745',
        });
        this.usuarioForm.reset();
        this.submitted = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo completar el registro.',
        });
      },
    });
  }

  regresar(){
    this.router.navigate(['/login']);
  }
}
