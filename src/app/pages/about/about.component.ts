import { Component, OnInit } from '@angular/core';
const $ = (window as any)['jQuery'];

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { 

  }


  ngOnInit(): void {
    
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
