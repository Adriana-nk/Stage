import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InscriptionHeaderComponent } from '../../components/inscription-header/inscription-header.component';
import { InscriptionFormComponent } from '../../components/inscription-form/inscription-form.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [IonicModule, InscriptionHeaderComponent, InscriptionFormComponent],
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss']
})
export class InscriptionPage {
  constructor(private router: Router) {}

  commencer() {
    this.router.navigate(['/inscription1']);
  }
}
