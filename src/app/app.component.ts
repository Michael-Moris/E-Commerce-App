import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
declare const initFlowbite: any;
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'Fresh-Cart';

  constructor(private router: Router) { }

  //* ===== Ensures navbar functionality after route changes, even with lazy loading ===== //
  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (typeof initFlowbite === 'function') {
            initFlowbite();
          }
        }, 0);
      }
    });
  }
}

