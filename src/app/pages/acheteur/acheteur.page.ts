import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { AcheteurFormComponent } from 'src/app/components/acheteur-form/acheteur-form.component';
import { AcheteurFooterComponent } from 'src/app/components/acheteur-footer/acheteur-footer.component';


@Component({
  selector: 'app-acheteur',
  templateUrl: './acheteur.page.html',
  styleUrls: ['./acheteur.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, AcheteurFormComponent, AcheteurFooterComponent]
})
export class AcheteurPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
  