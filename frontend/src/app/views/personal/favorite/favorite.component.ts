import {Component, Input, OnInit} from '@angular/core';
import {FavoriteService} from "../../../shared/services/favorite.service";
import {FavoriteType} from "../../../../types/favorite.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environments/environment.development";
import {CartType} from "../../../../types/cart.type";
import {CartService} from "../../../shared/services/cart.service";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit{
  serverStaticPath = environment.serverStaticPath;
  products: FavoriteType[] = [];
  cart: CartType | null = null;

  constructor(private favoriteService: FavoriteService,
              private cartService: CartService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
      this.favoriteService.getFavorites()
        .subscribe((data: FavoriteType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            const error = (data as DefaultResponseType).message;
            throw new Error(error);
          }

          this.products = data as FavoriteType[];
        })
      this.cartService.getCart()
        .subscribe((data: CartType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          this.cart = data as CartType;
          console.log(this.products);
          console.log(this.cart.items);
          for (let i = 0; i < this.products.length; i++) {
            for (let j = 0; j < this.cart.items.length; j++) {
              if (this.products[i].id === this.cart.items[j].product.id) {
                this.products[i].countInCart = this.cart.items[j].quantity;
              }
            }
          }
        })
  }

  addToCart(product: FavoriteType): void {
    this.cartService.updateCart(product.id, 1)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        product.countInCart = 1;
      });
  }

  removeFromCart(product: FavoriteType) {
    this.cartService.updateCart(product.id, 0)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        product.countInCart = 0;
      });
  }

  updateCount(product: FavoriteType, count: number) {
    if (this.cart) {
      this.cartService.updateCart(product.id, count)
        .subscribe((data: CartType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          this.cart = data as CartType;
          product.countInCart = count;
        })
    }
  }

  removeFromFavorites(id: string) {
    this.favoriteService.removeFavorite(id)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          throw new Error(data.message);
        }

        this.products = this.products.filter(item => item.id !== id);
      })
  }
}
