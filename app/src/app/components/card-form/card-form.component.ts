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

  images = [];
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    purchase_price: new FormControl('', [Validators.required]),
    sale_price: new FormControl('', [Validators.required]),
    profit_percentage: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),

    // Adicione outras propriedades do formulário conforme necessário
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

    this.subscription = this.modalState.openModal$.subscribe(
      () => this.open(this.cardModal) // Alterado para usar a referência do template
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

  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      console.log(filesAmount);

      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          console.log('====================================');
          console.log(event.target.result, 'sdads');
          console.log('====================================');
          // this.images.push(event.target.result);
        };
      }
    }
    // const reader = new FileReader();
    // if (event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.form.imagem = file;
    //   };
    // }
  }

  // handleFileInput(files: File[]) {
  //   this.form.imagens = files;
  //   for (const file of files) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       console.log(reader.result);
  //     };
  //   }
  // }

  // handleFileInput(event: any) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const files = event.target.files;
  //     this.form.imagens = Array.from(files);
  //     console.log(this.form.imagens);

  //     for (const file of files) {
  //       reader.readAsDataURL(file);

  //       reader.onload = () => {
  //         console.log(reader.result);
  //       };
  //     }
  //   }
  // }

  submitImovel(): void {
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
