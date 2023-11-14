import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/serviceComponents/modal.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class CardFormComponent {
  @ViewChild('card_modal') cardModal!: TemplateRef<any>;

  private subscription: Subscription;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private modalState: ModalService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.subscription = this.modalState.openModal$.subscribe(
      () => this.open(this.cardModal) // Alterado para usar a referência do template
    );
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg' });
  }
}
