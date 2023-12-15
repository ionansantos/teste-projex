import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/serviceComponents/modal.service';
import { ImovelService } from 'src/app/services/imovel.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class CardFormComponent {
  @ViewChild('card_modal') cardModal!: TemplateRef<any>;

  showErrorMsg: boolean = false;
  images: any = [];
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    purchase_price: new FormControl('', [Validators.required]),
    sale_price: new FormControl('', [Validators.required]),
    profit_percentage: new FormControl('', [Validators.required]),
  });

  private subscription: Subscription;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private modalState: ModalService,
    private imovelService: ImovelService,
    private formBuilder: FormBuilder
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.subscription = this.modalState.openModal$.subscribe(() =>
      this.open(this.cardModal)
    );
  }

  get f() {
    return this.form.controls;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg' });
  }

  calcularPercentualLucro() {
    const purchaseValue = parseFloat(
      this.form.get('purchase_price')?.value?.toString() ?? 'O'
    );
    const saleValue = parseFloat(
      this.form.get('sale_price')?.value?.toString() ?? 'O'
    );

    if (!isNaN(purchaseValue) && !isNaN(saleValue)) {
      const profitPercentage = (saleValue - purchaseValue) / purchaseValue;

      this.form.get('profit_percentage')?.setValue(profitPercentage.toFixed(2));
    }
  }

  handleFileInput(event: any, inputId: any, areaInput: any, fileName: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const spanFileName = document.getElementById(fileName);
    const files = event.target.files;

    if (input.files?.length) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const fileUpload = document.getElementById(areaInput);
        const fileName = input.files?.[0].name;

        if (fileUpload) {
          fileUpload.style.backgroundImage = `url(${e.target?.result})`;
          fileUpload.style.backgroundSize = `cover`;
        }
        if (spanFileName && fileName) spanFileName.innerHTML = fileName;
      };

      reader.readAsDataURL(input.files[0]);

      // adiciona as imagens no array images
      for (let i = 0; i < files.length; i++) {
        this.images.push(files[i]);
      }
    }
  }

  submitImovel(): void {
    const formData = new FormData();

    formData.append('title', this.form.get('title')?.value?.toString() ?? '');
    formData.append(
      'description',
      this.form.get('description')?.value?.toString() ?? ''
    );
    formData.append(
      'purchase_price',
      this.form.get('purchase_price')?.value?.toString() ?? ''
    );
    formData.append(
      'sale_price',
      this.form.get('sale_price')?.value?.toString() ?? ''
    );
    formData.append(
      'profit_percentage',
      this.form.get('profit_percentage')?.value?.toString() ?? ''
    );

    for (let i = 0; i < this.images.length; i++) {
      formData.append('images', this.images[i]);
    }

    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsTouched();
    });

    if (this.form.valid) {
      this.imovelService.register(formData).subscribe(() => {});
    }
  }
}
