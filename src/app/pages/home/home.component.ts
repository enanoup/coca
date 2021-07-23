import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MailService } from '../../services/mail.service';
const $ = (window as any)['jQuery'];
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

@ViewChild('soluciones') targetElement: ElementRef;

scrolled = false;
contactForm: any;
nombre: string;
whatsapp: string;
email: string;
servicio:'';
mensaje: string;

constructor(private viewportScroller: ViewportScroller, private formBuilder: FormBuilder, private mailService: MailService) { 
  this.contactForm = this.formBuilder.group({
    nombre: new FormControl(this.nombre, [Validators.required, Validators.maxLength(20)]),
    email: new FormControl(this.email, [Validators.required, Validators.email]),
    whatsapp: new FormControl(this.whatsapp, [Validators.required]),
    servicio: new FormControl(this.servicio, [Validators.required]),
    mensaje: new FormControl(this.mensaje, [Validators.required])
  });
}

formSubmit(contactData: any) {
  this.mailService.sendCocaForm(contactData.nombre, contactData.email,
    contactData.whatsapp, contactData.servicio, contactData.mensaje)
.subscribe(() => {
swal.fire(`Gracias ${ contactData.nombre }`,
'Tu solicitud ha sido recibida, en breve nos pondremos en contacto contigo',
'success').finally(() => {
  this.contactForm.reset();
  this.servicio = '';
});
});
}

