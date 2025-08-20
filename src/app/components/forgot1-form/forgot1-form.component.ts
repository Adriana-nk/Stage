import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-forgot1-form',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './forgot1-form.component.html',
  styleUrls: ['./forgot1-form.component.scss']
})
export class Forgot1FormComponent {
  email = '';
  password = '';
  
}
