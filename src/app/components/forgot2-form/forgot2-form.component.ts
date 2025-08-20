import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot2-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot2-form.component.html',
  styleUrls: ['./forgot2-form.component.scss']
})
export class Forgot2FormComponent {
  
  password = '';
  
}
