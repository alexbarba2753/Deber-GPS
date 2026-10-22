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
  peopleOutline,
  shareSocialOutline
} from 'ionicons/icons';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor, registerPlugin } from '@capacitor/core';

interface DownloadPlugin {
  saveToDownloads(options: { fileName: string; content: string }): Promise<{ success: boolean; path: string }>;
}

const NativeDownload = registerPlugin<DownloadPlugin>('DownloadPlugin');

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
      peopleOutline,
      shareSocialOutline
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
        // En Android (APK nativa): Guardar directamente en la carpeta pública de Descargas (Downloads)
        const res = await NativeDownload.saveToDownloads({
          fileName: nombreArchivo,
          content: contenido
        });

        console.log('Guardado en descargas:', res);

        const alert = await this.alertController.create({
          header: '¡Archivo Guardado!',
          subHeader: nombreArchivo,
          message: `El archivo se guardó directamente en tu carpeta de Descargas (Downloads) de tu teléfono.\n\nYa puedes abrir la aplicación "Archivos" o "Descargas" de tu celular para verlo.`,
          buttons: [
            {
              text: 'Aceptar',
              role: 'cancel'
            },
            {
              text: 'Compartir',
              handler: async () => {
                try {
                  await Share.share({
                    title: nombreArchivo,
                    text: contenido,
                    dialogTitle: `Compartir ${nombreArchivo}`
                  });
                } catch (shareErr) {
                  console.log('Error o cancelado al compartir:', shareErr);
                }
              }
            }
          ]
        });
        await alert.present();

      } catch (err: any) {
        console.error('Error al guardar en Descargas nativo:', err);

        // Fallback por si la versión de Android no permitiera acceso a MediaStore
        try {
          const fileRes = await Filesystem.writeFile({
            path: nombreArchivo,
            data: contenido,
            directory: Directory.Documents,
            encoding: Encoding.UTF8
          });

          await Share.share({
            title: nombreArchivo,
            text: contenido,
            url: fileRes.uri,
            dialogTitle: `Guardar o compartir ${nombreArchivo}`
          });
        } catch (fallbackErr: any) {
          const errorAlert = await this.alertController.create({
            header: 'Error al Guardar',
            message: 'No se pudo guardar el archivo: ' + (err?.message || err),
            buttons: ['Aceptar']
          });
          await errorAlert.present();
        }
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
