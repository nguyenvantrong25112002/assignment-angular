import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdSubjectService } from 'src/app/services/backend/cd-subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cd-subject',
  templateUrl: './cd-subject.component.html',
  styleUrls: ['./cd-subject.component.css']
})
export class CdSubjectComponent implements OnInit {
  constructor(
    private subjectService:CdSubjectService,
  ) { 
  }
  formValueSubject:FormGroup = new FormGroup({
    id :new FormControl(null),
    name:new FormControl(null,[Validators.required]),
    logo:new FormControl(null),
    code:new FormControl(null,[Validators.required]),
  })



  titleForm:string = "";
  cateForm:string = "";
  subjects:Array<any>=[];
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizes = [this.tableSize, 10 ,12,14,16,18,20 ];
  

  ngOnInit(): void {
    this.listSubject()
  }
  listSubject(){
    this.subjectService.all().subscribe((res :any)=>{
      this.subjects= res;
    });
  }

  create(){
    console.log(this.formValueSubject.value);
    this.subjectService.create(this.formValueSubject.value).subscribe((res:any)=>{
     this.resetForm()
      this.listSubject()
      Swal.fire({
        icon: 'success',
        title: 'Thêm thành công !',
        showConfirmButton: true,
        timer: 1500
      })
    })
    
  }

  edit(data:any){
    this.cateForm = 'edit'
    this.resetForm()

    this.subjectService.findId(data.id).subscribe(
     res=>{
        this.formValueSubject.setValue({
          id: res.id,
          name: res.name,
          logo: null,
          code: res.code,
        })
      },
    )
  }
  update(){
    this.subjectService.findId(this.formValueSubject.value.id).subscribe({
      next:(res)=>{
        this.subjectService.update(this.formValueSubject.value, res.id ).subscribe((res:any)=>{
          this.listSubject()
          this.resetForm()
          Swal.fire({
            icon: 'success',
            title: 'Cập nhập thành công !',
            showConfirmButton: true,
            timer: 1500
          })
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  destroy(subject_id:any){ 
    Swal.fire({
      title: 'Bạn có chắc muốn loại bỏ ?',
      text: 'Bạn sẽ không thể khôi phục tệp này !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'CHUẨN !',
      cancelButtonText: 'Thôi , tao đổi ý !'
    }).then((result) => {
      if (result.value) {
        this.subjectService.delete(subject_id).subscribe((res :any)  =>{
          console.log(res);
          this.listSubject()
          Swal.fire(
            'Xóa !',
            'Đã xóa thành công !',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Đã hủy',
          'Tệp vẫn còn nha :)',
          'error'
        )
      }
    })
  }
  resetForm(){
    this.formValueSubject.reset();
  }
  titleFormAdd(){
    this.cateForm = 'add'
    this.resetForm()
  }

  onTableDataChange(event:any){
    this.page = event;
    this.listSubject();
  }  
  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.listSubject();
  }  
}
