import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-inscription4-form',
  standalone: true,
  imports: [CommonModule, FormsModule,IonicModule],
  templateUrl: './inscription4-form.component.html',
  styleUrls: ['./inscription4-form.component.scss']
})
export class Inscription4FormComponent implements AfterViewInit {

  // Liste des 6 chiffres
  code: string[] = ['', '', '', '', '', ''];

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.otpInputs.forEach((input, index) => {
      input.nativeElement.addEventListener('input', (event: any) => {
        const value = event.target.value;
        if (value && index < this.otpInputs.length - 1) {
          this.otpInputs.toArray()[index + 1].nativeElement.focus();
        }
      });

      input.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Backspace' && !this.code[index] && index > 0) {
          this.otpInputs.toArray()[index - 1].nativeElement.focus();
        }
      });
    });
  }

  // Méthode de soumission
  submitCode() {
    const fullCode = this.code.join('');
    console.log('Code saisi:', fullCode);
    // ici tu peux appeler ton service ou rediriger
  }

  // Simule le renvoi du code
  resendCode() {
    console.log('Code renvoyé');
  }
}
