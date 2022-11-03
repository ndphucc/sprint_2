import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {Book} from '../../model/book';
import {FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../../service/book.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  book: Book[] = [];
  statisticalForm: FormGroup = new FormGroup({
    type: new FormControl('book'),
    time: new FormControl('week')
  });
  let;
  myChart: any = {};

  constructor(private bookService: BookService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['', '', '', '', '', ''],
        datasets: [{
          label: 'Số lượng mua',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderStatistical() {
    this.myChart.destroy();
    if (this.statisticalForm.value.type === 'book') {
      this.bookService.statisticalBook(this.statisticalForm.value.time).subscribe(next => {
        this.book = next;
        const labels: string[] = [];
        const data: number[] = [];
        for (let i = 0; i < this.book.length; i++) {
          labels[i] = this.book[i].name;
          data[i] = this.book[i].amountBuy;
        }
        this.myChart = new Chart('myChart', {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Số lượng mua',
              data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
    } else {
      this.bookService.statisticalCustomer().subscribe(next => {
        const labels: string[] = [];
        const data: number[] = [];
        for (let i = 0; i < next.length; i++) {
          labels[i] = next[i].name;
          data[i] = next[i].amountBuy;
        }
        this.myChart = new Chart('myChart', {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Số lượng mua',
              data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
    }
  }
}
