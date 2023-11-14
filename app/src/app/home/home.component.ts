import { Component } from '@angular/core';
import { ModalService } from '../services/serviceComponents/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private ModalService: ModalService) {}

  openModal() {
    this.ModalService.openModal();
  }
}
