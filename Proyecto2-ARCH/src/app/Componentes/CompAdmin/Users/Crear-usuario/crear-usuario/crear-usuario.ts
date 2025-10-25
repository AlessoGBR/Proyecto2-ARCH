import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../../../Services/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css',
})
export class CrearUsuario {
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
      rol: ['', Validators.required],
    });
  }

  get f() {
    return this.usuarioForm.controls;
  }

  crearEmpleado() {
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
          title: 'Empleado registrado',
          text: 'El empleado fue registrado exitosamente.',
          confirmButtonColor: '#28a745',
        });
        this.usuarioForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el empleado. Inténtalo nuevamente.',
        });
      },
    });
  }

  regresar(){
    this.router.navigate(['/admin']);
  }
}
