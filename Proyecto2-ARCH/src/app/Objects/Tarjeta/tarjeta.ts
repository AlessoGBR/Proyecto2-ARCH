export interface tarjeta {
  usuario: string;
  id?: number;
  cvv: string;
  esPrincipal?: boolean;
  ultimos4Digitos?: string;
  fechaExpiracion: string;
  nombreTitular: string;
  numero_tarjeta?: string;
  tipoTarjeta?: string;
  principal?: boolean;
  titular?: string;
  expiracion?: string;
  tipo?: string;
}
