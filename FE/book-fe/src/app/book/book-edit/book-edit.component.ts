import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {BookTypeService} from '../../service/book-type.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookType} from '../../model/book-type';
import {Book} from '../../model/book';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {


  selectedImage: File = null;
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = true;
  checkImg: boolean;
  url: any;
  msg = '';
  loader = true;
  id = 0;

  constructor(private bookService: BookService,
              private categoryService: BookTypeService,
              private storage: AngularFireStorage,
              private router: Router, private activeRouter: ActivatedRoute) {
  }

  bookForm: FormGroup = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    discount: new FormControl(),
    author: new FormControl(),
    publishingCompany: new FormControl(),
    img: new FormControl(),
    amount: new FormControl(),
    totalPage: new FormControl(),
    releaseDate: new FormControl(),
    typeBook: new FormControl(),
    size: new FormControl()
  });
  categoryList: BookType[] = [];
  submitStatus = false;

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(value => {
      this.categoryList = value;
    });
    this.activeRouter.paramMap.subscribe(param => {
      this.id = +param.get('id');
      this.bookService.findById(this.id).subscribe(value => {
        this.bookForm = new FormGroup({
          name: new FormControl(value.name, Validators.required),
          price: new FormControl(value.price, [Validators.required, Validators.min(1)]),
          author: new FormControl(value.author, Validators.required),
          publishingCompany: new FormControl(value.publishingCompany, Validators.required),
          img: new FormControl(value.img),
          amount: new FormControl(value.amount, [Validators.required, Validators.min(1)]),
          totalPage: new FormControl(value.totalPage, [Validators.required, Validators.min(1)]),
          releaseDate: new FormControl(value.releaseDate, Validators.required),
          typeBook: new FormControl(value.typeBook.id, Validators.required),
          size: new FormControl(value.size, Validators.required)
        });
      });
    });

  }

  submit() {
    // const book = this.bookForm.value;
    let book: Book;
    if (this.editImageState === true) {
      book = {
        id: this.id,
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
        typeBook: {
          id: this.bookForm.value.typeBook,
        }
      };
      console.log(book);
      this.bookService.save(book).subscribe(() => {
        this.bookForm.reset();
        this.router.navigateByUrl('/book/list/0').then();
        Swal.fire('Thông Báo !!', 'Chỉnh Sửa Thành Công', 'success').then();
      }, e => {
        Swal.fire('Thông Báo !!', 'Đã Có Lỗi Xảy Ra. Thêm Mới Thất Bại', 'error').then();
        console.log(e);
      });
    } else {
      this.submitStatus = true;
      this.loader = false;
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const filePath = `book/${nameImg}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.bookForm.patchValue({img: url});
            book = {
              id: this.id,
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
              typeBook: {
                id: this.bookForm.value.typeBook,
              }
            };
            console.log(book);
            this.bookService.save(book).subscribe(() => {
              this.bookForm.reset();
              this.router.navigateByUrl('/book/list/0').then();
              Swal.fire('Thông Báo !!', 'Chỉnh Sửa Thành Công', 'success').then();
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
    console.log(event.target.files[0]);
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
    this.editImageState = false;

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
