import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Forgot2HeaderComponent } from '../../components/forgot2-header/forgot2-header.component';
import { Forgot2FormComponent } from '../../components/forgot2-form/forgot2-form.component';
import { Forgot2FooterComponent } from '../../components/forgot2-footer/forgot2-footer.component';

@Component({
  selector: 'app-forgot2',
  standalone: true,
  imports: [IonicModule, Forgot2HeaderComponent, Forgot2FormComponent, Forgot2FooterComponent],
  templateUrl: './forgot2.page.html',
  styleUrls: ['./forgot2.page.scss']
})
export class Forgot2Page {}
