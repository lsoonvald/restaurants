import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { bulletRegex, dateRegex, Day, Food, menuLinks, Restaurant, restaurantNames, whitespaceRegex } from '../helpers/menu';
import { MenuApiService } from './menu-api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuFacadeService {

  private restaurants$ = new BehaviorSubject<Restaurant[]>([]);
  restaurants = this.restaurants$.asObservable();

  constructor(
    private apiService: MenuApiService
  ) {}

  public fetchData(): void {
    Object.entries(menuLinks).forEach(([restaurantName, link]) => {
      this.apiService.getRestaurantMenu(link).subscribe((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');

        const days = this.parseDays(doc);
        const dayData = [] as Day[];
        const restaurant: Restaurant = {
          name: restaurantNames[restaurantName as keyof typeof menuLinks],
          menu: []
        };
        days.map((dayElement) => {
          const day = {
            date: this.parseDate(dayElement),
            foods: [] as Food[],
          };
          const foods = this.parseFoods(dayElement);
          foods.map((food) => {
            const title = this.parseTitle(food);
            const price = this.parsePrice(food);
            if (title && title !== '') {
              day.foods.push({
                title,
                price
              });
            }
          });
          dayData.push(day);
        });
        restaurant.menu = dayData;
        const restaurantValue = this.restaurants$.value;
        restaurantValue.push(restaurant);
        this.restaurants$.next(restaurantValue);
      });
    });
  }

  private parsePrice(element: Element): string {
    return element.querySelectorAll('.price,.cena')[0]?.textContent as string;
  }

  private parseTitle(element: Element): string {
    return (element.querySelectorAll('.polevka,.food,.uk-width-expand,.polozka')[0]?.textContent as string)
      ?.trim()
      ?.replace(bulletRegex, '')
      ?.replace(whitespaceRegex, ' ');
  }

  private parseFoods(element: Element): any[] {
    return Array.from(element.querySelectorAll('.row-polevka,.row-food,.uk-grid-small,.uk-grid,.polevka,.jidlo'));
  }

  private parseDays(doc: Document): any[] {
    return Array.from(doc.querySelectorAll('.mb-4,.uk-card-body,.item,.menicka'));
  }

  private parseDate(element: Element | undefined): string | undefined {
    if (element) {
      const date = element.querySelectorAll('.date,.uk-heading-small,.uk-text-center,.uk-margin-remove-bottom,.nadpis');
      const returnDate = (date[0]?.textContent as string)?.replace(/\s+/g, '')?.match(dateRegex);
      return returnDate && returnDate[0] ? returnDate[0] : undefined;
    } else {
      return undefined;
    }
  }
}
