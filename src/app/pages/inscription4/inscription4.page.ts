import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Inscription4HeaderComponent } from '../../components/inscription4-header/inscription4-header.component';
import { Inscription4FormComponent } from '../../components/inscription4-form/inscription4-form.component';
import { Inscription4FooterComponent } from '../../components/inscription4-footer/inscription4-footer.component';

@Component({
  selector: 'app-inscription4',
  standalone: true,
  imports: [IonicModule, CommonModule, Inscription4HeaderComponent, Inscription4FormComponent, Inscription4FooterComponent],
  templateUrl: './inscription4.page.html',
  styleUrls: ['./inscription4.page.scss']
})
export class Inscription4Page {}
