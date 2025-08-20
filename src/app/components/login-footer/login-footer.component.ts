import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-footer',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './login-footer.component.html',
  styleUrls: ['./login-footer.component.scss']
})
export class LoginFooterComponent {}
