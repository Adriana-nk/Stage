import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Forgot1HeaderComponent } from '../../components/forgot1-header/forgot1-header.component';
import { Forgot1FormComponent } from '../../components/forgot1-form/forgot1-form.component';
import { Forgot1FooterComponent } from '../../components/forgot1-footer/forgot1-footer.component';

@Component({
  selector: 'app-forgot1',
  standalone: true,
  imports: [IonicModule, Forgot1HeaderComponent, Forgot1FormComponent, Forgot1FooterComponent],
  templateUrl: './forgot1.page.html',
  styleUrls: ['./forgot1.page.scss']
})
export class Forgot1Page {}
