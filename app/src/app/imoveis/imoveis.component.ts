import { Component } from '@angular/core';
import { ModalService } from '../services/serviceComponents/modal.service';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css'],
})
export class ImoveisComponent {
  constructor(private ModalService: ModalService) {}

  openModal() {
    this.ModalService.openModal();
  }
}
