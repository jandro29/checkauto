import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();

    window.addEventListener('load', AOS.refresh)
  }

}
