import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { Router, ActivatedRoute } from '@angular/router'

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smsXpress-angular';

  sms: any;
  // Variável para o Form Group
  smsForm: FormGroup;
  // Variáveis para os campos do formulário
  numeros:string[]=[''];
  mensagem:string='';

  // Construtor
  constructor(
    private modalService: BsModalService, // serviço do ngx-bootstrap para mostrar o modal
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { } 

  // Variável para manter uma referência do modal
  public modalRef: BsModalRef; 
  // Variável de configuração do modal
  configModal = 
  {
    backdrop:true,
    ignoreBackdropClick: true // Opção para não dispensar o modal ao clicar numa área fora dele
  };

  public openModal(template: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template, this.configModal); // Quando o botão é clicado, a referência ao modal é mantida e o nome local ao template é passado para o serviço
  }

  // Função para retornar um registro de SMS pela API
  getSMS(protocolo)
  {
    this.api.getSMS(protocolo)
      .subscribe(data => {
        console.log(data);
        this.sms = data;
      });
  }

  // Função para enviar o formulário
  onFormSubmit(form: NgForm)
  {
    this.api.postSMS(form)
      .subscribe(res => {}, (err) => {
        console.log(err);
      })
  }

  public ngOnInit()
  {
    // Chamada da função 'getSMS' ao inicializar o componente
    this.getSMS(this.route.snapshot.params['protocolo']); 

    this.smsForm = this.formBuilder.group
    ({
      'numeros' : [null, Validators.required],
      'mensagem' : [null, Validators.required]
    })

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
