import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tarjeta } from '../../../../../Objects/Tarjeta/tarjeta';
import { TarjetaService } from '../../../../../Services/Tarjeta/tarjeta-service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarjetas-guardadas',
  imports: [CommonModule, FormsModule],
  templateUrl: './tarjetas-guardadas.html',
  styleUrl: './tarjetas-guardadas.css',
})
export class TarjetasGuardadas implements OnInit {
  tarjetasGuardadas: tarjeta[] = [];
  tarjeta: tarjeta = new Object() as tarjeta;

  constructor(private tarjetaService: TarjetaService) {}

  ngOnInit() {
    this.cargarTarjetas();
  }

  async agregarNuevaTarjeta() {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar tarjeta',
      html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre del titular">
      <input id="swal-numero" class="swal2-input" placeholder="Número de tarjeta" maxlength="19">
      <input id="swal-exp" class="swal2-input" placeholder="MM/AA" maxlength="5">
      <input id="swal-cvv" class="swal2-input" placeholder="CVV" maxlength="4">
      
      <label for="swal-principal" class="swal2-label">Establecer como tarjeta principal</label>
      <input id="swal-principal" type="checkbox" class="swal2-checkbox">
      <select id="swal-tipo" class="swal2-input">
        <option value="">Seleccionar tipo</option>
        <option value="visa">Visa</option>
        <option value="mastercard">MasterCard</option>
        <option value="american_express">American Express</option>
      </select>
    `,
      focusConfirm: false,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      preConfirm: () => {
        const nombre = (document.getElementById('swal-nombre') as HTMLInputElement).value.trim();
        const numero = (document.getElementById('swal-numero') as HTMLInputElement).value.trim();
        const expiracion = (document.getElementById('swal-exp') as HTMLInputElement).value.trim();
        const cvv = (document.getElementById('swal-cvv') as HTMLInputElement).value.trim();
        const tipo = (document.getElementById('swal-tipo') as HTMLSelectElement).value.trim();
        const principal = (document.getElementById('swal-principal') as HTMLInputElement).checked;

        if (!nombre || !numero || !expiracion || !cvv || !tipo) {
          Swal.showValidationMessage('Por favor completa todos los campos.');
          return false;
        }

        if (!/^\d{16}$/.test(numero.replace(/\s+/g, ''))) {
          Swal.showValidationMessage('El número de tarjeta debe tener 16 dígitos.');
          return false;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiracion)) {
          Swal.showValidationMessage('La fecha de expiración debe tener el formato MM/AA.');
          return false;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
          Swal.showValidationMessage('El CVV debe tener 3 o 4 dígitos.');
          return false;
        }

        return { nombre, numero, expiracion, cvv, tipo };
      },
    });

    if (formValues) {
      const nuevaTarjeta: tarjeta = {
        usuario: localStorage.getItem('idUsuario') || '',
        nombreTitular: formValues.nombre,
        numero_tarjeta: formValues.numero,
        fechaExpiracion: formValues.expiracion,
        cvv: formValues.cvv,
        tipoTarjeta: formValues.tipo,
        esPrincipal: formValues.principal
      };

      this.tarjetaService.agregarTarjeta(nuevaTarjeta).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Tarjeta agregada correctamente.',
          });
          this.cargarTarjetas();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar la tarjeta. Inténtalo más tarde.',
          });
        },
      });
    }
  }

  eliminarTarjeta(id: number) {
    Swal.fire({
      title: '¿Eliminar tarjeta?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tarjetaService.eliminarTarjeta(id).subscribe({
          next: () => {
            Swal.fire('Eliminada', 'La tarjeta ha sido eliminada correctamente', 'success');
            this.cargarTarjetas();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la tarjeta', 'error');
          },
        });
      }
    });
  }

  private cargarTarjetas() {
    const idUsuarioNum = Number(localStorage.getItem('idUsuario') || '1');
    console.log('Cargando tarjetas para usuario ID:', idUsuarioNum);
    this.tarjetaService.obtenerTarjetas(idUsuarioNum).subscribe((tarjetas) => {
      this.tarjetasGuardadas = tarjetas;
    });
  }

  establecerPrincipal(id: number) {
    const tarjetaSeleccionada = this.tarjetasGuardadas.find(t => t.id === id);
    if (tarjetaSeleccionada) {
      tarjetaSeleccionada.esPrincipal = true;
      this.tarjetaService.pasarAPrincipal(id,localStorage.getItem('idUsuario') || '').subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Tarjeta establecida como principal.',
          });
          this.cargarTarjetas();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo establecer la tarjeta como principal. Inténtalo más tarde.',
          });
        },
      });
    }
  }
}
