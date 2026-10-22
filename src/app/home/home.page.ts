import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  AlertController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  navigateOutline,
  mapOutline,
  downloadOutline,
  openOutline,
  documentTextOutline,
  checkmarkCircleOutline,
  peopleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon
  ],
})
export class HomePage {
  private alertController = inject(AlertController);

  // 1.- URL posición GPS solicitada
  public urlUbicacion: string = 'https://www.google.com/maps/@-0.2099077,-78.5137803,19.75z';

  // 2.- URL ruta solicitada
  public urlRuta: string = 'https://www.google.com/maps/dir/C.+José+Mejia+Lequerica+%26+C.+Eugenio+Espejo,+170205+Quito/Independencia+%26+Montevideo,+170103+Quito/KFC+-+Eloy+Alfaro,+Eloy+Alfaro+y+Las+Anonas+esquina,+170513+Quito/César+Endara+%26+Jose+Fernandez,+170133+Quito/@-0.1279908,-78.4728993,15.08z';

  public mensajeEstado: string = '';

  constructor() {
    addIcons({
      locationOutline,
      navigateOutline,
      mapOutline,
      downloadOutline,
      openOutline,
      documentTextOutline,
      checkmarkCircleOutline,
      peopleOutline
    });
  }

  // Abrir enlace en nueva pestaña
  abrirEnlace(url: string) {
    window.open(url, '_blank');
  }

  // 3.- Guardar ubicación en archivo txt
  async guardarUbicacionTxt() {
    const contenido = `UBICACIÓN GPS:\n${this.urlUbicacion}\n\nEstudiantes:\n- Mateo Barba\n- Daniel Diaz\nFecha: ${new Date().toLocaleString()}`;
    this.descargarArchivoTxt('ubicacion.txt', contenido);
    this.mensajeEstado = 'Se guardó correctamente: ubicacion.txt';

    const alert = await this.alertController.create({
      header: '¡Archivo Guardado!',
      subHeader: 'ubicacion.txt',
      message: 'Se descargó el archivo con la URL de la ubicación GPS.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // 4.- Guardar ruta en archivo txt
  async guardarRutaTxt() {
    const contenido = `RUTA DE INTERÉS:\n${this.urlRuta}\n\nEstudiantes:\n- Mateo Barba\n- Daniel Diaz\nFecha: ${new Date().toLocaleString()}`;
    this.descargarArchivoTxt('ruta.txt', contenido);
    this.mensajeEstado = 'Se guardó correctamente: ruta.txt';

    const alert = await this.alertController.create({
      header: '¡Archivo Guardado!',
      subHeader: 'ruta.txt',
      message: 'Se descargó el archivo con la URL de la ruta.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // Método simple para descargar el archivo de texto en el navegador/dispositivo
  private descargarArchivoTxt(nombreArchivo: string, contenido: string) {
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const enlace = document.createElement('a');
    enlace.href = window.URL.createObjectURL(blob);
    enlace.download = nombreArchivo;
    enlace.click();
    window.URL.revokeObjectURL(enlace.href);
  }
}
