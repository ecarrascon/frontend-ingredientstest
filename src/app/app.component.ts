import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from './ingredient';
import { IngredientService } from './ingredient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public ingredients: Ingredient[] = [];
  public editIngredient: Ingredient | undefined;
  public deleteIngredient: Ingredient | undefined;

  constructor(private ingredientService: IngredientService){}

  ngOnInit(): void {
    this.getIngredients();
  }

  public getIngredients(): void {
    this.ingredientService.getIngredients().subscribe({
      next:(response: Ingredient[]) => {
        this.ingredients = response;
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onAddIngredient(addForm: NgForm): void {
    document.getElementById('add-ingredient-form')?.click();
    this.ingredientService.addIngredients(addForm.value).subscribe({
      next:(response: Ingredient) => {
        console.log(response);
        this.getIngredients();
        addForm.reset();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onUpdateIngredient(ingredient: Ingredient): void {
    this.ingredientService.updateIngredients(ingredient).subscribe({
      next:(response: Ingredient) => {
        console.log(response);
        this.getIngredients();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteIngredient(ingredientId: number | undefined ): void {
    this.ingredientService.deleteIngredients(ingredientId).subscribe({
      next:(response: void) => {
        console.log(response);
        this.getIngredients();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchIngredients(key: string): void {
    const results: Ingredient[] = [];
    for (const ingredient of this.ingredients) {
      if (ingredient.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1) {
        results.push(ingredient);
      }

    }
    this.ingredients = results;
    if(results.length === 0 || !key) {
      this.getIngredients();
    }
  }

  public onOpenModal(mode: string, ingredient?: Ingredient): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add') {
      button.setAttribute('data-target','#addIngredientModal');
    }
    if (mode === 'edit') {
      this.editIngredient = ingredient;
      button.setAttribute('data-target','#updateIngredientModal');
    }
    if (mode === 'delete') {
      this.deleteIngredient = ingredient;
      button.setAttribute('data-target','#deleteIngredientModal');
    }
    container?.appendChild(button);
    button.click();

  }


}
