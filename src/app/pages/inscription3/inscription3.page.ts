import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Inscription3HeaderComponent } from 'src/app/components/inscription3-header/inscription3-header.component';
import { Inscription3FormComponent } from 'src/app/components/inscription3-form/inscription3-form.component';
import { Inscription3FooterComponent } from 'src/app/components/inscription3-footer/inscription3-footer.component';

@Component({
  selector: 'app-Inscription3',
  standalone: true,
  imports: [IonicModule, Inscription3HeaderComponent, Inscription3FormComponent, Inscription3FooterComponent],
  templateUrl: './inscription3.page.html',
  styleUrls: ['./inscription3.page.scss']
})
export class Inscription3Page {}
