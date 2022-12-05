import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  formLoading: boolean = false;

  contactForm = this.builder.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    version: ['', Validators.required],
    anio_fab: ['', Validators.required],
    kilometraje: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', Validators.required],
  });

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if (this.formLoading) return;
    if (!this.contactForm.valid) return;

    const contactData = {
      marca: this.contactForm.value.marca,
      modelo: this.contactForm.value.modelo,
      version: this.contactForm.value.version,
      anio_fab: this.contactForm.value.anio_fab,
      kilometraje: this.contactForm.value.kilometraje,
      email: this.contactForm.value.email,
      celular: this.contactForm.value.celular,
    };

    this.formLoading = true;
    this.contactForm.disable();

    this.http
      .post<any>('https://checkauto.pe/send-mail.php', contactData)
      .subscribe(
        (resp) => {
          this.formLoading = false;
          this.contactForm.enable();
          this.contactForm.reset();
          this.resetForm();

          this._snackBar.open('¡Listo! Hemos recibido tu mensaje.', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        (error) => {
          alert(
            'Ocurrió un error. Por favor, inténtelo nuevamente en unos minutos.'
          );
          this.formLoading = false;
          this.contactForm.enable();
        }
      );
  }

  resetForm() {
    this.contactForm.controls['marca'].setErrors(null);
    this.contactForm.controls['modelo'].setErrors(null);
    this.contactForm.controls['version'].setErrors(null);
    this.contactForm.controls['anio_fab'].setErrors(null);
    this.contactForm.controls['kilometraje'].setErrors(null);
    this.contactForm.controls['email'].setErrors(null);
    this.contactForm.controls['celular'].setErrors(null);
  }

  constructor(
    private http: HttpClient,
    private builder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
