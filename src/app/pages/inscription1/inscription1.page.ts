import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Inscription1HeaderComponent } from '../../components/inscription1-header/inscription1-header.component';
import { Inscription1FormComponent } from '../../components/inscription1-form/inscription1-form.component';
import { Inscription1FooterComponent } from '../../components/inscription1-footer/inscription1-footer.component';

@Component({
  selector: 'app-inscription1',
  standalone: true,
  imports: [IonicModule, Inscription1HeaderComponent, Inscription1FormComponent,Inscription1FooterComponent,],
  templateUrl: './inscription1.page.html',
  styleUrls: ['./inscription1.page.scss']
})
export class Inscription1Page {}
