import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../model/book';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {BookTypeService} from '../../service/book-type.service';
import {BookType} from '../../model/book-type';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  selectedImage: File = null;
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  loader = true;

  constructor(private bookService: BookService,
              private categoryService: BookTypeService,
              private storage: AngularFireStorage,
              private router: Router) {
  }

  bookForm: FormGroup = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    discount: new FormControl(),
    author: new FormControl(),
    description: new FormControl(),
    dimension: new FormControl(),
    translator: new FormControl(),
    publishingHome: new FormControl(),
    img: new FormControl(),
    quantity: new FormControl(),
    totalPage: new FormControl(),
    releaseDate: new FormControl(),
    category: new FormControl()
  });
  categoryList: BookType[] = [];
  submitStatus = false;

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(value => {
      this.categoryList = value;
    });
    this.bookForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      author: new FormControl('', Validators.required),
      publishingCompany: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      totalPage: new FormControl('', [Validators.required, Validators.min(1)]),
      releaseDate: new FormControl('', Validators.required),
      typeBook: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required)
    });
  }

  submit() {
    this.submitStatus = true;
    if (this.bookForm.valid) {
      this.loader = false;
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const filePath = `book/${nameImg}`;
      const fileRef = this.storage.ref(filePath);
      // const book = this.bookForm.value;
      let book: Book;
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.bookForm.patchValue({img: url});
            book = {
              code: this.bookForm.value.code,
              name: this.bookForm.value.name,
              price: this.bookForm.value.price,
              author: this.bookForm.value.author,
              publishingCompany: this.bookForm.value.publishingCompany,
              img: this.bookForm.value.img,
              amount: this.bookForm.value.amount,
              totalPage: this.bookForm.value.totalPage,
              releaseDate: this.bookForm.value.releaseDate,
              size: this.bookForm.value.size,
              typeBook: this.bookForm.value.typeBook,

            };
            console.log(book);
            this.bookService.save(book).subscribe(() => {
              this.bookForm.reset();
              this.router.navigateByUrl('/book/list/0').then();
              Swal.fire('Thông Báo !!', 'Thêm Mới Thành Công', 'success').then();
            }, e => {
              Swal.fire('Thông Báo !!', 'Đã Có Lỗi Xảy Ra. Thêm Mới Thất Bại', 'error').then();
              console.log(e);
            });
          });
        })
      ).subscribe();
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  onFileSelected(event) {
    this.regexImageUrl = false;
    if (event.target.files[0].size > 9000000) {
      return;
    }
    this.selectedImage = event.target.files[0];
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      this.regexImageUrl = true;
      return;
    }
    this.bookForm.patchValue({imageUrl: this.selectedImage.name});
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    if (event.target.files[0].size > 9000000) {
      return;
    }
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      return;
    }
    this.checkImgSize = false;
    this.checkImg = false;
    this.editImageState = true;

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Chỉ có file ảnh được hỗ trợ';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }
}
