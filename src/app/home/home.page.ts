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
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

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

  // Abrir enlace en Google Maps o navegador externo
  abrirEnlace(url: string) {
    if (Capacitor.isNativePlatform()) {
      window.open(url, '_system');
    } else {
      window.open(url, '_blank');
    }
  }

  // 3.- Guardar ubicación en archivo txt
  async guardarUbicacionTxt() {
    const contenido = `UBICACIÓN GPS:\n${this.urlUbicacion}\n\nEstudiantes:\n- Mateo Barba\n- Daniel Diaz\nFecha: ${new Date().toLocaleString()}`;
    await this.descargarArchivoTxt('ubicacion.txt', contenido);
    this.mensajeEstado = 'Se guardó correctamente: ubicacion.txt';
  }

  // 4.- Guardar ruta en archivo txt
  async guardarRutaTxt() {
    const contenido = `RUTA DE INTERÉS:\n${this.urlRuta}\n\nEstudiantes:\n- Mateo Barba\n- Daniel Diaz\nFecha: ${new Date().toLocaleString()}`;
    await this.descargarArchivoTxt('ruta.txt', contenido);
    this.mensajeEstado = 'Se guardó correctamente: ruta.txt';
  }

  // Método compatible con Navegador Web (PC) y Android APK
  private async descargarArchivoTxt(nombreArchivo: string, contenido: string) {
    if (Capacitor.isNativePlatform()) {
      try {
        // En Android (APK nativa), escribimos el archivo en el sistema de archivos del dispositivo
        const resultado = await Filesystem.writeFile({
          path: nombreArchivo,
          data: contenido,
          directory: Directory.Documents,
          encoding: Encoding.UTF8
        });

        console.log('Archivo guardado en:', resultado.uri);

        const alert = await this.alertController.create({
          header: '¡Archivo Guardado!',
          subHeader: nombreArchivo,
          message: 'El archivo se guardó en el almacenamiento del dispositivo.\n\n¿Deseas guardarlo en Descargas o compartirlo?',
          buttons: [
            {
              text: 'Solo Guardar',
              role: 'cancel'
            },
            {
              text: 'Guardar en Descargas / Compartir',
              handler: async () => {
                try {
                  await Share.share({
                    title: nombreArchivo,
                    text: contenido,
                    url: resultado.uri,
                    dialogTitle: `Guardar ${nombreArchivo} en Descargas`
                  });
                } catch (shareErr) {
                  console.log('Acción cancelada o error al compartir:', shareErr);
                }
              }
            }
          ]
        });
        await alert.present();
      } catch (err: any) {
        console.error('Error al guardar en nativo:', err);
        const errorAlert = await this.alertController.create({
          header: 'Error al Guardar',
          message: 'No se pudo guardar el archivo en el dispositivo: ' + (err?.message || err),
          buttons: ['Aceptar']
        });
        await errorAlert.present();
      }
    } else {
      // En navegador web (PC)
      const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
      const enlace = document.createElement('a');
      enlace.href = window.URL.createObjectURL(blob);
      enlace.download = nombreArchivo;
      enlace.click();
      window.URL.revokeObjectURL(enlace.href);

      const alert = await this.alertController.create({
        header: '¡Archivo Guardado!',
        subHeader: nombreArchivo,
        message: 'Se descargó el archivo en tu carpeta de Descargas.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}
