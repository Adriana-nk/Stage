import { compileClassDebugInfo } from '@angular/compiler';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-inscription-header',
  standalone: true,
  imports: [
    IonicModule,
  ],
  templateUrl: './inscription-header.component.html',
  styleUrls: ['./inscription-header.component.scss']
})
export class InscriptionHeaderComponent {}