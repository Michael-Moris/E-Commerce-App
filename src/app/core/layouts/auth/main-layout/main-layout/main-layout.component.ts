import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  showBtn: boolean = false

  goToTop() {
    scrollTo({ top: 0, behavior: 'smooth' });
  }
  @HostListener('window:scroll') scrollToTop() {
    let scrollTop = document.documentElement.scrollTop
    if (scrollTop > 500) {
      this.showBtn = true
    } else {
      this.showBtn = false
    }
  }
}
