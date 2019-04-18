import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.css']
})
export class Part1Component implements OnInit {
  data = {
    book: {
        title: 'New Book',
        qty: 1,
        price: 10.99
    }
  }

  books = JSON.parse(window.localStorage.getItem('barker_cart')) || [
    {
        title: 'Absolute Java',
        qty: 1, price: 114.95
    },
    {
        title: 'Pro HTML5',
        qty: 1, price: 27.95
    },
    {
        title: 'Head First HTML5',
        qty: 1, price: 27.89
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  removeBook = function (index) {
    this.books.splice(index, 1);
  }

  addBook = function () {
    this.books.push(this.data.book)
  }

  save = function () {
    window.localStorage.setItem('barker_cart', JSON.stringify(this.books))
  }

  getTotal = function () {
    var total = 0;
    this.books.forEach(function (key, value) {
        total += key.price * key.qty;
    });
    return total;
  }

}
