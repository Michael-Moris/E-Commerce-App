import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { AllOrders } from '../../models/all-orders';
import { DatePipe, DecimalPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, NgxPaginationModule, RouterLink, DecimalPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit, OnDestroy {

  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);
  private readonly datePipe = inject(DatePipe);
  private orderSubscription?: Subscription;

  allOrdersList: AllOrders[] = [];
  userId: string = '';
  p: number = 1;
  isLoading: boolean = false;
  itemsPerPage: number = 3;

  getExpectedDeliveryDate(createdAt: string): string {
    const createdDate = new Date(createdAt);
    const expectedDate = new Date(createdDate.setDate(createdDate.getDate() + 3));
    return this.datePipe.transform(expectedDate, 'd MMMM y') || '';
  }

  isDelivered(createdAt: string): boolean {
    const createdDate = new Date(createdAt);
    const deliveryDate = new Date(createdDate.setDate(createdDate.getDate() + 3));
    const today = new Date();
    return deliveryDate <= today;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.saveUserData();
    this.userId = this.authService.userData.id;
    this.orderSubscription = this.orderService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        this.allOrdersList = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }
}