modalElement: any = [];

  modals = [
    {
      id: 'modal-service-1',
      title: 'Head Hunting',
      descripcion: 'Reclutamiento y Selección de Alta Especialidad.',
      htmlInsert: '<br>',
      funcionalidades: ['Directivos y Mandos Medios', 'Reclutamiento TI', 'Perfiles Especializados',
      'Profesionalismo y Confidencialidad','Agilidad','Garantía de Servicio'
      ],
    },
    {
      id: 'modal-service-2',
      title: 'Reclutamiento y Selección',
      descripcion:'Perfiles diversos, de acuerdo a tu necesidad.',
      funcionalidades: ['Manejo y Entendimiento de cualquier sector','Afrontamos exitosamente la selección de cualquier perfil',
      'Búsqueda en el menor tiempo posible','Garantía de Servicio','Profesionalismo y Seguimiento continuo','Disminución de Rotación'
      ],
    },
    {
      id: 'modal-service-3',
      title: 'Maquila de Nómina',
      descripcion:'Eficientamos tu proceso administrativo procesando tu nómina, siempre exactos y en tiempo.',
      funcionalidades: ['Enfoca a tu personal en otras actividades que agregan valor a tu organización','Evita riesgos en el cumplimiento',
    'Sistema Eficiente de Nómina','Reportes de Nómina','Recibos de Nómina Timbrados','Cálculo de los pagos mensuales y bimestrales a IMSS, INFONAVIT y retiro del SUA',
    'Altas, bajas y modificaciones de salario ante el IMSS entre otras','Finiquitos y Liquidaciones'
      ],
    },
    {
      id: 'modal-service-4',
      title: 'Tercerización de Personal',
      descripcion: 'Deja los aspectos contables, fiscales y laborales  en manos de expertos aliados.',
      funcionalidades: ['Personal Fijo','Proyectos Especiales o Temporales','Head Count Limitado','Períodos de Prueba, Incapacidades o Vacaciones',
      'Flexibilidad, Agilidad y Calidad','Reducción de Costos','Costos variables en sustitución de fijos','Cercanía y Acompañamiento'
      ],
    },
    {
        id: 'modal-service-5',
        title: 'Administración On Site',
        descripcion: 'Nos convertimos en tus socios, posicionando a personal de nuestro equipo en tus instalaciones.',
        funcionalidades: [
            'Acompañamiento Total en los procesos de RH','Entendimiento en sitio de tus necesidades diarias',
            'Elaboración de manuales, políticas, etc','Flexibilidad, Agilidad y Calidad'
        ],
      },
      {
        id: 'modal-service-6',
        title: 'Capacitación',
        descripcion:'Incrementamos las competencias y rendimiento de tu personal.',
        funcionalidades: [
         'Confeccionamos capacitaciones ad hoc a tus necesidades','Instructores expertos en impartir diplomados y maestrías',
    'Desarrollamos diplomados modulares, seminarios, cursos y talleres vivenciales en áreas específicas',
    'SoftSkills','HardSkills','Especializadas'
        ],
      }
  ];

  scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 2);
  }

  onClickScroll(elementId:string) {
  
    
    if(elementId != 'home'){
      this.viewportScroller.scrollToAnchor(elementId);
    } else {
      console.log('entra acá');
      this.scrollToTop();
    }
    
  }

  openModal( modal: string ) {
    $('.modal-content-funcion').removeClass('fadeOutUp').addClass('fadeInDown');
    this.modalElement = $('#modal-' + modal);
    this.modalElement.css('display', 'block');
  }

  closeModal() {
    $('.modal-content-funcion').removeClass('fadeInDown').addClass('fadeOutUp');
    setTimeout(() => {
      $('.modal-funcion').css('display', 'none');
    }, 200);
    }



  ngOnInit(): void {

    // Carga el codigo de twitter

    $.getScript ('https://platform.twitter.com/widgets.js');

      // Este código cierra el modal si haces click en cuakquier parte
      $(window).click((e: any) => {
        if ( e.target === this.modalElement[0]) {
          this.closeModal();
        }
      });

    // Slider Principal
    const banner = $("#theme-main-banner");
    
    if (banner.length) {
        banner.camera({ //here I declared some settings, the height and the presence of the thumbnails 
            height: '780px',
            slideOn: 'random',
            pagination: true,
            navigation: false,
            thumbnails: false,
            playPause: false,
            pauseOnClick: false,
            autoPlay: true,
            hover: false,
            overlayer: true,
            loader: 'none',
            minHeight: '400px',
            time: 5000,
        });
    }

    // Carusel de Insights
    const tSlider = $ (".top-features-slide");
    if(tSlider.length) {
        tSlider.owlCarousel({
          loop:true,
          nav:false,
          dots:false,
          autoplay:true,
          autoplayTimeout:2000,
          smartSpeed:1200,
          autoplayHoverPause:true,
          lazyLoad:true,
          responsive:{
                0:{
                    items:1
                },
                500:{
                    items:2
                },
                992:{
                    items:3
                },
                1300:{
                    items:4,
                    autoplay:false,
                }
            },
      });
    }
    
    // Testimonial Slider
    const mSlider = $(".testimonial-slider");
    if (mSlider.length) {
      mSlider.owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 1000,
        autoplayHoverPause: true,
        lazyLoad: true,
        items: 1
    });
  }

  // Capacitaciones Slider
  const rpSlider = $(".core-value-slider");
        if (rpSlider.length) {
            rpSlider.owlCarousel({
                loop: true,
                nav: false,    
                dots: false,
                autoplay: true,
                margin: 30,
                autoplayTimeout: 1000,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                lazyLoad: true,
                responsive: {
                    0: {
                        items: 1     
                    },
                    576: {
                        items: 2
                    },
                    992: {
                        items: 4
                    },
                    1300:{
                        items:4
                    }
                },
            })
        }

        // Process Slider
        const processSlider = $(".process-slider");
              if (processSlider.length) {
                processSlider.owlCarousel({
                      loop: true,
                      nav: false,    
                      dots: false,
                      autoplay: true,
                      autoplayTimeout: 1000,
                      smartSpeed: 1000,
                      autoplayHoverPause: true,
                      lazyLoad: true,
                      responsive: {
                          0: {
                              items: 1     
                          },
                          576: {
                              items: 2
                          },
                          992: {
                              items: 6
                          },
                          1300:{
                              items:6
                          }
                      },
                  })
              }

    // Partner Slider
    var pSlider = $(".partner-slider");
        if (pSlider.length) {
            pSlider.owlCarousel({
                loop: true,
                nav: false,
                dots: false,
                autoplay: true,
                autoplayTimeout: 4000,
                smartSpeed: 1200,
                autoplayHoverPause: true,
                lazyLoad: true,
                responsive: {
                    0: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 3
                    },
                    1200: {
                        items: 3
                    }
                },
            });
        }

  }

}
