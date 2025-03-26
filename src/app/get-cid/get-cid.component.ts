import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetCidService } from '../services/get-cid.service';
import { IgetCid } from '../interfaces/get-cid.interface';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';
import Tesseract from 'tesseract.js';
@Component({
  selector: 'app-get-cid',
  templateUrl: './get-cid.component.html',
  styleUrl: './get-cid.component.css',
})
export class GetCidComponent implements OnInit {
  public form!: FormGroup;
  public result: Array<String> = [];
  public cid!: String;
  public aux_cid!: String;

  constructor(
    private fb: FormBuilder,
    private cidService: GetCidService,
    private toast: ToastrService,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      token: new FormControl('', [Validators.required]),
      iid: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9-]+$'),
      ]),
      recaptchaToken: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.loading.show();
      const formData = this.form.value;
      this.cidService.getCid(formData).subscribe(
        (response) => {
          if (response.cid && response.aux_cid) {
            this.cid = response.cid;
            this.aux_cid = response.aux_cid;
            this.result = this.aux_cid.split('-');
            this.loading.hide();
            this.toast.success(
              'ID de confirmación obtenido con exito!',
              'Success'
            );
          }
          if (response.message) {
            this.loading.hide();
            this.toast.error(`${response.message}`, 'Error');
          }
          this.form.get('recaptchaToken')?.reset();
        },
        (error) => {
          console.error('Form submission failed', error);
          if (error.error.message) {
            this.loading.hide();
            this.toast.error(`${error.error.message}`, 'Error');
            this.form.get('recaptchaToken')?.reset();
          }
        }
      );
    } else {
      this.toast.error(`Verifique los datos del formulario!!`, 'Error');
    }
  }
  onInput() {
    this.formatText();
  }

  formatText() {
    const inputText = this.form.get('iid')?.value;
    if (inputText.length == 63) {
      const groups = inputText.match(/.{1,7}/g) || [];
      const formattedText = groups.join('-');
      this.form.patchValue({
        iid: formattedText,
      });
    } else {
      const groups = inputText.split('-');
      const formattedText = groups.join('');
      this.form.patchValue({
        iid: formattedText,
      });
    }
  }
  // =========================================
  // Manejo del evento PASTE
  // =========================================
  async handlePaste(event: ClipboardEvent) {
    // Si no hay datos en el portapapeles, salimos
    if (!event.clipboardData) {
      return;
    }

    // Prevenimos el pegado por defecto (para evitar que se pegue la imagen como binario)
    event.preventDefault();

    // Obtenemos todos los ítems del portapapeles
    const items = event.clipboardData.items;

    let foundImage = false;

    // Recorremos los items pegados
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Verificamos si es una imagen
      if (item.type.indexOf('image') !== -1) {
        foundImage = true;

        const file = item.getAsFile();
        if (file) {
          try {
            // Mostramos un loader, si es que tienes
            this.loading.show();

            // Procesamos la imagen con Tesseract
            const { data } = await Tesseract.recognize(file, 'eng');
            const recognizedText = data.text.trim();

            // Seteamos el texto reconocido en el FormControl "iid"
            // Además podrías limpiar caracteres no deseados:
            const cleanedText = recognizedText.replace(/[^0-9]/g, '');

            this.form.patchValue({ iid: cleanedText });
            this.formatText();
            this.loading.hide();
            this.toast.success('Texto extraído de la imagen exitosamente!');
          } catch (error) {
            this.loading.hide();
            console.error('Error en OCR', error);
            this.toast.error('No se pudo extraer texto de la imagen', 'Error');
          }
        }
      }
    }

    // Si no encontramos imagen, puede que sea texto normal. Pega el texto directamente.
    if (!foundImage) {
      const pastedText = event.clipboardData.getData('text');
      // Opcionalmente, podrías limpiar el texto:
      // const cleaned = pastedText.replace(/[^0-9]/g, '');
      this.form.patchValue({ iid: pastedText });
    }
  }
}
