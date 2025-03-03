import {CartService} from "./cart.service";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";
import {environment} from "../../../environments/environment";

describe('cart service', () => {
  let cartService: CartService;
  const countValue = 3;
  let httpServiceSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpServiceSpy.get.and.returnValue(of({count: countValue}));

    TestBed.configureTestingModule({
      providers: [
        CartService,
        {provide: HttpClient, useValue: httpServiceSpy},
      ]
    });
    cartService = TestBed.inject(CartService);
  })

  it('should emit new count value', (done: DoneFn) => {
      cartService.count$.subscribe(value => {
        expect(value).toBe(countValue);
        done();
      });

      cartService.getCartCount().subscribe();
  });

  it('should make http request for cart data', (done: DoneFn) => {
    cartService.getCart().subscribe(() => {
      expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(environment.api + 'cart', {withCredentials: true});
      done();
    })
  });
});




// import {CartService} from "./cart.service";
// import {of} from "rxjs";
// import {HttpClient} from "@angular/common/http";
// import {environment} from "../../../environments/environment.development";
// import {TestBed} from "@angular/core/testing";
//
// describe('cart service', () => {
//   let cartService: CartService;
//   const countValue = 3;
//   let valueServiceSpy: jasmine.SpyObj<HttpClient>;
//
//   beforeEach(() => {
//
//     TestBed.configureTestingModule({
//
//     })
//     valueServiceSpy = jasmine.createSpyObj('HttpClient', ['get']);
//     valueServiceSpy.get.and.returnValue(of({count: countValue}));
//
//     cartService = new CartService(valueServiceSpy);
//   })
//
//   it('should emit new count value', (done: DoneFn) => {
//       cartService.count$.subscribe(value => {
//         expect(value).toBe(countValue);
//         done();
//       });
//
//       cartService.getCartCount().subscribe();
//   });
//
//   it('should make http request for cart data', (done: DoneFn) => {
//     cartService.getCart().subscribe(() => {
//       expect(valueServiceSpy.get).toHaveBeenCalledOnceWith(environment.api + 'cart', {withCredentials: true});
//       done();
//     })
//   });
// });
