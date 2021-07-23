import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-btrabajo',
  templateUrl: './btrabajo.component.html',
  styleUrls: ['./btrabajo.component.css']
})
export class BtrabajoComponent implements OnInit {


workForm: any;
nombre: string;
whatsapp: string;
email: string;
mensaje: string;

constructor(private formBuilder: FormBuilder, private mailService: MailService) { 
  this.workForm = this.formBuilder.group({
    nombre: new FormControl(this.nombre, [Validators.required, Validators.maxLength(20)]),
    email: new FormControl(this.email, [Validators.required, Validators.email]),
    whatsapp: new FormControl(this.whatsapp, [Validators.required]),
    mensaje: new FormControl(this.mensaje, [Validators.required])
  });
}

formSubmit(contactData: any) {
  this.mailService.sendCocaWorkForm(contactData.nombre, contactData.email,
    contactData.whatsapp, contactData.mensaje)
.subscribe(() => {
swal.fire(`Gracias ${ contactData.nombre }`,
'Tu solicitud ha sido recibida, en breve nos pondremos en contacto contigo',
'success').finally(() => {
  this.workForm.reset();
});
});
}

  ngOnInit(): void {
  }

}
