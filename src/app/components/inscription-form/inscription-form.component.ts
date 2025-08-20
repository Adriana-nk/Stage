import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import{ RouterModule } from '@angular/router';
@Component({
  selector: 'app-inscription-form',
  standalone: true,
  imports: [
    IonicModule,RouterModule
  ],
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss']
})
export class InscriptionFormComponent {
  
}