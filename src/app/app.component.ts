import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl } from '@angular/forms';
import { ApiService } from './api.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smsXpress-angular';

  sms: any;

  constructor(
    private modalService: BsModalService, // serviço do ngx-bootstrap para mostrar o modal
    private api: ApiService
    ) { } 

  public modalRef: BsModalRef;  // Variável para manter uma referência do modal
  config = 
  {
    backdrop:true,
    ignoreBackdropClick: true // Opção para não dispensar o modal ao clicar numa área fora dele
  };

  public openModal(template: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template, this.config); // Quando o botão é clicado, a referência ao modal é mantida e o nome local ao template é passado para o serviço
  }

  public ngOnInit()
  {
    // Início dos Scripts do template Startbootstrap-new-age
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 48)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 54
    });

    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse); // Fim dos Scripts do Template

  }
}
