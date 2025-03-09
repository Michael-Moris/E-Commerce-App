import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { AllOrders } from '../../models/all-orders';
import { DatePipe } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-orders',
  imports: [DatePipe ,NgxPaginationModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  private readonly orderService = inject(OrderService)
  private readonly authService = inject(AuthService)

  userId: string = ''
  allOrdersList: AllOrders[] = []
  p: number = 1;

  ngOnInit(): void {
    this.authService.saveUserData();
    this.userId = this.authService.userData.id
    this.orderService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        this.allOrdersList = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
