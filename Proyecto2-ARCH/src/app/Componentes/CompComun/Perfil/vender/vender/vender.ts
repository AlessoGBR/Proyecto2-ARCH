import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../../../Objects/Categorias/categoria';
import { CategoriaService } from '../../../../../Services/Inicio/categoria-service';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../../../Services/Productos/productos-service';
import { Auth } from '../../../../../Services/auth';
import { user } from '../../../../../Objects/User/user';

@Component({
  selector: 'app-vender',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vender.html',
  styleUrl: './vender.css',
})
export class Vender implements OnInit {
  product = { name: '', description: '', price: null, stock: null, condition: 'nuevo' };
  categorias: Categoria[] = [];
  productTitle: string = '';
  productDescription: string = '';
  selectedCategory: string = '';
  price: number = 0;
  quantity: number = 1;
  shipping: boolean = false;
  maxImages: number = 5;
  images: { file: File; url: string }[] = [];
  imagePreview: any;
  usuario: user | null = null;

  errors: string[] = [];

  constructor(
    private categoriasService: CategoriaService,
    private productoService: ProductosService,
    private auth: Auth
  ) {}

  ngOnInit(): void {

    this.categoriasService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      },
    });
    this.auth.obtenerUsuario(localStorage.getItem('idUsuario')!).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (err) => {
        console.error('Error al cargar usuario:', err);
      },
    });
  }

  onSeleccionarImagen(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);
    const espacioDisponible = this.maxImages - this.images.length;
    const aProcesar = files.slice(0, Math.max(0, espacioDisponible));

    for (const f of aProcesar) {
      const url = URL.createObjectURL(f);
      this.images.push({ file: f, url });
    }

    input.value = '';
  }

  removerImagen(index: number): void {
    if (index < 0 || index >= this.images.length) return;
    URL.revokeObjectURL(this.images[index].url);
    this.images.splice(index, 1);
  }

  validar(): boolean {
    this.errors = [];

    if (!this.product.name.trim()) this.errors.push('El título es requerido.');
    if (!this.product.description.trim()) this.errors.push('La descripción es requerida.');
    if (!(this.product.price! > 0)) this.errors.push('El precio debe ser mayor que 0.');
    if (!(Number.isInteger(this.quantity) && this.quantity > 0))
      this.errors.push('La cantidad debe ser un entero positivo.');
    if (this.images.length === 0) this.errors.push('Se requiere al menos una imagen.');
    if (!this.selectedCategory) this.errors.push('Debe seleccionar una categoría.');

    if (this.errors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        html: `<ul style="text-align:left;margin:0;padding-left:1.2em">${this.errors
          .map((e) => `<li>${e}</li>`)
          .join('')}</ul>`,
      });
      return false;
    }

    return true;
  }

  enviar(): void {
    if (!this.validar()) {
      return;
    }

    const form = new FormData();
    form.append('nombre', this.product.name.trim());
    form.append('descripcion', this.product.description.trim());
    form.append('precio', String(this.product.price));
    form.append('stock', String(this.product.stock));
    form.append('estado', String(this.product.condition));
    form.append('idCategoria', this.selectedCategory);
    form.append('idUsuario', localStorage.getItem('idUsuario') || '0');

    this.images.forEach((img, idx) =>
      form.append('imagen', img.file, `image_${idx}.${this.obtenerExtension(img.file.name)}`)
    );

    this.productoService.crearProductoForm(form).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Producto enviado',
          text: 'El producto ha sido enviado a revisión.',
        });
        this.resetear();
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al enviar el producto. Inténtalo de nuevo más tarde.',
        });
      },
    });
  }

  private obtenerExtension(nombre: string): string {
    const p = nombre.lastIndexOf('.');
    return p >= 0 ? nombre.substring(p + 1) : 'jpg';
  }

  selectCategory(categoria: Categoria): void {
    this.selectedCategory = categoria.idCategoria.toString();
    console.log(this.selectedCategory);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      if (this.imagePreview) {
        const inImages = this.images.some((i) => i.url === this.imagePreview);
        if (!inImages) {
          try {
            URL.revokeObjectURL(this.imagePreview);
          } catch {}
        }
        this.imagePreview = null;
      }
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      return;
    }

    if (this.imagePreview) {
      const inImages = this.images.some((i) => i.url === this.imagePreview);
      if (!inImages) {
        try {
          URL.revokeObjectURL(this.imagePreview);
        } catch {}
      }
    }

    const url = URL.createObjectURL(file);

    if (this.images.length < this.maxImages) {
      this.images.push({ file, url });
    }

    this.imagePreview = url;

    input.value = '';
  }

  submitProduct() {
    if (this.validar()) {
      this.enviar();
    }
  }

  resetear(): void {
    this.productTitle = '';
    this.productDescription = '';
    this.price = 0;
    this.quantity = 1;
    this.shipping = false;

    for (const img of this.images) {
      try {
        URL.revokeObjectURL(img.url);
      } catch {}
    }
    this.images = [];
    this.errors = [];
  }

  ngOnDestroy(): void {
    for (const img of this.images) {
      try {
        URL.revokeObjectURL(img.url);
      } catch {}
    }
  }
}
