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

  images: any = [];
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
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

      this.images.push(event.target.result);
      this.form.patchValue({
        fileSource: this.images,
      });
      reader.readAsDataURL(input.files[0]);
    }

    // if (event.target.files && event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     if (labelElement) {
    //       console.log(labelElement);
    //       labelElement.style.backgroundImage = `url(${e.target?.result})`;
    //     }
    //     if (spanElement) {
    //       spanElement.textContent = file.name;
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // } else {
    //   if (labelElement) {
    //     labelElement.style.backgroundImage = 'none';
    //   }
    //   if (spanElement) {
    //     spanElement.textContent = 'sem anexo';
    //   }
    // }
    // if (event.target.files && event.target.files[0]) {
    //   let filesAmount = event.target.files.length;
    //   for (let i = 0; i < filesAmount; i++) {
    //     let reader = new FileReader();
    //     reader.onload = (event: any) => {
    //       this.images.push(event.target.result);
    //       this.form.patchValue({
    //         fileSource: this.images,
    //       });
    //     };
    //     reader.readAsDataURL(event.target.files[i]);
    //   }
    // }
  }

  submitImovel(): void {
    console.log(this.form.value);
    // const formData = new FormData();
    // formData.append('title', this.form.title);
    // formData.append('imagens', this.form.imagens);
    // formData.append('description', this.form.description);
    // formData.append('purchase_price', this.form.purchase_price);
    // formData.append('sale_price', this.form.sale_price);
    // formData.append('profit_percentage', this.form.profit_percentage);
    // this.imovelService.register(formData).subscribe(() => {});
  }
}
