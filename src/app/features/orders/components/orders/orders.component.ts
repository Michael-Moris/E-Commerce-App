import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { AllOrders } from '../../models/all-orders';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [DatePipe, NgxPaginationModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  private readonly orderService = inject(OrderService)
  private readonly authService = inject(AuthService)

  userId: string = ''
  allOrdersList: AllOrders[] = []
  p: number = 1;
  isLoading: boolean = false

  ngOnInit(): void {
    this.isLoading = true
    this.authService.saveUserData();
    this.userId = this.authService.userData.id
    this.orderService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        this.allOrdersList = res
        this.isLoading = false
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
      }
    })
  }
}
